# Requisitos Não Funcionais — Velvet Requiem

Os requisitos abaixo especificam condições de qualidade verificáveis. Os limites de desempenho e a matriz de compatibilidade são metas de especificação adotadas na revisão da Atividade 04; não são resultados de testes já executados.

| ID | Descrição e condição de verificação | Categoria/Tipo | Prioridade | RFs relacionados |
| --- | --- | --- | --- | --- |
| RNF01 | Na página inicial, as seções de apresentação, trailer e planos devem possuir títulos que identifiquem seu conteúdo. Os controles interativos devem ter rótulos que indiquem sua ação e ser alcançáveis por teclado, com foco visível. Verificar o percurso usando Tab, Shift+Tab e a tecla de ativação adequada ao controle, sem depender do mouse. | Usabilidade e acessibilidade | Alta | RF01, RF02, RF03 |
| RNF02 | A página inicial deve apresentar o conteúdo principal em até 3 segundos de LCP em pelo menos 4 de 5 carregamentos com cache vazio, conexão simulada de 10 Mbps de download, 1 Mbps de upload e latência de 100 ms, sem limitação adicional de CPU. Registrar navegador, ferramenta, equipamento e os cinco resultados. O limite se refere à página inicial e não ao download integral do trailer. | Desempenho | Alta | RF01, RF02 |
| RNF03 | Os fluxos previstos nos RFs devem funcionar em Chrome e Firefox em computador e Chrome em Android. Registrar as versões utilizadas. Testar a apresentação em áreas de visualização de 360 × 800, 768 × 1024 e 1366 × 768 pixels, sem rolagem horizontal da página, sobreposição que oculte conteúdo ou controles inacessíveis. A tela cheia do vídeo deve ser verificada em um aparelho Android. | Compatibilidade e responsividade | Média | RF01, RF02, RF03, RF04, RF05, RF06, RF07, RF08 |
| RNF04 | Em ambiente publicado, os dados de cadastro, login e aquisição devem trafegar por HTTPS. Respostas e mensagens públicas não devem expor dados privados de outras contas. As senhas não devem ser armazenadas em texto puro nem exibidas em respostas ou logs. Verificar o tráfego, as respostas e o tratamento das credenciais na implementação. | Segurança e privacidade | Alta | RF04, RF05, RF08 |
| RNF05 | A autorização para consultar benefícios privados e obter conteúdo exclusivo deve ser validada no servidor em cada solicitação. Ocultar um botão na interface não é suficiente. Testar uma solicitação sem identidade válida, uma com plano sem permissão e uma com plano autorizado; as duas primeiras não devem retornar o conteúdo protegido, inclusive quando usadas URLs diretas. | Segurança — controle de acesso | Alta | RF06, RF07, RF08 |
| RNF06 | Títulos de mesmo nível, textos, links e botões de mesma finalidade devem manter o mesmo padrão de tipografia, cor e identificação entre as seções de apresentação, planos e benefícios. Os três planos devem apresentar identificação e preço na mesma ordem. Verificar os elementos equivalentes por inspeção das telas. | Usabilidade e consistência visual | Média | RF01, RF03, RF06 |

## Observações de verificação

- LCP é uma medida do tempo de exibição do maior elemento de conteúdo visível no carregamento da página.
- No RNF03, as resoluções podem ser verificadas com simulação de viewport; os fluxos também devem ser exercitados nos navegadores e no aparelho indicados.
- RF07 define **quem pode acessar cada conteúdo**. RNF05 define **como verificar a proteção contra acesso indevido**, evitando que a segurança dependa apenas da interface.
- A aprovação destes requisitos não comprova que o site atual os atende. Os testes ocorrerão quando as funcionalidades estiverem implementadas.

## Documentos relacionados

- [Requisitos funcionais](RF.md)
- [Histórias de usuário](HistoriasUsuario.md)
- [Início](../README.md)
