document.addEventListener('DOMContentLoaded', () => {
    if (typeof events === 'undefined' || typeof translations === 'undefined') {
        const content = document.getElementById('event-details-content');
        if (content) {
            content.innerHTML = `<div class="alert alert-danger">Error: Required data is missing.</div>`;
        }
        console.error("Critical JS files are not loaded.");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    const event = events.find(e => e.id === eventId);

    const detailsContent = document.getElementById('event-details-content');
    const notFoundMessage = document.getElementById('event-not-found');

    if (!event) {
        if (detailsContent) detailsContent.style.display = 'none';
        if (notFoundMessage) notFoundMessage.style.display = 'block';
        return;
    }

    function renderEventDetails(lang) {
        const t = translations[lang] || translations['en'];
        
        document.getElementById('event-title').textContent = t[event.titleKey] || event.title;
        document.getElementById('event-description').textContent = t[event.descKey] || event.desc;
        document.getElementById('event-image').src = event.image;
        document.getElementById('event-image').alt = t[event.titleKey] || event.title;

        document.getElementById('event-date-display').textContent = new Date(event.date).toLocaleDateString(lang, { year:'numeric', month:'long', day:'numeric' });
        
        document.getElementById('event-location-display').textContent = t[event.locationKey] || event.location;
        
        document.getElementById('event-category-display').textContent = t[event.categoryKey] || t[`category_${event.categoryKey}`] || event.category;
        
        document.getElementById('event-price-display').textContent = event.price === 'Free' ? (t['card_price_free'] || 'Free') : event.price;

        document.getElementById('book-tickets-btn').href = event.ticketsLink;
        document.getElementById('watch-promo-btn').href = event.youtubeLink;

        document.getElementById('event-about-text1').textContent = t[`about_${event.titleKey}_text1`] || t['mission_text1'];
        document.getElementById('event-about-text2').textContent = t[`about_${event.titleKey}_text2`] || t['mission_text2'];
    }

    renderEventDetails(localStorage.getItem('lang') || 'en');

    document.addEventListener('languageChanged', () => {
        renderEventDetails(localStorage.getItem('lang') || 'en');
    });
});
