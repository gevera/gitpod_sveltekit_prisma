// import { writable } from 'svelte/store'

import type { RequestHandler } from "@sveltejs/kit";

// export const todos = writable([]);

// import type { Request} from '@sveltejs/kit';




let todos: Todo[] = [];

export const api = async ({ request, data }: InputApi) => {
    let body = {};
    let status = 200;
    switch (request.method.toUpperCase()) {
        case "GET":
            body = { todos };
            status = 200;
            break;
        case "POST":
            todos = [data.todo, ...todos];
            body = { todo: data.todo };
            status = 201;
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== data.uid)
            status = 200;
            break;
        case "PATCH":
            todos = todos.map(todo => {
                if (todo.uid == data.uid) {
                    if (data.text) todo.text = data.text;
                    if (data.hasOwnProperty('done')) todo.done = !todo.done;
                }
                return todo
            })
            status = 200;
            body = todos.find(t => t.uid == data.uid);
            break;


        default:
            break;
    }

    if (request.method.toUpperCase() !== 'GET' && request.headers.get('accept') !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/'
            }
        }
    }

    return {
        status,
        body
    }
}