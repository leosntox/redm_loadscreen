# RedM Loadscreen
**RedM Loadscreen** é um recurso de tela de carregamento desenvolvido para servidores RedM, atualmente com integração para VORP.

## Versão 1.1
O objetivo é oferecer uma tela de carregamento e uma logo (watermark) simples, leves e fáceis de personalizar, permitindo que cada servidor adapte o recurso à sua própria identidade visual.

## Recursos atuais
Além da tela de carregamento, este recurso também é responsável pela **logo (watermark) exibida durante o jogo**, permitindo que o servidor mantenha sua identidade visual desde o carregamento até a experiência em gameplay.

- Tela de carregamento personalizada.
- Suporte a vídeo de abertura.
- Fechamento manual da loadscreen.
- Logo (watermark) exibida durante o jogo.
- Exibição automática da logo após o spawn (VORP).
- Compatível com RedM.
- Código simples e de fácil personalização.

## Planejamento
Este projeto continuará recebendo atualizações. Algumas funcionalidades planejadas para versões futuras incluem:

- Sequência de imagens e vídeos (Slideshow).
- Reprodução de trilha sonora personalizada.
- Opções interativas na tela de carregamento.
- Configurações para posicionamento e personalização da logo.
- Outras funcionalidades conforme o desenvolvimento do projeto.

## Recomendações
Para garantir o funcionamento correto da loadscreen, utilize os seguintes padrões:

### Logo
- Formato: **PNG**
- Fundo: **Transparente**
- Resolução recomendada: **512 × 512 px**

### Vídeo
- Formato: **MP4**
- Codec recomendado: **H.264 (AVC)**
- Resolução recomendada: **1920 × 1080 (1080p)**
- Tamanho recomendado: **até 30 MB**

## Instalação
1. Coloque a pasta `redm_loadscreen` dentro da pasta `resources`.
2. Adicione ao seu `server.cfg`:

ensure redm_loadscreen (abaixo de ensure vorp_core)

3. Substitua a imagem `logo.png` da pasta `html` pela logo do seu servidor.
4. Substitua o vídeo `intro.mp4` da pasta `html` pelo vídeo de sua preferência.
5. Para utilizar este recurso corretamente com a **VORP**, é necessário desativar a loading screen padrão.
No arquivo `config.lua` do `vorp_core`, altere:

UseInnitialLoadingScreen = false
Loadinscreen = false

6. O **RedM Loadscreen** utiliza fechamento manual para permitir que a tela de carregamento permaneça ativa até que o servidor esteja pronto para exibir o jogador.
Adicione o evento abaixo ao final da função `OpenMenuSelect()`, localizada no arquivo `client.lua` do recurso `vorp_character`, antes do `end` que encerra a função:

TriggerEvent("redm_loadscreen:close")

Esse evento deve ser chamado dentro da `function OpenMenuSelect()` ao final dela antes do `end` que finaliza a função
localizado no `client.lua` do `vorp_character`

## Compatibilidade
- ✅ VORP
- ⚠️ Outros frameworks: requer integração manual.


## Créditos
Desenvolvido por **leosntox**
Discord: **leosntox**