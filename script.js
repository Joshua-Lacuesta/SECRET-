const openButton = document.querySelector('#openGift');
const closeButton = document.querySelector('#closeGift');
const letter = document.querySelector('#letter');
const clickNote = document.querySelector('#clickNote');
const answerResult = document.querySelector('#answerResult');
const customLetter = document.querySelector('#customLetter');
const celebration = document.querySelector('#celebration');
const loginScreen = document.querySelector('#loginScreen');
const loginForm = document.querySelector('#loginForm');
const visitorName = document.querySelector('#visitorName');
const loginStatus = document.querySelector('#loginStatus');
const personName = document.querySelector('#personName');
const celebrationName = document.querySelector('#celebrationName');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = visitorName.value.trim();
  if (!name) return;
  loginStatus.textContent = `Welcome, ${name}.`;
  personName.textContent = name;
  celebrationName.textContent = `${name}, tumalikod ka muna`;
  document.querySelector('.scene').classList.add('unlocked');
  loginScreen.classList.add('hidden');
  loginScreen.setAttribute('aria-hidden', 'true');
  document.querySelector('#openGift').focus();
});

const savedLetter = localStorage.getItem('secret-custom-letter');
if (savedLetter) customLetter.textContent = savedLetter;

customLetter.addEventListener('input', () => {
  localStorage.setItem('secret-custom-letter', customLetter.textContent.trim());
});

function floatHearts() {
  for (let index = 0; index < 13; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'float-heart';
    heart.textContent = index % 3 === 0 ? '✦' : '♥';
    heart.style.left = `${45 + Math.random() * 10}%`;
    heart.style.top = `${48 + Math.random() * 12}%`;
    heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 240}px`);
    heart.style.animationDelay = `${index * 45}ms`;
    document.querySelector('.scene').appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }
}

openButton.addEventListener('click', () => {
  letter.classList.add('open');
  letter.setAttribute('aria-hidden', 'false');
  clickNote.textContent = 'THE QUESTION IS OPEN';
  openButton.setAttribute('aria-expanded', 'true');
  floatHearts();
});

closeButton.addEventListener('click', () => {
  letter.classList.remove('open');
  letter.setAttribute('aria-hidden', 'true');
  clickNote.textContent = "CLICK THE HEART WHEN YOU'RE READY";
  openButton.setAttribute('aria-expanded', 'false');
  openButton.focus();
});

document.querySelector('#openLetterVault').addEventListener('click', () => {
  letter.classList.add('open');
  letter.setAttribute('aria-hidden', 'false');
  openButton.setAttribute('aria-expanded', 'true');
});

document.querySelector('#answerYes').addEventListener('click', () => {
  answerResult.textContent = 'You just made my whole day. I cannot wait to start this with you. ♥';
  celebration.classList.add('show');
  celebration.setAttribute('aria-hidden', 'false');
});

document.querySelector('#answerTime').addEventListener('click', () => {
  answerResult.textContent = 'That is okay. Take all the time you need. I will respect your answer. ♥';
});

document.querySelector('#closeCelebration').addEventListener('click', () => {
  celebration.classList.remove('show');
  celebration.setAttribute('aria-hidden', 'true');
});

document.querySelectorAll('.photo-input').forEach((input) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const preview = document.querySelector(`#${input.dataset.preview}`);
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
      preview.parentElement.classList.add('has-image');
      localStorage.setItem(`valentine-${input.dataset.preview}`, reader.result);
    });
    reader.readAsDataURL(file);
  });
});

document.querySelector('#musicInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const player = document.querySelector('#musicPlayer');
    player.src = reader.result;
    document.querySelector('#songName').textContent = file.name;
    localStorage.setItem('valentine-song', reader.result);
    localStorage.setItem('valentine-song-name', file.name);
  });
  reader.readAsDataURL(file);
});

document.querySelectorAll('.photo-input').forEach((input) => {
  const savedPhoto = localStorage.getItem(`valentine-${input.dataset.preview}`);
  if (!savedPhoto) return;
  const preview = document.querySelector(`#${input.dataset.preview}`);
  preview.src = savedPhoto;
  preview.parentElement.classList.add('has-image');
});

const savedSong = localStorage.getItem('valentine-song');
if (savedSong) {
  document.querySelector('#musicPlayer').src = savedSong;
  document.querySelector('#songName').textContent = localStorage.getItem('valentine-song-name') || 'Your favorite song';
}

document.querySelector('#resetMemories').addEventListener('click', () => {
  document.querySelectorAll('.photo-input').forEach((input) => {
    localStorage.removeItem(`valentine-${input.dataset.preview}`);
    input.value = '';
    input.parentElement.classList.remove('has-image');
    document.querySelector(`#${input.dataset.preview}`).removeAttribute('src');
  });
  localStorage.removeItem('valentine-song');
  localStorage.removeItem('valentine-song-name');
  document.querySelector('#musicPlayer').removeAttribute('src');
  document.querySelector('#songName').textContent = 'Add your song here';
});
