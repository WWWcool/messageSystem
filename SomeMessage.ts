import {Message} from "./Message";

export class SomeMessage extends Message {

	constructor(message: string) {
		super(message);
		this.init<SomeMessage>(SomeMessage);
        console.log(`SomeMessage | created with text - ${message}`);
    }
}