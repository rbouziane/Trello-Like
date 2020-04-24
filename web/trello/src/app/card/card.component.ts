import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { Card } from "../models/card.models";
import { CardService} from "../services/card.service";
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() Name: string;
  @Input() contente: string;
  card: Card[];
  CardSubscription: Subscription;

  constructor(private route:  ActivatedRoute,
              private cardService: CardService) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.CardSubscription = this.cardService.cardsSubject.subscribe(
      (card: Card[]) => {
        this.card = card;
      }
    )
    this.cardService.initCardProjectId(id);
    this.cardService.emitCards();
    console.log(this.card);
  }
  create() {
    const newCard = new Card(" ", " ", "server");
    this.cardService.createNewCard(newCard);
  }

  save() {
    this.cardService.saveCards();
  }
  delet(card: Card) {
    this.cardService.removeCard(card)
  }
}
