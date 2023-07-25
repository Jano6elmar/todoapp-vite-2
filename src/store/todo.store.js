import { Todo } from '../todos/models/todo.model';
//para limitar la cantidad de opciones 
const Filters = {
    All:'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinto'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del cielo'),
        new Todo('Piedra del espiritu'),
    ], 
    filter: Filters.All//para saber cual es el filtro que quiero aplicar

}

const initStore = () => {
    console.log(state);
    console.log('InitStore');
}

const loadStore = () => {
    throw new Error('Not implemented');
}

const getTodos = ( filter = Filters.All ) => {

    switch( filter ) {
        case Filters.All:
            return [...state.todos];//con spread(...) se regresa un nuevo arreglo
        
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);//(todo.done === false)

        default://para condiciones no definidas
            throw new Error(`Option ${ filter } is not valid`);
    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) =>{
    //insertar un nuevo todo
    //if de una sola linea se pueden dejar así sin llaves
    if ( !description ) throw new Error('Description is required');
    state.todos.push( new Todo(description) );
}
/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId) => {

    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ){
            todo.done = !todo.done;
        }  
        return todo;  
    });
}

const deleteTodo = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId );

}

const deleteCompleted = ( todoId ) => {
    state.todos = state.todos.filter( todo => todo.donde );

}

/**
 * 
 * @param {Filters} newFilter 
 */

const setFilter = ( newFilter = Filters.All ) => {
    
    state.filter = newFilter;
}

const getCurrentFilter = () => {

    return state.filter;

}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}
