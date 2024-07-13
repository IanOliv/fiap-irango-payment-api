import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePaymentTable6431388108099 implements MigrationInterface {
    name = 'CreatePaymentTable6431388108099'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        'CREATE TABLE `Payment` (' +
        '  `id` varchar(36) NOT NULL, ' +
        '  `pedido_id` varchar(36) NOT NULL, ' +
        '  `valor` varchar(36) NOT NULL, ' +
        '  `status` varchar(36) NOT NULL, ' +
        '  `gateway_payment_id` varchar(36) NOT NULL, ' +
        '  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
        '  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), ' +

        '  INDEX `IDX_ab1b1fd218b234b04d3f2995b8` (`pedido_id`), ' +
        '  INDEX `IDX_d30558034ed9943d52118ab569` (`gateway_payment_id`), ' +

        '  PRIMARY KEY (`id`)' +
        ') ENGINE=InnoDB'
      )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX `IDX_d30558034ed9943d52118ab569` ON `Payment`')
      await queryRunner.query('DROP INDEX `IDX_ab1b1fd218b234b04d3f2995b8` ON `Payment`')
      await queryRunner.query('DROP TABLE `Payment`')
    }
}
