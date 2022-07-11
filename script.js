const form=document.querySelector('#todoAppForm');
const input=document.querySelector('#inputText');
const btnDeleteAll=document.querySelector('#btnDeleteAll');
const todoDone=document.querySelector('#todoDone');
const todoInProgress=document.querySelector('#todoInProgress');
const todoPendings=document.querySelector('#todoPendings');
const x=todoInProgress.addEventListener("mouseover", myDrop);

var holdAndDrag;
var count=0;

addAllEventListener();

function addAllEventListener(){
    form.addEventListener('submit',addNewItem);
    todoPendings.addEventListener('click',deleteItem);

}
function addNewItem(e){
    e.preventDefault();

    if(input.value===''){
        alert('Please type a to do');
        return;
    }else{
        createItem(input.value);
    }
}
function createItem(text){
    var arr=[];
    var kosul=true;
    count++;
    let i=count;
    const li=document.createElement('li');
    while(kosul){
    li.setAttribute('draggable','true');
    li.setAttribute("ondragstart","drag(event)");
    li.setAttribute('id',''+i);
    i++
    li.appendChild(document.createTextNode(text));
    kosul=false;
    }

    /*const li=document.createElement('li');
    li.setAttribute('draggable','true');
    li.setAttribute("ondragstart","drag(event)");
    li.setAttribute('id','',count);
    li.appendChild(document.createTextNode(text));
*/

    const a = document.createElement('a');
    a.classList = 'delete-item float-end';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="bi bi-x-circle-fill"></i>';

    li.appendChild(a);
    todoPendings.appendChild(li);


}
function deleteItem(e){
    e.preventDefault();
    if (e.target.className == 'bi bi-x-circle-fill') {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();   
        }
    }

}
function allowDrop(e){
    e.preventDefault();
}
function drag(e){
    console.log("surukle:",e.target.id);
    e.dataTransfer.setData("text",e.target.id);
    holdAndDrag=e.target;
    
}

function myDrop(e){
    e.preventDefault();
    console.log("birak :",e.target);
    var data=e.dataTransfer.getData("text");
    console.log(data);
    e.target.appendChild(document.getElementById(data));
}
