import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  
  @Input() artist: string = '';
  @Input() img?: string;
  @Input() song: string = '';
  @Input() album: string = '';
  @Input() playlist: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
