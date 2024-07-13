import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'

export default interface PaymentDto {
  readonly id: string;
  readonly pedidoId: number;
  readonly valor: number;
  readonly gatewayPaymentId: string;
  readonly status: PaymentStatusEnum;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
