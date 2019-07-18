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
