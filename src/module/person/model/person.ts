import { Substructure } from '../../shared/model/substructure';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/model/user';

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
  @ManyToOne(() => User, (u) => u.persons, { nullable: false })
  createdBy: User;

  @Field(() => [Person], { nullable: true })
  @ManyToMany(() => Person, (p) => p.acquaintances, { nullable: true })
  @JoinTable()
  acquaintances: Person[];
}
