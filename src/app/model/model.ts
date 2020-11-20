import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

export interface Settings {
  nicotinStrength: number,
  defaultBottleSize: number,
  defaultBase: Bottle,
  defaultShot?: NicotinBottle
}

export interface NicotinBottle extends Bottle {
  nicotinLevel: number

}
export interface Bottle {
  size: number,
  level?: number,
  price: number
}

@Entity({ name: 'producer' })
@Unique(['name'])
export class Producer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @OneToMany(() => Aroma, aroma => aroma.producer)
  aromas: Aroma[];

}
@Entity({ name: 'aroma' })
@Unique(['producer', 'name'])
export class Aroma extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  aromaPercent: number;

  @ManyToOne(() => Producer, producer => producer.aromas)
  producer: Producer;

  @OneToMany(() => AromaBottle, bottle => bottle.aroma)
  bottles: AromaBottle[];

}
@Entity({ name: 'aroma_bottle' })
export class AromaBottle extends BaseEntity implements Bottle {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  size: number;

  @Column()
  level: number;

  @ManyToOne(() => Aroma, aroma => aroma.bottles)
  aroma: Aroma;

}

