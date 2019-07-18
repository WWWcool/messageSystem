"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseObject {
    constructor() {
        this.uid = undefined;
        this.uid = '_' + Math.random().toString(36).substr(2, 9);
    }
}
exports.BaseObject = BaseObject;
