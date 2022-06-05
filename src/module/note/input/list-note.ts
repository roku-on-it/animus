import { NoteList } from '../model/note-list';
import { ListType } from '../../shared/input/list-type';
import { FindManyOptions, ILike } from 'typeorm';
import { IsNotEmptyObject, Length } from 'class-validator';
import { InputType } from '@nestjs/graphql';
import { Note } from '../model/note';
import { OrderByNote } from './order-by-note';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { ORDER_BY_DEFAULT } from '../../shared/constant/order-by-default-value';
import { Person } from '../../person/model/person';
import { RefInput } from '../../shared/input/ref-input';

@InputType()
export class ListNote extends ListType {
  @OptionalField({ explicitNullCheck: true })
  @Length(3, 255)
  content: string;

  @OptionalField(() => RefInput, { explicitNullCheck: true })
  @IsNotEmptyObject()
  person: Person;

  @OptionalField({
    explicitNullCheck: true,
    defaultValue: ORDER_BY_DEFAULT,
  })
  @IsNotEmptyObject()
  orderBy: OrderByNote;

  async find(options?: FindManyOptions): Promise<NoteList> {
    const [items, total] = await Note.findAndCount({
      order: {
        [this.orderBy.field]: this.orderBy.direction,
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize,
      where: {
        ...(this.content && { content: ILike('%' + this.content + '%') }),
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
