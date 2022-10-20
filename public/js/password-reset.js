const password = document.getElementById('password-reset');
const passwordRetype = docuement.getElementById('password-retype');

async function resetPassword(event) {
    if (password.value() === passwordRetype.value()) {
        event.preventDefault();
        const response = await fetch('/api/user/reset', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    } else {
        alert("Passwords don't match!");
    }
}