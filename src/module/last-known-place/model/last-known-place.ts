import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Substructure } from '../../shared/model/substructure';
import { Person } from '../../person/model/person';
import { GraphQLTimestamp } from '@nestjs/graphql/dist/scalars/timestamp.scalar';

@ObjectType()
@Entity()
export class LastKnownPlace extends Substructure {
  @Field()
  @Column()
  where: string;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @Column({ nullable: true })
  when: Date;

  @Field()
  @Column()
  metHere: boolean;

  @ManyToMany(() => Person)
  @JoinTable()
  with: Person[];

  @ManyToOne(() => Person, (p) => p.lastKnownPlaces)
  @JoinColumn()
  person: Person;
}
