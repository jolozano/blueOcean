//need to delete once creating  component
const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());

app.listen(5000, () => {
  console.log("listening on Port 5000");
});

// // Primary server for Mongo DB instance.

// const express = require("express");
// const { ListCollectionsCursor } = require("mongodb");
// const MongoAPI = require("./db/MongoDB_Utility");

// const db = new MongoAPI(db_name="Nguyen")

// const collection_cb = (table) => db.run("set_collection", table)
// setTimeout( collection_cb.bind(db, "BUTTHOLE_Collection"), 100)

// // const student_collection = db.current_collection_obj.collection( '' )

// function callBack( client_res, db_err, db_res){
//   console.log("CLIENT: ", client_res)
//   if (db_err) {
//     client_res.status(404).send(db_err);
//   } else {
//     client_res.json( db_res );
//   }
// }


// function server(){  const app = express();

//   app.use(express.static("public"));
//   app.use(express.json());

//   app.get("/api/all", (req, res) => {
//     db.run("select_document", { callBack:callBack.bind(this, res), qty:1000 })
//   });

//   app.get('api/students', (req, res) => {

//     db.run("select_document", { callBack:callBack.bind(this, res), qty:1000 })
//   });

//   app.post("/autoseed", (req, res) => {
//     const {path} = req.body
//     console.log("Auto Seeding: ", path)
//     // db.run("seed_doc", './MongoDB_Docs/Admins.json')
//     // db.run("seed_doc", './MongoDB_Docs/Student.json')
//     db.run("seed_doc", path)
//     res.send("SEEDED")
//   });
//   app.get("/autoseed", (req, res) => {
//     db.run("seed_doc", './MongoDB_Docs/Admins.json')
//     db.run("seed_doc", './MongoDB_Docs/Student.json')
//     res.send("SEEDED")
//   });

//   app.listen(5000, () => {
//     console.log("listening on Port 5000");
//   });
// }

// const nun = server();
