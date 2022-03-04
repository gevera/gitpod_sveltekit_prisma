// import { writable } from 'svelte/store'

import type { RequestHandler } from "@sveltejs/kit";

// export const todos = writable([]);

// import type { Request} from '@sveltejs/kit';




let todos: Todo[] = [];

export const api = async ({request, todo, uid}: InputApi) => {
    let body = {};
    let status = 200;
    switch (request.method.toUpperCase()) {
        case "GET":
            body = { todos };
            status = 200;
            break;
        case "POST":
            todos = [todo, ...todos];
            body = { todo };
            status = 201;
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== uid)
            break;

        default:
            break;
    }

    if(request.method.toUpperCase() !== 'GET') {
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