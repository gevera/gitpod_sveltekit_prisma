export const enhance = (form: HTMLFormElement, { result }) => {
    // console.log('Form mounted in DOM');

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        try {
            const body = new FormData(form);
            const res = await fetch(form.action, {
                method: form.method,
                headers: {
                    accept: "application/json"
                },
                body
            });

            if (res.ok) {
                result(res, form)
            } else {
                console.error('Response error', await res.text());
            }

        } catch (error) {
            console.error('Could not submit the form!', error)
        }
    }

    form.addEventListener('submit', handleSubmit)

    return {
        destroy() {
            // console.log('Form removed from DOM');
            form.removeEventListener('submit', handleSubmit);
        }
    }
}