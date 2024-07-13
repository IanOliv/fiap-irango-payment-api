import { ApiProperty } from '@nestjs/swagger'

export default class UpdatePaymentPayload {
  @ApiProperty({ description: 'ID do Pedido no gateway de payment', example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly id: string

  @ApiProperty({ description: 'ID do Pedido', example: '1' })
  readonly external_reference: string

  @ApiProperty({
    description: 'Data de aprovação do payment',
    example: new Date().toISOString(),
    required: false
  })
  readonly date_approved?: string
}
