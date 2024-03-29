const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "word",
  port: "3306",
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/students/list", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("유저 리스트 조회 중 에러");
      console.log(err);
      throw err;
    }

    connection.query("SELECT * from students", (error, rows, fields) => {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log("유저 리스트 조회 성공");
      console.log("User info is : ", rows);
      res.send(rows);
    });

    connection.release();
  });
});

app.delete("/student/delete", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("유저 삭제 중 에러");
      throw err;
    }

    const { id } = req.query;

    if (!id) {
      console.log("삭제에 필요한 id가 존재하지 않습니다.");
    }

    connection.query(
      `DELETE from students WHERE id=${id}`,
      (error, rows, fields) => {
        if (error) throw error;
        console.log("유저 삭제 성공");
        console.log(`${id}번 유저 삭제 성공`);
      }
    );
  });
});

app.post("/student/register", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("유저 등록 중 에러");
      throw err;
    }

    const { name, age } = req.body;

    if ((!name, !age)) {
      console.log("등록에 필요한 정보가 부족합니다.");
    }

    connection.query(
      `INSERT INTO students(name, age) VALUES("${name}", ${age})`,
      (error, rows, fields) => {
        if (error) throw error;
        console.log("유저 등록 성공");
        console.log(`name=${name}, age=${age} 인 유저 등록 성공`);
      }
    );
  });
});

app.patch(`/student/edit`, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("유저 수정 중 에러");
      throw err;
    }

    const { id, name, age } = req.body;

    if ((!id || !name, !age)) {
      console.log("수정에 필요한 정보가 부족합니다.");
    }

    connection.query(
      `UPDATE students SET name="${name}", age=${age} WHERE id=${id}`,
      (error, rows, fields) => {
        if (error) throw error;
        console.log("유저 정보 수정 성공");
      }
    );
  });
});

app.get("/", (req, res) => {
  res.send("hi");
  console.log("/ 경로 들어옴");
});

app.get("/asd", (req, res) => {
  res.send("asd");
});

app.listen("4006", () => {
  console.log("4006listening");
});
