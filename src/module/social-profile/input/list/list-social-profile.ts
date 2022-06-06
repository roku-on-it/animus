import { SocialProfile } from '../../model/social-profile';
import { OrderBySocialProfile } from './order-by-social-profile';
import { OptionalField } from '../../../shared/decorator/property/optional-field';
import { SocialProfileList } from '../../model/social-profile-list';
import { ListType } from '../../../shared/input/list-type';
import { FindManyOptions, ILike } from 'typeorm';
import { IsBoolean, IsNotEmptyObject, Length } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { ORDER_BY_DEFAULT } from '../../../shared/constant/order-by-default-value';
import { RefInput } from '../../../shared/input/ref-input';
import { Person } from '../../../person/model/person';

@InputType()
export class ListSocialProfile extends ListType {
  @OptionalField({ explicitNullCheck: true })
  @Length(3, 255)
  referenceLink: string;

  @OptionalField({ explicitNullCheck: true })
  @Length(3, 1000)
  additionalInfo: string;

  @OptionalField({ explicitNullCheck: true })
  @IsBoolean()
  verified: boolean;

  @OptionalField(() => RefInput, { explicitNullCheck: true })
  @IsNotEmptyObject()
  person: Person;

  @OptionalField({
    explicitNullCheck: true,
    defaultValue: ORDER_BY_DEFAULT,
  })
  @IsNotEmptyObject()
  orderBy: OrderBySocialProfile;

  async find(options?: FindManyOptions): Promise<SocialProfileList> {
    const [items, total] = await SocialProfile.findAndCount({
      order: {
        [this.orderBy.field]: this.orderBy.direction,
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize,
      where: {
        ...(this.referenceLink && {
          referenceLink: ILike('%' + this.referenceLink + '%'),
        }),
        ...(this.additionalInfo && {
          additionalInfo: ILike('%' + this.additionalInfo + '%'),
        }),
        ...(null != this.verified && { verified: this.verified }),
        ...(this.person && { person: this.person }),
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
