import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  menuState: boolean = false;
  mouseX: number | undefined;
  mouseY: number | undefined;
  @ViewChild('table') table: ElementRef | undefined;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {}

  toggleMenu(): void {
    console.log('toggleMenu()');
    if (this.menuState) {
      this.renderer.removeChild(
        this.table?.nativeElement,
        this.table?.nativeElement.lastChild
      );
      this.menuState = false;
      return;
    }

    console.log(this.mouseX, this.mouseY);
    this.menuState = true;
    const menu: HTMLElement = this.renderer.createElement('div');
    menu.id = 'menu';
    menu.className = 'menu';
    menu.style.top = `${this.mouseY}px`;
    menu.style.left = `${this.mouseX}px`;
    menu.style.transform = `translate(-50%, -50%)`;

    this.table?.nativeElement.appendChild(menu);
  }

  getMousePosition = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };
}
