import { createReducer, on } from "@ngrx/store";
import { Board } from "../../models/boards.model";
import * as BoardActions from '../actions/boards.action';

export interface BoardState {
    boards: Board[];
    loading: boolean;
    error: string | null;
    isActive: boolean;
}

export const initialState: BoardState = {
    boards: [],
    loading: false,
    error: null,
    isActive: false,
};


export const boardReducer = createReducer(
    initialState,
    on(BoardActions.loadBoards, state => ({...state, loading: true})),
    on(BoardActions.loadBoardsSuccess, (state, { boards }) => ({...state, boards, loading:false})),
    
    on(BoardActions.setActiveBoard, (state, { boardName }) => ({
        ...state,
        boards: state.boards.map(board => ({
            ...board,
            isActive: board.name === boardName? 'true' : 'false'
        }))
    })),
);