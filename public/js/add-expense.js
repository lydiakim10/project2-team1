const addExpenseForm = async (event) => {
    event.preventDefault();

    const category = document.querySelector('#category-select').value.trim();
    const merchant = document.querySelector('#mercha-input').value.trim();
    const date = document.querySelector('#date-input').value.trim()
    const amount = document.querySelector('#amount-input').value.trim();

    if (category && merchant && date && amount) {
        const response = await fetch(`/api/expense`, {
          method: 'POST',
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
  };
  
    document.querySelector('.addExpenseBtn').addEventListener('click', addExpense);