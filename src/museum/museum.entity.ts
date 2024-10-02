import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExhibitionEntity} from '../exhibition/exhibition.entity';
import { ArtworkEntity } from '../artwork/artwork.entity';
import { Field, ObjectType} from '@nestjs/graphql'

@ObjectType()
@Entity()
export class MuseumEntity {
 @Field()
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Field()
 @Column()
 name: string;

 @Field()
 @Column()
 description: string;

 @Field()
 @Column()
 address: string;

 @Field()
 @Column()
 city: string;

 @Field()
 @Column()
 image: string;

 @OneToMany(() => ExhibitionEntity, exhibition => exhibition.museum)
 exhibitions: ExhibitionEntity[];

 @Field(type => [ArtworkEntity])
 @OneToMany(() => ArtworkEntity, artwork => artwork.museum)
 artworks: ArtworkEntity[];

}
