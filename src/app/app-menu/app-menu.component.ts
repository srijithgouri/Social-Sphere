import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent {
  @Output() tabSelected = new EventEmitter<string>();

  selectTab(tab: string): void {
    this.tabSelected.emit(tab);
  }
}
