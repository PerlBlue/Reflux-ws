# Reflux-ws
React and Reflux usage in real-time applications based on websockets

# Prerequisites
You need to install `node` locally. See https://blog.teamtreehouse.com/install-node-js-npm-mac

There are three branches in this repository to demonstrate three aspects.

# ynap-demo-react

Demonstrates running a react only web client (on port 8080)

Initial setup.

```bash
$ git clone git@github.com:PerlBlue/reflux-ws.git ynap-demo-react
$ cd ynap-demo-react/client
$ git checkout ynap-demo-react
$ npm install
```

Then, and subsequently, the following will run a client (on port `localhost:8080`)
```
$ npm run start
```

# ynap-demo-reflux
Demonstrates running a react only web client (on port 8081)

Initial setup.

```bash
$ git clone git@github.com:PerlBlue/reflux-ws.git ynap-demo-reflux
$ cd ynap-demo-reflux/client
$ git checkout ynap-demo-reflux
$ npm install
```

Then, and subsequently, the following will run a client (on port `localhost:8081`)
```
$ npm run start
```

# ynap-demo-websocket
Demonstrates running a react only web client (on port 8082)

Initial setup.

```bash
$ git clone git@github.com:PerlBlue/reflux-ws.git ynap-demo-websocket
$ cd ynap-demo-websocket/client
$ git checkout ynap-demo-websocket
$ npm install
```

Then, and subsequently, the following will run a client (on port `localhost:8082`)
```
$ npm run start
```

# NOTE
If you switch between different branches in the same directory then you need to rebuild all the npm modules.
```bash
$ rm package-lock.json
$ rm -rf node_modules
$ npm install
$ npm run start
```



