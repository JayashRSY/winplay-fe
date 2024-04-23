import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as socketIo from 'socket.io-client';
// import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  // private clientSocket: any;

  constructor(private socket: Socket) {
    // this.clientSocket = socketIo.connect(environment.apiUrl.replace("/api", ""));
  }
  // listenToServer(connection: any) {
  //   return new Observable((subscriber) => {
  //     this.clientSocket.on(connection, (data: any) => {
  //       subscriber.next(data);
  //     });
  //   })
  // }
  // emitToServer(connection: any, data: any) {
  //   this.clientSocket.emit(connection, data);
  // }
  sendMessage(msg: string) {
    this.socket.emit('currentPeriod', msg);
  }
  getMessage() {
    return this.socket.fromEvent('currentPeriod').pipe(map(data => {
      console.log("data.msg")
    }));
  }
}
