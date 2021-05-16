require('dotenv').config();
module.exports ={
    MONGOURL:`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sfbl4.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`,
    jwt_secret : "dada5koise4tu3pubputai2ghor1tol"
}