const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let db;
async function conToDb(cb) {
    const url = "mongodb+srv://Pra123veen:Pra123veen@praveen04.higkkwc.mongodb.net/?retryWrites=true&w=majority&appName=Praveen04";
    const client = new MongoClient(url);
    await client.connect();
    db = client.db('praveen');
    
    await db.collection('student').createIndex({ RegisterNumber: 1 }, { unique: true });
    await db.collection('student').createIndex({ Email: 1 }, { unique: true });
    
    await db.collection('attendence').createIndex({ RegisterNumber:1 }, { unique: true })
    cb();
}

app.get('/', (req, res) => {
    res.json();
});

app.post('/insertdata', async (req, res) => {
    try {
        const result = await db.collection('student').insertOne({
            Name: req.body.name,
            Branch: req.body.branch,
            RegisterNumber: req.body.registernumber,
            Year: req.body.year,
            Phonenumber: req.body.phonenumber,
            Email: req.body.email,
            DOB: req.body.dob
        });
        const data = await db.collection('attendence').insertOne({
            Name: req.body.name,
            Branch: req.body.branch,
            RegisterNumber: req.body.registernumber,
            Year: req.body.year,
            Streak:0
        });
        res.json({
            message:'data inserted in two collections'
        });
    } catch (e) {
        if (e.code === 11000) {
            // Handle duplicate key error
            res.status(400).json({ error: 'Duplicate key error', details: e.keyValue });
        } else {
            console.log(e);
            res.status(500).json({ error: 'An error occurred', details: e });
        }
    }
});

app.post('/retrivedata', async (req, res) => {
    try {
        const details = await db.collection('student').findOne({ Email: req.body.email });
        res.json(details);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred', details: error });
    }
});

app.post("/retDataYear", async (req, res) => {
    try {
        const details = await db.collection('student').find({ Year: req.body.year }).toArray();
        res.json(details);
    } catch (error) {
        console.log("ERROR while retrieving entire data", error);
        res.status(500).json({ error: 'An error occurred', details: error });
    }
});
app.post("/AttDataYear", async (req, res) => {
    try {
        const details = await db.collection('attendence').find({ Year: req.body.year }).toArray();
        res.json(details);
    } catch (error) {
        console.log("ERROR while retrieving entire data", error);
        res.status(500).json({ error: 'An error occurred', details: error });
    }
});
app.post("/retDaAll", async (req, res) => {
    try {
        const details = await db.collection('student').find().toArray();
        res.json(details);
    } catch (error) {
        console.log("ERROR while retrieving entire data", error);
        res.status(500).json({ error: 'An error occurred', details: error });
    }
});
app.post('/updateYear', async(req, res) => {
    try {
        const details = await db.collection('student').updateMany({ Year:req.body.year },{$set:{Branch:req.body.branch}});
        res.json(details);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'An error occurred', details: e });
    }
});
app.post('/delete',async(req,res)=>{
    try{
        const details= await db.collection('student').deleteOne({Email:req.body.email});
        res.json(details)
    }
    catch(err){
        console.log(err)
    }
})
app.post('/attendinsert',async(req,res)=>{
    try{
        const details=await db.collection('attendence').findOne({RegisterNumber: req.body.registernumber});
        if(!details)
            {
            const indata=await db.collection('attendence').insertOne({
            Name: req.body.name,
            Branch: req.body.branch,
            RegisterNumber: req.body.registernumber,
            Year: req.body.year,
            Streak:req.body.streak
        })
        res.json({
            message:'data inserted',
            data:indata
        })
           }
        else{
            const udata=await db.collection('attendence').findOneAndUpdate({RegisterNumber: req.body.registernumber},{$set:{Streak:req.body.streak}})
            res.json(udata)
        }}
    catch(e){
        if(e.code== 11000){
            console.log(e.code)
            console.log("data already exicted")
        }
        else
        {
            console.log(e)
        }
    }
})
conToDb(() => {
    app.listen(3000, () => {
        console.log("Server running successfully");
    });
});