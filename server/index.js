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
  if (db_err) {
    client_res.status(404).send(db_err);
  } else {
    client_res.json( db_res );
  }
}

const all_collections = ["students", "admins", "default", "bases"]

function server(){  const app = express();
  this._Parameters = {
    collection_name:'students',
    json_query:{ cohort_id: 1 },
    projection:{pii:1, tasks:1},
    // projection:{_id:1},
    qty:10,
    callBack:(...para)=>console.log("Default callback: ", para)
  }
  this._Default = { ...this._Parameters }

  app.use(express.static("public"));
  app.use(express.json());

  app.use("*", (req, res, next)=>{
    console.log("Middleware detected new path: ", req.originalUrl)
    this._Parameters = { ...this._Default, ...req.params, ...req.query, ...req.body }
    this._Parameters.callBack = callBack.bind(this, res)
    console.log("[GLOBAL] Global Parameters: ", this._Parameters)
    next()
  })

  app.get('/api/get/students/:cohort_id', (req, res) => {
    // Gets all students in a specified cohort
    // e.g /api/get/students/7
    // this._Parameters = {...this._Parameters, cohort_id:+req.params.cohort_id}
    this._Parameters.json_query.cohort_id = +req.params.cohort_id
    console.log("[STUDENT] Global Parameters: ", this._Parameters)
    if( req.params.cohort_id ){
      db.run("select_document", {...this._Parameters });
    }
    else {
      res.status(403).json({response:"Error, invalid query"});
    }
  });
  app.get('/api/get/admin', (req, res) => {
    // URL must use Query strings
    // e.g /api/get/person?collection_name=students&cohort=7
    // this._Parameters = {...this._Parameters, cohort_id:+req.params.cohort_id}
    const params = { ...this._Parameters, collection_name: 'admins', projection: {credentials:0}, json_query: {"_id" : this._Parameters.id} }
    console.log("[ADMIN] Global Parameters: ", params)
    if( params.json_query._id ){
      db.run("select_document", { ...params });
    }
    else {
      res.status(403).json({response:"Error, invalid query"});
    }
  });

  app.get('/api/get/students/OLD', (req, res) => {
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

  app.post('/api/update', (req, res) => {
    // Gets all students in a specified cohort
    // URL must use Query strings
    // e.g /api/get/students?type=students&cohort=7
    const params = { "collection_name": "admins",  }
    console.log("[UPDATE] Global Parameters: ", this._Parameters)
    if(all_collections.indexOf(this._Parameters.collection_name)>=0 && this._Parameters.new_values){
      db.run("update_document", this._Parameters);
    } else {
      res.status(403).json({response:"Error, invalid query"});
    }
  });


  app.delete( '/api/delete/collection', (req, res) => {
    // Drops entire collection from database
    // e.g /api/delete?type=students
    const {type:collection_name} = req.query
  } )
  app.delete( '/api/delete/account', (req, res) => {
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
    db.run("seed_doc", path, "Nguyen")
    res.send("SEEDED")
  });
  app.get("/autoseed", (req, res) => {
    db.run("drop_collection",  {collection_name: "admins" })
    db.run("drop_collection",  {collection_name: "students" })
    db.run("seed_doc", './server/db/MongoDB_Docs/Admins.json', "admins")
    db.run("seed_doc", './server/db/MongoDB_Docs/Students.json', "students")
    res.send("SEEDED")
  });

  app.get('/api/debug', (req, res) => {
    console.log("Debugging...")
    res.send(  this._Parameters )
  })
  app.post('/api/debug', (req, res) => {
    console.log("Debugging...")
    res.send(  this._Parameters )
  })

  app.listen(5000, () => {
    console.log("listening on Port 5000");
  });
}

const nun = server();
