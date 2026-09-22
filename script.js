const musicButton = document.getElementById("musicButton");
const openButton = document.getElementById("openInvitation");
const cover = document.querySelector(".cover");
const mainContent = document.getElementById("mainContent");
const backgroundMusic = document.getElementById("backgroundMusic");

openButton.addEventListener("click", function () {

    backgroundMusic.play();
    musicButton.classList.remove("hidden");

    cover.classList.add("cover-hide");

    setTimeout(function () {

        cover.style.display = "none";

        mainContent.classList.remove("hidden");
        mainContent.classList.add("show-content");

    }, 1000);

});

musicButton.addEventListener("click", function () {

    if (backgroundMusic.paused) {

        backgroundMusic.play();
        musicButton.textContent = "♪";

    } else {

        backgroundMusic.pause();
        musicButton.textContent = "▶";

    }

});

const weddingDate = new Date("2026-12-12T08:00:00+07:00").getTime();

const countdownTimer = setInterval(function () {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

    clearInterval(countdownTimer);

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
}

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}, 1000);

const galleryImages = document.querySelectorAll(".gallery-grid img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");


galleryImages.forEach(function (image) {

    image.addEventListener("click", function () {

        lightboxImage.src = image.src;

        lightbox.classList.remove("hidden");

    });

});


closeLightbox.addEventListener("click", function () {

    lightbox.classList.add("hidden");

});
lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        lightbox.classList.add("hidden");

    }

});
const copyButtons = document.querySelectorAll(".copy-button");

copyButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const accountNumber = button.dataset.number;

        navigator.clipboard.writeText(accountNumber);

        button.textContent = "Telah disalin ✓";

        setTimeout(function () {

            button.textContent = "Salin Nomor Rekening";

        }, 1800);

    });

});
const rsvpForm = document.getElementById("rsvpForm");
const rsvpMessage = document.getElementById("rsvpMessage");

const scriptURL = "https://script.google.com/macros/s/AKfycbwjT5_oO8_L2HvIeqqL-A8DM5VvomxeHc3FBfpoSw_CPYl6Ef59R1-fgzcOYSdBDK1o/exec";

rsvpForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const guestName =
        document.getElementById("guestName").value.trim();

    const attendance =
        document.getElementById("attendance").value;

    const guestCount =
        document.getElementById("guestCount").value;

    const message =
        document.getElementById("message").value.trim();

    if (guestName === "" || attendance === "") {

        rsvpMessage.textContent =
            "Mohon isi nama dan konfirmasi kehadiran.";

        return;
    }

    const rsvpData = {
        nama: guestName,
        kehadiran: attendance,
        jumlahTamu: guestCount,
        ucapan: message
    };

    rsvpMessage.textContent =
        "Mengirim konfirmasi...";

    try {

        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(rsvpData)
        });

        rsvpMessage.textContent =
            "Terima kasih, " +
            guestName +
            ". Konfirmasi Anda telah dikirim ✓";

        rsvpForm.reset();

    } catch (error) {

        rsvpMessage.textContent =
            "Maaf, konfirmasi belum berhasil dikirim. Silakan coba lagi.";

    }

});
const urlParams = new URLSearchParams(window.location.search);

const guestFromURL = urlParams.get("to");

const guestNameCover =
    document.getElementById("guestNameCover");

const guestNameInput =
    document.getElementById("guestName");


if (guestFromURL) {

    guestNameCover.textContent = guestFromURL;

    guestNameInput.value = guestFromURL;

}
const revealElements = document.querySelectorAll(
    `
    .hero-content,
    .quran-label,
    .quran-divider,
    .quran-arabic,
    .quran-translation,
    .couple-label,
    .couple-card,
    .couple-symbol,
    .story-label,
    .story-section > h2,
    .story-intro,
    .story-item,
    .save-label,
    .big-date,
    .save-text,
    .countdown,
    .event-card,
    .location-box,
    .gallery-label,
    .gallery-section > h2,
    .gallery-intro,
    .gallery-grid img,
    .gift-label,
    .gift-section > h2,
    .gift-intro,
    .gift-card,
    .rsvp-label,
    .rsvp-section > h2,
    .rsvp-intro,
    .rsvp-form
    .closing-small,
    .closing-section h2,
    .closing-text,
    .closing-names,
    .closing-heart
    `
);

revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.60
    }
);


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});