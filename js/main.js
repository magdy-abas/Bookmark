var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var table = document.getElementById("tableContent");
var boxInfo = document.getElementById("boxInfo");

var sites = [];
if (localStorage.getItem("site") != null) {
  sites = JSON.parse(localStorage.getItem("site"));
  displaySite();
}

function addNewSite() {
  if (isNameValid() == true && isUrlValid() == true) {
    var site = {
      siteName: bookmarkNameInput.value,
      siteUrl: bookmarkURLInput.value,
    };

    sites.push(site);
    displaySite();
    addLocalStorage();
    clearInputs();
  } else {
    boxInfo.classList.remove("d-none");
  }
}

function displaySite() {
  var container = "";
  for (var i = 0; i < sites.length; i++) {
    var siteUrl = sites[i].siteUrl;
    var formattedUrl =
      siteUrl.startsWith("http://") || siteUrl.startsWith("https://")
        ? siteUrl
        : "https://" + siteUrl;

    container += `        
     <tr>
    <td>${i + 1}</td>
    <td>${sites[i].siteName}</td>
    <td>
    <a class="btn btn-visit" href="${formattedUrl}" target="_blank">
    <i class="fa-solid fa-eye pe-2"></i>Visit
    </a>
    </td>
    <td>
    <a onclick="deleteSite(${i})" class="btn btn-delete pe-2" >
            <i class="fa-solid fa-trash-can"></i>
            Delete
    </a>
    </td>
</tr>`;
  }

  table.innerHTML = container;
}

function deleteSite(index) {
  sites.splice(index, 1);
  displaySite();
  addLocalStorage();
}

function addLocalStorage() {
  localStorage.setItem("site", JSON.stringify(sites));
}

function clearInputs() {
  bookmarkNameInput.value = null;
  bookmarkURLInput.value = null;
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkURLInput.classList.remove("is-valid");
}
function isNameValid() {
  var namePattern = /^\w{3,}(\s+\w+)*$/;
  var input = bookmarkNameInput.value;

  if (namePattern.test(input)) {
    bookmarkNameInput.classList.remove("is-invalid");
    bookmarkNameInput.classList.add("is-valid");

    return true;
  } else {
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.classList.remove("is-valid");

    return false;
  }
}

function isUrlValid() {
  var urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  var input = bookmarkURLInput.value;

  if (urlPattern.test(input)) {
    bookmarkURLInput.classList.remove("is-invalid");
    bookmarkURLInput.classList.add("is-valid");

    return true;
  } else {
    bookmarkURLInput.classList.add("is-invalid");
    bookmarkURLInput.classList.remove("is-valid");

    return false;
  }
}

function closeBox() {
  boxInfo.classList.add("d-none");
}
