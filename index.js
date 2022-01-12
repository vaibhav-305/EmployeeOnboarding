const ids = ["EmpID","action", "Dor","firstname","lastname","unitName","designation","Grade","Level","department","newRepMan","prevRepMan","transfer","divloc","toa","vp","netInd1","netInd2","netShr1","netShr2","netRem","emailInd1","emailInd2","emailShr1","emailShr2","emailRem","SMTPinbound1","SMTPinbound2","SMTPinbound3","SMTPoutbound1","SMTPoutbound2","netAcc1","netAcc2","DefaultADGroup2","DefaultADGroup3","shrDrive1","shrDrive2","ITasset1","ITasset2","ITasset3","VPN1","VPN2","VPN3","PowerApps1","PowerApps2","PowerApps3","PowerApps4","PowerApps5","CompSysAcc1","CompSysAcc2","CompSysAcc3","CompSysAcc4","CompSysAcc5","SuperiorName","SuperiorName_date","UnitHeadName","UnitHeadName_date","ApprovalFromDMM_name","ApprovalFromDMM_date","fullname"]
let elements = {}
for (let i = 0; i < ids.length; i++) {
    elements[ids[i]] = document.getElementById(ids[i]);
}
Object.freeze(elements);

function alphaOnly(event) {
    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8 || key==32);
};

const elementIdlist = ['Departmentlist', 'Designationlist', 'Grade', 'Level', 'Transferlist', 'Divloclist', 'unitnamelist','ITopt']
const elementslist = []
for (let i = 0; i < elementIdlist.length; i++) {
    elementslist.push(document.getElementById(elementIdlist[i]))
}
const unitnames = ['SREFCT', 'BLRFCT', 'MGRFCT', 'KDPFCT', 'PUNFCT', 'HO', 'ATC', 'HDC', 'RCTI']
const deptnames = ['Commercial', 'Engineering', 'Human Resource', 'MIS', 'Production', 'Security'];
const designations = ["ACM", "Assistant Commercial", "Assistant HR", "Assistant Security Officer", "Branch Engineer", "Branch Manager", "Commercial Manager", "EHS Executive", "EHS Manager", "Finance Executive", "Finance Superintendent", "HR Manager", "IC Electronics", "IC Making", "IC Packing", "IC Projects", "IC QUIS", "IC Utility", "IT Executive", "IT Support", "Logistic Exexutive", "Logistic IC", "Office Associate", "PMD IC", "Production Manager", "Security Officer", "Shift Manager", "SMD IC", "Unit IT Head", "Welfare Officer"];
const grades = ['A', 'A+', 'B', 'B+', 'C', 'C+', 'D', 'D+', 'E', 'F', 'G', 'H', 'TG1', 'TG2', 'TG3', 'TG4'];
const levels = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'OA'];
const transfernames = ["BLRFCT->SREFCT", "HO->SREFCT", "KDPFCT->SREFCT", "MGRFCT->SREFCT", "NA", "PUNFCT->SREFCT", "SREFCT->BLRFCT", "SREFCT->HO", "SREFCT->KDPFCT", "SREFCT->MGRFCT", "SREFCT->PUNFCT"];
const DivlocData = ["ITD/BLRFCT", "ITD/HO", "ITD/KDPFCT", "ITD/MGRFCT", "ITD/SREFCT", "TM&D/HO", "TM&D/MKTG/DELDO", "TM&D/MKTG/SRE", "ITD/MGRFCT", "ITD/SREFCT", "TM&D/HO", "TM&D/MKTG/DELDO", "TM&D/MKTG/SRE"];
const ITassets = ['All in One','Desktop','Host Binding','Laptop','NA','Printer','Tablet']
const Listdata = [deptnames, designations, grades, levels, transfernames, DivlocData, unitnames,ITassets];
for (let i = 0; i < elementslist.length; i++) {
    for (let j = 0; j < Listdata[i].length; j++) {
        let optn = Listdata[i][j];
        let el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        elementslist[i].appendChild(el);
    }
}

elements['toa'].addEventListener('change', () => {
    if (elements['toa'].selectedIndex === 0) {
        elements['vp'].type = 'text';
        elements['vp'].value = "default";
        elements['vp'].setAttribute('readonly', 'readonly');
    }
    else {
        elements['vp'].value = "";
        elements['vp'].type = 'date';
        elements['vp'].removeAttribute('readonly');
    }
});

for(let x of ['netInd','netShr','emailInd','emailShr','SMTPoutbound','netAcc','shrDrive']){
    elements[`${x}1`].addEventListener('change',()=>{
        if(elements[`${x}1`].value==='Yes'){
            elements[`${x}2`].disabled=false;
            elements[`${x}1`].disabled=false;
        }
        else{
            elements[`${x}2`].disabled=true;
            elements[`${x}2`].value=''
            if(elements[`${x}1`].value==='NA')
                elements[`${x}1`].disabled=true
            else
                elements[`${x}1`].disabled=false
        }
    })
}
const txtshr = document.getElementsByClassName('txt-shr');
const txtind = document.getElementsByClassName('txt-ind');

const netMailevent = () => {
    //console.log(netind.selectedIndex);
    if (elements['netInd1'].value === 'Yes') {
        /*elements['netShr1'].value = 'NA';
        elements['netShr1'].disabled = true;
        elements['emailInd1'].selectedIndex = 0;
        elements['emailInd1'].disabled = false
        elements['emailShr1'].value = 'NA';
        elements['emailShr1'].disabled = true;
        for (let i = 0; i < txtind.length; i++) {
            txtind[i].disabled = false;
            txtshr[i].value=''
            txtshr[i].disabled = true;
        }*/
        elements['netShr1'].value = 'NA';
        elements['netShr1'].dispatchEvent(new Event('change', { 'bubbles': true }));
        elements['emailInd1'].value = 'Yes';
        elements['emailInd1'].dispatchEvent(new Event('change', { 'bubbles': true }));
        elements['emailInd1'].disabled = false
        elements['emailShr1'].value = 'NA';
        elements['emailShr1'].dispatchEvent(new Event('change', { 'bubbles': true }));
    }
    else if(elements['netInd1'].value==='No'){
        /*elements['emailInd1'].selectedIndex = 1;
        elements['netShr1'].value='Yes';
        elements['emailInd1'].value='No';
        elements['emailInd1'].disabled = true;
        elements['netShr1'].disabled = false;
        elements['emailShr1'].disabled = false;
        elements['emailShr1'].value ='Yes'
        for (let i = 0; i < txtind.length; i++) {
            txtind[i].disabled = true
            txtind[i].value=''
            txtshr[i].disabled = false;
        }*/
        elements['emailInd1'].value = 'NA';
        elements['emailInd1'].dispatchEvent(new Event('change', { 'bubbles': true }));
        elements['netShr1'].value='Yes';
        elements['netShr1'].dispatchEvent(new Event('change', { 'bubbles': true }));
        elements['emailShr1'].value ='Yes'
        elements['emailShr1'].dispatchEvent(new Event('change', { 'bubbles': true }));
    }
}

elements['ITasset1'].addEventListener('change',()=>{
    if(elements['ITasset1'].selectedIndex===1){
        elements['ITasset2'].style.display = "none"
        elements['ITasset2'].value=''
        elements['ITasset3'].disabled=true
        elements['ITasset3'].value=''
    }
    else{
        elements['ITasset2'].style.display = "block"
        elements['ITasset3'].disabled=false
    }
})

const powerappslist = document.getElementsByClassName('powerappdisable')
elements['PowerApps1'].addEventListener('change', () => {
    //console.log(netind.selectedIndex);
    if (elements['PowerApps1'].selectedIndex === 3) {
        for (let i = 0; i < powerappslist.length; i++){
            powerappslist[i].disabled = true;
            powerappslist[1].value=''
        }
    }
    else {
        for (let i = 0; i < powerappslist.length; i++){
            powerappslist[i].disabled = false;
            powerappslist[1].selectedIndex=0
        }
    }
});
elements['SMTPinbound1'].addEventListener('change',()=>{
    if(elements['SMTPinbound1'].value==='Yes'){
        elements['SMTPinbound2'].disabled=false;
        elements['SMTPinbound3'].disabled=false;
        elements['SMTPinbound1'].disabled=false;
    }
    else{
        elements['SMTPinbound2'].value=''
        elements['SMTPinbound3'].value=''
        elements['SMTPinbound2'].disabled=true
        elements['SMTPinbound3'].disabled=true
        if(elements['SMTPinbound1'].value==='NA')
            elements['SMTPinbound1'].disabled=true
        else
            elements['SMTPinbound1'].disabled=false
    }
}) 

const CompSysAccesslist = document.getElementsByClassName('CompSysAccessdisable')
elements['CompSysAcc1'].addEventListener('change', () => {
    if (elements['CompSysAcc1'].selectedIndex === 2) {
        for (let i = 0; i < CompSysAccesslist.length; i++){
            CompSysAccesslist[i].disabled = true;
            CompSysAccesslist[2].value=''
        }
    }
    else {
        for (let i = 0; i < CompSysAccesslist.length; i++){
            CompSysAccesslist[i].disabled = false;
            CompSysAccesslist[2].selectedIndex=0
        }
    }
});

elements['VPN1'].addEventListener('change',()=>{
    if(elements['VPN1'].value==='Yes'){
        elements['VPN2'].disabled=false
        elements['VPN3'].disabled=false
        elements['VPN1'].disabled=false
    }
    else{
        elements['VPN2'].disabled=true
        elements['VPN3'].disabled=true
        elements['VPN2'].value=''
        elements['VPN3'].value=''
        if(elements['VPN1'].value==='NA')
            elements['VPN1'].disabled=true
        else
            elements['VPN1'].disabled=false
    }
})
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
function datecheck(el){
    let currdate = new Date()
    if(el.value!=='default' && new Date(el.value)<currdate){
        alert('Invalid Date !')
        el.valueAsDate=currdate
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

elements['firstname'].addEventListener('change', () => {
    document.getElementById('fullname').value = elements['firstname'].value+' '+elements['lastname'].value
})
elements['lastname'].addEventListener('change', () => {
    document.getElementById('fullname').value = elements['firstname'].value+' '+elements['lastname'].value
})

document.getElementById('Submdate').valueAsDate = new Date()
elements['Dor'].valueAsDate = new Date()

/*
sec 1
action
Dor (date of request)
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

netInd1    netInd2    netRem
netShr1    netShr2    
emailInd1  emailInd2  emailRem
emailShr1  emailShr2  
SMTPinbound1  SMTPinbound2  SMTPinbound3
SMTPoutbound1               SMTPoutbound2
netAcc1                netAcc2
form-check-input(checkboxes class)   DefaultADGroup2  DefaultADGroup3 
shrDrive1               shrDrive2
ITasset1 ITasset2           ITasset3
VPN1              VPN2      VPN3
PowerApps1    PowerApps2    PowerApps3     PowerApps4    PowerApps5
CompSysAcc1      CompSysAcc2        CompSysAcc3       CompSysAcc4      CompSysAcc5
SuperiorName      UnitHeadName
ApprovalFromDMM_name      ApprovalFromDMM_date
fullname
divloc
*/

const chckboxes = document.getElementsByClassName('form-check-input');
const modal = document.getElementById("myModal");
let data = {};
let firsttime = {};

function changeAction(event) {
    if(elements['action'].value==='Transfer'){
        document.getElementById('myForm').reset();
        elements['action'].value='Transfer';
        elements['Dor'].valueAsDate = new Date()
        for(let x of ['EmpID','firstname','lastname','netInd1','netShr1','emailInd1','emailShr1','SMTPinbound1','SMTPoutbound1','netAcc1','VPN1'])
            elements[x].dispatchEvent(new Event('change', { 'bubbles': true }));
        elements['transfer'].disabled=false
        elements['prevRepMan'].disabled=false
        elements['transfer'].value=''
        elements['prevRepMan'].value=''
        elements['netInd1'].addEventListener('change',netMailevent)
        
    }
    else if(elements['action'].value!=='') {
        elements['prevRepMan'].disabled=true
        elements['prevRepMan'].value='NA'
        elements['transfer'].disabled=true
        elements['transfer'].value='NA'
        createModal()
        if(elements['action'].value==='Add')
            elements['netInd1'].addEventListener('change',netMailevent)
        else
            elements['netInd1'].removeEventListener('change',netMailevent)
    }
}

function createModal() {

    const span = document.getElementById("close");

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        elements['action'].value = ''
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            elements['action'].value = '0'
        }
    }
}

function clearform() {
    document.getElementById('myForm').reset();
}

const setFormData = () =>{

    for(let x of ['EmpID','firstname','lastname','unitName','designation','Grade','Level','department','divloc','SuperiorName','UnitHeadName','ApprovalFromDMM_name']){
        elements[`${x}`].value = data[`${x}`]
    }

    let currdate = new Date()

    if(elements['action'].value==='Add'){
        console.log('Its Add')
        let chknInd=false,chknShr=false,chkeInd=false,chkeShr=false;
        if(data['netInd1']==='Yes' && (data['NetDate']===null || currdate<new Date(data['NetDate'])))
            chknInd=true;
        if(data['netShr1']==='Yes' && (data['NetDate']===null || currdate<new Date(data['NetDate'])))
            chknShr=true;
        if(data['emailInd1']==='Yes' && (data['emailDate']===null || currdate<new Date(data['emailDate'])))
            chkeInd=true;
        if(data['emailShr1']==='Yes' && (data['emailDate']===null || currdate<new Date(data['emailDate'])))
            chkeShr=true;
        console.log(chknInd,chknShr,chkeInd,chkeShr);
        if(!chknInd & !chknShr & !chkeInd & !chkeShr){
            elements['netInd1'].value='Yes';
            //elements['emailInd1'].value='Yes';
        }
        else{
            elements['netInd1'].value='NA'
            if(chknInd){
                
                elements['netShr1'].value='NA'
                elements['emailShr1'].value='NA'
                elements['emailInd1'].value=chkeInd ? 'NA' : 'Yes'
            }
            else{
                elements['emailInd1'].value='NA'
                elements['netShr1'].value=chknShr ? 'NA' : 'Yes'
                elements['emailShr1'].value=chkeShr ? 'NA' : 'Yes'
            }
        }
    
        if(data['SMTPinbound1']==='Yes' && (data['SMTP_inboundDate']===null || currdate<new Date(data['SMTP_inboundDate'])))
            elements['SMTPinbound1'].value='NA';
        else
            elements['SMTPinbound1'].value='Yes';

        if(data['SMTPoutbound1']==='Yes' && (data['SMTP_outboundDate']===null || currdate<new Date(data['SMTP_outboundDate'])))
            elements['SMTPoutbound1'].value='NA'
        else
            elements['SMTPoutbound1'].value='Yes'
                
        if(data['netAcc1']==='Yes' && (data['InternetDate']===null || currdate<new Date(data['InternetDate'])))
            elements['netAcc1'].value='NA'
        else
            elements['netAcc1'].value='Yes'
                
        if(data['VPN1']==='Yes' && (data['VPNDate']===null || currdate<new Date(data['VPNDate'])))
            elements['VPN1'].value='NA'
        else
            elements['VPN1'].value='Yes'
        }
    else{
        console.log('Its change')
        if(data['netInd1']==='Yes' && data['NetDate']!=null &&  currdate<=new Date(data['NetDate'])){
            elements['netInd1'].value='Yes';
            elements['netInd2'].value=data['netInd2']
        }
        else
            elements['netInd1'].value='NA';
        if(data['netShr1']==='Yes' && data['NetDate']!=null &&  currdate<=new Date(data['NetDate'])){
            elements['netShr1'].value='Yes';
            elements['netShr2'].value=data['netShr2']
           }
        else
            elements['netShr1'].value='NA';
        if(data['emailInd1']==='Yes' && data['emailDate']!=null &&  currdate<=new Date(data['emailDate'])){
            elements['emailInd1'].value='Yes';
            elements['emailInd2'].value=data['emailInd2']
        }
        else
            elements['emailInd1'].value='NA';
        if(data['emailShr1']==='Yes' && data['emailDate']!=null &&  currdate<=new Date(data['emailDate'])){
            elements['emailShr1'].value='Yes';
            elements['emailShr2'].value=data['emailShr2']
        }
        else
            elements['emailShr1'].value='NA';
        
        if(data['SMTPinbound1']==='Yes' && data['SMTP_inboundDate']!=null &&  currdate<=new Date(data['SMTP_inboundDate'])){
            elements['SMTPinbound1'].value='Yes'
            elements['SMTPinbound2'].value=data['SMTPinbound2']
            elements['SMTPinbound3'].value=data['SMTPinbound3']
        }
        else
            elements['SMTPinbound1'].value='NA'
        if(data['SMTPoutbound1']==='Yes' && data['SMTP_outboundDate']!=null &&  currdate<=new Date(data['SMTP_outboundDate'])){
            elements['SMTPoutbound1'].value='Yes'
            elements['SMTPoutbound2'].value=data['SMTPoutbound2']
        }
        else
            elements['SMTPoutbound1'].value='NA'

        if(data['netAcc1']==='Yes' && data['InternetDate']!=null &&  currdate<=new Date(data['InternetDate'])){
            elements['netAcc1'].value='Yes'
            elements['netAcc2'].value=data['netAcc2']
        }        
        else
            elements['netAcc1'].value='NA'
        
        if(data['VPN1']==='Yes' && data['VPNDate']!=null &&  currdate<=new Date(data['VPNDate'])){
            elements['VPN1'].value='Yes'
            elements['VPN2'].value=data['VPN2']
            elements['VPN3'].value=data['VPN3']
        }
        else{
            elements['VPN1'].value='NA'
        }
    }
    for(let x of ['EmpID','firstname','lastname','netInd1','netShr1','emailInd1','emailShr1','SMTPinbound1','SMTPoutbound1','netAcc1','VPN1'])
        elements[x].dispatchEvent(new Event('change', { 'bubbles': true }));

    modal.style.display = "none";
}

function getInput() {
    let vp=elements['vp'].value;
    if(vp==='default')
        vp='null'
    
    let query1=`'${elements['EmpID'].value.trim()}','${elements['action'].value.trim()}','${elements['Dor'].value.trim()}','${elements['fullname'].value.trim()}'`;
    let temp;
    for(let i=5;i<33;i++){
        query1 = query1.concat(',');
        temp = elements[ids[i]].value.trim();
        if (temp.length === 0 || temp==='default')
            query1 = query1.concat('null');
        else
            query1 = query1.concat(`'${temp}'`);
    }
    let chkdata = '';
    let chkdate = '';
    for (let i = 0; i < chckboxes.length; i++) {
        if (chckboxes[i].checked) {
            if (chkdata.length === 0){
                chkdata = chckboxes[i].value
                chkdate = vp
            }
            else{
                chkdata = chkdata.concat('|', chckboxes[i].value)
                chkdate = chkdate.concat('|',vp)
            }
        }
    }
    if (chkdata.length === 0)
        query1 = query1.concat(',null');
    else
        query1 = query1.concat(`,'${chkdata}'`);
    for(let i=33;i<59;i++){
        query1 = query1.concat(',');
        temp = elements[ids[i]].value.trim();
        if (temp.length === 0)
            query1 = query1.concat('null');
        else
            query1 = query1.concat(`'${temp}'`);
    }

    if(vp!=='null')
        vp=`'${vp}'`
    let query2=''
    if(firsttime['verdict']){
        //insert
        query2=`'${elements['EmpID'].value.trim()}'`;
        for(let x of ['firstname','lastname','unitName','designation','Grade','Level','department','divloc'])
            query2 = query2.concat(`,'${elements[x].value.trim()}'`);
        
        for(let x of ['netInd1','netInd2','netShr1','netShr2','netRem','emailInd1','emailInd2','emailShr1','emailShr2','emailRem','SMTPinbound1','SMTPinbound2','SMTPinbound3','SMTPoutbound1','SMTPoutbound2','netAcc1','netAcc2','VPN1','VPN2','VPN3','SuperiorName','UnitHeadName','ApprovalFromDMM_name']){
            query2 = query2.concat(',');
            temp = elements[x].value.trim();
            if (temp.length === 0)
                query2 = query2.concat('null');
            else
                query2 = query2.concat(`'${temp}'`);
        }
        
        if(elements['netInd1'].value===elements['netShr1'].value)
            query2 = query2.concat(',null');
        else
            query2 = query2.concat(`,${vp}`);
        if(elements['emailInd1'].value===elements['emailShr1'].value)
            query2 = query2.concat(',null');
        else
            query2 = query2.concat(`,${vp}`);

        for(let x of ['SMTPinbound1','SMTPoutbound1','netAcc1','VPN1']){
            if(elements[x].value==='Yes')
                query2=query2.concat(`,${vp}`)
            else
                query2 = query2.concat(',null');
        }

    }
    else{
        //update
        query2 = `firstname='${elements['firstname'].value.trim()}'`
        for(let x of ['lastname','unitName','designation','Grade','Level','department','divloc','SuperiorName','UnitHeadName','ApprovalFromDMM_name']){
            if(data[x]!==elements[x].value)
                query2 = query2.concat(`,${x}='${elements[x].value.trim()}'`);
        }
        
        let a=['netInd','netShr','emailInd','emailShr','SMTPoutbound','netAcc',]
        let b=['NetDate','NetDate','emailDate','emailDate','SMTP_outboundDate','InternetDate']
        for(let i=0;i<a.length;i++){
            if(elements[`${a[i]}1`].value==='Yes')
                query2 = query2.concat(`,${a[i]}1='${elements[`${a[i]}1`].value.trim()}',${a[i]}2='${elements[`${a[i]}2`].value.trim()}',${b[i]}=${vp}`)
        }

        if(elements['netInd1']==='Yes' || elements['netShr1']==='Yes')
            query2 = query2.concat(`,netRem='${elements['netRem'].value.trim()}'`)
        if(elements['emailInd1']==='Yes' || elements['emailShr1']==='Yes')
            query2 = query2.concat(`,emailRem='${elements['emailRem'].value.trim()}'`)

        if(elements['SMTPinbound1'].value==='Yes')
            query2=query2.concat(`,SMTPinbound1='${elements['SMTPinbound1'].value}', SMTPinbound2='${elements['SMTPinbound2'].value.trim()}',SMTPinbound3='${elements['SMTPinbound3'].value.trim()}',SMTP_inboundDate=${vp}`)
        if(elements['VPN1'].value==='Yes')
            query2=query2.concat(`,VPN1='${elements['VPN1'].value}',VPN2='${elements['VPN2'].value.trim()}',VPN3='${elements['VPN3'].value.trim()}',VPNDate=${vp}`)
    }
    return [query1,query2]
}

const fetchData = async (event) => {
    event.preventDefault();

    const Eid=document.getElementById('empid').value;
    //console.log(Eid)
    try{
        const res=await fetch('/getData', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({Eid})
        })
        const fetchresult = await res.json();
        //console.log(fetchresult);
        if(fetchresult.status===200){
            data = Object.freeze(fetchresult.data)
            firsttime= Object.freeze({verdict:false})
            setFormData()
        }
        else if(fetchresult.status===204){
            firsttime= Object.freeze({verdict:true})
            if(elements['action'].value==='Add'){
                elements['EmpID'].value=Eid
                elements['EmpID'].dispatchEvent(new Event('change', { 'bubbles': true }));
                modal.style.display = "none";
            }
            else{
                alert('EmpID not does not exist, Please Add first!')
                modal.style.display = "none";
                elements['action'].selectedIndex = '0'
            }
        }
        else{
            alert('Some error occured, Try again!')
            modal.style.display = "none";
            elements['action'].selectedIndex = '0'
        }
    }catch(err){
        alert('Some error occured, Try again!')
        console.log(err);
    }
}

const Submit = (event) => {
    event.preventDefault()

    //console.log('In Button');
    let queries = getInput();
    //console.log(feildval);
    fetch('/postData', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({empId:elements['EmpID'].value , qry1:queries[0] , qry2:queries[1] , firstEntry:firsttime['verdict']})
    }).then(res => {
        if (res.status === 200){ 
            alert('Form submitted successfully');
            window.location.href = '/submitted';
        }
        else
            alert('Submission failed due to some error, Try Again!');
    }).catch(error => console.log(error))
    
}
