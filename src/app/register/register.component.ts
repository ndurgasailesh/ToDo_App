import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    roles = ['Admin','User'];
    errors: any = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['', [Validators.required]],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }


     /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  changeRole(e: { target: { value: any; }; }) {
    this.form.controls['role'].setValue(e.target.value, {
      onlySelf: true,
    });
  }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: (res:any) => {
                  console.log(res);
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error:error => {
                  this.errors = error;
                  console.log( this.errors);

                  this.loading = false;
              }
            });
    }
}