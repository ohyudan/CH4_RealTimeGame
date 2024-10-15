import { CLIENT_VERSION } from './Constants.js';
import { client_response_data } from './response/response.js';
import { game_ServerConnnect_Start } from './response/client_GameAsset.js';
const socket = io('http://localhost:4000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

export let connection_successful = false;
let userId = null;

socket.on('response', async (data) => {
  client_response_data.result(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  game_ServerConnnect_Start();
  connection_successful = true;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export { sendEvent };
