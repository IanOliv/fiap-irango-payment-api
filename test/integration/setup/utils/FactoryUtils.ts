/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@nestjs/common'

import { fakerPT_BR as faker } from '@faker-js/faker'
import { DataSource, ObjectLiteral, Repository } from 'typeorm'

import Payment from '@/core/domain/entities/payment'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'

type IConstructable<T> = new () => T

// Simplified version of https://www.npmjs.com/package/typeorm-factory
export class Factory<T extends ObjectLiteral> {
  private index = 0
  private sequences: Record<string, (index: number, obj: any) => any> = {} as any
  private Entity: IConstructable<T>
  private privateRepository: Repository<T> | undefined = undefined

  constructor (Entity: IConstructable<T>, private dataSource: DataSource) {
    this.Entity = Entity
  }

  private get repository () {
    this.privateRepository = this.privateRepository || this.dataSource.getRepository(this.Entity)
    return this.privateRepository
  }

  async create (data?: Partial<T>): Promise<T> {
    const obj: any = new this.Entity()

    for (const field in this.sequences) {
      obj[field] = await this.sequences[field](this.index++, obj)
    }

    return this.repository.save({ ...obj, ...(data || {}) } as T)
  }

  async createMany (count: number, data?: Partial<T>[]): Promise<T[]> {
    const objs: Promise<T>[] = []

    for (let i = 0; i < count; i++) {
      const d = data?.[i] || {}
      objs.push(this.create(d))
    }

    return Promise.all(objs)
  }

  sequence (field: keyof T, callback: (index: number, obj: any) => any) {
    this.sequences[field as string] = callback
    return this
  }
}

@Injectable()
export default class FactoryUtils {
  factories: Record<string, Factory<any>> = {}

  constructor (private dataSource: DataSource) {
    this.factories = {
      payment: this.paymentFactory(),
      pedido: this.pedidoFactory()
    }
  }

  paymentFactory = (): Factory<Payment> => {
    return new Factory(Payment, this.dataSource)
      .sequence('id', () => faker.string.uuid())
      .sequence('pedidoId', () => faker.string.uuid())
      .sequence('valor', () => faker.number.float({ min: 0.01, max: 100, precision: 2 }))
      .sequence('status', () => faker.lorem.paragraph())
  }

  pedidoFactory = (): Factory<Pedido> => {
    return new Factory(Pedido, this.dataSource)
      .sequence('id', () => faker.number.int({ min: 1, max: 999999 }))
      .sequence('consumidorId', () => faker.string.uuid())
      .sequence('total', () => faker.number.float({ min: 0.01, max: 100, precision: 2 }))
      .sequence('paymentId', async () => faker.string.uuid())
      .sequence('createdAt', () => new Date())
      .sequence('updatedAt', () => new Date())
  }

  payment = async (data?: Partial<Payment>) => {
    return this.factories.payment.create(data)
  }

  pedido = async (data?: Partial<Pedido>) => {
    return this.factories.pedido.create(data)
  }
}
