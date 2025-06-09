document.getElementById('search-input').addEventListener('input', function (e) {
  const query = e.target.value;
  if (query.length < 3) return;

  fetch(`/api/search?q=${encodeURIComponent(query)}&source=mangafire`)
    .then(res => res.json())
    .then(results => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
      results.forEach(manga => {
        const card = document.createElement('div');
        card.className = 'border rounded p-2 bg-white';
        card.innerHTML = `
          <img src="${manga.cover}" alt="${manga.title}" class="w-full h-48 object-cover rounded mb-2">
          <h3 class="text-lg font-semibold">${manga.title}</h3>
        `;
        resultsDiv.appendChild(card);
      });
    });
});
