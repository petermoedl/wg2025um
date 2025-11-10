// URL Parameter auslesen
const params = new URLSearchParams(window.location.search);
const rawName = (params.get('name') || 'freund').toLowerCase();
const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
document.getElementById('name').textContent = displayName;

// Audio Mapping (Dateiname = name.m4a im audio/ Ordner)
const audioFile = `audio/${rawName}_wg2025.m4a`;
const player = document.getElementById('player');
player.src = audioFile;

const playBtn = document.getElementById('playBtn');
const errorEl = document.getElementById('error');

playBtn.addEventListener('click', async () => {
  try {
    await player.play();
    playBtn.textContent = '🎶 Wird abgespielt...';
    playBtn.disabled = true;
  } catch(err){
    errorEl.textContent = 'Abspielen fehlgeschlagen. Bitte Datei direkt öffnen.';
    console.error(err);
  }
});
