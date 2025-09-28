import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import {setupRoutes} from "./src/routes/index.js";
import {setupWebSocket} from "./src/web-socket/index.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import Fingerprint from "express-fingerprint";
import morgan  from  'morgan';
import {setupTelegramBot} from "./src/telegram/index.js";
import {initUsersDb} from "./src/storage/users/users-storage.js";
import {env} from "./src/constants/env.js";

const { BOT_PORT,BOT_TOKEN  } = env

const app = express();
app.use(morgan('dev'));
app.use(cors({
    origin: ['*'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(Fingerprint());

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({
    autoPong:true,
    server,
    path: '/api/ws/'
});

setupRoutes(app);
setupWebSocket(webSocketServer);

server.listen(BOT_PORT,  async () => {
    console.log(`app listen : http://localhost:${BOT_PORT}/`);

    await  setupTelegramBot( BOT_TOKEN )
    await  initUsersDb();
});
