import Pedido from '@/core/domain/entities/pedido'
import MercadoPagoGatewayPaymentService from '@/infra/persistence/service/mercado-pago-gateway-payment.service'

describe('MercadoPagoGatewayPaymentService class tests', () => {
  let gateway:MercadoPagoGatewayPaymentService

  beforeEach(() => {
    gateway = new MercadoPagoGatewayPaymentService()
  })

  it('class constructor test', async () => {
    expect(gateway).toBeInstanceOf(MercadoPagoGatewayPaymentService)
  })

  it('class register method test', async () => {
    const pedido = new Pedido()
    const id = gateway.registerOrder(pedido)
    expect(id).not.toBeNull()
  })
})
