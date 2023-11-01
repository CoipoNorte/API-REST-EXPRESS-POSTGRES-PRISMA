-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preguntas" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "padreID" INTEGER,
    "respuestaID" INTEGER,

    CONSTRAINT "Preguntas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respuestas" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "preguntaID" INTEGER,

    CONSTRAINT "Respuestas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreguntaHija" (
    "padreID" INTEGER NOT NULL,
    "hijaID" INTEGER NOT NULL,

    CONSTRAINT "PreguntaHija_pkey" PRIMARY KEY ("padreID","hijaID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Preguntas" ADD CONSTRAINT "Preguntas_respuestaID_fkey" FOREIGN KEY ("respuestaID") REFERENCES "Respuestas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreguntaHija" ADD CONSTRAINT "PreguntaHija_padreID_fkey" FOREIGN KEY ("padreID") REFERENCES "Preguntas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreguntaHija" ADD CONSTRAINT "PreguntaHija_hijaID_fkey" FOREIGN KEY ("hijaID") REFERENCES "Preguntas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
