const textentry = document.getElementById("addtext");
const addbtn = document.getElementById("addbtn");
const addlist = document.getElementById("listacontain");

// Load saved list from localStorage on page load
window.onload = function () {
    let saved = JSON.parse(localStorage.getItem("todolist")) || [];
    saved.forEach(item => {
        createItem(item.text, item.checked);
    });
};

// Save current list to localStorage
function saveList() {
    let items = [];
    document.querySelectorAll("#listacontain li").forEach(li => {
        items.push({
            text: li.childNodes[0].textContent,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("todolist", JSON.stringify(items));
}

function createItem(text, checked = false) {
    let lista = document.createElement("li");
    lista.textContent = text;
    if (checked) lista.classList.add("checked");
    addlist.appendChild(lista);

    let sp = document.createElement("span");
    sp.innerHTML = "✖";
    lista.appendChild(sp);
}

function doit(){
    if (textentry.value == "") {
        alert("you must writ something")
    }
    else{
        createItem(textentry.value);
        textentry.value = "";
        saveList();
    }


}

addlist.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveList();
}, false);