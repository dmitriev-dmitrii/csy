async function onSocketConnect(ws, {url, headers}) {

    ws.on('message', (payload) => {

        let data = JSON.parse(payload);
        console.log('ws-message' , data)
    });

    ws.on('close', () => {

    });
}

export const setupWebSocket = (webSocketServer) => {
    webSocketServer.on('connection', onSocketConnect.bind({webSocketServer}));
}
