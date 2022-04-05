import * as _ from 'lodash';
import * as dbUtils from 'src/utils/db';
import { Image } from './entities/image.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PAGINATION_DEFAULT } from 'src/common/constants';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async addImage(image): Promise<Image> {
    await this.imagesRepository.insert(image);
    return image;
  }

  async getImages({
    criteria,
    pagination,
    sorter,
  }: {
    criteria: FindOptionsWhere<Image>;
    pagination?: IPaginationOptions;
    sorter?: {
      order?: SORT_ORDER;
      field: keyof Image | string;
    };
  }): Promise<any> {
    const queryBuilder = this.imagesRepository.createQueryBuilder();
    queryBuilder.where(_.pick(criteria, Object.keys(new Image())));

    dbUtils.addSorter(queryBuilder, sorter);

    return paginate<Image>(
      queryBuilder,
      Object.assign(PAGINATION_DEFAULT, pagination),
    );
  }

  async findOneImage(imageCriteria: FindOptionsWhere<Image>): Promise<Image> {
    return await this.imagesRepository.findOneBy(imageCriteria);
  }

  async deleteImage(imageCriteria: FindOptionsWhere<Image>) {
    return await this.imagesRepository.delete(imageCriteria);
  }
}
