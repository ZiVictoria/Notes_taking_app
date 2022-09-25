document.addEventListener("DOMContentLoaded", function() {
    const btnAdd = document.querySelector('.add');
    const listElement = document.querySelector(".content");

    btnAdd.addEventListener('click', handleAddList);
    listElement.addEventListener('click', deleteItem);

    function handleAddList() {
        let data = [];
        const input = document.querySelector('.addlist');
        let empty = "Reminder to have a great day";

        let inputNotes = localStorage.getItem('notes');
        if (inputNotes) {
            data = JSON.parse(inputNotes);
        }

        let str = input.value.replace(/ +/g, '');
        if (str.length <= 0) {
            data.push({
            content: empty,
            date: getDate(),
            });
        }   
        else {
            data.push({
            content: input.value.trim(),
            date: getDate(),
            });
        }
            localStorage.setItem('notes', JSON.stringify(data));
            input.value = "";
            createList(data)
        }

    function deleteItem(event) {
        const {target} = event;
        const parentTarget = target.parentNode;
        const {id} = parentTarget;

        let inputNotes = localStorage.getItem('notes');
        if (inputNotes) {
            data = JSON.parse(inputNotes);
        }

        if(parentTarget.tagName == 'LI'){
            data.splice(id, 1)
            createList(data)
        }
        localStorage.setItem('notes', JSON.stringify(data));
    }

    function createListItem(data, id){
        const {content, date} = data;
        let inputNotes = localStorage.getItem('notes');

        if (inputNotes) {
            data = JSON.parse(inputNotes);
        }
        const template = `
            <li id=${id} class="content__item">
                <span>${content}</span>
                <span>${date}</span>
                <div class="delete">&#9447</div>
            </li>`
        return template
    }

    function createList(arr = []){
        listElement.innerHTML = "";
        arr.forEach((item, id)=>{
            listElement.innerHTML += createListItem(item, id);
        });
    }

    function getDate() {
        let date = new Date();
        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        let formatDate = date.toLocaleString("uk-UA", options);
    
        return formatDate;
         
    }
})