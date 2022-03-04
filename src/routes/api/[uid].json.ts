import type { RequestHandler } from "@sveltejs/kit";

import { api } from './_store'


export const del: RequestHandler = async ({ request, params }) => await api({ request, data: { uid: params.uid } })

export const patch: RequestHandler<{}, FormData> = async ({ request, params }) => {

    const data = await request.formData();

    const text = data.get("todo") && data.get("todo").toString();
    const done = data.get("done") && Boolean(data.get("done"));

    
    if (done) {
        return await api({ request, data: { uid: params.uid, done } })
    }

    if (text) {
        return await api({ request, data: { uid: params.uid, text } })
    }
}

