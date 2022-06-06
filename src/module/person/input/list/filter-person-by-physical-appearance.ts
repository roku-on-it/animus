import { InputType, OmitType } from '@nestjs/graphql';
import { UpdatePhysicalAppearance } from '../../../physical-appearance/input/update-physical-appearance';

@InputType()
export class FilterPersonByPhysicalAppearance extends OmitType(
  UpdatePhysicalAppearance,
  ['id'],
) {}
