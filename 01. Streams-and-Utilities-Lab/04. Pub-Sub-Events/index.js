import "./init.js";

import eventEmitter from "./messageBroker.js";

function createUser(name) {
  // TODO Create user in database
  console.log(`Createing user ${name}...`);

  // Emit event
  eventEmitter.emit("user.created", name);
}

createUser("Pesho");
createUser("Gosho");
