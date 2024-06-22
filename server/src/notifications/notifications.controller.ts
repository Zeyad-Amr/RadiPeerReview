import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotifyUserDto } from './dto/notify-user.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { handleError } from '@/shared/http-error';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('notify')
  @ApiOperation({ summary: 'Notify a user' })
  @ApiBody({ type: NotifyUserDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Notification sent successfully.' })
  notifyUser(@Body() notifyUserDto: NotifyUserDto) {
    try {
      this.notificationsService.notifyUser(notifyUserDto);
      return { status: 'Notification sent successfully' };
    } catch (error) {
      handleError(error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'All notifications fetched successfully.',
  })
  getAllNotifications() {
    try {
      return this.notificationsService.getAllNotifications();
    } catch (error) {
      handleError(error);
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notifications for a specific user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User notifications fetched successfully.',
  })
  getUserNotifications(@Param('userId') userId: string) {
    try {
      return this.notificationsService.getUserNotifications(userId);
    } catch (error) {
      handleError(error);
    }
  }

  @Post('mark-as-read/:notificationId')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read successfully.',
  })
  markAsRead(@Param('notificationId') notificationId: string) {
    try {
      return this.notificationsService.markAsRead(notificationId);
    } catch (error) {
      handleError(error);
    }
  }
}
