function addLine(){
    var row = document.getElementsByTagName("table")[0].insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    cell1.addEventListener("click", editable, "false");
    cell2.addEventListener("click", editable, "false");
    cell1.innerHTML = cell1.offsetLeft+";"+cell1.offsetHeight;
    cell2.innerHTML = cell2.offsetLeft+";"+cell2.offsetHeight;
}

function deleteLine(){
    var tab = document.getElementsByTagName("table")[0].deleteRow(-1);
}

function editable(event){
    event.target.innerHTML = "<input type='text' placeholder='...'/>";
}
