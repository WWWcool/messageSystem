import {Message} from "./Message";

export type Callback = {
    id: string 
};

export class MessageSystem {

    messageTypes: Map<any, Map<string, (msg: Message) => void>>;

    constructor() {
        console.log(`MessageSystem | created`);
        this.messageTypes = new Map();
    }

    public subscribe<T extends Message>(
        type: {prototype: T}, 
        uid: string, 
        callback: (msg: T) => void
    ): boolean{
        if (this.messageTypes.has(type)){
            let subscribers = this.messageTypes.get(type);
            // one callback per message type only
            subscribers.set(uid, callback);
        }
        else{
            let subscribers = new Map();
            console.log(`MessageSystem | added new message type`);
            subscribers.set(uid, callback);
            this.messageTypes.set(type, subscribers);
        }
        return false;
    }

    public unsubscribe<T extends Message>(type: {prototype: T}, uid: string){
        if (this.messageTypes.has(type)){
            let subscribers = this.messageTypes.get(type);
            subscribers.delete(uid);
        }
    }

    public send(message: Message, uid: string){
        if (this.messageTypes.has(message.type)){
            let subscribers = this.messageTypes.get(message.type);
            if(subscribers.has(uid)){
                subscribers.get(uid)(message);
            }
        }
    }

    public sendBroadcast(message: Message){
        if (this.messageTypes.has(message.type)){
            let subscribers = this.messageTypes.get(message.type);

            subscribers.forEach((callback: (msg: Message) => void) => {
                callback(message);
            });
        }
    }
}