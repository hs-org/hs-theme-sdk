export interface ServerResponse<T> {

    /**
     * The content of the response received from the server.
     */
    data: T

}

export type ServerResponseEvent<T = any> = (response: ServerResponse<T>) => void