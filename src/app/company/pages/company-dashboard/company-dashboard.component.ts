import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../basic/services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {
  bookings: any[] = []; // Liste des réservations
  loading: boolean = false; // Indicateur de chargement
  currentBookingId: number | null = null; // ID de la réservation en cours de traitement

  constructor(
    private companyService: CompanyService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getAllAdBookings();
  }

  /**
   * Récupère toutes les réservations
   */
  getAllAdBookings(): void {
    this.companyService.getAllAdBookings().subscribe(
      (res) => {
        console.log('Réservations récupérées :', res);
        this.bookings = res;
      },
      (error) => {
        this.notification.error(
          'ERROR',
          'Failed to fetch bookings. Please try again.',
          { nzDuration: 5000 }
        );
      }
    );
  }

  /**
   * Change le statut d'une réservation
   * @param bookingId ID de la réservation
   * @param status Nouveau statut (Approve ou Reject)
   */
  changeBookingStatus(bookingId: number, status: string): void {
    this.loading = true;
    this.currentBookingId = bookingId;

    this.companyService.changeBookingStatus(bookingId, status).subscribe(
      (res) => {
        this.notification.success(
          'SUCCESS',
          `Booking status changed to ${status}!`,
          { nzDuration: 5000 }
        );
        this.getAllAdBookings(); // Met à jour la liste des réservations
        this.loading = false;
        this.currentBookingId = null;
      },
      (error) => {
        this.notification.error(
          'ERROR',
          error.message || 'An error occurred while changing the booking status.',
          { nzDuration: 5000 }
        );
        this.loading = false;
        this.currentBookingId = null;
      }
    );
  }
}
