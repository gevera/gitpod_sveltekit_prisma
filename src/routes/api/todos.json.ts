
import type { RequestHandler } from '@sveltejs/kit';


let todos: Todo[] = [];
export const get: RequestHandler = async () => {
    return {
        status: 200,
        body: {
            todos
        }
    }
}

export const post: RequestHandler<{}, FormData> = async ({ request }) => {


    const data = await request.formData();

    const text = data.get("todo");

    const newTodo: Todo = {
        text: text.toString(),
        done: false,
        created_at: new Date()

    }

    todos = [newTodo, ...todos];

    return {
        status: 303,
        headers: {
            location: '/'
        }

    }
}