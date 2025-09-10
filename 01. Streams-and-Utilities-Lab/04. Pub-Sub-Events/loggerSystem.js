import eventEmitter from "./messageBroker.js";

function onUserCreated(name) {
  console.log(`User ${name} has been created!`);
}

eventEmitter.on("user.created", onUserCreated);
