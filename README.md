# RedM Loadscreen
**RedM Loadscreen** é um recurso de tela de carregamento desenvolvido para servidores RedM.

## Versão 1.0
Esta é a primeira versão pública do projeto.
O objetivo é oferecer uma base simples, leve e fácil de personalizar, permitindo que qualquer servidor adapte a tela de carregamento à sua própria identidade visual.

## Recursos atuais
Além da tela de carregamento, este recurso também é responsável pela **logo (watermark) exibida durante o jogo**, permitindo que o servidor mantenha sua identidade visual desde o carregamento até a experiência em gameplay.

- Tela de carregamento personalizada.
- Suporte a vídeo de abertura.
- Fechamento manual da loadscreen.
- Logo (watermark) exibida durante o jogo.
- Compatível com RedM.
- Código simples e de fácil personalização.

## Planejamento
Este projeto continuará recebendo atualizações. Algumas funcionalidades planejadas para versões futuras incluem:

- Sequência de imagens (Slideshow).
- Reprodução de trilha sonora personalizada.
- Opções interativas na tela de carregamento.
- Informações do servidor.
- Dicas para jogadores.
- Exibição de regras.
- Notícias e novidades do servidor.
- Configurações para posicionamento e personalização da logo.
- Melhorias visuais e de desempenho.
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
2. Adicione ao `server.cfg` 
2. Adicione ao seu `server.cfg`

ensure redm_loadscreen

3. Adicione sua `logo.png` dentro da pasta `html`.
4. Adicione sua `intro.mp4` dentro da pasta `html`.

## Observação
Alguns frameworks ou sistemas de personagem já possuem uma tela de carregamento própria.
Para utilizar o **RedM Loadscreen**, pode ser necessário desativar a loadscreen original do framework e configurar o ponto correto para fechar esta loadscreen.
Cada framework possui uma implementação diferente, portanto essa configuração pode variar.

### Importante
O **RedM Loadscreen** utiliza fechamento manual para permitir que a tela de carregamento permaneça ativa até que o servidor esteja pronto para exibir o jogador.
Para fechar a loadscreen, utilize o evento:

```lua
TriggerEvent("redm_loadscreen:close")
```
Esse evento deve ser chamado no momento em que o seu sistema de personagem, spawn ou framework estiver pronto para liberar a tela ao jogador.
A integração pode variar de acordo com o framework ou sistema de personagem utilizado pelo servidor.



## Créditos
Desenvolvido por **leosntox**
Discord: **leosntox**