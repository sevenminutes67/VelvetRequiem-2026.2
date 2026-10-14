# Requisitos Funcionais — Velvet Requiem

O site apresenta o jogo de terror independente Velvet Requiem e permite apoiar seu desenvolvimento por meio de três planos. Estes requisitos descrevem o comportamento esperado, não funcionalidades já implementadas.

## Perfis de usuário

- **Visitante:** pessoa que consulta as informações públicas do projeto.
- **Usuário cadastrado:** pessoa que possui uma conta na plataforma.
- **Apoiador:** usuário com aquisição de plano confirmada.

## Requisitos

| ID | Descrição | Prioridade | Requisitos e histórias relacionados |
| --- | --- | --- | --- |
| RF01 | O sistema deve apresentar, na página inicial, a proposta e as principais características do jogo. | Alta | RNF01, RNF02, RNF03, RNF06; US01 |
| RF02 | O sistema deve disponibilizar o trailer do jogo e permitir iniciar, pausar e retomar sua reprodução. Em celular, deve permitir expandir o vídeo para tela cheia e retornar à página. | Alta | RNF01, RNF02, RNF03; US02 |
| RF03 | O sistema deve apresentar os três planos de apoio, identificando cada plano e seu respectivo preço. | Alta | RNF01, RNF03, RNF06; US03 |
| RF04 | O sistema deve permitir criar uma conta com nome, e-mail único, senha e confirmação de senha, aplicar as regras de cadastro deste documento e informar os erros que impedem a conclusão. | Alta | RNF03, RNF04; US04 |
| RF05 | O sistema deve permitir que um usuário identificado por login adquira um dos três planos, apresentando identificação, preço e benefícios antes do pagamento. Deve vincular a aquisição à conta e conceder benefícios somente após confirmação válida do serviço de pagamento verificada pelo servidor. | Alta | RF03, RF04, RF08; RNF03, RNF04; US05 |
| RF06 | O sistema deve permitir que o apoiador consulte seu plano adquirido e os benefícios correspondentes. | Média | RF05; RNF03, RNF05, RNF06; US06 |
| RF07 | O sistema deve permitir que o apoiador acesse os conteúdos exclusivos previstos para seu plano e negar acesso aos conteúdos não incluídos nele. | Média | RF05, RF06; RNF03, RNF05; US07 |
| RF08 | O sistema deve permitir que um usuário cadastrado entre na conta usando e-mail e senha, estabelecendo uma sessão somente após validar as credenciais. Deve usar essa identidade nas operações de aquisição e acesso privado, sem conceder benefícios de plano apenas por realizar login. | Alta | RF04, RF05, RF06, RF07; RNF03, RNF04, RNF05; US08 |

## Regras de cadastro e aquisição

### Cadastro — RF04

- Nome, e-mail, senha e confirmação de senha são obrigatórios.
- O nome deve conter ao menos um caractere diferente de espaço.
- O e-mail deve possuir uma parte antes de “@” e um domínio depois, sem espaços. Para verificar unicidade, remover espaços nas extremidades e desconsiderar diferenças entre maiúsculas e minúsculas.
- A senha deve ter pelo menos 15 caracteres, permitir espaços e aceitar pelo menos 64 caracteres. Não são exigidas combinações obrigatórias de números, símbolos e letras maiúsculas.
- A confirmação deve ser igual à senha. Cadastros inválidos ou com e-mail duplicado não criam uma conta.
- O sistema permite corrigir os dados e reenviar o formulário.

### Aquisição — RF05

- Cada operação corresponde a um plano e exige login conforme RF08.
- Os estados são pendente, confirmada, cancelada e falhou.
- O pagamento será processado por um serviço externo; fornecedor e meios de pagamento serão definidos na implementação.
- O servidor registra conta, plano e preço usando os dados definidos pelo sistema.
- O servidor valida a confirmação do serviço de pagamento e sua correspondência com a aquisição e o valor esperado. O retorno do navegador para uma página de sucesso não confirma a aquisição.
- Confirmações repetidas não duplicam o registro nem a concessão dos benefícios.
- Operações pendentes, canceladas ou com falha não concedem novos benefícios nem removem direitos de aquisições anteriores confirmadas.
- Testes da integração utilizam o ambiente de testes do serviço, sem cobranças reais.

### Login — RF08

- Utilizar o e-mail normalizado segundo RF04 e verificar a senha sem modificar seu conteúdo.
- Campos vazios impedem o login. E-mail inexistente e senha incorreta produzem a mesma mensagem genérica, sem estabelecer sessão.
- A identidade da conta é validada no servidor e não pode ser substituída por um identificador enviado pelo usuário.

## Delimitação

Os nomes, preços e benefícios dos planos devem ser fornecidos pela equipe. Nenhum valor ou benefício específico é estabelecido por este documento. As regras de cadastro, login e confirmação de aquisição estão definidas acima e detalhadas em US04, US05 e US08. A escolha do serviço de pagamento e a configuração dos planos permanecem como decisões de implementação. Não estão sendo acrescentados carrinho, cupons, assinaturas recorrentes ou uma área administrativa.

## Documentos relacionados

- [Requisitos não funcionais](RNF.md)
- [Histórias de usuário](HistoriasUsuario.md)
- [Início](../README.md)
