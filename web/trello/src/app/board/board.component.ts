import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service'//supp
import { Project } from '../models/project.models' //supp
import { Subscription } from 'rxjs' //supp
import * as firebase from 'firebase'//supp
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  projects: Project[]; //supp
  projectsSubscription: Subscription; //supp

  constructor(
              private projectService: ProjectService,
              private router: Router,
              private route:  ActivatedRoute
              ) {}

  ngOnInit(): void {
    this.projectsSubscription = this.projectService.projectsSubject.subscribe(//supp
      (projects: Project[]) => {//supp
        this.projects = projects;//supp
      }//supp
    )//supp
    this.projectService.getProjects();//supp
    this.projectService.emitProjects();//supp
  }

  create()
  {
      console.log(this.projects);//supp
      var user = firebase.auth().currentUser;//supp
      const newProject = new Project("un titre1", "une description1");//supp
      newProject.author = {//supp
        id: user.uid,//supp
        email: user.email//supp
      }//supp
      this.projectService.createNewProject(newProject);//supp
      // this.projectService.createNewProject("une titr", "une desciption") //supp
  }

  add() {
    this.router.navigate(['new-projet']);
  }
  remove (project: Project) {
    if(confirm("Voulais vous vraiment supprimé le projet ?")) {
      this.projectService.removeProject(project);
    }
  }

  card(index: number) {
    this.router.navigate(['card', index]);
  }
}
