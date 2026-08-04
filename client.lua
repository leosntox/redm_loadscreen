local loadscreenClosed = false

-- FECHAMENTO DA LOADSCREEN - Encerra a loadscreen e mantém a logo escondida.
local function closeLoadscreen()
    if loadscreenClosed then
        return
    end
    loadscreenClosed = true
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
    SetAudioFlag("DisableFlightMusic", false)
    SendNUIMessage({
        action = "hideLogo"
    })
end

-- INICIALIZAÇÃO - Desativa a música nativa e inicia com a logo escondida.
CreateThread(function()
    SetAudioFlag("DisableFlightMusic", true)
    SendNUIMessage({
        action = "hideLogo"
    })
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