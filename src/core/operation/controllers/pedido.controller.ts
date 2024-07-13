import Register from '@/core/application/usecase/pedido/register.use-case'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import { PaymentGateway } from 'src/core/operation/gateway/payment.gateway'
import { PedidoGateway } from 'src/core/operation/gateway/pedido.gateway'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

export class PedidoController {
  constructor (
   private readonly repository: IPedidoRepository,
   private readonly paymentRepository: IPaymentRepository,
   private readonly gatewayPaymentService: IGatewayPaymentService,
  ) {}

  async register (
    input: RegisterPedidoRequest
  ): Promise<PedidoDto> {
    const useCase = new Register(
      new PedidoGateway(this.repository),
      new PaymentGateway(this.paymentRepository, this.gatewayPaymentService),
    )

    const pedido = await useCase.handle(input)

    return PedidoMapper.toDto(pedido)
  }
}
