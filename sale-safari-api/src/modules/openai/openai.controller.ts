import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { ApiOperation } from '@nestjs/swagger';
import { PromptDto } from './openai.dto';

@Controller('/openai')
export class OpenaiController {
  constructor(private readonly appService: OpenaiService) {}

  @Post('/answer')
  @ApiOperation({ summary: 'Get Automatic Answer' })
  async getHello(@Body() body: PromptDto): Promise<PromptDto> {
    const answer = await this.appService.getAnswerForComplaint(body.text);
    return {
      text: answer,
    };
  }
}
