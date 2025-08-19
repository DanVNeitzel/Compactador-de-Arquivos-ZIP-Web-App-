**[Preview](https://danvneitzel.github.io/Compactador-de-Arquivos-ZIP-Web-App-/)**

# 📂 Compactador de Arquivos ZIP (Web App)

Este projeto é um **aplicativo web** que permite **compactar arquivos e
pastas diretamente no navegador** em formato **ZIP**, sem necessidade de
software adicional.\
Ele utiliza **HTML, CSS, JavaScript, Bootstrap e JSZip** para fornecer
uma interface moderna, responsiva e fácil de usar.

------------------------------------------------------------------------

## 🚀 Funcionalidades

-   📤 **Upload de arquivos e pastas** (via seletor ou arrastar e
    soltar).\
-   📋 **Lista de arquivos selecionados** com tamanho exibido em KB.\
-   🗂️ **Preservação da estrutura de pastas** ao compactar.\
-   ⚡ **Níveis de compressão configuráveis**:
    -   0 -- Sem compressão\
    -   2 -- Rápido (\~25%)\
    -   5 -- Normal (\~50%) *(padrão)*\
    -   7 -- Alto (\~75%)\
    -   9 -- Máximo (\~100%)\
-   📊 **Barra de progresso animada** com velocidade de compressão
    (KB/s).\
-   🧹 **Botão para limpar arquivos** e reiniciar seleção.\
-   🌙 **Alternância de tema claro/escuro** (salvo no `localStorage`).\
-   📱 **Responsivo e PWA-ready** (suporte a `manifest.json` e
    `service-worker.js`).

------------------------------------------------------------------------

## 🛠️ Tecnologias Utilizadas
    
-   **[Bootstrap 5](https://getbootstrap.com/)** -- Layout e
    responsividade.\
-   **[Bootstrap Icons](https://icons.getbootstrap.com/)** -- Ícones
    visuais.\
-   **[JSZip](https://stuk.github.io/jszip/)** -- Biblioteca para
    geração de arquivos ZIP no navegador.\
-   **JavaScript Vanilla (ES6+)** -- Lógica principal.\
-   **PWA** -- Suporte a instalação como app.

------------------------------------------------------------------------

## 📂 Estrutura de Arquivos

``` bash
/
├── index.html          # Página principal do app
├── manifest.json       # Configuração do PWA
├── service-worker.js   # Cache e funcionamento offline
└── /assets             # (opcional) Imagens, ícones, estilos extras
```

------------------------------------------------------------------------

## ▶️ Como Usar

1.  Abra o projeto no navegador (`index.html`).\
2.  Arraste arquivos ou pastas para a área indicada, ou selecione
    manualmente.\
3.  Configure:
    -   **Formato** → Atualmente apenas ZIP.\
    -   **Nível de compressão**.\
4.  Clique em **"Compactar e Baixar"**.\
5.  O arquivo **`arquivos_comprimidos.zip`** será gerado automaticamente
    para download.

------------------------------------------------------------------------

## 📦 Instalação como PWA

1.  Hospede o projeto em um servidor (ex.: GitHub Pages, Vercel,
    Netlify).\
2.  O navegador oferecerá a opção de **"Instalar como aplicativo"**.\
3.  Você poderá usar o compactador **offline** após a instalação.

------------------------------------------------------------------------

## 🖼️ Prévia da Interface

![Preview do Compactador](https://i.imgur.com/5PugA3N.png)\
*(Exemplo ilustrativo da interface com Bootstrap)*

------------------------------------------------------------------------

## 📌 Melhorias Futuras

-   [ ] Suporte a mais formatos (ex.: `.tar`, `.gz`).\
-   [ ] Opção de renomear o arquivo ZIP antes do download.\
-   [ ] Seleção múltipla de pastas com organização automática.\
-   [ ] Histórico de compressões realizadas.

------------------------------------------------------------------------

## 📄 Licença

Este projeto é de uso livre para fins **educacionais e pessoais**.\
Sinta-se à vontade para modificar e distribuir conforme necessário.

------------------------------------------------------------------------

👨‍💻 Desenvolvido com ❤️ em **HTML + JS + Bootstrap**
