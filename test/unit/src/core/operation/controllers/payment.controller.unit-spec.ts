import { PaymentController } from 'src/core/operation/controllers/payment.controller'

import UpdatePayment from '@/core/application/usecase/payment/update-payment.use-case'
import PaymentDto from '@/core/domain/dto/output/payment.dto'
import Payment from '@/core/domain/entities/payment'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import PaymentMapper from '@/core/domain/mappers/payment.mapper'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

describe('Test PaymentController class', () => {
  let controller:PaymentController

  let mockOrderService:jest.Mocked<IRangoOrderService>
  let mockPaymentRepository:jest.Mocked<IPaymentRepository>
  let mockPaymentService:jest.Mocked<IGatewayPaymentService>

  let mockUpdatePaymentHandler:jest.Mock<any>
  let mockPaymentMapper:jest.Mock<any>

  beforeEach(() => {
    mockUpdatePaymentHandler = jest.fn()
    mockPaymentMapper = jest.fn()

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

    UpdatePayment.prototype.handle = mockUpdatePaymentHandler
    PaymentMapper.toDto = mockPaymentMapper

    controller = new PaymentController(mockPaymentRepository, mockPaymentService, mockOrderService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PaymentController)
  })

  it('handleWebhookMercadoPago class method test', async () => {
    const payment = new Payment({
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPaymentId: '1',
      status: PaymentStatusEnum.PENDENTE,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    })

    const dto: PaymentDto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPaymentId: '1',
      status: PaymentStatusEnum.PENDENTE,
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    mockUpdatePaymentHandler.mockResolvedValue(payment)
    mockPaymentMapper.mockReturnValue(dto)

    const result = await controller.handleWebhookMercadoPago(1, false)

    expect(mockUpdatePaymentHandler).toHaveBeenCalledTimes(1)
    expect(mockPaymentMapper).toHaveBeenCalledTimes(1)

    expect(mockUpdatePaymentHandler).toHaveBeenCalledWith(1, false)
    expect(mockPaymentMapper).toHaveBeenCalledWith(payment)
    expect(result).toEqual(dto)
  })
})
