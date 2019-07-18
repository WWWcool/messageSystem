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
