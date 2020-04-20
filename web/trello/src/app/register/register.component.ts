import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  back(form: NgForm) {
    const name = form.value['name'];
    const email = form.value['email'];
    const password = form.value['password'];
    console.log(form.value);
    //this.router.navigate(['login']);
  }

  return() {
      this.router.navigate(['login']);
  }
}
