import { createAction, props } from '@ngrx/store';
import { Board } from '../models/board.model';
import { Task } from '../models/task.model';

// Load Boards
export const loadBoards = createAction('[Board] Load Boards');
export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: Board[] }>()
);

// Add, Update, and Delete Board
export const addBoard = createAction('[Board] Add Board', props<{ board: Board }>());
export const updateBoard = createAction('[Board] Update Board', props<{ board: Board }>());
export const deleteBoard = createAction('[Board] Delete Board', props<{ boardName: string }>());

// Add, Update, and Delete Task
export const addTask = createAction(
  '[Task] Add Task',
  props<{ boardName: string; columnName: string; task: Task }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ boardName: string; columnName: string; task: Task }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ boardName: string; columnName: string; taskTitle: string }>()
);

// Add and Update SubTask
export const updateSubTask = createAction(
  '[SubTask] Update SubTask',
  props<{ boardName: string; columnName: string; taskTitle: string; subtaskTitle: string; isCompleted: boolean }>()
);
export const selectBoard = createAction(
  '[Board] Select Board',
  props<{ boardIdx: number }>()
);