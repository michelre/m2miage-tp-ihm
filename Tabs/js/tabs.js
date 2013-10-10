var spans = document.querySelectorAll("span");
var sections = document.querySelectorAll("section");
(function(){
    for(var i = 0; i < spans.length; i++){
        spans[i].addEventListener("click", function(){
            changeOnglet(event,"SelectedTabStyle");
        }, "false");
    }
})()

function changeOnglet(e, spanText){
    for(var i = 0; i < spans.length; i++){
        spans[i].setAttribute("class", "");
        spans[i].innerHTML = "UnselectedTab";
        sections[i].style.display = "none";
    }
    e.target.setAttribute("class", "active");
    e.target.innerHTML = spanText;
    document.querySelector("#"+e.target.dataset["section"]).style.display = "block";
}