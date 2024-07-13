import Payment from '@/core/domain/entities/payment'
import Pedido from '@/core/domain/entities/pedido'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import { PaymentGateway } from 'src/core/operation/gateway/payment.gateway'

describe('Test PaymentGateway class', () => {
  let gateway:PaymentGateway

  let mockPaymentRepository:jest.Mocked<IPaymentRepository>
  let mockPaymentService:jest.Mocked<IGatewayPaymentService>

  beforeEach(() => {
    mockPaymentRepository = {
      findByPedidoId: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    }

    mockPaymentService = {
      registerOrder: jest.fn()
    }

    gateway = new PaymentGateway(mockPaymentRepository, mockPaymentService)
  })

  it('constructor class test', async () => {
    expect(gateway).toBeInstanceOf(PaymentGateway)
  })

  it('create method test', async () => {
    const payment = new Payment()
    mockPaymentRepository.create.mockResolvedValue(payment)
    const result = await gateway.create(payment)
    expect(mockPaymentRepository.create).toHaveBeenCalledTimes(1)
    expect(mockPaymentRepository.create).toHaveBeenCalledWith(payment)
    expect(result).toEqual(payment)
  })

  it('registerOrder method test', async () => {
    const pedido = new Pedido()
    mockPaymentService.registerOrder.mockResolvedValue('test')
    const result = await gateway.registerOrder(pedido)
    expect(mockPaymentService.registerOrder).toHaveBeenCalledTimes(1)
    expect(mockPaymentService.registerOrder).toHaveBeenCalledWith(pedido)
    expect(result).toEqual('test')
  })

  it('findByPedidoId method test', async () => {
    const payment = new Payment()
    mockPaymentRepository.findByPedidoId.mockResolvedValue(payment)
    const result = await gateway.findByPedidoId(1)
    expect(mockPaymentRepository.findByPedidoId).toHaveBeenCalledTimes(1)
    expect(mockPaymentRepository.findByPedidoId).toHaveBeenCalledWith(1)
    expect(result).toEqual(payment)
  })

  it('save method test', async () => {
    const payment = new Payment()
    mockPaymentRepository.save.mockResolvedValue(payment)
    const result = await gateway.save(payment)
    expect(mockPaymentRepository.save).toHaveBeenCalledTimes(1)
    expect(mockPaymentRepository.save).toHaveBeenCalledWith(payment)
    expect(result).toEqual(payment)
  })
})
