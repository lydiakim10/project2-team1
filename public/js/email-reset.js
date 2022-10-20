async function resetPassword(event) {
    const inputEmail = document.getElementById('email-reset-email').value.trim();
    const emailResetBtn = document.getElementById('email-reset-btn');
    event.preventDefault();
    const response = await fetch('/api/user/get-reset-link', {
        method: 'put',
        body: JSON.stringify({
            email: inputEmail
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    const responseData = await response.json();
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
}
document.getElementById('email-reset-btn').addEventListener('click', resetPassword);