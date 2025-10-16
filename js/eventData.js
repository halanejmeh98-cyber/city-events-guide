document.addEventListener('DOMContentLoaded', () => {
    const events = [
        {
            id: 1,
            title: "City Summer Fest 🎵",
            desc: "A three-day music festival featuring local bands.",
            category: "music",
            date: "2025-10-20",
            location: "City Park",
            price: "Free",
            image: "images/event1.jpg",
            ticketsLink: "https://tickets.com/event1",
            youtubeLink: "https://youtube.com/event1"
        },
        {
            id: 2,
            title: "International Food Fair 🌮",
            desc: "Taste dishes from around the world in one location.",
            category: "food",
            date: "2025-11-05",
            location: "Exhibition Center",
            price: "$10",
            image: "images/event2.jpg",
            ticketsLink: "https://tickets.com/event2",
            youtubeLink: "https://youtube.com/event2"
        },
        {
            id: 3,
            title: "Modern Art Exhibition 🎨",
            desc: "Showcasing works from 20 emerging artists.",
            category: "arts",
            date: "2025-11-25",
            location: "City Museum",
            price: "$5",
            image: "images/event3.jpg",
            ticketsLink: "https://tickets.com/event3",
            youtubeLink: "https://youtube.com/event3"
        },
        {
            id: 4,
            title: "Annual City Marathon 🏃",
            desc: "Join the race for health and charity.",
            category: "sports",
            date: "2025-12-05",
            location: "Main Stadium",
            price: "$20",
            image: "images/event4.jpg",
            ticketsLink: "https://tickets.com/event4",
            youtubeLink: "https://youtube.com/event4"
        },
        {
            id: 5,
            title: "Community Fun Day 👨‍👩‍👧",
            desc: "Games, food stalls, and entertainment for all ages.",
            category: "family",
            date: "2025-12-20",
            location: "City Park Pavilion",
            price: "Free",
            image: "images/event5.jpg",
            ticketsLink: "https://tickets.com/event5",
            youtubeLink: "https://youtube.com/event5"
        }
    ];

    document.querySelectorAll('.more-details-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const eventId = parseInt(btn.dataset.id);
            const event = events.find(ev => ev.id === eventId);
            if (!event) return;

            const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
            document.getElementById('eventModalLabel').textContent = event.title;
            document.getElementById('eventModalBody').innerHTML = `
                <img src="${event.image}" class="img-fluid mb-3" alt="${event.title}">
                <p>${event.desc}</p>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Price:</strong> ${event.price}</p>
                <p>
                    <a href="${event.ticketsLink}" target="_blank" class="btn btn-warning me-2">Buy Tickets</a>
                    <a href="${event.youtubeLink}" target="_blank" class="btn btn-danger">Watch on YouTube</a>
                </p>
            `;
            eventModal.show();
        });
    });
});