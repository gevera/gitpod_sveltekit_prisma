<script context="module" lang="ts">
    import type { Load } from "@sveltejs/kit";
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
    console.log(todos);
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form action="/api/todos.json" method="POST" class="new">
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
            <TodoItem {todo} />
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
