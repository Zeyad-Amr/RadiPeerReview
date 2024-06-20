import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotifyUserDto } from './dto/notify-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post('notify')
    @ApiOperation({ summary: 'Notify a user' })
    @ApiBody({ type: NotifyUserDto })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Notification sent successfully.' })
    notifyUser(@Body() notifyUserDto: NotifyUserDto) {
        this.notificationsService.notifyUser(
            notifyUserDto.userId,
            notifyUserDto.message,
        );
        return { status: 'Notification sent successfully' };
    }
}
