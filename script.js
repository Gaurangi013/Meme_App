const searchInput = document.getElementById("searchInput");
const memeGrid = document.getElementById("memeGrid");
// Fetch meme templates
async function fetchMemeTemplates() {
  try {
    memeGrid.innerHTML = '<p class="loading">Loading meme templates...</p>';

    const response = await fetch("https://api.imgflip.com/get_memes");

    if (!response.ok) {
      throw new Error("Failed to fetch meme templates");
    }

    const data = await response.json();
    return data.data.memes;
  } catch (error) {
    memeGrid.innerHTML = `
                    <p class="error">
                        Error: ${error.message}<br>
                        Unable to load meme templates
                    </p>
                `;
    return [];
  }
}

function renderMemeTemplates(templates) {
  memeGrid.innerHTML = "";

  if (templates.length === 0) {
    memeGrid.innerHTML = '<p class="no-results">No meme templates found</p>';
    return;
  }

  templates.forEach((meme) => {
    const memeCard = document.createElement("div");
    memeCard.classList.add("meme-card");
    memeCard.innerHTML = `
                    <img src="${meme.url}" alt="${meme.name}">
                    <div class="meme-card-title">${meme.name}</div>
                `;
    memeGrid.appendChild(memeCard);
  });
}

function filterMemeTemplates(templates, searchTerm) {
  return templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

async function initMemeTemplateViewer() {
  const allMemeTemplates = await fetchMemeTemplates();
  let currentTemplates = allMemeTemplates;

  renderMemeTemplates(currentTemplates);

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    const filteredTemplates = filterMemeTemplates(allMemeTemplates, searchTerm);
    renderMemeTemplates(filteredTemplates);
  });
}

initMemeTemplateViewer();
