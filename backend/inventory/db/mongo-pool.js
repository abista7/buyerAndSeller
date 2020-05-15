const MongoClient = require('mongodb').MongoClient;

const {
    MONGO_USERNAME,
    MONGO_PASSWORD
  } = process.env;

const url = dbUri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo?authSource=admin&useUnifiedTopology=true&useNewUrlParser=true`;

const option = {
  db:{
    numberOfRetries : 5
  },
  server: {
    auto_reconnect: true,
    poolSize : 40,
    socketOptions: {
        connectTimeoutMS: 500
    }
  },
  replSet: {},
  mongos: {}
};

var p_db;

function MongoPool(){}

function initPool(cb){
  MongoClient.connect(url, option, function(err, db) {
    if (err) throw err;

    p_db = db;
    if(cb && typeof(cb) == 'function')
        cb(p_db);
  });
  return MongoPool;
}

function getInstance(cb){
  if(!p_db){
    initPool(cb)
  }
  else{
    if(cb && typeof(cb) == 'function')
      cb(p_db);
  }
}

MongoPool.initPool = initPool;
MongoPool.getInstance = getInstance;

module.exports = MongoPool;