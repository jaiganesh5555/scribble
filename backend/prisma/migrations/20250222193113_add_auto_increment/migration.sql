-- AlterTable
CREATE SEQUENCE blog_id_seq;
ALTER TABLE "Blog" ALTER COLUMN "id" SET DEFAULT nextval('blog_id_seq');
ALTER SEQUENCE blog_id_seq OWNED BY "Blog"."id";
