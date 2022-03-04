
import type { RequestHandler } from '@sveltejs/kit';
import { api } from './_store'


export const get: RequestHandler = async ({ request }) => await api({ request });


export const post: RequestHandler<{}, FormData> = async ({ request }) => {

    const data = await request.formData();

    const text = data.get("todo").toString();

    const todo: Todo = {
        uid: `${Date.now()}`, //TODO replace uid with uuid from DB
        text,
        done: false,
        created_at: new Date()

    }

    return await api({ request, data: { todo } });
}