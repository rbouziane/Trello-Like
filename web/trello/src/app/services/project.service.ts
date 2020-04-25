import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Subject } from 'rxjs'
import { Project } from '../models/project.models'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [];
  projectsSubject = new Subject<Project[]>();

  constructor() {
    this.getProjects()
  }

  emitProjects() {
    this.projectsSubject.next(this.projects);
  }

  saveProjects() {
    var user = firebase.auth().currentUser;
    firebase.database().ref(`/projects/${user.uid}`).set(this.projects);
  }

  getProjects() {
    var user = firebase.auth().currentUser;
    firebase.database().ref(`/projects/${user.uid}`)
      .on('value', (data) => {
        this.projects = data.val() ? data.val() : [];
        this.emitProjects();
      });
  }

  getSingleProject(id: number) {
    var user = firebase.auth().currentUser;
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(`/projects/${user.uid}/` + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        )
      }
    )
  }

  createNewProject(newProject: Project) {
    this.projects.push(newProject);
    this.saveProjects();
    this.emitProjects();
  }

  removeProject(project: Project) {
    if (project.photo) {
      const storageRef = firebase.storage().refFromURL(project.photo)
      storageRef.delete().then(
        () => {
          console.log("Photo supprimée !");
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      )
    }
    const projectIndexToRemove = this.projects.findIndex(
      (projectEl) => {
        if (projectEl === project) {
          return true;
        }
      }
    )
    this.projects.splice(projectIndexToRemove, 1);
    this.saveProjects();
    this.emitProjects();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        )
      }
    )
  }
}
