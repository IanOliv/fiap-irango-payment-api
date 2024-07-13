import Payment from '@/core/domain/entities/payment'
import Pedido from '@/core/domain/entities/pedido'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'

export class PaymentGateway {
  constructor (
    private readonly repository: IPaymentRepository,
    private readonly gatewayPaymentService: IGatewayPaymentService,
    ) {
  }

  create (payment: Payment): Promise<Payment> {
    return this.repository.create(payment)
  }

  registerOrder (pedido: Pedido): Promise<string> {
    return this.gatewayPaymentService.registerOrder(pedido)
  }

  findByPedidoId (pedidoId: number): Promise<Payment | undefined> {
    return this.repository.findByPedidoId(pedidoId)
  }

  save (payment: Payment): Promise<Payment> {
    return this.repository.save(payment)
  }
}
