export class RequestError extends Error {

    public statusCode: number = 500;
    public title: string = 'Chyba';

    constructor(message: string, statusCode: number, title: string = 'Chyba') {
        super(message);
        this.statusCode = statusCode;
        this.title = title;
    }
}
