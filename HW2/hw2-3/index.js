function addList(e) {
    if(e.type === 'keypress' && e.key !== "Enter") return;
    let input = document.getElementById('listInput');
    let listName = input.value.trim();
    input.value = "";

    // 太長排版會亂掉，不太會CSS，QQ
    if(isTooLoog(listName)) {
        alert('太長ㄌ！掰');
        return;
    }
    if(listName.length <= 0) return;
    let _this = {
        index : listIndex,
        todoNumber : 0,
        done : 0,
    };

    let lists = document.getElementById('lists');
    let newList = document.createElement('div');
    newList.className='list';
    newList.id = listIndex.toString();
    let newHeader = document.createElement('div');
    
    let header = document.createElement('h2');
    header.innerHTML = listName;
    header.className='header';
    let changeHeader = document.createElement('input');
    changeHeader.type = 'text';
    changeHeader.value = listName;
    changeHeader.className = 'header';
    changeHeader.classList.add('changeHeader');
    changeHeader.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            changeHeader.remove();
            newHeader.insertBefore(header, newHeader.firstChild);
        }
        header.innerHTML = changeHeader.value;
    });

    header.addEventListener('click', () => {
        header.remove();
        newHeader.insertBefore(changeHeader, newHeader.firstChild);
    });
    newHeader.appendChild(header);
    let delete_button = document.createElement('div');
    delete_button.innerHTML = 'X';
    delete_button.className='delete';
    delete_button.addEventListener('click', () => {
        delete_button.parentNode.parentNode.remove();
        totalDone -= _this.done;
        updateGlobal(_this.todoNumber);});
    newHeader.appendChild(delete_button);

    newList.appendChild(newHeader);
    
    let counter = document.createElement('div');
    counter.innerHTML = `未完成： ${_this.todoNumber - _this.done}`;
    counter.id = `${_this.index}counter`;
    newList.appendChild(counter);

    let inputItem = document.createElement('div');
    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.addEventListener('keypress', (e) => {addTodo(e, newInput, _this);});
    let newBotton = document.createElement('input');
    newBotton.type = 'button';
    newBotton.value = '+';
    newBotton.addEventListener("click", (e) => {addTodo(e, newInput, _this);});
    inputItem.appendChild(newInput);
    inputItem.appendChild(newBotton);
    lists.appendChild(newList);
    newList.appendChild(inputItem);

    let todoContent = document.createElement('div');
    todoContent.id = `${_this.index}content`;
    todoContent.className='content';
    for(let i = 0; i < 18; i+=1) {
        let todoItem = createTodo('', _this);
        todoContent.appendChild(todoItem);
    }
    newList.appendChild(todoContent);
    listIndex = listIndex + 1;
}

function addTodo(e, input, listAttr) {
    if(e.type === 'keypress' && e.key !== "Enter") return;
    let todoName = input.value.trim();
    input.value = "";

    // 太長排版會亂掉，不太會CSS，QQ
    if(isTooLoog(todoName)) {
        alert('太長ㄌ！掰');
        return;
    }
    if(todoName.length > 0) {
        if(listAttr.todoNumber > 17) {
            alert('Too many todos!');
            return;
        }
        let list = document.getElementById(`${listAttr.index}content`);
        let todoItem = list.children[listAttr.todoNumber];
        todoItem.children[0].innerHTML = todoName;
        
        let delete_button = document.createElement('div');
        delete_button.innerHTML = 'X';
        delete_button.classList.add('delete');
        delete_button.addEventListener('click', function() {
            delete_button.parentNode.remove();
            list.appendChild(createTodo('', listAttr));
            listAttr.todoNumber -=1
            if(todoItem.children[0].classList.length === 2) {
                listAttr.done -=1;
                totalDone -=1;
            }
            updateCounter(listAttr);
            totalItem -=1;
            updateGlobal();
        });

        todoItem.appendChild(delete_button);
        listAttr.todoNumber+=1;
        totalItem = totalItem+1;
        updateCounter(listAttr);
        updateGlobal();
    } 
}

function createTodo(todo_final_name, listAttr) {
    // todo content
    let newTodo = document.createElement('div');
    newTodo.classList.add('todo');
    newTodo.innerHTML = todo_final_name;
    newTodo.addEventListener("click", function() {
        if(newTodo.classList.length === 2) {
            newTodo.classList.add('done');
            totalDone +=1;
            listAttr.done +=1;
        }
        else {
            newTodo.classList.remove('done');
            totalDone -=1;
            listAttr.done -=1;
        }
        updateCounter(listAttr);
        updateGlobal();
    });

    newTodo.addEventListener('mouseover', function() {
        newTodo.classList.add('hovered');
    });
    newTodo.addEventListener('mouseleave', function() {
        newTodo.classList.remove('hovered');
    });

    // 把todo包起來，左邊是todo content，右邊是X按鈕
    let todoItem = document.createElement('div');
    todoItem.classList.add('todo');
    todoItem.id = `${listAttr.index}${todo_final_name}todo`;

    todoItem.appendChild(newTodo);
    // todoItem.appendChild(delete_button);
    return todoItem;
}

function isTooLoog(string) {
    let length = 0;
    // 全形與半形
    for(let i=0; i<string.length; i++) 
        string.charCodeAt(i)>256 ? length+=2 : length++;
    // console.log(length);
    return length > 25 ? true : false;
}

function updateCounter(listAttr) {
    let counter = document.getElementById(`${listAttr.index}counter`);
    counter.innerHTML = `未完成： ${listAttr.todoNumber - listAttr.done}`;
}

function updateGlobal(deleteList = 0) {
    totalItem = totalItem - deleteList;
    let done = document.getElementById('done');
    done.innerHTML = `已完成: ${totalDone}`;
    let undone = document.getElementById('undone');
    undone.innerHTML = `未完成: ${totalItem - totalDone}`;
}

let keyin = document.getElementById('listInput');
keyin.addEventListener('keypress', addList);

let clickin = document.getElementById('addList');
clickin.addEventListener("click", addList);

let listIndex = 0;
let totalItem = 0;
let totalDone = 0;
