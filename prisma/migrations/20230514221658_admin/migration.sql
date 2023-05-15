-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL DEFAULT 'hoshiko',
    "email" TEXT NOT NULL,
    "password" TEXT,
    "loginToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
