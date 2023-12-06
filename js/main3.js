document.addEventListener("DOMContentLoaded", function () {
    const loaderCircle = document.getElementById("loader-circle");
    const content = document.querySelector(".content");
    const counter = document.getElementById("counter");
    const loaderImage = document.querySelector(".loader-image");
    const loadingAudio = document.getElementById("loadingAudio");

    // Function to play audio once
    function playAudioOnce() {
        loadingAudio.play();
        // Remove the event listener after the first play
        document.removeEventListener("click", playAudioOnce);
    }

    // Add the event listener to play audio once when the page loads
    document.addEventListener("click", playAudioOnce);

    let count = 0;

    // Mettez à jour le compteur toutes les 50 millisecondes
    const interval = setInterval(function () {
        count += 1;
        counter.innerText = count;

        if (count >= 100) {
            clearInterval(interval);

            // Masquez le cercle de chargement, le compteur et le GIF, affichez le contenu
            loaderCircle.style.display = "none";
            counter.style.display = "none";
            loaderImage.style.display = "none";
            content.style.opacity = 1;
        }
    }, 50); // Ajustez la fréquence de mise à jour du compteur selon vos besoins
});