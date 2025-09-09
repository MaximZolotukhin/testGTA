export class CreateUserAndPost1757405555275 {
    constructor() {
        this.name = 'CreateUserAndPost1757405555275';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(200) NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }
}
