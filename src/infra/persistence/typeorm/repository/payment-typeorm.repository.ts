import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import PaymentDto from '@/core/domain/dto/output/payment.dto'
import Payment from '@/core/domain/entities/payment'
import PaymentMapper from '@/core/domain/mappers/payment.mapper'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import { Payment as Entity } from '@/infra/persistence/typeorm/entities/payment'

@Injectable()
export default class PaymentTypeormRepository implements IPaymentRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Payment): Promise<Payment> {
    let model = PaymentMapper.toDto(input)

    model = await this.repository.save(model)

    return PaymentMapper.toDomainEntity(model as PaymentDto)
  }

  async findByPedidoId (pedidoId: number): Promise<Payment | undefined> {
    const model = await this.repository.findOne({ where: { pedidoId } })

    return model ? PaymentMapper.toDomainEntity(model) : undefined
  }

  async save (input: Payment): Promise<Payment> {
    let model = PaymentMapper.toDto(input)

    model = await this.repository.save(model)

    return PaymentMapper.toDomainEntity(model as PaymentDto)
  }
}
