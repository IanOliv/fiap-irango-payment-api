import { Injectable } from '@nestjs/common'

import { v4 as uuidv4 } from 'uuid'

import Pedido from '@/core/domain/entities/pedido'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'

@Injectable()
export default class MercadoPagoGatewayPaymentService implements IGatewayPaymentService {
  constructor (
  ) {}

  async registerOrder (pedido: Pedido): Promise<string> {
    console.log(`Mocked Mercado Pago API: Register order for pedido ${pedido.id}`)
    const gatewayPaymentId = uuidv4() // mocked ID
    console.log(`Gateway Payment ID: ${gatewayPaymentId}`)
    return gatewayPaymentId
  }
}
