// Array of quote objects
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

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Function to add a new quote
function addNewQuote() {
  const quoteText = document.getElementById("quoteText").value;
  const quoteCategory = document.getElementById("quoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
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

// Event listeners for buttons
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Initial setup
showRandomQuote();
createAddQuoteForm();
