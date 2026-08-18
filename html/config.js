const LoadscreenConfig = {

    // MODO DA LOADSCREEN - Escolha entre reprodução de vídeos ou slideshow de imagens.
    mode: "video", // "video" ou "image"

    // VÍDEOS - Arquivos reproduzidos quando o modo selecionado for "video".
    videos: [
        "intro.mp4"
    ],

    videoTransition: true,            // Ativa a transição entre vídeos.
    videoTransitionDuration: 800,     // Tempo da transição (ms).

    // IMAGENS - Arquivos exibidos quando o modo selecionado for "image".
    images: [
        "img1.png",
        "img2.png",
        "img3.png"
    ],

    imageTransition: true,            // Ativa a transição entre imagens.
    imageTransitionDuration: 1600,     // Tempo da transição (ms).
    imageDuration: 5000,              // Tempo de exibição de cada imagem (ms).

    // ORDEM E REPETIÇÃO - Controla a ordem das mídias e a repetição da playlist.
    randomOrder: false,               // Reproduz as mídias em ordem aleatória.
    repeat: true,                     // Reinicia a playlist ao finalizar.

    // MÚSICA - Música opcional reproduzida durante a loadscreen.
    useMusic: false,                   // Ativa ou desativa a música.
    music: "musica.mp3",

    // CONTROLE DE ÁUDIO - Permite silenciar ou reativar o áudio pelo teclado.
    allowMute: true,
    muteKey: "Space",

    // DICA DE ÁUDIO - Exibe uma mensagem informando como silenciar ou reativar o áudio.
    showMuteHint: true,
    muteHintPosition: "bottom-right", // "bottom-left", "bottom-right", "top-left" ou "top-right"

    // REDES SOCIAIS - Preencha os links para ativar os botões da loadscreen.
    socialLinks: {
        discord: "https://discord.gg/vorp-core",
        tiktok: "https://www.tiktok.com/@leosntox",
        instagram: "https://www.instagram.com/leosntox/"
    }
};
