async function getStocks() {
    try {
        const response = await fetch('http://localhost:5001/stocks', {
            method: 'GET',
        });
        const data = await response.json();
        renderStocksList(data.items);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderStocksList(stocks) {
    const stocksListElement = document.getElementById('stocks-tbody');
    const noStocksMessage = document.getElementById('no-stocks-message');

    stocksListElement.innerHTML = '';

    if (stocks.length === 0) {
        noStocksMessage.style.display = 'table-row';
        return;
    } else {
        noStocksMessage.style.display = 'none';
    }

    stocks.forEach((stock, index) => {
        const row = document.createElement('tr');
        row.classList.add('text-center');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${stock.code}</td>
            <td>${stock.broker}</td>
            <td>${new Date(stock.purchase_date).toLocaleDateString()}</td>
            <td>${stock.quantity}</td>
            <td>${stock.avg_price_paid.toFixed(2)}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editStock(${stock.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStock(${stock.id})">Deletar</button>
            </td>
        `;
        stocksListElement.appendChild(row);
    });
}

async function deleteStock(id) {
    if (confirm('Tem certeza que deseja deletar essa ação?')) {
        try {
            const response = await fetch(`http://localhost:5001/stock/?id=${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            getStocks();
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function openCreateModal() {
    document.getElementById('stock-id').value = '';
    document.getElementById('stock-form').reset();
    document.getElementById('form-title').innerText = 'Criar Ação';
    document.getElementById('create').style.display = 'block';
}

function editStock(id) {
    fetch(`http://localhost:5001/stock/?id=${id}`)
        .then(response => response.json())
        .then(stock => {
            document.getElementById('stock-id').value = stock.id;
            document.getElementById('code').value = stock.code;
            document.getElementById('avg_price_paid').value = stock.avg_price_paid;
            document.getElementById('quantity').value = stock.quantity;
            document.getElementById('broker').value = stock.broker;
            document.getElementById('purchase_date').value = new Date(stock.purchase_date).toISOString().split('T')[0];
            
            document.getElementById('form-title').innerText = 'Editar Ação';
            document.getElementById('create').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('stock-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const id = document.getElementById('stock-id').value;
    const data = {
        code: document.getElementById('code').value,
        avg_price_paid: parseFloat(document.getElementById('avg_price_paid').value),
        quantity: parseInt(document.getElementById('quantity').value),
        broker: document.getElementById('broker').value,
        purchase_date: document.getElementById('purchase_date').value
    };

    let method, url;
    if (id) { 
        method = 'PUT';
        url = `http://localhost:5001/stocks`;
        data.id = id; 
    } else {  
        method = 'POST';
        url = 'http://localhost:5001/stocks';
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        document.getElementById('create').style.display = 'none';
        getStocks(); 
    } catch (error) {
        console.error('Error:', error);
    }
});

getStocks();