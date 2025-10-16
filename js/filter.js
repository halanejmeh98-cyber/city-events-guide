function renderEventCard(event, lang) {
    const cardTitle = event.title[lang];
    const cardDesc = event.description[lang];
    const cardCategory = event.category[lang];
    const cardLocation = event.location[lang];
    const cardPrice = event.price[lang];

    const detailsLink = `event.html?id=${event.id}`;

    return `
        <div class="col-lg-4 col-md-6 mb-4 event-card" data-category="${event.rawCategory}">
            <div class="card h-100 shadow-sm">
                <img src="${event.image}" class="card-img-top" alt="${cardTitle}">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-primary mb-2 align-self-start">${cardCategory}</span>
                    <h5 class="card-title">${cardTitle}</h5>
                    <p class="card-text text-muted small"><i class="fas fa-calendar-alt me-2"></i>${event.date}</p>
                    <p class="card-text text-muted small"><i class="fas fa-map-marker-alt me-2"></i>${cardLocation}</p>
                    <p class="card-text">${cardDesc}</p>
                    <div class="mt-auto d-flex justify-content-between align-items-center">
                        <h6 class="text-success mb-0">${cardPrice}</h6>
                        <a href="${detailsLink}" class="btn btn-sm btn-outline-secondary" data-key="card_details_btn">More Details</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadAndFilterEvents() {
    if (typeof events === 'undefined') {
        console.error("events array is not loaded. Check eventData.js");
        return;
    }

    const currentLang = localStorage.getItem('language') || 'en';
    const eventsContainer = document.getElementById('events-container');
    const filterInput = document.getElementById('filter-category');
    
    if (!eventsContainer) return;

    const selectedCategory = filterInput ? filterInput.value : 'all';
    const searchInput = document.getElementById('event-search');
    const dateInput = document.getElementById('event-date');
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const filterDate = dateInput ? dateInput.value : '';

    const filteredEvents = events.filter(event => {
        let passesCategory = (selectedCategory === 'all' || event.rawCategory === selectedCategory);
        
        let passesSearch = true;
        if (searchText) {
            const eventText = (event.title[currentLang] + ' ' + event.description[currentLang] + ' ' + event.location[currentLang]).toLowerCase();
            passesSearch = eventText.includes(searchText);
        }

        let passesDate = true;
        if (filterDate) {
            const eventStartDate = event.date.split(' - ')[0]; 
            passesDate = eventStartDate >= filterDate;
        }

        return passesCategory && passesSearch && passesDate;
    });

    eventsContainer.innerHTML = '';
    
    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = '<div class="col-12"><p class="lead text-center" data-key="events_no_results">No events found matching your criteria.</p></div>';
    } else {
        filteredEvents.forEach(event => {
            eventsContainer.innerHTML += renderEventCard(event, currentLang);
        });
    }
    
    if (typeof applyLocalization === 'function') {
        applyLocalization();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filter-category');
    const searchInput = document.getElementById('event-search');
    const dateInput = document.getElementById('event-date');
    const applyButton = document.getElementById('apply-filters-btn');

    const handleFilterChange = () => {
        loadAndFilterEvents();
    };

    if (filterInput) filterInput.addEventListener('change', handleFilterChange);
    if (searchInput) searchInput.addEventListener('input', handleFilterChange);
    if (dateInput) dateInput.addEventListener('change', handleFilterChange);
    
    if (applyButton) applyButton.addEventListener('click', (e) => { e.preventDefault(); handleFilterChange(); });

    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && filterInput) {
        const options = Array.from(filterInput.options).map(o => o.value);
        if (options.includes(categoryParam)) {
            filterInput.value = categoryParam;
        }
    }
    
    document.addEventListener('languageChanged', loadAndFilterEvents);
});
