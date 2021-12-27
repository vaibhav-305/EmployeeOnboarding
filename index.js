const toa = document.getElementById('toa');
const vp = document.getElementById('vp');

const elementIdlist = ['Departmentlist', 'Designationlist', 'Grade', 'Level', 'Transferlist', 'Divloclist', 'unitnamelist']
const elements = []
for (let i = 0; i < elementIdlist.length; i++) {
    elements.push(document.getElementById(elementIdlist[i]))
}
const unitnames = ['SREFCT', 'BLRFCT', 'MGRFCT', 'KDPFCT', 'PUNFCT', 'HO', 'ATC', 'HDC', 'RCTI']
const deptnames = ['Commercial', 'Engineering', 'Human Resource', 'MIS', 'Production', 'Security'];
const designations = ["ACM", "Assistant Commercial", "Assistant HR", "Assistant Security Officer", "Branch Engineer", "Branch Manager", "Commercial Manager", "EHS Executive", "EHS Manager", "Finance Executive", "Finance Superintendent", "HR Manager", "IC Electronics", "IC Making", "IC Packing", "IC Projects", "IC QUIS", "IC Utility", "IT Executive", "IT Support", "Logistic Exexutive", "Logistic IC", "Office Associate", "PMD IC", "Production Manager", "Security Officer", "Shift Manager", "SMD IC", "Unit IT Head", "Welfare Officer"];
const grades = ['A', 'A+', 'B', 'B+', 'C', 'C+', 'D', 'D+', 'E', 'F', 'G', 'H', 'TG1', 'TG2', 'TG3', 'TG4'];
const levels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'OA'];
const transfernames = ["BLRFCT->SREFCT", "HO->SREFCT", "KDPFCT->SREFCT", "MGRFCT->SREFCT", "NA", "PUNFCT->SREFCT", "SREFCT->BLRFCT", "SREFCT->HO", "SREFCT->KDPFCT", "SREFCT->MGRFCT", "SREFCT->PUNFCT"];
const DivlocData = ["ITD/BLRFCT", "ITD/HO", "ITD/KDPFCT", "ITD/MGRFCT", "ITD/SREFCT", "TM&D/HO", "TM&D/MKTG/DELDO", "TM&D/MKTG/SRE", "ITD/MGRFCT", "ITD/SREFCT", "TM&D/HO", "TM&D/MKTG/DELDO", "TM&D/MKTG/SRE"];
const data = [deptnames, designations, grades, levels, transfernames, DivlocData, unitnames];
for (let i = 0; i < elements.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        let optn = data[i][j];
        let el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        elements[i].appendChild(el);
    }
}

toa.addEventListener('change', () => {
    if (toa.options[toa.selectedIndex].value == "Permanent") {
        vp.type = 'text';
        vp.value = "default";
        vp.setAttribute('readonly', 'readonly');
    }
    else {
        vp.value = "";
        vp.type = 'date';
        vp.removeAttribute('readonly');
    }
});

const netind = document.getElementById('net-ind');
const netshr = document.getElementById('net-shr');
const emailind = document.getElementById('email-ind');
const emailshr = document.getElementById('email-shr');
const txtshr = document.getElementsByClassName('txt-shr');
const txtind = document.getElementsByClassName('txt-ind');

netind.addEventListener('change', () => {
    //console.log(netind.selectedIndex);
    if (netind.options[netind.selectedIndex].value == "Yes") {
        netshr.selectedIndex = 2;
        netshr.disabled = true;
        emailind.selectedIndex = 0;
        emailind.disabled = false
        emailshr.selectedIndex = 0;
        emailshr.disabled = true;
        for (let i = 0; i < txtind.length; i++) {
            txtind[i].disabled = false;
            txtshr[i].disabled = true;
        }
    }
    else {
        emailind.selectedIndex = 1;
        emailind.disabled = true;
        netshr.disabled = false;
        emailshr.disabled = false;
        for (let i = 0; i < txtind.length; i++) {
            txtind[i].disabled = true
            txtshr[i].disabled = false;
        }
    }
});

const PowerApps1 = document.getElementById('PowerApps1');
const powerappslist = document.getElementsByClassName('powerappdisable')
PowerApps1.addEventListener('change', () => {
    //console.log(netind.selectedIndex);
    if (PowerApps1.options[PowerApps1.selectedIndex].value == "NA") {
        for (let i = 0; i < powerappslist.length; i++)
            powerappslist[i].disabled = true;
    }
    else {
        for (let i = 0; i < powerappslist.length; i++)
            powerappslist[i].disabled = false;
    }
});
const CompanySystemAccess1 = document.getElementById('CompanySystemAccess1');
const CompSysAccesslist = document.getElementsByClassName('CompSysAccessdisable')
CompanySystemAccess1.addEventListener('change', () => {
    if (CompanySystemAccess1.options[CompanySystemAccess1.selectedIndex].value == "NA") {
        for (let i = 0; i < CompSysAccesslist.length; i++)
            CompSysAccesslist[i].disabled = true;
    }
    else {
        for (let i = 0; i < CompSysAccesslist.length; i++)
            CompSysAccesslist[i].disabled = false;
    }
});

function checkEmpty(el) {
    //const el = document.getElementById(id);            //document.getElementById("item1").nextSibling.innerHTML
    if (el.value.trim().length == 0) {
        //el.style.backgroundColor = '#FFD9D9';
        el.nextElementSibling.innerHTML = "This is a required feild"
    }
    else {
        //el.style.backgroundColor = '#D9FFD9';
        el.nextElementSibling.innerHTML = "";
    }
}

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
}
function OnInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}

const empid = document.getElementById('EmpID');
empid.addEventListener('change', () => {
    document.getElementById('empid2').value = empid.value
})
const fname = document.getElementById('firstname');
const lname = document.getElementById('lastname');
fname.addEventListener('change', () => {
    document.getElementById('username2').value = fname.value.concat(' ', lname.value)
})
lname.addEventListener('change', () => {
    document.getElementById('username2').value = fname.value.concat(' ', lname.value)
})
document.getElementById('Submdate').valueAsDate = new Date()
/*
sec 1
action
DOR (date of request)
firstname
EmpID
lastname
newRepMan  (new reporting manager)
unitName
prevRepMan
designation
Grade  //made
Level   //made
department
transfer
validity

net-ind    net-ind2    net-ind3
net-shr    net-shr2    net-shr3
email-ind  email-ind2  email-ind3
email-shr  email-shr2  email-shr3
SMTPinbound  SMTPinbound2  SMTPinbound3
SMTPoutbound               SMTPoutbound2
netaccess                netaccess2
form-check-input(checkboxes)   DefaultADGrouptobeAdded2     
shrd-drive               shrd-drive2
IT-asset1 IT-asset2           IT-asset3
VPN1     VPN2     VPN3      VPN4
PowerApps1    PowerApps2    PowerApps3     PowerApps4    PowerApps5
CompanySystemAccess1      CompanySystemAccess2        CompanySystemAccess3       CompanySystemAccess4      CompanySystemAccess5
SuperiorName      UnitHeadName
ApprovalFromDMM_name      ApprovalFromDMM_date
divloc   Submdate
*/
const action = document.getElementById('action');
const idList1 = ['EmpID', 'firstname', 'lastname', 'unitName', 'designation', 'Grade', 'Level', 'toa', 'DOR', 'newRepMan', 'prevRepMan', 'department', 'transfer', 'vp']
const idList2 = ['net-ind', 'net-ind2', 'net-ind3', 'net-shr', 'net-shr2', 'net-shr3', 'email-ind', 'email-ind2', 'email-ind3', 'email-shr', 'email-shr2', 'email-shr3', 'SMTPinbound', 'SMTPinbound2', 'SMTPinbound3', 'SMTPoutbound', 'SMTPoutbound2', 'netaccess', 'netaccess2']
const checkboxclass = 'form-check-input'
const idList3 = ['DefaultADGrouptobeAdded2', 'shrd-drive', 'shrd-drive2', 'IT-asset1', 'IT-asset2', 'IT-asset3', 'VPN1', 'VPN2', 'VPN3', 'VPN4', 'PowerApps1', 'PowerApps2', 'PowerApps3', 'PowerApps4', 'PowerApps5', 'CompanySystemAccess1', 'CompanySystemAccess2', 'CompanySystemAccess3', 'CompanySystemAccess4', 'CompanySystemAccess5', 'SuperiorName', 'UnitHeadName', 'ApprovalFromDMM_name', 'ApprovalFromDMM_date', 'divloc', 'Submdate']


function createModal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementById("close");

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        action.selectedIndex = '0'
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            action.selectedIndex = '0'
        }
    }
}

function clearform() {
    document.getElementById('myform').reset();
}

function changeAction(event) {
    if (action.selectedIndex === 1) {
        createModal()
    }
}

function getInput() {
    let feildval = []
    for (let i = 0; i < idList1.length; i++) {
        feildval.push(document.getElementById(idList1[i]).value)
    }
    let temp;
    for (let i = 0; i < idList2.length; i++) {
        //console.log(idList2[i]);
        temp = document.getElementById(idList2[i]).value;
        if (temp.length === 0)
            feildval.push(null);
        else
            feildval.push(temp);
    }
    const chckboxes = document.getElementsByClassName('form-check-input')
    temp = '';
    for (let i = 0; i < chckboxes.length; i++) {
        if (chckboxes[i].checked) {
            if (temp.length === 0)
                temp = chckboxes[i].value
            else
                temp = temp.concat(' ', chckboxes[i].value)
        }
    }
    if (temp.length === 0)
        feildval.push(null);
    else
        feildval.push(temp);
    for (let i = 0; i < idList3.length; i++) {
        //console.log(idList3[i]);
        temp = document.getElementById(idList3[i]).value;
        if (temp.length === 0)
            feildval.push(null);
        else
            feildval.push(temp);
    }
    return feildval;
}

function fetchData(event) {
    event.preventDefault()
    const id = event.target.value;
    fetch('/fetchData', {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }).then(res => res.json())
        .then(data => {
            console.log(data);
        }).catch(error => console.log(error));
}
const Submit = (event) => {
    event.preventDefault()

    //console.log('In Button');
    let feildval = getInput();
    //console.log(feildval);
    if (action.selectedIndex === 0) {
        fetch('/Add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feildval)
        }).then(res => {
            if (res.status === 200) {
                alert('Form Added successfully');
            }
            else if (res.status === 406)
                alert("EmployeeID already exists");
            else
                alert('Submission failed,some error occured');
        }).catch(error => console.log(error))
    }
    else if (action.selectedIndex == 1) {

    }

}


// https://codepen.io/chriscoyier/pen/XWKEVLy
/*let feildval = []
    for(let i=0;i<idlist.length;i++){
        feildval.push(document.getElementById(idlist[i]).value)
    }
    console.log(feildval);
    if(action.value==='Add'){
        fetch('/postData', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feildval)
        }).then(res => {
            if (res.ok) {
                alert('form successfully submitted');
            }
            else
                console.log("some error occured");
        }).catch(error => console.log(error))
    }*/