
export default interface PedidoDto {
  readonly id: number;
  readonly consumidorId?: string;
  readonly paymentId?: string;
  readonly total: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
