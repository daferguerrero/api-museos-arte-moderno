import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ArtworkEntity } from "../artwork/artwork.entity";

@Entity()
export class ImageEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column()
   source: string;

   @Column()
   altText: string;

   @Column()
   height: number;

   @Column()
   width: number;

   @ManyToOne(() => ArtworkEntity, artwork => artwork.images)
   artwork: ArtworkEntity;
}