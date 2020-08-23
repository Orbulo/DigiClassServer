import 'dotenv/config';
import app from '~/app';
import http from 'http';
import createDebug from 'debug';
import socketio from 'socket.io';
import onConnection from '~/socketio';
import Redis from 'ioredis';
import camelcase from 'camelcase';

const debug = createDebug('server:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = socketio(server);

const classroomSub = new Redis(process.env.REDIS_URL);
classroomSub.psubscribe(`classroom:*`);
classroomSub.on('pmessage', (pattern, channel, msg) => {
  const [, classroomId, topic] = channel.split(':');
  io.in(classroomId).emit(camelcase(topic, {pascalCase: true}), JSON.parse(msg));
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log('User disconnected.');
    });

    socket.on('connectToClassroom', async (classroomId) => {
      socket.join(classroomId);
    });

    socket.on('joinRoom', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('userConnected', userId)

      socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('userDisconnected', userId)
      });
    })
  }
);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log('Listening on port ' + port));
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
