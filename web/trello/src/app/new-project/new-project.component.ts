import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from '../services/project.service'//supp
import { Project } from '../models/project.models'
import {Router} from "@angular/router";
import * as firebase from 'firebase'

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private projectService: ProjectService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  back() {
      this.router.navigate(['board']);
  }
  sub(form: NgForm) {
    const name = form.value['name'];
    const description = form.value['description'];
    var user = firebase.auth().currentUser;
    const newProject = new Project(name ,  description);
    newProject.author = {//supp
      id: user.uid,//supp
      email: user.email//supp
    }
    this.projectService.createNewProject(newProject);
    this.router.navigate(['board']);
  }

}
