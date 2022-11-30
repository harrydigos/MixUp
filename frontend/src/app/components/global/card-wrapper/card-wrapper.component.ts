import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.scss'],
})
export class CardWrapperComponent implements OnInit {
  @ViewChild('wrapper') wrapper?: ElementRef;

  isDown: boolean = false;
  startX: number = 0;
  scrollLeft: number = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  mouseDown(e: MouseEvent) {
    this.isDown = true;
    this.renderer.addClass(this.wrapper!.nativeElement, '__active');
    this.startX = e.pageX - this.wrapper!.nativeElement.offsetLeft;
    this.scrollLeft = this.wrapper!.nativeElement.scrollLeft;
  }

  mouseLeave() {
    this.isDown = false;
    this.renderer.removeClass(this.wrapper!.nativeElement, '__active');
  }

  mouseMove(e: MouseEvent) {
    if (!this.isDown) return;
    e.preventDefault();
    const currPos = e.pageX - this.wrapper!.nativeElement.offsetLeft;
    const dragSpeed = (currPos - this.startX) * 1.5;
    this.wrapper!.nativeElement.scrollLeft = this.scrollLeft - dragSpeed;
  }
}
