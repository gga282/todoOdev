const todoDone=document.querySelector('#todoDone');
const todoProgress=document.querySelector('#todoProgress');
const todoPendings=document.querySelector('#todoPendings');
const deleteAllButton=document.querySelector('#deleteAllButton');
const inputText=document.querySelector('#inputText');
const submitTodo=document.querySelector('#submitTodo');
console.log("hello");
var i=0;
let items;
loadItems();
addAllEventListener();

function addAllEventListener(){

todoDone.addEventListener('click',deleteItem);
todoPendings.addEventListener('click',deleteItem);
todoProgress.addEventListener('click',deleteItem);
deleteAllButton.addEventListener('click',removeAll);
submitTodo.addEventListener('submit',addNewItem);

}
function removeAll(){
    todoDone.innerHTML="";
    todoProgress.innerHTML="";
    todoPendings.innerHTML="";
    localStorage.clear();

}
function addNewItem(e){

    if(inputText.value!=''){
        createItems(inputText.value);
    }
    else{
        alert("Please enter value");
        return;
    }
    setItemsToLS(inputText.value);
}
function createItems(text){
    
    
    const li=document.createElement('li');
    li.classList="list-group list-group-flush";
    li.appendChild(document.createTextNode(text));
    li.setAttribute('draggable','true');
    li.setAttribute("id",''+i);
    i+=1;

    const a=document.createElement('a');
    a.classList='delete-item float-end';
    a.setAttribute('href','#');
    a.innerHTML = '<i class="bi bi-x-circle"></i>';

    li.appendChild(a);
    todoPendings.appendChild(li);
    

}
function deleteItem(e){
    e.preventDefault();
    console.log(e.target.className);
    
    if(e.target.className=="bi bi-x-circle"){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }

}
function myDrop(e){
    e.preventDefault();
    //console.log("Birak: ",e.target.id);
    var data=e.dataTransfer.getData("text");
    console.log(data.textContent);
    e.target.appendChild(document.getElementById(data));
    setItemsToLS(data.textContent);
    deleteItemFromLS(data.textContent);

    

}
function allowDrop(e){
    e.preventDefault();
}
function drag(e){
    console.log("surukle:",e.target.id);
    e.dataTransfer.setData("text",e.target.id);
}
function setItemsToLS(text){

    items=getItemsFromLS();
    items.push(text);
    localStorage.setItem("todolist", JSON.stringify(items));

}
function getItemsFromLS(){

    if(localStorage.getItem("todolist")===null){
        items=[];
    }else{
        items = JSON.parse(localStorage.getItem("todolist"));
    }
    return items;
}
function loadItems() {

    items = getItemsFromLS();
    items.forEach(function (items) {
        createItems(items);
    })

}
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (text == item) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem("todolist", JSON.stringify(items));
}
