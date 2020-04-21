import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['login']);
      },
      (error) =>{
       this.errorMessage = error;
      }
    )
  }

  return() {
      this.router.navigate(['login']);
  }
}
