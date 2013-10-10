var images = document.getElementsByTagName("img");
var divPair = document.getElementsByClassName("pair");
var divImpair = document.getElementsByClassName("impair");
var elemDragged = undefined;

(function() {
    for(var i = 0 ; i < images.length; i++){
        images[i].addEventListener("drag", drag, "false");
    }
    
    divPair[0].addEventListener("drop", drop, "false");
    divImpair[0].addEventListener("drop", drop, "false");
    
    divImpair[0].addEventListener("dragover", dragover, "false");
    divPair[0].addEventListener("dragover", dragover, "false");
    
    divImpair[0].addEventListener("dragleave", dragleave, "false");
    divPair[0].addEventListener("dragleave", dragleave, "false");
})();

function drag(e) {
    elemDragged = e.target;
}

function drop(e) {
    var numDragged = parseInt(elemDragged.dataset["chiffre"]);
    if(e.target.className == "pair" && numDragged%2==0){
        e.target.appendChild(elemDragged);
    }else if(e.target.className == "impair" && numDragged%2==1){
        e.target.appendChild(elemDragged);
    }
    e.target.style.backgroundColor = "";
}

function dragover(e){
    e.target.style.backgroundColor = "#DAF2B6";
    e.preventDefault();
}

function dragleave(e){
    e.target.style.backgroundColor = "";
}
