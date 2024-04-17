import {
  Entity, Column, PrimaryGeneratedColumn,
  BeforeInsert, CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Entity('ms_auth_tbl')
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  authId: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'datetime' })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'datetime' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async modifyColumns() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new InternalServerErrorException(`ENCRYPTION ERROR::${e.message}`);
    }
  }

  async comparePassword(password: string) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (e) {
      throw new InternalServerErrorException(`DECRYPTION ERROR::${e.message}`);
    }
  }
}
