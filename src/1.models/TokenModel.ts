import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './UserModel';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    token!: string;

    @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @Column('datetime', { nullable: false }) 
    expiresAt!: Date;

    @Column('text') 
    status!: 'valid' | 'revoked';
}
