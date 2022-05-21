import { Substructure } from '../../shared/model/substructure';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/model/user';
import { PhysicalAppearance } from '../../physical-appearance/model/physical-appearance';
import { Identity } from '../../identity/model/identity';
import { Address } from '../../address/model/address';
import { Note } from '../../note/model/note';
import { Contact } from '../../contact/model/contact';

@ObjectType()
@Entity()
export class Person extends Substructure {
  @Field()
  @Column()
  displayName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (u) => u.persons, { nullable: true })
  createdBy: User;

  @ManyToMany(() => Person, (p) => p.acquaintances, { nullable: true })
  @JoinTable()
  acquaintances: Person[];

  @OneToOne(() => PhysicalAppearance, (p) => p.person, { nullable: true })
  physicalAppearance: PhysicalAppearance;

  @OneToOne(() => Identity, (i) => i.person, { nullable: true })
  identity: Identity;

  @OneToMany(() => Address, (a) => a.person, { nullable: true })
  addresses: Address[];

  @OneToMany(() => Note, (n) => n.person, { nullable: true })
  notes: Note[];

  @OneToMany(() => Contact, (c) => c.person, { nullable: true })
  contacts: Contact[];
}
