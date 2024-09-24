import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BoardHttpService } from '../services/board-http/board-http.service';
import * as BoardActions from './board.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      mergeMap(() =>
        this.boardHttpService.getBoards().pipe(
          map((response) => BoardActions.loadBoardsSuccess({ boards: response.boards })),
          catchError((error) => of({ type: '[Board] Load Boards Failure', error }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private boardHttpService: BoardHttpService
  ) {}
}
