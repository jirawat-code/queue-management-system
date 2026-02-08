/* ============================================================
โปรเจกต์: ระบบบัตรคิว (A0 - Z9) 
============================================================
*/

-- 1 สร้างก้อน Database 
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'QueueManagementDB')
BEGIN
    CREATE DATABASE QueueManagementDB;
END
GO


USE QueueManagementDB;
GO

-- 2 สร้างตารางเก็บข้อมูลคิว
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Queues')
BEGIN
    CREATE TABLE Queues (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Letter CHAR(1) NOT NULL,
        Number INT NOT NULL,
        CreatedAt DATETIME DEFAULT GETDATE()
    );
    INSERT INTO Queues (Letter, Number) VALUES ('A', 0);
END
GO

-- 3 sp_GetNextQueue
CREATE OR ALTER PROCEDURE [dbo].[sp_GetNextQueue]
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @CurrentLetter CHAR(1), @CurrentNumber INT;
    DECLARE @NextLetter CHAR(1), @NextNumber INT;

    BEGIN TRANSACTION;
    BEGIN TRY

        SELECT TOP 1 @CurrentLetter = Letter, @CurrentNumber = Number 
        FROM Queues WITH (UPDLOCK, HOLDLOCK)
        ORDER BY Id DESC;

        IF @CurrentLetter IS NULL
        BEGIN
            SET @NextLetter = 'A';
            SET @NextNumber = 0;
        END
        ELSE
        BEGIN
            IF @CurrentNumber < 9
            BEGIN
                SET @NextNumber = @CurrentNumber + 1;
                SET @NextLetter = @CurrentLetter;
            END
            ELSE
            BEGIN
                SET @NextNumber = 0;
                SET @NextLetter = CHAR(ASCII(@CurrentLetter) + 1);
                IF @NextLetter > 'Z' SET @NextLetter = 'A';
            END
        END

        INSERT INTO Queues (Letter, Number) VALUES (@NextLetter, @NextNumber);
        
        COMMIT TRANSACTION;

        SELECT @NextLetter AS Letter, 
               @NextNumber AS Number, 
               (@NextLetter + CAST(@NextNumber AS VARCHAR)) AS FullQueue,
               GETDATE() AS CreatedAt;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO
-- 4 SP สำหรับ GetCurrent คิว
CREATE OR ALTER PROCEDURE [dbo].[sp_GetCurrentQueue]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 1 
        Letter, 
        Number, 
        (Letter + CAST(Number AS VARCHAR)) AS FullQueue,
        CreatedAt
    FROM Queues
    ORDER BY Id DESC;
END;
GO
-- 5 SP สำหรับ Reset คิว
CREATE OR ALTER PROCEDURE [dbo].[sp_ResetQueue]
AS
BEGIN
    SET NOCOUNT ON;
    TRUNCATE TABLE Queues; 
END
GO