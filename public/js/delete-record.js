async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split("/") [
        window.location.toString().split("/").length -1
    ];

    const response = await fetch (`/api/record/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            record_id: id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace("/");
    } else {
        alert("Unable to delete record!");
    }
};

document.querySelector(".delete-record-btn").addEventListener("click", deleteFormHandler);