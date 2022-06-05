import { InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { User } from 'src/module/user/model/user';
import { UserList } from 'src/module/user/model/user-list';
import { ListType } from '../../shared/input/list-type';
import { IsEnum, IsNotEmptyObject, Length } from 'class-validator';
import { OrderByUser } from './order-by-user';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { ORDER_BY_DEFAULT } from '../../shared/constant/order-by-default-value';
import { UserRole } from '../model/enum/user-role';

@InputType()
export class ListUser extends ListType {
  @OptionalField({ explicitNullCheck: true })
  @Length(3, 32)
  username: string;

  @OptionalField(() => UserRole, { explicitNullCheck: true })
  @IsEnum(UserRole)
  role: UserRole;

  @OptionalField({
    explicitNullCheck: true,
    defaultValue: ORDER_BY_DEFAULT,
  })
  @IsNotEmptyObject()
  orderBy: OrderByUser;

  async find(options?: FindManyOptions): Promise<UserList> {
    const [items, total] = await User.findAndCount({
      order: {
        [this.orderBy.field]: this.orderBy.direction,
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize,
      where: {
        ...(this.username && { username: ILike('%' + this.username + '%') }),
        ...(null != this.role && { role: this.role }),
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
