import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Substructure } from '../../shared/model/substructure';
import { Person } from '../../person/model/person';

@ObjectType()
@Entity()
export class Note extends Substructure {
  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  position: number;

  @ManyToOne(() => Person, (p) => p.notes)
  @JoinColumn()
  person: Person;
}
