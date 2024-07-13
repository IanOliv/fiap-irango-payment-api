import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import IPaymentRepository, {
  IPaymentRepository as IPaymentRepositorySymbol,
} from '@/core/domain/repositories/ipayment.repository'
import IPedidoRepository, {
  IPedidoRepository as IPedidoRepositorySymbol,
} from '@/core/domain/repositories/ipedido.repository'
import IGatewayPaymentService, {
  IGatewayPaymentService as IGatewayPaymentServiceSymbol,
} from '@/core/domain/services/igateway-payment.service'
import { PedidoController } from 'src/core/operation/controllers/pedido.controller'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import RegisterPedidoResponse from '@/infra/web/nestjs/pedidos/dto/register-pedido.response'

@Controller('v1/pedidos')
@ApiTags('v1/pedidos')
export default class PedidosController {
  constructor (
    @Inject(IPedidoRepositorySymbol) private readonly repository: IPedidoRepository,
    @Inject(IPaymentRepositorySymbol) private readonly paymentRepository: IPaymentRepository,
    @Inject(IGatewayPaymentServiceSymbol) private readonly gatewayPaymentService: IGatewayPaymentService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registra um novo pedido e o associa a um novo Payment' })
  @ApiBody({ type: RegisterPedidoRequest })
  @ApiCreatedResponse({ description: 'Registro criado', type: RegisterPedidoResponse })
  registerPedido (
    @Body() input: RegisterPedidoRequest
  ): Promise<RegisterPedidoResponse> {
    const controller = new PedidoController(
      this.repository,
      this.paymentRepository,
      this.gatewayPaymentService,
    )

    return controller.register(input)
  }
}
