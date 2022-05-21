import { Substructure } from '../../shared/model/substructure';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ContactType } from './enum/contact-type';
import { Person } from '../../person/model/person';

@ObjectType()
@Entity()
export class Contact extends Substructure {
  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  verified: boolean;

  @Field(() => ContactType)
  @Column({ type: 'enum', enum: ContactType })
  type: ContactType;

  @ManyToOne(() => Person, (p) => p.contacts)
  person: Person;
}
