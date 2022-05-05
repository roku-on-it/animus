import { Substructure } from '../../shared/model/substructure';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/model/user';
import { PhysicalAppearance } from '../../physical-appearance/model/physical-appearance';

@ObjectType()
@Entity()
export class Person extends Substructure {
  @Field()
  @Column()
  displayName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, (u) => u.persons, { nullable: true })
  createdBy: User;

  @Field(() => [Person], { nullable: true })
  @ManyToMany(() => Person, (p) => p.acquaintances, { nullable: true })
  @JoinTable()
  acquaintances: Person[];

  @Field(() => PhysicalAppearance, { nullable: true })
  @OneToOne(() => PhysicalAppearance, (p) => p.person, { nullable: true })
  physicalAppearance: PhysicalAppearance;
}
