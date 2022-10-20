async function addCategory(event) {
    event.preventDefault();

    const catName = categoryName.value.trim();
    const catBudget = categoryBudget.value.trim();

    const response = await fetch('/api/category/', {
        method: "post",
        body: JSON.stringify({
            user_id: sessionStorage.getItem('user_id'),
            category_name: catName,
            budget: catBudget,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        window.location.reload();
        genCategorySelector();
        categoryBudget.value = '';
        categoryName.value = '';
    } else {
        alert(response.statusText);
    }
}
async function genCategorySelector() {

    const response = await fetch(`/api/category/?user_id=${sessionStorage.getItem('user_id')}&order_by=ASC`, {
        method: "get",
    });
    const data = await response.json();
    console.log(data);
    categorySelect.innerHTML = '';
    data.forEach(row => {
        let newOption = document.createElement("option");
        newOption.text = row.category_name;
        newOption.value = row.category_name;
        categorySelect.appendChild(newOption);
    });
}
const categorySelect = document.getElementById('type');
const categoryName = document.querySelector('#catName');
const categoryBudget = document.querySelector('#catBudget');
document.querySelector('#createCategory').addEventListener('click', addCategory);