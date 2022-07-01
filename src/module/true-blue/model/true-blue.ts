import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../user/model/user';
import { Substructure } from '../../shared/model/substructure';
import { Field, ObjectType } from '@nestjs/graphql';
import { TrueBlueWithAuth } from './flag/true-blue-with-auth';

@ObjectType()
@Entity()
export class TrueBlue extends Substructure {
  @OneToOne(() => User, (u) => u.trueBlue, { nullable: false })
  @JoinColumn()
  user: User;

  @Field(() => Boolean)
  @Column({ default: false })
  hasTrueRootPrivilege: boolean;

  static withAuth = TrueBlueWithAuth;
}
