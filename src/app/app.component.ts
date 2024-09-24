import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BoardModalComponent } from './components/modals/board-modal/board-modal.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { TaskModalComponent } from './components/modals/task-modal/task-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectBoardComponent } from './components/project-board/project-board.component';
import { SidebarToggleComponent } from './components/sidebar-toggle/sidebar-toggle.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ThemeTogglerComponent } from './components/sidebar/theme-toggler/theme-toggler.component';
import { Board } from './models/board.model';
import { Task } from './models/task.model';
import * as BoardActions from './state/board.actions';
import { BoardState } from './state/board.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    ThemeTogglerComponent,
    NavbarComponent,
    ProjectBoardComponent,
    SidebarToggleComponent,
    BoardModalComponent,
    DeleteModalComponent,
    TaskModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  darkMode = false;
  isSidebarOpen = true;
  boards$: Observable<Board[]>;
  activeBoard$: Observable<Board | undefined>;
  currentIdx$: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ board: BoardState }>
  ) {
    this.boards$ = this.store.select(state => state.board.boards);
    this.activeBoard$ = this.store.select(state => state.board['activeBoard']);
    this.currentIdx$ = this.store.select(state => state.board['currentIdx']);
  }

  ngOnInit(): void {
    this.store.dispatch(BoardActions.loadBoards());
  }

  selectBoard(boardIdx: number) {
    // Assuming you have a selectBoard action, if not, you need to create one
    this.store.dispatch(BoardActions.selectBoard({ boardIdx }));
  }

  toggleDarkMode(enableDarkMode: boolean) {
    this.darkMode = enableDarkMode;
  }

  openSideBar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  addBoard(): void {
    const dialogRef = this.dialog.open(BoardModalComponent, {
      data: { board: { name: '', columns: [] }, darkMode: this.darkMode },
    });

    dialogRef.afterClosed().subscribe((board: Board) => {
      if (board) {
        this.store.dispatch(BoardActions.addBoard({ board }));
      }
    });
  }

  editBoard(): void {
    this.activeBoard$.subscribe(activeBoard => {
      if (activeBoard) {
        const dialogRef = this.dialog.open(BoardModalComponent, {
          data: { board: activeBoard, darkMode: this.darkMode },
        });

        dialogRef.afterClosed().subscribe((updatedBoard: Board) => {
          if (updatedBoard) {
            this.store.dispatch(BoardActions.updateBoard({ board: updatedBoard }));
          }
        });
      }
    });
  }

  updateBoardAfterTaskReorder(updatedBoard: Board) {
    this.store.dispatch(BoardActions.updateBoard({ board: updatedBoard }));
  }

  deleteBoard(): void {
    this.activeBoard$.subscribe(activeBoard => {
      if (activeBoard) {
        const dialogRef = this.dialog.open(DeleteModalComponent, {
          data: { name: activeBoard.name, isBoard: true, darkMode: this.darkMode },
        });

        dialogRef.afterClosed().subscribe((success: boolean) => {
          if (success) {
            this.store.dispatch(BoardActions.deleteBoard({ boardName: activeBoard.name }));
          }
        });
      }
    });
  }

  addTask(): void {
    this.activeBoard$.subscribe(activeBoard => {
      if (activeBoard) {
        const dialogRef = this.dialog.open(TaskModalComponent, {
          data: { editMode: false, darkMode: this.darkMode, columns: activeBoard.columns },
        });

        dialogRef.afterClosed().subscribe((task: Task) => {
          if (task) {
            this.store.dispatch(BoardActions.addTask({
              boardName: activeBoard.name,
              columnName: task.status,
              task
            }));
          }
        });
      }
    });
  }

  editTask(editTask: Task): void {
    this.activeBoard$.subscribe(activeBoard => {
      if (activeBoard) {
        const dialogRef = this.dialog.open(TaskModalComponent, {
          data: {
            task: editTask,
            editMode: true,
            darkMode: this.darkMode,
            columns: activeBoard.columns,
          },
        });

        dialogRef.afterClosed().subscribe((updatedTask: Task) => {
          if (updatedTask) {
            this.store.dispatch(BoardActions.updateTask({
              boardName: activeBoard.name,
              columnName: updatedTask.status,
              task: updatedTask
            }));
          }
        });
      }
    });
  }

  updateTask(updateTask: { task: Task; columnName: string }) {
    this.activeBoard$.subscribe(activeBoard => {
      if (activeBoard) {
        this.store.dispatch(BoardActions.updateTask({
          boardName: activeBoard.name,
          columnName: updateTask.columnName,
          task: updateTask.task
        }));
      }
    });
  }

  deleteTask(deleteTask: Task): void {
    this.activeBoard$.subscribe(activeBoard => {
      if (activeBoard) {
        const dialogRef = this.dialog.open(DeleteModalComponent, {
          data: { name: deleteTask.title, isBoard: false, darkMode: this.darkMode },
        });

        dialogRef.afterClosed().subscribe((success: boolean) => {
          if (success) {
            this.store.dispatch(BoardActions.deleteTask({
              boardName: activeBoard.name,
              columnName: deleteTask.status,
              taskTitle: deleteTask.title
            }));
          }
        });
      }
    });
  }
}