import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.scss'
})
export class AdDetailComponent {

  adId = this.activatedRoute.snapshot.params['adId'];
  avatarUrl: any;
  ad:any;
  reviews:any;

  validateForm!:FormGroup;

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private notification: NzNotificationService,
              private fb: FormBuilder,
  ){}

  ngOnInit() {
    this.validateForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
    this.getAdDetailById();
  }
  

  getAdDetailById(){
    this.clientService.getAdDetailsByAdId(this.adId).subscribe(res=>{
      console.log(res);
      this.avatarUrl = 'data:image/jpeg;base64,'+ res.adDto.returnedImg;
      this.ad = res.adDto;
      this.reviews = res.reviewDtoList;
    })
  }
  //bookService(){
    //const bookServiceDto = {
      //bookDate: this.validateForm.get(['bookDate']).value,
      //adId: this.adId,
      //userId: UserStorageService.getUserId()
    //}
    //this.clientService.bookService(bookServiceDto).subscribe(res=>{
      //this.notification
      //.success(
        //'SUCCESS',
        //'Request posted succesfully',
        //{nzDuration: 5000}
      //);
      //this.router.navigateByUrl('/client/bookings');
    //})
  //}
  bookService() {
    const bookServiceDto = {
      startDate: this.validateForm.get(['startDate']).value,
      endDate: this.validateForm.get(['endDate']).value,
      adId: this.adId,
      userId: UserStorageService.getUserId()
    }
    this.clientService.bookService(bookServiceDto).subscribe(res => {
      this.notification.success(
        'SUCCESS',
        'Request posted successfully',
        { nzDuration: 5000 }
      );
      this.router.navigateByUrl('/client/bookings');
    });
  }
  

}
