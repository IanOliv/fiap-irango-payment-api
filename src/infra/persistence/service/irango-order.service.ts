import { Injectable } from '@nestjs/common'

import axios from 'axios'

import IOrderService from '@/core/domain/services/iorder.service'
import { Environment as envs } from '@/infra/web/nestjs/environment'

@Injectable()
export default class IRangoOrderService implements IOrderService {
  constructor (
  ) {}

  async confirmPayment (pedidoId: number): Promise<void> {
    const url = `${envs.SERVICE_IRANGO_ORDER_API}/v1/pedidos/payment-webhook/confirm/${pedidoId}`
    try {
      await axios.post(url)
    } catch (error) {
      console.error(`Error: ${error}`)
      console.error(error.response?.data)
    }
  }
}
