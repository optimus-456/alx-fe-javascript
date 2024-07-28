const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// Function to load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
    alert("No quotes available for the selected category.");
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

// Function to add a new quote
function addNewQuote() {
  const quoteText = document.getElementById("quoteText").value;
  const quoteCategory = document.getElementById("quoteCategory").value;

  if (quoteText && quoteCategory) {
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    updateCategoryFilter();
    syncWithServer(newQuote);
    document.getElementById("quoteText").value = "";
    document.getElementById("quoteCategory").value = "";
    alert("Quote added successfully!");
  } else {
    alert("Please fill out both fields.");
  }
}

// Function to create the add quote form dynamically
function createAddQuoteForm() {
  const formContainer = document.getElementById("formContainer");

  const form = document.createElement("div");
  form.id = "quoteForm";

  const quoteTextInput = document.createElement("input");
  quoteTextInput.type = "text";
  quoteTextInput.id = "quoteText";
  quoteTextInput.placeholder = "Quote Text";

  const quoteCategoryInput = document.createElement("input");
  quoteCategoryInput.type = "text";
  quoteCategoryInput.id = "quoteCategory";
  quoteCategoryInput.placeholder = "Quote Category";

  const addQuoteButton = document.createElement("button");
  addQuoteButton.id = "addQuote";
  addQuoteButton.textContent = "Add Quote";

  form.appendChild(quoteTextInput);
  form.appendChild(quoteCategoryInput);
  form.appendChild(addQuoteButton);

  formContainer.appendChild(form);

  // Event listener for the add quote button
  addQuoteButton.addEventListener("click", addNewQuote);
}

// Function to export quotes to a JSON file
function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    updateCategoryFilter();
    alert("Quotes imported successfully!");
    showRandomQuote();
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to populate the category filter dynamically
function updateCategoryFilter() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = Array.from(new Set(quotes.map((quote) => quote.category)));
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter
  const lastSelectedFilter = localStorage.getItem("lastSelectedFilter");
  if (lastSelectedFilter) {
    categoryFilter.value = lastSelectedFilter;
  }
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("lastSelectedFilter", selectedCategory);
  showRandomQuote();
}

// Function to get filtered quotes
function getFilteredQuotes() {
  const selectedCategory = localStorage.getItem("lastSelectedFilter") || "all";
  if (selectedCategory === "all") {
    return quotes;
  }
  return quotes.filter((quote) => quote.category === selectedCategory);
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();
    return serverQuotes;
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    return [];
  }
}

// Function to sync quotes with the server
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  if (serverQuotes.length > 0) {
    const mergedQuotes = mergeQuotes(serverQuotes);
    quotes = mergedQuotes;
    saveQuotes();
    updateCategoryFilter();
    showNotification("Quotes synchronized with server.");
  }
}

// Function to sync local data with the server
async function syncWithServer(newQuote = null) {
  try {
    if (newQuote) {
      await fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(newQuote),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    await syncQuotes();
  } catch (error) {
    console.error("Error syncing with server:", error);
  }
}

// Function to merge local and server quotes
function mergeQuotes(serverQuotes) {
  const localQuotes = new Set(quotes.map((q) => JSON.stringify(q)));
  serverQuotes.forEach((quote) => {
    if (!localQuotes.has(JSON.stringify(quote))) {
      quotes.push(quote);
    }
  });
  return quotes;
}

// Function to show notifications
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

// Initial setup
let quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  { text: "Get busy living or get busy dying.", category: "Life" },
  {
    text: "The way to get started is to quit talking and begin doing.",
    category: "Motivation",
  },
];

// Load quotes from local storage if available
loadQuotes();

// Event listeners for buttons
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document
  .getElementById("exportQuotes")
  .addEventListener("click", exportQuotesToJson);

// Initial display of a random quote
showRandomQuote();
createAddQuoteForm();
updateCategoryFilter();

// Load the last viewed quote from session storage if available
const lastViewedQuote = sessionStorage.getItem("lastViewedQuote");
if (lastViewedQuote) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const quote = JSON.parse(lastViewedQuote);
  quoteDisplay.innerHTML = `"${quote.text}" - ${quote.category}`;
}

// Periodically fetch quotes from the server and sync with local storage
setInterval(syncQuotes, 30000); // Sync every 30 seconds
``;
