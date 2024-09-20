import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../models/boards.model';
import { loadBoards } from '../../store/actions/boards.action';
import { SelectActiveBoard, selectAllBoards, selectBoardsLoading } from '../../store/selectors/boards.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

    boards$: Observable<Board[]>;
    activeBoard$: Observable<Board[]>;
    loading$: Observable<boolean>;

    constructor(
      public apiService: ApiService,
      private store: Store,
    ) {
      this.boards$ = this.store.select(selectAllBoards);
      this.activeBoard$ = this.store.select(SelectActiveBoard);
      this.loading$ = this.store.select(selectBoardsLoading);
    }

}
