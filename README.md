# RedM Loadscreen v2.0.0
**RedM Loadscreen** é uma loadscreen moderna e personalizável para servidores **RedM**, com suporte a vídeos, imagens, música e integração automática com **VORP**.
Além da tela de carregamento, o recurso também exibe uma **logo (watermark)** durante o jogo, permitindo manter a identidade visual do servidor desde o carregamento até o gameplay.

# Recursos
- Reprodução de vídeos.
- Reprodução de imagens.
- Playlist de vídeos e imagens.
- Ordem sequencial ou aleatória.
- Repetição automática da playlist.
- Música opcional durante a loadscreen.
- Silenciar ou reativar o áudio pelo teclado.
- Fade entre imagens configurável.
- Logo (watermark) durante o jogo.
- Exibição automática da logo após o spawn.
- Integração com seleção e criação de personagem da VORP.
- Configuração centralizada através do `config.js`.

# Instalação
1. Coloque a pasta `redm_loadscreen` dentro da pasta `resources` do servidor.

2. Adicione `ensure redm_loadscreen` no `server.cfg` 
> Adicione o recurso depois do `vorp_core` e antes do `vorp_character`

3. Desabilitar a loadscreen padrão da VORP
Abra o arquivo `vorp_core/config.lua`
Localize 
> UseInnitialLoadingScreen = true    (deixe como false)
> Loadinscreen = true    (deixe como false)

4. Configurar o fechamento na seleção de personagem
Abra o arquivo `vorp_character/client/client.lua`
Localize a função
> function OpenMenuSelect()
No final dessa função, depois do fechamento de `MenuData.Open(...)` e antes do `end` que encerra `OpenMenuSelect()`, adicione:
> TriggerEvent("redm_loadscreen:close")
O final da função deverá ficar semelhante a:
```lua
    end)

    TriggerEvent("redm_loadscreen:close")
end
```
Esse evento encerra a loadscreen quando o menu de seleção de personagens estiver pronto para ser exibido.
> A criação do primeiro personagem é identificada automaticamente pelo evento `vorpcharacter:startCharacterCreator`, já integrado ao `client.lua` do **RedM Loadscreen**.

5. Adicionar os arquivos de mídia
Todos os arquivos de mídia devem ser colocados na pasta `redm_loadscreen/html/media/`
Você pode adicionar quantos vídeos e imagens desejar, desde que os nomes também sejam informados no `config.js`.

6. Configurar a loadscreen
Abra o arquivo `redm_loadscreen/html/config.js`
Nesse arquivo você poderá escolher:
- Modo de vídeo ou imagem.
- Arquivos utilizados na playlist.
- Ordem sequencial ou aleatória.
- Repetição da playlist.
- Tempo de exibição das imagens.
- Transição entre imagens.
- Música opcional.
- Tecla para silenciar o áudio.
- Exibição da dica de áudio.
Os nomes configurados devem corresponder exatamente aos arquivos existentes em `html/media`.

7. Reiniciar e testar
Depois de finalizar as alterações:
Reinicie o servidor.
Feche completamente o RedM.
Entre novamente no servidor.
Teste a seleção de personagem.
Teste a criação do primeiro personagem.
Confirme se a logo aparece após o spawn.

# Recomendações
## Logo
- Formato: **PNG**
- Fundo: **Transparente**
- Resolução recomendada: **512 × 512 px**

## Vídeos
- Formato: **MP4**
- Codec recomendado: **H.264 (AVC)**
- Resolução recomendada: **1920 × 1080**
- Tamanho recomendado: **até 30 MB**

## Imagens
- Formato: **PNG**
- Resolução recomendada: **1920 × 1080**

## Música
- Formato: **MP3**

# Compatibilidade
- ✅ RedM
- ✅ VORP
- ⚠️ Outros frameworks requerem integração manual.

# Créditos
Desenvolvido por **leosntox**
Créditos VORP por disponibilizar o vorp_character e vorp_core utilizados e o @outsider.
Discord: **leosntox**