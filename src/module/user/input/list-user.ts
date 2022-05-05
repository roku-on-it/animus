import { Field, InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { User } from 'src/module/user/model/user';
import { UserList } from 'src/module/user/model/user-list';
import { ListType } from '../../shared/input/list-type';
import { MinLength, ValidateIf } from 'class-validator';

@InputType()
export class ListUser extends ListType {
  @Field(() => String, { nullable: true })
  @MinLength(3)
  @ValidateIf((target: ListUser) => target.query.length > 0)
  query = '';

  async find(options?: FindManyOptions): Promise<UserList> {
    const [items, total] = await User.findAndCount({
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize ?? 5,
      where: [{ username: ILike('%' + this.query + '%') }],
      loadRelationIds: true,
      ...options,
    });

    return {
      items,
      total,
    };
  }
}
