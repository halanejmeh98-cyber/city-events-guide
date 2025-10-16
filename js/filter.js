const eventsListContainer = document.getElementById('eventsList');
const eventItems = eventsListContainer ? eventsListContainer.querySelectorAll('.event-item') : [];
const categorySelect = document.getElementById('eventCategory');
let currentSearch = '';
let currentDate = '';
let currentCategory = categorySelect ? categorySelect.value : 'all';

const filterEvents = () => {
    const searchText = currentSearch.toLowerCase().trim();
    const filterDate = currentDate;
    const filterCategory = currentCategory;
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'en'; 
    let resultsFound = false;
    if (eventItems.length === 0) return;
    eventItems.forEach(item => {
        const card = item.querySelector('.card');
        if (!card) return;
        const eventCategory = item.dataset.category;
        const eventDate = item.dataset.date;
        const getTranslatedText = (key) => {
            const element = card.querySelector(`[data-key="${key}"]`);
            return (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) 
                            ? translations[lang][key] 
                            : (element ? element.textContent : '');
        };
        const titleKey = card.querySelector('.card-title').getAttribute('data-key');
        const descKey = card.querySelector('.card-text.text-muted').getAttribute('data-key');
        const eventText = (getTranslatedText(titleKey) + ' ' + getTranslatedText(descKey)).toLowerCase();
        let passesSearch = true;
        let passesDate = true;
        let passesCategory = true;
        if (searchText) passesSearch = eventText.includes(searchText);
        if (filterDate) passesDate = eventDate >= filterDate;
        if (filterCategory !== 'all') passesCategory = eventCategory === filterCategory;
        if (passesSearch && passesDate && passesCategory) {
            item.style.display = 'block'; 
            resultsFound = true;
        } else {
            item.style.display = 'none';
        }
    });
    let noResultsMessage = document.getElementById('noResultsMessage');
    if (!resultsFound) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'noResultsMessage';
            noResultsMessage.className = 'alert alert-warning mt-4 p-3 mb-4 rounded-3 text-center';
            eventsListContainer.appendChild(noResultsMessage);
        }
        const fallbackText = "No events found matching your criteria.";
        const translatedText = (typeof translations !== 'undefined' && translations[lang] && translations[lang]['no_results_message']) 
                                    ? translations[lang]['no_results_message'] 
                                    : fallbackText; 
        noResultsMessage.textContent = translatedText;
        noResultsMessage.style.display = 'block';
    } else {
        if (noResultsMessage) noResultsMessage.style.display = 'none';
    }
};

const applyInitialFilter = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categorySelect) {
        const options = Array.from(categorySelect.options).map(o => o.value);
        if (options.includes(categoryParam)) {
            categorySelect.value = categoryParam;
            currentCategory = categoryParam;
        }
    }
    filterEvents(); 
};

document.addEventListener('DOMContentLoaded', () => {
    const applyFiltersButton = document.getElementById('applyFilters');
    const searchInput = document.getElementById('eventSearch');
    const dateInput = document.getElementById('eventDate');
    if (searchInput) searchInput.addEventListener('input', () => { currentSearch = searchInput.value; });
    if (dateInput) dateInput.addEventListener('change', () => { currentDate = dateInput.value; });
    if (categorySelect) categorySelect.addEventListener('change', () => { currentCategory = categorySelect.value; });
    if (applyFiltersButton) applyFiltersButton.addEventListener('click', filterEvents);
    document.addEventListener('languageChanged', filterEvents);
    applyInitialFilter(); 

    const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
    const eventModalLabel = document.getElementById('eventModalLabel');
    const eventModalBody = document.getElementById('eventModalBody');

    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const eventId = btn.dataset.id;
            const eventCard = document.querySelector(`.event-item .view-details-btn[data-id="${eventId}"]`)?.closest('.event-item');
            if (!eventCard) return;
            const title = eventCard.querySelector('.card-title')?.textContent || '';
            const desc = eventCard.querySelector('.card-text.text-muted')?.textContent || '';
            const date = eventCard.querySelector('.event-date-display')?.textContent || '';
            const location = eventCard.querySelector('.text-primary')?.textContent || '';
            eventModalLabel.textContent = title;
            eventModalBody.innerHTML = `<p>${desc}</p><p><strong>Date:</strong> ${date}</p><p><strong>Location:</strong> ${location}</p>`;
            eventModal.show();
        });
    });

    document.querySelectorAll('.more-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const eventId = btn.dataset.id;
            const eventCard = document.querySelector(`.event-item .view-details-btn[data-id="${eventId}"]`)?.closest('.event-item');
            if (!eventCard) return;
            const title = eventCard.querySelector('.card-title')?.textContent || '';
            const desc = eventCard.querySelector('.card-text.text-muted')?.textContent || '';
            const date = eventCard.querySelector('.event-date-display')?.textContent || '';
            const location = eventCard.querySelector('.text-primary')?.textContent || '';
            eventModalLabel.textContent = title;
            eventModalBody.innerHTML = `<p>${desc}</p><p><strong>Date:</strong> ${date}</p><p><strong>Location:</strong> ${location}</p>`;
            eventModal.show();
        });
    });
});
