import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TextMessage } from '../Model/text-message.model';
import {HttpClient,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
    })
  };
  sendMessage(textMessage: TextMessage){
    var reqBody = {
      "projectId": environment.dialogflow.projectId,
      "requestText": textMessage.text
    }

    return this.http.post(environment.backend.requestTextUrl, reqBody, this.httpOptions)
  }
}
