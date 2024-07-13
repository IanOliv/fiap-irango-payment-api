import { v4 as uuidv4 } from 'uuid'

import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'

export default class Payment {
  readonly id: string
  pedidoId: number
  valor: number
  gatewayPaymentId: string
  status: PaymentStatusEnum
  createdAt?: Date
  updatedAt?: Date

  public constructor (params?: Partial<Payment>) {
    Object.assign(this, params)
  }

  static create (
    pedidoId: number,
    valor: number,
    gatewayPaymentId: string,
    status: PaymentStatusEnum,
  ): Payment {
    const id = uuidv4()
    const payment = new Payment({
      id,
      pedidoId,
      gatewayPaymentId,
      valor,
      status,
    })

    return payment
  }

  static update (payment: Payment, status: PaymentStatusEnum): void {
    payment.status = status
  }
}
