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
