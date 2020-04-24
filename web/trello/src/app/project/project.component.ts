import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../services/project.service'//supp
import { Project } from '../models/project.models'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input() Name: string;
  @Input() contente: string;
  //@Object() project: Project;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  remove (project: Project) {
      this.projectService.removeProject(project);
  }
}
