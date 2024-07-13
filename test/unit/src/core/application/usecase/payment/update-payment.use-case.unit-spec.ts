import { PaymentGateway } from 'src/core/operation/gateway/payment.gateway'

import UpdatePayment from '@/core/application/usecase/payment/update-payment.use-case'
import Payment from '@/core/domain/entities/payment'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

describe('Test UpdatePayment Class', () => {
  let usecase:UpdatePayment

  let mockOrderService:jest.Mocked<IRangoOrderService>
  let mockPaymentGateway:PaymentGateway

  let mockPaymentRepository:jest.Mocked<IPaymentRepository>
  let mockPaymentService:jest.Mocked<IGatewayPaymentService>

  let mockCreatePayment:jest.Mock<any>
  let mockRegisterOrderPayment:jest.Mock<any>
  let mockFindByPedidoIdPayment:jest.Mock<any>
  let mockSavePayment:jest.Mock<any>

  beforeEach(() => {
    jest.mock('@/core/operation/gateway/payment.gateway')
    jest.mock('@/core/operation/gateway/pedido.gateway')

    mockCreatePayment = jest.fn()
    mockRegisterOrderPayment = jest.fn()
    mockFindByPedidoIdPayment = jest.fn()
    mockSavePayment = jest.fn()

    PaymentGateway.prototype.create = mockCreatePayment
    PaymentGateway.prototype.findByPedidoId = mockFindByPedidoIdPayment
    PaymentGateway.prototype.registerOrder = mockRegisterOrderPayment
    PaymentGateway.prototype.save = mockSavePayment

    mockPaymentRepository = {
      findByPedidoId: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    }

    mockPaymentService = {
      registerOrder: jest.fn()
    }

    mockOrderService = {
      confirmPayment: jest.fn()
    }

    mockPaymentGateway = new PaymentGateway(mockPaymentRepository, mockPaymentService)
    usecase = new UpdatePayment(mockPaymentGateway, mockOrderService)
  })

  it('test constructor class', async () => {
    expect(usecase).toBeInstanceOf(UpdatePayment)
  })

  it('test handle class method using not found payment', async () => {
    mockFindByPedidoIdPayment.mockResolvedValue(null)
    await expect(usecase.handle(1, true)).rejects.toThrow(new Error('Payment não encontrado'))
  })

  it('test handle class method using not approved payment', async () => {
    const payment = Payment.create(
      1,
      1,
      '1',
      PaymentStatusEnum.PENDENTE,
    )

    mockFindByPedidoIdPayment.mockResolvedValue(payment)

    const result = await usecase.handle(1, false)

    expect(mockFindByPedidoIdPayment).toHaveBeenCalledTimes(1)

    expect(mockFindByPedidoIdPayment).toHaveBeenCalledWith(1)
    expect(result).toEqual(payment)
  })

  it('test handle class method', async () => {
    const payment = Payment.create(
      1,
      1,
      '1',
      PaymentStatusEnum.CONFIRMADO,
    )

    mockFindByPedidoIdPayment.mockResolvedValue(payment)

    const result = await usecase.handle(1, true)

    expect(mockFindByPedidoIdPayment).toHaveBeenCalledTimes(1)
    expect(mockSavePayment).toHaveBeenCalledTimes(1)
    expect(mockOrderService.confirmPayment).toHaveBeenCalledTimes(1)

    expect(mockFindByPedidoIdPayment).toHaveBeenCalledWith(1)
    expect(mockSavePayment).toHaveBeenCalledWith(payment)
    expect(mockOrderService.confirmPayment).toHaveBeenCalledWith(1)

    expect(result).toEqual(payment)
  })
})
