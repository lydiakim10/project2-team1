async function resetPassword(event) {
    event.preventDefault();

    const password = document.getElementById('password-reset').value.trim();
    const passwordRetype = document.getElementById('password-retype').value.trim();
    const path = `/api/user/reset-password/${localStorage.getItem('resetString')}`;

    if (password == passwordRetype) {
        const response = await fetch(path, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: password
            })
        });
        if (response.ok) {
            localStorage.removeItem('resetString');
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    } else {
        alert("Passwords don't match!");
    }
}
document.getElementById('pwResetBtn').addEventListener('click', resetPassword);