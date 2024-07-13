import PaymentDto from '@/core/domain/dto/output/payment.dto'
import Payment from '@/core/domain/entities/payment'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import { PaymentGateway } from 'src/core/operation/gateway/payment.gateway'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'

export default class UpdatePayment {
  constructor (
    private readonly gateway: PaymentGateway,
    private readonly orderService: IRangoOrderService,
  ) {}

  async handle (pedidoId: number, paymentApproved: boolean): Promise<PaymentDto> {
    const payment = await this.gateway.findByPedidoId(pedidoId)
    if (!payment) {
      throw new Error('Payment não encontrado')
    }

    if (!paymentApproved) {
      return payment
    }

    Payment.update(payment, PaymentStatusEnum.CONFIRMADO)
    await this.gateway.save(payment)

    await this.orderService.confirmPayment(pedidoId)

    return payment
  }
}
