local loadscreenClosed = false
local gameWorldAudioMuted = false
local audioSceneStartedByResource = false
local muteAudioScene = "CHARACTER_CHANGE_IN_SKY_SCENE"

-- ÁUDIO DO MUNDO - Liga ou desliga o bloqueio temporário durante a loadscreen.
local function setGameWorldAudioMuted(muted)
    gameWorldAudioMuted = muted

    if muted then
        -- Não assume o controle de uma cena que já foi iniciada por outro recurso.
        if not IsAudioSceneActive(muteAudioScene) then
            audioSceneStartedByResource = StartAudioScene(muteAudioScene) == true
        end
        return
    end

    -- Restaura somente a cena iniciada por este recurso.
    if audioSceneStartedByResource then
        StopAudioScene(muteAudioScene)
        audioSceneStartedByResource = false
    end
end

-- FECHAMENTO DA LOADSCREEN - Encerra a loadscreen e mantém a logo escondida.
local function closeLoadscreen()
    if loadscreenClosed then
        return
    end
    loadscreenClosed = true
    setGameWorldAudioMuted(false)
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
    SendNUIMessage({
        action = "hideLogo"
    })
end

-- INICIALIZAÇÃO - Bloqueia o áudio do mundo e inicia com a logo escondida.
CreateThread(function()
    setGameWorldAudioMuted(true)
    SendNUIMessage({
        action = "hideLogo"
    })

    -- Mantém o bloqueio durante transições nas quais o RedM reinicia as cenas de áudio.
    while gameWorldAudioMuted do
        Wait(250)

        if gameWorldAudioMuted and not IsAudioSceneActive(muteAudioScene) then
            setGameWorldAudioMuted(true)
        end
    end
end)

-- FECHAMENTO MANUAL - Permite que outros recursos encerrem a loadscreen.
RegisterNetEvent("redm_loadscreen:close", function()
    closeLoadscreen()
end)

-- INTEGRAÇÃO COM VORP - Fecha a loadscreen ao iniciar a criação de personagem.
RegisterNetEvent("vorpcharacter:startCharacterCreator", function()
    closeLoadscreen()
end)

-- CONTROLE DA LOGO - Exibe a logo durante o jogo.
RegisterNetEvent("redm_loadscreen:showLogo", function()
    SendNUIMessage({
        action = "showLogo"
    })
end)

-- CONTROLE DA LOGO - Oculta a logo durante o jogo.
RegisterNetEvent("redm_loadscreen:hideLogo", function()
    SendNUIMessage({
        action = "hideLogo"
    })
end)

-- INTEGRAÇÃO COM VORP - Exibe automaticamente a logo após o spawn.
AddEventHandler("vorp_core:Client:OnPlayerSpawned", function()
    SendNUIMessage({
        action = "showLogo"
    })
end)

-- SEGURANÇA - Restaura o áudio nativo caso o recurso seja interrompido.
AddEventHandler("onResourceStop", function(resourceName)
    if resourceName ~= GetCurrentResourceName() then
        return
    end

    setGameWorldAudioMuted(false)
end)
