// URL Parameter auslesen
const params = new URLSearchParams(window.location.search);
const rawName = (params.get('name') || 'freund').toLowerCase();
const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
document.getElementById('name').textContent = displayName;

const player = document.getElementById('player');
const playBtn = document.getElementById('playBtn');
const errorEl = document.getElementById('error');

// Audio-Dateien mapping
const audioFile = `audio/${rawName}.m4a`;
const defaultAudio = `audio/default.m4a`;

// Funktion prüfen ob Audio existiert (fetch)
async function checkAudio(url) {
    try {
        const resp = await fetch(url, { method:'HEAD' });
        return resp.ok;
    } catch(e){
        return false;
    }
}

// Play-Button Event
playBtn.addEventListener('click', async () => {
    let url = audioFile;
    const exists = await checkAudio(audioFile);
    if(!exists) {
        url = defaultAudio;
    }
    player.src = url;
    try {
        await player.play();
        playBtn.textContent = '🎶 Wird abgespielt...';
        playBtn.disabled = true;
    } catch(err){
        errorEl.textContent = 'Abspielen fehlgeschlagen. Bitte Datei direkt öffnen.';
        console.error(err);
    }
});
