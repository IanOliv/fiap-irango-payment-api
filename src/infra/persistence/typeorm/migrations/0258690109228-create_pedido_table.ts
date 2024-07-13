import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePedidoTable0258690109228 implements MigrationInterface {
    name = 'CreatePedidoTable0258690109228'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        'CREATE TABLE `Pedido` (' +
        '  `id` int NOT NULL, ' +
        '  `consumidor_id` varchar(36) NULL, ' +
        '  `total` decimal(10,2) NOT NULL, ' +
        '  `created_at` datetime NOT NULL, ' +
        '  `updated_at` datetime NOT NULL, ' +
        '  `payment_id` varchar(36) NULL, ' +

        '  INDEX `IDX_b7dc58160e255f17a285e7172d` (`consumidor_id`), ' +
        '  INDEX `IDX_8a7002bb1a91f0d72962c46469` (`payment_id`), ' +

        '  PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB'
      )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX `IDX_8a7002bb1a91f0d72962c46469` ON `Pedido`')
      await queryRunner.query('DROP INDEX `IDX_b7dc58160e255f17a285e7172d` ON `Pedido`')
      await queryRunner.query('DROP TABLE `Pedido`')
    }
}
