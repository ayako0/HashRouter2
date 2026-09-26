// Base product catalog (Prices are fixed relative to base currency USD)
const products = [
  { id: 1, name: "Wireless Headphones", desc: "Noise-cancelling over-ear headphones.", basePrice: 199.99 },
  { id: 2, name: "Mechanical Keyboard", desc: "RGB backlit tactile mechanical switches.", basePrice: 129.50 },
  { id: 3, name: "Smart Watch", desc: "Fitness tracker with heart-rate monitor.", basePrice: 249.00 },
  { id: 4, name: "Ergonomic Mouse", desc: "Wireless vertical mouse to reduce wrist strain.", basePrice: 79.95 }
];

const baseCurrency = "USD";
const currencySelect = document.getElementById("currency-select");
const productGrid = document.getElementById("product-grid");

// Helper method to visually structure standard localized currency formats
function formatCurrency(amount, currency) {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

// Main operational rendering task
async function updateProductGrid() {
  const targetCurrency = currencySelect.value;
  let exchangeRate = 1;

  // Only issue a network connection fetch task if currencies vary
  if (targetCurrency !== baseCurrency) {
    try {
      const response = await fetch(`https://frankfurter.app{baseCurrency}&to=${targetCurrency}`);
      if (!response.ok) throw new Error("API rate network failure.");
      const data = await response.json();
      exchangeRate = data.rates[targetCurrency];
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      productGrid.innerHTML = `<p style="color: red; grid-column: 1/-1;">Failed to load live exchange rates. Displaying base pricing.</p>`;
      exchangeRate = 1; 
    }
  }

  // Clear previous output text inside grid elements
  productGrid.innerHTML = "";

  // Render individual product cards loop
  products.forEach(product => {
    const convertedAmount = product.basePrice * exchangeRate;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image-placeholder">${product.name}</div>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-description">${product.desc}</p>
      <div class="price-box">
        <div class="original-price">Original: ${formatCurrency(product.basePrice, baseCurrency)}</div>
        <div class="converted-price">${formatCurrency(convertedAmount, targetCurrency)}</div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Set up programmatic trigger bindings
currencySelect.addEventListener("change", updateProductGrid);

// Initial composition rendering step on document setup load
document.addEventListener("DOMContentLoaded", updateProductGrid);
