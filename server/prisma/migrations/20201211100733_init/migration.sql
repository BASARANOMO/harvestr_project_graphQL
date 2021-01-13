-- CreateEnum
CREATE TYPE "public"."ACCOUNT_TYPE" AS ENUM ('MAIN_ADMIN', 'ADMIN', 'VIEWER');

-- CreateEnum
CREATE TYPE "public"."CONTRIBUTOR_ATTRIBUTE_TYPE" AS ENUM ('TEXT', 'NUMERIC', 'FINANCIAL', 'DECIMAL', 'RATING', 'BOOLEAN', 'DATE', 'LIST', 'URL');

-- CreateEnum
CREATE TYPE "public"."ENTITY_TYPE" AS ENUM ('Person', 'Organization');

-- CreateTable
CREATE TABLE "Account" (
"id" SERIAL,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "type" "ACCOUNT_TYPE",

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chunk" (
    "projectId" INTEGER NOT NULL,
"id" SERIAL,
    "messageId" INTEGER NOT NULL,
    "discoveryId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContributorAttribute" (
    "projectId" INTEGER NOT NULL,
"id" SERIAL,
    "appliesTo" "ENTITY_TYPE",
    "name" TEXT NOT NULL,
    "type" "CONTRIBUTOR_ATTRIBUTE_TYPE" NOT NULL,

    PRIMARY KEY ("id","type")
);

-- CreateTable
CREATE TABLE "ContributorAttributeValue" (
"id" SERIAL,
    "contributorAttributeId" INTEGER NOT NULL,
    "contributorAttributeType" "CONTRIBUTOR_ATTRIBUTE_TYPE" NOT NULL,
    "personId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "valuetext" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discovery" (
    "projectId" INTEGER NOT NULL,
"id" SERIAL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "projectId" INTEGER NOT NULL,
"id" SERIAL,
    "requesterId" INTEGER NOT NULL,
    "submitterId" INTEGER NOT NULL,
    "clientId" TEXT,
    "title" TEXT,
    "content" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "projectId" INTEGER NOT NULL,
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "projectId" INTEGER NOT NULL,
"id" SERIAL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubMessage" (
"id" SERIAL,
    "submitterId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "messageId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextSelection" (
"id" SERIAL,
    "offsetstart" DECIMAL(65,30) NOT NULL,
    "length" DECIMAL(65,30) NOT NULL,
    "submessagenumber" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "chunkId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContributorAttributeValue_contributorAttributeId_personId_o_key" ON "ContributorAttributeValue"("contributorAttributeId", "personId", "organizationId");

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY("personId")REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chunk" ADD FOREIGN KEY("discoveryId")REFERENCES "Discovery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chunk" ADD FOREIGN KEY("messageId")REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chunk" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributorAttribute" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributorAttributeValue" ADD FOREIGN KEY("contributorAttributeId", "contributorAttributeType")REFERENCES "ContributorAttribute"("id","type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributorAttributeValue" ADD FOREIGN KEY("organizationId")REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributorAttributeValue" ADD FOREIGN KEY("personId")REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discovery" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY("requesterId")REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY("submitterId")REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD FOREIGN KEY("organizationId")REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubMessage" ADD FOREIGN KEY("messageId")REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubMessage" ADD FOREIGN KEY("submitterId")REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextSelection" ADD FOREIGN KEY("chunkId")REFERENCES "Chunk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
