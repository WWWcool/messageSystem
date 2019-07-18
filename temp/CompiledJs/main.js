"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageSystem_1 = require("./MessageSystem");
const Client_1 = require("./Client");
const SomeMessage_1 = require("./SomeMessage");
const SomeOtherMessage_1 = require("./SomeOtherMessage");
document.body.textContent = main();
function main() {
    let sys = new MessageSystem_1.MessageSystem();
    let client1 = new Client_1.Client(sys);
    let client2 = new Client_1.Client(sys);
    let client3 = new Client_1.Client(sys);
    client1.subscribe(SomeMessage_1.SomeMessage, client1OnSomeMessage);
    client2.subscribe(SomeOtherMessage_1.SomeOtherMessage, client2OnSomeOtherMessage);
    client3.subscribe(SomeMessage_1.SomeMessage, client3OnSomeMessage);
    console.log(`// direct send`);
    client2.send(new SomeMessage_1.SomeMessage("Hellow!"), [client1]);
    client1.send(new SomeOtherMessage_1.SomeOtherMessage("Hi!"), [client2]);
    console.log(`//broadcast`);
    client2.send(new SomeMessage_1.SomeMessage("Hellow guys!"));
    console.log(`// unsubscribe and broadcast`);
    client3.unsubscribe(SomeMessage_1.SomeMessage);
    client2.send(new SomeMessage_1.SomeMessage("Hellow guys!"));
    console.log(`// one client and several messages`);
    client1.subscribe(SomeOtherMessage_1.SomeOtherMessage, client1OnSomeOtherMessage);
    client3.send(new SomeMessage_1.SomeMessage("Where are you?"));
    client3.send(new SomeOtherMessage_1.SomeOtherMessage("You here?"));
    return "Test -- ok!";
}
function client1OnSomeMessage(msg) {
    console.log(`client1 | get some message - ${msg.message}`);
}
function client1OnSomeOtherMessage(msg) {
    console.log(`client1 | get some other message - ${msg.message}`);
}
function client2OnSomeOtherMessage(msg) {
    console.log(`client2 | get some other message - ${msg.message}`);
}
function client3OnSomeMessage(msg) {
    console.log(`client3 | get some message - ${msg.message}`);
}
