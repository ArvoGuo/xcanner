const net = require("net");

const PORT_MAX_NUMBER = 65535;
const SOCKET_TIMEOUT = 400;
const allPorts = Array.from({ length: PORT_MAX_NUMBER }, (v, i) => i + 1);

const scanOnePort = async (host, port) => {
  return new Promise((resolve, reject) => {
     let socket = new net.Socket(); 
     socket._data = {
         host,
         port,
         status: 'init'
     }

     socket.setTimeout(SOCKET_TIMEOUT);
     socket.on('connect', () => {
         socket._data.status = 'active';
        socket.destroy()
     })
     socket.on('timeout', () => {
        socket._data.status = 'timeout';
        socket.destroy()
    })
    socket.on('error', (e) => {
        socket._data.status = 'error';
        socket.destroy()
    })
    socket.on('close', () => {
        resolve(socket._data)
    })
    socket.connect(port, host)

  });
};

const scanPorts = async (host, ports) => {
  let result = [];
  let index = 0
  while(index < ports.length) {
    result.push(await scanOnePort(host, ports[index]))
    index ++ 
  }
  return result
};

// let from = 0, to = 10000;
// let ports = Array.from({ length: to - from }, (v, i) => from + i);
// scanPorts('127.0.0.1', ports)

module.exports = async (options) => {
  const { host, from, to, port } = options;

  if (!host) {
    throw new Error('host is Empty');
  }

  if (from && !to) {
    throw new Error('to is Empty');
  }
  if (!from && to) {
    throw new Error('from is Empty');
  }

  if (from && to) {
    if (from > PORT_MAX_NUMBER || to > PORT_MAX_NUMBER) {
      throw new Error('from/to is over max_number ' + PORT_MAX_NUMBER);
    }
    let ports = Array.from({ length: Number(to) - Number(from) }, (v, i) => Number(from) + i);
    let result = await await scanPorts(host, ports)
    return result.filter(item => item.status === 'active' || item.status === 'timeout')
  }

  if (port) {
    return await scanPorts(host, [port]);
  }
  let result = await await scanPorts(host, allPorts)
  return result.filter(item => item.status === 'active' || item.status === 'timeout')
};
