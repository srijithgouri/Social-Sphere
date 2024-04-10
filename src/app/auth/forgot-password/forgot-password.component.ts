import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgotPasswordDto } from './forgot-password-dto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OtpService } from 'src/app/services/otp.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  showSuccess: boolean;
  showError: boolean;
  otpForm: FormGroup;
  phoneNumber: string;
  enteredOtp: string;
  email: string;
  
  constructor(private http: HttpClient, private otpService: OtpService, private toastr: ToastrService,
     private router: Router) { }
  
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    })
    this.otpForm = new FormGroup({
      phoneNumber: new FormControl("",Validators.required),
      enteredOtp: new FormControl("",Validators.required)
    })
    this.email = '';
  }
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.get(controlName)?.invalid && this.forgotPasswordForm.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.get(controlName)?.hasError(errorName)
  }
  public forgotPassword(forgotPasswordFormValue: any) {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email
    }
    this.http.post('api/auth/forgot-password', forgotPassDto)
    .subscribe({
      next: (_) => {
      this.showSuccess = true;
      this.successMessage = 'The link has been sent, please check your email to reset your password.'
    },
    error: (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }})
  }

  public sendotp(phoneNumber: string){
    this.otpService.sendotp(phoneNumber).subscribe((data: any) => {
      this.toastr.success("Otp sent sucessfully!");
    },(error) => {
      this.toastr.error('Failed to send OTP!');
    })
  }

  public verifyotp(phoneNumber:string,enteredOtp:string){
    console.log(phoneNumber);
    this.otpService.verifyOtp(phoneNumber,enteredOtp).subscribe((data: any) => {
      this.toastr.success("Otp verified sucessfully!");
      this.router.navigate(['/resetpassword'], { queryParams: { email: data.email } });
    },(error) => {
      this.toastr.error('check OTP');
    });
  }
}
