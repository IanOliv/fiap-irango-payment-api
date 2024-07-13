import Register from '@/core/application/usecase/pedido/register.use-case'
import Pedido from '@/core/domain/entities/pedido'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPaymentRepository from '@/core/domain/repositories/ipayment.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IGatewayPaymentService from '@/core/domain/services/igateway-payment.service'
import { PedidoController } from 'src/core/operation/controllers/pedido.controller'
import RegisterPedidoRequest from '@/infra/web/nestjs/pedidos/dto/register-pedido.request'

describe('Test for ProdutoController Class', () => {
  let controller:PedidoController

  let mockPedidoRepository:jest.Mocked<IPedidoRepository>
  let mockPaymentRepository:jest.Mocked<IPaymentRepository>
  let mockPaymentService:jest.Mocked<IGatewayPaymentService>

  let mockRegisterHandler:jest.Mock<any>
  let mockDto:jest.Mock<any>

  beforeEach(() => {
    mockRegisterHandler = jest.fn()
    mockDto = jest.fn()

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

    Register.prototype.handle = mockRegisterHandler
    PedidoMapper.toDto = mockDto

    controller = new PedidoController(mockPedidoRepository, mockPaymentRepository, mockPaymentService)
  })

  it('constructor class test', async () => {
    expect(controller).toBeInstanceOf(PedidoController)
  })

  it('register method test', async () => {
    const input = new RegisterPedidoRequest()

    const dto = {
      id: 1,
      consumidorId: '1',
      total: 1,
      paymentId: '1',
      createdAt: new Date(1),
      updatedAt: new Date(1)
    }

    const pedido = new Pedido({
      id: 1,
      consumidorId: '1',
      total: 1,
      paymentId: '1',
      createdAt: new Date(1),
      updatedAt: new Date(1)
    })

    mockRegisterHandler.mockResolvedValue(pedido)
    mockDto.mockReturnValue(dto)

    const result = await controller.register(input)

    expect(mockRegisterHandler).toHaveBeenCalledTimes(1)
    expect(mockDto).toHaveBeenCalledTimes(1)

    expect(mockRegisterHandler).toHaveBeenCalledWith(input)
    expect(mockDto).toHaveBeenCalledWith(pedido)
    expect(result).toEqual(dto)
  })
})
