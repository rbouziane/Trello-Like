import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service'
import { Project } from '../models/project.models'
import { Subscription } from 'rxjs'
import * as firebase from 'firebase'
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  projects: Project[];
  projectsSubscription: Subscription;

  constructor(
              private projectService: ProjectService,
              private router: Router,
              private route:  ActivatedRoute
              ) {}

  ngOnInit(): void {
    this.projectsSubscription = this.projectService.projectsSubject.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    )
    this.projectService.getProjects();
    this.projectService.emitProjects();
  }

  create()
  {
      console.log(this.projects);
      var user = firebase.auth().currentUser;
      const newProject = new Project("un titre1", "une description1");
      newProject.author = {
        id: user.uid,
        email: user.email
      }
      this.projectService.createNewProject(newProject);
  }

  add() {
    this.router.navigate(['new-projet']);
  }
  remove (project: Project) {
    if(confirm("Voulais vous vraiment supprimé le projet ?")) {
      this.projectService.removeProject(project);
    }
  }

  card(index: number, title: string) {
    this.router.navigate(['card', index, title]);
  }
}
