import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Substructure } from '../../shared/model/substructure';
import { AddressType } from './enum/address-type';
import { Person } from '../../person/model/person';

@ObjectType()
@Entity()
export class Address extends Substructure {
  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  content: string;

  @Field(() => AddressType)
  @Column({ type: 'enum', enum: AddressType })
  type: AddressType;

  @Field(() => Person)
  @ManyToOne(() => Person, (p) => p.addresses)
  @JoinColumn()
  person: Person;
}
