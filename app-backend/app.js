const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "appdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("my sql connected succesfully");
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.set("view engine", "ejs");

app.listen(3001);

app.post("/create_admin", async (req, res) => {
  console.log(req.body.password);
  let sql = "INSERT INTO ADMIN SET ?";
  let query = await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Registered Admin");
  });
  console.log(req.body);
});

app.post("/create_doctor", async (req, res) => {
  console.log(req.body.password);
  let sql = "INSERT INTO DOCTOR SET ?";
  let query = await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.sendStatus(200);
  });
  console.log(req.body);
});

app.get("/get_appointment_details", async (req, res) => {
  const sql =
    "SELECT ID, PATIENT.firstName as fName, PATIENT.age,PATIENT.bloodGroup,PATIENT.mobile,DOCTOR.firstName, DOCTOR.specialist, date, time, appDate, appTime, treatmentStatus, treatmentPrice FROM APPOINTMENT JOIN PATIENT ON APPOINTMENT.patientID = PATIENT.patientID JOIN DOCTOR ON APPOINTMENT.doctorID = DOCTOR.doctorID ";
  await db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      console.log("Result does not exist");
      res.send(null);
    } else {
      console.log("get app", result);
      res.send(result);
    }
  });
});

app.post("/create_patient", async (req, res) => {
  let sql = "INSERT INTO PATIENT SET ?";
  let query = await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("Hello");
    res.sendStatus(200);
  });
  console.log(req.body);
});
app.post("/create_receptionist", async (req, res) => {
  let sql = "INSERT INTO RECEPTIONIST SET ?";
  let query = await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Registered Receptionist");
  });
  console.log(req.body);
});
app.post("/create_pharmacist", async (req, res) => {
  let sql = "INSERT INTO PHARMACIST SET ?";
  let query = await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Registered Pharmacist");
  });
  console.log(req.body);
});
app.post("/get_patient", async (req, res) => {
  console.log("Hi buddy");
  const { patientID } = req.body;
  console.log(patientID);
  let sql = "SELECT firstName, age, bloodGroup FROM PATIENT WHERE patientID=?";
  await db.query(sql, patientID, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length == 0) {
      console.log("Result Does not exist");
      res.sendStatus(404);
    } else {
      console.log(result[0].firstName);
      res.send(result);
    }
  });
});

app.post("/get_appointment", async (req, res) => {
  let sql =
    "SELECT firstName,lastName,bloodGroup,age,appDate,appTime,description,treatmentStatus, treatmentPrice, APPOINTMENT.patientID FROM APPOINTMENT JOIN PATIENT ON APPOINTMENT.patientID = PATIENT.patientID WHERE APPOINTMENT.ID=?";
  const { ID } = req.body;
  await db.query(sql, ID, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      console.log("Result does not exist");
      res.send(null);
    } else {
      console.log("get app", result);
      res.send(result);
    }
  });
});

app.post("/update_appointment", async (req, res) => {
  const { ID, treatmentStatus, treatmentPrice } = req.body;
  let sql = `UPDATE APPOINTMENT SET treatmentStatus=${treatmentStatus}, treatmentPrice=${treatmentPrice} WHERE ID=${ID};`;
  await db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      console.log("Result Does not exist");
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
});

app.post("/get_appointments_today", async (req, res) => {
  let sql =
    "SELECT ID,firstName,appDate,appTime, treatmentStatus FROM APPOINTMENT JOIN PATIENT ON APPOINTMENT.patientID = PATIENT.patientID WHERE APPOINTMENT.doctorID=? ";
  const { doctorID } = req.body;
  await db.query(sql, doctorID, (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      console.log("Result Does not exist");
      res.send(null);
    } else {
      console.log("get app", result);
      res.send(result);
    }
  });
});
app.post("/get_doctor", async (req, res) => {
  // console.log('body includes ',req.body);
  const { username } = req.body;
  // console.log("name is ",req.body.username);
  const sql = "SELECT doctorID FROM DOCTOR WHERE userName=?";
  await db.query(sql, username, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length == 0) {
      console.log("Result Does not exist");
      res.send(null);
    } else {
      console.log("here is ", result);
      res.send(result[0]);
    }
  });
});
app.get("/get_doctors", async (req, res) => {
  let sql = "SELECT doctorID, firstName, lastName, specialist FROM DOCTOR ";
  await db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length == 0) {
      console.log("Result Does not exist");
      res.sendStatus(404);
    } else {
      console.log("Hello");
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/admin_login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);
  console.log(password);
  let sql = "SELECT * FROM ADMIN WHERE userName=?";
  await db.query(sql, userName, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length == 0) {
      console.log("Result Does not exist");
      res.statusCode = 404;
      res.sendStatus(res.statusCode);
    } else {
      if (password === result[0].password) {
        console.log("Logged in ");
        res.statusCode = 200;
        res.sendStatus(res.statusCode);
      } else {
        console.log("Incorect Password");
        res.statusCode = 404;
        res.sendStatus(res.statusCode);
      }
    }
  });
});

app.post("/receptionist_login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);
  console.log(password);
  let sql = "SELECT * FROM RECEPTIONIST WHERE userName=?";
  await db.query(sql, userName, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length == 0) {
      console.log("Result Does not exist");
      res.statusCode = 404;
      res.sendStatus(res.statusCode);
    } else {
      if (password === result[0].password) {
        console.log("Logged in ");
        res.statusCode = 200;
        res.sendStatus(res.statusCode);
      } else {
        console.log("Incorect Password");
        res.statusCode = 404;
        res.sendStatus(res.statusCode);
      }
    }
  });
});

app.post("/doctor_login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);
  console.log(password);
  let sql = "SELECT * FROM DOCTOR WHERE userName=?";
  await db.query(sql, userName, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length == 0) {
      console.log("Result Does not exist");
      res.statusCode = 404;
      res.sendStatus(res.statusCode);
    } else {
      if (password === result[0].password) {
        console.log("Logged in ");
        res.sendStatus(200);
      } else {
        console.log("Incorect Password");
        res.sendStatus(404);
      }
    }
  });
});

app.post("/pharmacist_login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);
  console.log(password);
  let sql = "SELECT * FROM PHARMACIST WHERE userName=?";
  await db.query(sql, userName, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length == 0) {
      console.log("Result Does not exist");
      res.statusCode = 404;
      res.sendStatus(res.statusCode);
    } else {
      if (password === result[0].password) {
        console.log("Logged in ");
        res.statusCode = 200;
        res.sendStatus(res.statusCode);
      } else {
        console.log("Incorect Password");
        res.statusCode = 404;
        res.sendStatus(res.statusCode);
      }
    }
  });
});
app.post("/create_appointment", async (req, res) => {
  let sql = "INSERT INTO APPOINTMENT SET ?";
  let query = await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("appointment is created");
    res.sendStatus(200);
  });
  console.log(req.body);
});

app.post("/add_distributor", async (req, res) => {
  const sql = "INSERT INTO MEDICINE_DISTRIBUTOR SET ?";
  await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.sendStatus(200);
  });
});
app.post("/add_company", async (req, res) => {
  const sql = "INSERT INTO MEDICINE_COMPANY SET ?";
  await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.sendStatus(200);
  });
});
app.post("/add_medicine", async (req, res) => {
  const sql = "INSERT INTO MEDICINE SET ?";
  await db.query(sql, req.body, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.sendStatus(200);
  });
});
app.get("/get_distributor", async (req, res) => {
  const sql = "SELECT distributorID, name FROM MEDICINE_DISTRIBUTOR";
  await db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length == 0) {
      console.log("Result Does not exist");
      res.sendStatus(404);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
app.get("/get_company", async (req, res) => {
  const sql = "SELECT companyID, name FROM MEDICINE_COMPANY";
  await db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length == 0) {
      console.log("Result Does not exist");
      res.sendStatus(404);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
app.get("/get_medicines", async (req, res) => {
  const sql = "SELECT med_ID, name FROM MEDICINE";
  await db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length == 0) {
      console.log("Result Does not exist");
      res.send(null);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
app.post("/assign_medicine", async (req, res) => {
  const { ID, med_ID } = req.body;
  med_ID.map((med_ID) => {
    let exist = `SELECT * FROM APPOINTMENT_MEDICINE WHERE ID=${ID} AND med_ID=${med_ID} `;
    db.query(exist, (err, result) => {
      if (result.length == 0) {
        let sql = "INSERT INTO APPOINTMENT_MEDICINE SET ? ";
         db.query(sql, { ID, med_ID }, (err, result) => {
          if (err) throw err;
          console.log(result);
        });
      }
    });
  });
  res.sendStatus(200);
});
app.post('/get_assigned_medicines',async (req,res)=>{
  const {ID} = req.body;
  let sql = `SELECT * FROM APPOINTMENT_MEDICINE JOIN MEDICINE ON APPOINTMENT_MEDICINE.MED_ID = MEDICINE.MED_ID AND APPOINTMENT_MEDICINE.ID=${ID}`;
  await db.query(sql, async(err,result)=>{
    if (result.length==0){
      res.send(null);
    }else {
      res.send(result);
    }
  })

})