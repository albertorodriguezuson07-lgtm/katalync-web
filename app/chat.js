export default {
  chatOpen: false, chatInput: '', chatMessages: [], chatTyping: false, chatHistory: [],

  chatInit() {
    this.chatMessages = [{ role: 'bot', text: this.t('chat_welcome') }];
    this.chatHistory = [];
  },

  async chatSend() {
    const q = this.chatInput.trim();
    if (!q || this.chatTyping) return;
    this.chatMessages.push({ role: 'user', text: q });
    this.chatInput = '';
    this.chatTyping = true;
    this.$nextTick(() => { const el = this.$refs.chatBody; if (el) el.scrollTop = el.scrollHeight; });

    if (this._chatBlocked(q)) {
      setTimeout(() => {
        this.chatMessages.push({ role: 'bot', text: this.t('chat_blocked') });
        this.chatTyping = false;
        this.$nextTick(() => { const el = this.$refs.chatBody; if (el) el.scrollTop = el.scrollHeight; });
      }, 300);
      return;
    }

    const N8N_BASE = this._N8N_BASE;
    try {
      const appContext = this._buildChatContext();
      const resp = await fetch(N8N_BASE + '/webhook/katalync-chat-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, history: this.chatHistory.slice(-10), lang: this.lang, token: this.authToken || '', appContext })
      });
      const raw = await resp.json();
      const data = Array.isArray(raw) ? raw[0] : raw;
      if (resp.ok && data && data.answer) {
        this.chatHistory.push({ role: 'user', content: q }, { role: 'assistant', content: data.answer });
        this.chatMessages.push({ role: 'bot', text: data.answer });
      } else {
        const fallback = this._chatAnswerStatic(q);
        this.chatMessages.push({ role: 'bot', text: fallback });
      }
    } catch(e) {
      const fallback = this._chatAnswerStatic(q);
      this.chatMessages.push({ role: 'bot', text: fallback });
    }
    this.chatTyping = false;
    this.$nextTick(() => { const el = this.$refs.chatBody; if (el) el.scrollTop = el.scrollHeight; });
  },

  _chatBlocked(q) {
    const blocked = ['n8n', 'webhook', 'backend', 'servidor', 'server', 'stack tecn', 'infraestructur', 'base de datos', 'database', 'hosting', 'hostinger', 'easypanel', 'cloudflare r2', 'alpine.js', 'framework', 'codigo fuente', 'source code', 'como esta hecho', 'como lo habeis hecho', 'como funciona por detras', 'como funciona por detrás', 'que tecnologia usa', 'que lenguaje', 'supabase', 'docker', 'nginx', 'node.js', 'como se hizo', 'repositorio', 'github', 'cómo está montado', 'como esta montado', 'qué usáis', 'que usais', 'open source', 'codigo fuente', 'system prompt', 'instrucciones del bot', 'openai', 'anthropic', 'claude', 'modelo de ia', 'llm', 'machine learning', 'deep learning'];
    const low = q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return blocked.some(b => low.includes(b.normalize('NFD').replace(/[̀-ͯ]/g, '')));
  },

  _chatAnswerStatic(q) {
    const low = q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const kb = this._chatKB();
    let bestMatch = null; let bestScore = 0;
    for (const entry of kb) {
      let score = 0;
      for (const kw of entry.k) {
        const kwn = kw.normalize('NFD').replace(/[̀-ͯ]/g, '');
        if (low.includes(kwn)) score += kwn.length;
      }
      if (score > bestScore) { bestScore = score; bestMatch = entry; }
    }
    if (bestMatch && bestScore >= 3) return bestMatch.a[this.lang] || bestMatch.a.es;
    return this.t('chat_no_match');
  },

  _chatKB() {
    return [
      { k: ['formato', 'archivo', 'fichero', 'tipo de archivo', 'que archivo', 'extension', 'xlsx', 'xls', 'csv', 'excel', 'subir', 'cargar'],
        a: { es: 'Los formatos aceptados son:\n\n- .xlsx (Excel moderno)\n- .xls (Excel clásico)\n- .csv (valores separados por comas)\n\nEl tamaño máximo es 15 MB. Si tu archivo es más grande, divídelo en lotes de hasta 10.000 productos.',
             pt: 'Os formatos aceitos são:\n\n- .xlsx (Excel moderno)\n- .xls (Excel clássico)\n- .csv (valores separados por vírgulas)\n\nO tamanho máximo é 15 MB. Se seu arquivo for maior, divida-o em lotes de até 10.000 produtos.' }},
      { k: ['columna', 'campo', 'cabecera', 'header', 'catalogo', 'conversor', 'que columnas', 'que campos'],
        a: { es: 'Para el Conversor de Catálogo, las columnas de tu Excel son:\n\nsku, ean, marca, nombre, modelo, categoria, genero, color, talla, material, imagen, precio, stock, descripcion, variant_group_code\n\nAdemás necesitas las columnas GPSR: pais_fabricacion, fabricante_nombre, fabricante_nombre_comercial, fabricante_direccion, fabricante_email\n\nKatalync genera DOS archivos Sprinter/Mirakl: Productos (42 columnas) y Ofertas (27 columnas). Descarga la plantilla desde el inicio.',
             pt: 'Para o Conversor de Catálogo, as colunas do seu Excel são:\n\nsku, ean, marca, nombre, modelo, categoria, genero, color, talla, material, imagen, precio, stock, descripcion, variant_group_code\n\nAlém disso, precisa das colunas GPSR: pais_fabricacion, fabricante_nombre, fabricante_nombre_comercial, fabricante_direccion, fabricante_email\n\nO Katalync gera DOIS arquivos Sprinter/Mirakl: Produtos (42 colunas) e Ofertas (27 colunas). Baixe o modelo na página inicial.' }},
      { k: ['precio', 'precios', 'actualizar precio', 'descuento', 'rebaja', 'oferta', 'promo', 'promocion', 'tag'],
        a: { es: 'La herramienta de Precios necesita estas columnas:\n\nsku, ean, precio, stock, precio_descuento (opcional)\n\nGenera un XLSX en formato Ofertas Sprinter (27 columnas) listo para importar en Mirakl. Los campos obligatorios (EAN, tipo de ID, estado, precio canal INIT, origen envío, IVA) se rellenan automáticamente.\n\nEl tag de promoción se añade a la descripción de oferta para campañas.',
             pt: 'A ferramenta de Preços precisa destas colunas:\n\nsku, ean, precio, stock, precio_descuento (opcional)\n\nGera um XLSX no formato Ofertas Sprinter (27 colunas) pronto para importar no Mirakl. Os campos obrigatórios (EAN, tipo de ID, estado, preço canal INIT, origem envio, IVA) são preenchidos automaticamente.\n\nO tag de promoção é adicionado à descrição da oferta para campanhas.' }},
      { k: ['stock', 'inventario', 'cantidad', 'sincronizar stock', 'actualizar stock'],
        a: { es: 'Para Stock necesitas al mínimo:\n\nsku, cantidad (o quantity/stock)\n\nOpcionalmente incluye ean para generar el XLSX en formato Ofertas Sprinter. El SKU debe coincidir con el del marketplace. Genera tanto CSV simple como XLSX formato Mirakl.',
             pt: 'Para Estoque precisa no mínimo de:\n\nsku, quantidade (ou quantity/stock)\n\nOpcionalmente inclua ean para gerar o XLSX no formato Ofertas Sprinter. O SKU deve coincidir com o do marketplace. Gera tanto CSV simples como XLSX formato Mirakl.' }},
      { k: ['validar', 'validacion', 'comprobar', 'verificar', 'error', 'check'],
        a: { es: 'La Validación Pre-Upload comprueba todos los campos OBLIGATORIOS de Sprinter/Mirakl:\n\n- Productos (19 campos rojos): SKU, EAN, categoría, marca, género, color, talla, material, GPSR completo...\n- Ofertas (8 campos rojos): EAN, precio, stock\n- Campañas (3 campos azules): responsable UE (aviso, no bloquea)\n\nTambién verifica formato EAN-13, URLs de imagen válidas y que no uses Google Drive/Dropbox/iCloud.',
             pt: 'A Validação Pre-Upload verifica todos os campos OBRIGATÓRIOS do Sprinter/Mirakl:\n\n- Produtos (19 campos vermelhos): SKU, EAN, categoria, marca, gênero, cor, tamanho, material, GPSR completo...\n- Ofertas (8 campos vermelhos): EAN, preço, estoque\n- Campanhas (3 campos azuis): responsável UE (aviso, não bloqueia)\n\nTambém verifica formato EAN-13, URLs de imagem válidas e que não use Google Drive/Dropbox/iCloud.' }},
      { k: ['error servidor', 'error del servidor', 'no funciona', 'no carga', 'falla', 'se queda', 'tarda mucho', 'cargando', 'no responde'],
        a: { es: 'Si ves "Error del servidor":\n\n1. Comprueba que tu archivo no supere los 10.000 productos\n2. Verifica que el formato sea .xlsx, .xls o .csv\n3. Asegúrate de que el archivo no esté dañado (ábrelo en Excel para verificar)\n4. Espera unos segundos e inténtalo de nuevo\n\nSi el problema persiste, contacta con soporte desde el menú de usuario.',
             pt: 'Se vir "Erro do servidor":\n\n1. Verifique se seu arquivo não ultrapassa 10.000 produtos\n2. Verifique se o formato é .xlsx, .xls ou .csv\n3. Certifique-se de que o arquivo não está danificado (abra-o no Excel para verificar)\n4. Aguarde alguns segundos e tente novamente\n\nSe o problema persistir, contacte o suporte no menu do usuário.' }},
      { k: ['imagen', 'imágenes', 'imagenes', 'foto', 'cdn', '2:3', 'ratio', 'convertir imagen', 'url imagen'],
        a: { es: 'Las imágenes del catálogo:\n\n- Deben ser URLs públicas accesibles (no Google Drive, Dropbox ni iCloud)\n- Se convierten automáticamente al ratio seleccionado (2:3, 1:1 o 4:3)\n- Se suben a un CDN con URLs públicas para Mirakl\n\nSi la URL de imagen no es válida o no es accesible, el producto se procesará pero sin imagen convertida.',
             pt: 'As imagens do catálogo:\n\n- Devem ser URLs públicas acessíveis (não Google Drive, Dropbox nem iCloud)\n- São convertidas automaticamente para o ratio selecionado (2:3, 1:1 ou 4:3)\n- São enviadas para um CDN com URLs públicas para Mirakl\n\nSe a URL da imagem não for válida ou acessível, o produto será processado mas sem imagem convertida.' }},
      { k: ['plantilla', 'modelo', 'template', 'ejemplo', 'descargar plantilla', 'descargar modelo', 'ejemplo excel'],
        a: { es: 'Puedes descargar plantillas de ejemplo desde la página de inicio:\n\n- Conversor: ~27 columnas simplificadas incluyendo GPSR, con 2 filas de ejemplo\n- Precios: SKU, EAN, precio, stock, descuento\n- Validación: mismas columnas que el conversor\n\nLas columnas usan nombres simples (sku, marca, precio...). Katalync las mapea automáticamente a los códigos API de Mirakl.',
             pt: 'Pode baixar modelos de exemplo na página inicial:\n\n- Conversor: ~27 colunas simplificadas incluindo GPSR, com 2 linhas de exemplo\n- Preços: SKU, EAN, preço, estoque, desconto\n- Validação: mesmas colunas que o conversor\n\nAs colunas usam nomes simples (sku, marca, precio...). O Katalync mapeia automaticamente para os códigos API do Mirakl.' }},
      { k: ['marketplace', 'sprinter', 'mirakl', 'destino', 'que marketplace'],
        a: { es: 'Katalync genera archivos en formato Sprinter/Mirakl. El conversor produce DOS archivos XLSX:\n\n1. Productos (42 columnas) — datos del producto, imágenes, GPSR\n2. Ofertas (27 columnas) — precios, stock, estado, descuentos\n\nAmbos archivos tienen doble fila de cabecera (display + API codes) que Mirakl necesita para importar. Las columnas ROJAS obligatorias se rellenan automáticamente cuando es posible.',
             pt: 'O Katalync gera arquivos no formato Sprinter/Mirakl. O conversor produz DOIS arquivos XLSX:\n\n1. Produtos (42 colunas) — dados do produto, imagens, GPSR\n2. Ofertas (27 colunas) — preços, estoque, estado, descontos\n\nAmbos arquivos têm dupla linha de cabeçalho (display + códigos API) que o Mirakl precisa para importar. As colunas VERMELHAS obrigatórias são preenchidas automaticamente quando possível.' }},
      { k: ['descargar', 'csv', 'resultado', 'donde', 'archivo generado', 'mis archivos', 'descarga', 'xlsx'],
        a: { es: 'Después de procesar, puedes descargar los archivos desde:\n\n1. Botones de descarga en la pantalla de resultados:\n   - "Descargar Productos Sprinter" (XLSX 42 columnas)\n   - "Descargar Ofertas Sprinter" (XLSX 27 columnas)\n   - CSV de respaldo\n2. La sección "Mis archivos" en el menú de usuario (se guardan 15 días)\n3. El historial de la barra superior',
             pt: 'Depois de processar, pode baixar os arquivos de:\n\n1. Botões de download na tela de resultados:\n   - "Baixar Produtos Sprinter" (XLSX 42 colunas)\n   - "Baixar Ofertas Sprinter" (XLSX 27 colunas)\n   - CSV de backup\n2. A seção "Meus arquivos" no menu do usuário (guardados por 15 dias)\n3. O histórico na barra superior' }},
      { k: ['limite', 'maximo', 'cuantos productos', 'productos por lote', 'demasiados', 'muchos productos', '10000'],
        a: { es: 'Los límites son:\n\n- Máximo 10.000 productos por lote\n- Archivo máximo de 15 MB\n\nSi tu catálogo tiene más de 10.000 productos, divídelo en varios archivos y procésalos por separado.',
             pt: 'Os limites são:\n\n- Máximo 10.000 produtos por lote\n- Arquivo máximo de 15 MB\n\nSe seu catálogo tem mais de 10.000 produtos, divida-o em vários arquivos e processe-os separadamente.' }},
      { k: ['idioma', 'cambiar idioma', 'portugues', 'español', 'language'],
        a: { es: 'Puedes cambiar el idioma entre Español y Portugués en:\n\n1. La pantalla de login (toggle ES/PT arriba a la derecha)\n2. Tu perfil (menú usuario > Mi perfil > sección Idioma)\n3. El onboarding al crear tu cuenta\n\nEl idioma se guarda en tu perfil y se recuerda en futuras sesiones.',
             pt: 'Pode alterar o idioma entre Espanhol e Português em:\n\n1. A tela de login (toggle ES/PT no canto superior direito)\n2. Seu perfil (menu usuário > Meu perfil > seção Idioma)\n3. O onboarding ao criar sua conta\n\nO idioma é salvo no seu perfil e lembrado em sessões futuras.' }},
      { k: ['perfil', 'nombre', 'empresa', 'contraseña', 'password', 'cambiar', 'cuenta'],
        a: { es: 'En "Mi perfil" puedes:\n\n- Cambiar tu nombre\n- Actualizar el nombre de empresa\n- Seleccionar tu idioma preferido\n- Cambiar tu contraseña (mínimo 8 caracteres)\n\nAccede desde el menú de usuario arriba a la derecha.',
             pt: 'Em "Meu perfil" pode:\n\n- Alterar seu nome\n- Atualizar o nome da empresa\n- Selecionar seu idioma preferido\n- Alterar sua senha (mínimo 8 caracteres)\n\nAcesse pelo menu do usuário no canto superior direito.' }},
      { k: ['notificacion', 'notificaciones', 'alerta', 'avisos del navegador', 'browser'],
        a: { es: 'Hay dos tipos de notificaciones:\n\n1. Notificaciones del navegador: se activan desde tu perfil. Te avisan cuando un proceso termina aunque estés en otra pestaña.\n2. Notificaciones in-app: aparecen en la campana de la barra superior.\n\nAmbas se generan automáticamente al completar cualquier herramienta.',
             pt: 'Há dois tipos de notificações:\n\n1. Notificações do navegador: ativam-se no seu perfil. Avisam quando um processo termina mesmo em outra aba.\n2. Notificações in-app: aparecem no sino da barra superior.\n\nAmbas são geradas automaticamente ao completar qualquer ferramenta.' }},
      { k: ['ean', 'codigo de barras', 'barcode', '13 digitos'],
        a: { es: 'El EAN (European Article Number) debe ser:\n\n- Exactamente 13 dígitos numéricos\n- Sin espacios ni guiones\n- Único por producto\n\nEjemplo válido: 8412345678901\n\nSi no tienes EAN, puedes dejar el campo vacío, pero la validación lo marcará como aviso.',
             pt: 'O EAN (European Article Number) deve ser:\n\n- Exatamente 13 dígitos numéricos\n- Sem espaços nem hífens\n- Único por produto\n\nExemplo válido: 8412345678901\n\nSe não tem EAN, pode deixar o campo vazio, mas a validação marcará como aviso.' }},
      { k: ['sku', 'referencia', 'codigo producto', 'identificador'],
        a: { es: 'El SKU (Stock Keeping Unit) es el identificador único de cada producto:\n\n- Debe ser único (sin duplicados en el archivo)\n- No puede estar vacío\n- Debe coincidir con el SKU del marketplace si ya existe\n- Puede contener letras, números y guiones\n\nEjemplo: SKU-001, NKE-AM90-42-BLK',
             pt: 'O SKU (Stock Keeping Unit) é o identificador único de cada produto:\n\n- Deve ser único (sem duplicados no arquivo)\n- Não pode estar vazio\n- Deve coincidir com o SKU do marketplace se já existir\n- Pode conter letras, números e hífens\n\nExemplo: SKU-001, NKE-AM90-42-BLK' }},
      { k: ['titulo', 'generar titulo', 'formatear titulo', 'title', 'nombre'],
        a: { es: 'La opción "Formatear títulos" genera el "nombre-del-articulo" para Sprinter con el formato:\n\nCategoría + Marca + Modelo\n\nEjemplo: "Zapatillas Nike Air Max 90"\n\nEste campo es OBLIGATORIO en Mirakl (columna roja). Si no activas la opción, debe estar en tu Excel.',
             pt: 'A opção "Formatar títulos" gera o "nombre-del-articulo" para Sprinter com o formato:\n\nCategoria + Marca + Modelo\n\nExemplo: "Tênis Nike Air Max 90"\n\nEste campo é OBRIGATÓRIO no Mirakl (coluna vermelha). Se não ativar a opção, deve estar no seu Excel.' }},
      { k: ['descripcion', 'generar descripcion', 'description'],
        a: { es: 'La opción "Generar descripciones" crea una descripción estructurada que incluye:\n\n- Marca y modelo\n- Categoría y género\n- Material (si está disponible)\n- Características principales\n\nPuedes desactivar esta opción si prefieres mantener tus descripciones originales.',
             pt: 'A opção "Gerar descrições" cria uma descrição estruturada que inclui:\n\n- Marca e modelo\n- Categoria e gênero\n- Material (se disponível)\n- Características principais\n\nPode desativar esta opção se preferir manter suas descrições originais.' }},
      { k: ['historial', 'historico', 'trabajos anteriores', 'procesos anteriores'],
        a: { es: 'El historial muestra tus últimos 20 procesos. Se guarda localmente en tu navegador y no se borra al cerrar sesión.\n\nPuedes verlo pulsando el icono del reloj en la barra superior. Cada entrada muestra: herramienta, archivo, fecha y cantidad de productos.',
             pt: 'O histórico mostra seus últimos 20 processos. É salvo localmente no navegador e não é apagado ao sair.\n\nPode vê-lo clicando no ícone do relógio na barra superior. Cada entrada mostra: ferramenta, arquivo, data e quantidade de produtos.' }},
      { k: ['hola', 'buenas', 'hey', 'oi', 'ola', 'buenos dias', 'buenas tardes'],
        a: { es: '¡Hola! ¿En qué puedo ayudarte? Puedo responder sobre:\n\n- Formatos de archivo compatibles\n- Columnas requeridas para cada herramienta\n- Errores comunes y soluciones\n- Plantillas y descargas\n- Configuración de perfil e idioma',
             pt: 'Olá! Como posso ajudá-lo? Posso responder sobre:\n\n- Formatos de arquivo compatíveis\n- Colunas necessárias para cada ferramenta\n- Erros comuns e soluções\n- Modelos e downloads\n- Configuração de perfil e idioma' }},
      { k: ['gracias', 'obrigado', 'obrigada', 'thanks', 'genial', 'perfecto', 'vale'],
        a: { es: '¡De nada! Si tienes más preguntas, estoy aquí. También puedes contactar con soporte desde el menú de usuario para asistencia personalizada.',
             pt: 'De nada! Se tiver mais perguntas, estou aqui. Também pode contactar o suporte no menu do usuário para assistência personalizada.' }},
      { k: ['modo oscuro', 'dark mode', 'tema oscuro', 'modo escuro'],
        a: { es: 'Puedes activar el modo oscuro con el icono de luna en la barra superior (junto al historial). Tu preferencia se guarda automáticamente.',
             pt: 'Pode ativar o modo escuro com o ícone da lua na barra superior (junto ao histórico). Sua preferência é salva automaticamente.' }},
      { k: ['soporte', 'contacto', 'contactar', 'ayuda humana', 'hablar con alguien', 'email soporte'],
        a: { es: 'Para contactar con soporte:\n\n1. Ve al menú de usuario (arriba a la derecha)\n2. Pulsa "Soporte"\n3. Rellena el formulario con tu consulta\n4. Se abrirá tu cliente de correo para enviarlo\n\nTambién puedes escribir directamente a: albertorodriguezuson07@gmail.com',
             pt: 'Para contactar o suporte:\n\n1. Vá ao menu do usuário (canto superior direito)\n2. Clique em "Suporte"\n3. Preencha o formulário com sua consulta\n4. Abrirá seu cliente de email para enviar\n\nTambém pode escrever diretamente para: albertorodriguezuson07@gmail.com' }},
      { k: ['suscripcion', 'suscripción', 'plan', 'pagar', 'pago', 'activar suscripcion', 'precio', 'cuanto cuesta', 'coste', 'cuota', 'mensual'],
        a: { es: 'Katalync tiene dos planes:\n\n- Katalync: 39€/mes — acceso completo a todas las herramientas (Conversor dual XLSX, Precios, Stock, Validación GPSR, Repricing, Chatbot IA, Informe de Salud, Plantillas inteligentes). Self-service.\n\n- Katalync Partner: 499€/mes — todo lo anterior + gestión dedicada completa: onboarding personalizado, nosotros subimos y gestionamos tu catálogo, procesamiento profesional de imágenes, optimización de títulos, soporte prioritario WhatsApp/email, reporting mensual, formación de tu equipo. Tú vendes, nosotros nos encargamos del marketplace.\n\nLa suscripción se activa tras el pago con tarjeta. Se renueva automáticamente cada mes y puedes cancelar en cualquier momento.',
             pt: 'O Katalync tem dois planos:\n\n- Katalync: 39€/mês — acesso completo a todas as ferramentas (Conversor dual XLSX, Preços, Estoque, Validação GPSR, Repricing, Chatbot IA, Relatório de Saúde, Templates inteligentes). Self-service.\n\n- Katalync Partner: 499€/mês — tudo acima + gestão dedicada completa: onboarding personalizado, nós enviamos e gerimos o seu catálogo, processamento profissional de imagens, otimização de títulos, suporte prioritário WhatsApp/email, reporting mensal, formação da sua equipa. Você vende, nós cuidamos do marketplace.\n\nA assinatura é ativada após o pagamento com cartão. Renova automaticamente a cada mês e pode cancelar a qualquer momento.' }},
      { k: ['facturacion', 'facturación', 'factura', 'recibo', 'cambiar tarjeta', 'metodo de pago', 'método de pago', 'cancelar suscripcion', 'cancelar plan', 'portal de facturacion', 'billing'],
        a: { es: 'Puedes gestionar tu suscripción desde el portal de facturación:\n\n1. Ve al menú de usuario (arriba a la derecha)\n2. Pulsa "Facturación"\n3. Desde ahí puedes:\n   - Ver tu historial de facturas\n   - Cambiar tu método de pago\n   - Cancelar tu suscripción\n\nLa cancelación se aplica al final del periodo de facturación actual, así que no pierdes días que ya has pagado.',
             pt: 'Pode gerir sua assinatura no portal de faturação:\n\n1. Vá ao menu do usuário (canto superior direito)\n2. Clique em "Faturação"\n3. A partir daí pode:\n   - Ver seu histórico de faturas\n   - Alterar seu método de pagamento\n   - Cancelar sua assinatura\n\nO cancelamento aplica-se no final do período de faturação atual, para não perder dias já pagos.' }},
      { k: ['pago pendiente', 'activar cuenta', 'no puedo acceder', 'cuenta bloqueada', 'suspendida', 'renovar', 'reactivar'],
        a: { es: 'Si tu cuenta muestra "Pago pendiente" o "Suspendida":\n\n- Pago pendiente: pulsa el botón "Activar suscripción" y completa el pago con tarjeta\n- Suspendida: significa que hubo un problema con tu último cobro. Pulsa "Renovar suscripción" para actualizar tu método de pago\n\nSi crees que es un error, contacta con soporte.',
             pt: 'Se sua conta mostra "Pagamento pendente" ou "Suspensa":\n\n- Pagamento pendente: clique no botão "Ativar assinatura" e complete o pagamento com cartão\n- Suspensa: significa que houve um problema com sua última cobrança. Clique em "Renovar assinatura" para atualizar seu método de pagamento\n\nSe acha que é um erro, contacte o suporte.' }},
      { k: ['repricing', 'repricer', 'precios competencia', 'ajustar precios', 'precios automaticos', 'precio automatico'],
        a: { es: 'El Repricing te permite ajustar tus precios comparándolos con la competencia:\n\n1. Sube tu Excel con SKU y precio actual\n2. Opcionalmente sube un archivo de competidores (o usa la API del marketplace)\n3. Define tu estrategia: igualar, mejorar un %, o mantener margen mínimo\n4. Descarga el CSV con los precios ajustados\n\nEl repricing se calcula localmente — tus datos no se envían a ningún servidor externo.',
             pt: 'O Repricing permite ajustar seus preços comparando-os com a concorrência:\n\n1. Carregue seu Excel com SKU e preço atual\n2. Opcionalmente carregue um arquivo de concorrentes (ou use a API do marketplace)\n3. Defina sua estratégia: igualar, melhorar %, ou manter margem mínima\n4. Baixe o CSV com os preços ajustados\n\nO repricing é calculado localmente — seus dados não são enviados a nenhum servidor externo.' }},
      { k: ['seguridad', 'datos', 'privacidad', 'donde se guardan', 'encriptado', 'cifrado', 'seguro'],
        a: { es: 'Tu seguridad es nuestra prioridad:\n\n- Los pagos se procesan con Stripe, líder mundial en pagos seguros. No almacenamos datos de tu tarjeta\n- Tus archivos se procesan de forma segura y se guardan 15 días en tu cuenta\n- Las contraseñas se almacenan con hash criptográfico\n- Toda la comunicación va cifrada por HTTPS\n- El repricing se calcula localmente en tu navegador',
             pt: 'Sua segurança é nossa prioridade:\n\n- Os pagamentos são processados com Stripe, líder mundial em pagamentos seguros. Não armazenamos dados do seu cartão\n- Seus arquivos são processados de forma segura e guardados 15 dias na sua conta\n- As senhas são armazenadas com hash criptográfico\n- Toda a comunicação é cifrada por HTTPS\n- O repricing é calculado localmente no seu navegador' }},
      { k: ['gpsr', 'fabricante', 'responsable', 'persona responsable', 'pais fabricacion', 'eu'],
        a: { es: 'Los campos GPSR son OBLIGATORIOS para Sprinter/Mirakl:\n\n- pais_fabricacion — País de fabricación del producto\n- fabricante_nombre — Nombre del fabricante\n- fabricante_nombre_comercial — Nombre comercial registrado\n- fabricante_direccion — Dirección del fabricante\n- fabricante_email — Email del fabricante\n\nPara campañas (Black Friday, etc.) también necesitas:\n- responsable_ue_nombre\n- responsable_ue_direccion\n- responsable_ue_email\n\nInclúyelos en tu Excel de entrada.',
             pt: 'Os campos GPSR são OBRIGATÓRIOS para Sprinter/Mirakl:\n\n- pais_fabricacion — País de fabricação do produto\n- fabricante_nombre — Nome do fabricante\n- fabricante_nombre_comercial — Nome comercial registrado\n- fabricante_direccion — Endereço do fabricante\n- fabricante_email — Email do fabricante\n\nPara campanhas (Black Friday, etc.) também precisa de:\n- responsable_ue_nombre\n- responsable_ue_direccion\n- responsable_ue_email\n\nInclua-os no seu Excel de entrada.' }},
      { k: ['que es katalync', 'para que sirve', 'que hace', 'como funciona', 'explicar'],
        a: { es: 'Katalync es una plataforma SaaS para automatizar la preparación de catálogos para Sprinter y otros marketplaces Mirakl. Incluye 5 herramientas:\n\n1. Conversor de Catálogo — genera DOS archivos XLSX (Productos 42 cols + Ofertas 27 cols) listos para importar en Mirakl\n2. Actualización de Precios — genera XLSX formato Ofertas con precios y descuentos\n3. Sincronización de Stock — actualiza cantidades con XLSX formato Mirakl\n4. Validación Pre-Upload — verifica los 19 campos obligatorios de Productos y 8 de Ofertas\n5. Repricing — ajusta precios vs competencia\n\nSubes UN Excel simplificado y Katalync genera los archivos que Mirakl necesita.',
             pt: 'O Katalync é uma plataforma SaaS para automatizar a preparação de catálogos para Sprinter e outros marketplaces Mirakl. Inclui 5 ferramentas:\n\n1. Conversor de Catálogo — gera DOIS arquivos XLSX (Produtos 42 cols + Ofertas 27 cols) prontos para importar no Mirakl\n2. Atualização de Preços — gera XLSX formato Ofertas com preços e descontos\n3. Sincronização de Estoque — atualiza quantidades com XLSX formato Mirakl\n4. Validação Pre-Upload — verifica os 19 campos obrigatórios de Produtos e 8 de Ofertas\n5. Repricing — ajusta preços vs concorrência\n\nCarrega UM Excel simplificado e o Katalync gera os arquivos que o Mirakl precisa.' }}
    ];
  },

  _buildChatContext() {
    const parts = [];
    let hr = this.healthReport;
    if (!hr) { try { hr = JSON.parse(localStorage.getItem('kt_last_health')); } catch(e) {} }
    if (hr) {
      const r = hr;
      const lines = [`Último informe de salud: score ${r.score}/100, ${r.successProducts} productos OK, ${r.errorProducts} con errores.`];
      if (r.img2Pct !== undefined) lines.push(`Imagen 2: ${r.img2Pct}%, Imagen 3: ${r.img3Pct}%.`);
      if (r.checks && r.checks.length > 0) {
        const missing = r.checks.filter(c => c.status === 'missing').map(c => c.field);
        const warn = r.checks.filter(c => c.status === 'warn' || c.status === 'error').map(c => `${c.field} (${c.pct}%)`);
        if (missing.length > 0) lines.push('Campos ausentes: ' + missing.join(', ') + '.');
        if (warn.length > 0) lines.push('Campos incompletos: ' + warn.join(', ') + '.');
      }
      if (r.recommendations && r.recommendations.length > 0) {
        lines.push('Recomendaciones: ' + r.recommendations.map(rec => rec.text).join(' | '));
      }
      parts.push(lines.join(' '));
    }
    if (this.historyJobs && this.historyJobs.length > 0) {
      const recent = this.historyJobs.slice(0, 5).map(j => {
        const toolName = j.tool === 'catalog' ? 'Conversor' : j.tool === 'prices' ? 'Precios' : j.tool === 'stock' ? 'Stock' : j.tool;
        return `${toolName}: ${j.filename} (${j.count} productos, ${j.date}, marketplace: ${j.marketplace || 'N/A'})`;
      });
      parts.push('Historial reciente: ' + recent.join(' | '));
    }
    parts.push('Productos totales procesados: ' + this.totalProductsProcessed + '. Media por proceso: ' + this.avgProductsPerJob + '.');
    return parts.length > 0 ? parts.join('\n') : '';
  },
};
