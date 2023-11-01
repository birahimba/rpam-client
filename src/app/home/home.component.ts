import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../shared/services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();

    // Simuler une activité asynchrone (par exemple un appel HTTP)
    setTimeout(() => {
      // Cacher le spinner une fois l'activité terminée
      this.spinnerService.hide();
    }, 3000);
  }

}
