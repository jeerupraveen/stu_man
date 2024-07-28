const Retrive=async()=>{
    try{
        const retive=await fetch('/retrivedata',{
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
        const retrive= await fetch('/retDataYear',{
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
        const retrive= await fetch('/retDaAll',{
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
        const data=await fetch('/delete',{
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
        const uda=await fetch('/updateYear',{
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