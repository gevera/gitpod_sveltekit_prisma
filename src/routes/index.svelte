<script>
   import TodoItem from '$lib/components/todo-item.svelte'
   let todos = [1, 2, 3, 4];
   let title = "Sveltekit Todos"
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form action="" method="">
    <input type="text" name="todo" id="todo_input" aria-label="Add a todo" placeholder="+ tap to add a todo"/>
</form>

<ul>
    {#each todos as todo}
    <li>
        <TodoItem />
    </li>
    {/each}
</ul>