export class Message {
	
	message: string = "Empty message...";
	type: any;

	constructor(message: string) {
        this.message = message;
    }
    
    protected init<T extends Message>(type: {prototype: T}){
    	this.type = type;
    } 
}