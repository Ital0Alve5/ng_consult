# Projeto ng_consult

## Visão Geral
O projeto foi construído usando **Nuxt 3** com uma estrutura de monorepo, utilizando workspaces do `pnpm` para separar camadas e promover reusabilidade. Ele é composto pelas seguintes camadas:

- **App**: O ponto de entrada principal da aplicação, que integra todas as outras camadas.
- **Core**: Contém utilitários compartilhados, composables e configurações.
- **Auth**: Gerencia autenticação de usuários e middleware para controle de acesso.
- **Hotels**: Gerencia funcionalidades relacionadas a hotéis, como filtros, ordenação e comparações.
- **Reservations**: Gerencia funcionalidades de reserva, incluindo checkout e atualizações simuladas (mock).

## Estrutura do Projeto

```plaintext
NG_CONSULT/
├── app/               # Camada principal da aplicação
├── auth/              # Camada de autenticação
├── core/              # Utilitários e composables compartilhados
├── hotels/            # Funcionalidades relacionadas a hotéis
├── reservations/      # Funcionalidades de reserva
├── node_modules/      # Dependências
├── package.json       # Configuração do gerenciador de pacotes
├── pnpm-lock.yaml     # Arquivo de bloqueio do PNPM
├── pnpm-workspace.yaml # Configuração do workspace do PNPM
```

### Detalhes das Camadas

#### 1. **App**
Esta camada integra todas as outras camadas e serve como a aplicação principal voltada para o usuário.

**Diretórios Principais:**
- `components/`: Componentes de UI compartilhados.
- `layouts/`: Layouts de páginas.
- `plugins/`: Plugins Nuxt, como Pinia e Toastify.
- `store/`: Stores Pinia específicos da aplicação.
- `public/`: Recursos estáticos, como imagens e SVGs.
- `pages/`: Rotas da aplicação.

#### 2. **Core**
Fornece utilitários e composables compartilhados usados em todas as camadas.

**Diretórios Principais:**
- `utils/`: Funções utilitárias como `formatCurrency` e `calculateInstallmentValue`.
- `components/`: Contém componentes mais concretos e compartilhados (ou com potencial) entre as layers.

#### 3. **Auth**
Gerencia a autenticação de usuários e o controle de acesso.

**Principais Funcionalidades:**
- Middleware para proteção de rotas.
- Gerenciamento de login e logout de usuários.

#### 4. **Hotels**
Gerencia funcionalidades específicas de hotéis, como filtros, ordenação e comparações.

**Principais Funcionalidades:**
- Middleware para validar queries de comparação de hotéis.
- Componentes para filtros (e.g., `SearchHotelName`, `SortBy`).
- Mock API para dados de hotéis.

#### 5. **Reservations**
Foca em fluxos de reserva, incluindo checkout e atualizações de status.

**Principais Funcionalidades:**
- Middleware para validar rotas de reserva.
- Componentes para formulários, como `CreditCardNumber`, `FullName`.
- Atualizações simuladas de reservas (mock).


## Instalação

1. Clone o repositório:
   ```bash
   git clone <repository-url>
   cd ng_consult
   ```

2. Instale as dependências:
   ```bash
   cd app
   pnpm install
   ```

3. Execute o servidor de desenvolvimento no app:
   ```bash
   pnpm run dev
   ```
   
4. Foram criados testes unitários básicos para os componentes. Eles são definidos para cada camada usando **Vitest**. Execute testes rodando, em cada camada, o comando:
   ```bash
   pnpm test
   ```

## Dados Mockados para Testes

- **Usuário Cadastrado:**
  - Email: `italo@gmail.com`
  - Senha: `1234567`

- **Notificações Mockadas:**
  - Após realizar uma reserva, o sistema simula notificações de status da reserva em um intervalo de 8 segundos.

- **Imagens Placeholders:**
  - Algumas imagens são geradas com placeholders e podem falhar ocasionalmente.


## Funcionalidades Principais

1. **Autenticação**
   - Login e logout.
   - Middleware para proteção de rotas.

2. **Busca e Filtros de Hotéis**
   - Busca por nome, capacidade e preço.
   - Ordenação por preço e avaliação.

3. **Comparação de Hotéis**
   - Comparar hotéis lado a lado (após 4, ficam um abaixo do outro).

4. **Reserva de Hotéis**
   - Formulário de checkout com validações.
   - Atualizações simuladas de status após a reserva.

5. **Experiência de Usuário**
   - Lazy loading para otimizar o carregamento de componentes (e.g., calendário).
   - Imagens placeholders para visualização rápida.


## Observações

Pela característica da aplicação, em que todos os componentes estão na primeira dobra, o uso do Lazy Loading fica mais restrito.
Em alguns componentes, entretanto, foi possível fazer uso, como por exemplo, o calendário que só carrega ao clicar para abrir.
