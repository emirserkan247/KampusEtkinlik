import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function formatDate(dateString) {
    const [day, month, year] = dateString.split("-");

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function createCard(event) {
    return `
        <article class="etkinlik-kart">
            <h3>${event.title}</h3>
            <p>
                ${event.category} &middot;
                <time>${formatDate(event.date)}, ${event.time}</time>
            </p>
            <p>${event.location}</p>
            <p>${event.description}</p>
            <a href="etkinlik-detay.html?id=${event.id}">
                Detayları gör &rarr;
            </a>
        </article>
    `;
}

function render(eventList) {
    list.innerHTML = eventList.map(createCard).join("");
}

if (list.dataset.limit) {
    const upcomingEvents = [...events]
        .sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split("-");
            const [dayB, monthB, yearB] = b.date.split("-");

            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);

            return dateA - dateB;
        })
        .slice(0, Number(list.dataset.limit));

    render(upcomingEvents);
} else {
    render(events);
}

const filterForm = document.querySelector("#filtre-formu");
const searchInput = document.querySelector("#arama");
const categorySelect = document.querySelector("#kategori-filtre");
const resultText = document.querySelector("#sonuc");

if (filterForm) {
    const categories = [...new Set(events.map((event) => event.category))];

    categories.forEach((category) => {
        categorySelect.innerHTML += `
            <option value="${category}">${category}</option>
        `;
    });

    function filterEvents() {
        const searchedText = searchInput.value
            .toLocaleLowerCase("tr-TR")
            .trim();

        const selectedCategory = categorySelect.value;

        const filteredEvents = events.filter((event) => {
            const titleMatches = event.title
                .toLocaleLowerCase("tr-TR")
                .includes(searchedText);

            const descriptionMatches = event.description
                .toLocaleLowerCase("tr-TR")
                .includes(searchedText);

            const textMatches = titleMatches || descriptionMatches;

            const categoryMatches =
                selectedCategory === "" ||
                event.category === selectedCategory;

            return textMatches && categoryMatches;
        });

        render(filteredEvents);

        if (filteredEvents.length === 0) {
            resultText.textContent =
                "Aramanıza uygun etkinlik bulunamadı.";
        } else {
            resultText.textContent =
                `${filteredEvents.length} etkinlik listeleniyor.`;
        }
    }

    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    searchInput.addEventListener("input", filterEvents);
    categorySelect.addEventListener("change", filterEvents);

    filterEvents();
}