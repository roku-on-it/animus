import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Substructure } from '../../shared/model/substructure';
import { Person } from '../../person/model/person';

@ObjectType()
@Entity()
export class SocialProfile extends Substructure {
  @Field()
  @Column()
  referenceLink: string;

  @Field()
  @Column()
  additionalInfo: string;

  @Field()
  @Column()
  verified: boolean;

  @ManyToOne(() => Person)
  person: Person;
}
