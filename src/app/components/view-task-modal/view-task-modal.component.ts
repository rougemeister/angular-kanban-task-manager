import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Board } from '../../models/boards.model';
import { Observable } from 'rxjs';
import { SelectActiveBoard } from '../../store/selectors/boards.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-view-task-modal',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './view-task-modal.component.html',
  styleUrl: './view-task-modal.component.scss'
})
export class ViewTaskModalComponent {

  activeBoard$ : Observable<Board[]>;

  constructor(private store: Store) {
    this.activeBoard$ = this.store.select(SelectActiveBoard); 
  }

  ngOnInit() {
    this.activeBoard$.subscribe(item => console.log(item)).unsubscribe();
  }

}

