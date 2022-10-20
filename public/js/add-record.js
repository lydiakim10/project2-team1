async function addRecord(event) {
    event.preventDefault();

    const type = recordType.value.trim();
    const amount = recordAmount.value.trim();
    const merchant = recordMerchant.value.trim();
    const date = recordDate.value.trim();

    const response = await fetch('/api/record/', {
        method: "post",
        body: JSON.stringify({
            user_id: sessionStorage.getItem('user_id'),
            type: type,
            amount: amount,
            merchant: merchant,
            date: date
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        window.location.reload();
        recordAmount.value = '';
        recordType.value = '';
        recordMerchant.value = '';
        recordDate.value = '';
        getRecords();
        console.log('success');
    } else {
        alert(response.statusText);
    }
}

async function getRecords() {

    const response = await fetch(`/api/record/?user_id=${sessionStorage.getItem('user_id')}`, {
        method: "get",
    });

    const data = await response.json();
    allRecords.innerHTML = '';
    data.forEach(row => {
        let newListItem = document.createElement("li");
        newListItem.innerHTML = `${row.type} ${row.amount} ${row.merchant} ${row.date}`;
        allRecords.appendChild(newListItem);
    });
}
const allRecords = document.getElementById('records');
const recordType = document.querySelector('#type');
const recordAmount = document.querySelector('#amount');
const recordMerchant = document.querySelector('#merchant');
const recordDate = document.querySelector('#date');



document.querySelector('#createRecord').addEventListener('click', addRecord);
// categorySelect.addEventListener('click', getCategories);