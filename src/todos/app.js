import todoStore from "../store/todo.store";
import html  from "./app.html?raw";
import { renderTodos } from "./use-cases";


const ElementsIDs = { //esto se hace para evitar poner strings como identificadores
    TodoList: '.todo-list', //ul element
    NewTodoInput: '#new-todo-input'

}
/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {//para renderizar todos
        const todos = todoStore.getTodos(  todoStore.getCurrentFilter() );
        console.log( todos)
        renderTodos( ElementsIDs.TodoList , todos );
    }   
    //cuando la funcion App se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
    //elementId va a decir donde quiero que se renderice eso, el app
        displayTodos()
    })(); 
    //la funcion autoinbocada se usa aquí porque se necesita
    // la función esté creada y se necesita hacer referencia
    //a elementos html de ahí, aunque también podemos decir 
    //el elemento app es donde está toda mi aplicación

    //lo siguiente se pone debajo de la funcion autoinbocada
    //porque antes no existe
    //Referencias HTML
    const newDescriptionInput = document.querySelector( ElementsIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementsIDs.TodoList);
    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        
        if( event.keyCode !== 13  ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );   
        displayTodos();
        event.target.value = '';  

    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');//el padre mas cercano, el elemento html que tenga ese atribute, no hacia abajo sino hacia el padre
        todoStore.toggleTodo(element.getAttribute('data-id'))
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyedElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');//el padre mas cercano, el elemento html que tenga ese atribute, no hacia abajo sino hacia el padre
        if( !isDestroyedElement ) return;

        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos();
    });

}