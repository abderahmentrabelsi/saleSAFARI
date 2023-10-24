import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiOperation } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';

@Controller('/test')
export class TestController {
  constructor(private readonly appService: TestService) {}

  @Get()
  @ApiOperation({ summary: 'Test' })
  getHello(
    @User('sub') sub: string,
    @User('preferred_username') username: string,
  ): string {
    console.log(sub);
    console.log(username);
    return this.appService.getHello();
  }
}
