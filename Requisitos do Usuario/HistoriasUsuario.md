# 1. História de Usuário

A Tabela 3 a seguir contém as histórias de usuário do projeto Velvet Requiem.

<table>
    <thead>
        <tr style="background-color: purple; color: white">
            <th style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">ID</th>
            <th style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">História de Usuário</th>
            <th style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Critérios de aceitação</th>
            <th style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Prioridade</th>
            <th style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF/RNF relacionado</th>
            <th style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Story Points</th>
        </tr>
    </thead>
    <tbody>
        <tr id="ustory-01">
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">US01</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Como visitante, eu quero visualizar a proposta e as principais características do jogo na página inicial para decidir se tenho interesse no projeto.</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle"><ol><li>Ao acessar a página inicial, o visitante encontra uma seção identificada com a apresentação do jogo.</li><li>A seção apresenta a proposta e as principais características conforme o conteúdo fornecido pela equipe.</li><li>Nas áreas de visualização previstas em RNF03, o conteúdo permanece legível, sem cortes ou sobreposições que impeçam sua leitura.</li><li>A página inicial atende ao limite de carregamento e às condições de medição de RNF02.</li></ol></td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Alta</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF01; RNF01, RNF02, RNF03, RNF06</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">3</td>
        </tr>
        <tr id="ustory-02">
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">US02</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Como visitante, eu quero assistir ao trailer e controlar sua reprodução para conhecer a atmosfera e o estilo visual do jogo no meu ritmo.</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle"><ol><li>A seção de trailer disponibiliza o vídeo do jogo fornecido pela equipe.</li><li>Com o vídeo carregado e pausado, acionar a reprodução inicia o vídeo.</li><li>Durante a reprodução, acionar a pausa interrompe o avanço do vídeo.</li><li>Após a pausa, acionar a reprodução retoma o vídeo do ponto interrompido.</li><li>Em celular, o visitante consegue expandir o vídeo para tela cheia e retornar à página; fora da tela cheia, o vídeo se ajusta à largura disponível e seus controles permanecem acessíveis.</li></ol></td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Alta</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF02; RNF01, RNF02, RNF03</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">3</td>
        </tr>
        <tr id="ustory-03">
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">US03</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Como potencial apoiador, eu quero consultar os três planos e seus preços para identificar uma opção compatível com o valor que pretendo contribuir.</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle"><ol><li>A seção de apoio apresenta os três planos definidos pelo projeto.</li><li>Cada plano possui uma identificação que o distingue dos demais e apresenta seu preço.</li><li>Os valores correspondem aos definidos pela equipe e ficam associados ao plano correto.</li><li>Identificação e preço seguem a mesma ordem de apresentação nos três planos.</li><li>Nos ambientes de RNF03, é possível consultar todos os planos e preços sem informações ocultadas por cortes ou sobreposições.</li></ol></td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Alta</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF03; RNF01, RNF03, RNF06</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">5</td>
        </tr>
        <tr id="ustory-04">
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">US04</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Como visitante, eu quero criar uma conta na plataforma para associar minhas aquisições e meus benefícios ao meu cadastro.</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle"><ol><li>O formulário apresenta os quatro campos e identifica que todos são obrigatórios.</li><li>Ao enviar dados válidos e um e-mail ainda não cadastrado, o sistema cria uma única conta e informa a conclusão.</li><li>Se um campo obrigatório estiver vazio ou não atender às regras, o sistema não cria a conta e informa o problema que precisa ser corrigido.</li><li>Se a senha e sua confirmação forem diferentes, o sistema impede o cadastro e informa a divergência.</li><li>Se o e-mail já estiver cadastrado, o sistema não cria uma segunda conta e informa que não foi possível concluir o cadastro com os dados apresentados.</li><li>Após corrigir os dados, o visitante consegue reenviar o formulário.</li><li>Em ambiente publicado, os dados são enviados por HTTPS e a senha não é armazenada em texto puro nem exposta em respostas ou logs, conforme RNF04.</li></ol></td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Alta</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF04; RNF03 e RNF04</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">não atribuídos nesta atividade</td>
        </tr>
        <tr id="ustory-05">
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">US05</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Como usuário cadastrado, eu quero adquirir um dos três planos de apoio para contribuir com o desenvolvimento do jogo e obter os benefícios correspondentes.</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle"><ol><li>Se o visitante tentar adquirir um plano sem estar identificado, o sistema solicita que entre em sua conta antes de prosseguir.</li><li>Após selecionar um plano, o usuário visualiza sua identificação, preço e benefícios antes de iniciar o pagamento.</li><li>O servidor registra a aquisição pendente vinculada à conta e ao plano selecionados, utilizando o preço definido pelo sistema.</li><li>Quando o servidor recebe e valida a confirmação do serviço de pagamento, a aquisição passa para confirmada e os benefícios correspondentes são disponibilizados.</li><li>Uma confirmação referente a outra aquisição ou com valor incompatível não libera benefícios.</li><li>Se a aquisição permanecer pendente, for cancelada ou falhar, o sistema apresenta a situação e não concede novos benefícios.</li><li>Caso a mesma confirmação seja recebida mais de uma vez, o sistema mantém um único registro de aquisição, sem duplicar a concessão de benefícios.</li><li>Ao concluir a operação, o registro corresponde à conta, ao plano e ao valor apresentados antes do pagamento.</li></ol></td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Alta</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF05; RF08 (identificação por login); RNF03 e RNF04</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">não atribuídos nesta atividade</td>
        </tr>
        <tr id="ustory-06">
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">US06</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Como apoiador, eu quero consultar meu plano adquirido e seus benefícios para saber o que meu apoio me permite receber ou acessar.</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle"><ol><li>Com a identidade do apoiador estabelecida e uma aquisição confirmada, o sistema apresenta o plano vinculado à sua conta.</li><li>A lista de benefícios corresponde à configuração do plano adquirido, sem apresentar benefícios de outro plano como direitos já obtidos.</li><li>Quando a conta não possui plano confirmado, o sistema informa essa condição e não apresenta benefícios como adquiridos.</li><li>Solicitações sem autorização não retornam os dados privados do plano de outra conta, conforme RNF05.</li><li>A apresentação respeita os critérios de compatibilidade e consistência de RNF03 e RNF06.</li></ol></td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Média</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF06; RNF03, RNF05, RNF06</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">a estimar pela equipe</td>
        </tr>
        <tr id="ustory-07">
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">US07</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Como apoiador, eu quero acessar os conteúdos exclusivos incluídos no meu plano para usufruir dos benefícios do apoio realizado.</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle"><ol><li>Para uma conta com aquisição confirmada, o sistema permite abrir os conteúdos disponibilizados e incluídos no respectivo plano.</li><li>Para uma conta cujo plano não inclui determinado conteúdo, o sistema nega o acesso sem entregar esse conteúdo.</li><li>Uma solicitação sem identificação válida ou sem plano confirmado não retorna conteúdo exclusivo.</li><li>As restrições também são aplicadas a solicitações diretas ao endereço do conteúdo, conforme RNF05.</li><li>Quando não houver conteúdo publicado para um benefício previsto, o sistema informa a indisponibilidade, sem apresentar um acesso inexistente como disponível.</li></ol></td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Média</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF07; RNF03, RNF05</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">a estimar pela equipe</td>
        </tr>
        <tr id="ustory-08">
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">US08</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Como usuário cadastrado, eu quero entrar na minha conta com e-mail e senha para adquirir um plano e acessar meus benefícios com minha identidade verificada.</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle"><ol><li>O formulário de login solicita e-mail e senha.</li><li>Ao informar as credenciais válidas de uma conta existente, o sistema estabelece uma sessão associada àquela conta.</li><li>A comparação do e-mail segue a normalização definida no cadastro; a senha deve ser verificada sem alterar seu conteúdo.</li><li>Se o e-mail não existir ou a senha estiver incorreta, o sistema não estabelece a sessão e apresenta a mesma mensagem genérica: “E-mail ou senha inválidos”.</li><li>Se um campo obrigatório estiver vazio, o sistema solicita seu preenchimento e não conclui o login.</li><li>A identidade usada na aquisição e nas consultas privadas deve corresponder à sessão validada pelo servidor; informar o identificador de outra conta na solicitação não concede acesso a ela.</li><li>O login, por si só, não concede benefícios de um plano: continuam sendo necessárias a aquisição confirmada e a autorização previstas em RF05–RF07.</li><li>Em ambiente publicado, as credenciais são transmitidas por HTTPS e não aparecem em respostas ou logs.</li></ol></td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">Alta</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">RF08; RNF03, RNF04, RNF05</td>
            <td style="border-style:solid;border-width:1px;text-align:center;vertical-align:middle">não atribuídos nesta atividade</td>
        </tr>
    </tbody>
</table>

<div style="text-align: center">
<p>Tabela 3: Histórias de Usuário</p>
</div>

## 2. Regras complementares

### US04 — Regras de cadastro

- Os campos obrigatórios são nome, e-mail, senha e confirmação de senha.
- O nome deve conter pelo menos um caractere diferente de espaço.
- O e-mail deve conter uma parte antes do símbolo “@” e um domínio depois dele, sem espaços.
- Cada endereço de e-mail pode estar associado a apenas uma conta. Para verificar duplicidade, o sistema desconsidera espaços nas extremidades e diferenças entre letras maiúsculas e minúsculas.
- A senha deve possuir pelo menos 15 caracteres, permitir espaços e aceitar pelo menos 64 caracteres, sem exigir combinações obrigatórias de números, símbolos e letras maiúsculas.
- A confirmação de senha deve ser igual à senha informada.
- A identificação posterior será feita por login com e-mail e senha. Esse comportamento está documentado em RF08 e US08.

### US05 — Regras de aquisição

- A aquisição exige que o usuário esteja identificado por login.
- Cada operação de aquisição corresponde a um plano selecionado.
- Nomes, valores e benefícios dos três planos devem estar definidos antes da disponibilização das compras.
- O processamento do pagamento será realizado por um serviço externo. Fornecedor e meios de pagamento serão escolhidos na implementação.
- A aquisição somente será confirmada após o servidor verificar uma confirmação válida do serviço de pagamento. O retorno do navegador para uma página de sucesso não será suficiente.
- Os estados considerados são: pendente, confirmada, cancelada e falhou.
- Somente uma aquisição confirmada concede os benefícios do plano.
- Uma tentativa pendente, cancelada ou malsucedida não remove direitos obtidos por uma aquisição anterior confirmada.

## 3. Dependências e observações

Os testes de compatibilidade seguem RNF03. Foram preservados os Story Points existentes; as demais estimativas ficam a cargo da equipe.

### US01 — Conhecer o jogo

**Dependência:** textos de apresentação fornecidos pela equipe.

### US02 — Assistir ao trailer

**Dependência:** arquivo ou origem do trailer disponível. O critério de maximização do vídeo, antes localizado em US01, foi transferido para esta história e explicitado como uma ação do visitante.

### US03 — Consultar os planos de apoio

**Dependência:** identificação e preços dos planos. Consultar planos não depende de concluir uma compra.

### US04 — Criar uma conta

**Dependências:** armazenamento de contas e implementação das validações. O cadastro pode ser testado separadamente do login e da aquisição.

### US05 — Adquirir um plano de apoio

**Dependências:** cadastro, login, configuração dos planos e integração com o serviço de pagamento. Os testes devem usar o ambiente de testes do serviço, sem cobranças reais.

**Observação sobre INVEST:** a história ficou mais verificável, mas seu tamanho e sua estimativa dependem da integração escolhida. Se o trabalho ultrapassar uma entrega curta, deverá ser dividido preservando resultados úteis para o usuário.

### US06 — Consultar os benefícios do meu plano

**Dependências:** US05 e definição dos benefícios de cada plano. O teste pode usar uma conta com aquisição previamente registrada.

### US07 — Acessar conteúdos exclusivos

**Dependências:** aquisição confirmada, conteúdos publicados e definição de quais planos autorizam cada conteúdo. O teste pode usar contas e conteúdos previamente preparados.

### US08 — Entrar na conta

**Dependência:** conta criada conforme RF04. O login não inclui recuperação de senha, login social ou autenticação por serviços externos neste escopo.

## 4. Rastreabilidade

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

## 5. Referências bibliográficas

- Documentação do projeto Velvet Requiem: [Requisitos Funcionais](RF.md).
- Documentação do projeto Velvet Requiem: [Requisitos Não Funcionais](RNF.md).
- [Apresentação do projeto](../README.md).
