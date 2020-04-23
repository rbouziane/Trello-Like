export class Project {
  author: {
    id: string
    email: string
  }
  cards: {
    title: string
    description: string
  }
  constructor(public title: string, public description: string) {}
}
