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
