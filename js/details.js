function getEventIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
}

function displayEventNotFound() {
    document.getElementById('event-details-content').style.display = 'none';
    document.getElementById('event-not-found').style.display = 'block'; 
}

function loadEvent() {
    if (typeof events === 'undefined') {
        console.error("Critical error: eventData.js is not loaded.");
        return;
    }

    const eventId = getEventIdFromUrl();
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
        displayEventNotFound(); 
        return;
    }
    
    document.getElementById('event-details-content').style.display = 'block'; 
    document.getElementById('event-not-found').style.display = 'none';

    const currentLang = localStorage.getItem('language') || 'en';

    document.getElementById('event-image').src = event.image;
    document.getElementById('event-image').alt = event.title[currentLang];
    document.getElementById('event-title').textContent = event.title[currentLang];
    document.getElementById('event-description').textContent = event.description[currentLang];

    let formattedDate = event.date;
    try {
        const dateParts = event.date.split(' - ');
        if (dateParts.length === 2) {
            const start = new Date(dateParts[0]).toLocaleDateString(currentLang, { year:'numeric', month:'long', day:'numeric' });
            const end = new Date(dateParts[1]).toLocaleDateString(currentLang, { year:'numeric', month:'long', day:'numeric' });
            formattedDate = `${start} - ${end}`;
        } else if (dateParts.length === 1) {
            formattedDate = new Date(event.date).toLocaleDateString(currentLang, { year:'numeric', month:'long', day:'numeric' });
        }
    } catch (e) {
        formattedDate = event.date;
    }

    document.getElementById('event-date-display').textContent = formattedDate;
    
    document.getElementById('event-location-display').textContent = event.location[currentLang];
    document.getElementById('event-category-display').textContent = event.category[currentLang];
    document.getElementById('event-price-display').textContent = event.price[currentLang];
    
    document.getElementById('event-about-text1').textContent = event.aboutText1[currentLang];
    document.getElementById('event-about-text2').textContent = event.aboutText2[currentLang];

    document.getElementById('book-tickets-btn').href = event.ticketsLink;
    document.getElementById('watch-promo-btn').href = event.promoLink;
}
