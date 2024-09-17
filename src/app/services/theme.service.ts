import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    this.currentTheme = savedTheme === 'dark' ? 'dark' : 'light';
    document.body.classList.add(this.currentTheme);
  }

  toggleTheme(): void {
    document.body.classList.remove(this.currentTheme);
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.add(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  get currentThemeName(): string {
    return this.currentTheme;
  }
}
