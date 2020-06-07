const list = document.querySelector(".gallery");
const modal = document.querySelector(".lightbox");
const overlay = document.querySelector(".lightbox__content");
const button = document.querySelector(".lightbox__button");
const modalImage = document.querySelector(".lightbox__image");
const images = initialItems.map((item) => item.original);
let imageUrl;

const createItemList = ({ preview, original, description }) => {
  const item = document.createElement("li");
  item.classList.add("gallery__item");
  const link = document.createElement("a");
  link.classList.add("gallery__link");
  link.setAttribute("href", "#");
  const image = document.createElement("img");
  image.classList.add("gallery__image");
  image.setAttribute("src", preview);
  image.setAttribute("data-source", original);
  image.setAttribute("alt", description);
  link.append(image);
  item.append(link);
  return item;
};

const renderList = (list, data) => {
  const items = data.map((item) => createItemList(item));

  list.innerHTML = "";
  list.append(...items);

  return list;
};

renderList(list, initialItems);

const imageChange = (value) => {
  imageUrl = images.reduce((acc, item, i) => {
    if (item === imageUrl) {
      value === "ArrowRight" ? (acc = images[i + 1]) : (acc = images[i - 1]);
    }
    return acc;
  }, "");
};

const handleImgClick = (e) => {
  if (e.target.tagName !== "IMG") {
    return;
  }
  imageUrl = e.target.dataset.source;
  modal.classList.add("is-open");
  modalImage.src = imageUrl;
  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("keydown", handleLeftRightPress);
};

const closeModal = (e) => {
  modalImage.src = "";
  modal.classList.remove("is-open");
  window.removeEventListener("keydown", handleKeyPress);
  window.removeEventListener("keydown", handleLeftRightPress);
};

const handleKeyPress = (e) => {
  if (e.code !== "Escape") {
    return;
  }
  closeModal();
};

const handleLeftRightPress = (e) => {
  const currentImgIndex = images.indexOf(imageUrl);
  const lastImgIndex = images.length - 1;
  if (
    (e.code === "ArrowRight" && currentImgIndex < lastImgIndex) ||
    (e.code === "ArrowLeft" && currentImgIndex > 0)
  ) {
    imageChange(e.code);
  }
  modalImage.src = imageUrl;
};

const handleOverlayClick = (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  closeModal();
};

list.addEventListener("click", handleImgClick);
button.addEventListener("click", closeModal);
overlay.addEventListener("click", handleOverlayClick);
