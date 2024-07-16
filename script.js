const Insert=async()=>{
    try{
        const insert=await fetch('http://localhost:3000/insertdata',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({
                name:document.getElementById('name').value,
                branch:document.getElementById('branch').value,
                registernumber:document.getElementById('regno').value,
                year:document.getElementById('year').value,
                phonenumber:document.getElementById('phone').value,
                email:document.getElementById('email').value,
                dob:document.getElementById('dob').value
            })
        })
        const data=await insert.json()
        if(data){
            console.log(`data inserted successfully${data}`)
        }
        else{
            console.log("error while inserting data")
        }
    }catch(error){
        console.log(error)
    }
}

const Retrive=async()=>{
    try{
        const retive=await fetch('http://localhost:3000/retrivedata',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({
                email:document.getElementById('email').value,
            })
        })
        const data=await retive.json();
        console.log(data)
    }catch(err){
        console.log(err)
    }
}
const RetDaYear=async()=>{
    try{
        const retrive= await fetch('http://localhost:3000/retDataYear',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({year:document.getElementById('year').value})
        })
        const data=await retrive.json();
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}
const RetDaAll=async()=>{
    try{
        const retrive= await fetch('http://localhost:3000/retDaAll',{
            method:'POST',
            headers:{'content-type':'application/json'}
        })
        const data=await retrive.json();
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}

const Delete = async()=>{
    try{
        const data=await fetch('http://localhost:3000/delete',{
            method:'POST',
            headers:{"content-type":'application/json'},
            body:JSON.stringify({
                email:document.getElementById('email').value
            })
        })
        const del= await data.json();
        console.log(del)
    }catch(err){
        console.log(err)
    }
}
const Update =async()=>{
    try{
        const uda=await fetch('http://localhost:3000/updateYear',{
            method:'POST',
            headers:{'content-type':'applicaton/json'},
            body:JSON.stringify({
                year:document.getElementById('year').value,
                branch:document.getElementById('branch').value,
            })
        })
        const data12=await uda.json();
        console.log(data12)
    }
    catch(err){
        console.log(err)
    }
}