// New language button styled like Light Mode button
const LANGUAGES = [
  { code: 'en', name: 'English', flag: 'flags/gb.svg' },
  { code: 'fr', name: 'Français', flag: 'flags/fr.svg' },
  { code: 'es', name: 'Español', flag: 'flags/es.svg' }
];

function createLangModeBtn() {
  const btn = document.createElement('button');
  btn.className = 'lang-mode-btn';
  btn.type = 'button';
  btn.tabIndex = 0;

  const list = document.createElement('div');
  list.className = 'lang-dropdown-list';

  function getLang() {
    return localStorage.getItem('language') || 'en';
  }
  function setLang(code) {
    localStorage.setItem('language', code);
    if (typeof loadTranslations === 'function') loadTranslations(code);
    render();
    list.classList.remove('open');
  }
  function render() {
    const current = LANGUAGES.find(l => l.code === getLang());
    btn.innerHTML = `<img src="${current.flag}" alt="${current.code}" class="lang-flag"> <span>${current.name}</span>`;
    list.innerHTML = '';
    LANGUAGES.filter(l => l.code !== current.code).forEach(lang => {
      const item = document.createElement('button');
      item.className = 'lang-dropdown-item';
      item.type = 'button';
      item.innerHTML = `<img src="${lang.flag}" alt="${lang.code}" class="lang-flag"> <span>${lang.name}</span>`;
      item.onclick = () => setLang(lang.code);
      list.appendChild(item);
    });
  }
  btn.onclick = (e) => {
    e.stopPropagation();
    list.classList.toggle('open');
  };
  document.addEventListener('click', () => list.classList.remove('open'));
  render();
  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.appendChild(btn);
  wrapper.appendChild(list);
  return wrapper;
}


window.addEventListener('DOMContentLoaded', () => {
  // Insert after the dark-mode-btn, inside the same control-group
  const darkBtn = document.getElementById('dark-mode-toggle');
  if (darkBtn && darkBtn.parentElement) {
    const langBtn = createLangModeBtn();
    darkBtn.parentElement.insertBefore(langBtn, darkBtn.nextSibling);
  }
});
