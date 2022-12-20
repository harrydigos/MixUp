import { Injectable } from '@angular/core';
import { SongModel } from 'src/app/global/models';
import { BehaviorSubject } from 'rxjs';
import { SocketsService } from 'src/app/global/services';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  queue = new BehaviorSubject<SongModel[]>([]);
  readonly queue$ = this.queue.asObservable();

  constructor(private socketsService: SocketsService) {
    this.socketsService.subscribe('queue', (queue: SongModel[]) => this.queue.next(queue));
  }

  setQueue = (queue: SongModel[]) => this.socketsService.publish('queue', queue);

  append = (song: SongModel) => {
    if (this.queue.value.find((s) => s._id === song._id)) return;
    this.queue.getValue().push(song);
    this.setQueue(this.queue.getValue());
  };

  remove = (song: SongModel) => {
    this.queue.next(this.queue.getValue().filter((s) => s._id !== song._id));
    this.setQueue(this.queue.getValue());
  };
}
