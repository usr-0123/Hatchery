-- We have farmers and hatchery cooperative society
-- The coop society has staff and admins
-- The admins are the ones that access the data and info

-- Users
-- - Farmers as User
-- - Employees/Staff
-- - Admin

CREATE TABLE tbl_Users (
    userId VARCHAR(255) PRIMARY KEY,
    userRole VARCHAR(10) DEFAULT 'User',
    firstName VARCHAR(255),
    lastName VarChar(255),
    surName VarChar(255),
    userName VarChar(255),
    userEmail VarChar(255),
    userPassword VarChar(255),
    userPhoneNumber VarChar(255),
    userStreet VarChar(255),
    userLocation VARCHAR(255),
    membershipDate Date
);

select * from tbl_Users;

INSERT INTO tbl_Users
VALUES (@userId,@userRole,@firstName,@lastName,@surName,@userName,@userEmail,@userPassword,@userPhoneNumber,@userStreet,@userLocation,@membershipDate)

-- Report
-- - Inputs checking the eggs bought vs the hatched. Losses refers to spoilt eggs
-- - Losses also comes from unhatched eggs
-- - Returns from the sales (finances)
-- - Profits from the inputs vs outputs (Finances)

-- Produce
-- - Eggs that have hatched well
-- - Number of chicks hatched

-- Input
-- - Checks all the requirements for hatching
-- - Electricity for the hatching tools
-- - Includes the transportation of the products be it eggs and chicks
-- - also deduct the staff salaries

-- Finances
-- - Buying eggs 
-- - Selling hatched chicks
-- - Paying salaries
-- - Paying production bills 