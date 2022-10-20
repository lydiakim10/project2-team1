async function logout(event) {
    event.preventDefault();
    const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    sessionStorage.removeItem('user_id');
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);