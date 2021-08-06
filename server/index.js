// Primary server for Mongo DB instance.

const express = require("express");
const { ListCollectionsCursor } = require("mongodb");
const MongoAPI = require("./db/MongoDB_Utility");

const db = new MongoAPI(db_name="Nguyen")
const collections = { students: null, admins: null, deliverables: null }

// const collection_cb = (table) => db.run("set_collection", table)
// setTimeout( collection_cb.bind(db, "BUTTHOLE_Collection"), 100)

// const student_collection = db.current_collection_obj.collection( '' )

function callBack( client_res, db_err, db_res){
  console.log("CLIENT: ", client_res)
  if (db_err) {
    client_res.status(404).send(db_err);
  } else {
    client_res.json( db_res );
  }
}

const all_collections = ["students", "admins", "default", "bases"]

function server(){  const app = express();

  app.use(express.static("public"));
  app.use(express.json());


  app.get('api/get/students', (req, res) => {
    // Gets all students in a specified cohort
    // URL must use Query strings
    // e.g /api/get/students?type=students&cohort=7
    const {type:collection_name, cohort} = req.query
    if(all_collections.indexOf(collection_name)>=0 && cohort ){
      const parameters = {
        collection_name,
        qty:100,
        callBack:callBack.bind(this, res)
      }
      db.run("select_document", parameters);
    } else {
      res.status(403).json({response:"Error, invalid query"});
    }
  });

  app.delete( 'api/delete/collection', (req, res) => {
    // Drops entire collection from database
    // e.g /api/delete?type=students
    const {type:collection_name} = req.query
  } )
  app.delete( 'api/delete/account', (req, res) => {
    // Deletes a specified account
    // e.g /api/delete/account?type=students&id=something@gmail.com
    const {type:collection_name, id} = req.query
    if(all_collections.indexOf(collection_name)>=0 && id ){
      // Delete person
    }
  } )


  app.post("/autoseed", (req, res) => {
    const {path} = req.body
    console.log("Auto Seeding: ", path)
    db.run("seed_doc", path)
    res.send("SEEDED")
  });
  app.get("/autoseed", (req, res) => {
    db.run("seed_doc", './MongoDB_Docs/Admins.json', "admins")
    db.run("seed_doc", './MongoDB_Docs/Student.json', "students")
    res.send("SEEDED")
  });

  app.listen(5000, () => {
    console.log("listening on Port 5000");
  });
}

const nun = server();
