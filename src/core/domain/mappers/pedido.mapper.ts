import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'

export default class PedidoMapper {
  static toDto (pedido: Pedido): PedidoDto {
    return {
      id: pedido.id,
      consumidorId: pedido.consumidorId,
      total: pedido.total,
      paymentId: pedido.paymentId,
      // paymentStatus: undefined,
      createdAt: pedido.createdAt,
      updatedAt: pedido.updatedAt
    }
  }

  static toDomainEntity (input: PedidoDto): Pedido {
    return new Pedido({
      id: input.id,
      consumidorId: input.consumidorId,
      total: input.total,
      paymentId: input.paymentId,
      // paymentStatus: undefined,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
  }
}
