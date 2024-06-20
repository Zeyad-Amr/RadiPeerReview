import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthRepo } from '@/auth/auth.repo';
import { Role } from '@prisma/client';

@WebSocketGateway({ cors: { origin: '*' } }) // Enable CORS if needed
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationsGateway');

  constructor(private readonly authRepo: AuthRepo) {} // Inject AuthRepo

  afterInit(server: Server) {
    this.logger.log('Initialize server', server);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const userId = client.handshake.query.userId as string;
    this.logger.log(
      `New client connection request: ${client.id}, User ID: ${userId}, args: ${args}`,
    );
    if (!userId) {
      this.disconnectClient(client, 'no userId');
      return;
    }

    try {
      const receiver = await this.getUserById(userId);
      if (!receiver) {
        this.disconnectClient(client, 'User does not exist');
        return;
      }

      this.handleUserConnection(client, receiver);
    } catch (error) {
      this.logger.error(`Error handling connection: ${error}`);
      this.disconnectClient(client, 'error');
    }
  }

  private async getUserById(userId: string) {
    return await this.authRepo.getByID(userId);
  }

  private handleUserConnection(client: Socket, receiver: any) {
    if (receiver.role === Role.ADMIN) {
      this.handleAdminConnection(client);
    } else {
      this.handleRegularUserConnection(client, receiver);
    }
  }

  private handleAdminConnection(client: Socket) {
    client.join('admins');
    this.logger.log(`Admin connected: ${client.id}, Role: ADMIN`);
  }

  private handleRegularUserConnection(client: Socket, receiver: any) {
    client.join(receiver.id);
    this.logger.log(
      `User connected: ${client.id}, User ID: ${receiver.id}, Role: ${receiver.role}`,
    );
  }

  private disconnectClient(client: Socket, reason: string) {
    client.disconnect();
    this.logger.warn(`Client disconnected: ${client.id} (${reason})`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  sendNotification(receiverId: string, message: string) {
    this.logger.log(`Sending notification to user: ${receiverId}`);
    this.server.to(receiverId).emit('notification', message);
  }

  sendNotificationToAllAdmins(message: string) {
    this.logger.log('Sending notification to all admins');
    this.server.to('admins').emit('notification', message);
  }
}
