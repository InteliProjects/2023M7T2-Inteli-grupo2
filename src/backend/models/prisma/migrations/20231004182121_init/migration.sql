-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "version" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "name" TEXT,
    "position" TEXT,
    "adminStatus" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runs" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modelId" INTEGER NOT NULL,
    "executedById" INTEGER NOT NULL,
    "aircraftId" INTEGER NOT NULL,

    CONSTRAINT "Runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aircrafts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Aircrafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" SERIAL NOT NULL,
    "runId" INTEGER,
    "aircraftSerNum_1" INTEGER,
    "DeltaPressAltitude_1a" DOUBLE PRECISION,
    "DeltaPressAltitude_2a" DOUBLE PRECISION,
    "DeltaBleedOutTemp_1b" DOUBLE PRECISION,
    "DeltaBleedOutTemp_2b" DOUBLE PRECISION,
    "DeltaBleedMonPress_1b" DOUBLE PRECISION,
    "DeltaBleedMonPress_2b" DOUBLE PRECISION,
    "MeanBleedOutTemp_1b" DOUBLE PRECISION,
    "MeanBleedOutTemp_2b" DOUBLE PRECISION,
    "MeanBleedMonPress_1b" DOUBLE PRECISION,
    "MeanBleedMonPress_2b" DOUBLE PRECISION,
    "MeanPressAltitude_1a" DOUBLE PRECISION,
    "MeanPressAltitude_2a" DOUBLE PRECISION,
    "time_since_maintenance" BIGINT,
    "preFail100" INTEGER,
    "preFail70" INTEGER,
    "preFail50" INTEGER,
    "phaseOfFlight_1" INTEGER,
    "Flight" INTEGER,
    "date" TIMESTAMP(3),

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aircrafts_serialNumber_key" ON "Aircrafts"("serialNumber");

-- AddForeignKey
ALTER TABLE "Runs" ADD CONSTRAINT "Runs_executedById_fkey" FOREIGN KEY ("executedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Runs" ADD CONSTRAINT "Runs_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Runs" ADD CONSTRAINT "Runs_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "Aircrafts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Runs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
