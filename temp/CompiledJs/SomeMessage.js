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
