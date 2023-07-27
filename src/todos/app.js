import todoStore, { Filters } from "../store/todo.store";
import html  from "./app.html?raw";
import { renderTodos, renderPending } from "./use-cases";


const ElementsIDs = { //esto se hace para evitar poner strings como identificadores
    ClearCompletedButton : '.clear-completed',
    TodoList: '.todo-list', //ul element
    NewTodoInput: '#new-todo-input',
    TodoFilters : '.filtro', 
    PendingCountLabel : '#pending-count',

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
        updatePendingCount();
    }   

    const updatePendingCount = () => {
        renderPending( ElementsIDs.PendingCountLabel);
    }


    //cuando la funcion App se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
    //elementId va a decir donde quiero que se renderice eso, el app
        displayTodos();
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
    const clearCompletedButton = document.querySelector ( ElementsIDs.ClearCompletedButton );
    const filtersLIs = document.querySelectorAll(ElementsIDs.TodoFilters ); 
    
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
        if( !element || !isDestroyedElement ) return;

        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();

    });

    filtersLIs.forEach( element => {
        element.addEventListener('click', (element) => { 
            filtersLIs.forEach( e => e.classList.remove('selected'));   
            element.target.classList.add('selected');

            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All)
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending)
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed)
                break;
            }
                displayTodos();
        });
    });
}