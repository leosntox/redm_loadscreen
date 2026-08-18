fx_version 'cerulean'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
game 'rdr3'
author 'leosntox'
description 'Loadscreen personalizável com vídeos, imagens, música e integração VORP.'
version '2.5.0'

-- LOADSCREEN - Define a página utilizada durante o carregamento.
loadscreen 'html/index.html'
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'

-- HUD - Define a página utilizada para exibir a logo durante o jogo.
ui_page 'html/hud.html'

-- CLIENTE - Script responsável pela integração com o RedM e VORP.
client_script 'client.lua'

-- ARQUIVOS - Recursos utilizados pela loadscreen e HUD.
files {
    -- Loadscreen
    'html/index.html',
    'html/style.css',
    'html/config.js',
    'html/script.js',
    -- HUD
    'html/hud.html',
    'html/hud.css',
    'html/hud.js',
    -- Mídias
    'html/media/*.png',
    'html/media/*.mp4',
    'html/media/*.mp3'
}
