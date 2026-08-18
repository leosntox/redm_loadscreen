// ELEMENTOS DA LOADSCREEN - Referências aos elementos de vídeo, imagem e música.
const video = document.getElementById("introVideo");
const image = document.getElementById("introImage");
const music = document.getElementById("backgroundMusic");
const muteHint = document.getElementById("muteHint");
const muteHintIcon = document.getElementById("muteHintIcon");
const muteHintText = document.getElementById("muteHintText");
const socialButtons = document.querySelectorAll(".socialLink");

// CONFIGURAÇÃO INICIAL - Valida o modo, as listas e os tempos definidos no config.js.
const mode = LoadscreenConfig.mode;
const videos = Array.isArray(LoadscreenConfig.videos) ? [...LoadscreenConfig.videos] : [];
const images = Array.isArray(LoadscreenConfig.images) ? [...LoadscreenConfig.images] : [];

function getSafeDuration(value, fallback, minimum = 0) {
    const duration = Number(value);
    return Number.isFinite(duration) && duration >= minimum ? duration : fallback;
}

const imageDuration = getSafeDuration(LoadscreenConfig.imageDuration, 5000, 1000);
const imageTransitionDuration = getSafeDuration(LoadscreenConfig.imageTransitionDuration, 800);
const videoTransitionDuration = getSafeDuration(LoadscreenConfig.videoTransitionDuration, 800);

// ESTADO DA LOADSCREEN - Armazena a ordem, posição, temporizadores e estado do áudio.
let playbackOrder = [];
let currentPosition = 0;
let imageTimer = null;
let imageTransitionTimer = null;
let videoTransitionTimer = null;
let isMuted = false;
let consecutiveVideoErrors = 0;
let consecutiveImageErrors = 0;

// ORDEM DE REPRODUÇÃO - Cria a sequência normal ou aleatória das mídias.
function buildPlaybackOrder(items, avoidFirstIndex = null) {
    const order = items.map((_, index) => index);

    if (LoadscreenConfig.randomOrder) {
        for (let i = order.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [order[i], order[randomIndex]] = [order[randomIndex], order[i]];
        }
    }

    // Evita repetir na virada da playlist a mídia que acabou de ser exibida.
    if (order.length > 1 && order[0] === avoidFirstIndex) {
        const replacementPosition = order.findIndex((index) => index !== avoidFirstIndex);
        [order[0], order[replacementPosition]] = [order[replacementPosition], order[0]];
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

    const previousIndex = playbackOrder[currentPosition];
    playbackOrder = buildPlaybackOrder(items, previousIndex);
    return 0;
}

// PLAYER DE VÍDEOS - Controla o carregamento, a transição e a sequência.
function setVideoSource(position) {
    currentPosition = position;
    const videoIndex = playbackOrder[currentPosition];
    video.src = `media/${videos[videoIndex]}`;
    video.load();
    video.style.opacity = "1";
}

function playVideo(position, firstVideo = false) {
    if (videos.length === 0) {
        console.warn("[RedM Loadscreen] Nenhum vídeo configurado.");
        video.style.display = "none";
        setupMuteHint();
        return;
    }

    clearTimeout(videoTransitionTimer);
    const transitionEnabled = LoadscreenConfig.videoTransition === true && !firstVideo;
    video.style.transition = LoadscreenConfig.videoTransition === true
        ? `opacity ${videoTransitionDuration}ms ease`
        : "none";

    if (!transitionEnabled) {
        setVideoSource(position);
        return;
    }

    video.style.opacity = "0";
    videoTransitionTimer = setTimeout(() => setVideoSource(position), videoTransitionDuration);
}

function playNextVideo() {
    const nextPosition = getNextPosition(videos);
    if (nextPosition !== null) {
        playVideo(nextPosition);
    }
}

video.addEventListener("canplay", () => {
    consecutiveVideoErrors = 0;
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

    consecutiveVideoErrors += 1;
    if (consecutiveVideoErrors >= videos.length) {
        console.error("[RedM Loadscreen] Nenhum vídeo válido foi encontrado.");
        video.style.display = "none";
        setupMuteHint();
        return;
    }
    playNextVideo();
});

// PLAYER DE IMAGENS - Controla o slideshow, o tempo e a transição.
function scheduleNextImage() {
    clearTimeout(imageTimer);
    imageTimer = setTimeout(() => {
        const nextPosition = getNextPosition(images);
        if (nextPosition !== null) {
            showImage(nextPosition);
        }
    }, imageDuration);
}

function setImageSource(position, waitForFadeIn = false) {
    currentPosition = position;
    const imageIndex = playbackOrder[currentPosition];
    image.src = `media/${images[imageIndex]}`;
    image.style.opacity = "1";

    if (waitForFadeIn) {
        imageTransitionTimer = setTimeout(scheduleNextImage, imageTransitionDuration);
    } else {
        scheduleNextImage();
    }
}

function showImage(position, firstImage = false) {
    if (images.length === 0) {
        console.warn("[RedM Loadscreen] Nenhuma imagem configurada.");
        image.style.display = "none";
        setupMuteHint();
        return;
    }

    clearTimeout(imageTimer);
    clearTimeout(imageTransitionTimer);
    const transitionEnabled = LoadscreenConfig.imageTransition === true && !firstImage;
    image.style.transition = LoadscreenConfig.imageTransition === true
        ? `opacity ${imageTransitionDuration}ms ease`
        : "none";

    if (!transitionEnabled) {
        setImageSource(position);
        return;
    }

    image.style.opacity = "0";
    imageTransitionTimer = setTimeout(() => {
        setImageSource(position, true);
    }, imageTransitionDuration);
}

image.addEventListener("load", () => {
    consecutiveImageErrors = 0;
});

image.addEventListener("error", () => {
    const imageIndex = playbackOrder[currentPosition];
    const currentFile = images[imageIndex] ?? "desconhecido";
    console.error(`[RedM Loadscreen] Falha ao carregar a imagem: media/${currentFile}`);

    consecutiveImageErrors += 1;
    if (consecutiveImageErrors >= images.length) {
        console.error("[RedM Loadscreen] Nenhuma imagem válida foi encontrada.");
        image.style.display = "none";
        setupMuteHint();
        return;
    }

    clearTimeout(imageTimer);
    clearTimeout(imageTransitionTimer);
    const nextPosition = getNextPosition(images);
    if (nextPosition !== null) {
        showImage(nextPosition);
    }
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
    return String(LoadscreenConfig.muteKey || "")
        .replace("Key", "")
        .replace("Digit", "")
        .toUpperCase();
}

function hasActiveAudioSource() {
    const hasVideoSource = mode === "video" && video.style.display !== "none";
    const hasMusicSource = LoadscreenConfig.useMusic === true && Boolean(LoadscreenConfig.music);
    return hasVideoSource || hasMusicSource;
}

function setupMuteHint() {
    if (!LoadscreenConfig.allowMute || !LoadscreenConfig.showMuteHint || !hasActiveAudioSource()) {
        muteHint.style.display = "none";
        return;
    }

    const validPositions = ["bottom-left", "bottom-right", "top-left", "top-right"];
    const configuredPosition = LoadscreenConfig.muteHintPosition;
    muteHint.className = validPositions.includes(configuredPosition)
        ? configuredPosition
        : "bottom-right";
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

// REDES SOCIAIS - Ativa os botões que possuem link preenchido no config.js.
function setupSocialLinks() {
    const configuredLinks = LoadscreenConfig.socialLinks || {};

    function isValidExternalUrl(value) {
        try {
            const parsedUrl = new URL(value);
            return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";
        } catch (_error) {
            return false;
        }
    }

    socialButtons.forEach((button) => {
        const socialName = button.dataset.social;
        const url = String(configuredLinks[socialName] || "").trim();

        if (!isValidExternalUrl(url)) {
            button.classList.add("disabled");
            button.setAttribute("aria-disabled", "true");
            if (url) {
                console.warn(`[RedM Loadscreen] Link inválido para ${socialName}. Use http:// ou https://.`);
            }
            return;
        }

        button.addEventListener("click", () => {
            if (typeof window.invokeNative === "function") {
                window.invokeNative("openUrl", url);
                return;
            }
            window.open(url, "_blank", "noopener,noreferrer");
        });
    });
}

window.addEventListener("keydown", (event) => {
    if (!LoadscreenConfig.allowMute || event.code !== LoadscreenConfig.muteKey) {
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
    playVideo(0, true);
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
    console.warn(`[RedM Loadscreen] Modo inválido: ${mode}. Use "video" ou "image".`);
}

setupMusic();
applyMuteState();
setupMuteHint();
setupSocialLinks();
