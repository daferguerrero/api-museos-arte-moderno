import { Resolver,Args, Query, Mutation } from '@nestjs/graphql';
import { MuseumService } from './museum.service';
import { MuseumEntity } from './museum.entity'
import { MuseumDto } from './museum.dto/museum.dto';
import { plainToInstance } from 'class-transformer';

@Resolver()
export class MuseumResolver {
  constructor(private museumService: MuseumService) {}

  @Query(() => [MuseumEntity])
  museums(): Promise<MuseumEntity[]> {
    return this.museumService.findAll();
  }

  @Query(() => MuseumEntity)
  museum(@Args('id') id: string): Promise<MuseumEntity> {
    return this.museumService.findOne(id);
  }

  @Mutation(() => MuseumEntity)
  createMuseum(@Args('museum') museumDto: MuseumDto): Promise<MuseumEntity> {
    const museum = plainToInstance(MuseumEntity, museumDto);
    return this.museumService.create(museum);
  }

  @Mutation(() => MuseumEntity)
  updateMuseum(@Args('id') id: string, @Args('museum') museumDto: MuseumDto): Promise<MuseumEntity> {
    const museum = plainToInstance(MuseumEntity, museumDto);
    return this.museumService.update(id, museum);
  }

  @Mutation(() => String)
  deleteMuseum(@Args('id') id: string) {
    this. museumService.delete(id);
    return id;
  }
}
