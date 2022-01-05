CREATE TABLE users (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  fname varchar(255) NOT NULL,
  lname varchar(255) NOT NULL,
  phone varchar(255) NOT NULL,
  active tinyint(1) DEFAULT 0,
  registration_number varchar(255) DEFAULT NULL,
  user_type varchar(255) DEFAULT NULL,
  current_sem_id int(11) NULL,
  CONSTRAINT FK_currentSem FOREIGN KEY (semester_id)
       REFERENCES semester(id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE classes (
  id int(11) NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  class_code varchar(255) NOT NULL,
  semester_id int(11) NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  lecturer_id int(11) NOT NULL,
  venue enum('ONLINE','PHYSICAL') NOT NULL,
  lecture_day varchar(255) NOT NULL,
  CONSTRAINT FK_semester_id FOREIGN KEY (semester_id)
     REFERENCES semester(id),
  CONSTRAINT FK_user_id FOREIGN KEY (lecturer_id)
      REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE attendance (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id int,
    time_in time NOT NULL,
    time_out time NOT NULL,
    date DATE NOT NULL,
    semester_id int NOT NULL,
    class_id int NOT NULL,
    CONSTRAINT FK_semesters_id FOREIGN KEY (semester_id)
    REFERENCES semester(id),
    CONSTRAINT FK_class_id FOREIGN KEY (class_id)
    REFERENCES classes(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE semester (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
   start_date date NOT NULL,
   end_date date NOT NULL,
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE user_classes (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id int NOT NULL,
    class_id int NOT NULL,
    active tinyint(1) DEFAULT 0,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_user_classes_id FOREIGN KEY (user_id)
    REFERENCES users(id),
    CONSTRAINT FK_class_user_id FOREIGN KEY (class_id)
    REFERENCES classes(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
