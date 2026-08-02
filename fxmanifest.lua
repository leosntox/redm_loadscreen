fx_version 'cerulean'

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

game 'rdr3'

author 'leosntox'
description 'Tela de carregamento e logo do servidor para RedM'
version '1.0'

-- Tela de carregamento
loadscreen 'html/index.html'
loadscreen_manual_shutdown 'yes'

-- Logo exibida durante o jogo
ui_page 'html/hud.html'

client_script 'client.lua'

files {
    -- Loadscreen
    'html/index.html',
    'html/style.css',
    'html/script.js',
    'html/intro.mp4',

    -- Logo durante o jogo
    'html/hud.html',
    'html/hud.css',
    'html/hud.js',
    'html/logo.png'
}