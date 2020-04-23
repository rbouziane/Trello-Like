import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Subject } from 'rxjs'
import { Card } from '../models/card.models'

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards: Card[] = [];
  cardsSubject = new Subject<Card[]>();
  projectIndex = 0;

  constructor() {}

  initCardProjectId(projectId: number) {
    this.projectIndex = projectId;
    this.getCards()
  }

  emitCards() {
    this.cardsSubject.next(this.cards);
  }

  saveCards() {
    var user = firebase.auth().currentUser;
    firebase.database().ref(`/projects/${user.uid}/` + this.projectIndex + `/cards`).set(this.cards);
  }

  getCards() {
    var user = firebase.auth().currentUser;
    firebase.database().ref(`/projects/${user.uid}/` + this.projectIndex + `/cards`)
      .on('value', (data) => {
        this.cards = data.val() ? data.val() : [];
        this.emitCards();
      });
  }

  getSingleCard(id: number) {
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

  createNewCard(newCard: Card) {
    this.cards.push(newCard);
    this.saveCards();
    this.emitCards();
  }

  removeCard(card: Card) {
    const cardIndexToRemove = this.cards.findIndex(
      (cardEl) => {
        if (cardEl === card) {
          return true;
        }
      }
    )
    this.cards.splice(cardIndexToRemove, 1);
    this.saveCards();
    this.emitCards();
  }
}
