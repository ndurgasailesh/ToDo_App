import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  
  loading = false;
  submitted = false;
  error = '';
  private readonly roleAdmin:string = "Admin";
  private readonly roleUser:string = "User";

  errors:any = [];

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.userValue) { 
        
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f['username'].value, this.f['password'].value)
          .pipe(first())
          .subscribe({
              next: (data:any) => {

                if(data && data.userRoles && data.userRoles.includes(this.roleAdmin)){
                this.router.navigate(['todo/all']);
                } else {
                    this.router.navigate(['todo']);
                }
              },
              error: error => {
                  this.errors = error;
                  this.loading = false;
              }
          });
  }
}
