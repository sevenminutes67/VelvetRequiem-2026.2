# Histórias de Usuário — Velvet Requiem

As histórias descrevem o comportamento esperado do projeto. US01–US03 preservam os objetivos anteriores; US04–US07 completam os vínculos já existentes nos requisitos funcionais. US04 e US05 incorporam as decisões do PDF corrigido da Atividade 04; US08 documenta o login mencionado nesse refinamento, preservando todos os identificadores anteriores.

Os testes de compatibilidade seguem RNF03. Os Story Points de US01–US03 foram preservados da documentação anterior; as novas histórias serão estimadas pelo grupo após o detalhamento da implementação. Prioridades foram alinhadas aos RFs.

## US01 — Conhecer o jogo

**História:** Como visitante, eu quero visualizar a proposta e as principais características do jogo na página inicial para decidir se tenho interesse no projeto.

**Prioridade:** Alta.  
**RF relacionado:** RF01.  
**RNFs relacionados:** RNF01, RNF02, RNF03, RNF06.  
**Story Points:** 3.  

### Critérios de aceitação

1. Ao acessar a página inicial, o visitante encontra uma seção identificada com a apresentação do jogo.
2. A seção apresenta a proposta e as principais características conforme o conteúdo fornecido pela equipe.
3. Nas áreas de visualização previstas em RNF03, o conteúdo permanece legível, sem cortes ou sobreposições que impeçam sua leitura.
4. A página inicial atende ao limite de carregamento e às condições de medição de RNF02.

**Dependência:** textos de apresentação fornecidos pela equipe.

## US02 — Assistir ao trailer

**História:** Como visitante, eu quero assistir ao trailer e controlar sua reprodução para conhecer a atmosfera e o estilo visual do jogo no meu ritmo.

**Prioridade:** Alta.  
**RF relacionado:** RF02.  
**RNFs relacionados:** RNF01, RNF02, RNF03.  
**Story Points:** 3.  

### Critérios de aceitação

1. A seção de trailer disponibiliza o vídeo do jogo fornecido pela equipe.
2. Com o vídeo carregado e pausado, acionar a reprodução inicia o vídeo.
3. Durante a reprodução, acionar a pausa interrompe o avanço do vídeo.
4. Após a pausa, acionar a reprodução retoma o vídeo do ponto interrompido.
5. Em celular, o visitante consegue expandir o vídeo para tela cheia e retornar à página; fora da tela cheia, o vídeo se ajusta à largura disponível e seus controles permanecem acessíveis.

**Dependência:** arquivo ou origem do trailer disponível. O critério de maximização do vídeo, antes localizado em US01, foi transferido para esta história e explicitado como uma ação do visitante.

## US03 — Consultar os planos de apoio

**História:** Como potencial apoiador, eu quero consultar os três planos e seus preços para identificar uma opção compatível com o valor que pretendo contribuir.

**Prioridade:** Alta.  
**RF relacionado:** RF03.  
**RNFs relacionados:** RNF01, RNF03, RNF06.  
**Story Points:** 5.  

### Critérios de aceitação

1. A seção de apoio apresenta os três planos definidos pelo projeto.
2. Cada plano possui uma identificação que o distingue dos demais e apresenta seu preço.
3. Os valores correspondem aos definidos pela equipe e ficam associados ao plano correto.
4. Identificação e preço seguem a mesma ordem de apresentação nos três planos.
5. Nos ambientes de RNF03, é possível consultar todos os planos e preços sem informações ocultadas por cortes ou sobreposições.

**Dependência:** identificação e preços dos planos. Consultar planos não depende de concluir uma compra.

## US04 — Criar uma conta

**História:** Como visitante, eu quero criar uma conta na plataforma para associar minhas aquisições e meus benefícios ao meu cadastro.

**Prioridade:** Alta.  
**RF relacionado:** RF04.  
**RNFs relacionados:** RNF03 e RNF04.  
**Story Points:** não atribuídos nesta atividade.  

### Regras de cadastro

- Os campos obrigatórios são nome, e-mail, senha e confirmação de senha.
- O nome deve conter pelo menos um caractere diferente de espaço.
- O e-mail deve conter uma parte antes do símbolo “@” e um domínio depois dele, sem espaços.
- Cada endereço de e-mail pode estar associado a apenas uma conta. Para verificar duplicidade, o sistema desconsidera espaços nas extremidades e diferenças entre letras maiúsculas e minúsculas.
- A senha deve possuir pelo menos 15 caracteres, permitir espaços e aceitar pelo menos 64 caracteres, sem exigir combinações obrigatórias de números, símbolos e letras maiúsculas.
- A confirmação de senha deve ser igual à senha informada.
- A identificação posterior será feita por login com e-mail e senha. Esse comportamento está documentado em RF08 e US08.

### Critérios de aceitação

1. O formulário apresenta os quatro campos e identifica que todos são obrigatórios.
2. Ao enviar dados válidos e um e-mail ainda não cadastrado, o sistema cria uma única conta e informa a conclusão.
3. Se um campo obrigatório estiver vazio ou não atender às regras, o sistema não cria a conta e informa o problema que precisa ser corrigido.
4. Se a senha e sua confirmação forem diferentes, o sistema impede o cadastro e informa a divergência.
5. Se o e-mail já estiver cadastrado, o sistema não cria uma segunda conta e informa que não foi possível concluir o cadastro com os dados apresentados.
6. Após corrigir os dados, o visitante consegue reenviar o formulário.
7. Em ambiente publicado, os dados são enviados por HTTPS e a senha não é armazenada em texto puro nem exposta em respostas ou logs, conforme RNF04.

**Dependências:** armazenamento de contas e implementação das validações. O cadastro pode ser testado separadamente do login e da aquisição.

## US05 — Adquirir um plano de apoio

**História:** Como usuário cadastrado, eu quero adquirir um dos três planos de apoio para contribuir com o desenvolvimento do jogo e obter os benefícios correspondentes.

**Prioridade:** Alta.  
**RF relacionado:** RF05; RF08 (identificação por login).  
**RNFs relacionados:** RNF03 e RNF04.  
**Story Points:** não atribuídos nesta atividade.  

### Regras de aquisição

- A aquisição exige que o usuário esteja identificado por login.
- Cada operação de aquisição corresponde a um plano selecionado.
- Nomes, valores e benefícios dos três planos devem estar definidos antes da disponibilização das compras.
- O processamento do pagamento será realizado por um serviço externo. Fornecedor e meios de pagamento serão escolhidos na implementação.
- A aquisição somente será confirmada após o servidor verificar uma confirmação válida do serviço de pagamento. O retorno do navegador para uma página de sucesso não será suficiente.
- Os estados considerados são: pendente, confirmada, cancelada e falhou.
- Somente uma aquisição confirmada concede os benefícios do plano.
- Uma tentativa pendente, cancelada ou malsucedida não remove direitos obtidos por uma aquisição anterior confirmada.

### Critérios de aceitação

1. Se o visitante tentar adquirir um plano sem estar identificado, o sistema solicita que entre em sua conta antes de prosseguir.
2. Após selecionar um plano, o usuário visualiza sua identificação, preço e benefícios antes de iniciar o pagamento.
3. O servidor registra a aquisição pendente vinculada à conta e ao plano selecionados, utilizando o preço definido pelo sistema.
4. Quando o servidor recebe e valida a confirmação do serviço de pagamento, a aquisição passa para confirmada e os benefícios correspondentes são disponibilizados.
5. Uma confirmação referente a outra aquisição ou com valor incompatível não libera benefícios.
6. Se a aquisição permanecer pendente, for cancelada ou falhar, o sistema apresenta a situação e não concede novos benefícios.
7. Caso a mesma confirmação seja recebida mais de uma vez, o sistema mantém um único registro de aquisição, sem duplicar a concessão de benefícios.
8. Ao concluir a operação, o registro corresponde à conta, ao plano e ao valor apresentados antes do pagamento.

**Dependências:** cadastro, login, configuração dos planos e integração com o serviço de pagamento. Os testes devem usar o ambiente de testes do serviço, sem cobranças reais.

**Observação sobre INVEST:** a história ficou mais verificável, mas seu tamanho e sua estimativa dependem da integração escolhida. Se o trabalho ultrapassar uma entrega curta, deverá ser dividido preservando resultados úteis para o usuário.

## US06 — Consultar os benefícios do meu plano

**História:** Como apoiador, eu quero consultar meu plano adquirido e seus benefícios para saber o que meu apoio me permite receber ou acessar.

**Prioridade:** Média.  
**RF relacionado:** RF06.  
**RNFs relacionados:** RNF03, RNF05, RNF06.  
**Story Points:** a estimar pela equipe.  

### Critérios de aceitação

1. Com a identidade do apoiador estabelecida e uma aquisição confirmada, o sistema apresenta o plano vinculado à sua conta.
2. A lista de benefícios corresponde à configuração do plano adquirido, sem apresentar benefícios de outro plano como direitos já obtidos.
3. Quando a conta não possui plano confirmado, o sistema informa essa condição e não apresenta benefícios como adquiridos.
4. Solicitações sem autorização não retornam os dados privados do plano de outra conta, conforme RNF05.
5. A apresentação respeita os critérios de compatibilidade e consistência de RNF03 e RNF06.

**Dependências:** US05 e definição dos benefícios de cada plano. O teste pode usar uma conta com aquisição previamente registrada.

## US07 — Acessar conteúdos exclusivos

**História:** Como apoiador, eu quero acessar os conteúdos exclusivos incluídos no meu plano para usufruir dos benefícios do apoio realizado.

**Prioridade:** Média.  
**RF relacionado:** RF07.  
**RNFs relacionados:** RNF03, RNF05.  
**Story Points:** a estimar pela equipe.  

### Critérios de aceitação

1. Para uma conta com aquisição confirmada, o sistema permite abrir os conteúdos disponibilizados e incluídos no respectivo plano.
2. Para uma conta cujo plano não inclui determinado conteúdo, o sistema nega o acesso sem entregar esse conteúdo.
3. Uma solicitação sem identificação válida ou sem plano confirmado não retorna conteúdo exclusivo.
4. As restrições também são aplicadas a solicitações diretas ao endereço do conteúdo, conforme RNF05.
5. Quando não houver conteúdo publicado para um benefício previsto, o sistema informa a indisponibilidade, sem apresentar um acesso inexistente como disponível.

**Dependências:** aquisição confirmada, conteúdos publicados e definição de quais planos autorizam cada conteúdo. O teste pode usar contas e conteúdos previamente preparados.

## US08 — Entrar na conta

**História:** Como usuário cadastrado, eu quero entrar na minha conta com e-mail e senha para adquirir um plano e acessar meus benefícios com minha identidade verificada.

**Prioridade:** Alta.  
**RF relacionado:** RF08.  
**RNFs relacionados:** RNF03, RNF04, RNF05.  
**Story Points:** não atribuídos nesta atividade.  

### Critérios de aceitação

1. O formulário de login solicita e-mail e senha.
2. Ao informar as credenciais válidas de uma conta existente, o sistema estabelece uma sessão associada àquela conta.
3. A comparação do e-mail segue a normalização definida no cadastro; a senha deve ser verificada sem alterar seu conteúdo.
4. Se o e-mail não existir ou a senha estiver incorreta, o sistema não estabelece a sessão e apresenta a mesma mensagem genérica: “E-mail ou senha inválidos”.
5. Se um campo obrigatório estiver vazio, o sistema solicita seu preenchimento e não conclui o login.
6. A identidade usada na aquisição e nas consultas privadas deve corresponder à sessão validada pelo servidor; informar o identificador de outra conta na solicitação não concede acesso a ela.
7. O login, por si só, não concede benefícios de um plano: continuam sendo necessárias a aquisição confirmada e a autorização previstas em RF05–RF07.
8. Em ambiente publicado, as credenciais são transmitidas por HTTPS e não aparecem em respostas ou logs.

**Dependência:** conta criada conforme RF04. O login não inclui recuperação de senha, login social ou autenticação por serviços externos neste escopo.

## Rastreabilidade

| História | RF principal | RNFs relacionados |
| --- | --- | --- |
| US01 | RF01 | RNF01, RNF02, RNF03, RNF06 |
| US02 | RF02 | RNF01, RNF02, RNF03 |
| US03 | RF03 | RNF01, RNF03, RNF06 |
| US04 | RF04 | RNF03, RNF04 |
| US05 | RF05 | RNF03, RNF04 |
| US06 | RF06 | RNF03, RNF05, RNF06 |
| US07 | RF07 | RNF03, RNF05 |
| US08 | RF08 | RNF03, RNF04, RNF05 |

## Documentos relacionados

- [Requisitos funcionais](RF.md)
- [Requisitos não funcionais](RNF.md)
- [Início](../README.md)
