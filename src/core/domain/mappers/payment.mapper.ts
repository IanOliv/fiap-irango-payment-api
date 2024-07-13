import PaymentDto from '@/core/domain/dto/output/payment.dto'
import Payment from '@/core/domain/entities/payment'

export default class PaymentMapper {
  static toDto (payment: Payment): PaymentDto {
    return {
      id: payment.id,
      pedidoId: payment.pedidoId,
      gatewayPaymentId: payment.gatewayPaymentId,
      valor: payment.valor,
      status: payment.status,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    }
  }

  static toDomainEntity (input: PaymentDto): Payment {
    return new Payment({
      id: input.id,
      pedidoId: input.pedidoId,
      valor: input.valor,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
  }
}
