let Getyear = null;

const RetDaAll = async (Getyear) => {
    try {
        const retrive = await fetch('http://localhost:3000/AttDataYear', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                year: Getyear
            })
        });
        const data = await retrive.json();
        const table = document.getElementById('table');
        table.innerHTML = '';
        data.forEach((element, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${element.Name}</td>
                <td>${element.Branch}</td>
                <td>${element.RegisterNumber}</td>
                <td>${element.Year}</td>
                <td>${element.Streak ||0}</td>
                <td><button class='attend'>ATTEND</button></td>
            `;
            table.appendChild(tr);
        });
        const attends = document.querySelectorAll('.attend');
        attends.forEach((attend) => {
            attend.addEventListener('click', () => {
                console.log(attend)
                // Access the relevant cells in the row
                let streakCell = attend.parentNode.previousSibling.previousSibling;
                let streak = parseInt(streakCell.innerText);
                streak = streak + 1;
                streakCell.innerText = streak;
                let yearcell = streakCell.previousSibling.previousSibling;
                let year =yearcell.innerText;
                let registrationCel= yearcell.previousSibling.previousSibling;
                let registration = registrationCel.innerText;
                let branchcell = registrationCel.previousSibling.previousSibling;
                let branch = branchcell.innerText;
                let nameCell =branchcell.previousSibling.previousSibling;
                let name = nameCell.innerText;
                let element = {
                    Name: name,
                    Branch: branch,
                    RegisterNumber: registration,
                    Year: year
                };
                Stuinsert(element.Name, element.Branch, element.RegisterNumber, element.Year, streak);
            });
        });

    } catch (err) {
        console.log(err);
    }
};

const navData = document.querySelectorAll('.year');
navData.forEach((nav) => {
    nav.addEventListener('click', () => {
        RetDaAll(nav.innerText);
    });
});

const Stuinsert = async (name, branch, registernumber, year, streak) => {
    try {
        const insert = await fetch('http://localhost:3000/attendinsert', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                name: name,
                branch: branch,
                registernumber: registernumber,
                year: year,
                streak: streak
            })
        });
        const data = await insert.json();
        console.log(data);
    } catch (e) {
        console.log(e);
    }
};

