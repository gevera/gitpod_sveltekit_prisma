/// <reference types="@sveltejs/kit" />

type Todo = {
    uid: string;
    created_at: Date;
    text: string;
    done: boolean;
}

interface InputApi {
    request: Request;
    todo?: Todo;
    uid?: string;
}