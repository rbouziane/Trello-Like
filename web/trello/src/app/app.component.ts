import { Component } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyAbQ0VUbZm9CdZ8omES_04B9yt14RJM6TM",
      authDomain: "trello-34a0b.firebaseapp.com",
      databaseURL: "https://trello-34a0b.firebaseio.com",
      projectId: "trello-34a0b",
      storageBucket: "trello-34a0b.appspot.com",
      messagingSenderId: "933265395552",
      appId: "1:933265395552:web:92b593e7a144c06ea1d805",
      measurementId: "G-KJH80VFT0L"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
