function calculateTotal() {
    let totalCost = 0;
    let taxDiscountMessage = "";
    let items = document.querySelectorAll('input[name="item"]:checked');


    items.forEach(item => {
        let itemProperty = document.querySelector(`input[name="${item.value}-property"]:checked`);
        let itemQuantity = document.querySelector(`select[name="${item.value}-quantity"]`).value;

        let itemCostCell = document.getElementById(`cost${item.value.charAt(item.value.length - 1)}`);
        let costParagraph = itemCostCell.querySelector('p'); 

        if (itemProperty && ["1", "2", "3"].includes(itemQuantity)) {
            let itemCost = parseFloat(itemProperty.value) * parseInt(itemQuantity);
            totalCost += itemCost;
            costParagraph.textContent = `${itemCost.toFixed(2)}`;
        } else if (costParagraph) {
            costParagraph.textContent = `0`;
        }
    });

    document.querySelectorAll('input[name="item"]').forEach(item => {
        if (!item.checked) {
            let itemCostCell = document.getElementById(`cost${item.value.charAt(item.value.length - 1)}`);
            let costParagraph = itemCostCell.querySelector('p'); 
            let itemRadios = document.querySelectorAll(`input[name="${item.value}-property"]`);

            if (itemCostCell) {
                costParagraph.textContent = `0`;
            }

            itemRadios.forEach(radio => {
                radio.checked = false;
            });
        }
    });

    
     let totalCostBeforeTaxElement = document.querySelector('#total-cost-before-tax p');
     totalCostBeforeTaxElement.textContent = `${totalCost.toFixed(0)}$`;

    
    let taxOrDiscount = 0;
    if (totalCost < 200) {
        taxOrDiscount = totalCost * 0.15; // 15% tax
        taxDiscountMessage = `Tax (15%): $${taxOrDiscount.toFixed(2)}`;
        totalCost += taxOrDiscount;
    } else {
        taxOrDiscount = totalCost * 0.15; // 15% discount
        taxDiscountMessage = `Discount (15%): -$${taxOrDiscount.toFixed(2)}`;
        totalCost -= taxOrDiscount;
    }


    document.getElementById('tax-discount').innerText = taxDiscountMessage;
    document.getElementById('total-cost').innerText = `Total Cost: $${totalCost.toFixed(2)}`;


    if (confirm(`Your total cost is $${totalCost.toFixed(2)}. Do you accept?`)) {
        alert("Thank you for your purchase!");
    } else {
        alert("Transaction cancelled.");
    }
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let errors = [];
    let name = document.getElementById('name').value.trim();
    let surname = document.getElementById('surname').value.trim();
    let comments = document.getElementById('comments').value.trim();

    const nameField = document.getElementById('name');
    if (name === "" || !/^[A-Za-z]+$/.test(name)) {
        errors.push("Name is required and should only contain letters.");
        nameField.classList.add('error');
    } else {
        nameField.classList.remove('error');
    }

    const surnameField = document.getElementById('surname');
    if (surname === "" || !/^[A-Za-z]+$/.test(surname)) {
        errors.push("Surname is required and should only contain letters.");
        surnameField.classList.add('error');
    } else {
        surnameField.classList.remove('error');
    }

    const commentsField = document.getElementById('comments');
    if (comments.length < 10) {
        errors.push("Comments must be at least 10 characters long.");
        commentsField.classList.add('error');
    } else {
        commentsField.classList.remove('error');
    }

    if (errors.length > 0) {
        document.getElementById('contact-result').textContent = errors.join(', ');
        document.getElementById('contact-result').style.color = 'red';
    } else {
        document.getElementById('contact-result').textContent = "Your form has been submitted successfully!";
        document.getElementById('contact-result').style.color = 'green';
        document.getElementById('contact-form').reset(); 
    }
});

