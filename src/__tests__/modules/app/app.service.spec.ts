import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../../modules/app/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = moduleRef.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(service.getHello()).toBe('Hello World!');
    });
  });
});
