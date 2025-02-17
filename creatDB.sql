use Tasks;

CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL ,
    Password VARCHAR(255) NOT NULL UNIQUE
);


INSERT INTO Users (Username, Password)
VALUES ("26262", "123456799");
select *
from Users;