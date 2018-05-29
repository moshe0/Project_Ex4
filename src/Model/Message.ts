export class Message{
    constructor(public Content : string, public SendingUser : string, public Receiving : string, public TimeSent : string)
    {
        // timeSent =  moment().format('h:mm:ss');
    }
}


