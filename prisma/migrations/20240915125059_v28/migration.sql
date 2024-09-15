-- Step 1: Add the column with a temporary default value
ALTER TABLE "Notifications" ADD COLUMN "applicationId" INTEGER DEFAULT 0;

-- Step 2: Update existing rows with the correct applicationId
-- (ここで適切なapplicationIdを設定するためのクエリを実行します)
-- 例: UPDATE "Notifications" SET "applicationId" = (SELECT id FROM "Applications" LIMIT 1);

-- Step 3: Alter the column to make it NOT NULL and remove the default value
ALTER TABLE "Notifications" ALTER COLUMN "applicationId" SET NOT NULL;

-- Step 4: Add the foreign key constraint
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;