import { Field, InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { User } from 'src/module/user/model/user';
import { UserList } from 'src/module/user/model/user-list';
import { IsOptional, Max, Min } from 'class-validator';
import { ListType } from '../../shared/input/list-type';

@InputType()
export class ListUser extends ListType {
  @Field(() => String, { nullable: true })
  query = '';

  async find(options?: FindManyOptions): Promise<UserList> {
    this.query = this.query.length > 2 ? this.query : '';

    const [items, total] = await User.findAndCount({
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize ?? 5,
      where: [
        { username: ILike('%' + this.query + '%') },
        { fullName: ILike('%' + this.query + '%') },
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
