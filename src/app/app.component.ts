import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, fromEvent, map, Subject, take, takeUntil } from 'rxjs';

interface City {
  name: string;
  location: {
    x: number;
    y: number;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvas: ElementRef;
  private mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
  private resize$ = fromEvent<Event>(window, 'resize');
  private unsubscribe$ = new Subject<void>();
  private context: CanvasRenderingContext2D;
  private readonly crosshairSize = 25;
  private circleImage = new BehaviorSubject<HTMLImageElement>({} as HTMLImageElement);
  private cities: City[] = [
    { 
      name: 'London',
      location: {
        x: 1165, y: 450
      }
    }, { 
      name: 'New York',
      location: {
        x: 745, y: 580
      }
    }, { 
      name: 'Paris',
      location: {
        x: 1175, y: 490
      }
    },
  ];

  loadImage() {
    const image = new Image();
    image.onload = () => {
      this.circleImage.next(image);
    };
    image.src = '/assets/circle_20px.png';
  }

  ngAfterViewInit(): void {
    this.loadImage();
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;

    this.resize$.pipe(
      takeUntil(this.unsubscribe$))
    .subscribe(e => {
      const w: Window = e.target as Window;
      this.context.canvas.width = w.innerWidth;
      this.context.canvas.height = w.innerHeight;
      this.drawCities();
    });
    
    this.mouseMove$.pipe(
      map((e: MouseEvent) => {
        return { 
          top: e.pageY, 
          left: e.pageX, 
          crosshairSize: this.crosshairSize
        };
      }),
      takeUntil(this.unsubscribe$))
    .subscribe(position => {
      this.drawCrosshairs(position);
      this.drawCities();
    });

    this.drawCities();
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  drawCities() {
    this.circleImage.pipe(filter(image => {
      return !!image.currentSrc;
    }), take(1)).subscribe(image => {
      this.cities.forEach(city => {
        const x = city.location.x * (window.innerWidth / 2560);
        const y = city.location.y * (window.innerHeight / 1440);
        this.context.drawImage(image, x, y, image.width, image.height);
        this.context.font = "24px Roboto";
        this.context.fillStyle = 'red';
        this.context.fillText(city.name, x + 22, y + 19);
      })
    });
  }

  drawCrosshairs(options: { top: number, left: number, crosshairSize: number }) {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    // set line stroke and line width
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 2;

    // draw a red line
    this.context.beginPath();

    this.context.moveTo(options.left - options.crosshairSize, options.top - options.crosshairSize);
    this.context.lineTo(options.left + options.crosshairSize, options.top - options.crosshairSize);
    
    this.context.moveTo(options.left - options.crosshairSize, options.top + options.crosshairSize);
    this.context.lineTo(options.left + options.crosshairSize, options.top + options.crosshairSize);
    
    this.context.moveTo(options.left - options.crosshairSize, options.top + options.crosshairSize);
    this.context.lineTo(options.left - options.crosshairSize, options.top - options.crosshairSize);

    this.context.moveTo(options.left + options.crosshairSize, options.top + options.crosshairSize);
    this.context.lineTo(options.left + options.crosshairSize, options.top - options.crosshairSize);

    // line down
    this.context.moveTo(options.left, options.top + options.crosshairSize);
    this.context.lineTo(options.left, options.top + window.screen.height);

    // line up
    this.context.moveTo(options.left, options.top - options.crosshairSize);
    this.context.lineTo(options.left, options.top - window.screen.height);

    // line left
    this.context.moveTo(options.left - options.crosshairSize, options.top);
    this.context.lineTo(options.left - window.screen.width, options.top);

    // line right
    this.context.moveTo(options.left + options.crosshairSize, options.top);
    this.context.lineTo(options.left + window.screen.width, options.top);

    this.context.stroke();
  }
}
