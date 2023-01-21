const Client = require('pg').Client

const dbConfig = {
	connectionString: 'postgresql://localhost:5432/pernfighter',
    // connectionString: 'postgres://hftywsabxjwdyl:e5369ccead4c24892e936543a1734c7931001fc46a164624e6fe39c3ff722dc1@ec2-52-21-136-176.compute-1.amazonaws.com:5432/d7d2co99pp7jmn',
}

if(process.env.DATABASE_URL){
	dbConfig.ssl = { rejectUnauthorized: false }
	dbConfig.connectionString = process.env.DATABASE_URL

}

const client = new Client(dbConfig)


module.exports = client;