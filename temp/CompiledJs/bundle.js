(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseObject {
    constructor() {
        this.uid = undefined;
        this.uid = '_' + Math.random().toString(36).substr(2, 9);
    }
}
exports.BaseObject = BaseObject;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseObject_1 = require("./BaseObject");
class Client extends BaseObject_1.BaseObject {
    constructor(messageSystem) {
        super();
        this.messageSystem = null;
        console.log(`Client | created`);
        this.messageSystem = messageSystem;
    }
    subscribe(messageType, callback) {
        return this.messageSystem.subscribe(messageType, this.uid, callback);
    }
    unsubscribe(messageType) {
        return this.messageSystem.unsubscribe(messageType, this.uid);
    }
    send(message, receivers) {
        if (receivers != undefined) {
            for (let receiver of receivers) {
                this.messageSystem.send(message, receiver.uid);
            }
        }
        else {
            this.messageSystem.sendBroadcast(message);
        }
    }
}
exports.Client = Client;

},{"./BaseObject":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(message) {
        this.message = "Empty message...";
        this.message = message;
    }
    init(type) {
        this.type = type;
    }
}
exports.Message = Message;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageSystem {
    constructor() {
        console.log(`MessageSystem | created`);
        this.messageTypes = new Map();
    }
    subscribe(type, uid, callback) {
        if (this.messageTypes.has(type)) {
            let subscribers = this.messageTypes.get(type);
            // one callback per message type only
            subscribers.set(uid, callback);
        }
        else {
            let subscribers = new Map();
            console.log(`MessageSystem | added new message type`);
            subscribers.set(uid, callback);
            this.messageTypes.set(type, subscribers);
        }
        return false;
    }
    unsubscribe(type, uid) {
        if (this.messageTypes.has(type)) {
            let subscribers = this.messageTypes.get(type);
            subscribers.delete(uid);
        }
    }
    send(message, uid) {
        if (this.messageTypes.has(message.type)) {
            let subscribers = this.messageTypes.get(message.type);
            if (subscribers.has(uid)) {
                subscribers.get(uid)(message);
            }
        }
    }
    sendBroadcast(message) {
        if (this.messageTypes.has(message.type)) {
            let subscribers = this.messageTypes.get(message.type);
            subscribers.forEach((callback) => {
                callback(message);
            });
        }
    }
}
exports.MessageSystem = MessageSystem;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
class SomeMessage extends Message_1.Message {
    constructor(message) {
        super(message);
        this.init(SomeMessage);
        console.log(`SomeMessage | created with text - ${message}`);
    }
}
exports.SomeMessage = SomeMessage;

},{"./Message":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
class SomeOtherMessage extends Message_1.Message {
    constructor(message) {
        super(message);
        this.init(SomeOtherMessage);
        console.log(`SomeOtherMessage | created with text - ${message}`);
    }
}
exports.SomeOtherMessage = SomeOtherMessage;

},{"./Message":3}],7:[function(require,module,exports){
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

},{"./Client":2,"./MessageSystem":4,"./SomeMessage":5,"./SomeOtherMessage":6}]},{},[7]);
