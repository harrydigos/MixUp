import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  
 

  @Input() id: number = 0;
  @Input() album: string = '';
  @Input() artist: string = '';
  @Input() imgUrl: string = '';
  

  constructor() { }

  ngOnInit(): void {
  }

}
