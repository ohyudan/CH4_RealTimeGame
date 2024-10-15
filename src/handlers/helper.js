import { createStage } from '../models/stage.model.js';
import { getUsers, removeUser } from '../models/user.model.js';
import { CLIENT_VERSION } from '../constants.js';
import handlerMappings from './handlerMapping.js';
export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id);
  console.log('User disconnected:' + socket.id);
  console.log(`current users:`, getUsers());
};

export const handleConnection = (socket, userUUID) => {
  console.log(`new user connected: ${userUUID} with socket ID ${socket.id}`);
  console.log(`Current users:`, getUsers());

  createStage(userUUID);

  socket.emit('connection', { uuid: userUUID, currentStage: 1000 });
};
export const handleEvent = async (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    socket.emit('response', {
      status: 'fail',
      message: 'Client version mismatch',
    });
    return;
  }
  const handler = handlerMappings[data.handlerId];
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
  }

  const response = await handler(data.userId, data.payload);
  // if (response.broadcast) {
  //   io.emit('response', 'broadcast');
  //   return;
  // }

  socket.emit('response', response);
};
