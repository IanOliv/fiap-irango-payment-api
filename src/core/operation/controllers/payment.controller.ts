import { PaymentGateway } from 'src/core/operation/gateway/payment.gateway'

import UpdatePayment from '@/core/application/usecase/payment/update-payment.use-case'
import PaymentDto from '@/core/domain/dto/output/payment.dto'
import PaymentMapper from '@/core/domain/mappers/payment.mapper'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

export class PaymentController {
  constructor (
   private readonly repository: IPaymentRepository,
   private readonly gatewayPaymentService: IGatewayPaymentService,
   private readonly orderService: IRangoOrderService,
  ) {}

  async handleWebhookMercadoPago (
    pedidoId: number,
    paymentApproved: boolean
 ): Promise<PaymentDto> {
    const useCase = new UpdatePayment(
      new PaymentGateway(
        this.repository,
        this.gatewayPaymentService,
      ),
      this.orderService,
    )

    const payment = await useCase.handle(pedidoId, paymentApproved)

    return PaymentMapper.toDto(payment)
  }
}
