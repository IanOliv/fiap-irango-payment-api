import Pedido from '@/core/domain/entities/pedido'

export default interface IGatewayPaymentService {
  registerOrder(pedido: Pedido): Promise<string>;
}

export const IGatewayPaymentService = Symbol('IGatewayPaymentService')
