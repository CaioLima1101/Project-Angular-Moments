import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message = ''

  constructor() { }

  add(message: string){
    this.message = message

    setTimeout(() => {
      this.clear()
    }, 2200)
  }

  clear(){
    this.message = ''
  }
}