import { Injectable } from '@angular/core';
import { SongModel } from '../../models';
import { BehaviorSubject } from 'rxjs';
import { SocketsService } from '../sockets/sockets.service';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  queue = new BehaviorSubject<SongModel[]>([]);
  readonly queue$ = this.queue.asObservable();

  constructor(private socketsService: SocketsService) {
    this.socketsService.subscribe('queue', (queue: SongModel[]) => this.queue.next(queue));
  }

  setQueue = (queue: SongModel[]): void => this.socketsService.publish('queue', queue);

  append = (song: SongModel) => {
    if (this.queue.value.find((s) => s._id === song._id)) return;
    this.queue.getValue().push(song);
    this.setQueue(this.queue.getValue());
  };

  pop = () => {
    this.queue.getValue().shift();
    this.setQueue(this.queue.getValue());
  };
}
