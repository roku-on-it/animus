import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { GraphQLTimestamp } from '@nestjs/graphql/dist/scalars/timestamp.scalar';
import { IsBoolean, IsDate, Length } from 'class-validator';
import { ACTIONS_DESCRIPTION } from '../../shared/constant/input-field-description';
import { IsActionArray } from '../../shared/decorator/validator/is-action-array';
import { LastKnownPlaceAction } from './action/last-known-place-action';
import { Trim } from '../../shared/decorator/transform/trim';

@InputType()
export class UpdateLastKnownPlace extends UpdateModel {
  @OptionalField({ explicitNullCheck: true })
  @Trim()
  @Length(3, 150)
  where: string;

  // More details: We are checking if the value is null and transform any falsy or truthy value to boolean type
  // since using both OptionalField and IsBoolean allows client to send `null` and cause error on the database
  // because "metHere" property is non-nullable.
  @OptionalField({ explicitNullCheck: true })
  @IsBoolean()
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
