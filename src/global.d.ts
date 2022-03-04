/// <reference types="@sveltejs/kit" />

type Todo = {
    uid: string;
    created_at: Date;
    text: string;
    done: boolean;
}

interface InputApi {
    request: Request;
    data?: {
        todo?: Todo;
        uid?: string;
        text?: string;
        done?: boolean;
    }
}