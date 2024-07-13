import { PaymentGateway } from 'src/core/operation/gateway/payment.gateway'
import { PedidoGateway } from 'src/core/operation/gateway/pedido.gateway'

import Payment from '@/core/domain/entities/payment'
import Pedido from '@/core/domain/entities/pedido'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

export default class RegisterOrder {
  constructor (
    private readonly pedidoGateway: PedidoGateway,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async handle (input: RegisterPedidoRequest): Promise<Payment> {
    const { id, consumidorId, total, createdAt, updatedAt } = input
    let pedido = Pedido.create(
      id,
      consumidorId,
      total,
      createdAt,
      updatedAt,
    )

    pedido = await this.pedidoGateway.create(pedido)
    const gatewayPaymentId = await this.paymentGateway.registerOrder(pedido)

    let payment = Payment.create(
      pedido.id,
      pedido.total,
      gatewayPaymentId,
      PaymentStatusEnum.PENDENTE,
    )

    payment = await this.paymentGateway.create(payment)

    pedido.paymentId = payment.id

    await this.pedidoGateway.save(pedido)
    return payment
  }
}
