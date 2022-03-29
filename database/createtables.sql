CREATE TABLE Player(
    Username varchar(30) PRIMARY KEY,
    Password_hash varchar(30),
    Image_ID integer,
    Mooncoins integer,
    Stars integer
);

CREATE TABLE Friendship(
    Username varchar(30),
    Friendname varchar(30),
    PRIMARY KEY (Username, Friendname),
    FOREIGN KEY (Username) REFERENCES Player(Username),
    FOREIGN KEY (Friendname) REFERENCES Player(Username)
);


CREATE TABLE Story(
    Story_ID integer PRIMARY KEY
);

CREATE TABLE Participant(
    Username varchar(30),
    Story_ID integer,
    PRIMARY KEY (Username, Story_ID),
    FOREIGN KEY (Username) REFERENCES Player(Username),
    FOREIGN KEY (Story_ID) REFERENCES Story(Story_ID)
);

CREATE TABLE Tale_mode(
    Story_ID integer PRIMARY KEY,
    Max_turns integer,
    Max_paragraph_chars integer,
    Max_write_time real,
    Privacy boolean,                -- 1=private, 0=public
    Finished boolean,               -- 1=finished, 0=no finished
    Scored real,
    Title varchar(50),
    FOREIGN KEY (Story_ID) REFERENCES Story(Story_ID)
) INHERITS (Story);

CREATE TABLE Quick_match(
    Story_ID integer PRIMARY KEY,
    FOREIGN KEY (Story_ID) REFERENCES Story(Story_ID)
) INHERITS (Story);

CREATE TABLE Paragraph(
    Text varchar(250),
    Score real,
    Turn_number integer,
    Username varchar(30),
    Story_ID integer,
    PRIMARY KEY (Turn_number, Username, Story_ID),
    FOREIGN KEY (Username) REFERENCES Player(Username),
    FOREIGN KEY (Story_ID) REFERENCES Story(Story_ID)
);
