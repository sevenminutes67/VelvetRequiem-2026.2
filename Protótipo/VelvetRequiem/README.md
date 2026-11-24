# Velvet Requiem · Protótipo da Atividade 07

Protótipo navegável da jornada de apoio a um jogo brasileiro de terror independente, com base nas [histórias US01 a US08 do repositório](https://github.com/sevenminutes67/VelvetRequiem-2026.2/blob/main/Requisitos%20do%20Usuario/HistoriasUsuario.md).

## Como abrir

Com o **Node.js 22 ou superior** instalado, extraia o ZIP e execute `ABRIR-PROTOTIPO.cmd` no Windows. O arquivo abre o navegador e mantém o servidor funcionando enquanto a janela estiver aberta.

Para iniciar manualmente, abra o terminal na pasta que contém `server.mjs` e execute:

```sh
node server.mjs
```

Acesse [http://127.0.0.1:4173](http://127.0.0.1:4173). O projeto roda localmente e dispensa instalações de pacotes. Para trocar a porta, defina a variável `PORT` antes de rodar o comando manual.

## Roteiro para a demonstração

1. Abra **O jogo**, navegue até **Trailer** e use o player ou o botão **Assistir no YouTube**. Em **Capturas do jogo**, selecione uma imagem para abri-la em tamanho original.
2. Em **Apoiar**, compare os planos e selecione **Sentinela**.
3. Crie uma conta com dados fictícios. Use uma senha com pelo menos 15 caracteres, como `frase de teste 2026`. Entre com os mesmos dados.
4. Confira o plano, o preço e os benefícios. Escolha **Iniciar simulação**, aplique **Manter pendente** e abra **Minha conta**. Confira o histórico e o bloqueio dos conteúdos.
5. Escolha **Retomar**, aplique **Confirmar pagamento** e abra o diário ou as artes conceituais. O jogo aparece indisponível e os créditos continuam bloqueados para este plano.
6. Para testar falha ou cancelamento, escolha outro plano e aplique o resultado correspondente. Os benefícios já confirmados continuam acessíveis.
7. Teste as rotas diretas `/#conteudo/art`, `/#conteudo/credits` e `/#conteudo/game` com contas de diferentes permissões e após sair.

## Escopo da demonstração

- **Identidade e mídia.** Velvet Requiem é o nome do projeto. A página inicial usa o vídeo enviado como fundo silencioso e exibe três capturas do jogo. O trailer usa o YouTube e requer conexão com a internet. O README original deixa o título final do jogo em definição.
- **Planos.** Vigília (R$ 29,90), Sentinela (R$ 49,90) e Réquiem (R$ 79,90) são propostas demonstrativas. Os valores e benefícios ficam em `catalog.mjs`.
- **Pagamento.** O simulador registra os estados pendente, confirmado, cancelado e falhou. A confirmação vem da ação de demonstração e o pagamento externo fica para uma implementação futura.
- **Contas.** O servidor grava contas com senhas derivadas por scrypt e aquisições em `.data/state.json`. A sessão termina ao sair, expirar ou reiniciar o servidor. O servidor verifica sessão e benefício antes de retornar conteúdos, inclusive a imagem da galeria.
- **Execução.** Esta versão atende à demonstração local por HTTP. O site precisará de hospedagem com Node.js, HTTPS e configuração de produção para publicação externa.

## Inclusão no GitHub

Uma pessoa com acesso de escrita pode copiar a pasta `VelvetRequiem` para a raiz do repositório e acrescentar ao README principal:

```md
[Protótipo da Atividade 07](VelvetRequiem/README.md)
```

O link abre o código e as instruções de execução. Após hospedar o aplicativo, acrescente também o endereço da versão navegável. A pasta `.data` fica fora do versionamento.

