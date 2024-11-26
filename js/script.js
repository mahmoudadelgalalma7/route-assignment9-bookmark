var siteName = document.getElementById("site-name")
var siteLink = document.getElementById("site-URL")
var saveBtn = document.getElementById("saveBtn")
var tableContent = document.getElementById("tableContent")
var staticBackdrop = document.getElementById("staticBackdrop")


var savedSites;
if (localStorage.getItem("site") !== null) {
    savedSites = JSON.parse(localStorage.getItem("site"))
    displayTable()
} else {
    savedSites = []
}

// SaveData
function saveSiteData(){
    var inputData = {
        name : siteName.value,
        link : siteLink.value
    }
    if ( validateSiteName() &&  validateSiteLink()) {
        savedSites.push(inputData);
        localStorage.setItem("site",JSON.stringify(savedSites));
    } else {
        staticBackdrop.classList.remove("d-none");
        staticBackdrop.classList.add("d-block","bg-dark","bg-opacity-50");
        document.body.classList.add("overflow-hidden")
    }
    displayTable();
    clearInput();
}

function clearInput() {
    siteName.value = ""
    siteLink.value = ""
}

function displayTable() {
    var cartona = ''
    for (var i = 0; i < savedSites.length;i++) {
        cartona +=
        `
        <tr>
            <td>${i+1}</td>
            <td>${savedSites[i].name}</td>
            <td>
                <a href="${savedSites[i].link}" target="_blank" id="visitBtn" class="btn btn-visit">
                    <i class="fa fa-eye pe-2"></i>
                    Visit
                </a>
            </td>
            <td>
                <a href="#" onclick="deleteSite(${i})" class="btn btn-danger">
                    <i class="fa pe-2 fa-trash"></i>Delete
                </a>
            </td>
        </tr>
        `
    }
    tableContent.innerHTML = cartona
}

function deleteSite(index){
    savedSites.splice(index,1)
    localStorage.setItem("site",JSON.stringify(savedSites));
    displayTable()
}

function validateSiteName(){
    var regex = /^[A-Za-z0-9]{3,}$/
    if (regex.test(siteName.value)) {
        siteName.classList.remove("is-invalid")
        siteName.classList.add("is-valid")
        console.log("Matched")
        return 1;
    } else {
        siteName.classList.remove("is-valid")
        siteName.classList.add("is-invalid")
        console.log("not matched")
        return 0;
    }
}
function validateSiteLink(){
    var regex = /^[A-Za-z0-9]{1,}[.][A-Za-z0-9]{2,}$/
    if (regex.test(siteLink.value)) {
        siteLink.classList.remove("is-invalid")
        siteLink.classList.add("is-valid")
        console.log("Matched")
        return 1
    } else {
        siteLink.classList.remove("is-valid")
        siteLink.classList.add("is-invalid")
        console.log("not matched")
        return 0
    }
}
function closeAlert(){
    staticBackdrop.classList.remove("d-block");
    staticBackdrop.classList.add("d-none");
    document.body.classList.remove("overflow-hidden")
}