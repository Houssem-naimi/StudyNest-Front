import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  bookedServices:any;

  constructor(private clientService:ClientService){}

  ngOnInit(){
    this.getMyBookings();
  }

  //getMyBookings() {
  //this.clientService.getMyBookings().subscribe(res => {
    //this.bookedServices = res.map((booking: any) => ({
      //...booking,
      // Vérifie si les dates sont valides avant de les formater
      //bookDate: this.parseValidDate(booking.bookDate),
      //startDate: this.parseValidDate(booking.startDate),
      //endDate: this.parseValidDate(booking.endDate),
    //}));
  //});
//}
getMyBookings() {
  this.clientService.getMyBookings().subscribe(res => {
    console.log('Réponse API :', res); // Débogage
    this.bookedServices = res.map((booking: any) => ({
      ...booking,
      startDate: booking.startDate ? new Date(booking.startDate) : null,
      endDate: booking.endDate ? new Date(booking.endDate) : null,
    }));
  });
}


// Méthode utilitaire pour valider et formater les dates
parseValidDate(date: any): Date | null {
  if (date && !isNaN(Date.parse(date))) {
    return new Date(date);
  }
  return null; // Retourne null si la date est invalide
}

}
