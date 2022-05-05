import { Field, InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { ListType } from '../../shared/input/list-type';
import { PersonList } from '../model/person-list';
import { Person } from '../model/person';

@InputType()
export class ListPerson extends ListType {
  @Field(() => String, { nullable: true })
  query = '';

  async find(options?: FindManyOptions): Promise<PersonList> {
    this.query = this.query.length > 2 ? this.query : '';

    const [items, total] = await Person.findAndCount({
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize ?? 5,
      where: [
        { displayName: ILike('%' + this.query + '%') },
        { description: ILike('%' + this.query + '%') },
      ],
      loadRelationIds: true,
      ...options,
    });

    return {
      items,
      total,
    };
  }
}