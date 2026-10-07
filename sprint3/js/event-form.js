import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const messageBox = document.querySelector("#form-mesaj");

let currentEvent = null;

function clearErrors() {
    const errorSpans = document.querySelectorAll(".hata-mesaji");

    errorSpans.forEach((span) => {
        span.textContent = "";
    });

    const fields = form.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
        field.removeAttribute("aria-invalid");
    });
}

function showError(fieldName, message) {
    const field = form.elements[fieldName];
    const errorSpan = document.querySelector(`#${fieldName}-hata`);

    if (field) {
        field.setAttribute("aria-invalid", "true");
    }

    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

if (form.dataset.mode === "guncelle") {
    const id = new URLSearchParams(location.search).get("id");

    currentEvent = events.find((event) => event.id === id);

    if (!currentEvent) {
        form.outerHTML = `
            <div class="hata">
                <p>Güncellenecek etkinlik bulunamadı.</p>
                <a href="etkinlikler.html">Etkinliklere git</a>
            </div>
        `;
    } else {
        form.elements.ad.value = currentEvent.title;
        form.elements.kategori.value = currentEvent.category;

        const [day, month, year] = currentEvent.date.split("-");
        form.elements.tarih.value = `${year}-${month}-${day}`;

        form.elements.saat.value = currentEvent.time;
        form.elements.yer.value = currentEvent.location;
        form.elements.kontenjan.value = currentEvent.capacity;
        form.elements.aciklama.value = currentEvent.description;
    }
}

if (form && (form.dataset.mode !== "guncelle" || currentEvent)) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        clearErrors();
        messageBox.innerHTML = "";

        const formData = new FormData(form);

        const data = {
            title: formData.get("ad").trim(),
            category: formData.get("kategori"),
            date: formData.get("tarih"),
            time: formData.get("saat"),
            location: formData.get("yer").trim(),
            description: formData.get("aciklama").trim(),
            capacity: formData.get("kontenjan")
        };

        const errors = {};

        if (data.title.length < 3) {
            errors.ad = "En az 3 karakter olmalı.";
        }

        if (data.category === "") {
            errors.kategori = "Kategori seçmelisiniz.";
        }

        if (data.date === "") {
            errors.tarih = "Tarih boş bırakılamaz.";
        }

        if (data.time === "") {
            errors.saat = "Saat boş bırakılamaz.";
        }

        if (data.location === "") {
            errors.yer = "Yer boş bırakılamaz.";
        }

        if (data.capacity !== "") {
            const capacityNumber = Number(data.capacity);

            if (
                Number.isNaN(capacityNumber) ||
                capacityNumber < 1 ||
                capacityNumber > 1000
            ) {
                errors.kontenjan =
                    "Kontenjan 1 ile 1000 arasında olmalı.";
            } else {
                data.capacity = capacityNumber;
            }
        }

        Object.keys(errors).forEach((fieldName) => {
            showError(fieldName, errors[fieldName]);
        });

        if (Object.keys(errors).length > 0) {
            messageBox.innerHTML = `
                <div class="hata">
                    Formda hatalı alanlar var.
                </div>
            `;

            return;
        }

        if (form.dataset.mode === "guncelle") {
            data.id = currentEvent.id;

            messageBox.innerHTML = `
                <div class="basari">
                    <p>Etkinlik bilgileri başarıyla güncellendi.</p>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        } else {
            messageBox.innerHTML = `
                <div class="basari">
                    <p>Etkinlik bilgileri başarıyla oluşturuldu.</p>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        }
    });
}