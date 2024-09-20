import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../models/boards.model';
import { SelectActiveBoard, selectAllBoards } from '../../store/selectors/boards.selectors';
import { AsyncPipe } from '@angular/common';
import { loadBoards, setActiveBoard } from '../../store/actions/boards.action';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  boards$: Observable<Board[]>;
  activeBoard$: Observable<Board[]>;
  boardsList: Board[] = [];


  constructor(
    public sidebar: SidebarService,
    private store: Store,
  ) {
    this.boards$ = this.store.select(selectAllBoards);
    this.activeBoard$ = this.store.select(SelectActiveBoard);
  }

  ngOnInit() {
    this.boards$.subscribe(item => this.boardsList = item)
    this.activeBoard$.subscribe(item => item);
    // console.log(this.boardsList)
  }

  selectBoard( boardName: string ) {
    this.store.dispatch(setActiveBoard({boardName}));
  }

}
