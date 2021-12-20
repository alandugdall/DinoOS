import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, map, Observable, Subject, takeUntil, tap } from 'rxjs';

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

  ngAfterViewInit(): void {
    console.log(this.canvas);
    this.context = this.canvas.nativeElement.getContext('2d');

    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;

    this.resize$.pipe(
      takeUntil(this.unsubscribe$))
    .subscribe(e => {
      const w: Window = e.target as Window;
      this.context.canvas.width = w.innerWidth;
      this.context.canvas.height = w.innerHeight;
    });
    
    
    this.mouseMove$.pipe(
      map((e: MouseEvent) => { 
        var posx = 0;
	      var posy = 0;
	              
        if (e.pageX || e.pageY) 	{
          posx = e.pageX;
          posy = e.pageY;
        } else if (e.clientX || e.clientY) {
		      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { top: posy *1 , left: posx *1 };
      }),
      takeUntil(this.unsubscribe$))
    .subscribe(x => this.drawCrosshairs(x));
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  drawCrosshairs(origin: { top: number, left: number}) {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    // set line stroke and line width
    this.context.strokeStyle = 'red';
    this.context.lineWidth = 2;

    // draw a red line
    this.context.beginPath();
    this.context.moveTo(origin.left - 50, origin.top - 50);
    this.context.lineTo(origin.left + 50, origin.top - 50);
    
    this.context.moveTo(origin.left - 50, origin.top + 50);
    this.context.lineTo(origin.left + 50, origin.top + 50);
    
    this.context.moveTo(origin.left - 50, origin.top + 50);
    this.context.lineTo(origin.left - 50, origin.top - 50);

    this.context.moveTo(origin.left + 50, origin.top + 50);
    this.context.lineTo(origin.left + 50, origin.top - 50);

    // line down
    this.context.moveTo(origin.left, origin.top + 50);
    this.context.lineTo(origin.left, origin.top + window.screen.height);

    // line up
    this.context.moveTo(origin.left, origin.top - 50);
    this.context.lineTo(origin.left, origin.top - window.screen.height);

    // line left
    this.context.moveTo(origin.left - 50, origin.top);
    this.context.lineTo(origin.left - window.screen.width, origin.top);

    // line right
    this.context.moveTo(origin.left + 50, origin.top);
    this.context.lineTo(origin.left + window.screen.width, origin.top);

    this.context.stroke();
  }
}
