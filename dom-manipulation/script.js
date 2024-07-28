// Function to load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
  populateCategories();
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
  populateCategories();
}

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const filteredQuotes = filterQuotesByCategory();
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

// Function to add a new quote
function addNewQuote() {
  const quoteText = document.getElementById("quoteText").value;
  const quoteCategory = document.getElementById("quoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
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

// Function to populate the category filter
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map((quote) => quote.category))];
  categoryFilter.innerHTML = categories
    .map((category) => `<option value="${category}">${category}</option>`)
    .join("");
}

// Function to filter quotes based on selected category
function filterQuotes() {
  showRandomQuote();
}

// Function to get filtered quotes
function filterQuotesByCategory() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  if (selectedCategory === "all") {
    return quotes;
  }
  return quotes.filter((quote) => quote.category === selectedCategory);
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
    alert("Quotes imported successfully!");
    showRandomQuote();
  };
  fileReader.readAsText(event.target.files[0]);
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

// Load the last viewed quote from session storage if available
const lastViewedQuote = sessionStorage.getItem("lastViewedQuote");
if (lastViewedQuote) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const quote = JSON.parse(lastViewedQuote);
  quoteDisplay.innerHTML = `"${quote.text}" - ${quote.category}`;
}
