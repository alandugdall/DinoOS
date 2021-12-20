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
  private readonly designResoulution = { width: 2560, height: 1440 };
  private circleImage: HTMLImageElement;
  private cities: City[] = [
    { name: 'London', location: { x: 1165, y: 450 } },
    { name: 'New York', location: { x: 745, y: 580 } },
    { name: 'Paris', location: { x: 1175, y: 490 } },
    { name: 'Rome', location: { x: 1250, y: 530 } },
    { name: 'Toronto', location: { x: 700, y: 530 } },
    { name: 'Nuuk', location: { x: 860, y: 340 } },
    { name: 'Sydney', location: { x: 2245, y: 1100 } },
    { name: 'Rio de Janeiro', location: { x: 892, y: 1050 } }
  ];

  loadImage() {
    const image = new Image();
    image.onload = () => {
      this.circleImage = image;
      this.drawCities();
    };
    image.src = '/assets/circle_20px.png';
  }

  ngAfterViewInit(): void {
    this.loadImage();
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;

    this.resize$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(e => {
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
      takeUntil(this.unsubscribe$)
    ).subscribe(position => {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.drawCities();
      this.drawCrosshairs(position);
    });
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  drawCities() {
    if (this.circleImage) {
      this.cities.forEach(city => {
        const x = city.location.x * (window.innerWidth / this.designResoulution.width);
        const y = city.location.y * (window.innerHeight / this.designResoulution.height);
        this.context.drawImage(this.circleImage, x, y, this.circleImage.width, this.circleImage.height);
        this.context.font = "24px Roboto";
        this.context.fillStyle = 'red';
        this.context.fillText(city.name, x + 22, y + 19);
      });
    }
  }

  drawCrosshairs(options: { top: number, left: number, crosshairSize: number }) {
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
