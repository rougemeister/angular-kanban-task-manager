import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.reducer';

export const selectBoardState = createFeatureSelector<BoardState>('boardState');

export const selectBoards = createSelector(
  selectBoardState,
  (state: BoardState) => state.boards
);

export const selectBoardByName = (boardName: string) =>
  createSelector(selectBoards, (boards) =>
    boards.find((board) => board.name === boardName)
  );

export const selectTasksByColumn = (boardName: string, columnName: string) =>
  createSelector(selectBoardByName(boardName), (board) =>
    board?.columns.find((column) => column.name === columnName)?.tasks || []
  );

  