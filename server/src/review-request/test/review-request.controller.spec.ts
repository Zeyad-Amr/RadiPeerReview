import { Test, TestingModule } from '@nestjs/testing';
import { ReviewRequestController } from '../review-request.controller';
import { ReviewRequestService } from '../review-request.service';

describe('ReviewRequestController', () => {
  let controller: ReviewRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewRequestController],
      providers: [ReviewRequestService],
    }).compile();

    controller = module.get<ReviewRequestController>(ReviewRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
