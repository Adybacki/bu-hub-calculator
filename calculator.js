
let hubs = {
    plm : 0,
    aex : 0,
    hco : 0,
    siI : 0,
    soI : 0,
    sisoII : 0,
    qrI : 0,
    qrII : 0,
    iic : 0,
    gci : 0,
    etr : 0,
    fyw : 0,
    wri : 0,
    win : 0,
    osc : 0,
    dme : 0,
    crt : 0,
    ril : 0,
    twc : 0,
    cri : 0,
}

const requiredValues = {
    plm: 1,
    aex: 1,
    hco: 1,
    siI: 1,
    soI: 1,
    sisoII: 1,
    qrI: 1,
    qrII: 1,
    iic: 1,
    gci: 2,
    etr: 1,
    fyw: 1,
    wri: 1,
    win: 2,
    osc: 1,
    dme: 1,
    crt: 2,
    ril: 2,
    twc: 2,
    cri: 2
  };

let classVal;
let className = document.getElementById("courseName");
className.addEventListener("change", function() {
    classVal = document.getElementById("courseName").value;
});

selectedHubs = [];
for (let hub in hubs) {
    let value = hubs[hub];
    document.getElementById(hub).innerHTML = value;
    let temp = document.getElementById(hub + "CB");
    temp.addEventListener("change", function(){
        let checkbox = document.getElementById(hub + "CB");
        if (checkbox.checked) {
            selectedHubs.push(hub);
        }
        else {
            selectedHubs.pop(hub);
        }
    })
}

function isSatisfied() {
    for (let hub in hubs) {
        if (hubs[hub] < requiredValues[hub]) {
            return false;
        }
    }
    return true;
}

function updateCounters() {
    for (let hub in hubs) {
        let checkbox = document.getElementById(hub + "CB");
        if (checkbox.checked) {
            hubs[hub]++;
        }
        document.getElementById(hub).innerHTML = hubs[hub];
         if (hubs[hub] >= requiredValues[hub]) {
            document.getElementById(hub + "Label").classList.add("satisfied");
        } else {
            document.getElementById(hub + "Label").classList.remove("satisfied");
        }
    }
}

function resetInputs() {
    for (let hub in hubs) {
        let check = hub + "CB";
        document.getElementById(check).checked = false;
    }
    document.getElementById("courseName").value = "";
    selectedHubs = [];
    classVal = "";
}

function addClass(className, selectedHubs) {
    let classDiv = document.createElement("div");
    classDiv.classList.add("classEntry");

    let classLabel = document.createElement("label");
    classLabel.classList.add("courseName")
    classLabel.textContent = className + " (" + selectedHubs.join(", ") + ")";
    classDiv.appendChild(classLabel);

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("removeButton");
    removeButton.onclick = function() {
        removeClass(classDiv, selectedHubs);
    };
    classDiv.appendChild(removeButton);

    let addedClassesContainer = document.getElementById("classContainer");
    addedClassesContainer.appendChild(classDiv);
}

function removeClass(classDiv, selectedHubs) {
    classDiv.remove();
    for (let hub of selectedHubs) {
        hubs[hub]--;
        document.getElementById(hub).innerHTML = hubs[hub];
    }
    for (let hub in hubs) {
        if (hubs[hub] >= requiredValues[hub]) {
            document.getElementById(hub + "Label").classList.add("satisfied");
        } else {
            document.getElementById(hub + "Label").classList.remove("satisfied");
        }
    }
    document.getElementById("satisfy").innerHTML = "SATISFIED HUB: " + isSatisfied();
}

document.getElementById("addCourse").onclick = function() {
    if (classVal == undefined || classVal == "") {
        alert("Please provide a course name");
    }
    else {
        updateCounters();
        document.getElementById("satisfy").innerHTML = "SATISFIED HUB: " + isSatisfied();
        addClass(classVal, selectedHubs);
        resetInputs();
    }
}

document.getElementById("reset").onclick = function() {
    for (let hub in hubs) {
        hubs[hub] = 0;
        document.getElementById(hub).innerHTML = hubs[hub];
        resetInputs();
        document.getElementById(hub + "Label").classList.remove("satisfied");
        document.getElementById("satisfy").innerHTML = "SATISFIED HUB: " + isSatisfied();
    }
    let container = document.getElementById("classContainer");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}