const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const fileList = document.getElementById('file-list');
    const status = document.getElementById('status');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const themeIcon = document.getElementById('theme-icon');
    const htmlRoot = document.documentElement;

    const selectFormato = document.getElementById('formato');
    const selectCompressao = document.getElementById('nivel-compressao');

    let arquivosSelecionados = [];

    function atualizarLista() {
      fileList.innerHTML = '';
      arquivosSelecionados.forEach(file => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        item.textContent = file.relativePath || file.webkitRelativePath || file.name;

        const badge = document.createElement('span');
        badge.className = 'badge bg-secondary rounded-pill';
        badge.textContent = `${(file.size / 1024).toFixed(1)} KB`;
        item.appendChild(badge);

        fileList.appendChild(item);
      });
    }

    function limparArquivos() {
      arquivosSelecionados = [];
      fileInput.value = '';
      fileList.innerHTML = '';
      status.innerText = '🧹 Arquivos limpos.';
      progressContainer.classList.add('d-none');
    }

    fileInput.addEventListener('change', (e) => {
      arquivosSelecionados = Array.from(e.target.files);
      atualizarLista();
      status.innerText = '';
    });

    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      const items = Array.from(e.dataTransfer.items);
      arquivosSelecionados = [];
      let promises = [];

      function traverseFileTree(item, path = '') {
        return new Promise((resolve) => {
          if (item.isFile) {
            item.file(file => {
              file.relativePath = path + file.name;
              resolve([file]);
            });
          } else if (item.isDirectory) {
            const dirReader = item.createReader();
            dirReader.readEntries(entries => {
              const subPromises = entries.map(entry => traverseFileTree(entry, path + item.name + '/'));
              Promise.all(subPromises).then(results => {
                resolve(results.flat());
              });
            });
          }
        });
      }

      items.forEach(item => {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          promises.push(traverseFileTree(entry));
        }
      });

      Promise.all(promises).then(results => {
        arquivosSelecionados = results.flat();
        atualizarLista();
        status.innerText = '';
      });
    });

    async function gerarZip() {
      if (arquivosSelecionados.length === 0) {
        status.innerText = "⚠️ Nenhum arquivo selecionado.";
        return;
      }

      const formato = selectFormato.value;
      const nivelCompressao = parseInt(selectCompressao.value);

      if (formato !== 'zip') {
        status.innerText = "❌ Apenas o formato ZIP é suportado neste ambiente (7z requer software externo).";
        return;
      }

      const zip = new JSZip();
      let totalSize = arquivosSelecionados.reduce((acc, f) => acc + f.size, 0);
      let totalLido = 0;
      const startTime = Date.now();

      status.innerText = "⏳ Compactando arquivos...";
      progressContainer.classList.remove('d-none');
      progressBar.style.width = "0%";
      progressBar.innerText = "0%";

      for (let i = 0; i < arquivosSelecionados.length; i++) {
        const file = arquivosSelecionados[i];
        const content = await file.arrayBuffer();
        const relativePath = file.relativePath || file.webkitRelativePath || file.name;
        zip.file(relativePath, content);
        totalLido += file.size;

        const percent = Math.round((totalLido / totalSize) * 100);
        const tempoGasto = (Date.now() - startTime) / 1000;
        const velocidade = (totalLido / 1024) / tempoGasto;

        progressBar.style.width = `${percent}%`;
        progressBar.innerText = `${percent}% (${velocidade.toFixed(1)} KB/s)`;
      }

      zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: nivelCompressao } })
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "arquivos_comprimidos.zip";
          a.click();
          URL.revokeObjectURL(url);
          status.innerText = "✅ ZIP gerado com sucesso!";
          progressBar.style.width = `100%`;
          progressBar.innerText = "100%";
        })
        .catch(err => {
          console.error(err);
          status.innerText = "❌ Erro ao gerar o ZIP.";
        });
    }

    function alternarTema() {
      const temaAtual = htmlRoot.getAttribute('data-bs-theme');
      const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-bs-theme', novoTema);
      localStorage.setItem('temaPreferido', novoTema);
      atualizarIconeTema();
    }

    function atualizarIconeTema() {
      const tema = htmlRoot.getAttribute('data-bs-theme');
      themeIcon.className = tema === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }

    window.addEventListener('DOMContentLoaded', () => {
      const temaSalvo = localStorage.getItem('temaPreferido');
      if (temaSalvo) htmlRoot.setAttribute('data-bs-theme', temaSalvo);
      atualizarIconeTema();
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
    }
