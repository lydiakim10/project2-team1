async function deleteMe(event) {
    event.preventDefault();
    console.log(this.dataset.id);
    const response = await fetch(`/api/record/${this.dataset.id}`, {
        method: "delete",
        body: JSON.stringify({
            user_id: sessionStorage.getItem('user_id')
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Unable to delete record!");
    }
};

let buttons = document.querySelectorAll('.deleteRecord');
buttons.forEach(button => {
    button.addEventListener('click', deleteMe);
});