import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@InputType()
export class ListType {
  @Field({ nullable: true })
  @IsOptional()
  @Min(0)
  pageIndex: number;

  @Field({ nullable: true })
  @IsOptional()
  @Max(50)
  @Min(1)
  pageSize: number;
}
