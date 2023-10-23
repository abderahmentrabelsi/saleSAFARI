import {
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Document } from 'mongoose';
import { IServiceBase } from './service-base.generic';

export abstract class GenericController<T extends Document> {
  protected constructor(private readonly service: IServiceBase<T>) {}

  @Get()
  async findAll(@Query() query: any): Promise<Pick<T, keyof T>[]> {
    return this.service.find(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string | ObjectId): Promise<T> {
    const entity = await this.service.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  @Post()
  async create(@Body() createDto: Partial<T>): Promise<T> {
    return this.service.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string | ObjectId,
    @Body() updateDto: Partial<T>,
  ): Promise<Pick<T, keyof T>> {
    return this.service.updateById(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string | ObjectId): Promise<void> {
    await this.service.deleteById(id);
  }
}
