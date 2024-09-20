import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of, tap } from "rxjs";
import { ApiService } from "../../services/api/api.service";
import * as BoardActions from '../actions/boards.action'


@Injectable()
export class BoardEffects {
  loadBoards$ = createEffect(() => this.actions$.pipe(
    ofType(BoardActions.loadBoards),
    mergeMap(() => this.boardService.getData()
      .pipe(
        map((board: any) => {
          const boards = board.boards
          return BoardActions.loadBoardsSuccess({ boards })
        }),
        catchError(() => of({ type: '[Board] Load Boards Error' }))
      ))
  ));

  constructor(
    private actions$: Actions,
    private boardService: ApiService
  ) {}
}