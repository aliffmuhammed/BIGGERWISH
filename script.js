const products = [
  {id:1,name:"Pocket Mini Fan",price:499,cat:"gadgets",icon:"🌀",badge:"TRENDING"},
  {id:2,name:"Magnetic Cable Holder",price:299,cat:"gadgets",icon:"🔗",badge:"BESTSELLER"},
  {id:3,name:"LED Ambient Lamp",price:899,cat:"home",icon:"💡",badge:"NEW"},
  {id:4,name:"Multi-Purpose Organizer",price:599,cat:"home",icon:"🗂️",badge:""},
  {id:5,name:"Foldable Phone Stand",price:349,cat:"gadgets",icon:"📱",badge:""},
  {id:6,name:"Travel Tech Pouch",price:749,cat:"lifestyle",icon:"🎒",badge:"POPULAR"},
  {id:7,name:"Reusable Cleaning Kit",price:399,cat:"lifestyle",icon:"🧽",badge:""},
  {id:8,name:"Keychain Flashlight",price:249,cat:"gadgets",icon:"🔦",badge:"NEW"}
];
let cart = [];

const grid = document.getElementById("productGrid");
const cartEl = document.getElementById("cart");
const overlay = document.getElementById("overlay");

function renderProducts(filter="all"){
  grid.innerHTML = products.filter(p=>filter==="all"||p.cat===filter).map(p=>`
    <article class="product">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <div class="product-img">${p.icon}</div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <h3>${p.name}</h3>
        <div class="product-bottom"><span class="price">₹${p.price.toLocaleString("en-IN")}</span><button class="add" onclick="addToCart(${p.id})">+</button></div>
      </div>
    </article>`).join("");
}
function addToCart(id){
  const p=products.find(x=>x.id===id);
  const item=cart.find(x=>x.id===id);
  item ? item.qty++ : cart.push({...p,qty:1});
  renderCart(); openCart();
}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
  document.getElementById("cartItems").innerHTML=cart.length ? cart.map(x=>`
    <div class="cart-item">
      <div class="mini">${x.icon}</div>
      <div><strong>${x.name}</strong><br><small>₹${x.price.toLocaleString("en-IN")} × ${x.qty}</small></div>
      <button class="remove" onclick="removeItem(${x.id})">Remove</button>
    </div>`).join("") : "<p style='color:#888;text-align:center;padding-top:40px'>Your cart is empty.</p>";
  document.getElementById("cartTotal").textContent="₹"+cart.reduce((a,x)=>a+x.price*x.qty,0).toLocaleString("en-IN");
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);renderCart()}
function openCart(){cartEl.classList.add("open");overlay.classList.add("show")}
function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
overlay.onclick=closeCart;
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter)});
document.getElementById("checkoutBtn").onclick=()=>alert("Connect your payment/order system here before launch.");
renderProducts();
renderCart();