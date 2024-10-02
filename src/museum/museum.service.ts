import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors'
import { Repository } from 'typeorm';
import { MuseumEntity } from './museum.entity';

@Injectable()
export class MuseumService {
   constructor(
    @InjectRepository(MuseumEntity)
    private readonly museumRepository: Repository<MuseumEntity>
   ){}

  // Obtener todos los museos
  async findAll(): Promise<MuseumEntity[]> {
    return await this.museumRepository.find({ relations: ["artworks", "exhibitions"] });
   }

  // Obtener un museo por id
  async findOne(id: string): Promise<MuseumEntity> {
    const museum: MuseumEntity = await this.museumRepository.findOne({where: {id}, relations: ["artworks", "exhibitions"] } );
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    return museum;
   }

  // Crear un museo
  async create(museum: MuseumEntity): Promise<MuseumEntity> {
    return await this.museumRepository.save(museum);
   }

  // Actualizar un museo por id
  async update(id: string, museum: MuseumEntity): Promise<MuseumEntity> {
    const persistedMuseum: MuseumEntity = await this.museumRepository.findOne({where:{id}});
    if (!persistedMuseum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    return await this.museumRepository.save({...persistedMuseum, ...museum});
  }

  // Borrar un museo
  async delete(id: string) {
    const museum: MuseumEntity = await this.museumRepository.findOne({where:{id}});
    if (!museum)
      throw new BusinessLogicException("The museum with the given id was not found", BusinessError.NOT_FOUND);

    await this.museumRepository.remove(museum);
  }
}
