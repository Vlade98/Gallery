const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loading");
const loader2 = document.querySelector(".loading-2");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function showLoader(ld) {
  let x = ld;
  x.classList.remove("hide");
}

function hideLoader(ld) {
  let x = ld;
  x.classList.add("hide");
}

let count = 30;
const apiKey = "xFK5RmPaAnqm-22J33Bh8Dn179Yf7VDnR_O9XQ0ixhY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    hideLoader(loader);
    count = 30;
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo, index) => {
    const img = document.createElement("img");
    img.className = "img";
    img.src = photo.urls.small;
    img.alt = photo.alt_description;

    img.addEventListener("load", imageLoaded);
    gallery.appendChild(img);

    img.addEventListener("click", () => {
      currnentImage = index;
      showPopup(photo);
    });
  });
}

async function getPhotos() {
  showLoader(loader);
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error.message);
  }
}

window.addEventListener("scroll", () => {
  if (
    (window.innerHeight + window.scrollY >= document.body.offsetHeight) &
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

function showPopup(photo) {
  showLoader(loader2);
  let popup = document.querySelector(".image-popup");
  const downloadBtn = document.querySelector(".download-btn");
  const closeBtn = document.querySelector(".close-btn");
  const image = document.querySelector(".large-img");
  const likes = document.querySelector(".likes-num");
  const username = document.querySelector(".username");
  const avatar = document.querySelector(".avatar-icon");
  const url = document.querySelector(".portfolio-url");
  const instagram = document.querySelector(".instagram");
  const twitter = document.querySelector(".twitter");

  popup.classList.remove("hide");
  downloadBtn.href = photo.links.html;
  image.src = photo.urls.full;
  likes.textContent = photo.likes;
  username.textContent = photo.user.username;
  avatar.src = photo.user.profile_image.small;
  url.href = photo.user.social.portfolio_url;
  instagram.href = `https://www.instagram.com/${photo.user.social.instagram_username}`;
  twitter.href = `https://twitter.com/${photo.user.social.twitter_username}`;
  image.addEventListener("load", () => hideLoader(loader2));

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hide");
  });
}

getPhotos();
