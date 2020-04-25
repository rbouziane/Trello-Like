import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from '../services/project.service'
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
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

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
    newProject.author = {
      id: user.uid,
      email: user.email
    }
    if(this.fileUrl && this.fileUrl !== '') {
        newProject.photo = this.fileUrl;
    }
    this.projectService.createNewProject(newProject);
    this.router.navigate(['board']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.projectService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
