var albums = undefined;
var fileDragged = undefined;
var folderOfFileDragged = undefined;

function initializeEventsAlbum(album) {
    bindEvent("click", album.querySelector("span"), function(event) {
        unfoldAlbum(event);
    });
    bindEvent("dragover", album, function(event) {
        dragOverFolder(event);
    });
    bindEvent("drop", album, function(event) {
        drop(event);
    });
    bindEvent("dragleave", album, function(event) {
        dragLeave(event);
    });
    initializeNbElementsFolder(album);
}

function initializeEventsFile(file) {
    file.setAttribute("draggable", "true");
    bindEvent("drag", file, function(event) {
        dragFile(event);
    });
}

function initializeEventsAlbums(albums) {
    for (var i = 0; i < albums.length; i++) {
        var album = albums[i];
        initializeEventsAlbum(album);
        var sousAlbums = album.querySelectorAll(".Album");
        for (var j = 0; j < sousAlbums.length; j++) {
            initializeEventsAlbums(sousAlbums);
        }
    }
}

function initializeEventsFiles(files) {
    for (var i = 0; i < files.length; i++) {
        initializeEventsFile(files[i]);
    }
}

function init() {
    albums = document.querySelectorAll("#myList .Album");
    files = document.querySelectorAll("#myList .file");
    var newAlbumButton = document.querySelectorAll("#newAlbum");
    bindEvent("click", newAlbumButton[0], function(event) {
        addNewAlbum(event);
    });
    initializeEventsAlbums(albums);
    initializeEventsFiles(files);
}

function addNewAlbum(e) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var nbAlbums = parseInt(document.querySelectorAll("[data-info='Album']").length);
        var newAlbum = document.createElement("li");
        newAlbum.setAttribute("class", "Album");
        newAlbum.innerHTML = "<span class='name' data-info='Album'>Album " + (nbAlbums + 1) + " (<span class='nb'></span>)</span>";
        var ulAlbum = document.createElement("ul");
        ulAlbum.innerHTML = this.responseText;
        newAlbum.appendChild(ulAlbum);
        document.querySelector("#myList").appendChild(newAlbum);
        initializeEventsAlbum(newAlbum);
        var files = newAlbum.querySelectorAll(".file");
        var sousAlbums = newAlbum.querySelectorAll(".Album");
        initializeEventsAlbums(sousAlbums);
        initializeEventsFiles(files);
    }
    xhr.open('GET', 'http://localhost:9999/generateHierarchy');
    xhr.send();
}

function initializeNbElementsFolder(album) {
    var ul = album.querySelector("ul");
    if (ul) {
        album.querySelector(".nb").innerHTML = ul.children.length;
    } else {
        album.querySelector(".nb").innerHTML = 0;
    }
}

function dragLeave(e) {
    var albumDraggedLeave = e.target;
    albumDraggedLeave.classList.remove("dragover");
}

function drop(e) {
    var dest = undefined;
    if (e.target.tagName === "SPAN") {
        (e.target.parentNode.querySelector("ul")) ? dest = e.target.parentNode.querySelector("ul") : dest = createElement(e.target.parentNode, "ul");
        dest = e.target.parentNode.querySelector("ul");
    } else {
        (e.target.classList[0] === "file") ? dest = e.target.parentNode : dest = e.target.querySelector("ul");
    }

    dest.appendChild(elemDragged);
    initializeNbElementsFolder(dest.parentNode);
    initializeNbElementsFolder(folderOfFileDragged);
    e.target.classList.remove("dragover");
}

function dragOverFolder(e) {
    var elemDraggedOver = e.target;
    elemDraggedOver.classList.add("dragover");
    e.preventDefault();
}

function dragFile(e) {
    elemDragged = e.target;
    folderOfFileDragged = e.target.parentNode.parentNode;
}

function unfoldAlbum(e) {
    var albumToUnfold = e.target.parentNode;
    if (albumToUnfold.classList.length === 2) {
        albumToUnfold.classList.remove("open");
    } else {
        albumToUnfold.classList.add("open");
    }
    e.stopPropagation();
}

function bindEvent(nameOfEvent, object, callback) {
    object.addEventListener(nameOfEvent, callback, "false");
}

function createElement(parent, nameOfNode) {
    var newNode = document.createElement(nameOfNode);
    parent.appendChild(newNode);
    return newNode;
}