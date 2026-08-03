local loadscreenClosed = false

CreateThread(function()
    SetAudioFlag("DisableFlightMusic", true)

    -- começa sempre escondida
    SendNUIMessage({
        action = "hideLogo"
    })
end)

RegisterNetEvent("redm_loadscreen:close", function()
    if loadscreenClosed then
        return
    end

    loadscreenClosed = true

    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()

    SetAudioFlag("DisableFlightMusic", false)

    -- continua escondida durante seleção/criação
    SendNUIMessage({
        action = "hideLogo"
    })
end)

RegisterNetEvent("redm_loadscreen:showLogo", function()
    SendNUIMessage({
        action = "showLogo"
    })
end)

RegisterNetEvent("redm_loadscreen:hideLogo", function()
    SendNUIMessage({
        action = "hideLogo"
    })
end)

-- Integração automática com VORP
AddEventHandler("vorp_core:Client:OnPlayerSpawned", function()
    SendNUIMessage({
        action = "showLogo"
    })
end)