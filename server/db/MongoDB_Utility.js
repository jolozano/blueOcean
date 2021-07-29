// https://stackoverflow.com/a/16371856/4447923
/*
sudo rm /var/lib/mongodb/mongod.lock
sudo mongod --dbpath /var/lib/mongodb/ --repair
sudo mongod --dbpath /var/lib/mongodb/ --journal
*/
// const poo = [1,2,3,4]
// for(item of poo){
//     console.log("SFGS")
// }
// const porque = require('why-is-node-running')
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

class Mongo_Instance{
    // Connect to a Mongo database
    // DB (Location of host) > DB > Collection (Table) >
    constructor(db_name="default", db_uri="mongodb://localhost:27017", init=true){
        this.current_db_obj = null;
        this.current_collection_obj = null
        this.db_name = db_name;
        this.initialized = false;
        this.processes = 0;
        if(init){
            MongoClient.connect( db_uri, this.set_db.bind(this) )
        }
    }

    async run( target, ...parameters ){
        // Meta-Programming to create Middleware for Data Validation
        console.log(`Job# ${this.processes} - TESTING MIDDLEWARE: ` + target)
        const variables = ["current_db_obj", "current_collection_obj", "db_name", "initialized"]     // Mappiing properties to IDs
        const requirements = { "insert_document":[1, 3] , "select_document": [1, 3], "count_documents":[1],
        "close":[0], "mk_collection":[0,3], "set_collection":[0,3]}    // {method:[ <variables needed> ]}
        // this.initialized = false
        if(target in requirements){
            const isNull = (var_id) => this[ variables[var_id] ]
            if( !requirements[target].every( isNull.bind(this) ) ) {
                console.log(`[${target}] MongoDB Client not correctly configured.`)
                return false;
            }
        }
        else console.log(`[${target}] Warning: Target has unspecified dependencies`)

        try{
            //console.log(`[${target}] Process incremented`)
            this.processes += 1
            console.log(`[${target}]  Executing`)
            await this[target](...parameters)
        }
        catch (err){
            console.log(`[${target}] ERROR: `,  err)

        }
        finally{
            //console.log(`[${target}] Process decremeneted`)
            this.processes -= 1
        }

    }

    set_db(err, mongo_service){
        // Connect to MongoDB host and set variable
        if (err) throw err
        else{
            // Connect to specific database (db_name) and set db_obj
            this.current_collection_obj = null
            this.current_db_obj = mongo_service.db( this.db_name );
            this.initialized = true
        }
        try {

            test_methods()

        }
        finally{

            /*
            function closeOut(method){
                setTimeout(async function(method ){
                    const status =  await method()
                    console.log("STATUS", status)
                }.bind(this, method), 1000)
            }
            closeOut( this.debug )
            */
        //    const condition = ()=>{this.processes<=0}
        //     this.execute_after( condition.bind(this), this.debug.bind(this, "AAAAASSSSS") )

            this.start_closer()
        }
    }

    set_collection(collection_name){
        this.current_collection_obj = this.current_db_obj.collection( collection_name );
    }

    start_closer(){
        // Method to ensure there are no running proccess on the DB before closing.
        // https://stackoverflow.com/a/35544223/4447923
        console.log("Running closer!")
        setTimeout(
            function(){
                console.log("Running nested closer!")
                if(this.processes <= 0) this.close()
                else this.start_closer()
            }.bind(this),
        1800)
    }

    mk_collection(name){
        // Create a collection (aka a 'table')
        this.current_db_obj.createCollection(name, function(err, res) {
            //console.log("MK RES: ", res)
            return (err) ? false : true ;
        });
    }

    insert_document(arr_obj, collection_name){
        // Inserts an array of objects (documents) into a given collection (table)
        arr_obj = [{ name: "Company Inc", address: "Highway 37" }]
        !Array.isArray( arr_obj ) && ( arr_obj = [arr_obj] );
        //console.log("ARR: ", arr_obj)
        if(this.current_collection_obj && arr_obj.length>0){
            //console.log("FUCK...")
            this.current_collection_obj.insertMany(arr_obj, (err, res) => {
                if(err) throw err
                console.log("Number of documents inserted: ", res.insertedCount);
            } );
        }
        return false // Not really needed, but whatever.
    }

    select_document( {json_query={}, projection={}, qty=10, callBack=this.display}=arguments ){
        // MySQL/Postgres SELECT equates to FIND in MongoDB
        // FIND returns all occurances, findOne returns only 1
        //console.log("QTY: ", qty)
        if(this.current_collection_obj){
            const query = this.current_collection_obj.find( json_query, projection ).limit( qty )
            const parsed = query.toArray( callBack )
        }
    }
    print_all(){
        // console.log("THIS: ", this)
        this.run( "select_document", {}, {}, 15 )
    }
    display(err, res){
        // Default callback for printing a result
        if (err) throw err;
        else console.log("[display] RESULT: ", res)
    }

    count_documents( callBack=this.display ){
        this.current_collection_obj.count().then( (count)=>console.log(count) );
    }

    drop_collection( callBack=this.display ){
        this.current_collection_obj.drop( callBack );
    }
    close(){
        console.log("CLOSING DB", this.processes)
        if(this.processes <= 0){
            this.current_db_obj.close();
            this.current_db_obj = null;
            this.initialized = false;
            this.current_collection_obj = null;
            return true
        }
        else return false
    }

    async debug( {a,b,c,d,e}=arguments ){
        console.log("Parameters (all): ", arguments);
        console.log("Parameters a: ", a);
        console.log("Parameters b: ", b);
        console.log("Parameters c: ", c);
        // console.log("Caller: ", arguments.callee.caller );    // Can not use in strict mode
        await function(){setTimeout( console.trace, 5000)}
    }

    test_methods (){
        this.run ("set_collection", "table1");
        this.run("mk_collection", "table1")
        // this.run("drop_collection")
        this.run( "print_all" )
        // this.run( "print_all" );
        this.run("insert_document", myobj)
        this.run("select_document", json_query={name:"John"}, projection={_id:0})
        // this.run("print_all")
        this.run("debug", {a:1,b:2,c:3,d:4})
        this.run("count_documents")
        //this.run("select_document", json_query={name:"John"}, projection={_id:0})
        setTimeout( this.run.bind(this, "close"), 1200 )
    }

    export_json(raw_json, path="./MongoDB_Seed2.json"){
        const stringified = JSON.stringify(raw_json)
        console.log("STRINGY: ", stringified)
        fs.appendFile( path, stringified, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    }

    *create_blocks(qty=10){
        const block = []
        //for(let i=0; i<qty; i++){
            while( true ){
            let userId = faker.datatype.number( {min: 1, max: 1000} );
            let itemId = faker.datatype.number( {min: 1, max: 1000} );
            block.push({userId, itemId})
            if(block.length>qty){
                yield block
                block.length = 0
            }
        }
    }

    create_seed(qty=100){
        const blockSize = 10;
        const block = this.create_blocks( qty/blockSize )
        for(let i=0; i<(qty/blockSize); i++){
            this.insert_document( block.next( blockSize ).value )
        }
    }

}



// For debugging purpose
var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
];




// const inst = new Mongo_Instance()
async function test_methods (){
    // inst.run("debug", {a:1,b:2,c:3,d:4})
    inst.run ("set_collection", "table1");
    // await inst.run("drop_collection")

    inst.run("mk_collection", "table1")

    inst.run("create_seed", 1000)
    // inst.run( "print_all" )
    // inst.run("insert_document", myobj)
    inst.run("select_document", { //qty:900,
            json_query:{user:"John"},
            projection:{_id:0},
            callBack:(err,res)=>inst.run( "export_json", res )
        }
        )

    inst.run("count_documents")
    // inst.run( "export_json", inst.run( "" ) );
    //inst.run("select_document", json_query={name:"John"}, projection={_id:0})
    // setTimeout( inst.run.bind(inst, "close"), 1200 )
    // console.log("CURSOR 2: ", inst.current_collection_obj.find({}).count )
}

const inst = new Mongo_Instance()
