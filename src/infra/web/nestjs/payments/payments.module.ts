import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPaymentRepository } from '@/core/domain/repositories/ipayment.repository'
import { IGatewayPaymentService } from '@/core/domain/services/igateway-payment.service'
import { IOrderService } from '@/core/domain/services/iorder.service'
import IRangoOrderService from '@/infra/persistence/service/irango-order.service'
import MercadoPagoGatewayPaymentService from '@/infra/persistence/service/mercado-pago-gateway-payment.service'
import { Payment } from '@/infra/persistence/typeorm/entities/payment'
import PaymentTypeormRepository from '@/infra/persistence/typeorm/repository/payment-typeorm.repository'
import {PaymentsController} from '@/infra/web/nestjs/payments/payments.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
    ]),
  ],
  providers: [
    { provide: IPaymentRepository, useClass: PaymentTypeormRepository },
    { provide: IOrderService, useClass: IRangoOrderService },
    { provide: IGatewayPaymentService, useClass: MercadoPagoGatewayPaymentService },

  ],
  controllers: [
    PaymentsController,
  ],
  exports: [
    IPaymentRepository,
    IGatewayPaymentService,
  ],
})
export default class PaymentsModule {}
