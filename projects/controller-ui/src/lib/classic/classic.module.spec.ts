import { ClassicModule } from './classic.module';

describe('ClassicModule', () => {
  let classicModule: ClassicModule;

  beforeEach(() => {
    classicModule = new ClassicModule();
  });

  it('should create an instance', () => {
    expect(classicModule).toBeTruthy();
  });
});
