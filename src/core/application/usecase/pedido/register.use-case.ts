import { PaymentGateway } from 'src/core/operation/gateway/payment.gateway'
import { PedidoGateway } from 'src/core/operation/gateway/pedido.gateway'

import Payment from '@/core/domain/entities/payment'
import Pedido from '@/core/domain/entities/pedido'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

export default class Register {
  constructor (
    private readonly gateway: PedidoGateway,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async handle (input: RegisterPedidoRequest): Promise<Pedido> {

    let pedido = Pedido.create(
      input.id,
      input.consumidorId,
      input.total,
      input.createdAt,
      input.updatedAt,
    )

    pedido = await this.gateway.create(pedido)

    const gatewayPaymentId = await this.paymentGateway.registerOrder(pedido)

    let payment = Payment.create(
      pedido.id,
      input.total,
      gatewayPaymentId,
      PaymentStatusEnum.PENDENTE,
    )
    payment = await this.paymentGateway.create(payment)

    pedido.paymentId = payment.id

    return pedido
  }
}
