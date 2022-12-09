import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-tracks',
  templateUrl: './new-tracks.component.html',
  styleUrls: ['./new-tracks.component.scss']
})
export class NewTracksComponent implements OnInit {

  @Input() genre: string = '';
  @Input() artist: string = '';
  @Input() imgUrl: string ='';
  @Input() song: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
