import React from "react";
import socketClient from 'socket.io-client';

    export function Test() {
        
        var socket = socketClient ('http://130.240.114.29:5000/');
        console.log(socket)
        socket.on('connect', () => {
            console.log(socket)
            socket.emit('widefind')
            socket.on('new-message', data => {
                console.log(data)
                // Do something with message
            });
            console.log(`I'm connected with the back-end`);
        });
       
      
        return (
          <p>
            It's </p>
        );
      }