import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Substructure } from 'src/module/shared/model/substructure';
import { Category } from 'src/module/category/model/category';
import { User } from 'src/module/user/model/user';
import { slugify } from 'src/module/helper/slugify';

@ObjectType()
@Entity()
export class Post extends Substructure {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  slug: string;

  @Field()
  @Column()
  content: string;

  @Field(() => [String], { nullable: true })
  @Column({ type: 'simple-array', nullable: true })
  sources: string[];

  @Field(() => Category, { nullable: false })
  @ManyToOne(() => Category, (c) => c.posts, { nullable: false })
  category: Category;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (u) => u.posts, { nullable: false })
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  private async beforeWrite() {
    this.slug = await slugify(this.title);
  }
}
