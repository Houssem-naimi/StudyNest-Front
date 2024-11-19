import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { AdDetailComponent } from './pages/ad-detail/ad-detail.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { ReviewComponent } from './pages/review/review.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';  // Import for nz-rate
import { NzButtonModule } from 'ng-zorro-antd/button';  // Import for nz-button
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';  // Corrected import

@NgModule({
  declarations: [
    ClientComponent,
    ClientDashboardComponent,
    AdDetailComponent,
    MyBookingsComponent,
    ReviewComponent,
    ClientProfileComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    FormsModule,
    NzIconModule,
    NzRateModule,  // Added for nz-rate
    NzButtonModule,  // Added for nz-button
    NzDropDownModule,  // Corrected for dropdown
  ]
})
export class ClientModule { }
