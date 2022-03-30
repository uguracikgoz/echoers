import {
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

export class BaseEntity {
  @Column()
  created_at: string;

  @Column({
    default: new Date().getTime().toString()
  })
  updated_at: string;

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updated_at = new Date().getTime().toString()
  }

  @BeforeInsert()
  updateCreatedAt() {
    this.created_at = new Date().getTime().toString()
  }
}