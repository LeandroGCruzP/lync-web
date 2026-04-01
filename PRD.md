# PRD — Lync: Plataforma de Gestão de Eventos Esportivos

**Versão:** 1.0
**Data:** 2026-03-31
**Status:** Rascunho

---

## 1. Visão Geral do Produto

**Lync** é uma plataforma web para criação, gestão e participação em eventos esportivos. O produto permite que usuários criem eventos de forma independente ou organizem times e comunidades por meio de **organizações**, com controle de acesso, convites e gestão de membros.

O produto resolve a fragmentação atual na organização de eventos esportivos amadores e semi-profissionais, onde coordenadores usam WhatsApp, planilhas e outras ferramentas improvisadas para gerenciar inscrições, pagamentos e times.

---

## 2. Problema

Organizadores de eventos esportivos (peladas, torneios, campeonatos) enfrentam:

- Dificuldade em reunir e gerenciar participantes em um único lugar
- Ausência de controle de vagas, times e pagamentos
- Falta de visibilidade pública para eventos
- Complexidade em colaborar com outros organizadores

---

## 3. Público-Alvo

| Perfil | Descrição |
|---|---|
| **Organizador individual** | Cria e gerencia eventos próprios sem vínculo a uma organização |
| **Administrador de organização** | Lidera uma comunidade esportiva (clube, grupo, associação) |
| **Membro de organização** | Participa de eventos criados pela organização da qual é membro |
| **Participante convidado** | Recebe convite por e-mail para integrar uma organização |

---

## 4. Objetivos do Produto

1. Permitir que qualquer usuário crie e publique eventos esportivos com facilidade
2. Oferecer estrutura de organizações para gestão colaborativa de eventos
3. Suportar modelos de pagamento (gratuito, pagar para inscrever, pagar para confirmar)
4. Controlar acesso via roles (ADMIN / MEMBER) com permissões granulares (CASL)
5. Fornecer uma experiência fluida de convite e onboarding de novos membros

---

## 5. Funcionalidades

### 5.1 Autenticação

| Funcionalidade | Descrição |
|---|---|
| Cadastro por e-mail/senha | Criação de conta com validação |
| Login por e-mail/senha | Autenticação com token JWT (cookie 7 dias) |
| Login via GitHub OAuth | Autenticação social com callback |
| Recuperação de senha | Envio de link de reset por e-mail |
| Reset de senha | Troca de senha via token |

---

### 5.2 Organizações

| Funcionalidade | Descrição |
|---|---|
| Criar organização | Nome, slug, avatar, domínio de e-mail opcional |
| Auto-vinculação por domínio | Usuários com e-mail do domínio da org são adicionados automaticamente |
| Editar organização | Atualização de nome, avatar e configurações |
| Excluir organização | Apenas pelo owner |
| Trocar de organização | Seletor no header com acesso rápido entre orgs |
| Dashboard por organização | Visão de eventos, membros e configurações |

---

### 5.3 Membros e Convites

| Funcionalidade | Descrição |
|---|---|
| Convidar membro por e-mail | Geração de convite com papel (ADMIN ou MEMBER) |
| Listar convites pendentes | Visão administrativa dos convites enviados |
| Revogar convite | Cancelar convite antes da aceitação |
| Aceitar convite | Via link único; funciona para usuários novos e existentes |
| Rejeitar convite | Usuário recusa a entrada na organização |
| Listar membros | Tabela com nome, e-mail, avatar e papel |
| Alterar papel do membro | Promoção/rebaixamento entre ADMIN e MEMBER |
| Remover membro | Exclusão de membro da organização |

---

### 5.4 Eventos

| Funcionalidade | Descrição |
|---|---|
| Criar evento standalone | Evento sem vínculo a uma organização |
| Criar evento na organização | Evento associado a uma org específica |
| Listar eventos pessoais | Dashboard com eventos do usuário |
| Listar eventos da organização | Eventos filtrados por org |
| Detalhe do evento | Página dedicada com informações completas |
| Configurar esporte | Seleção do esporte a partir de lista de referência |
| Configurar vagas e times | Número de slots e jogadores por time |
| Configurar modelo de pagamento | FREE / PAY_TO_REGISTER / PAY_TO_CONFIRM + valor |
| Datas de início e fim | Data/hora de início obrigatória; fim opcional |

---

### 5.5 Controle de Acesso (RBAC)

| Sujeito | ADMIN | MEMBER |
|---|---|---|
| Organização (update, delete) | Apenas owner | — |
| Organização (transfer_ownership) | Apenas owner | — |
| Membros (get, invite, update, delete) | Sim | Apenas próprio perfil |
| Convites (manage) | Sim | — |
| Eventos (manage) | Sim | get |

---

## 6. Arquitetura Técnica

### 6.1 Frontend

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript 5 (strict) |
| UI | Radix UI + Tailwind CSS 4 |
| Estado servidor | TanStack React Query 5 |
| HTTP Client | Ky com interceptors (Bearer token) |
| Validação | Zod 4 |
| Autorização | CASL/ability 6 |
| Bundler | Turbopack |

### 6.2 Backend (API externa)

- REST API em `NEXT_PUBLIC_API_URL` (padrão: `http://localhost:3333`)
- Responsável por toda persistência, regras de negócio e envio de e-mails
- Autenticação via token JWT em cookie `token`

### 6.3 Padrões de implementação

| Padrão | Uso |
|---|---|
| Server Components | Fetching de dados nas páginas principais |
| Server Actions | Submissão de formulários (create/update/delete) |
| Intercepted Routes | Formulários em modal (Sheet) sem perder contexto |
| Parallel Routes | Layouts compostos (ex: `@sheet`) |
| Middleware | Verificação de membership por org slug |

---

## 7. Estrutura de Rotas

```
/auth/sign-in                    Login
/auth/sign-up                    Cadastro
/auth/forgot-password            Recuperar senha
/auth/reset-password             Resetar senha

/                                Dashboard pessoal (eventos)
/create-organization             Criar organização
/create-event                    Criar evento standalone

/org/[slug]                      Dashboard da organização
/org/[slug]/events               Eventos da organização
/org/[slug]/events/[event_slug]  Detalhe do evento
/org/[slug]/members              Membros da organização
/org/[slug]/settings             Configurações da organização
/org/[slug]/create-event         Criar evento na organização

/invite/[id]                     Aceitar convite de organização
```

---

## 8. Modelos de Dados (Interface)

### Usuário
```
id, email, name, avatarUrl
```

### Organização
```
id, name, slug, domain, ownerId, avatarUrl,
shouldAttachUsersByDomain, createdAt, updatedAt
```

### Evento
```
id, name, slug, description, startDate, endDate,
sport, organization, slots, playersPerTeam,
paymentModel (FREE | PAY_TO_REGISTER | PAY_TO_CONFIRM), price
```

### Membro
```
id, userId, email, name, avatarUrl, role (ADMIN | MEMBER)
```

### Convite
```
id, email, role, organization, author, createdAt
```

---

## 9. Fora do Escopo (v1)

- Pagamentos online (gateway de pagamento)
- Chat/mensagens entre membros
- Notificações push ou em tempo real
- App mobile nativo
- Gerenciamento de chaveamento/bracket de torneios
- Integração com calendários externos (Google Calendar, etc.)
- Perfil público de jogador com histórico de eventos

---

## 10. Métricas de Sucesso

| Métrica | Objetivo |
|---|---|
| Organizações criadas | Indicador de adoção por times/grupos |
| Eventos publicados | Indicador de uso efetivo |
| Taxa de aceitação de convites | Qualidade do fluxo de onboarding |
| Retenção mensal | Usuários que criam >1 evento/mês |

---

## 11. Riscos e Mitigações

| Risco | Mitigação |
|---|---|
| API backend indisponível | Feedback de erro claro ao usuário; skeleton loaders |
| Token expirado sem renovação | Redirect automático para login via middleware |
| Acesso não autorizado a org | Middleware valida membership antes de renderizar |
| Dados inválidos no formulário | Validação Zod no cliente e no servidor |

---

## 12. Próximos Passos (Backlog Sugerido)

1. **Inscrição em eventos** — permitir que usuários se inscrevam e gerenciem sua participação
2. **Controle de vagas** — bloquear inscrições quando o evento atinge o limite de slots
3. **Gestão de times** — alocação automática ou manual de jogadores por time
4. **Integração de pagamento** — PIX ou cartão para modelos PAY_TO_REGISTER / PAY_TO_CONFIRM
5. **Notificações** — e-mail ao criar evento, confirmar inscrição, alterar papel
6. **Perfil do usuário** — editar nome, avatar e e-mail
7. **Evento público** — página acessível sem login para divulgação
