import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SocketExample';

  public messages: Array<any>;
  public chatBox: string;

  public constructor(
    private socket: SocketService
  ){
    this.messages = [];
    this.chatBox = "";
  }

  public ngOnInit(){
    this.socket.getEventListener().subscribe(
      event => {
        if (event.type == "message"){
          let data = event.data.Content;
          if(event.data.Sender){
            data = event.data.Sender + ": "+ data;
          }
          this.messages.push(data);
        }

        if(event.type == "close"){
          this.messages.push("/The socket connection has been closed");
        }

        if(event.type == "open"){
          this.messages.push("/The socket connection has been established");
        }
      }
    )
  }

  public ngOnDestroy(){
    this.socket.close();
  }

  public send(){
    if(this.chatBox){
      this.socket.send(this.chatBox);
      this.chatBox = "";
    }
  }

  public isSystemMessage(message: string){
    return message.startsWith("/") ? "<strong>" + message.substring(1) + "</strong>" : message;
  }
}
