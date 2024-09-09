### Documentação Básica - Aplicação de Gerenciamento de Ações

#### Estrutura de Arquivos
- **index.html**: Estrutura básica da interface do usuário.
- **style.css**: Estilos adicionais para personalizar a interface.
- **script.js**: Funções JavaScript responsáveis pela lógica da aplicação, como manipulação de DOM e interação com o backend.

#### Funcionalidades
1. **Exibição das Ações**
   - A aplicação exibe uma lista de ações cadastradas em uma tabela.
   - Se não houver ações cadastradas, uma mensagem indicando isso é exibida.

2. **Adicionar uma Nova Ação**
   - Ao clicar no botão "Adicionar ação", um formulário é exibido para permitir que o usuário insira as informações da nova ação.
   - O formulário exige que todos os campos sejam preenchidos antes do envio.

3. **Editar Ação**
   - Cada ação na tabela tem um botão "Editar". Ao clicar, os dados da ação são carregados no formulário para edição.
   - Após a edição, as informações são atualizadas no servidor.

4. **Deletar Ação**
   - Cada ação na tabela tem um botão "Deletar". Ao clicar, a ação é removida após uma confirmação do usuário.

5. **Persistência de Dados**
   - As informações são armazenadas em um backend que responde em endpoints REST. As operações de leitura (`GET`), criação (`POST`), edição (`PUT`), e exclusão (`DELETE`) são realizadas por meio de requisições HTTP.

#### Estrutura de Código - JavaScript
- **`getStocks()`**: Requisita as ações do servidor e renderiza a lista na tabela.
- **`renderStocksList(stocks)`**: Recebe a lista de ações e atualiza o conteúdo da tabela.
- **`deleteStock(id)`**: Deleta uma ação do servidor após confirmação do usuário.
- **`openCreateModal()`**: Exibe o formulário para adicionar uma nova ação.
- **`editStock(id)`**: Carrega os dados de uma ação específica no formulário para edição.
- **`stock-form submit`**: Gerencia o envio do formulário, realizando a criação ou atualização da ação, conforme necessário.

#### Requisitos
- **Frontend**: HTML, CSS (Bootstrap), JavaScript
- **Backend**: Um servidor REST que atenda as requisições HTTP nas rotas mencionadas.