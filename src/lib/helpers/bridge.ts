async function get(data: any) {
  return new Promise((resolve, reject) => {
    function listener(event: Event) {
      if(event.data.name == data.name + "_res") {
        resolve(event.data.data);
        remove();
      }
    }
    window.addEventListener("message", listener);
    function remove() {
      window.removeEventListener("message", listener);
    }
    window.parent.postMessage(data);
  });
}
async function set(data: any) {
  data.name = "set_" + data.name 
  return new Promise((resolve, reject) => {
    function listener(event: Event) {
      if (event.data.name == data.name + "_res") {
        resolve(event.data);
        remove();
      }
    }
    window.addEventListener("message", listener);
    function remove() {
      window.removeEventListener("message", listener);
    }
    window.parent.postMessage(data);
  });
}

function listen(callback = (x) => x) {
  window.addEventListener("message", (event) => {
    callback(event);
  });
}

function respond(event, data: any) {
  let newData = {name: event.data.name + "_res", data }
  event.source.postMessage(newData);
}
let server = {
  listen,
  respond,
};
let client = {
  get,
  set
};

export { server, client };
