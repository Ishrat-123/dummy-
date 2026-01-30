// Utility
function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

// ---------- LOGIN ----------
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    if (user === "admin" && pass === "1234") {
      localStorage.setItem("loggedInUser", user);
      window.location.href = "dashboard.html";
    } else {
      error.textContent = "Invalid username or password";
    }
  });
}

// ---------- AUTH CHECK ----------
const welcomeMsg = document.getElementById("welcomeMsg");
if (welcomeMsg) {
  const user = localStorage.getItem("loggedInUser");
  if (!user) window.location.href = "index.html";
  welcomeMsg.textContent = `Welcome, ${user}!`;
}

// ---------- LOGOUT ----------
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

// ---------- PRODUCTS ----------
const addProductBtn = document.getElementById("addProductBtn");
if (addProductBtn) {
  const tableBody = document.querySelector("[data-testid='product-table-body']");
  const error = document.getElementById("formError");

  function renderProducts() {
    tableBody.innerHTML = "";
    const products = getProducts();

    products.forEach((p, index) => {
      const row = document.createElement("tr");
      row.setAttribute("data-testid", "product-row");

      row.innerHTML = `
        <td data-testid="product-name">${p.name}</td>
        <td data-testid="product-price">${p.price}</td>
        <td>
          <button data-testid="delete-product-${index}">Delete</button>
        </td>
      `;

      row.querySelector("button").addEventListener("click", () => {
        const updated = getProducts();
        updated.splice(index, 1);
        saveProducts(updated);
        renderProducts();
      });

      tableBody.appendChild(row);
    });
  }

  addProductBtn.addEventListener("click", () => {
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();

    if (!name || !price) {
      error.textContent = "All fields are required";
      return;
    }

    const products = getProducts();
    products.push({ name, price });
    saveProducts(products);

    error.textContent = "";
    renderProducts();
  });

  renderProducts();
}
