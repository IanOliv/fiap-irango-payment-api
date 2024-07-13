import { PaymentGateway } from 'src/core/operation/gateway/payment.gateway'
import { PedidoGateway } from 'src/core/operation/gateway/pedido.gateway'

import RegisterOrder from '@/core/application/usecase/payment/registerOrder.use-case'
import Payment from '@/core/domain/entities/payment'
import Pedido from '@/core/domain/entities/pedido'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

describe('test RegisterOrder class', () => {
  let usecase:RegisterOrder

  let mockPedidoGateway:PedidoGateway
  let mockPaymentGateway: PaymentGateway

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>
  let mockPaymentRepository:jest.Mocked<IPaymentRepository>
  let mockPaymentService:jest.Mocked<IGatewayPaymentService>

  let mockCreatePedido:jest.Mock<any>
  let mockSavePedido:jest.Mock<any>

  let mockCreatePayment:jest.Mock<any>
  let mockRegisterOrderPayment:jest.Mock<any>
  let mockFindByPedidoIdPayment:jest.Mock<any>
  let mockSavePayment:jest.Mock<any>

  beforeEach(() => {
    jest.mock('@/core/operation/gateway/payment.gateway')
    jest.mock('@/core/operation/gateway/pedido.gateway')

    mockCreatePedido = jest.fn()
    mockSavePedido = jest.fn()

    mockCreatePayment = jest.fn()
    mockRegisterOrderPayment = jest.fn()
    mockFindByPedidoIdPayment = jest.fn()
    mockSavePayment = jest.fn()

    PedidoGateway.prototype.create = mockCreatePedido
    PedidoGateway.prototype.save = mockSavePedido

    PaymentGateway.prototype.create = mockCreatePayment
    PaymentGateway.prototype.findByPedidoId = mockFindByPedidoIdPayment
    PaymentGateway.prototype.registerOrder = mockRegisterOrderPayment
    PaymentGateway.prototype.save = mockSavePayment

    mockPedidoRepository = {
      create: jest.fn(),
      save: jest.fn()
    }

    mockPaymentRepository = {
      findByPedidoId: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    }

    mockPaymentService = {
      registerOrder: jest.fn()
    }

    mockPedidoGateway = new PedidoGateway(mockPedidoRepository)
    mockPaymentGateway = new PaymentGateway(mockPaymentRepository, mockPaymentService)
    usecase = new RegisterOrder(mockPedidoGateway, mockPaymentGateway)
  })

  it('test class constructor', async () => {
    expect(usecase).toBeInstanceOf(RegisterOrder)
  })

  it('test class handle method', async () => {
    const input = new RegisterPedidoRequest()

    const { id, consumidorId, total, createdAt, updatedAt } = input

    const pedido = Pedido.create(
      id,
      consumidorId,
      total,
      createdAt,
      updatedAt,
    )

    const payment = Payment.create(
      pedido.id,
      pedido.total,
      '1',
      PaymentStatusEnum.PENDENTE,
    )

    mockCreatePedido.mockResolvedValue(pedido)
    mockRegisterOrderPayment.mockResolvedValue('1')
    mockCreatePayment.mockResolvedValue(payment)

    await usecase.handle(input)

    expect(mockCreatePedido).toHaveBeenCalledTimes(1)
    expect(mockRegisterOrderPayment).toHaveBeenCalledTimes(1)
    expect(mockCreatePayment).toHaveBeenCalledTimes(1)
    expect(mockSavePedido).toHaveBeenCalledTimes(1)

    pedido.paymentId = undefined

    expect(mockCreatePedido).toHaveBeenCalledWith(pedido)
    expect(mockRegisterOrderPayment).toHaveBeenCalledWith(pedido)
    pedido.paymentId = payment.id
    expect(mockSavePedido).toHaveBeenCalledWith(pedido)
  })
})
