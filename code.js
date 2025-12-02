// Course Data with image URLs
const courses = [
  {
    id: 1,
    title: "C Programming Essentials",
    price: 999,
    duration: "4 weeks",
    level: "Beginner",
    image: "https://career.edu.pk/storage/websiteadmin/6745cf8ab14eb.jpg"
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    price: 1499,
    duration: "6 weeks",
    level: "Intermediate",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzJnfk53aqLKxZIfTVAxt5PGLKcjMtuKX-Q&s"
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    price: 1299,
    duration: "5 weeks",
    level: "Beginner",
    image: "https://www.uxdesigninstitute.com/blog/wp-content/uploads/2024/11/101_UX_vs_UI_illustration_blog-1.png"
  },
  {
    id: 4,
    title: "Business Communication Skills",
    price: 799,
    duration: "3 weeks",
    level: "All levels",
    image: "https://kitchen.co/blog/wp-content/uploads/2022/04/business-communication-skills.png"
  }
];

// Navigation Logic
function showPage(page) {
  document.querySelectorAll("main section").forEach(s => s.classList.add("hidden"));
  document.getElementById(page + "Page").classList.remove("hidden");

  if (page === "courses") renderCourses();
  if (page === "cart") renderCart();
}

// User + Login (front-end demo login)
function loginUser() {
  const user = document.getElementById("username").value;
  if (!user.trim()) {
    alert("Please enter a username.");
    return;
  }
  localStorage.setItem("user", user.trim());
  loadUser();
  alert("Logged in as " + user.trim());
  showPage("home");
}

function loadUser() {
  const user = localStorage.getItem("user");
  const welcome = document.getElementById("welcomeUser");
  const loginLink = document.getElementById("loginLink");

  if (user) {
    welcome.textContent = "Hi, " + user;
    loginLink.textContent = "Logout";
    loginLink.onclick = function () {
      localStorage.removeItem("user");
      location.reload();
    };
  } else {
    welcome.textContent = "";
    loginLink.textContent = "Login";
    loginLink.onclick = function () { showPage("login"); };
  }
}

// Cart Logic (front-end)
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  let cart = getCart();
  if (!cart.find(c => c.id === id)) {
    cart.push(courses.find(c => c.id === id));
    saveCart(cart);
    alert("Course added to cart!");
  } else {
    alert("This course is already in your cart.");
  }
}

function renderCourses() {
  const container = document.getElementById("courseList");
  container.innerHTML = "";
  courses.forEach(c => {
    const card = document.createElement("article");
    card.classList.add("course-card");
    card.innerHTML = `
      <img class="course-thumb" src="${c.image}" alt="${c.title}">
      <div>
        <h3 class="course-title">${c.title}</h3>
        <div class="course-meta">${c.duration} • Online</div>
        <div class="course-tags">
          <span class="course-tag">Certificate</span>
          <span class="course-tag">${c.duration}</span>
        </div>
        <div class="price">₹${c.price}</div>
      </div>
      <div class="course-footer">
        <span class="course-level">${c.level}</span>
        <button class="btn btn-primary" style="padding: 7px 14px; font-size: 12px;" onclick="addToCart(${c.id})">
          Add to Cart
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderCart() {
  const cart = getCart();
  const cartItems = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("div");
    empty.classList.add("cart-empty");
    empty.textContent = "Your cart is empty. Go to the Courses page and add some courses.";
    cartItems.appendChild(empty);
    totalEl.textContent = "0";
  } else {
    let total = 0;
    cart.forEach((item, i) => {
      total += item.price;
      const row = document.createElement("div");
      row.classList.add("cart-item");
      row.innerHTML = `
        <div>
          <p class="cart-item-title">${item.title}</p>
          <p class="cart-item-meta">₹${item.price}</p>
        </div>
        <button class="btn btn-outline" style="padding: 5px 10px; font-size: 11px;" onclick="removeItem(${i})">
          Remove
        </button>
      `;
      cartItems.appendChild(row);
    });
    totalEl.textContent = total;
  }

  document.getElementById("checkoutBtn").onclick = function () {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login before checkout.");
      showPage("login");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Order placed successfully for " + user + "!");
    localStorage.removeItem("cart");
    renderCart();
  };
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Initialize
showPage("home");
loadUser();

