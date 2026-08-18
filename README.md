# RedM Loadscreen v2.5.0

**RedM Loadscreen** é uma loadscreen moderna e personalizável para servidores **RedM**, com suporte a vídeos, imagens, música e integração com a criação de personagens e o spawn da **VORP**.

Além da tela de carregamento, o recurso também exibe uma **logo (watermark)** durante o jogo, mantendo a identidade visual do servidor desde o carregamento até o gameplay.

## Recursos

- Reprodução de vídeos e imagens.
- Playlist com ordem sequencial ou aleatória.
- Repetição automática da playlist.
- Transições configuráveis entre vídeos e imagens.
- Música opcional durante a loadscreen.
- Controle de áudio pelo teclado.
- Bloqueio temporário do áudio ambiente do mundo durante o carregamento.
- Atalhos configuráveis para Discord, TikTok e Instagram.
- Recuperação automática quando uma mídia da playlist falha.
- Logo durante o jogo com exibição suave após o spawn.
- Integração com criação de personagem e spawn da VORP.
- Configuração centralizada no `config.js`.

## Instalação

### 1. Instalar o recurso

Coloque a pasta `redm_loadscreen` dentro da pasta `resources` do servidor.

Adicione ao `server.cfg`:

```cfg
ensure redm_loadscreen
```

Adicione o recurso depois do `vorp_core` e antes do `vorp_character`.

### 2. Desabilitar a loadscreen padrão da VORP

Abra `vorp_core/config.lua` e deixe estas opções como `false`:

```lua
UseInnitialLoadingScreen = false
Loadinscreen = false
```

### 3. Configurar o fechamento na seleção de personagens

Abra `vorp_character/client/client.lua` e localize:

```lua
function OpenMenuSelect()
```

No final dessa função, antes do `end` que encerra `OpenMenuSelect()`, adicione:

```lua
TriggerEvent("redm_loadscreen:close")
```

Esse evento encerra a loadscreen quando o menu de seleção de personagens está pronto para ser exibido.

A criação do primeiro personagem é identificada pelo evento `vorpcharacter:startCharacterCreator`, já integrado ao `client.lua` deste recurso.

### 4. Adicionar as mídias

Coloque todos os arquivos na pasta:

```text
redm_loadscreen/html/media/
```

É possível adicionar quantos vídeos e imagens desejar, desde que os nomes também sejam informados no `config.js`.

### 5. Configurar a loadscreen

Abra `redm_loadscreen/html/config.js`. Nesse arquivo você pode configurar:

- Modo de vídeo ou imagem.
- Arquivos utilizados na playlist.
- Ordem sequencial ou aleatória.
- Repetição da playlist.
- Duração e transição das imagens.
- Transição entre vídeos.
- Música opcional.
- Tecla de controle do áudio.
- Exibição e posição da dica de áudio.
- Links das redes sociais.

Os nomes configurados devem corresponder exatamente aos arquivos existentes em `html/media`.

### 6. Reiniciar e testar

Depois de finalizar as alterações:

1. Reinicie o servidor.
2. Feche completamente o RedM.
3. Entre novamente no servidor.
4. Teste a seleção de personagens.
5. Teste a criação do primeiro personagem.
6. Confirme se a logo aparece após o spawn.

## Configuração de áudio

O vídeo pode possuir áudio próprio. A opção abaixo controla apenas a música adicional:

```javascript
useMusic: false
```

Se `useMusic` estiver como `true` e o vídeo também possuir áudio, os dois serão reproduzidos simultaneamente. A tecla configurada em `muteKey` silencia ou reativa tanto o vídeo quanto a música.

A dica de áudio é exibida somente quando o controle de áudio está habilitado e existe uma fonte de áudio potencialmente ativa.

O áudio ambiente do mundo do jogo é bloqueado enquanto a loadscreen permanece aberta. Ao fechar a loadscreen, o recurso restaura somente a cena de áudio que ele próprio iniciou. O mesmo procedimento de segurança é executado se o recurso for interrompido.

## Links sociais

Os quatro atalhos são configurados em `html/config.js`:

```javascript
socialLinks: {
    discord: "https://discord.gg/vorp-core",
    tiktok: "https://www.tiktok.com/@leosntox",
    instagram: "https://www.instagram.com/leosntox/"
}
```

Enquanto um campo estiver vazio, o ícone permanece visível, mas desativado. Para ativá-lo, informe o endereço completo começando com `https://`.

## Recomendações

### Logo

- Formato: **PNG**.
- Fundo: **transparente**.
- Resolução recomendada: **512 × 512 px**.

### Vídeos

- Formato: **MP4**.
- Codec recomendado: **H.264 (AVC)**.
- Resolução recomendada: **1920 × 1080**.
- Tamanho recomendado: **até 30 MB**.

### Imagens

- Formato: **PNG**.
- Resolução recomendada: **1920 × 1080**.

### Música

- Formato: **MP3**.

## Compatibilidade

- ✅ RedM
- ✅ VORP
- ⚠️ Outros frameworks requerem integração manual.

## Créditos

- Discord: `leosntox`.
- Créditos à VORP por disponibilizar o `vorp_character` e o `vorp_core` utilizados na integração, e ao `@outsider`.
