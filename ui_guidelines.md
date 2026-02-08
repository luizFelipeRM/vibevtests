# UI Architecture & Coding Style Guide (Component-Driven UI - CDUI)

## 🚨 REGRAS ABSOLUTAS PARA IA

**ANTES de escrever QUALQUER código, a IA DEVE:**

1. **IMPORTAR design tokens** de `@/design/` para TODOS os valores de estilo
2. **NUNCA usar valores hardcoded** (como `10`, `"#fff"`, `14px`)
3. **SEMPRE usar os tokens** correspondentes:
   - Cores → `colors.xxx`
   - Espaçamentos → `space.xxx`
   - Tamanhos de fonte → `fontSizes.xxx`
   - Largura/Altura → `sizes.xxx`
   - Bordas arredondadas → `radius.xxx`
   - Sombras → `shadow.xxx`
   - Z-index → `zIndex.xxx`

---

## 🎯 DESIGN TOKENS - USO OBRIGATÓRIO

### 📁 Estrutura da pasta `@/design/`:

```
@/design/
├── colors.ts      → cores do sistema
├── fontSizes.ts   → tamanhos de fonte
├── fontWeights.ts → pesos de fonte
├── lineHeights.ts → alturas de linha
├── radius.ts      → bordas arredondadas
├── shadow.ts      → sombras
├── sizes.ts       → dimensões (width, height, maxWidth, etc.)
├── space.ts       → espaçamentos (margin, padding, gap)
└── zIndex.ts      → camadas de sobreposição
```

### 📝 Exemplo CORRETO (use assim):

```tsx
// ✅ CORRETO: Importe e use TODOS os tokens necessários
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { fontSizes } from "@/design/fontSizes";
import { sizes } from "@/design/sizes";
import { radius } from "@/design/radius";

function MeuComponente() {
  return (
    <div
      style={{
        backgroundColor: colors.primary, // ✅ Usando token de cor
        padding: space.lg, // ✅ Usando token de espaçamento
        fontSize: fontSizes.md, // ✅ Usando token de fonte
        width: sizes.container, // ✅ Usando token de tamanho
        borderRadius: radius.md, // ✅ Usando token de borda
        margin: `${space.md} ${space.lg}`, // ✅ Combinação permitida
      }}
    >
      Conteúdo
    </div>
  );
}
```

### ❌ EXEMPLOS ERRADOS (NUNCA FAÇA):

```tsx
// ❌ ERRADO: Valores hardcoded
<div style={{ color: "#fff", margin: 10, fontSize: 14 }}>

// ❌ ERRADO: Importação incorreta
import { space } from "@/design/space";
<div style={{ margin: "10px" }}>  // ❌ Não use "10px", use space.sm

// ❌ ERRADO: Misturar tokens de forma errada
<div style={{ fontSize: space.md }}>  // ❌ Não misture categories

// ❌ ERRADO: Usar token errado
<div style={{ color: space.md }}>  // ❌ Cores usam colors.xxx
```

---

## 🔢 REGRA DE ARREDONDAMENTO PARA TOKENS EXISTENTES

Quando encontrar valores numéricos hardcoded (ex: `13`, `15px`, `11`) durante refatoração:

### 📐 **REGRA DO MAIS PRÓXIMO COM ARREDONDAMENTO PARA CIMA**

1. **Encontre o token mais próximo** na escala correspondente
2. **Se houver 2 tokens igualmente próximos** → use o **MAIOR** (arredonda para cima)

---

### 📊 EXEMPLOS PRÁTICOS:

#### Supondo estes tokens existentes em `fontSizes.ts`:

```ts
export const fontSizes = {
  xs: 12, // 12px
  sm: 14, // 14px
  md: 16, // 16px
  lg: 18, // 18px
  xl: 20, // 20px
  xxl: 24, // 24px
};
```

#### Valores encontrados → Token a usar:

```ts
// VALOR  | DISTÂNCIAS                    | RESULTADO
//--------|-------------------------------|-----------
13       | 12(1) ←→ 14(1) → EMPATE       | sm (14px) ✅ ARREDONDA PRA CIMA
15       | 14(1) ←→ 16(1) → EMPATE       | md (16px) ✅ ARREDONDA PRA CIMA
17       | 16(1) ←→ 18(1) → EMPATE       | lg (18px) ✅ ARREDONDA PRA CIMA
11       | 12(1) → MAIS PRÓXIMO          | xs (12px) ✅
22       | 20(2) ←→ 24(2) → EMPATE       | xxl (24px) ✅ ARREDONDA PRA CIMA
19       | 18(1) ←→ 20(1) → EMPATE       | xl (20px) ✅ ARREDONDA PRA CIMA
25       | 24(1) → MAIS PRÓXIMO          | xxl (24px) ✅
```

---

### 🧮 ALGORITMO PASSO-A-PASSO:

```typescript
function encontrarTokenMaisProximo(
  valorEncontrado: number,
  tokens: number[],
): number {
  // 1. Calcular distâncias para cada token
  const distancias = tokens.map((token) => Math.abs(token - valorEncontrado));

  // 2. Encontrar a menor distância
  const menorDistancia = Math.min(...distancias);

  // 3. Verificar se há empate (2+ tokens com mesma distância)
  const tokensEmpatados = tokens.filter(
    (token, index) => distancias[index] === menorDistancia,
  );

  // 4. Se houver empate, escolher o MAIOR valor
  if (tokensEmpatados.length > 1) {
    return Math.max(...tokensEmpatados);
  }

  // 5. Se não houver empate, retornar o único mais próximo
  return tokens[tokens.findIndex((d) => d === menorDistancia)];
}
```

---

### 📝 EXEMPLOS DE REFATORAÇÃO COM ARREDONDAMENTO:

#### ❌ Código antigo:

```tsx
<div style={{
  fontSize: 13,    // ❌ Valor hardcoded
  margin: 11,      // ❌ Valor hardcoded
  padding: 22,     // ❌ Valor hardcoded
}}>
```

#### ✅ Código refatorado:

```tsx
import { fontSizes } from "@/design/fontSizes";
import { space } from "@/design/space";

// Supondo: space.xs=8, space.sm=12, space.md=16, space.lg=20, space.xl=24

<div style={{
  fontSize: fontSizes.sm,   // ✅ 13 → empate 12/14 → arredonda pra 14 (sm)
  margin: space.sm,         // ✅ 11 → mais próximo de 12 (sm)
  padding: space.xl,        // ✅ 22 → empate 20/24 → arredonda pra 24 (xl)
}}>
```

---

### 🎯 APLICAÇÃO POR CATEGORIA:

#### **fontSizes**

- Valores em pixels → arredonda para token de `fontSizes` mais próximo

#### **space**

- Valores em pixels → arredonda para token de `space` mais próximo

#### **sizes**

- Valores em pixels, %, vw/vh → use token mais próximo em `sizes`

#### **radius**

- Valores em pixels → arredonda para token de `radius` mais próximo

#### **NÃO APLICA PARA:**

- `colors` → precisa correspondência exata ou criar novo token
- `fontWeights` → precisa correspondência exata (400, 700, etc.)
- `lineHeights` → normalmente decimais (1.2, 1.5, etc.)

---

### ⚠️ CASOS ESPECIAIS:

#### 1. **Valores muito específicos** (ex: `13.5`):

```tsx
// 13.5 → empate entre 12(1.5) e 14(0.5) → mais próximo é 14
fontSize: 13.5 → fontSizes.sm (14px)
```

#### 2. **Valores zero**:

```tsx
// 0 sempre é 0, não arredonda
margin: 0 → space.0 (se existir) ou 0
```

#### 3. **Valores fora da escala**:

```tsx
// Ex: 100px quando maior token é 64px
// Use o maior token disponível + comentário
width: sizes.xxl, // 64px (valor original 100px, usar token maior disponível)
```

#### 4. **Valores compostos**:

```tsx
// Aplica regra para CADA valor individualmente
margin: "13px 11px";
// Vira:
margin: `${space.sm} ${space.sm}`; // 14px 12px
```

---

### 🧪 TESTE RÁPIDO - O QUE USAR?

Dados os tokens:

```ts
space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 };
fontSizes = { xs: 12, sm: 14, md: 16 };
```

1. `margin: 10` → ?
2. `fontSize: 15` → ?
3. `padding: 18` → ?
4. `gap: 7` → ?

**Respostas:**

1. `space.md` (12px) → 10 é mais próximo de 12 (distância 2) que de 8 (distância 2)? Empate! → arredonda pra cima → 12 (md)
2. `fontSizes.md` (16px) → 15 empate 14/16 → arredonda pra cima → 16 (md)
3. `space.xl` (20px) → 18 empate 16/20 → arredonda pra cima → 20 (xl)
4. `space.sm` (8px) → 7 mais próximo de 8 (1) que 4 (3)

---

### 📌 REGRA DE OURO PARA IA:

**SEMPRE que ver um número:**

1. Identifique qual token usar (space, fontSizes, etc.)
2. Pegue todos os valores numéricos dos tokens dessa categoria
3. Encontre o valor mais próximo
4. **Se empate → escolha o MAIOR**
5. Use o nome do token correspondente

**NUNCA** crie valores intermediários, **SEMPRE** use os tokens existentes mais próximos.

---

## 🧩 HIERARQUIA DE COMPONENTES - LIFE CYCLE

### 1. 🐣 NASCIMENTO (em `_sections/`)

```tsx
// Quando algo é único para uma seção específica
// Nasce dentro de `_sections/` do módulo
```

### 2. 🔄 REUTILIZAÇÃO LOCAL (move para `_components/`)

```tsx
// Se usado em 2+ `_sections` do MESMO módulo
// Move para `_components/` do módulo atual
```

### 3. 🌍 REUTILIZAÇÃO GLOBAL (move para `@/components/`)

```tsx
// Se usado em 2+ MÓDULOS DIFERENTES
// Move para `@/components/` com documentação clara
```

### 4. 📦 DESIGN TOKEN (se usado 5+ vezes com mesmo valor)

```tsx
// Se um valor específico aparece 5+ vezes
// Adiciona como novo token em `@/design/`
```

---

## 📁 ESTRUTURA DE PASTAS - REGRAS CLARAS

### Módulo exemplo: `Footer/`

```
Footer/
├── index.tsx                    # Componente principal
├── _sections/                   # Partes estruturais ÚNICAS
│   ├── WhoWeAre.tsx             # Apenas no Footer
│   └── OurApps.tsx              # Apenas no Footer
├── _components/                 # Reusados DENTRO do Footer
│   ├── FooterLink.tsx           # Usado em 2+ sections
│   ├── FooterSection.tsx        # Usado em 2+ sections
│   └── FooterTitle.tsx          # Usado em 2+ sections
└── (NÃO tem acesso a outros módulos)
```

### `@/components/` - Componentes Globais

```
@/components/
├── Quote.tsx                    # Usado em Footer + Header + Page
├── Button.tsx                   # Usado em múltiplos módulos
├── Modal.tsx                    # Usado em múltiplos módulos
└── Icon.tsx                     # Usado em múltiplos módulos
```

---

## 🔧 REFATORAÇÃO DE CÓDIGO EXISTENTE

### Quando refatorar código antigo:

#### 1. IDENTIFIQUE valores hardcoded:

```tsx
// Código antigo:
<div style={{ margin: 20, color: "red" }}>

// ✅ Refatorado:
<div style={{ margin: space.xl, color: colors.error }}>
```

#### 2. VERIFIQUE imports faltando:

```tsx
// ❌ Antes:
<div style={{ padding: 10 }}>

// ✅ Depois:
import { space } from "@/design/space";
<div style={{ padding: space.md }}>
```

#### 3. ORGANIZE por responsabilidade:

```tsx
// ❌ Antes: Componente genérico grande
<Section variant="footer" items={[...]} title="Apps">

// ✅ Depois: Composição clara
<FooterSection>
  <FooterTitle />
  <FooterLink />
</FooterSection>
```

---

## 🎯 REGRAS POR TIPO DE VALOR

### CORES → `colors.ts`

```tsx
// ✅ SEMPRE:
color: colors.primary;
backgroundColor: colors.background;
borderColor: colors.border;

// ❌ NUNCA:
color: "#ff0000";
color: "red";
color: "var(--primary)";
```

### ESPAÇAMENTOS → `space.ts`

```tsx
// ✅ SEMPRE:
margin: space.sm;
padding: `${space.xs} ${space.md}`;
gap: space.lg;

// ❌ NUNCA:
margin: 8;
padding: "10px 20px";
gap: 16;
```

### TAMANHOS → `sizes.ts`

```tsx
// ✅ SEMPRE:
width: sizes.container;
height: sizes.icon;
maxWidth: sizes.page;
minHeight: sizes.screen;

// ❌ NUNCA:
width: 1200;
height: "100%";
maxWidth: "90vw";
```

### FONTES → `fontSizes.ts` + `fontWeights.ts`

```tsx
// ✅ SEMPRE:
fontSize: fontSizes.lg;
fontWeight: fontWeights.bold;
fontSize: fontSizes.body;

// ❌ NUNCA:
fontSize: 16;
fontWeight: 700;
fontSize: "1rem";
```

---

## 🤖 PROMPT PARA IA - USE ESTE EXATO FORMATO

```
SIGA ESTAS REGRAS ABSOLUTAMENTE:

1. IMPORTS OBRIGATÓRIOS para cada token usado:
   - Se usar cor → import { colors } from "@/design/colors"
   - Se usar espaçamento → import { space } from "@/design/space"
   - Se usar fonte → import { fontSizes } from "@/design/fontSizes"
   - Continue para cada tipo...

2. NUNCA use valores hardcoded (números, strings hex, px, rem)

3. SIGA a hierarquia:
   - Componente único → _sections/
   - Reuso no módulo → _components/
   - Reuso global → @/components/

4. COMPONENTES por significado, não aparência

5. COMPOSIÇÃO acima de configuração

6. APLIQUE REGRA DE ARREDONDAMENTO:
   - Para valores numéricos encontrados, use o token mais próximo
   - Em caso de empate, arredonde para o MAIOR valor

Código existente em `app/` é apenas referência de funcionalidade.
REFA TORE usando design tokens e estrutura modular.
```

---

## 📋 CHECKLIST DE VERIFICAÇÃO

Antes de finalizar qualquer código, VERIFIQUE:

### ✅ IMPORTS:

- [ ] Importei TODOS os design tokens necessários?
- [ ] Nenhum import está faltando?

### ✅ VALORES:

- [ ] Zero valores hardcoded (cores, números, strings)?
- [ ] Todos os valores vêm de `@/design/`?
- [ ] Não estou misturando categorias (ex: `fontSize: space.md`)?
- [ ] Valores numéricos foram arredondados para tokens mais próximos?
- [ ] Em caso de empate, arredondei para o MAIOR token?

### ✅ ESTRUTURA:

- [ ] Componente está na pasta correta?
- [ ] Nome reflete significado/função?
- [ ] Não estou criando abstração prematura?

### ✅ RESPONSABILIDADE:

- [ ] Estilo está dentro do componente?
- [ ] Não tem CSS global?
- [ ] Lógica de UI separada de lógica de negócio?

---

## 🚨 PADRÃO DE IMPORTAÇÃO - NÃO ESQUEÇA!

```tsx
// ✅ PADRÃO CORRETO - Importe APENAS o que usar
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { fontSizes } from "@/design/fontSizes";
import { sizes } from "@/design/sizes";
import { radius } from "@/design/radius";
import { shadow } from "@/design/shadow";

// ❌ NÃO FAÇA - Importe tudo
import * as design from "@/design"; // ❌ ERRADO
import tokens from "@/design"; // ❌ ERRADO
```

---

## 🔄 EXEMPLO COMPLETO DE REFATORAÇÃO

### Código Antigo (gerado por IA sem padrão):

```tsx
// ❌ PROBLEMAS: Valores hardcoded, sem imports, estrutura genérica
<div
  style={{
    backgroundColor: "#2d5a27",
    padding: "20px",
    fontSize: 14,
    borderRadius: 8,
    margin: "10px 0",
    color: "white",
  }}
>
  Conteúdo
</div>
```

### Código Refatorado (seguindo CDUI):

```tsx
// ✅ CORRETO: Todos os tokens importados e usados
import { colors } from "@/design/colors";
import { space } from "@/design/space";
import { fontSizes } from "@/design/fontSizes";
import { radius } from "@/design/radius";

function ContentCard() {
  return (
    <div
      style={{
        backgroundColor: colors.dark_green, // ✅ Token de cor
        padding: space.xl, // ✅ Token de espaçamento
        fontSize: fontSizes.md, // ✅ Token de fonte
        borderRadius: radius.md, // ✅ Token de borda
        margin: `${space.md} 0`, // ✅ Token combinado
        color: colors.white, // ✅ Token de cor
      }}
    >
      Conteúdo
    </div>
  );
}
```

---

## 📞 O QUE FAZER SE UM TOKEN NÃO EXISTE?

1. **Verifique se realmente não existe** em `@/design/`
2. **Use o token mais próximo** temporariamente
3. **Adicione comentário** para adicionar depois:

```tsx
// TODO: Adicionar token 'spacing_hero' em space.ts
padding: space.xxl, // Atualmente usando xxl, mas precisa de valor específico
```

---

## 🎖️ EM UMA FRASE FINAL

**NUNCA valores hardcoded, SEMPRE design tokens, COMPOSIÇÃO acima de configuração, COMPONENTES por significado. Use a REGRA DO ARREDONDAMENTO para valores próximos.**
