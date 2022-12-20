import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Principle } from 'src/models/principle.model';
import { Connection, Repository } from 'typeorm';

Principle;
@Injectable()
export class PrincipleService {
  constructor(
    @InjectRepository(Principle)
    private principleRepository: Repository<Principle>,
    private connection: Connection
  ) {}

  async createPrinciple(createPrincipleSchema: Principle): Promise<Principle> {
    Logger.log('createTPrincipleDto from servoice', createPrincipleSchema);
    const newPrinciple = await this.principleRepository.create(
      createPrincipleSchema,
    );
    return this.principleRepository.save(newPrinciple);
  }

  async findAllPrinciple(): Promise<Principle[]> {
    const principleData = await this.principleRepository.find();
    if (!principleData || principleData.length == 0) {
      throw new NotFoundException('Techer data not found!');
    }
    return principleData;
  }

  async getPrinciple(PrincipleId: number): Promise<Principle> {
    Logger.warn('PrincipleId', PrincipleId);
    const queryRunner =  await this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const existingPrinciple = await this.principleRepository.findOneBy({
        id: PrincipleId,
      });
      if (!existingPrinciple) {
        throw new NotFoundException(`Teacher #${PrincipleId} not found`);
      }
      return existingPrinciple;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new NotFoundException(`Teacher #${PrincipleId} not found`);
    } finally {
      await queryRunner.release();
    }
  }
}
