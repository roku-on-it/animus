import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Substructure } from '../../shared/model/substructure';
import { Person } from '../../person/model/person';

@ObjectType()
@Entity()
@Index(['person', 'position'], { unique: true })
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
