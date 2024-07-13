import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import { PedidoController } from 'src/core/operation/controllers/pedido.controller'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'
import RegisterPedidoResponse from '@/infra/web/nestjs/pedidos/dto/register-pedido.response'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'

describe('PedidosController class tests', () => {
  let controller:PedidosController

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>
  let mockPaymentRepository:jest.Mocked<IPaymentRepository>
  let mockPaymentService:jest.Mocked<IGatewayPaymentService>

  let mockRegisterHandler:jest.Mock<any>

  beforeEach(() => {
    mockRegisterHandler = jest.fn()

    mockPaymentRepository = {
      findByPedidoId: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    }

    mockPaymentService = {
      registerOrder: jest.fn()
    }

    mockPedidoRepository = {
      create: jest.fn(),
      save: jest.fn()
    }

    PedidoController.prototype.register = mockRegisterHandler

    controller = new PedidosController(mockPedidoRepository, mockPaymentRepository, mockPaymentService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PedidosController)
  })

  it('registerPedido method test', async () => {
    const input = new RegisterPedidoRequest()
    const response = new RegisterPedidoResponse()
    mockRegisterHandler.mockResolvedValue(response)
    const result = await controller.registerPedido(input)
    expect(mockRegisterHandler).toHaveBeenCalledTimes(1)
    expect(mockRegisterHandler).toHaveBeenCalledTimes(1)
    expect(mockRegisterHandler).toHaveBeenCalledWith(input)
    expect(result).toEqual(response)
  })
})
