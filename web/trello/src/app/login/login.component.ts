import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  create() {
      this.router.navigate(['register']);
  }

  acess(form: NgForm) {
    const name = form.value['name'];
    const email = form.value['password'];
    console.log(form.value);
    //this.router.navigate(['board']);
  }
}
