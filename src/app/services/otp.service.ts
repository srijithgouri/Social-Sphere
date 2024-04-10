import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http: HttpClient) {}

  sendotp(phoneNumber:string){
    const params = new HttpParams()
    .set('phoneNumber', phoneNumber);
     return this.http.get('/send-sms', {params});
  }

  verifyOtp(phoneNumber:string,enteredOtp:string){
    const params = new HttpParams()
    .set('phoneNumber', phoneNumber)
    .set('enteredOtp', enteredOtp);
     return this.http.get('/verify-otp', {params});
  }
}
