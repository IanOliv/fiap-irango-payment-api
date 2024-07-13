import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import TypeOrmConfig from '@/config/typeorm/TypeOrmConfig'
import AppController from '@/infra/web/nestjs/app.controller'
import PaymentsModule from '@/infra/web/nestjs/payments/payments.module'
import PedidosModule from '@/infra/web/nestjs/pedidos/pedidos.module'

export const appModules = [
  PaymentsModule,
  PedidosModule,
]

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    ...appModules
  ],
  controllers: [
    AppController
  ],
  providers: [
  ],
  exports: [
  ]
})
export default class AppModule {
}
