import { UpdateModel } from 'src/module/shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { IsEnum, Length } from 'class-validator';
import { Trim } from 'src/module/shared/decorator/transform/trim';
import { UserRole } from 'src/module/user/model/enum/user-role';
import { IsUsername } from 'src/module/shared/decorator/validator/is-username';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateUser extends UpdateModel {
  @OptionalField()
  @IsUsername()
  @Trim()
  @Length(3, 32)
  username: string;

  @OptionalField(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
}
