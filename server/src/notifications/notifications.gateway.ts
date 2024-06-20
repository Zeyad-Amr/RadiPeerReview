// src/notifications/notifications.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })  // Enable CORS if needed
export class NotificationsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('NotificationsGateway');

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleConnection(client: Socket, ...args: any[]) {
        const userId = client.handshake.query.userId as string;
        if (userId) {
            client.join(userId);
            this.logger.log(`Client connected: ${client.id}, User ID: ${userId}`);
        } else {
            client.disconnect();
            this.logger.warn(`Client disconnected: ${client.id} (no userId)`);
        }
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    sendNotification(userId: string, message: string) {
        this.logger.log(`Sending notification to user: ${userId}`);
        this.server.to(userId).emit('notification', message);
    }
}
