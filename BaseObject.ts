export class BaseObject {

	uid: string = undefined;

	constructor(){
    	this.uid = '_' + Math.random().toString(36).substr(2, 9);
	}
}