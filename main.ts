import {MessageSystem} from "./MessageSystem";
import {Client} from "./Client";
import {SomeMessage} from "./SomeMessage";
import {SomeOtherMessage} from "./SomeOtherMessage";

document.body.textContent = main();

function main(): string{
    let sys = new MessageSystem();
    let client1 = new Client(sys);
    let client2 = new Client(sys);
    let client3 = new Client(sys);

    client1.subscribe(SomeMessage, client1OnSomeMessage);
    client2.subscribe(SomeOtherMessage, client2OnSomeOtherMessage);
    client3.subscribe(SomeMessage, client3OnSomeMessage);
    
    console.log(`// direct send`);
    client2.send(new SomeMessage("Hellow!"), [client1]);
    client1.send(new SomeOtherMessage("Hi!"), [client2]);

    console.log(`//broadcast`);
    client2.send(new SomeMessage("Hellow guys!"));

    console.log(`// unsubscribe and broadcast`);
    client3.unsubscribe(SomeMessage);
    client2.send(new SomeMessage("Hellow guys!"));

    console.log(`// one client and several messages`);
    client1.subscribe(SomeOtherMessage, client1OnSomeOtherMessage);
    client3.send(new SomeMessage("Where are you?"));
    client3.send(new SomeOtherMessage("You here?"));

    return "Test -- ok!";
}

function client1OnSomeMessage(msg: SomeMessage){
    console.log(`client1 | get some message - ${msg.message}`);
}

function client1OnSomeOtherMessage(msg: SomeOtherMessage){
    console.log(`client1 | get some other message - ${msg.message}`);
}

function client2OnSomeOtherMessage(msg: SomeOtherMessage){
    console.log(`client2 | get some other message - ${msg.message}`);
}

function client3OnSomeMessage(msg: SomeMessage){
    console.log(`client3 | get some message - ${msg.message}`);
}
