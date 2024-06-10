// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}
// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}
// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}
// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
    toggleEnglishStylesheet(lang); // Toggle English stylesheet
}
// Function to toggle Arabic stylesheet based on language selection
function toggleEnglishStylesheet(lang) {
    const head = document.querySelector('head');
    const link = document.querySelector('#styles-link');
    if (link && lang === 'en') {
        head.removeChild(link); // Remove the old stylesheet link
        const newLink = document.createElement('link');
        newLink.id = 'styles-link';
        newLink.rel = 'stylesheet';
        newLink.href = './css/style-en.css'; // Path to English stylesheet
        head.appendChild(newLink);
    }
}
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'ar';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    toggleEnglishStylesheet(userPreferredLanguage);
});