import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Board } from '../../models/boards.model';
import { SelectActiveBoard, selectBoardsLoading } from '../../store/selectors/boards.selectors';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  activeBoards$: Observable<Board[]>;
  loading$: Observable<boolean>;

  constructor(public sidebar: SidebarService, private store: Store) {
    this.activeBoards$ = this.store.select(SelectActiveBoard);
    this.loading$ = this.store.select(selectBoardsLoading);
  }

  ngOnInit() {
    // this.activeBoards$.subscribe(item => console.log)
    // this.loading$.subscribe(item => console.log(item));
  }

}
