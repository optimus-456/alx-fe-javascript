// Array to store quotes
const quotes = [
  {
    text: "Is is hard to fail but it is worse to have never tried to succeed.",
    category: "Inspirational",
  },
  {
    text: "That which does not kill us makes us stronger.",
    category: "Inspirational",
  },
  {
    text: "It is hard to fail but it is worse never to have tried to succeed.",
    category: "Love",
  },
  {
    text: "It is not a lack of love, but a lack of friendship that makes unhappy marriages.",
    category: "Love",
  },
  {
    text: "Keep your face to the sunshine and you cannot see a shadow",
    category: "Positive",
  },
  {
    text: "If you look at what you have in life, you’ll always have more",
    category: "Positive",
  },
  {
    text: "A real friend is one who walks in when the rest of the world walks out",
    category: "Friendship",
  },
  {
    text: "Ultimately the bond of all companionship, whether in marriage or in friendship, is conversation",
    category: "Friendship",
  },
  {
    text: "We may have our differences, but nothing’s more important than family",
    category: "Family",
  },
  {
    text: "Family is a life jacket in the stormy sea of life",
    category: "Family",
  },
];

quoteButton = document.getElementById("newQuote");

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteContainer = document.getElementById("quoteDisplay");

  quoteContainer.innerHTML = `"${quote.text}" - "${quote.category}"`;
}

quoteButton.addEventListener("click", showRandomQuote);

function addQuote() {
  const newQuote = document.getElementById("newQuoteText").value;
  const newCategory = document.getElementById("newQuoteCategory").value;

  if (newQuote && newCategory) {
    quotes.push({ text: newQuote, category: newCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("New Quote Successfully Added!");
  } else {
    alert("Please enter both a quote and a category!");
  }
}
