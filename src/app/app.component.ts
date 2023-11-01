import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rpam-client';
  progress = 0;
  ngOnInit(): void {
    initFlowbite();
    this.simulateLoading();
  }

  simulateLoading() {
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
        this.progress = 0; // réinitialisez la progression si nécessaire
      }
    }, 200); // ajustez pour contrôler la vitesse de progression
  }
}
