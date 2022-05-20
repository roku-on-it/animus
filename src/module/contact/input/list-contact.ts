import { Field, InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { ListType } from '../../shared/input/list-type';
import { MinLength } from 'class-validator';
import { ContactList } from '../model/contact-list';
import { Contact } from '../model/contact';
import { OrderByContact } from './order-by-contact';
import { ContactType } from '../model/enum/contact-type';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class ListContact extends ListType {
  @OptionalField()
  @MinLength(3)
  query: string;

  @Field({ nullable: true })
  orderBy: OrderByContact;

  @Field(() => ContactType, { nullable: true })
  type: ContactType;

  @Field({ nullable: true })
  verified: boolean;

  async find(options?: FindManyOptions): Promise<ContactList> {
    const [items, total] = await Contact.findAndCount({
      order: {
        [this.orderBy?.field ?? 'createdAt']: this.orderBy?.direction ?? 'ASC',
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize ?? 5,
      where: {
        ...(this.query && { content: ILike('%' + this.query + '%') }),
        ...(this.type != null && { type: this.type }),
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
