import { InputType } from '@nestjs/graphql';
import { DeleteModel } from '../../shared/input/delete-model';

@InputType()
export class DeletePhysicalAppearance extends DeleteModel {}
