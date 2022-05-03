import { Field, ObjectType } from '@nestjs/graphql';
import { Substructure } from 'src/module/shared/model/substructure';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserRole } from 'src/module/user/model/enum/user-role';
import { hash } from 'bcrypt';
import { UserWithAuth } from './flag/user-with-auth';
import { TrueBlue } from '../../true-blue/model/true-blue';
import { PersonList } from '../../person/model/person-list';
import { Person } from '../../person/model/person';
import { ProtectedField } from '../../shared/decorator/property/protected-field';

@ObjectType()
@Entity()
@Index(['username'], { unique: true })
export class User extends Substructure {
  @Field()
  @Column()
  username: string;

  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.Guest })
  role: UserRole;

  @OneToOne(() => TrueBlue, (tb) => tb.user, { nullable: false })
  trueBlue: TrueBlue;

  @ProtectedField(UserRole.Root, () => PersonList, { nullable: true })
  @OneToMany(() => Person, (p) => p.createdBy, { nullable: true })
  persons: Person[];

  @BeforeInsert()
  private async beforeWrite() {
    this.password = await hash(this.password, 12);
  }

  static withAuth = UserWithAuth;
}
