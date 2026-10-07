import { events } from "./data.js";

const container = document.querySelector("#detay");
const pageTitle = document.querySelector("header h1");

const id = new URLSearchParams(location.search).get("id");

const event = events.find((item) => item.id === id);

function formatDate(dateString) {
    const [day, month, year] = dateString.split("-");

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

if (!event) {
    document.title = "Etkinlik bulunamadı";
    pageTitle.textContent = "Etkinlik bulunamadı";

    container.innerHTML = `
        <div class="hata">
            <p>Etkinlik bulunamadı.</p>
            <a href="etkinlikler.html">Listeye dön</a>
        </div>
    `;
} else {
    document.title = event.title;
    pageTitle.textContent = event.title;

    container.innerHTML = `
        <figure>
            <img src="Resim/resim1.png" alt="${event.title} afişi">
            <figcaption><i>Şekil 1: etkinlik afişi</i></figcaption>
        </figure>

        <div>
            <dl>
                <dt>Tarih</dt>
                <dd>
                    <time>
                        ${formatDate(event.date)}, ${event.time}
                    </time>
                </dd>

                <dt>Yer</dt>
                <dd>${event.location}</dd>

                <dt>Kategori</dt>
                <dd>${event.category}</dd>

                <dt>Kontenjan</dt>
                <dd>${event.capacity}</dd>
            </dl>

            <p>${event.description}</p>

            <br>

            <a href="etkinlikler.html">
                &larr; Listeye dön
            </a>

            <br><br>

            <a href="etkinlik-guncelle.html?id=${event.id}">
                Bu etkinliği güncelle
            </a>
        </div>
    `;
}