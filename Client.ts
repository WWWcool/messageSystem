import {MessageSystem} from "./MessageSystem";
import {BaseObject} from "./BaseObject";
import {Message} from "./Message";

export class Client extends BaseObject{
	
	messageSystem: MessageSystem = null;

	constructor(messageSystem: MessageSystem) {
        super();

        console.log(`Client | created`);
        this.messageSystem = messageSystem;
    }

    subscribe<T extends Message>(messageType: {prototype: T}, callback: (msg: T) => void): boolean{
    	return this.messageSystem.subscribe<T>(messageType, this.uid, callback);
    }

    unsubscribe<T extends Message>(messageType: {prototype: T}){
        return this.messageSystem.unsubscribe<T>(messageType, this.uid);
    }

    send(message: Message, receivers?: Array<Client>){
    	if(receivers != undefined){
    		for(let receiver of receivers){
    			this.messageSystem.send(message, receiver.uid)
    		}
    	}
    	else{
			this.messageSystem.sendBroadcast(message);		
    	}
    }
}