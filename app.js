function catalogApp() {
  // Configure your n8n webhook URLs here
  const N8N_BASE = ''; // Will be set when n8n workflow is created

  return {
    // State
    step: 'upload', // upload | processing | results
    marketplace: 'sprinter_es',
    selectedRatio: '2:3',
    excelFile: null,
    imageFiles: [],
    totalImageSize: 0,
    jobId: null,
    pollInterval: null,
    showErrors: false,

    // Ratio options
    ratios: [
      { value: '2:3', label: '2:3', dims: '1000x1500' },
      { value: '1:1', label: '1:1', dims: '1000x1000' },
      { value: '4:3', label: '4:3', dims: '1000x750' },
    ],

    // Progress state
    progress: { done: 0, total: 0, eta: '' },
    logEntries: [],

    // Results state
    results: {
      success: 0,
      errors: 0,
      previews: [],
      errorList: [],
      excelUrl: '',
      imagesUrl: '',
    },

    // File handlers
    handleExcelDrop(event) {
      event.currentTarget.classList.remove('dragover');
      const file = event.dataTransfer.files[0];
      if (file && this.isValidExcel(file)) {
        this.excelFile = file;
      }
    },
    handleExcelSelect(event) {
      const file = event.target.files[0];
      if (file) this.excelFile = file;
    },
    handleImagesDrop(event) {
      event.currentTarget.classList.remove('dragover');
      this.addImageFiles(event.dataTransfer.files);
    },
    handleImagesSelect(event) {
      this.addImageFiles(event.target.files);
    },
    addImageFiles(fileList) {
      const newFiles = Array.from(fileList).filter(f => this.isValidImage(f));
      this.imageFiles = [...this.imageFiles, ...newFiles];
      this.totalImageSize = this.imageFiles.reduce((sum, f) => sum + f.size, 0);
    },

    // Validation
    isValidExcel(file) {
      return /\.(xlsx|xls|csv)$/i.test(file.name);
    },
    isValidImage(file) {
      return /\.(jpg|jpeg|png|webp|zip)$/i.test(file.name);
    },

    // Format file size
    formatSize(bytes) {
      if (!bytes) return '';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    },

    // Start processing
    async startProcessing() {
      if (!this.excelFile && this.imageFiles.length === 0) return;

      this.step = 'processing';
      this.logEntries = [];
      this.progress = { done: 0, total: 0, eta: '' };

      try {
        const formData = new FormData();
        formData.append('marketplace', this.marketplace);
        formData.append('ratio', this.selectedRatio);

        if (this.excelFile) {
          formData.append('excel', this.excelFile);
        }

        this.imageFiles.forEach((file, i) => {
          formData.append(`image_${i}`, file);
        });

        this.addLog('info', 'Enviando archivos al servidor...');

        if (!N8N_BASE) {
          this.simulateProcessing();
          return;
        }

        const response = await fetch(`${N8N_BASE}/webhook/catalog-process`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        this.jobId = data.jobId;
        this.addLog('info', `Job iniciado: ${this.jobId}`);
        this.startPolling();

      } catch (err) {
        this.addLog('error', `Error: ${err.message}`);
      }
    },

    // Poll for status
    startPolling() {
      this.pollInterval = setInterval(async () => {
        try {
          const response = await fetch(
            `${N8N_BASE}/webhook/catalog-status?jobId=${this.jobId}`
          );
          const data = await response.json();

          this.progress.done = data.done || 0;
          this.progress.total = data.total || 0;
          this.progress.eta = data.eta || '';

          if (data.lastProcessed) {
            this.addLog('info', `Procesado: ${data.lastProcessed}`);
          }

          if (data.status === 'completed') {
            this.stopPolling();
            this.showResults(data);
          } else if (data.status === 'failed') {
            this.stopPolling();
            this.addLog('error', 'El procesamiento ha fallado');
          }
        } catch (err) {
          // Silently retry
        }
      }, 3000);
    },

    stopPolling() {
      if (this.pollInterval) {
        clearInterval(this.pollInterval);
        this.pollInterval = null;
      }
    },

    showResults(data) {
      this.results = {
        success: data.success || this.progress.done,
        errors: data.errors || 0,
        previews: data.previews || [],
        errorList: data.errorList || [],
        excelUrl: data.excelUrl || '#',
        imagesUrl: data.imagesUrl || '#',
      };
      this.step = 'results';
    },

    // Demo/simulation mode (when n8n is not connected yet)
    simulateProcessing() {
      const total = this.imageFiles.length || 50;
      this.progress.total = total;
      this.jobId = 'demo-' + Date.now().toString(36);
      this.addLog('info', `Modo demo - simulando ${total} imagenes`);

      let done = 0;
      const interval = setInterval(() => {
        const batch = Math.min(Math.floor(Math.random() * 5) + 1, total - done);
        done += batch;
        this.progress.done = done;

        for (let i = 0; i < batch; i++) {
          this.addLog('info', `SKU-${String(done - batch + i + 1).padStart(4, '0')} convertido a ${this.selectedRatio}`);
        }

        const remaining = total - done;
        const rate = done / ((Date.now() - parseInt(this.jobId.split('-')[1], 36)) / 1000);
        if (rate > 0) {
          const eta = Math.ceil(remaining / rate);
          this.progress.eta = eta > 60 ? Math.ceil(eta / 60) + ' min' : eta + ' seg';
        }

        if (done >= total) {
          clearInterval(interval);
          this.showResults({
            success: total - 2,
            errors: 2,
            previews: [],
            errorList: [
              { sku: 'SKU-0023', message: 'Imagen no encontrada (404)' },
              { sku: 'SKU-0041', message: 'Imagen demasiado pequena (< 200px)' },
            ],
            excelUrl: '#',
            imagesUrl: '#',
          });
        }
      }, 200);
    },

    // Log helper
    addLog(type, message) {
      const now = new Date();
      const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      this.logEntries.push({ type, message, time });

      this.$nextTick(() => {
        const container = this.$refs.logContainer;
        if (container) container.scrollTop = container.scrollHeight;
      });
    },

    // Computed
    get progressPercent() {
      if (!this.progress.total) return 0;
      return Math.round((this.progress.done / this.progress.total) * 100);
    },

    // Reset
    reset() {
      this.step = 'upload';
      this.excelFile = null;
      this.imageFiles = [];
      this.totalImageSize = 0;
      this.jobId = null;
      this.logEntries = [];
      this.progress = { done: 0, total: 0, eta: '' };
      this.results = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', imagesUrl: '' };
      this.showErrors = false;
      this.stopPolling();
    },
  };
}
