document.addEventListener("DOMContentLoaded", function() {
  var slideIndex = 0;
  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("fox-con");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000);
  }
  showSlides();

  // document.addEventListener('DOMContentLoaded', function () {
  //     const mobileMenuToggle = document.getElementById('mobile-menu');
  //     const navbar = document.querySelector('.navbar');

  //     mobileMenuToggle.addEventListener('click', function () {
  //         mobileMenuToggle.classList.toggle('active');
  //         navbar.classList.toggle('show');
  //     });
  // }); 


  // Массив для хранения товаров в корзинееееее
  let cartItems = [];

  // Функция открытия корзиныsasa
  function openCart() {
      document.getElementById('cartModal').style.display = 'block';
      updateCartUI();
  }

  // Функция закрытия корзины1
  function closeCart() {
      document.getElementById('cartModal').style.display = 'none';
  }

  // Функция добавления товара в корзину
  function addToCart(item) {
    fetch(`${serverUrl}/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        updateCartUI();
      })
      .catch(error => console.error('Error:', error));
  }
  // Замените 'http://localhost:3000' на фактический URL вашего сервера
  const serverUrl = 'http://localhost:3000';

  // Ваш остальной код...

  // Функция добавления товара в корзину
  function addToCart(item) {
    fetch(`${serverUrl}/addToCart`, {
      // ... остальной код ...
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updateCartUI();
    })
    .catch(error => console.error('Error:', error));
  }

  // Ваш остальной код...

  // Функция оформления заказа
  function checkout() {
    fetch(`${serverUrl}/checkout`, {
      // ... остальной код ...
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      cartItems = [];
      updateCartUI();
      closeCart();
    })
    .catch(error => console.error('Error:', error));
  }

  // Ваш остальной код...


  // Функция обновления интерфейса корзины
  function updateCartUI() {
      const cartList = document.getElementById('cartItems');
      cartList.innerHTML = '';
      cartItems.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          cartList.appendChild(li);
      });
  }

  // Функция оформления заказа

  let card ={
      'shs824': 2,
      'dmm1': 2,
  }
  // корзина фото товаh


  // Функция оформления заказа
  function checkout() {
    fetch(`${serverUrl}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderDetails: cartItems }),
    })
    
      .then(response => response.json())
      .then(data => {
        console.log(data);
        cartItems = []; // Очистка корзины на клиенте после заказа
        updateCartUI();
        closeCart();
      })
      .catch(error => console.error('Error:', error));
  }
  // уменьшение количество товара
  // удаление товара


  let totalAmount = 0;

  function addToTotal(price, quantityId, image) {
    let quantityElement = document.getElementById(quantityId);
    let quantity = parseInt(quantityElement.innerText);
    quantity++;
    quantityElement.innerText = quantity;

    totalAmount += price;
    updateTotalAmount();
    
    // Добавление товара в корзину
    let item = {
      price: price,
      quantity: quantity,
      image: image
    };
    cartItems.push(item);
    updateCartModal();
  }

  function subtractFromTotal(price, quantityId) {
    let quantityElement = document.getElementById(quantityId);
    let quantity = parseInt(quantityElement.innerText);

    if (quantity > 0) {
      quantity--;
      quantityElement.innerText = quantity;
      
      totalAmount -= price;
      updateTotalAmount();

      // Удаление товара из корзины
      cartItems = cartItems.filter(item => item.price !== price || item.quantity !== 0);
      updateCartModal();
    }
  }

  function updateTotalAmount() {
    let totalAmountElement = document.getElementById("totalAmount");
    totalAmountElement.innerText = totalAmount;
  }

  function openCart() {
    let cartModal = document.getElementById("cartModal");
    cartModal.style.display = "block";
  }

  function closeCart() {
    let cartModal = document.getElementById("cartModal");
    cartModal.style.display = "none";
  }

  function updateCartModal() {
    let cartItemsElement = document.getElementById("cartItems");
    cartItemsElement.innerHTML = "";

    let cartModalImage = document.getElementById("cartModalImage");
    cartModalImage.innerHTML = "";

    cartItems.forEach(item => {
      let li = document.createElement("li");
      li.innerText = `Товар: $${item.price}, Количество: ${item.quantity}`;
      cartItemsElement.appendChild(li);

      let img = document.createElement("img");
      img.src = item.image;
      img.alt = "Изображение товара";
      cartModalImage.appendChild(img);
    });

    updateTotalWindowAmount();
  }

  function updateTotalWindowAmount() {
    let totalWindowAmountElement = document.getElementById("totalWindowAmount");
    totalWindowAmountElement.innerText = `$${totalAmount.toFixed(2)}`;
  }

  function checkout() {
    // Получите имя клиента и номер телефона
    const customerName = document.getElementById("customerName").value;
    const customerPhone = document.getElementById("customerPhone").value;

    // Проверьте, заполнены ли оба обязательных поля
    if (customerName === "" || customerPhone === "") {
        alert("Пожалуйста, заполните все обязательные поля (Имя и Телефон)!");
        return; // Завершите выполнение функции, чтобы заказ не подтверждался
    }

    // Создайте объект с деталями заказа
    const orderDetails = {
      customerName: customerName,
      customerPhone: customerPhone,
      items: cartItems,
      totalAmount: totalAmount.toFixed(2),
    };

    // Здесь вы можете отправить orderDetails на сервер или обработать его по необходимости
    // Например, можно использовать AJAX для отправки данных на сервер

    // Выведите сообщение подтверждения
    alert("Заказ оформлен!\nИмя: " + customerName + "\nТелефон: " + customerPhone);

    // По желанию, вы можете сбросить форму и закрыть модальное окно
    resetForm();
    closeCart();
  }

  function resetForm() {
    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
  }
});