import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {

  ads: any = [];
  validateForm!: FormGroup;

  constructor(private clientService: ClientService,
              private fb: FormBuilder,
              private notification: NzNotificationService){}

  getAllAds(){
    this.clientService.getClientAds().subscribe(res=>{
      this.ads = res;
    })
  }

  //getAllAds() {
    //this.clientService.getClientAds().subscribe(res => {
      //this.ads = res;
      //this.showNotification('Success', 'Ads have been successfully loaded!');
    //}, error => {
      //this.showNotification('Error', 'Failed to load ads.');
    //});
  //}
  
  ngOnInit(){
    this.validateForm = this.fb.group({
      service: [null,[Validators.required]]
    })
    this.getAllAds();
  }
  searchAdByName(){
    this.clientService.searchAdByName(this.validateForm.get(['service']).value).subscribe(res=>{
      this.ads = res;
    })
  }

  updateImg(img) {
    return 'data:image/jpeg;base64,'+img;
  }
  
  showNotification(title: string, content: string) {
    this.notification.info(
      title,
      content,
      { nzDuration: 3000 }
    );
  }
  
}