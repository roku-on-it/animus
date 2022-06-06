import { InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { ListType } from '../../../shared/input/list-type';
import { PersonList } from '../../model/person-list';
import { Person } from '../../model/person';
import { IsNotEmptyObject, Length, ValidateNested } from 'class-validator';
import { OrderByPerson } from './order-by-person';
import { OptionalField } from '../../../shared/decorator/property/optional-field';
import { ORDER_BY_DEFAULT } from '../../../shared/constant/order-by-default-value';
import { FilterPersonByIdentity } from './filter-person-by-identity';
import { Type } from 'class-transformer';
import { FilterPersonByPhysicalAppearance } from './filter-person-by-physical-appearance';

@InputType()
export class ListPerson extends ListType {
  relations: (keyof Person)[] = [];

  @OptionalField({ explicitNullCheck: true })
  @Length(3, 255)
  displayName: string;

  @OptionalField({ explicitNullCheck: true })
  @Length(3, 1000)
  description: string;

  @OptionalField({ explicitNullCheck: true })
  @Type(() => FilterPersonByPhysicalAppearance)
  @ValidateNested()
  @IsNotEmptyObject()
  physicalAppearance: FilterPersonByPhysicalAppearance;

  @OptionalField({ explicitNullCheck: true })
  @Type(() => FilterPersonByIdentity)
  @ValidateNested()
  @IsNotEmptyObject()
  identity: FilterPersonByIdentity;

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
        ...(this.identity && {
          identity: this.parseIdentity(),
        }),
        ...(this.displayName && {
          displayName: ILike('%' + this.displayName + '%'),
        }),
        ...(this.description && {
          description: ILike('%' + this.description + '%'),
        }),
      },
      relations: this.relations,
      loadRelationIds: true,
      ...options,
    });

    return {
      items,
      total,
    };
  }

  private parsePhysicalAppearance() {
    this.relations.push('physicalAppearance');
    return {
      ...(this.physicalAppearance.height && {
        height: this.physicalAppearance.height,
      }),
    };
  }

  private parseIdentity() {
    this.relations.push('identity');

    return {
      ...(this.identity.firstName && {
        firstName: ILike('%' + this.identity.firstName + '%'),
      }),
      ...(this.identity.lastName && {
        lastName: ILike('%' + this.identity.lastName + '%'),
      }),
      ...(this.identity.nationalId && {
        nationalId: ILike('%' + this.identity.nationalId + '%'),
      }),
      ...(this.identity.placeOfBirth && {
        placeOfBirth: ILike('%' + this.identity.placeOfBirth + '%'),
      }),
      ...(this.identity.dateOfBirth &&
        this.identity.dateOfBirth.getFilterObject('dateOfBirth')),
    };
  }
}
