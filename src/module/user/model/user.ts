import { Field, ObjectType } from '@nestjs/graphql';
import { Substructure } from 'src/module/shared/model/substructure';
import { BeforeInsert, Column, Entity, Index, OneToOne } from 'typeorm';
import { UserRole } from 'src/module/user/model/enum/user-role';
import { hash } from 'bcrypt';
import { UserWithAuth } from './flag/user-with-auth';
import { TrueBlue } from '../../true-blue/model/true-blue';

@ObjectType()
@Entity()
@Index(['username'], { unique: true })
export class User extends Substructure {
  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl: string;

  @Field()
  @Column()
  fullName: string;

  @Column()
  password: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @OneToOne(() => TrueBlue, (tb) => tb.user, { nullable: false })
  trueBlue: TrueBlue;

  @BeforeInsert()
  private async beforeWrite() {
    this.password = await hash(this.password, 12);
  }

  static withAuth = UserWithAuth;
}
