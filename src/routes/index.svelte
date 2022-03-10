<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
    import { enhance } from "$lib/actions/form";
    export const load: Load = async ({ fetch }) => {
        const res = await fetch("/api/todos.json");

        if (res.ok) {
            const { todos } = await res.json();
            return {
                props: {
                    todos,
                },
            };
        }
        const { message } = await res.json();
        return {
            error: new Error(message),
        };
    };
</script>

<script lang="ts">
    import TodoItem from "$lib/components/todo-item.svelte";
    let title = "Todos";
    export let todos: Todo[];
    const handleNewTodo = async (res: Response, form: HTMLFormElement) => {
        const { todo }: { todo: Todo } = await res.json();
        todos = [todo, ...todos];
        form.reset();
    };

    const handleUpdate = async (res: Response) => {
        const updatedTodo = await res.json();
        todos = todos.map(t => t.uid === updatedTodo.uid ? updatedTodo : t)
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form
    action="/api/todos.json"
    method="POST"
    class="new"
    use:enhance={{ result: handleNewTodo }}
>
    <input
        type="text"
        name="todo"
        id="todo_input"
        aria-label="Add a todo"
        placeholder="+ tap to add a todo"
    />
</form>

<ul>
    {#each todos as todo}
        <li>
            <TodoItem
                {todo}
                {handleUpdate}
                handleDelete={() => {
                    todos = todos.filter((t) => t.uid !== todo.uid);
                }}
            />
        </li>
    {/each}
</ul>

<style>
    .new {
        margin-bottom: 1rem;
        text-align: center;
    }

    .new > input {
        border-radius: 6px;
        border: 1px solid transparent;
        background: none;
        padding: 1rem;
        font-size: 1.5rem;
        max-width: 100%;
        text-align: center;
    }

    .new > input:focus {
        outline: none;
        border: 1px solid #ff3e00 !important;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>
