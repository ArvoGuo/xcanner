const net = require("net");
const { logProgress } = require("./utils");

const PORT_MAX_NUMBER = 65535;
const SOCKET_TIMEOUT = 200;
const MAX_CONNECT = 100;
const DEFAULT_FILTER = "active";
const allPorts = Array.from({ length: PORT_MAX_NUMBER }, (v, i) => i + 1);

const scanOnePort = async (host, port) => {
  return new Promise((resolve, reject) => {
    let socket = new net.Socket();
    socket._data = {
      host,
      port,
      status: "init",
    };

    socket.setTimeout(SOCKET_TIMEOUT);
    socket.on("connect", () => {
      socket._data.status = "active";
      socket.destroy();
    });
    socket.on("timeout", () => {
      socket._data.status = "timeout";
      socket.destroy();
    });
    socket.on("error", (e) => {
      socket._data.status = "error";
      socket.destroy();
    });
    socket.on("close", () => {
      resolve(socket._data);
    });
    socket.connect(port, host);
  });
};

const scanPorts = async (host, ports, options) => {
  let result = [];
  let portsTmp = ports.slice();
  let queue = [];
  let max_batch = options.speed;

  while (portsTmp.length) {
    if (queue.length <= max_batch) {
      let newPort = portsTmp.shift();
      queue.push(scanOnePort(host, newPort));
      if (portsTmp.length > 0) {
        continue;
      }
    }
    let queueResult = await Promise.all(queue);
    let queueFilterResult = resultFilter(queueResult, options);
    if (queueFilterResult.length > 0) {
      console.log('Progress Find: ', queueFilterResult);
    }
    result = result.concat(queueFilterResult);
    queue = [];
    logProgress(ports.length - portsTmp.length, ports.length, max_batch);
  }
  return result;
};

function resultFilter(result, options) {
  return result.filter((item) => options.filter.includes(item.status));
}

module.exports = async (options) => {
  const { host, from, to, port, speed, filter } = options;

  if (!host) {
    throw new Error("host is Empty");
  }

  if (from && !to) {
    throw new Error("to is Empty");
  }
  if (!from && to) {
    throw new Error("from is Empty");
  }

  if (speed && isNaN(speed)) {
    throw new Error("speed shoud be number");
  }

  options.speed = Number(speed) || MAX_CONNECT;
  options.filter = filter || DEFAULT_FILTER;
  if (from && to) {
    if (from > PORT_MAX_NUMBER || to > PORT_MAX_NUMBER) {
      throw new Error("from/to is over max_number " + PORT_MAX_NUMBER);
    }
    let ports = Array.from(
      { length: Number(to) - Number(from) },
      (v, i) => Number(from) + i
    );
    return await await scanPorts(host, ports, options);
  }

  if (port) {
    return await scanPorts(host, [port], {...options, filter: 'active|timeout|error'});
  }
  return await await scanPorts(host, allPorts, options);
};
