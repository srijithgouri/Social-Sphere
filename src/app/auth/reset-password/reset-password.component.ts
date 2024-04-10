import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ResetPasswordDto } from './reset-password-dto';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  private token: string;
  private email: string;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  
  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, this.passwordValidator()])
    });
    this.email = this.route.snapshot.queryParams['email'];
    console.log(this.email);
  }

  public validateControl = (controlName: string) => {
    const control = this.resetPasswordForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    const control = this.resetPasswordForm.get(controlName);
    return control?.hasError(errorName);
  }

  public resetPassword(resetPasswordFormValue: any){
    this.showError = this.showSuccess = false;
    const resetPass = { ... resetPasswordFormValue };
    const resetPassDto: ResetPasswordDto = {
      password: resetPass.password,
      email: this.email
    }
    this.http.post('api/auth/reset-password', resetPassDto)
    .subscribe({
      next:(_) => this.showSuccess = true,
    error: (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }});
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        // If the control value is empty, no validation error
        return null;
      }
  
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const nonAlphanumericRegex = /[^a-zA-Z0-9]/;
      const numberRegex = /[0-9]/;
  
      const hasLowercase = lowercaseRegex.test(control.value);
      const hasUppercase = uppercaseRegex.test(control.value);
      const hasNonAlphanumeric = nonAlphanumericRegex.test(control.value);
      const hasNumber = numberRegex.test(control.value);
  
      const isValid =
        hasLowercase && hasUppercase && hasNonAlphanumeric && hasNumber && control.value.length > 7;
  
      if (!isValid) {
        // Return a validation error object if any criteria are not met
        return { invalidPassword: true };
      }
  
      return null; // No validation error
    };
  }
}
