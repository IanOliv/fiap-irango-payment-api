import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm'

import { PaymentStatusEnum } from '@/core/domain/enums/payment-status.enum'

@Entity('Payment')
export class Payment {
  @PrimaryColumn({ length: 36 })
  public readonly id: string

  @Column({ name: 'pedido_id' })
  @Index()
  pedidoId: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number

  @Column({ type: 'varchar', length: 20 })
  status: PaymentStatusEnum

  @Column({ name: 'gateway_payment_id' })
  @Index()
  gatewayPaymentId: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date
}
