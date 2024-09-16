CREATE TABLE tbl_Users
(
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

SELECT * from tbl_Users

drop table tbl_Users;

CREATE TABLE tbl_Batches
(
    batchId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    receivedDate DATE,
    totalEggs INT, -- Total eggs received in the batch
    batchStatus VARCHAR(255), -- incubation, hatched, sold
    FOREIGN KEY (userId) REFERENCES tbl_Users(userId)
    ON UPDATE CASCADE
    ON DELETE CASCADE 
);

drop table tbl_batches

select * from tbl_Batches
select * from tbl_batches

CREATE TABLE tbl_Eggs
(
    eggId VARCHAR(255) PRIMARY KEY,
    userId VARCHAR(255),
    batchId VARCHAR(255),
    collectionDate DATE,
    eggsQuantity INT,
    FOREIGN KEY (batchId) REFERENCES tbl_Batches(batchId)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES tbl_Users(userId)
);

drop table tbl_Eggs

CREATE TABLE tbl_Incubation
(
    incubationId VARCHAR(255) PRIMARY KEY,
    batchId VARCHAR(255),
    startDate DATE,
    hatchDate DATE,
    IncubationState VARCHAR(255), -- Options are ongoing (default) or completed.
    FOREIGN KEY (batchId) REFERENCES tbl_Batches(batchId)
    ON UPDATE CASCADE
    ON DELETE CASCADE 
);

drop table tbl_incubation


CREATE TABLE tbl_Hatchrecords
(
    hatchRecordId VARCHAR(255) PRIMARY KEY,
    batchId VARCHAR(255),
    hatchedChicks INT,
    unHatchedEggs INT,
    dateHatched DATE,
    FOREIGN KEY (batchId) REFERENCES tbl_Batches(batchId)
    ON UPDATE CASCADE
    ON DELETE CASCADE 
);

drop table tbl_Hatchrecords;


CREATE TABLE tbl_Chicks
(
    chickId VARCHAR(255) PRIMARY KEY,
    batchId VARCHAR(255),
    hatchRecordId VARCHAR(255),
    chickType VARCHAR(255), -- Broiler or layer
    quantity INT,
    healthStatus VARCHAR(255), -- Healthy or unhealthy
    FOREIGN KEY (batchId) REFERENCES tbl_Batches(batchId)
    ON UPDATE CASCADE
    ON DELETE CASCADE 
);

drop table tbl_Chicks;


CREATE TABLE tbl_Sales
(
    saleId VARCHAR(255) PRIMARY KEY,
    batchId VARCHAR(255),
    chickId VARCHAR(255),
    saleDate DATE,
    quantitySold INT,
    chickPrice DECIMAL(10, 2),
    totalAmount DECIMAL(10, 2),
    FOREIGN KEY (chickId) REFERENCES tbl_Chicks(chickId),
    FOREIGN KEY (batchId) REFERENCES tbl_Batches(batchId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

drop table tbl_sales;

CREATE TABLE tbl_ProductPrices (
    productPriceId VARCHAR(255) PRIMARY KEY, -- Auto-incremented unique identifier
    product_name VARCHAR(255) NOT NULL, -- Product name
    price DECIMAL(10, 2) NOT NULL, -- Price with 2 decimal places
    currency VARCHAR(10) NOT NULL, -- Currency (e.g., USD)
    date_updated DATE NOT NULL -- Date the price was last updated
);

drop TABLE product_Prices;

-- We have farmers and hatchery cooperative society
-- The coop society has staff and admins
-- The admins are the ones that access the data and info

-- Users
-- - Farmers as User
-- - Employees/Staff
-- - Admin


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
