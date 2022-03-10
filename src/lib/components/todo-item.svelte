<script lang="ts">
    export let todo: Todo;
    import { enhance } from '$lib/actions/form';
    export let handleDelete: (res: Response) => void;
    export let handleUpdate: (res: Response) => void;

</script>

<div class="todo" class:done={todo.done}>
    <form
        action={`/api/${todo.uid}.json?_method=patch`}
        method="post"
        aria-label="Check a todo"
        use:enhance={{ result: handleUpdate }}
    >
        <input type="hidden" name="done" id="" value={todo.done ? false : true} />
        <button
            aria-label="Mark todo as {todo.done ? 'not done' : 'done'}"
            class="toggle"
        />
    </form>
    <form
        action={`/api/${todo.uid}.json?_method=patch`}
        method="post"
        class="text"
        use:enhance={{ result: handleUpdate }}
    >
        <input type="text" value={todo.text} name="todo" />
        <button aria-label="Save changes to todo" class="save" />
    </form>
    <form action={`/api/${todo.uid}.json?_method=delete`} method="post" use:enhance={{ result: handleDelete }}>
        <button aria-label="Delete todo" class="delete" />
    </form>
</div>

<style>
    .todo {
        padding: 1rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 1rem;
        align-items: center;
        background-color: #efefef;
        border-radius: 8px;
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));
        margin-bottom: 1rem;
        transition: filter 0.2s, transform 0.2s;
    }

    .todo button {
        border: none;
        cursor: pointer;
        width: 2em;
        height: 2em;
        background-color: transparent;
        background-position: 50% 50%;
        background-repeat: no-repeat;
    }

    .todo input {
        flex: 1;
        padding: 0.6rem !important;
        border-radius: 3px;
        border: 1px solid transparent;
    }

    .todo input:focus {
        border: 1px solid #ff3e00;
        outline: none;
    }

    .toggle {
        border-radius: 50%;
        box-sizing: border-box;
        background-size: 1rem auto;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .text {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1;
    }

    .save {
        opacity: 0;
        transition: opacity 0.4s;
        position: absolute;
        right: 5px;
        cursor: text !important;
        opacity: 0;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMgM2gyLjk5NnY1aC0yLjk5NnYtNXptMTEgMXYyMGgtMjR2LTI0aDIwbDQgNHptLTE3IDVoMTB2LTdoLTEwdjd6bTE1LTQuMTcxbC0yLjgyOC0yLjgyOWgtLjE3MnY5aC0xNHYtOWgtM3YyMGgyMHYtMTcuMTcxeiIvPjwvc3ZnPg==")
            no-repeat center;
    }

    .todo input:focus + .save,
    .save:focus {
        transition: opacity 0.4s;
        width: 2rem;
        height: 2rem;
        opacity: 0.5;
        cursor: pointer !important;
    }

    .delete {
        opacity: 0.3;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNOSAxOWMwIC41NTItLjQ0OCAxLTEgMXMtMS0uNDQ4LTEtMXYtMTBjMC0uNTUyLjQ0OC0xIDEtMXMxIC40NDggMSAxdjEwem00IDBjMCAuNTUyLS40NDggMS0xIDFzLTEtLjQ0OC0xLTF2LTEwYzAtLjU1Mi40NDgtMSAxLTFzMSAuNDQ4IDEgMXYxMHptNCAwYzAgLjU1Mi0uNDQ4IDEtMSAxcy0xLS40NDgtMS0xdi0xMGMwLS41NTIuNDQ4LTEgMS0xczEgLjQ0OCAxIDF2MTB6bTUtMTd2MmgtMjB2LTJoNS43MTFjLjkgMCAxLjYzMS0xLjA5OSAxLjYzMS0yaDUuMzE1YzAgLjkwMS43MyAyIDEuNjMxIDJoNS43MTJ6bS0zIDR2MTZoLTE0di0xNmgtMnYxOGgxOHYtMThoLTJ6Ii8+PC9zdmc+")
            no-repeat center;
        transition: all 0.4s;
    }

    .delete:hover,
    .delete:focus {
        opacity: 0.8;
        transform: scale(1.2);
    }

    button.toggle {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid #444;
        opacity: 0.6;
    }

    .done {
        transform: none;
        opacity: 0.7;
    }

    .done .toggle {
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAxMi4xMTZsMi4wNTMtMS44OTdjMi40MDEgMS4xNjIgMy45MjQgMi4wNDUgNi42MjIgMy45NjkgNS4wNzMtNS43NTcgOC40MjYtOC42NzggMTQuNjU3LTEyLjU1NWwuNjY4IDEuNTM2Yy01LjEzOSA0LjQ4NC04LjkwMiA5LjQ3OS0xNC4zMjEgMTkuMTk4LTMuMzQzLTMuOTM2LTUuNTc0LTYuNDQ2LTkuNjc5LTEwLjI1MXoiLz48L3N2Zz4=")
            no-repeat center;
    }
</style>
