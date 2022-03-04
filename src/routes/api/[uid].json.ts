import type { RequestHandler } from "@sveltejs/kit";

import { api } from './_store'


export const del: RequestHandler = async ({ request, params }) => await api({ request, uid: params.uid })

