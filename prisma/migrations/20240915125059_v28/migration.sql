ALTER TABLE "Notifications" ADD COLUMN "applicationId" INTEGER DEFAULT 0;
ALTER TABLE "Notifications" ALTER COLUMN "applicationId" SET NOT NULL;
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;