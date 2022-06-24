import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../Model/message-model';
import { ResponseMesssage } from '../Model/response-message.model';
import { TextMessage } from '../Model/text-message.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  BACK_ENABLED: boolean = true;
  @Input('messages') messages?: Message[];
  @Input('colorBackRight') colorBackRight? : string;
  @Input('colorFontRight') colorFontRight?: string;
  @Input('colorBackLeft') colorBackLeft?: string;
  @Input('colorFontLeft') colorFontLeft?: string;

  textInput: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
  }

  sendMessage() {
    let newMessage: Message = {text: this.textInput, date:"", userOwner:true};

    this.messages?.push(newMessage);
    let messageBack: TextMessage = {"firstname": environment.firstName, "text": this.textInput};
    if (this.BACK_ENABLED) {
        this.chatService.sendMessage(messageBack)
        .subscribe((res: ResponseMesssage) => {
            console.log(res);
            let messageReturn: Message = { text: res.responseMessage, date: new Date().toDateString(), userOwner: false}
            // let messageReturn = {"text": res.json().speech_answer, "date": "", "userOwner": false};
            this.messages?.push(messageReturn);
        });
    }
    this.textInput = '';
  }

  onKey(event: any) {
    if (event.keyCode == 13) {
      this.sendMessage()
    }
  }
}
