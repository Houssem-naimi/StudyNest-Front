import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {finalize} from "rxjs";
import {CompanyService} from "../../../basic/services/company.service";

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss'
})
export class CompanyProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    // Initialise le formulaire de profil avec des validations de base
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
    this.loadUserProfile();
  }

  // Charge les informations de profil de l'utilisateur
  /*loadUserProfile(): void {
    this.isLoading = true;
    this.clientService.getUserProfile().subscribe(
      (data) => {
        this.profileForm.patchValue({
          name: data.name,
          email: data.email,
          phone: data.phone
        });
        this.isLoading = false;
      },
      (error) => {
        this.message.error('Erreur lors du chargement des informations de profil');
        this.isLoading = false;
      }
    );
  }*/

  loadUserProfile(): void {
    this.isLoading = true;
    this.companyService.getUserProfile().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        if (data && data.name && data.email && data.phone) {
          this.profileForm.patchValue({
            name: data.name,
            email: data.email,
            phone: data.phone
          });
        } else {
          this.message.error('Données de profil incomplètes');
        }
      },
      error: (error) => {

        this.message.error('Erreur lors du chargement des informations de profil');
      },
      complete: () => {
        console.log('Profile data load complete');
      }
    });
  }


  // Soumet le formulaire de mise à jour de profil

  /*onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.clientService.updateUserProfile(this.profileForm.value).subscribe(
      () => {
        this.message.success('Profil mis à jour avec succès');
        this.isLoading = false;
      },
      (error) => {
        this.message.error('Erreur lors de la mise à jour du profil');
        this.isLoading = false;
      }
    );
  }*/
  onUpdateProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.companyService.updateUserProfile(this.profileForm.value).subscribe({
      next: () => {
        this.message.success('Profil mis à jour avec succès');
        //this.isLoading = false;
      },
      error: (error) => {
        this.message.error('Erreur lors de la mise à jour du profil');
        //this.isLoading = false;
      },
      complete: () => {
        // Optional: any actions to take after the update completes successfully
        console.log('Profile update completed');
      }
    });
  }


}
