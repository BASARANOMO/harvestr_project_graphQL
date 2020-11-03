CREATE TABLE "public"."Project" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Organization" (
    "projectId" integer NOT NULL,
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id),
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Person" (
    "projectId" integer NOT NULL,
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id),
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    "organizationId" integer NOT NULL,
    FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"(id)
);

CREATE TYPE "public"."ACCOUNT_TYPE" AS ENUM (
    'MAIN_ADMIN', 'ADMIN', 'VIEWER'
);

CREATE TABLE "public"."Account" (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    "hashedPassword" VARCHAR(255) NOT NULL,
    "personId" integer NOT NULL,
    FOREIGN KEY ("personId") REFERENCES "public"."Person"(id),
    "projectId" integer NOT NULL,
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id),
    type "public"."ACCOUNT_TYPE"
);

CREATE TYPE "public"."CONTRIBUTOR_ATTRIBUTE_TYPE" AS ENUM (
    'TEXT', 'NUMERIC', 'FINANCIAL', 'DECIMAL', 'RATING', 'BOOLEAN', 'DATE', 'LIST', 'URL'
);

CREATE TYPE "public"."ENTITY_TYPE" AS ENUM (
    'Person', 'Organization'
);

CREATE TABLE "public"."ContributorAttribute" (
    "projectId" integer NOT NULL,
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id),
    id SERIAL NOT NULL,
    appliesTo "public"."ENTITY_TYPE",
    name VARCHAR(255) NOT NULL,
    type "public"."CONTRIBUTOR_ATTRIBUTE_TYPE",
    PRIMARY KEY (id, type)
);


CREATE TABLE "public"."ContributorAttributeValue" (
    id SERIAL PRIMARY KEY NOT NULL,
    "ContributorAttributeId" integer NOT NULL,
    "ContributorAttributeType" "public"."CONTRIBUTOR_ATTRIBUTE_TYPE" NOT NULL,
    FOREIGN KEY ("ContributorAttributeId", "ContributorAttributeType") REFERENCES "public"."ContributorAttribute"(id, type),
    "personId" integer NOT NULL,
    FOREIGN KEY ("personId") REFERENCES "public"."Person"(id),
    "organizationId" integer NOT NULL,
    FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"(id),
    CONSTRAINT person_organization_not_null CHECK (
        NOT (
            ("personId" is NULL AND "organizationId" is NULL)
            AND
            ("personId" is NOT NULL AND "organizationId" is NOT NULL)
        )
    ),
    UNIQUE ("ContributorAttributeId", "personId", "organizationId"),
    valueText TEXT  /* depends on ContributorAttributeType */
);

CREATE TABLE "public"."Message" (
    "projectId" integer NOT NULL,
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id),
    id SERIAL PRIMARY KEY NOT NULL,
    "requesterId" integer NOT NULL,
    FOREIGN KEY ("requesterId") REFERENCES "public"."Person"(id),
    "submitterId" integer NOT NULL,
    FOREIGN KEY ("submitterId") REFERENCES "public"."Person"(id),
    "clientId" VARCHAR(255),
    title VARCHAR(255),
    content TEXT
);

CREATE TABLE "public"."SubMessage" (
    id SERIAL PRIMARY KEY NOT NULL,
    "submitterId" integer NOT NULL,
    FOREIGN KEY ("submitterId") REFERENCES "public"."Person"(id),
    content TEXT NOT NULL,
    "messageId" integer NOT NULL,
    FOREIGN KEY ("messageId") REFERENCES "public"."Message"(id)
);

CREATE TABLE "public"."Discovery" (
    "projectId" integer NOT NULL,
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id),
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE "public"."Chunk" (
    "projectId" integer NOT NULL,
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id),
    id SERIAL PRIMARY KEY NOT NULL,
    "messageId" integer NOT NULL,
    FOREIGN KEY ("messageId") REFERENCES "public"."Message"(id),
    "discoveryId" integer NOT NULL,
    FOREIGN KEY ("discoveryId") REFERENCES "public"."Discovery"(id)
);

CREATE TABLE "public"."TextSelection" (
    id SERIAL PRIMARY KEY NOT NULL,
    offsetStart NUMERIC NOT NULL,
    length NUMERIC NOT NULL,
    subMessageNumber integer NOT NULL,
    content TEXT NOT NULL,
    "chunkId" integer NOT NULL,
    FOREIGN KEY ("chunkId") REFERENCES "public"."Chunk"(id)
);