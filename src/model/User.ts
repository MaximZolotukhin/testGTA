import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import type { Post } from './Post.js'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  name: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany('Post', 'author')
  posts: Post[]
}
