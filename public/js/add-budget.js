async function addBudget(event) {
    event.preventDefault();
  
    const budget = document.querySelector('#amount-input').value.trim();
    const month = document.querySelector('#datemonth').value.trim();
  
    if (budget && month) {
      const response = await fetch('/api/budget', {
        method: 'post',
        body: JSON.stringify({
            month,
            budget,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}

document.querySelector('.addbudgetBtn').addEventListener('click', addBudget);