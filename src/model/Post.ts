import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import type { User } from './User.js'

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 200 })
  title: string

  @Column({ type: 'text' })
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne('User', 'posts')
  author: User
}
