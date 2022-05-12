import { NoteList } from '../model/note-list';
import { ListType } from '../../shared/input/list-type';
import { FindManyOptions, ILike } from 'typeorm';
import { MinLength, ValidateIf } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Note } from '../model/note';
import { OrderByNote } from './order-by-note';

@InputType()
export class ListNote extends ListType {
  @Field(() => String, { nullable: true })
  @MinLength(3)
  @ValidateIf((target: ListNote) => target.query.length > 0)
  query = '';

  @Field({ nullable: true })
  orderBy: OrderByNote;

  async find(options?: FindManyOptions): Promise<NoteList> {
    const [items, total] = await Note.findAndCount({
      order: {
        [this.orderBy?.field ?? 'createdAt']: this.orderBy?.direction ?? 'ASC',
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize ?? 5,
      where: [{ content: ILike('%' + this.query + '%') }],
      loadRelationIds: true,
      ...options,
    });

    return {
      items,
      total,
    };
  }
}
