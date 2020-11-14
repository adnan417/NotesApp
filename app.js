console.log("This is my first app")
shownotes();

// if user adds a note,add it to the localstorage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addtitle = document.getElementById('addtitle');
  let notes = localStorage.getItem("notes");
  let titles= localStorage.getItem("titles");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (titles==null){
    titlesObj = [];
  }
  else{
    titlesObj=JSON.parse(titles);
  }
  notesObj.push(addTxt.value);
  titlesObj.push(addtitle.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  addTxt.value = "";
  addtitle.value="";
  shownotes();
});

//function to show notes from local storage
function shownotes() {
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");
  if (notes == null) {
    notesObj = [];

  }
  else {
    notesObj = JSON.parse(notes);
  }
  if (titles==null){
    titlesObj = [];
  }
  else{
    titlesObj=JSON.parse(titles);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="notecard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                   <h5 class="card-title">${titlesObj[index]}</h5>
                   <p class="card-text">${element}</p>
                   <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
            `;
  });
  let noteselm=document.getElementById('notes');
  if(notesObj.length!=0){
    noteselm.innerHTML=html;
  }
  else{
    noteselm.innerHTML=`Nothing to show!`;
  }
}

//function to show delete note
function deletenote(index){
  let notes = localStorage.getItem("notes");
  let titles = localStorage.getItem("titles");
  if(notes == null){
    notesObj=[];
  }
  else{
    notesObj = JSON.parse(notes);
  }
  if (titles==null){
    titlesObj = [];
  }
  else{
    titlesObj=JSON.parse(titles);
  }
  
  notesObj.splice(index,1);
  titlesObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(notesObj));
  localStorage.setItem("titles",JSON.stringify(titlesObj));
  shownotes();
}
//To search

let searchbtn=document.getElementById("searchbtn");
let searchtxt=document.getElementById('searchtxt');
searchbtn.addEventListener("click",function(){
  
  let inputval=searchtxt.value.toLowerCase();
  let notecards=document.getElementsByClassName('notecard');
  Array.from(notecards).forEach(function (element) {
    let cardtxt=element.getElementsByTagName("p")[0].innerText;
    if(cardtxt.includes(inputval)){
      element.style.display="block";
    }
    else{
      element.style.display="none";
    }
  })
});
