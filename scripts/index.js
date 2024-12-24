const placesList = document.querySelector(".places__list");  
const cardTemplate = document.querySelector("#card-template").content;  
const popupImage = document.querySelector(".popup_type_image");  
const popupImageContent = popupImage.querySelector(".popup__image");  
const popupCaption = popupImage.querySelector(".popup__caption");  
const popupImageCloseButton = popupImage.querySelector(".popup__close");  

function createCard(data) {  
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);  
  const likeButton = cardElement.querySelector(".card__like-button");  
  const cardImage = cardElement.querySelector(".card__image");  
  const cardTitle = cardElement.querySelector(".card__title");  
  const deleteButton = cardElement.querySelector(".card__delete-button");  

  cardImage.src = data.link;  
  cardImage.alt = data.name;  
  cardTitle.textContent = data.name;  

  likeButton.addEventListener("click", () => {  
    likeButton.classList.toggle("card__like-button_is-active");  
  });  

  deleteButton.addEventListener("click", () => {  
    const cardToDelete = deleteButton.closest(".card");  
    cardToDelete.remove();  
  });  

  cardImage.addEventListener("click", () => {  
    popupImageContent.src = data.link; // Устанавливаем ссылку на изображение  
    popupImageContent.alt = data.name; // Устанавливаем alt изображения  
    popupCaption.textContent = data.name; // Устанавливаем подпись  
    openPopup(popupImage); // Открываем попап  
  });  

  return cardElement;  
}  

function renderInitialCards() {  
  initialCards.forEach((b) => {  
    const cardElement = createCard(b);  
    placesList.append(cardElement);  
  });  
}  

document.addEventListener("DOMContentLoaded", () => {  
  renderInitialCards();  
});  

// Переменные для попапа редактирования профиля  
const profileName = document.querySelector('.profile__title');  
const profileDescription = document.querySelector('.profile__description');  
const nameInput = document.querySelector('.popup__input_type_name');  
const descriptionInput = document.querySelector('.popup__input_type_description');  
const profileEditButton = document.querySelector('.profile__edit-button');  
const popupEditProfile = document.querySelector('.popup_type_edit');  
const popupEditCloseButton = popupEditProfile.querySelector('.popup__close');  
const formElement = document.querySelector('.popup__form[name="edit-profile"]');  

// Переменные для попапа добавления карточки  
const popupNewCard = document.querySelector('.popup_type_new-card');  
const addCardButton = document.querySelector('.profile__add-button');  
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');  
const newCardForm = document.querySelector('.popup__form[name="new-place"]');  

// Универсальные функции открытия и закрытия попапов  
function openPopup(popup) {  
  popup.classList.add('popup_is-opened');  
}  

function closePopup(popup) {  
  popup.classList.remove('popup_is-opened');  
}  

// Открытие и закрытие попапа редактирования профиля  
profileEditButton.addEventListener('click', () => {  
  nameInput.value = profileName.textContent;  
  descriptionInput.value = profileDescription.textContent;  
  openPopup(popupEditProfile);  
});  

popupEditCloseButton.addEventListener('click', () => {  
  closePopup(popupEditProfile);  
});  

// Обработчик отправки формы редактирования профиля  
formElement.addEventListener('submit', (evt) => {  
  evt.preventDefault();  
  profileName.textContent = nameInput.value;  
  profileDescription.textContent = descriptionInput.value;  
  closePopup(popupEditProfile);  
});  

// Открытие и закрытие попапа добавления карточки  
addCardButton.addEventListener('click', () => {  
  openPopup(popupNewCard);  
});  

popupNewCardCloseButton.addEventListener('click', () => {  
  closePopup(popupNewCard);  
});  

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Предотвращаем перезагрузку страницы

  // Получаем данные из формы
  const placeName = newCardForm.querySelector('.popup__input_type_card-name').value;
  const placeLink = newCardForm.querySelector('.popup__input_type_url').value;

  // Создаем новую карточку и добавляем её на страницу
  const newCard = createCard({ name: placeName, link: placeLink });
  document.querySelector('.places__list').prepend(newCard); // Добавляем карточку в начало списка

  // Сбрасываем форму
  newCardForm.reset();

  // Закрываем попап
  closePopup(popupNewCard);
});

// Закрытие попапа изображения  
popupImageCloseButton.addEventListener('click', () => {  
  closePopup(popupImage);  
});  

// Закрытие попапа по нажатию ESC  
document.addEventListener('keydown', (evt) => {  
  if (evt.key === 'Escape') {  
    const openedPopup = document.querySelector('.popup_is-opened');  
    if (openedPopup) {  
      closePopup(openedPopup);  
    }  
  }  
});
// Закрытие попапа при клике на оверлей  
document.addEventListener('click', (evt) => {  
  const openedPopup = document.querySelector('.popup_is-opened');  
  if (openedPopup && evt.target === openedPopup) { // Проверяем, что клик был по оверлею  
    closePopup(openedPopup);  
  }  
});  