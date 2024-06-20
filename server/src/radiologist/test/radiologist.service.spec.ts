import { Test, TestingModule } from '@nestjs/testing';
import { RadiologistService } from '../radiologist.service';

describe('RadiologistService', () => {
  let service: RadiologistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadiologistService],
    }).compile();

    service = module.get<RadiologistService>(RadiologistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
