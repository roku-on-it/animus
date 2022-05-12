import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Substructure } from '../../shared/model/substructure';
import { Person } from '../../person/model/person';

@ObjectType()
@Entity()
export class Identity extends Substructure {
  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nationalId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  placeOfBirth: string;

  @OneToOne(() => Person, (p) => p.identity, { nullable: false })
  @JoinColumn()
  person: Person;
}
