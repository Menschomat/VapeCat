import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'producer' })
export class Producer extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @OneToMany(() => Aroma, aroma => aroma.producer)
  aromas: Aroma[];

}
@Entity({ name: 'aroma' })
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
export class AromaBottle extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  bottleSize: number;

  @Column()
  liquidLevel: number;

  @ManyToOne(() => Aroma, aroma => aroma.bottles)
  aroma: Aroma;

}

