# ViverLeve - Site de Vendas

Este é o repositório do site da **ViverLeve**, uma loja virtual focada em produtos de saúde, bem-estar e beleza. O site foi desenvolvido para ser simples, rápido e fácil de gerenciar, permitindo que a equipe da ViverLeve atualize produtos e novidades sem precisar de conhecimentos técnicos avançados.

## ✨ Funcionalidades

- **Catálogo de produtos** com imagens, descrições, preços e links de compra (afiliados).
- **Carrinho de compras interativo** (armazenado no navegador do cliente) com remoção de itens e cálculo automático do total.
- **Busca em tempo real** para filtrar produtos pelo nome.
- **Seção de novidades** com fotos automáticas vindas de um álbum público do Google Fotos.
- **Formulário de contato** funcional (envia mensagens por e-mail).
- Design responsivo (funciona em celulares, tablets e computadores).
- Cores personalizadas (verde e amarelo) e gradiente suave no fundo.

## 🛠️ Tecnologias Utilizadas

- **HTML5** e **CSS3** (com Bootstrap 5 para responsividade e componentes prontos)
- **JavaScript** (puro, sem frameworks pesados)
- **Bootstrap Icons** para ícones bonitos
- **LocalStorage** para persistência do carrinho
- **Google Fotos** para incorporação automática de imagens
- **Formspree** para envio do formulário de contato (opcional, mas configurável)

## 📦 Como Usar / Instalar

1. **Baixe ou clone este repositório** para o seu computador.
2. Certifique-se de ter uma conexão com a internet (os arquivos usam CDNs do Bootstrap e outros recursos).
3. Abra o arquivo `index.html` em qualquer navegador moderno.

### Configurações importantes

#### 1. **Formulário de Contato**
O formulário atualmente aponta para um endpoint do Formspree (`https://formspree.io/f/seu-form-id`). Para receber as mensagens no seu e-mail:
- Crie uma conta gratuita em [formspree.io](https://formspree.io).
- Crie um novo formulário e copie o endpoint gerado (ex: `https://formspree.io/f/xyz123`).
- Substitua no arquivo `index.html` na linha do `<form action="...">`.

#### 2. **Fotos das Novidades (Google Fotos)**
A seção de novidades usa um iframe de um álbum público do Google Fotos. Para atualizar as fotos:
- Acesse [photos.google.com](https://photos.google.com) e crie um álbum com as imagens desejadas.
- No álbum, clique nos três pontinhos → **Opções** → **Opções de incorporação**.
- Copie o código gerado (um iframe) e substitua o existente na seção `<div class="novidades">` do `index.html`.

#### 3. **Produtos**
Os produtos estão listados no arquivo `script.js` dentro do array `products`. Para adicionar, remover ou editar um produto:
- Localize o array (próximo ao início do script).
- Cada produto tem os campos: `name`, `price`, `img` (URL da imagem), `link` (URL de afiliado), `desc` (descrição curta).
- Basta editar os valores ou adicionar um novo objeto seguindo o mesmo formato.
- As alterações aparecerão automaticamente no site após salvar o arquivo e recarregar a página.

#### 4. **Cores e Estilo**
As cores principais (verde e amarelo) estão definidas no arquivo `style.css` nas variáveis `--verde` e `--amarelo`. Você pode alterar os códigos hexadecimais para personalizar.

## 🚀 Personalização para a Carol

Este site foi desenvolvido especialmente para a **ViverLeve**, sob orientação da **Carol**. Ele foi pensado para ser:
- **Fácil de atualizar** (não precisa mexer em código para trocar fotos ou produtos, apenas editar o array ou o álbum do Google Fotos).
- **Rápido e leve** (carrega rapidamente mesmo em conexões móveis).
- **Profissional** (com design moderno e funcionalidades de e-commerce).

Qualquer dúvida sobre manutenção ou personalização, entre em contato com o desenvolvedor responsável.

## 📄 Licença

Este projeto é de uso exclusivo da ViverLeve. Não é permitida a distribuição ou comercialização sem autorização prévia.

---

**Criado por Daniel B** · [GitHub](https://github.com/danielbarbosabr) · 2025
