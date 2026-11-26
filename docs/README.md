# Velvet Requiem — Site do projeto

Velvet Requiem é um projeto brasileiro de jogo de terror com estética retrô inspirada na era do PlayStation 1. O site apresenta a proposta do jogo, reúne o trailer e as capturas de tela e demonstra como funcionaria a área de apoiadores.

## O que você encontra no site

- **O jogo** reúne a apresentação do projeto e uma galeria de capturas.
- **Trailer** permite assistir ao vídeo no site ou abri-lo no YouTube.
- **Apoiar** apresenta os planos Vigília, Sentinela e Requiem e seus benefícios.
- **Minha conta** reúne o histórico das aquisições, permite retomar pagamentos pendentes e mostra quais benefícios estão disponíveis para a conta.

## Como testar

1. Na seção **Apoiar**, escolha o plano **Sentinela**.
2. Crie uma conta com nome, e-mail e senha fictícios. Use uma senha de pelo menos 15 caracteres.
3. Entre na conta e clique em **Iniciar simulação**.
4. Escolha **Manter pendente**. Em **Minha conta**, confira que os benefícios ainda aparecem bloqueados.
5. Clique em **Retomar** e selecione **Confirmar pagamento**. Volte a **Minha conta** para abrir o diário de desenvolvimento e a galeria de artes conceituais.

Também é possível simular o cancelamento ou a falha de um pagamento. Os estados e benefícios fazem parte da demonstração. As contas e o histórico ficam salvos no navegador, os arquivos publicados são públicos e a simulação não realiza cobranças.


## Tecnologias e publicação

O frontend usa HTML, CSS e JavaScript. A versão estática roda sem servidor de aplicação e é destinada ao GitHub Pages. Com a opção **Deploy from a branch**, coloque os arquivos do site em `docs/` na raiz do repositório, com o `index.html` diretamente dentro da pasta. Depois, em **Settings → Pages**, escolha a branch `main` e a origem `/docs`. Para publicar de uma pasta como `Prototipo/`, configure um workflow do GitHub Actions que publique a pasta que contém o `index.html`.
