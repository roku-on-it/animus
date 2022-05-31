import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { GraphQLTimestamp } from '@nestjs/graphql/dist/scalars/timestamp.scalar';
import { IsDate, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ACTIONS_DESCRIPTION } from '../../shared/constant/input-field-description';
import { IsActionArray } from '../../shared/decorator/validator/is-action-array';
import { LastKnownPlaceAction } from './action/last-known-place-action';

@InputType()
export class UpdateLastKnownPlace extends UpdateModel {
  @OptionalField()
  @MinLength(3)
  where: string;

  // More details: We are checking if the value is null and transform any falsy or truthy value to boolean type
  // since using both OptionalField and IsBoolean allows client to send `null` and cause error on the database
  // because "metHere" property is non-nullable.
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

  @OptionalField(() => [LastKnownPlaceAction], {
    description: ACTIONS_DESCRIPTION,
  })
  @IsActionArray()
  actions: LastKnownPlaceAction[];
}
