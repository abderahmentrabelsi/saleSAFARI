import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ObjectId as BsonObjectId } from 'bson';
import { UpdateResult } from 'mongodb';
import {
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  ObjectId,
  PopulateOptions,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

/*** Think of this like a query helper, for anything complex, use the this.model directly ***/
export class IServiceBase<T extends Document> {
  readonly model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async find<K extends keyof T>(
    filter: FilterQuery<T> = {},
    projection?: Record<K, 1 | 0>,
    options?: QueryOptions<T>,
  ): Promise<Pick<T, K>[]> {
    return this.model.find(filter, projection, options).exec();
  }

  async findById<K extends keyof T>(
    id: string | ObjectId | BsonObjectId,
    projection?: Record<K, 1>,
    options?: QueryOptions<T>,
  ): Promise<Pick<T, K>> {
    try {
      return this.model.findById(id, projection, options).orFail().exec();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findOne<K extends keyof T>(
    filter: FilterQuery<T> = {},
    projection?: Record<K, 1>,
    options?: QueryOptions<T>,
  ) {
    return this.model.findOne<Pick<T, K>>(filter, projection, options).exec();
  }

  async updateById<K extends keyof T>(
    id: string | ObjectId | BsonObjectId,
    data: UpdateQuery<T>,
    projection?: Record<K, 1>,
    options?: QueryOptions<T>,
  ): Promise<NonNullable<HydratedDocument<Pick<T, K>>>> {
    try {
      return this.model
        .findByIdAndUpdate(id, data, { new: true, projection, ...options })
        .orFail()
        .exec();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateMany(
    filter: FilterQuery<T> = {},
    data: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<UpdateResult> {
    try {
      return this.model
        .updateMany(filter, { $set: data }, { multi: true, ...options })
        .orFail()
        .exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(
    data: Partial<T>,
    populate?: string | PopulateOptions | (string | PopulateOptions)[],
  ): Promise<T> {
    try {
      const create = await this.model.create(data);
      const result = await create.save();
      if (populate) {
        const a = await result.populate(populate);
        return a.toObject<T>();
      }
      return result.toObject<T>();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    try {
      return this.model.count(filter).orFail().exec();
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
  deleteById(id: string | ObjectId | BsonObjectId) {
    try {
      return this.model.findByIdAndDelete(id).orFail().exec();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
