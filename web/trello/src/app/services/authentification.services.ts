import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class Authentification {

  private user;

  constructor(private httpClient: HttpClient) {}

  register() {
    this.user =
    [
      {
        id: 5,
        email: "pas@ok.fr",
        name: "pas",
        password: "123"
      }
    ];
    this.httpClient
    .put('https://trello-34a0b.firebaseio.com/users.json', this.user)
    .subscribe(
      () => {
        console.log('Register done !');
      },
      (error) => {
        console.log('Error of save !' + error);
      }
    )
  }

  login() {
    console.log("ok");
    this.httpClient
    .get('https://trello-34a0b.firebaseio.com/users.json')
    .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('Error of load !' + error);
      }
    );
  }
}
