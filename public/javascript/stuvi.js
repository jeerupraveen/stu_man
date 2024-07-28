let Getyear=null;
const RetDaAll=async(Getyear)=>{
    try{
        const retrive= await fetch('/retDataYear',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({
                year:Getyear
            })
        })
        const data=await retrive.json();
        const table=document.getElementById('table');
        table.innerHTML=''
        data.forEach(element => {
            const tr=document.createElement('tr')
            tr.innerHTML=`<td>${element.Name}</td>
            <td>${element.Branch}</td>
            <td>${element.RegisterNumber}</td>
            <td>${element.Year}</td>
            <td>${element.Phonenumber}</td>
            <td>${element.Email}</td>
            <td>${element.DOB}</td>`
            table.appendChild(tr)            
        });
    }
    catch(err){
        console.log(err)
    }
}
const navData=document.querySelectorAll('.btn');
navData.forEach((nav)=>{
    nav.addEventListener('click',()=>{
        console.log(nav.innerText);
        RetDaAll(nav.innerText);
    })
})
