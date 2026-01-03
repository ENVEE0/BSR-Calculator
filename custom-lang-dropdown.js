// Custom language dropdown with SVG flags
const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'flags/us.svg' },
  { code: 'fr', name: 'Français', flag: 'flags/fr.svg' },
  { code: 'es', name: 'Español', flag: 'flags/es.svg' }
];


function createCustomLangDropdown() {
  const container = document.createElement('div');
  container.className = 'custom-lang-dropdown';

  const selected = document.createElement('button');
  selected.className = 'custom-lang-selected';
  selected.type = 'button';
  container.appendChild(selected);

  const list = document.createElement('div');
  list.className = 'custom-lang-list';
  container.appendChild(list);

  function renderList() {
    list.innerHTML = '';
    LANGUAGES.filter(lang => lang.code !== getLang()).forEach(lang => {
      const item = document.createElement('div');
      item.className = 'custom-lang-item';
      item.innerHTML = `<img src="${lang.flag}" alt="${lang.code}" class="lang-flag"> <span>${lang.name}</span>`;
      item.onclick = () => {
        setLang(lang.code);
        list.style.display = 'none';
        updateSelected();
        renderList();
        if (typeof loadTranslations === 'function') loadTranslations(lang.code);
      };
      list.appendChild(item);
    });
  }
  renderList();

  function updateSelected() {
    const current = LANGUAGES.find(l => l.code === getLang());
    selected.innerHTML = `<img src="${current.flag}" alt="${current.code}" class="lang-flag"> <span>${current.name}</span>`;
  }

  selected.onclick = () => {
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
  };

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) list.style.display = 'none';
  });

  function setLang(code) {
    localStorage.setItem('language', code);
  }
  function getLang() {
    return localStorage.getItem('language') || 'en';
  }

  // On load, if language is not in LANGUAGES, default to 'en'
  if (!LANGUAGES.some(l => l.code === getLang())) {
    setLang('en');
  }
  updateSelected();
  return container;
}

window.addEventListener('DOMContentLoaded', () => {
  const old = document.getElementById('language-select');
  if (old) {
    const parent = old.closest('.pill-control');
    const custom = createCustomLangDropdown();
    parent.replaceChild(custom, old);
  }
});
