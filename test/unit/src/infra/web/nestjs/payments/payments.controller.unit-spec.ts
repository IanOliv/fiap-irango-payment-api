import { PaymentController } from 'src/core/operation/controllers/payment.controller'

import PaymentDto from '@/core/domain/dto/output/payment.dto'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import IOrderService from '@/core/domain/services/iorder.service'
import UpdatePaymentPayload from '@/infra/web/mercado-pago/dto/update-payment-payload'
import PaymentsController from '@/infra/web/nestjs/payments/payments.controller'

describe('PaymentsController class tests', () => {
  let controller:PaymentsController

  let mockOrderService:jest.Mocked<IOrderService>
  let mockPaymentRepository:jest.Mocked<IPaymentRepository>
  let mockPaymentService:jest.Mocked<IGatewayPaymentService>

  let mockHandleWebhookMercadoPago:jest.Mock<any>

  beforeEach(() => {
    mockHandleWebhookMercadoPago = jest.fn()

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

    PaymentController.prototype.handleWebhookMercadoPago = mockHandleWebhookMercadoPago

    controller = new PaymentsController(mockPaymentRepository, mockPaymentService, mockOrderService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PaymentsController)
  })

  it('paymentWebhook method test', async () => {
    const input = new UpdatePaymentPayload()

    const dto:PaymentDto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPaymentId: '1',
      status: PaymentStatusEnum.PENDENTE,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    mockHandleWebhookMercadoPago.mockResolvedValue(dto)

    const result = await controller.paymentWebhook(input)

    expect(mockHandleWebhookMercadoPago).toHaveBeenCalledTimes(1)
    expect(mockHandleWebhookMercadoPago).toHaveBeenCalledWith(parseInt(input.external_reference), !!input.date_approved)
    expect(result).toEqual(dto)
  })
})
