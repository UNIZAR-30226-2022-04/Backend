CREATE TABLE Player(
    Username varchar(40) PRIMARY KEY,
    Password_hash varchar(30),
    Email varchar(40) unique,
    Image_ID integer unique,
    Mooncoins integer,
    Stars integer
);

CREATE TABLE Petition(
    Username varchar(30),
    Petition_name varchar(30),
    PRIMARY KEY (Username, Petition_name),
    FOREIGN KEY (Username) REFERENCES Player(Username),
    FOREIGN KEY (Petition_name) REFERENCES Player(Username)
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
    Voted varchar(30) unique,
    Creator boolean,
    PRIMARY KEY (Username, Story_ID),
    FOREIGN KEY (Username) REFERENCES Player(Username),
    FOREIGN KEY (Story_ID) REFERENCES Story(Story_ID)
);

CREATE TABLE Tale_mode(
    Story_ID integer PRIMARY KEY,
    Max_turns integer unique,
    Max_paragraph_chars integer unique,
    Max_write_time real unique,
    Privacy boolean,                -- 1=private, 0=public
    Finished boolean,               -- 1=finished, 0=not finished
    Scored boolean,                 -- 1=scored, 0=not scored
    Title varchar(50),
    FOREIGN KEY (Story_ID) REFERENCES Story(Story_ID)
) INHERITS (Story);

CREATE TABLE Quick_match(
    Story_ID integer PRIMARY KEY,
    Mode integer,                   --0=normal, 1=tendencias Twitter, 2=palabras obligatorias
    FOREIGN KEY (Story_ID) REFERENCES Story(Story_ID)
) INHERITS (Story);

CREATE TABLE Paragraph(
    Text varchar(250),
    Score real unique,
    Turn_number integer,
    Username varchar(30),
    Story_ID integer,
    PRIMARY KEY (Turn_number, Username, Story_ID),
    FOREIGN KEY (Username) REFERENCES Player(Username),
    FOREIGN KEY (Story_ID) REFERENCES Story(Story_ID)
);
