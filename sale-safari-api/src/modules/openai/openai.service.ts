import { Injectable } from '@nestjs/common';
import { OpenAIClient } from '@platohq/nestjs-openai';

@Injectable()
export class OpenaiService {
  constructor(private readonly openAIClient: OpenAIClient) {}

  getHello(): string {
    return 'Hello World!';
  }

  createPrompt(text: string) {
    return `
      I want you to act as a customer support agent. Your role is to give a generic answer to the complaint, ask for more details, and ask the user to be patient.
      Here is the complaint:
      _________
      ${text}
      _________
      i want you to answer the complaint in a way that is generic and does not require any specific knowledge about the product or service.
      Just give a generic answer, ask for more details, and ask the user to be patient.
      In your response, just give me the answer to the complaint, without saying anything else.
      `;
  }

  async getAnswerForComplaint(text: string) {
    try {
      const { data } = await this.openAIClient.createCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 2048,
        temperature: 0.8,
        prompt: this.createPrompt(text),
      });
      return data.object;
    } catch (e) {
      return "We're sorry to hear that. We'll get back to you as soon as possible. Thank you for your patience. Please let us know if you have any other questions or concerns.";
    }
  }
}
