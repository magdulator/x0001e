import React, {useEffect, useState} from "react";

import socketIOClient from 'socket.io-client';

    export function Test() {
        const [response, setResponse] = useState("");
      
        useEffect(() => {
          const socket = socketIOClient(process.env.REACT_APP_API_URL+'/api/test/widefind');
          socket.on("FromAPI", data => {
            setResponse(data);
            console.log("hej")
          });
      
        }, []);
      
        return (
          <p>
            It's <time dateTime={response}>{response}</time>
          </p>
        );
      }