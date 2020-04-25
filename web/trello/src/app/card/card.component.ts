import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { Card } from "../models/card.models";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CardService} from "../services/card.service";
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  card: Card[];
  CardSubscription: Subscription;
  title: string;
  cardForm: FormGroup;

  constructor(private route:  ActivatedRoute,
              private cardService: CardService,
              private formBuilder: FormBuilder) { }

  initForm() {
    this.cardForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.initForm();
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.title = this.route.snapshot.paramMap.get('title');
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

  save(form: NgForm, id: number) {
    //pour que la save ce fasse
    // const title = form.value['title'];
    // const label = form.value['label'];
    // const description = form.value['description'];
    //this.card[id].title = title
    //this.card[id].label = label
    //this.card[id].description = description
    this.cardService.saveCards();
  }
  delet(card: Card) {
    this.cardService.removeCard(card)
  }
}
