import { Component, OnInit ,Input} from '@angular/core';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';


@Component({
  selector: 'app-playing-song',
  templateUrl: './playing-song.component.html',
  styleUrls: ['./playing-song.component.scss']
})
export class PlayingSongComponent implements OnInit {
  
  navState: PhoneNavbarState = 'hide';

  @Input() song: string = 'Blinding Lights';
  @Input() artist: string = 'The Weeknd';
  @Input() album: string = 'After Hours';


  constructor( ) {
     
  }

  ngOnInit(): void {
  }

}
