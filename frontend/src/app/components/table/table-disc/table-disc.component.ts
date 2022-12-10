import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-disc',
  templateUrl: './table-disc.component.html',
  styleUrls: ['./table-disc.component.scss'],
})
export class TableDiscComponent implements OnInit {
  @Input() name: string = '';
  @Input() imgUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
