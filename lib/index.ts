import { ServerConnection, PassingServerConnection, PersistentServerConnection, ServerConnectionFactory, SelfServerConnectionFactory } from "./server/connection";
import { ThemeModule } from "./module/theme";

export * from "./module/dynamic"
export * from "./module/theme"
export * from "./server/connection"
export * from "./server/response"

class SDK {
    private module: ThemeModule
    private connection: ServerConnection

    getCurrentModule(): ThemeModule {
        return this.module
    }

    getServerConnection(): ServerConnection {
        return this.connection
    }

    createServerConnection(
        connectionType: string, 
        factory: ServerConnectionFactory = SelfServerConnectionFactory
    ): ServerConnection {
        let conn = this.getServerConnection();
        if (typeof conn !== 'undefined' && !conn.isClosed()) {
            throw new Error("There is already an open connection for this module.")
        }

        switch (connectionType) {
            case ServerConnection.PASSING: conn = factory(new PassingServerConnection())
            case ServerConnection.PERSISTENT: conn = factory(new PersistentServerConnection())
            default: throw new Error(`Unhandled server connection type: ${connectionType}`)
        };

        this.connection = conn
        this.connection.connect()
        return this.connection
    }
}

export default new SDK();