import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  create() {
      this.router.navigate(['register']);
  }

  onSubmit(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['board']);
      },
      (error) =>{
       this.errorMessage = error;
      }
    )
  }
}
