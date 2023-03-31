import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./users.entity";

@Entity({ name: "notes" })
export class NoteEntity extends BaseEntity {
  @PrimaryColumn({ name: "note_id" })
  noteId!: string;

  @Column({ name: "title" })
  noteTitle!: string;

  @Column({ name: "description" })
  noteDescription!: string;

  @Column({ name: "archived" })
  noteArchived!: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  userId!: string;

  @CreateDateColumn({ name: "created_at" })
  noteCreatedAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  noteUpdatedAt?: Date;

  @BeforeInsert()
  beforeInsert() {
    this.noteArchived = false;
    this.noteId = new Date().getTime().toString();
    this.noteCreatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.noteUpdatedAt = new Date();
  }
}
