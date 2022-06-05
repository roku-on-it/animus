import { InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { ListType } from '../../shared/input/list-type';
import { IsBoolean, IsEnum, IsNotEmptyObject, Length } from 'class-validator';
import { ContactList } from '../model/contact-list';
import { Contact } from '../model/contact';
import { OrderByContact } from './order-by-contact';
import { ContactType } from '../model/enum/contact-type';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { ORDER_BY_DEFAULT } from '../../shared/constant/order-by-default-value';

@InputType()
export class ListContact extends ListType {
  @OptionalField({ explicitNullCheck: true })
  @Length(3, 255)
  content: string;

  @OptionalField(() => ContactType, { explicitNullCheck: true })
  @IsEnum(ContactType)
  type: ContactType;

  @OptionalField({ explicitNullCheck: true })
  @IsBoolean()
  verified: boolean;

  @OptionalField({
    explicitNullCheck: true,
    defaultValue: ORDER_BY_DEFAULT,
  })
  @IsNotEmptyObject()
  orderBy: OrderByContact;

  async find(options?: FindManyOptions): Promise<ContactList> {
    const [items, total] = await Contact.findAndCount({
      order: {
        [this.orderBy.field]: this.orderBy.direction,
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize,
      where: {
        ...(this.content && { content: ILike('%' + this.content + '%') }),
        ...(null != this.type && { type: this.type }),
        ...(null != this.verified && { verified: this.verified }),
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
