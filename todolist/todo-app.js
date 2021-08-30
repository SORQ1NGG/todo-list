(function() {

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        input.addEventListener('input', function(e){
            e.preventDefault();

            if (!input.value) {
                button.setAttribute('disabled', true);
            }else if(input.value){
                button.removeAttribute('disabled');
            }
        });

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {

        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        }
    }

    function createTodoApp(container, title = 'Список дел', lsKey) {

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.button.setAttribute('disabled', true);

        let todos = localStorage.getItem(lsKey) 
                ? JSON.parse(localStorage.getItem(lsKey))
                : [];

        todos.forEach(element => {

            let todoItem = createTodoItem(element.name);
            
            todoList.append(todoItem.item);

                if (element.done === true) {
                    todoItem.item.classList.add('list-group-item-success');
                }

            todoItem.doneButton.addEventListener('click', function() {

                todoItem.item.classList.toggle('list-group-item-success');

                for (let index in todos) {
                    if (todos[index].name === todoItem.item.firstChild.textContent) {
                        todos[index].done = !todos[index].done;
                    }
                }
                localStorage.setItem(lsKey, JSON.stringify(todos));
            }); 

            todoItem.deleteButton.addEventListener('click', function() {

                if(confirm('Вы уверены?')) {

                    todoItem.item.remove();

                    for (let index in todos) {
                        if (todos[index].name === todoItem.item.firstChild.textContent) {
                            todos.splice(index, 1);
                        }
                    }
                    localStorage.setItem(lsKey, JSON.stringify(todos));
                }
            });
        });

        todoItemForm.form.addEventListener('submit', function(e) {

            e.preventDefault();

            let todoItem = createTodoItem(todoItemForm.input.value);

            if (!todoItemForm.input.value) {
                return;
            }else {
                todoItemForm.button.setAttribute('disabled', true);
            }

            let todo = {name: todoItemForm.input.value, done: false};

            todos.push(todo);

            localStorage.setItem(lsKey, JSON.stringify(todos));

            todoItem.doneButton.addEventListener('click', function() {

                todoItem.item.classList.toggle('list-group-item-success');

                for (let index in todos) {
                    if (todos[index].name === todoItem.item.firstChild.textContent) {
                        todos[index].done = !todos[index].done;
                    }
                }
                localStorage.setItem(lsKey, JSON.stringify(todos));
            }); 

            todoItem.deleteButton.addEventListener('click', function() {

                if(confirm('Вы уверены?')) {

                    todoItem.item.remove();

                    for (let index in todos) {
                        if (todos[index].name === todoItem.item.firstChild.textContent) {
                            todos.splice(index, 1);
                        }
                    }
                    localStorage.setItem(lsKey, JSON.stringify(todos));
                }
            });
            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
        });
    }
    window.createTodoApp = createTodoApp;
})();