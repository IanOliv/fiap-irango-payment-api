/* eslint-disable import-helpers/order-imports */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'

import IOrderService, {
  IOrderService as IOrderServiceSymbol,
} from '@/core/domain/services/iorder.service'

import IPaymentRepository, {
  IPaymentRepository as IPaymentRepositorySymbol,
} from '@/core/domain/repositories/ipayment.repository'
import IGatewayPaymentService, {
  IGatewayPaymentService as IGatewayPaymentServiceSymbol,
} from '@/core/domain/services/igateway-payment.service'

import { PaymentController } from 'src/core/operation/controllers/payment.controller'

import PaymentDto from '@/core/domain/dto/output/payment.dto'
import UpdatePaymentPayload from '@/infra/web/mercado-pago/dto/update-payment-payload'

@Controller('v1/payments')
@ApiTags('v1/payments')
export default class PaymentsController {
  constructor (
    @Inject(IPaymentRepositorySymbol) private readonly repository: IPaymentRepository,
    @Inject(IGatewayPaymentServiceSymbol) private readonly gatewayPaymentService: IGatewayPaymentService,
    @Inject(IOrderServiceSymbol) private readonly orderService: IOrderService,
  ) {}

  @Post('/webhook/mercado-pago')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'atualizar um Pedido a partir do evento do gateway de payment' })
  @ApiBody({ type: UpdatePaymentPayload })
  paymentWebhook (
    @Body() input: UpdatePaymentPayload
  ): Promise<PaymentDto> {
    const pedidoId = parseInt(input.external_reference)
    const paymentApproved = !!input.date_approved

    const controller = new PaymentController(
      this.repository,
      this.gatewayPaymentService,
      this.orderService,
    )

    return controller.handleWebhookMercadoPago(pedidoId, paymentApproved)
  }
}
