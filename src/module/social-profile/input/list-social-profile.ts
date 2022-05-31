import { SocialProfile } from '../model/social-profile';
import { OrderBySocialProfile } from './order-by-social-profile';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { SocialProfileList } from '../model/social-profile-list';
import { ListType } from '../../shared/input/list-type';
import { FindManyOptions, ILike } from 'typeorm';
import { MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListSocialProfile extends ListType {
  @OptionalField()
  @MinLength(3)
  query: string;

  @Field({ nullable: true })
  orderBy: OrderBySocialProfile;

  @Field({ nullable: true })
  verified: boolean;

  async find(options?: FindManyOptions): Promise<SocialProfileList> {
    const [items, total] = await SocialProfile.findAndCount({
      order: {
        [this.orderBy?.field ?? 'createdAt']: this.orderBy?.direction ?? 'ASC',
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize ?? 5,
      where: {
        ...(this.query && { content: ILike('%' + this.query + '%') }),
        ...(this.verified && { verified: this.verified }),
      },
      loadRelationIds: true,
      ...options,
    });

    return {
      items,
      total,
    };
  }
}
