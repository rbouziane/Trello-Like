import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {


  projects = [
  {
    Name: 'project1',
    contente: 'lololololololo'
  },
  {
    Name: 'project2',
    contente: 'lololololololo'
  },
  {
    Name: 'project3',
    contente: 'chatrjddzqdzqdzqdqzdzq'
  }
];

  constructor() { }

  ngOnInit(): void {
  }

}
