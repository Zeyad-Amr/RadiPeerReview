import { Test, TestingModule } from '@nestjs/testing';
import { RadiologistController } from '../radiologist.controller';
import { RadiologistService } from '../radiologist.service';

describe('RadiologistController', () => {
  let controller: RadiologistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadiologistController],
      providers: [RadiologistService],
    }).compile();

    controller = module.get<RadiologistController>(RadiologistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
