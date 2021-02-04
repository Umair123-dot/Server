-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student.email_unique" ON "Student"("email");
