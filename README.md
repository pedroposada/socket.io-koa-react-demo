# Demo on socket.io with koa and react

Clientside and Serverside application to demonstrate how to plug sockets into koa and react. 
Its comprised of an Admin UI page to send messages to a Client page.
Admin UI page will also display the number of clients that are currently connected to the server. 
Once you have installed modules and compiled Admin UI and Client, you can start the server.  

## Components

##### Admin UI
User interface to send a message to the client

##### Client
User interface that displays a message sent from Admin UI


## Commands

Run ``npm install`` separately inside the three top level folders, admin, backend and client, to download required modules.

Compile Admin UI.
Run this command inside the ``/admin`` folder
```
BASENAME='/admin/dist' npm run deploy:prod
```

Compile Client.
Run this command inside ``/client`` folder
```
npm run deploy:prod
```

Start server in development mode.
Run this command inside the ``/backend`` folder
```
npm run backend:dev
```

Optionally start server in production mode.
Run this command inside the ``/backend`` folder
```
npm run backend:prod
```

##### To view Admin UI go to htt://localhost:5000/admin/dist
type in a message in the form and hit send

##### To view Client go to http://localhost:5000/client/dist
message should appear in the box instantly
