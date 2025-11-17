const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".zdj-galeria").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

// zamykanie po kliknięciu w tło
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
