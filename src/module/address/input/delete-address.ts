import { DeleteModel } from '../../shared/input/delete-model';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DeleteAddress extends DeleteModel {}
