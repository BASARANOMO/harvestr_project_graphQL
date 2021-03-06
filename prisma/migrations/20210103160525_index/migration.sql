-- CreateIndex
CREATE INDEX "Account.username_index" ON "Account"("username");

-- CreateIndex
CREATE INDEX "Account.username_index" ON "Account"("username");

-- CreateIndex
CREATE INDEX "Discovery.title_index" ON "Discovery"("title");

-- CreateIndex
CREATE INDEX "Discovery.projectId_index" ON "Discovery"("projectId");

-- CreateIndex
CREATE INDEX "Message.title_content_index" ON "Message"("title", "content");

-- CreateIndex
CREATE INDEX "Message.projectId_index" ON "Message"("projectId");

-- CreateIndex
CREATE INDEX "Organization.name_index" ON "Organization"("name");

-- CreateIndex
CREATE INDEX "Organization.projectId_index" ON "Organization"("projectId");

-- CreateIndex
CREATE INDEX "Person.name_email_index" ON "Person"("name", "email");

-- CreateIndex
CREATE INDEX "Person.projectId_index" ON "Person"("projectId");

-- CreateIndex
CREATE INDEX "Project.name_index" ON "Project"("name");
