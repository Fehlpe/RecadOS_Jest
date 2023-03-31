import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ name: "user_id" })
  userId!: string;

  @Column({ name: "password" })
  userPassword!: string;

  @Column({ name: "email" })
  userEmail!: string;

  @Column({ name: "username" })
  userName!: string;

  @CreateDateColumn({ name: "created_at" })
  userCreatedAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  userUpdatedAt?: Date;

  @BeforeInsert()
  beforeInsert() {
    this.userId = new Date().getTime().toString();
    this.userCreatedAt = new Date();
    this.userUpdatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.userUpdatedAt = new Date();
  }
}
