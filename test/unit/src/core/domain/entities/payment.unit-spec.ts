import Payment from '@/core/domain/entities/payment'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'

describe('Tests for Payment class', () => {
  it('class constructor test', () => {
    const param = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPaymentId: '1',
      status: PaymentStatusEnum.CONFIRMADO
    }

    const payment = new Payment(param)

    expect(payment).toBeInstanceOf(Payment)
  })

  it('class create test', () => {
    const payment = Payment.create(
      1,
      1,
      '1',
      PaymentStatusEnum.CONFIRMADO
    )

    expect(payment).toBeInstanceOf(Payment)
  })

  it('class update test', () => {
    const payment = Payment.create(
      1,
      1,
      '1',
      PaymentStatusEnum.CANCELADO
    )

    Payment.update(payment, PaymentStatusEnum.CONFIRMADO)

    expect(payment).toBeInstanceOf(Payment)
    expect(payment.status).toEqual(PaymentStatusEnum.CONFIRMADO)
  })
})
