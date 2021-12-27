const path = require('path');
const express = require('express');
const sql = require('mssql');
const { query } = require('express');

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

//getting data from sql server
const getData = (empid) => {
    sql.connect(dbConfig).then(pool => {
        // Query
        return pool.request().query(`select * from EmpTable1 where EmployeeID=${empid}`)
    }).then(result => {
        console.dir(result)
    }).catch(err => {
      console.log(err)
    });
}

const insertData = (Queryy) => {
    sql.connect(dbConfig).then(pool => {

        const transaction = new sql.Transaction(pool)
        transaction.begin(err => {
            if (err) {         // ... error checks
                console.log("Error in Transaction Begin " + err);
            }
            else {
                const request = new sql.Request(transaction)
                request.query(`INSERT INTO EmpTable1 VALUES (${Queryy})`, (err, result) => {
                    if (err)       // ... error checks
                        console.log(err);
                    else {
                        transaction.commit(err => {
                            if (err)       // ... error checks
                                console.log("Error in Transaction Commit " + err);
                            else
                                //Transaction committed
                                console.log(result);
                        })
                    }
                })
            }
        })
    
    }).catch(err => {
        console.log(err)
    });
}
app.post('/Add',(req,res)=>{
    //console.log(req.body);
    const id= req.body[0]
    sql.connect(dbConfig).then(pool => {
        // Query
        return pool.request().query(`select * from EmpTable1 where EmployeeID = ${id}`)
    }).then(result => {
        //console.log(result)
        if(result.recordset.length === 0){
            let formdata = req.body;
            let query = String(formdata[0]);
            for(let i=1;i<formdata.length;i++){
                query = query.concat(',');
                if(formdata[i]==null)
                    query = query.concat('null');
                else
                    query = query.concat(`'${formdata[i]}'`);
            }
            insertData(query);
            res.status(200).send('Record added successfully');
        }
        else{
            res.status(406).send('EmployeeID Already exists')
        }
    }).catch(err => {
      res.status(400).send('Insertion Failed')
    });
    /*let formdata = req.body;
    let query = String(formdata[0]);
    for(let i=1;i<formdata.length;i++)
    {
        query = query.concat(',');
        if(formdata[i]==null)
            query = query.concat('null');
        else{
            query = query.concat(`'${formdata[i]}'`);
        }
    }
    //let query="1234,'John','Doe','MGRFCT','Assistant HR','A','Level 1','Permanent','2021-12-08','ww','wwww','MIS','MGRFCT->SREFCT','NA','Yes',null,null,'NA',null,null,'Yes',null,null,'NA',null,null,'Yes',null,null,'No',null,'Yes',null,'ITC_ALL_USERS ITD_Wired_Network_Access',null,'Yes',null,'Yes',null,null,'Yes',null,null,null,'Individual',null,null,null,null,'LN on Mobile',null,null,'temporary',null,'werr','wert','rtyuiii',null,'ITD/SREFCT',null"
    insertData(query); */ 
})

app.listen(3003, function () {
    console.log("Server started on port 3003");
});