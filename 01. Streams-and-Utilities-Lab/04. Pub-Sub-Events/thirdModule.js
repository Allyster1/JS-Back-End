import eventEmitter from "./messageBroker.js";

eventEmitter.on("user.created", (name) => {
  console.log("Another module is listening for user.created...");
});
