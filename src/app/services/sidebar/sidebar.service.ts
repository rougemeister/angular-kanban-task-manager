import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  visible: boolean = false;

  constructor() { }

  toggleSidebarVisibility() {
    this.visible = !this.visible;
    // console.log(this.visible);
  }

}
