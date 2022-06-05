import { InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { ListType } from '../../shared/input/list-type';
import { PersonList } from '../model/person-list';
import { Person } from '../model/person';
import { IsNotEmptyObject, Length } from 'class-validator';
import { OrderByPerson } from './order-by-person';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { ORDER_BY_DEFAULT } from '../../shared/constant/order-by-default-value';

@InputType()
export class ListPerson extends ListType {
  @OptionalField({ explicitNullCheck: true })
  @Length(3, 255)
  displayName: string;

  @OptionalField({ explicitNullCheck: true })
  @Length(3, 1000)
  description: string;

  @OptionalField({
    explicitNullCheck: true,
    defaultValue: ORDER_BY_DEFAULT,
  })
  @IsNotEmptyObject()
  orderBy: OrderByPerson;

  async find(options?: FindManyOptions): Promise<PersonList> {
    const [items, total] = await Person.findAndCount({
      order: {
        [this.orderBy.field]: this.orderBy.direction,
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize,
      where: {
        ...(this.displayName && {
          displayName: ILike('%' + this.displayName + '%'),
        }),
        ...(this.description && {
          description: ILike('%' + this.description + '%'),
        }),
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
