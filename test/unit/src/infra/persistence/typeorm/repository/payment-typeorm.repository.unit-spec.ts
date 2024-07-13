import { Repository } from 'typeorm'

import PaymentDto from '@/core/domain/dto/output/payment.dto'
import Payment from '@/core/domain/entities/payment'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import PaymentMapper from '@/core/domain/mappers/payment.mapper'
import { Payment as Entity } from '@/infra/persistence/typeorm/entities/payment'
import PaymentTypeormRepository from '@/infra/persistence/typeorm/repository/payment-typeorm.repository'

describe('PaymentTypeormRepository class test', () => {
  let paymentTypeormRepository:PaymentTypeormRepository

  let repository:jest.Mocked<Repository<Entity>>

  let mockToDto:jest.Mock<any>
  let toDomainEntity:jest.Mock<any>

  beforeEach(() => {
    mockToDto = jest.fn()
    toDomainEntity = jest.fn()

    repository = {
      save: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      find: jest.fn()
    } as unknown as jest.Mocked<Repository<Entity>>

    PaymentMapper.toDto = mockToDto
    PaymentMapper.toDomainEntity = toDomainEntity

    paymentTypeormRepository = new PaymentTypeormRepository(repository)
  })

  it('constructor class test', async () => {
    expect(paymentTypeormRepository).toBeInstanceOf(PaymentTypeormRepository)
  })

  it('create method test', async () => {
    const dto:PaymentDto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPaymentId: '1',
      status: PaymentStatusEnum.CANCELADO,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const payment = new Payment()

    const entity = new Entity()
    entity.pedidoId = 1
    entity.valor = 1
    entity.gatewayPaymentId = '1'
    entity.status = PaymentStatusEnum.CANCELADO
    entity.createdAt = new Date(1)
    entity.updatedAt = new Date(1)

    mockToDto.mockReturnValue(dto)
    toDomainEntity.mockReturnValue(payment)
    repository.save.mockResolvedValue(entity)

    const result = await paymentTypeormRepository.create(payment)
    expect(mockToDto).toHaveBeenCalledTimes(1)
    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(mockToDto).toHaveBeenCalledWith(payment)
    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(repository.save).toHaveBeenCalledWith(dto)
    expect(result).toEqual(payment)
  })

  it('findByPedidoId method test', async () => {
    const payment = new Payment()

    const entity = new Entity()
    entity.pedidoId = 1
    entity.valor = 1
    entity.gatewayPaymentId = '1'
    entity.status = PaymentStatusEnum.CANCELADO
    entity.createdAt = new Date(1)
    entity.updatedAt = new Date(1)

    toDomainEntity.mockReturnValue(payment)
    repository.findOne.mockResolvedValue(entity)

    const result = await paymentTypeormRepository.findByPedidoId(1)

    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(repository.findOne).toHaveBeenCalledTimes(1)

    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(repository.findOne).toHaveBeenCalledWith({ where: { pedidoId: 1 } })

    expect(result).toEqual(payment)
  })

  it('findByPedidoId method test when pedido is not found', async () => {
    repository.findOne.mockResolvedValue(null)

    const result = await paymentTypeormRepository.findByPedidoId(1)

    expect(toDomainEntity).toHaveBeenCalledTimes(0)
    expect(repository.findOne).toHaveBeenCalledTimes(1)
    expect(repository.findOne).toHaveBeenCalledWith({ where: { pedidoId: 1 } })
    expect(result).toEqual(undefined)
  })

  it('save method test', async () => {
    const dto:PaymentDto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPaymentId: '1',
      status: PaymentStatusEnum.CANCELADO,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const payment = new Payment()

    const entity = new Entity()
    entity.pedidoId = 1
    entity.valor = 1
    entity.gatewayPaymentId = '1'
    entity.status = PaymentStatusEnum.CANCELADO
    entity.createdAt = new Date(1)
    entity.updatedAt = new Date(1)

    mockToDto.mockReturnValue(dto)
    toDomainEntity.mockReturnValue(payment)
    repository.save.mockResolvedValue(entity)

    const result = await paymentTypeormRepository.save(payment)
    expect(mockToDto).toHaveBeenCalledTimes(1)
    expect(toDomainEntity).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(mockToDto).toHaveBeenCalledWith(payment)
    expect(toDomainEntity).toHaveBeenCalledWith(entity)
    expect(repository.save).toHaveBeenCalledWith(dto)
    expect(result).toEqual(payment)
  })
})
