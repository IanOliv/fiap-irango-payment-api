import Payment from '@/core/domain/entities/payment'

export default interface IPaymentRepository {
  findByPedidoId(pedidoId: number): Promise<Payment | undefined>;
  create(input: Payment): Promise<Payment>;
  save(input: Payment): Promise<Payment>;
}

export const IPaymentRepository = Symbol('IPaymentRepository')
