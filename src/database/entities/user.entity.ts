import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CalendarEvent } from './calendar-event.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => CalendarEvent, (event) => event.user)
  calendarEvents: CalendarEvent[];
}
