const path = require('path');
const express = require('express');
const sql = require('mssql');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const dbConfig = {
    user: 'FirstLogin',
    password: 'kewl',
    server: '127.0.0.1', // You can use 'localhost\\instance' to connect to named instance
    database: 'Emp-onboard-auto',
    port: 1433,
    options: {
        trustedConnection: true,
        trustServerCertificate: true
    }
}
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/indexform.htm');
})

const getData = async (tablename, id) => {             //it is advisable for the value returning promise function to be in async-await
    try {
        let pool = await sql.connect(dbConfig);
        let data = await pool.request().query(`SELECT * from ${tablename} where EmpID=${id}`)
        return data.recordset;             //returning values with promises
    }
    catch (err) {
        throw err
    }
}

app.post('/getData', (req, res) => {
    //console.log(req.body);
    const id = req.body.Eid
    getData('Curr_EmpTable', id).then(result => {
        let userdata = result[0];
        console.log(userdata)
        if (userdata === undefined)
            res.json({ status: 204 })
        else
            res.json({ status: 200, data: userdata })
    }).catch(err => {
        res.json({ status: 400 })
        console.log(err)
        //res.send("error : "+err);
    });
})

const executeProcedure = async (qry1, qry2) => {
    console.log('In here');
    try {
        // sql connection
        let pool = await sql.connect(dbConfig);
        const transaction = new sql.Transaction(pool);
        try {
            await transaction.begin();

            const request = new sql.Request(transaction);

            const result1 = await request.query(qry1)
            const result2 = await request.query(qry2)
            //console.log(result1)
            //console.log(result2)
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    } catch (error) {
        throw error;
    }
};
app.post('/postData', (req, res) => {
    //console.log(req.body);
    let { empId, qry1, qry2, firstEntry } = req.body
    let query1 = `INSERT INTO EmpTable VALUES (${qry1})`;
    let query2 = ''
    if (firstEntry)
        query2 = `INSERT INTO Curr_EmpTable VALUES (${qry2})`;
    else
        query2 = `UPDATE Curr_EmpTable SET ${qry2} WHERE EmpID=${empId}`;
    //console.log(queries)
    console.log(query1)
    console.log(query2)
    executeProcedure(query1, query2).then(result => {
        //let test = result;
        //console.log(test)
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(400)
        console.log("error: " + err)
    });;
})

app.get('/submitted',(req,res)=>{
    res.sendFile(__dirname + '/Submitted.htm')
})

app.listen(3003, function () {
    console.log("Server started on port 3003");
});
