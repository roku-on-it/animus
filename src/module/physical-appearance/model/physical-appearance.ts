import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Substructure } from '../../shared/model/substructure';
import { EyeColor } from './enum/eye-color';
import { SkinColor } from './enum/skin-color';
import { Gender } from './enum/gender';
import { SexualOrientation } from './enum/sexual-orientation';
import { Person } from '../../person/model/person';

@ObjectType()
@Entity()
export class PhysicalAppearance extends Substructure {
  @Field({ nullable: true })
  @Column({ nullable: true })
  height: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  weight: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hasGlasses: boolean;

  @Field(() => [String], { nullable: true })
  @Column({ type: 'simple-array', nullable: true })
  disabilities: string[];

  @Field(() => SexualOrientation, { nullable: true })
  @Column({ type: 'enum', enum: SexualOrientation, nullable: true })
  sexualOrientation: SexualOrientation;

  @Field(() => Gender, { nullable: true })
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Field(() => SkinColor, { nullable: true })
  @Column({ type: 'enum', enum: SkinColor, nullable: true })
  skinColor: SkinColor;

  @Field(() => EyeColor, { nullable: true })
  @Column({ type: 'enum', enum: EyeColor, nullable: true })
  eyeColor: EyeColor;

  @OneToOne(() => Person, (p) => p.physicalAppearance, { nullable: false })
  @JoinColumn()
  person: Person;
}
