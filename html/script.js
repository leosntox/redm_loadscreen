// ELEMENTOS DA LOADSCREEN - Referências aos elementos de vídeo, imagem e música.
const video = document.getElementById("introVideo");
const image = document.getElementById("introImage");
const music = document.getElementById("backgroundMusic");
const muteHint = document.getElementById("muteHint");
const muteHintIcon = document.getElementById("muteHintIcon");
const muteHintText = document.getElementById("muteHintText");

// CONFIGURAÇÃO INICIAL - Carrega o modo e as listas definidas no config.js.
const mode = LoadscreenConfig.mode;
const videos = Array.isArray(LoadscreenConfig.videos)
    ? [...LoadscreenConfig.videos]
    : [];
const images = Array.isArray(LoadscreenConfig.images)
    ? [...LoadscreenConfig.images]
    : [];

// ESTADO DA LOADSCREEN - Armazena a ordem, posição atual, temporizador e estado do áudio.
let playbackOrder = [];
let currentPosition = 0;
let imageTimer = null;
let isMuted = false;


// ORDEM DE REPRODUÇÃO - Cria a sequência normal ou aleatória das mídias.
function buildPlaybackOrder(items) {
    const order = items.map((_, index) => index);
    if (!LoadscreenConfig.randomOrder) {
        return order;
    }
    for (let i = order.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [order[i], order[randomIndex]] =
            [order[randomIndex], order[i]];
    }
    return order;
}

// PRÓXIMA MÍDIA - Avança a playlist ou reinicia quando a repetição estiver ativada.
function getNextPosition(items) {
    const nextPosition = currentPosition + 1;
    if (nextPosition < playbackOrder.length) {
        return nextPosition;
    }
    if (!LoadscreenConfig.repeat) {
        return null;
    }
    playbackOrder = buildPlaybackOrder(items);
    return 0;
}


// PLAYER DE VÍDEOS - Controla o carregamento e a sequência dos vídeos.
function playVideo(position) {
    if (videos.length === 0) {
        console.warn("[RedM Loadscreen] Nenhum vídeo configurado.");
        video.style.display = "none";
        return;
    }
    currentPosition = position;
    const videoIndex = playbackOrder[currentPosition];
    video.src = `media/${videos[videoIndex]}`;
    video.load();
}

function playNextVideo() {
    const nextPosition = getNextPosition(videos);
    if (nextPosition === null) {
        return;
    }
    playVideo(nextPosition);
}

video.addEventListener("canplay", () => {
    video.play().catch((error) => {
        console.error(
            "[RedM Loadscreen] Não foi possível reproduzir o vídeo:",
            error.name,
            error.message
        );
    });
});

video.addEventListener("ended", playNextVideo);
video.addEventListener("error", () => {
    const videoIndex = playbackOrder[currentPosition];
    const currentFile = videos[videoIndex] ?? "desconhecido";
    console.error(
        `[RedM Loadscreen] Falha ao carregar: media/${currentFile}`,
        "Código:",
        video.error?.code ?? "desconhecido",
        "Mensagem:",
        video.error?.message ?? "não informada"
    );
});


// PLAYER DE IMAGENS - Controla o slideshow, o tempo e a transição das imagens.
function showImage(position, firstImage = false) {
    if (images.length === 0) {
        console.warn("[RedM Loadscreen] Nenhuma imagem configurada.");
        image.style.display = "none";
        return;
    }
    currentPosition = position;
    const imageIndex = playbackOrder[currentPosition];
    const imagePath = `media/${images[imageIndex]}`;
    const transitionEnabled =
        LoadscreenConfig.imageTransition === true;
    const transitionDuration =
        LoadscreenConfig.imageTransitionDuration || 800;
    image.style.transition = transitionEnabled
        ? `opacity ${transitionDuration}ms ease`
        : "none";
    clearTimeout(imageTimer);
    if (firstImage || !transitionEnabled) {
        image.src = imagePath;
        image.style.opacity = "1";
    } else {
        image.style.opacity = "0";
        setTimeout(() => {
            image.src = imagePath;
            image.style.opacity = "1";
        }, transitionDuration);
    }

    imageTimer = setTimeout(() => {
        const nextPosition = getNextPosition(images);
        if (nextPosition === null) {
            return;
        }
        showImage(nextPosition);
    }, LoadscreenConfig.imageDuration || 5000);
}

image.addEventListener("error", () => {
    const imageIndex = playbackOrder[currentPosition];
    const currentFile = images[imageIndex] ?? "desconhecido";
    console.error(
        `[RedM Loadscreen] Falha ao carregar a imagem: media/${currentFile}`
    );
});


// MÚSICA - Controla o carregamento e a reprodução da música opcional.
function setupMusic() {
    if (!LoadscreenConfig.useMusic) {
        music.pause();
        music.removeAttribute("src");
        return;
    }
    if (!LoadscreenConfig.music) {
        console.warn("[RedM Loadscreen] Nenhuma música configurada.");
        return;
    }
    music.src = `media/${LoadscreenConfig.music}`;
    music.loop = true;
    music.autoplay = true;
    music.play().catch((error) => {
        console.error(
            "[RedM Loadscreen] Não foi possível reproduzir a música:",
            error.name,
            error.message
        );
    });
}

// DICA DE ÁUDIO - Atualiza o ícone, o texto e a posição da mensagem.
function getMuteKeyLabel() {
    if (LoadscreenConfig.muteKey === "Space") {
        return "ESPAÇO";
    }
    return LoadscreenConfig.muteKey
        .replace("Key", "")
        .replace("Digit", "")
        .toUpperCase();
}

function setupMuteHint() {
    if (!LoadscreenConfig.allowMute || !LoadscreenConfig.showMuteHint) {
        muteHint.style.display = "none";
        return;
    }
    const position = LoadscreenConfig.muteHintPosition || "bottom-right";
    muteHint.className = position;
    muteHint.style.display = "flex";
    updateMuteHint();
}

function updateMuteHint() {
    const keyLabel = getMuteKeyLabel();
    muteHintIcon.textContent = isMuted ? "🔇" : "🔊";
    muteHintText.textContent = isMuted
        ? `Pressione [${keyLabel}] para reativar o áudio`
        : `Pressione [${keyLabel}] para silenciar`;
}


// CONTROLE DE ÁUDIO - Silencia ou reativa o áudio do vídeo e da música.
function applyMuteState() {
    video.muted = isMuted;
    music.muted = isMuted;
    updateMuteHint();
}

function toggleMute() {
    isMuted = !isMuted;
    applyMuteState();
}

window.addEventListener("keydown", (event) => {
    if (!LoadscreenConfig.allowMute) {
        return;
    }
    if (event.code !== LoadscreenConfig.muteKey) {
        return;
    }
    event.preventDefault();
    toggleMute();
});


// INICIALIZAÇÃO - Inicia o modo selecionado no config.js.
if (mode === "video") {
    image.style.display = "none";
    video.style.display = "block";
    video.loop = false;
    video.autoplay = true;
    video.playsInline = true;
    playbackOrder = buildPlaybackOrder(videos);
    playVideo(0);
} else if (mode === "image") {
    video.pause();
    video.removeAttribute("src");
    video.style.display = "none";
    image.style.display = "block";
    playbackOrder = buildPlaybackOrder(images);
    showImage(0, true);
} else {
    video.style.display = "none";
    image.style.display = "none";
    console.warn(
        `[RedM Loadscreen] Modo inválido: ${mode}. Use "video" ou "image".`
    );
}

setupMusic();
applyMuteState();
setupMuteHint();