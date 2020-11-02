CREATE TABLE "public"."Project" (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    accountsId integer[],
    FOREIGN KEY (EACH ELEMENT OF "accountsId") REFERENCES "public"."Acoount"(id)
);

CREATE TABLE "public"."Account" (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    "hashedPassword" VARCHAR(255) NOT NULL,
    FOREIGN KEY ("personId") REFERENCES "public"."Person"(id) NOT NULL,
    type ENUM('MAIN_ADMIN', 'ADMIN', 'VIEWER')
);

CREATE TYPE "public"."CONTRIBUTOR_ATTRIBUTE_TYPE" AS ENUM (
    'TEXT', 'NUMERIC', 'FINANCIAL', 'DECIMAL', 'RATING', 'BOOLEAN', 'DATE', 'LIST', 'URL'
);

CREATE TABLE "public"."ContributorAttribute" (
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id) NOT NULL;
    id SERIAL PRIMARY KEY NOT NULL,
    /* appliesTo ?? */
    name VARCHAR(255) NOT NULL,
    type CONTRIBUTOR_ATTRIBUTE_TYPE
);

CREATE TABLE "public"."Organisation" (
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id) NOT NULL;
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    /* "attributeValues" */
);

CREATE TABLE "public"."ContributorAttributeValue" (
    id SERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY ("ContributorAttributeId") REFERENCES "public"."ContributorAttribute"(id) NOT NULL,
    FOREIGN KEY ("personId") REFERENCES "public"."Person"(id),
    FOREIGN KEY ("organizationId") REFERENCES "public"."Organisation"(id)
    /* value */
);

CREATE TABLE "public"."Person" (
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id) NOT NULL,
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    FOREIGN KEY ("organizationId") REFERENCES "public"."Organisation"(id),
    attributeValuesId integer[],
    FOREIGN KEY (EACH ELEMENT OF "attributeValuesId") REFERENCES "public"."ContributorAttributeValue"(id)
);

CREATE TABLE "public"."SubMessage" (
    id SERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY ("submitterId") REFERENCES "public"."Person"(id) NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE "public"."Message" (
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id) NOT NULL,
    id SERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY ("requesterId") REFERENCES "public"."Person"(id) NOT NULL,
    FOREIGN KEY ("submitterId") REFERENCES "public"."Person"(id) NOT NULL,
    "clientId" VARCHAR(255),
    title VARCHAR(255),
    content TEXT,
    subMessagesId TEXT[],
    FOREIGN KEY (EACH ELEMENT OF "subMessagesId") REFERENCES "public"."SubMessage"(id)
);

CREATE TABLE "public"."TextSelection" (
    id SERIAL PRIMARY KEY NOT NULL,
    offsetStart DECIMAL NOT NULL,
    length DECIMAL NOT NULL,
    subMessageNumber integer NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY ("chunkId") REFERENCES "public"."Chunk"(id) NOT NULL
);

CREATE TABLE "public"."Chunk" (
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id) NOT NULL,
    id SERIAL PRIMARY KEY NOT NULL,
    FOREIGN KEY ("messageId") REFERENCES "public"."Message"(id) NOT NULL,
    "selectionOffsetId" integer[],
    FOREIGN KEY (EACH ELEMENT OF "selectionOffsetId") REFERENCES "public"."TextSelection"(id),
    FOREIGN KEY ("discoveryId") REFERENCES "public"."Discovery"(id)
);

CREATE TABLE "public"."Discovery" (
    FOREIGN KEY ("projectId") REFERENCES "public"."Project"(id) NOT NULL,
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    "chunksId" integer[],
    FOREIGN KEY ("chunksId") REFERENCES "public"."Chunk"(id)
);