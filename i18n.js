// i18n (Internationalization) System
let translations = {};
let currentLanguage = localStorage.getItem('language') || 'en';

async function loadTranslations(lang) {
    try {
        const response = await fetch(`i18n/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
        translations = await response.json();
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        applyTranslations();
        // Reload tab content to apply translations
        reloadCurrentTab();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function t(key) {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
        value = value[k];
        if (value === undefined) {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
    }
    return value;
}

function applyTranslations() {
    // Apply translations to elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translated = t(key);
        if (element.tagName === 'INPUT' && element.type === 'button') {
            element.value = translated;
        } else if (element.tagName === 'BUTTON' || element.tagName === 'LABEL') {
            element.textContent = translated;
        } else {
            element.textContent = translated;
        }
    });

    // Apply translations to specific IDs
    const translationMap = {
        'header-title': 'header.title',
        'header-subtitle': 'header.subtitle',
        'dark-mode-toggle': 'header.darkMode',
        'light-mode-message': 'header.lightModeMessage',
        'footer-wip': 'footer.wip',
        'language-label': 'language.select',
        'footer-credits': 'footer.credits'
    };

    Object.entries(translationMap).forEach(([elementId, translationKey]) => {
        const element = document.getElementById(elementId);
        if (element) {
            if (elementId === 'dark-mode-toggle') {
                // Keep button text as-is since it toggles
                const isDarkMode = document.body.classList.contains('dark');
                element.textContent = isDarkMode ? t('header.lightMode') : t('header.darkMode');
            } else if (elementId === 'footer-credits') {
                // Use innerHTML for credits since it contains links
                element.innerHTML = t(translationKey);
            } else {
                element.textContent = t(translationKey);
            }
        }
    });

    // Update language selector value
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }

    // Translate dropdown options for passive boosts
    translateDropdownOptions();
}

function translateDropdownOptions() {
    const notAcquiredText = t('skill.notAcquired');
    
    // Find all selects with "0 (Not acquired)" options and translate them
    document.querySelectorAll('select').forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            if (option.value === '0' && option.textContent.includes('Not acquired')) {
                option.textContent = `0 (${notAcquiredText})`;
            }
        });
    });
}

function reloadCurrentTab() {
    // Clear data-loaded attribute for all tabs so they reload with new language
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.setAttribute('data-loaded', 'false');
    });
    
    // Reload the currently active tab
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const onclickAttr = activeTab.getAttribute('onclick');
        const match = onclickAttr.match(/'([^']+)'/);
        if (match) {
            const tabName = match[1];
            const container = document.getElementById(tabName);
            if (container) {
                loadTabContent(tabName).then(() => {
                    applyTranslations();
                });
            }
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations(currentLanguage);

    // Add language selector event listener
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', async (e) => {
            await loadTranslations(e.target.value);
        });
    }
});
