const todoDone=document.querySelector('#todoDone');
const todoProgress=document.querySelector('#todoProgress');
const todoPendings=document.querySelector('#todoPendings');
const deleteAllButton=document.querySelector('#deleteAllButton');
const inputText=document.querySelector('#inputText');
const submitTodo=document.querySelector('#submitTodo');
console.log("hello");
console.log(inputText.value);
var i=0;
let items;

addAllEventListener();

function addAllEventListener(){
    console.log("hello2");
    

todoDone.addEventListener('click',deleteItem);
todoPendings.addEventListener('click',deleteItem);
todoProgress.addEventListener('click',deleteItem);
deleteAllButton.addEventListener('click',removeAll);
submitTodo.addEventListener('submit',addNewItem);

}
function removeAll(){
    console.log('deneme');
    todoDone.innerHTML=" ";
    todoProgress.innerHTML=" ";
    todoPendings.innerHTML=" ";
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
    console.log('deneme');
    if(e.target.className=="bi bi-x-circle"){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }

}
function myDrop(e){
    e.preventDefault();
    //console.log("Birak: ",e.target.id);
    var data=e.dataTransfer.getData("text");
    console.log(data);
    e.target.appendChild(document.getElementById(data));

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
    localStorage.setItem("todo-list", JSON.stringify(items));

}
function getItemsFromLS(){

    if(localStorage.getItem("todo-list")=== null){
        items=[];
    }else{
        items = JSON.parse(localStorage.getItem("todo-list"));
    }
    return items;
}
function loadItems() {

    items = getItemsFromLS();
    items.forEach(function (item) {
        createItems(item);
    })

}
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (text == item) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem("todo-list", JSON.stringify(items));
}
