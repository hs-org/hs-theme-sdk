import { ServerResponse, ServerResponseEvent } from "./response";

export type ServerConnectionFactory<T extends ServerConnection = ServerConnection> = (
    connection?: T | undefined
) => T | undefined

/**
 * A factory that returns the connection itself instead of creating a new one.
 * @param connection the connection
 */
export const SelfServerConnectionFactory: ServerConnectionFactory = (connection?: ServerConnection) => {
    return connection
}

export module ServerConnection {

    /**
     * @see PersistentServerConnection
     */
    export const PERSISTENT = "persistent"

    /**
     * @see PassingServerConnection
     */
    export const PASSING = "passing"

    /**
     * It is used when there is an undefined type to be identified.
     */
    export const UNKNOWN = "unknown"

}

export interface ServerConnection {

    /**
     * Returns connection type name.
     */
    getType(): string

    /**
     * Returns if the connection to the server is closed.
     */
    isClosed(): boolean

    /**
     * Attempts to make a connection to the server.
     */
    connect(): void

    /**
     * Registers a new listener for messages received from the server.
     * @param event event to be listen
     * @param response the listener
     */
    on<T>(event: string, response: ServerResponseEvent<T>): this

}

export abstract class AbstractServerConnection implements ServerConnection {
    
    protected server: Server
    private listeners: Map<string, ServerResponseEvent<any>>
    private closed = false;

    constructor() {
        this.listeners = new Map();
    }

    on<T>(event: string, response: ServerResponseEvent<T>): this {
        this.listeners.set(event, response)
        return this
    }

    isClosed(): boolean {
        return this.closed;
    }

    abstract connect(): void

    abstract getType(): string

}

/**
 * Represents a persistent connection to the server.
 * This implementation remains active by sending ping messages 
 * and receiving pong responses from the server.
 * 
 * If the server stops receiving messages from the module or
 * the client stops sending ping messages at the correct time,
 * the connection will be closed immediately.
 */
export class PersistentServerConnection extends AbstractServerConnection {

    lastPing: number

    constructor() {
        super()
    }

    getType(): string {
        return ServerConnection.PERSISTENT
    }

    connect(): void {
        throw new Error("Method not implemented.");
    }

}

/**
 * Represents a single-message connection to the server, that is, 
 * we will create a connection to send only one message to the server,
 * get a response and close the connection.
 */
export class PassingServerConnection extends AbstractServerConnection {

    on<T>(event: string, response: ServerResponseEvent<T>): this {
        throw new Error("This implementation doesn't support listeners.");
    }

    getType(): string {
        return ServerConnection.PASSING
    }

    connect(): void {
        throw new Error("Method not implemented.");
    }

}

// ---------------------=> INTERNAL <=---------------------- //
class Server {

    lastMessageSent = 0
    lastMessageReceived = 0

    async send(event: string, message: any): Promise<any> {

    }

}