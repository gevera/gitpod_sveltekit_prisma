<script>
    import TodoItem from "$lib/components/todo-item.svelte";
    let todos = [1, 2, 3, 4];
    let title = "Todos";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form action="" method="" class="new">
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
            <TodoItem />
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

