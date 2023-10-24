import { Controller, Get, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { AuthenticatedUser, AuthGuard } from 'nest-keycloak-connect';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/test')
export class TestController {
  constructor(private readonly appService: TestService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Test' })
  getHello(@AuthenticatedUser() user: any): string {
    console.log(user);
    return this.appService.getHello();
  }
}
