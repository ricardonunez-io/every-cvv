const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-medium"><circle cx="12" cy="12" r="4"/><path d="M12 3v1"/><path d="M12 20v1"/><path d="M3 12h1"/><path d="M20 12h1"/><path d="m18.364 5.636-.707.707"/><path d="m6.343 17.657-.707.707"/><path d="m5.636 5.636.707.707"/><path d="m17.657 17.657.707.707"/></svg>`;
const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

const copySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const copiedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;

const favoritedSvg = `<svg fill="#FEBE10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`;
const favoriteSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`;

let showOnlyFavorites = false;

function filterNumbers(numbers) {
  return showOnlyFavorites ? numbers.filter(n => favorites.includes(n)) : numbers;
}

function generateNumbers(digits) {
  const numbers = [];
  const max = Math.pow(10, digits);

  for (let i = 0; i < max; i++) {
    numbers.push(i.toString().padStart(digits, "0"));
  }

  return numbers;
}

const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
function updateTable(digits) {
  const tableBody = document.getElementById("numberTable");
  tableBody.innerHTML = "";
  const numbers = filterNumbers(generateNumbers(digits));

  numbers.forEach((number, index) => {
    const row = document.createElement("tr");

    const numberCell = document.createElement("td");
    numberCell.textContent = number;

    const positionCell = document.createElement("td");
    positionCell.textContent = index + 1;

    const actionsCell = document.createElement("td");
    actionsCell.classList.add("actions");

    const copyButton = document.createElement("button");
    copyButton.innerHTML = copySvg;
    copyButton.classList.remove("copied");
    copyButton.onclick = () => {
      navigator.clipboard.writeText(number);
      copyButton.classList.add("copied");
      copyButton.innerHTML = copiedSvg;
      setTimeout(() => {
        copyButton.classList.remove("copied");
        copyButton.innerHTML = copySvg;
      }, 3000);
    };
    actionsCell.appendChild(copyButton);

    const favoriteButton = document.createElement("button");
    const isFavorited = favorites.includes(number);
    if (isFavorited) {
      favoriteButton.classList.add("favorited");
    }
    favoriteButton.innerHTML = isFavorited ? favoritedSvg : favoriteSvg;
    favoriteButton.onclick = () => {
      const index = favorites.indexOf(number);
      if (index === -1) {
        favorites.push(number);
        favoriteButton.classList.add("favorited");
        favoriteButton.innerHTML = favoritedSvg;
      } else {
        favorites.splice(index, 1);
        favoriteButton.classList.remove("favorited");
        favoriteButton.innerHTML = favoriteSvg;
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    };
    actionsCell.appendChild(favoriteButton);

    row.appendChild(numberCell);
    row.appendChild(positionCell);
    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

document.querySelectorAll("input[name='digits']").forEach(radio => {
  radio.addEventListener("change", (e) => {
    updateTable(parseInt(e.target.value));
  });
});

const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
let isDark = JSON.parse(localStorage.getItem("theme") ?? isDarkPreferred);
document.body.dataset.theme = isDark ? "dark" : "light";
themeToggle.innerHTML = isDark ? darkSvg : lightSvg;

themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("theme", isDark);
  document.body.dataset.theme = isDark ? "dark" : "light";
  themeToggle.innerHTML = isDark ? darkSvg : lightSvg;
});

const favoritesToggle = document.getElementById("favoritesToggle");
if (showOnlyFavorites) {
  favoritesToggle.innerHTML = favoritedSvg;
} else {
  favoritesToggle.innerHTML = favoriteSvg;
}
favoritesToggle.addEventListener("click", () => {
  showOnlyFavorites = !showOnlyFavorites;
  if (showOnlyFavorites) {
    favoritesToggle.innerHTML = favoritedSvg;
  } else {
    favoritesToggle.innerHTML = favoriteSvg;
  }
  favoritesToggle.classList.toggle("favoritesActive");
  updateTable(document.querySelector('input[name="digits"]:checked').value);
});

updateTable(3);
