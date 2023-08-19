-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING(255) NOT NULL,
    "email" STRING(255) NOT NULL,
    "image" STRING(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
