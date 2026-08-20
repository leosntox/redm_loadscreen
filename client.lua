local loadscreenClosed = false
local gameWorldAudioMuted = false
local audioSceneStartedByResource = false
local muteAudioScene = "CHARACTER_CHANGE_IN_SKY_SCENE"
local logoRequested = false
local logoVisible = false
local openWheelControl = 0xAC4BD4F1

-- LOGO DA HUD - Envia a alteração somente quando o estado visual realmente muda.
local function setLogoVisible(visible)
    if logoVisible == visible then
        return
    end

    logoVisible = visible
    SendNUIMessage({
        action = visible and "showLogo" or "hideLogo"
    })
end

-- LOGO DA HUD - Detecta telas que devem ficar livres da marca do servidor.
local function isInterfaceOpen()
    local wheelOpen = IsControlPressed(0, openWheelControl)
        or IsDisabledControlPressed(0, openWheelControl)

    return wheelOpen or IsPauseMenuActive() or IsNuiFocused()
end

-- LOGO DA HUD - Respeita o pedido de exibição sem sobrepor menus.
local function updateLogoVisibility()
    setLogoVisible(logoRequested and not isInterfaceOpen())
end

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
    logoRequested = false
    updateLogoVisibility()
end

-- INICIALIZAÇÃO - Bloqueia o áudio do mundo e inicia com a logo escondida.
CreateThread(function()
    setGameWorldAudioMuted(true)
    logoRequested = false
    updateLogoVisibility()

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
    logoRequested = true
    updateLogoVisibility()
end)

-- CONTROLE DA LOGO - Oculta a logo durante o jogo.
RegisterNetEvent("redm_loadscreen:hideLogo", function()
    logoRequested = false
    updateLogoVisibility()
end)

-- INTEGRAÇÃO COM VORP - Exibe automaticamente a logo após o spawn.
AddEventHandler("vorp_core:Client:OnPlayerSpawned", function()
    logoRequested = true
    updateLogoVisibility()
end)

-- LOGO DA HUD - Oculta em interfaces e restaura ao voltar para o personagem.
CreateThread(function()
    while true do
        Wait(50)
        updateLogoVisibility()
    end
end)

-- SEGURANÇA - Restaura o áudio nativo caso o recurso seja interrompido.
AddEventHandler("onResourceStop", function(resourceName)
    if resourceName ~= GetCurrentResourceName() then
        return
    end

    setGameWorldAudioMuted(false)
end)
