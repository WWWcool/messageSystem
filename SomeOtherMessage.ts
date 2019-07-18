import {Message} from "./Message";

export class SomeOtherMessage extends Message {

	constructor(message: string) {
		super(message);
		this.init<SomeOtherMessage>(SomeOtherMessage);
        console.log(`SomeOtherMessage | created with text - ${message}`);
    }
}