import { createReducer, on } from '@ngrx/store';
import { Board } from '../models/board.model';
import * as BoardActions from './board.actions';

export interface BoardState {
  [x: string]: any;
  boards: Board[];
}

export const initialState: BoardState = {
  boards: [],
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards,
  })),
  on(BoardActions.addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(BoardActions.updateBoard, (state, { board }) => ({
    ...state,
    boards: state.boards.map((b) => (b.name === board.name ? board : b)),
  })),
  on(BoardActions.deleteBoard, (state, { boardName }) => ({
    ...state,
    boards: state.boards.filter((board) => board.name !== boardName),
  })),
  on(BoardActions.addTask, (state, { boardName, columnName, task }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.name === boardName
        ? {
            ...board,
            columns: board.columns.map((column) =>
              column.name === columnName
                ? { ...column, tasks: [...column.tasks, task] }
                : column
            ),
          }
        : board
    ),
  })),
  on(BoardActions.updateTask, (state, { boardName, columnName, task }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.name === boardName
        ? {
            ...board,
            columns: board.columns.map((column) =>
              column.name === columnName
                ? {
                    ...column,
                    tasks: column.tasks.map((t) =>
                      t.title === task.title ? task : t
                    ),
                  }
                : column
            ),
          }
        : board
    ),
  })),
  on(BoardActions.deleteTask, (state, { boardName, columnName, taskTitle }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.name === boardName
        ? {
            ...board,
            columns: board.columns.map((column) =>
              column.name === columnName
                ? {
                    ...column,
                    tasks: column.tasks.filter((task) => task.title !== taskTitle),
                  }
                : column
            ),
          }
        : board
    ),
  })),
  on(BoardActions.updateSubTask, (state, { boardName, columnName, taskTitle, subtaskTitle, isCompleted }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.name === boardName
        ? {
            ...board,
            columns: board.columns.map((column) =>
              column.name === columnName
                ? {
                    ...column,
                    tasks: column.tasks.map((task) =>
                      task.title === taskTitle
                        ? {
                            ...task,
                            subtasks: task.subtasks.map((subtask) =>
                              subtask.title === subtaskTitle
                                ? { ...subtask, isCompleted }
                                : subtask
                            ),
                          }
                        : task
                    ),
                  }
                : column
            ),
          }
        : board
    ),
  }))
);
