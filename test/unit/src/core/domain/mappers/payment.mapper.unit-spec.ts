import Payment from '@/core/domain/entities/payment'
import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'
import PaymentMapper from '@/core/domain/mappers/payment.mapper'

describe('PaymentMapper class test', () => {
  it('toDto class test', async () => {
    const payment = Payment.create(1, 1, '1', PaymentStatusEnum.PENDENTE)

    const dto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPaymentId: '1',
      status: PaymentStatusEnum.PENDENTE
    }

    const result = PaymentMapper.toDto(payment)

    expect(result.gatewayPaymentId).toEqual(dto.gatewayPaymentId)
    expect(result.pedidoId).toEqual(dto.pedidoId)
    expect(result.status).toEqual(dto.status)
    expect(result.valor).toEqual(dto.valor)
  })

  it('toDomainEntity class test', async () => {
    const payment = Payment.create(1, 1, '1', PaymentStatusEnum.PENDENTE)

    const dto = {
      id: '1',
      pedidoId: 1,
      valor: 1,
      gatewayPaymentId: '1',
      status: PaymentStatusEnum.PENDENTE
    }

    const result = PaymentMapper.toDomainEntity(dto)

    expect(result.pedidoId).toEqual(payment.pedidoId)
    expect(result.status).toEqual(payment.status)
    expect(result.valor).toEqual(payment.valor)
  })
})
