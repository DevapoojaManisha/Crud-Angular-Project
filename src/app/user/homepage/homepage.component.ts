import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  showAboutContent = false;
  showHelpContent = false;

  toggleAboutContent() {
    this.showAboutContent = !this.showAboutContent;
  }
  toggleHelpContent() {
    this.showHelpContent = !this.showHelpContent;
    this.showAboutContent = false; 
  }
}
