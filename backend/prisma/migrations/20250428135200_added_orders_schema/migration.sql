-- CreateEnum
CREATE TYPE "Status" AS ENUM ('cancelled', 'processing', 'finished');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "items" TEXT[],
    "totalPrice" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'processing',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
