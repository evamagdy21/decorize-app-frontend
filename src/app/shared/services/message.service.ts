import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new BehaviorSubject<string>("Empty String");
 
  sendMessage(message: string) {
      this.subject.next(message);
  }

  clearMessage() {
      this.subject.next("");
  }

  getMessage(): Observable<string> {
      return this.subject.asObservable();
  }
}
