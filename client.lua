local loadscreenClosed = false

CreateThread(function()
    -- Silencia a música do jogo durante a loadscreen
    SetAudioFlag("DisableFlightMusic", true)

    -- Garante que a logo do jogo comece escondida
    SendNUIMessage({
        action = "hideLogo"
    })
end)

RegisterNetEvent("redm_loadscreen:close", function()
    if loadscreenClosed then
        return
    end

    loadscreenClosed = true

    -- Fecha a tela de carregamento
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()

    -- Restaura o áudio do jogo
    SetAudioFlag("DisableFlightMusic", false)

    -- Exibe a logo durante o jogo
    SendNUIMessage({
        action = "showLogo"
    })
end)