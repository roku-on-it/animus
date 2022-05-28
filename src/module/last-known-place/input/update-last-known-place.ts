import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { GraphQLTimestamp } from '@nestjs/graphql/dist/scalars/timestamp.scalar';
import { IsDate, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class UpdateLastKnownPlace extends UpdateModel {
  @OptionalField()
  @MinLength(3)
  where: string;

  // More details: We are checking if the value is null and transform any falsy or truthy value to boolean type
  // since using both OptionalField and IsBoolean allows client to send `null` and
  @OptionalField()
  @Transform(({ value }) => {
    if ('boolean' === typeof value) {
      return value;
    }

    return !!value;
  })
  metHere: boolean;

  @OptionalField(() => GraphQLTimestamp)
  @IsDate({
    message: '$property must be a valid timestamp or number of milliseconds',
  })
  when: Date;
}
