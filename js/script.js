'use strict';

const model = {
    items: []
};

const controller = {
    init() {
        this.update();
        view.render();
    },

    addItem(item) {
        model.items.push({text: item, completed: false});
        localStorage.setItem("model", JSON.stringify(model.items));

        view.render();
    },

    completeItem(itemIndex) {
        model.items[itemIndex].completed = !model.items[itemIndex].completed;
        localStorage.setItem("model", JSON.stringify(model.items));

        view.render();
    },

    editItem(item, itemIndex) {
        model.items[itemIndex].text = item;
        localStorage.setItem("model", JSON.stringify(model.items));

        view.render();
    },

    deleteItem(itemIndex) {
        model.items.splice(itemIndex, 1);
        localStorage.setItem("model", JSON.stringify(model.items));

        view.render();
    },

    update() {
        if (localStorage.length > 0) {
            model.items = JSON.parse(localStorage.getItem("model"));
        }
    }
};

const view = {
    clearList() {
        const todoList = document.querySelector(".todo-list");

        todoList.innerHTML = "";
    },

    render() {
        this.clearList();

        if (model.items.length !== 0) {
            model.items.forEach((item, i) => {
                const todoList = document.querySelector(".todo-list");

                const newItem   = document.createElement("li");
                const text      = document.createElement("span");
                const check     = document.createElement("a");
                const edit      = document.createElement("a");
                const cross     = document.createElement("a");
                const iconCheck = document.createElement("i");
                const iconEdit  = document.createElement("i");
                const iconCross = document.createElement("i");

                newItem.classList.add("todo-list_item");
                text.classList.add("item-text");
                check.classList.add("item-complete");
                edit.classList.add("item-edit");
                cross.classList.add("item-delete");
                iconCheck.classList.add("fas");
                iconCheck.classList.add("fa-check");
                iconEdit.classList.add("far");
                iconEdit.classList.add("fa-edit");
                iconCross.classList.add("fas");
                iconCross.classList.add("fa-trash-alt");

                newItem.setAttribute("data-id", i);

                text.textContent = item.text;

                if (item.completed) {
                    text.classList.add("completed");
                }

                check.addEventListener("click", function() {
                    controller.completeItem(i);
                });

                edit.addEventListener("click", function() {
                    view.editItem(i);
                });

                cross.addEventListener("click", function() {
                    controller.deleteItem(i);
                });

                check.append(iconCheck);
                edit.append(iconEdit);
                cross.append(iconCross);
                newItem.append(text);
                newItem.append(check);
                newItem.append(edit);
                newItem.append(cross);

                todoList.append(newItem);
            });
        }
    },

    addItem(e) {
        if (e.code === "Enter" || e.code === "NumpadEnter" || e instanceof MouseEvent) {
            const input = document.querySelector(".add-item");

            if (input.value !== "" && input.value !== " ") {
                controller.addItem(input.value);
                    
                input.value = "";
            }
        }
    },

    editItem(i) {
        const item = document.querySelector(`.todo-list_item[data-id='${i}']`);
        const itemText = item.querySelector(".item-text");
        const text = itemText.textContent;

        itemText.innerHTML = "";

        const input = document.createElement("input");

        input.type = "text";
        input.classList.add("text-edit");
        input.addEventListener("keypress", function(e) {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
                if (input.value !== "" && input.value !== " ") {
                    controller.editItem(input.value, i);
                } else {
                    controller.editItem(text, i);   
                }
            }
        });

        itemText.appendChild(input);
    }
};

controller.init();