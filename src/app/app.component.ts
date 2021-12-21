import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, interval, map, startWith, Subject, Subscription, takeUntil, takeWhile } from 'rxjs';

interface City {
  name: string;
  location: {
    x: number;
    y: number;
  }
}

interface Position {
  top: number;
  left: number;
  crosshairSize: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') private canvas: ElementRef;
  private animating$: Subscription;
  private timer$: Subscription;
  private mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
  private resize$ = fromEvent<Event>(window, 'resize');
  private click$ = fromEvent<PointerEvent>(document, 'click');
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
    { name: 'Rio de Janeiro', location: { x: 892, y: 1050 } },
    { name: 'Cairo', location: { x: 1391, y: 636 } },
    { name: 'Moscow', location: { x: 1420, y: 426 } },
    { name: 'Tokyo', location: { x: 2103, y: 582 } },
    { name: 'Cape Town', location: { x: 1302, y: 1073 } },
    { name: 'Vancouver', location: { x: 448, y: 529 } },
    { name: 'Mumbai', location: { x: 1657, y: 706 } },
    { name: 'Beijing', location: { x: 1935, y: 554 } },
    { name: 'Mexico City', location: { x: 578, y: 752 } }
  ];
  private position: Position = { left: 0, top: 0, crosshairSize: this.crosshairSize };
  private city: City;

  private loadImages() {
    const image = new Image();
    image.onload = () => {
      this.circleImage = image;
      this.drawCities();
    };
    image.src = '/assets/circle_20px.png';
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  public ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;

    this.loadImages();
    
    this.timer$ = interval(5000).pipe(
      startWith(0),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      let city = this.cities[Math.floor(Math.random() * this.cities.length)];
      while (city === this.city) {
        city = this.cities[Math.floor(Math.random() * this.cities.length)];
      }
      this.city = city;
      this.clear();
      this.drawCities();
      const x = city.location.x * (window.innerWidth / this.designResoulution.width);
      const y = city.location.y * (window.innerHeight / this.designResoulution.height);
      const position = { top: y + 10, left: x + 10, crosshairSize: this.crosshairSize };
      this.animateCrosshairs(position);
    });

    /*this.click$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(e => {
      const x = e.pageX * (this.designResoulution.width / window.innerWidth);
      const y = e.pageY * (this.designResoulution.height / window.innerHeight);
      this.clear();
      this.drawCities();
      const position = { top: e.pageY, left: e.pageX, crosshairSize: this.crosshairSize };
      this.animateCrosshairs(position);
      
    });*/
    
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
     /* this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      this.drawCities();
      this.drawCrosshairs(position);*/
    });
  }
 
  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  private drawCities() {
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
 

  private animateCrosshairs(newPosition: Position) {
    if (!this.animating$ || this.animating$.closed) {
      this.animating$ = interval(16).pipe(
        takeWhile(interval => interval !== 101)
      ).subscribe({ 
        next: interval => {
          this.clear();
          this.drawCities();
          let x: number;
          if (newPosition.left > this.position.left) {
            x = this.position.left + ((newPosition.left - this.position.left) * interval / 100); 
          } else {
            x = this.position.left - ((this.position.left - newPosition.left) * interval / 100);
          }
          let y: number;
          if (newPosition.top > this.position.top) {
            y = this.position.top + ((newPosition.top - this.position.top) * interval / 100);
          } else {
            y = this.position.top - ((this.position.top - newPosition.top) * interval / 100);
          }
          
          this.drawCrosshairs({ left: x, top: y, crosshairSize: this.crosshairSize });
        },
        complete: () => {
          this.position = newPosition;
          this.clear();
          this.drawCities();
          this.drawCrosshairs(newPosition);
        }
      });
    }
  }

  private drawCrosshairs(position: Position) {
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 2;

    // draw a red line
    this.context.beginPath();

    this.context.moveTo(position.left - position.crosshairSize, position.top - position.crosshairSize);
    this.context.lineTo(position.left + position.crosshairSize, position.top - position.crosshairSize);
    
    this.context.moveTo(position.left - position.crosshairSize, position.top + position.crosshairSize);
    this.context.lineTo(position.left + position.crosshairSize, position.top + position.crosshairSize);
    
    this.context.moveTo(position.left - position.crosshairSize, position.top + position.crosshairSize);
    this.context.lineTo(position.left - position.crosshairSize, position.top - position.crosshairSize);

    this.context.moveTo(position.left + position.crosshairSize, position.top + position.crosshairSize);
    this.context.lineTo(position.left + position.crosshairSize, position.top - position.crosshairSize);

    // line down
    this.context.moveTo(position.left, position.top + position.crosshairSize);
    this.context.lineTo(position.left, position.top + window.screen.height);

    // line up
    this.context.moveTo(position.left, position.top - position.crosshairSize);
    this.context.lineTo(position.left, position.top - window.screen.height);

    // line left
    this.context.moveTo(position.left - position.crosshairSize, position.top);
    this.context.lineTo(position.left - window.screen.width, position.top);

    // line right
    this.context.moveTo(position.left + position.crosshairSize, position.top);
    this.context.lineTo(position.left + window.screen.width, position.top);

    this.context.stroke();
  }
}
