// Primary server for Mongo DB instance.

const express = require("express");
const { ListCollectionsCursor } = require("mongodb");
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('854591671315-j148rl3knd8t3j4tig9p3qhdpht4da91.apps.googleusercontent.com')

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

  app.use(express.static("public"));
  app.use(express.json());

  app.use("*", (req, res, next)=>{
    console.log("Middleware detected new path: ", req.path)
    this._Parameters = { ...this._Parameters, ...req.parameters, ...req.query }
    this._Parameters.callBack = callBack.bind(this, res)
    next()
  })

  app.get('/api/get/students/:cohort_id', (req, res) => {
    // Gets all students in a specified cohort
    // URL must use Query strings
    // e.g /api/get/students?type=students&cohort=7
    console.log("Params: ", req.params)
    console.log("Query: ", req.query)
    // this._Parameters = {...this._Parameters, cohort_id:+req.params.cohort_id}
    this._Parameters.json_query.cohort_id = +req.params.cohort_id
    console.log("Global Parameters: ", this._Parameters)
    if( req.params.cohort_id ){
      db.run("select_document", {...this._Parameters });
    }
    else {
      res.status(403).json({response:"Error, invalid query"});
    }
  });

  app.get('api/get/students/OLD', (req, res) => {
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
    db.run("seed_doc", path, "Nguyen")
    res.send("SEEDED")
  });
  app.get("/autoseed", (req, res) => {
    db.run("seed_doc", './server/db/MongoDB_Docs/Admins.json', "admins")
    db.run("seed_doc", './server/db/MongoDB_Docs/Students.json', "students")
    res.send("SEEDED")
  });

  app.get('/api/debug', (req, res) => {
    console.log("Debugging...")
    res.send(  db.initialized )
  })

  app.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '854591671315-j148rl3knd8t3j4tig9p3qhdpht4da91.apps.googleusercontent.com'
    });
    const { name, email, picture } = ticket.getPayload();
    const user = {}

    res.status(201)
    res.json(user)
})

  app.listen(5000, () => {
    console.log("listening on Port 5000");
  });
}

const nun = server();
