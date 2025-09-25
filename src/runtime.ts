import { products } from "./data/products";

// THEME STATE
const THEME_KEY = "theme";
type Theme = "light" | "dark";

function readTheme(): Theme {
  const saved = (localStorage.getItem(THEME_KEY) as Theme) || (matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
  return saved === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorage.setItem(THEME_KEY, theme);
  const toggles = document.querySelectorAll<HTMLElement>("[data-action='toggle-theme']");
  toggles.forEach(btn => btn.setAttribute("data-theme", theme));
}

function bindThemeToggle() {
  document.querySelectorAll<HTMLElement>("[data-action='toggle-theme']").forEach((el) => {
    el.addEventListener("click", () => {
      const next = (document.documentElement.classList.contains("dark") ? "light" : "dark") as Theme;
      applyTheme(next);
    });
  });
}

export function hydrateRoute(template: string, context: any) {
  // Always update header cart count and theme toggle
  updateCartCountBadge();
  bindThemeToggle();

  if (template === "pages/products.njk") {
    const container = document.getElementById("products-list");
    if (!container) return;
    const list = products;
    container.innerHTML = list.map(cardHtml).join("");
  }

  if (template === "pages/product-detail.njk") {
    hydrateProductDetail(context);
  }

  if (template === "pages/cart.njk") {
    hydrateCartPage();
  }
}

function cardHtml(p: (typeof products)[number]): string {
  return `
    <a class="block border rounded-lg overflow-hidden hover:shadow-md transition" href="/product/${p.id}">
      <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover" />
      <div class="p-4">
        <h3 class="font-semibold mb-2">${p.name}</h3>
        <div class="flex items-center space-x-2">
          <span class="font-bold">$${p.price}</span>
          ${p.originalPrice ? `<span class="text-sm text-muted-foreground line-through">$${p.originalPrice}</span>` : ""}
        </div>
      </div>
    </a>
  `;
}

type CartItem = { id: string; size: string | null; color: string | null; quantity: number };

function readCart(): CartItem[] {
  try { return JSON.parse(localStorage.getItem("cart-simple") || "[]"); } catch { return []; }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem("cart-simple", JSON.stringify(items));
}

export function addToCart(id: string, quantity: number) {
  const items = readCart();
  const idx = items.findIndex(i => i.id === id && i.size === null && i.color === null);
  if (idx >= 0) items[idx].quantity += quantity; else items.push({ id, size: null, color: null, quantity });
  writeCart(items);
  updateCartCountBadge();
}

function updateCartCountBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const items = readCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  badge.textContent = String(count);
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

function hydrateProductDetail(context: any) {
  const product = context?.product as (typeof products)[number] | undefined;
  if (!product) return;

  const sizeSelect = document.querySelector<HTMLSelectElement>("#size-select");
  const colorSelect = document.querySelector<HTMLSelectElement>("#color-select");
  const qtyMinus = document.querySelector<HTMLButtonElement>("#qty-minus");
  const qtyPlus = document.querySelector<HTMLButtonElement>("#qty-plus");
  const qtyValue = document.querySelector<HTMLSpanElement>("#qty-value");
  const addBtn = document.querySelector<HTMLButtonElement>("[data-action='add-to-cart']");

  let quantity = 1;
  function updateQtyDisplay() {
    if (qtyValue) qtyValue.textContent = String(quantity);
  }
  qtyMinus?.addEventListener("click", () => { quantity = Math.max(1, quantity - 1); updateQtyDisplay(); });
  qtyPlus?.addEventListener("click", () => { quantity = quantity + 1; updateQtyDisplay(); });
  updateQtyDisplay();

  addBtn?.addEventListener("click", () => {
    const selSize = sizeSelect?.value || null;
    const selColor = colorSelect?.value || null;
    if (!selSize || !selColor) { alert("Please select size and color"); return; }
    addVariantToCart(product.id, selSize, selColor, quantity);
    alert("Added to cart");
  });
}

function addVariantToCart(id: string, size: string, color: string, quantity: number) {
  const items = readCart();
  const idx = items.findIndex(i => i.id === id && i.size === size && i.color === color);
  if (idx >= 0) items[idx].quantity += quantity; else items.push({ id, size, color, quantity });
  writeCart(items);
  updateCartCountBadge();
}

function hydrateCartPage() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const clearBtn = document.getElementById("cart-clear");
  if (!container || !totalEl) return;

  function productById(id: string) { return products.find(p => p.id === id)!; }

  function renderCart() {
    const items = readCart();
    if (items.length === 0) {
      container.innerHTML = '<p class="text-muted-foreground">Your cart is empty.</p>';
      totalEl.textContent = "$0.00";
      updateCartCountBadge();
      return;
    }
    container.innerHTML = items.map((i, idx) => {
      const p = productById(i.id);
      const line = p.price * i.quantity;
      return `
        <div class="flex items-center justify-between py-4 border-b" data-index="${idx}">
          <div class="flex items-center gap-4">
            <img src="${p.image}" alt="${p.name}" class="w-16 h-16 object-cover rounded" />
            <div>
              <div class="font-semibold">${p.name}</div>
              <div class="text-sm text-muted-foreground">${i.size ?? ''} ${i.color ?? ''}</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="btn-qty" data-action="dec">-</button>
            <span>${i.quantity}</span>
            <button class="btn-qty" data-action="inc">+</button>
          </div>
          <div class="w-24 text-right">$${line.toFixed(2)}</div>
          <button class="text-destructive" data-action="remove">Remove</button>
        </div>
      `;
    }).join("");

    const sum = items.reduce((s, i) => s + productById(i.id).price * i.quantity, 0);
    totalEl.textContent = `$${sum.toFixed(2)}`;
    updateCartCountBadge();

    container.querySelectorAll<HTMLButtonElement>("button[data-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        const row = btn.closest('[data-index]') as HTMLElement;
        const index = Number(row.dataset.index);
        const action = btn.getAttribute('data-action');
        const items = readCart();
        if (action === 'inc') items[index].quantity += 1;
        if (action === 'dec') items[index].quantity = Math.max(1, items[index].quantity - 1);
        if (action === 'remove') items.splice(index, 1);
        writeCart(items);
        renderCart();
      });
    });
  }

  clearBtn?.addEventListener("click", () => { writeCart([]); renderCart(); });
  renderCart();
}

// Initialize theme immediately
applyTheme(readTheme());


