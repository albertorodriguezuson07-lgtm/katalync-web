  window.__CT_API_BASE = 'https://api.katalync.com';
const N8N_WEBHOOK_BASE = (window.__CT_API_BASE || '');

const TRANSLATIONS = {
  es: {
    auth_login_title: 'Iniciar sesión', auth_login_sub: 'Introduce tus credenciales para acceder',
    auth_register_title: 'Crear cuenta', auth_register_sub: 'Regístrate para acceder a las herramientas',
    password: 'Contraseña', your_password: 'Tu contraseña', your_name: 'Tu nombre', name: 'Nombre',
    min_chars: 'Mínimo 8 caracteres', login_btn: 'Entrar', logging_in: 'Entrando...', register_btn: 'Crear cuenta',
    creating: 'Creando...', no_account: '¿No tienes cuenta?', register_link: 'Regístrate',
    has_account: '¿Ya tienes cuenta?', login_link: 'Inicia sesión', verifying: 'Verificando sesión...',
    continue: 'Continuar', back: 'Atrás', skip: 'Saltar configuración',
    onb_welcome: '¡Bienvenido, {name}!', onb_welcome_sub: 'Tu plataforma para automatizar la preparación de catálogos para marketplace.',
    onb_feat_catalog: 'Conversor de Catálogo', onb_feat_catalog_sub: 'Títulos, descripciones, imágenes y CSV Mirakl-ready',
    onb_feat_prices: 'Actualización de Precios', onb_feat_prices_sub: 'CSV de precios y descuentos listo para importar',
    onb_feat_validate: 'Validación Pre-Upload', onb_feat_validate_sub: 'EAN, SKU, imágenes y campos antes de subir',
    onb_company_title: 'Sobre tu empresa', onb_company_sub: 'Esto nos ayuda a personalizar tu experiencia',
    company_name: 'Nombre de empresa', company_placeholder: 'Ej: Mi Empresa S.L.',
    language: 'Idioma', onb_ready_title: '¡Todo listo!', onb_ready_sub: 'Revisa tu configuración y empieza a trabajar',
    onb_start: 'Empezar a trabajar', company: 'Empresa',
    nav_converter: 'Conversor', nav_prices: 'Precios', nav_validation: 'Validación',
    notifications: 'Notificaciones', mark_all_read: 'Marcar todo leído', no_notifications: 'Sin notificaciones',
    clear_all: 'Borrar todas', history: 'Historial', my_profile: 'Mi perfil', logout: 'Cerrar sesión',
    generated_files: 'Archivos generados', no_files_yet: 'No hay archivos todavía',
    no_files_hint: 'Procesa tu primer catálogo para ver resultados aquí',
    tag_catalog: 'CATÁLOGO', tag_prices: 'PRECIOS', tag_validation: 'VALIDACIÓN',
    products_lc: 'productos', download: 'Descargar',
    home_title: 'Katalync', home_sub: 'Automatiza la preparación de tu catálogo para marketplace. Convierte, actualiza precios y valida antes de subir.',
    stat_files: 'Archivos generados', stat_products: 'Productos procesados', stat_success: 'Tasa de éxito', stat_avg: 'Media por lote',
    tool_catalog: 'Conversor de Catálogo', tool_catalog_desc: 'Títulos, descripciones, imágenes 2:3 a CDN y CSV Mirakl-ready.',
    tool_prices: 'Actualización de Precios', tool_prices_desc: 'CSV de precios y descuentos listo para importar.',
    tool_validate: 'Validación Pre-Upload', tool_validate_desc: 'Valida EAN, imágenes y campos antes de subir.',
    tool_stock: 'Sincronización de Stock', tool_stock_desc: 'Actualiza stock directamente desde tu Excel.',
    coming_soon: 'Próximamente', tag_images: 'Imágenes', tag_titles: 'Títulos', tag_pricing: 'Precios', tag_discounts: 'Rebajas',
    tag_image: 'Imagen', chart_title: 'Productos procesados', all: 'Todos', products: 'Productos', files: 'Archivos',
    chart_empty: 'Sin datos todavía', chart_empty_hint: 'Procesa tu primer catálogo para ver la gráfica',
    no_activity: 'Sin actividad reciente', home: 'Inicio',
    catalog_title: 'Convierte tu catálogo para marketplace', catalog_sub: 'Sube tu Excel con los datos de producto. Formateamos títulos, descripciones e imágenes.',
    marketplace_label: 'Marketplace destino', other_marketplace: 'Otro marketplace', image_format: 'Formato de imagen',
    gen_title: 'Formatear títulos', gen_title_hint: 'Genera título estandarizado: Categoría Marca Color',
    gen_desc: 'Generar descripciones', gen_desc_hint: 'Genera descripción con marca, modelo, categoría, material...',
    convert_images: 'Convertir imágenes a CDN', convert_images_hint: 'Convierte a 2:3, sube a CDN y genera URLs públicas para Mirakl',
    customize_label: 'Personalizar salida',
    excel_file: 'Archivo Excel', drop_excel: 'Arrastra tu Excel o haz clic', remove: 'Quitar',
    products_detected: 'productos detectados', columns: 'Columnas', process: 'Procesar',
    processing_catalog: 'Procesando catálogo', waiting: 'Esperando...',
    catalog_done: 'Catálogo procesado', products_ok: 'productos OK', errors: 'errores',
    preview: 'Vista previa', title: 'Título', download_csv: 'Descargar CSV Mirakl-ready',
    see: 'Ver', process_another: 'Procesar otro catálogo', back_home: 'Volver al inicio',
    prices_title: 'Actualizar precios en marketplace', prices_sub: 'Sube un Excel con SKU y nuevos precios. Generamos el CSV listo para importar.',
    include_discount: 'Incluir precio de descuento', include_discount_hint: 'Si tienes columna de precio rebajado / precio campaña',
    promo_tag: 'Tag de promoción', promo_tag_hint: 'Ej: wintersales_2025. Se añade a la descripción de oferta para aparecer en promociones',
    promo_tag_placeholder: 'wintersales_2025',
    drop_prices: 'Arrastra tu Excel de precios o haz clic', gen_price_csv: 'Generar CSV de precios',
    generating_prices: 'Generando CSV de precios', prices_done: 'Precios generados',
    download_price_csv: 'Descargar CSV de precios', update_other_prices: 'Actualizar otros precios',
    price: 'Precio', discount: 'Descuento', currency: 'Moneda',
    validate_title: 'Validar productos antes de subir', validate_sub: 'Comprobamos EAN, SKU, imágenes, precios, categorías y marcas antes de importar.',
    validate_btn: 'Validar', validating: 'Validando productos', validate_done: 'Validación completada',
    valid_products: 'productos válidos', results_by_check: 'Resultados por validación',
    warnings: 'avisos', validate_another: 'Validar otro archivo',
    profile_info: 'Información personal', save_changes: 'Guardar cambios',
    change_password: 'Cambiar contraseña', current_password: 'Contraseña actual', new_password: 'Nueva contraseña',
    update_password: 'Actualizar contraseña',
    admin_panel: 'Panel de Administración', user_management: 'Gestión de Usuarios',
    admin_sub: 'Administra las cuentas de vendedores y sus permisos.',
    registered_users: 'Usuarios registrados', admins: 'Administradores', active_sessions: 'Sesiones activas',
    users: 'Usuarios', refresh: 'Actualizar', no_users: 'No hay usuarios registrados',
    user_role: 'USUARIO', remove_admin: 'Quitar admin', make_admin: 'Hacer admin',
    delete: 'Eliminar', your_account: 'Tu cuenta', delete_user: 'Eliminar usuario', create_user: 'Crear usuario',
    delete_confirm: '¿Seguro que quieres eliminar a', cancel: 'Cancelar',
    role_super_admin: 'Super Admin', role_marketplace_admin: 'Admin Marketplace', role_user: 'Vendedor',
    marketplace_label_short: 'Marketplace', marketplace_none: 'Sin asignar',
    admin_marketplace_filter: 'Filtrar por marketplace', admin_all_marketplaces: 'Todos los marketplaces',
    admin_assign_role: 'Rol', admin_assign_marketplace: 'Marketplace',
    admin_marketplace_admins: 'Admins Marketplace',
    admin_add_marketplace: 'Añadir marketplace', admin_marketplace_name: 'Nombre del marketplace',
    admin_marketplaces: 'Marketplaces', admin_no_marketplaces: 'No hay marketplaces configurados',
    admin_remove_marketplace: 'Quitar',
    footer: 'Automatización con IA',
    nav_stock: 'Stock', nav_repricing: 'Repricing',
    stock_title: 'Sincronizar stock en marketplace', stock_sub: 'Sube un Excel con SKU y cantidades. Generamos el CSV de stock listo para importar.',
    drop_stock: 'Arrastra tu Excel de stock o haz clic', gen_stock_csv: 'Generar CSV de stock',
    generating_stock: 'Generando CSV de stock', stock_done: 'Stock generado',
    download_stock_csv: 'Descargar CSV de stock', update_other_stock: 'Actualizar otro stock',
    quantity: 'Cantidad', tag_stock: 'Stock',
    show_password: 'Mostrar contraseña', hide_password: 'Ocultar contraseña',
    tool_repricing: 'Repricing Inteligente', tool_repricing_desc: 'Compara precios con competidores y genera recomendaciones de precio óptimo.',
    repricing_title: 'Repricing inteligente', repricing_sub: 'Sube tu catálogo con costes. Opcionalmente, añade ofertas de competidores para calcular el precio óptimo.',
    repricing_your_products: 'Tu catálogo (con costes)', repricing_competitors: 'Ofertas de competidores (opcional)',
    repricing_competitors_hint: 'Si no lo tienes, analizamos solo tus márgenes. Con API de marketplace se autocompleta.',
    repricing_drop_products: 'Arrastra tu Excel de productos o haz clic', repricing_drop_competitors: 'Arrastra el Excel de ofertas competidoras o haz clic',
    repricing_margin_min: 'Margen mínimo (%)', repricing_undercut: 'Rebajar vs competidor (€)',
    repricing_max_decrease: 'Máx. bajada por ciclo (%)', repricing_round_to: 'Redondear a',
    repricing_calculate: 'Calcular repricing', repricing_calculating: 'Calculando precios óptimos...',
    repricing_done: 'Repricing calculado', repricing_recommendations: 'recomendaciones',
    repricing_keep: 'mantener', repricing_lower: 'bajar', repricing_no_data: 'sin competidor',
    repricing_current_price: 'Tu precio', repricing_cost: 'Coste', repricing_competitor_price: 'Competidor',
    repricing_recommended: 'Recomendado', repricing_margin: 'Margen', repricing_action: 'Acción',
    repricing_download: 'Descargar CSV de precios recomendados', repricing_another: 'Calcular otro repricing',
    repricing_summary: 'Resumen', repricing_products_lower: 'Productos a bajar precio',
    repricing_products_keep: 'Mantener precio', repricing_products_no_comp: 'Sin competidor',
    repricing_avg_margin: 'Margen medio recomendado', repricing_potential_savings: 'Ahorro potencial vs competencia',
    repricing_omnibus_warning: 'Respeta Ley Omnibus: precio mínimo 30 días',
    repricing_settings: 'Configuración del algoritmo',
    repricing_help_products: 'Columnas: offer-sku, price (tu precio actual), cost (tu coste unitario)',
    repricing_help_competitors: 'Columnas: offer-sku, price (precio del competidor), shipping (coste envío)',
    dark_mode: 'Modo oscuro',
    templates_title: 'Plantillas de ejemplo', download_template: 'Descargar plantilla',
    browser_notifs: 'Notificaciones del navegador', notif_enabled: 'Activadas', notif_disabled: 'Desactivadas',
    notif_catalog_done: 'Catálogo procesado', notif_prices_done: 'Precios generados',
    notif_stock_done: 'Stock actualizado', notif_validate_done: 'Validación completada',
    my_files: 'Mis archivos', saved_files: 'Archivos guardados', expires_in: 'Expira en', days: 'días',
    no_saved_files: 'No tienes archivos guardados', no_saved_files_hint: 'Los archivos generados se guardan aquí durante 15 días',
    tag_stock_upper: 'STOCK',
    tag_images_upper: 'IMÁGENES',
    login_invite_only: 'Acceso solo por invitación. Contacta con el administrador.',
    login_placeholder_email: 'tu@email.com',
    greeting: 'Hola, ',
    activity_by_tool: 'Actividad por herramienta',
    recent_activity: 'Actividad reciente',
    login_error_fallback: 'Error en el login',
    connection_error: 'Error de conexión con el servidor',
    connection_error_short: 'Error de conexión',
    saved_msg: 'Guardado',
    updated_msg: 'Actualizado',
    fill_both_fields: 'Rellena ambos campos',
    time_now: 'ahora',
    log_products_read: 'productos leídos del Excel',
    log_sending: 'Enviando al servidor...',
    log_marketplace: 'Marketplace:',
    log_server_error: 'Error del servidor. Inténtalo de nuevo.',
    log_completed: 'Completado',
    log_products_with_errors: 'productos con errores',
    log_errors_found: 'errores encontrados',
    file_too_large: 'Archivo demasiado grande. Máximo {max}MB',
    admin_dashboard_title: 'Dashboard',
    admin_dashboard_sub: 'Actividad global de la plataforma',
    admin_total_jobs: 'Trabajos totales',
    admin_products_processed: 'Productos procesados',
    admin_users_label: 'Usuarios',
    admin_today_jobs: 'Trabajos hoy',
    admin_by_tool: 'Por herramienta',
    admin_by_user: 'Por usuario',
    admin_no_activity: 'Sin actividad',
    admin_no_activity_log: 'Sin actividad registrada',
    admin_refresh: 'Actualizar',
    admin_jobs_label: 'trabajos',
    admin_create_name_ph: 'Nombre',
    admin_create_email_ph: 'email@ejemplo.com',
    user_created: 'Usuario creado: ',
    lang_spanish: 'Español',
    lang_portuguese: 'Português',
    tpl_filename_catalog: 'plantilla_catalogo.xlsx',
    tpl_filename_prices: 'plantilla_precios.xlsx',
    tpl_filename_stock: 'plantilla_stock.xlsx',
    tpl_filename_validation: 'plantilla_validacion.xlsx',
    tpl_sheet_name: 'Plantilla',
    footer_copy: '© 2026 Katalync by Prometeix',
    productos: 'productos',
    errores: 'errores',
    open_tool: 'Abrir',
    support: 'Soporte',
    support_title: 'Centro de soporte',
    support_sub: '¿Necesitas ayuda? Envíanos un mensaje y te responderemos lo antes posible.',
    support_name: 'Tu nombre',
    support_email: 'Tu email',
    support_subject: 'Asunto',
    support_subject_ph: 'Ej: Problema al procesar catálogo',
    support_message: 'Mensaje',
    support_message_ph: 'Describe tu consulta o problema...',
    support_send: 'Enviar mensaje',
    support_contact: 'También puedes escribirnos directamente a:',
    chat_title: 'Ana · Asistente',
    chat_placeholder: 'Escribe tu pregunta...',
    chat_welcome: '¡Hola! Soy Ana, tu asistente de Katalync. Puedo ayudarte con:\n\n- Cómo subir y procesar archivos\n- Formatos y columnas requeridas\n- Suscripción, pagos y facturación\n- Errores comunes y soluciones\n- Repricing y estrategias de precio\n\n¿En qué puedo ayudarte?',
    chat_no_match: 'No he encontrado una respuesta específica. Puedes contactar con soporte desde el menú de usuario para asistencia personalizada.',
    chat_blocked: 'Solo puedo responder preguntas sobre el uso de Katalync.',
    register_disabled: 'Registro desactivado. Contacta con el administrador.',
    empty_credentials: 'Introduce email y contraseña',
    rate_limit: 'Demasiados intentos. Espera 1 minuto.',
    max_products_error: 'Máximo {max} productos por lote. Tu archivo tiene {count}',
    log_validation_complete: 'Validación completada',
    log_warnings_found: 'avisos',
    sub_pending_title: 'Activa tu suscripción',
    sub_pending_sub: 'Para acceder a las herramientas de Katalync necesitas activar tu plan.',
    sub_pending_plan_vendor: 'Plan Vendedor',
    sub_pending_plan_admin: 'Plan Marketplace Partner',
    sub_pending_price_vendor: '39€/mes',
    sub_pending_price_admin: '99€/mes',
    sub_pending_features: 'Incluye todas las herramientas: Conversor, Precios, Stock, Validación y Repricing',
    sub_pending_activate: 'Activar suscripción',
    sub_pending_contact: 'Si tienes dudas, contacta con tu administrador de marketplace.',
    sub_suspended_title: 'Suscripción suspendida',
    sub_suspended_sub: 'Tu suscripción ha sido suspendida por un problema con el pago.',
    sub_suspended_renew: 'Renovar suscripción',
    sub_suspended_contact: 'Si crees que es un error, contacta con soporte.',
    sub_status_active: 'Activo',
    sub_status_pending: 'Pendiente de pago',
    sub_status_suspended: 'Suspendido',
    sub_status_cancelled: 'Cancelado',
    sub_admin_status: 'Estado suscripción',
    sub_admin_change_status: 'Cambiar estado',
    sub_plan_label: 'Plan',
    sub_badge_active: 'Activo',
    sub_badge_pending: 'Pago pendiente',
    sub_badge_suspended: 'Suspendido',
    billing_portal: 'Facturación',
    billing_portal_loading: 'Abriendo portal...',
    billing_portal_error: 'No se pudo abrir el portal de facturación'
  },
  pt: {
    auth_login_title: 'Iniciar sessão', auth_login_sub: 'Insira suas credenciais para acessar',
    auth_register_title: 'Criar conta', auth_register_sub: 'Registre-se para acessar as ferramentas',
    password: 'Senha', your_password: 'Sua senha', your_name: 'Seu nome', name: 'Nome',
    min_chars: 'Mínimo 8 caracteres', login_btn: 'Entrar', logging_in: 'Entrando...', register_btn: 'Criar conta',
    creating: 'Criando...', no_account: 'Não tem conta?', register_link: 'Registre-se',
    has_account: 'Já tem conta?', login_link: 'Faça login', verifying: 'Verificando sessão...',
    continue: 'Continuar', back: 'Voltar', skip: 'Pular configuração',
    onb_welcome: 'Bem-vindo, {name}!', onb_welcome_sub: 'Sua plataforma para automatizar a preparação de catálogos para marketplace.',
    onb_feat_catalog: 'Conversor de Catálogo', onb_feat_catalog_sub: 'Títulos, descrições, imagens e CSV Mirakl-ready',
    onb_feat_prices: 'Atualização de Preços', onb_feat_prices_sub: 'CSV de preços e descontos pronto para importar',
    onb_feat_validate: 'Validação Pre-Upload', onb_feat_validate_sub: 'EAN, SKU, imagens e campos antes de subir',
    onb_company_title: 'Sobre sua empresa', onb_company_sub: 'Isso nos ajuda a personalizar sua experiência',
    company_name: 'Nome da empresa', company_placeholder: 'Ex: Minha Empresa Lda.',
    language: 'Idioma', onb_ready_title: 'Tudo pronto!', onb_ready_sub: 'Revise sua configuração e comece a trabalhar',
    onb_start: 'Começar a trabalhar', company: 'Empresa',
    nav_converter: 'Conversor', nav_prices: 'Preços', nav_validation: 'Validação',
    notifications: 'Notificações', mark_all_read: 'Marcar tudo lido', no_notifications: 'Sem notificações',
    clear_all: 'Apagar todas', history: 'Histórico', my_profile: 'Meu perfil', logout: 'Sair',
    generated_files: 'Arquivos gerados', no_files_yet: 'Nenhum arquivo ainda',
    no_files_hint: 'Processe seu primeiro catálogo para ver resultados aqui',
    tag_catalog: 'CATÁLOGO', tag_prices: 'PREÇOS', tag_validation: 'VALIDAÇÃO',
    products_lc: 'produtos', download: 'Baixar',
    home_title: 'Katalync', home_sub: 'Automatize a preparação do seu catálogo para marketplace. Converta, atualize preços e valide antes de subir.',
    stat_files: 'Arquivos gerados', stat_products: 'Produtos processados', stat_success: 'Taxa de sucesso', stat_avg: 'Média por lote',
    tool_catalog: 'Conversor de Catálogo', tool_catalog_desc: 'Títulos, descrições, imagens 2:3 a CDN e CSV Mirakl-ready.',
    tool_prices: 'Atualização de Preços', tool_prices_desc: 'CSV de preços e descontos pronto para importar.',
    tool_validate: 'Validação Pre-Upload', tool_validate_desc: 'Valide EAN, imagens e campos antes de subir.',
    tool_stock: 'Sincronização de Estoque', tool_stock_desc: 'Atualize estoque diretamente do seu Excel.',
    coming_soon: 'Em breve', tag_images: 'Imagens', tag_titles: 'Títulos', tag_pricing: 'Preços', tag_discounts: 'Descontos',
    tag_image: 'Imagem', chart_title: 'Produtos processados', all: 'Todos', products: 'Produtos', files: 'Arquivos',
    chart_empty: 'Sem dados ainda', chart_empty_hint: 'Processe seu primeiro catálogo para ver o gráfico',
    no_activity: 'Sem atividade recente', home: 'Início',
    catalog_title: 'Converta seu catálogo para marketplace', catalog_sub: 'Carregue seu Excel com dados do produto. Formatamos títulos, descrições e imagens.',
    marketplace_label: 'Marketplace destino', other_marketplace: 'Outro marketplace', image_format: 'Formato de imagem',
    gen_title: 'Formatar títulos', gen_title_hint: 'Gera título padronizado: Categoria Marca Cor',
    gen_desc: 'Gerar descrições', gen_desc_hint: 'Gera descrição com marca, modelo, categoria, material...',
    convert_images: 'Converter imagens para CDN', convert_images_hint: 'Converte para 2:3, envia ao CDN e gera URLs públicas para Mirakl',
    customize_label: 'Personalizar saída',
    excel_file: 'Arquivo Excel', drop_excel: 'Arraste seu Excel ou clique', remove: 'Remover',
    products_detected: 'produtos detectados', columns: 'Colunas', process: 'Processar',
    processing_catalog: 'Processando catálogo', waiting: 'Aguardando...',
    catalog_done: 'Catálogo processado', products_ok: 'produtos OK', errors: 'erros',
    preview: 'Pré-visualização', title: 'Título', download_csv: 'Baixar CSV Mirakl-ready',
    see: 'Ver', process_another: 'Processar outro catálogo', back_home: 'Voltar ao início',
    prices_title: 'Atualizar preços no marketplace', prices_sub: 'Carregue um Excel com SKU e novos preços. Geramos o CSV pronto para importar.',
    include_discount: 'Incluir preço de desconto', include_discount_hint: 'Se tiver coluna de preço com desconto',
    promo_tag: 'Tag de promoção', promo_tag_hint: 'Ex: wintersales_2025. Adicionado à descrição da oferta para aparecer em promoções',
    promo_tag_placeholder: 'wintersales_2025',
    drop_prices: 'Arraste seu Excel de preços ou clique', gen_price_csv: 'Gerar CSV de preços',
    generating_prices: 'Gerando CSV de preços', prices_done: 'Preços gerados',
    download_price_csv: 'Baixar CSV de preços', update_other_prices: 'Atualizar outros preços',
    price: 'Preço', discount: 'Desconto', currency: 'Moeda',
    validate_title: 'Validar produtos antes de subir', validate_sub: 'Verificamos EAN, SKU, imagens, preços, categorias e marcas antes de importar.',
    validate_btn: 'Validar', validating: 'Validando produtos', validate_done: 'Validação concluída',
    valid_products: 'produtos válidos', results_by_check: 'Resultados por validação',
    warnings: 'avisos', validate_another: 'Validar outro arquivo',
    profile_info: 'Informação pessoal', save_changes: 'Salvar alterações',
    change_password: 'Alterar senha', current_password: 'Senha atual', new_password: 'Nova senha',
    update_password: 'Atualizar senha',
    admin_panel: 'Painel de Administração', user_management: 'Gestão de Usuários',
    admin_sub: 'Administre as contas de vendedores e suas permissões.',
    registered_users: 'Usuários registrados', admins: 'Administradores', active_sessions: 'Sessões ativas',
    users: 'Usuários', refresh: 'Atualizar', no_users: 'Nenhum usuário registrado',
    user_role: 'USUÁRIO', remove_admin: 'Remover admin', make_admin: 'Tornar admin',
    delete: 'Excluir', your_account: 'Sua conta', delete_user: 'Excluir usuário', create_user: 'Criar usuario',
    delete_confirm: 'Tem certeza que quer excluir', cancel: 'Cancelar',
    role_super_admin: 'Super Admin', role_marketplace_admin: 'Admin Marketplace', role_user: 'Vendedor',
    marketplace_label_short: 'Marketplace', marketplace_none: 'Sem atribuir',
    admin_marketplace_filter: 'Filtrar por marketplace', admin_all_marketplaces: 'Todos os marketplaces',
    admin_assign_role: 'Papel', admin_assign_marketplace: 'Marketplace',
    admin_marketplace_admins: 'Admins Marketplace',
    admin_add_marketplace: 'Adicionar marketplace', admin_marketplace_name: 'Nome do marketplace',
    admin_marketplaces: 'Marketplaces', admin_no_marketplaces: 'Nenhum marketplace configurado',
    admin_remove_marketplace: 'Remover',
    footer: 'Automação com IA',
    nav_stock: 'Estoque', nav_repricing: 'Repricing',
    stock_title: 'Sincronizar estoque no marketplace', stock_sub: 'Carregue um Excel com SKU e quantidades. Geramos o CSV de estoque pronto para importar.',
    drop_stock: 'Arraste seu Excel de estoque ou clique', gen_stock_csv: 'Gerar CSV de estoque',
    generating_stock: 'Gerando CSV de estoque', stock_done: 'Estoque gerado',
    download_stock_csv: 'Baixar CSV de estoque', update_other_stock: 'Atualizar outro estoque',
    quantity: 'Quantidade', tag_stock: 'Estoque',
    show_password: 'Mostrar senha', hide_password: 'Ocultar senha',
    tool_repricing: 'Repricing Inteligente', tool_repricing_desc: 'Compare preços com concorrentes e gere recomendações de preço ótimo.',
    repricing_title: 'Repricing inteligente', repricing_sub: 'Carregue seu catálogo com custos. Opcionalmente, adicione ofertas dos concorrentes para calcular o preço ótimo.',
    repricing_your_products: 'Seu catálogo (com custos)', repricing_competitors: 'Ofertas dos concorrentes (opcional)',
    repricing_competitors_hint: 'Se não tiver, analisamos apenas suas margens. Com API do marketplace se autocompleta.',
    repricing_drop_products: 'Arraste seu Excel de produtos ou clique', repricing_drop_competitors: 'Arraste o Excel de ofertas concorrentes ou clique',
    repricing_margin_min: 'Margem mínima (%)', repricing_undercut: 'Reduzir vs concorrente (€)',
    repricing_max_decrease: 'Máx. redução por ciclo (%)', repricing_round_to: 'Arredondar para',
    repricing_calculate: 'Calcular repricing', repricing_calculating: 'Calculando preços ótimos...',
    repricing_done: 'Repricing calculado', repricing_recommendations: 'recomendações',
    repricing_keep: 'manter', repricing_lower: 'baixar', repricing_no_data: 'sem concorrente',
    repricing_current_price: 'Seu preço', repricing_cost: 'Custo', repricing_competitor_price: 'Concorrente',
    repricing_recommended: 'Recomendado', repricing_margin: 'Margem', repricing_action: 'Ação',
    repricing_download: 'Baixar CSV de preços recomendados', repricing_another: 'Calcular outro repricing',
    repricing_summary: 'Resumo', repricing_products_lower: 'Produtos a baixar preço',
    repricing_products_keep: 'Manter preço', repricing_products_no_comp: 'Sem concorrente',
    repricing_avg_margin: 'Margem média recomendada', repricing_potential_savings: 'Economia potencial vs concorrência',
    repricing_omnibus_warning: 'Respeita Lei Omnibus: preço mínimo 30 dias',
    repricing_settings: 'Configuração do algoritmo',
    repricing_help_products: 'Colunas: offer-sku, price (seu preço atual), cost (seu custo unitário)',
    repricing_help_competitors: 'Colunas: offer-sku, price (preço do concorrente), shipping (custo envio)',
    dark_mode: 'Modo escuro',
    templates_title: 'Modelos de exemplo', download_template: 'Baixar modelo',
    browser_notifs: 'Notificações do navegador', notif_enabled: 'Ativadas', notif_disabled: 'Desativadas',
    notif_catalog_done: 'Catálogo processado', notif_prices_done: 'Preços gerados',
    notif_stock_done: 'Estoque atualizado', notif_validate_done: 'Validação concluída',
    my_files: 'Meus arquivos', saved_files: 'Arquivos salvos', expires_in: 'Expira em', days: 'dias',
    no_saved_files: 'Você não tem arquivos salvos', no_saved_files_hint: 'Os arquivos gerados são salvos aqui por 15 dias',
    tag_stock_upper: 'ESTOQUE',
    tag_images_upper: 'IMAGENS',
    login_invite_only: 'Acesso somente por convite. Contacte o administrador.',
    login_placeholder_email: 'seu@email.com',
    greeting: 'Olá, ',
    activity_by_tool: 'Atividade por ferramenta',
    recent_activity: 'Atividade recente',
    login_error_fallback: 'Erro no login',
    connection_error: 'Erro de conexão com o servidor',
    connection_error_short: 'Erro de conexão',
    saved_msg: 'Salvo',
    updated_msg: 'Atualizado',
    fill_both_fields: 'Preencha ambos os campos',
    time_now: 'agora',
    log_products_read: 'produtos lidos do Excel',
    log_sending: 'Enviando ao servidor...',
    log_marketplace: 'Marketplace:',
    log_server_error: 'Erro do servidor. Tente novamente.',
    log_completed: 'Concluído',
    log_products_with_errors: 'produtos com erros',
    log_errors_found: 'erros encontrados',
    file_too_large: 'Arquivo muito grande. Máximo {max}MB',
    admin_dashboard_title: 'Dashboard',
    admin_dashboard_sub: 'Atividade global da plataforma',
    admin_total_jobs: 'Trabalhos totais',
    admin_products_processed: 'Produtos processados',
    admin_users_label: 'Usuários',
    admin_today_jobs: 'Trabalhos hoje',
    admin_by_tool: 'Por ferramenta',
    admin_by_user: 'Por usuário',
    admin_no_activity: 'Sem atividade',
    admin_no_activity_log: 'Sem atividade registrada',
    admin_refresh: 'Atualizar',
    admin_jobs_label: 'trabalhos',
    admin_create_name_ph: 'Nome',
    admin_create_email_ph: 'email@exemplo.com',
    user_created: 'Usuário criado: ',
    lang_spanish: 'Espanhol',
    lang_portuguese: 'Português',
    tpl_filename_catalog: 'modelo_catalogo.xlsx',
    tpl_filename_prices: 'modelo_precos.xlsx',
    tpl_filename_stock: 'modelo_estoque.xlsx',
    tpl_filename_validation: 'modelo_validacao.xlsx',
    tpl_sheet_name: 'Modelo',
    footer_copy: '© 2026 Katalync by Prometeix',
    productos: 'produtos',
    errores: 'erros',
    open_tool: 'Abrir',
    support: 'Suporte',
    support_title: 'Centro de suporte',
    support_sub: 'Precisa de ajuda? Envie-nos uma mensagem e responderemos o mais rápido possível.',
    support_name: 'Seu nome',
    support_email: 'Seu email',
    support_subject: 'Assunto',
    support_subject_ph: 'Ex: Problema ao processar catálogo',
    support_message: 'Mensagem',
    support_message_ph: 'Descreva sua consulta ou problema...',
    support_send: 'Enviar mensagem',
    support_contact: 'Também pode escrever diretamente para:',
    chat_title: 'Ana · Assistente',
    chat_placeholder: 'Escreva sua pergunta...',
    chat_welcome: 'Olá! Sou a Ana, sua assistente do Katalync. Posso ajudá-lo com:\n\n- Como carregar e processar arquivos\n- Formatos e colunas necessárias\n- Assinatura, pagamentos e faturação\n- Erros comuns e soluções\n- Repricing e estratégias de preço\n\nComo posso ajudá-lo?',
    chat_no_match: 'Não encontrei uma resposta específica. Pode contactar o suporte no menu do usuário para assistência personalizada.',
    chat_blocked: 'Só posso responder perguntas sobre o uso do Katalync.',
    register_disabled: 'Registro desativado. Contate o administrador.',
    empty_credentials: 'Insira email e senha',
    rate_limit: 'Muitas tentativas. Aguarde 1 minuto.',
    max_products_error: 'Máximo {max} produtos por lote. Seu arquivo tem {count}',
    log_validation_complete: 'Validação concluída',
    log_warnings_found: 'avisos',
    sub_pending_title: 'Ative sua assinatura',
    sub_pending_sub: 'Para acessar as ferramentas do Katalync você precisa ativar seu plano.',
    sub_pending_plan_vendor: 'Plano Vendedor',
    sub_pending_plan_admin: 'Plano Marketplace Partner',
    sub_pending_price_vendor: '39€/mês',
    sub_pending_price_admin: '99€/mês',
    sub_pending_features: 'Inclui todas as ferramentas: Conversor, Preços, Estoque, Validação e Repricing',
    sub_pending_activate: 'Ativar assinatura',
    sub_pending_contact: 'Se tiver dúvidas, contacte seu administrador de marketplace.',
    sub_suspended_title: 'Assinatura suspensa',
    sub_suspended_sub: 'Sua assinatura foi suspensa por um problema com o pagamento.',
    sub_suspended_renew: 'Renovar assinatura',
    sub_suspended_contact: 'Se acredita que é um erro, contacte o suporte.',
    sub_status_active: 'Ativo',
    sub_status_pending: 'Pendente de pagamento',
    sub_status_suspended: 'Suspenso',
    sub_status_cancelled: 'Cancelado',
    sub_admin_status: 'Estado assinatura',
    sub_admin_change_status: 'Alterar estado',
    sub_plan_label: 'Plano',
    sub_badge_active: 'Ativo',
    sub_badge_pending: 'Pagamento pendente',
    sub_badge_suspended: 'Suspenso',
    billing_portal: 'Faturação',
    billing_portal_loading: 'Abrindo portal...',
    billing_portal_error: 'Não foi possível abrir o portal de faturação'
  }
};

let _mem = {};
const _rateLimiter = { attempts: {}, check(key, maxAttempts, windowMs) { const now = Date.now(); if (!this.attempts[key]) this.attempts[key] = []; this.attempts[key] = this.attempts[key].filter(t => now - t < windowMs); if (this.attempts[key].length >= maxAttempts) return false; this.attempts[key].push(now); return true; } };
const MAX_PRODUCTS_PER_REQUEST = 10000;
const MAX_FILE_SIZE_MB = 15;

function memGet(k) { return _mem[k] || null; }
function memSet(k, v) { _mem[k] = v; }
function memDel(k) { delete _mem[k]; }

function storeGet(k) { try { return localStorage.getItem(k); } catch(e) { return null; } }
function storeSet(k, v) { try { localStorage.setItem(k, v); } catch(e) {} }
function storeDel(k) { try { localStorage.removeItem(k); } catch(e) {} }

function safeGetHistory() { try { const m = memGet('hist'); if (m) return JSON.parse(m); const s = storeGet('catalogHistory'); if (s) return JSON.parse(s); return []; } catch(e) { return []; } }
function safeSaveHistory(data) { try { const s = JSON.stringify(data); memSet('hist', s); storeSet('catalogHistory', s); } catch(e) {} }
function safeGetToken() { return memGet('authToken') || storeGet('authToken') || null; }
function safeSaveToken(token) { memSet('authToken', token); storeSet('authToken', token); }
function safeClearToken() { memDel('authToken'); storeDel('authToken'); }
function safeGetLang() { return memGet('appLang') || storeGet('appLang') || 'es'; }
function safeSaveLang(l) { memSet('appLang', l); storeSet('appLang', l); }
function safeGetDarkMode() { return memGet('darkMode') === 'true' || storeGet('darkMode') === 'true'; }
function safeSaveDarkMode(v) { memSet('darkMode', String(v)); storeSet('darkMode', String(v)); }
function safeGetBrowserNotifs() { return memGet('browserNotifs') === 'true' || storeGet('browserNotifs') === 'true'; }
function safeSaveBrowserNotifs(v) { memSet('browserNotifs', String(v)); storeSet('browserNotifs', String(v)); }

function app() {
  const N8N_BASE = (typeof N8N_WEBHOOK_BASE !== 'undefined') ? N8N_WEBHOOK_BASE : '';

  return {
    lang: safeGetLang(),
    darkMode: safeGetDarkMode(),
    browserNotifs: safeGetBrowserNotifs(),
    t(key) { return (TRANSLATIONS[this.lang] || TRANSLATIONS.es)[key] || (TRANSLATIONS.es)[key] || key; },

    toastMsg: '', toastType: 'success', toastVisible: false,
    showToast(msg, type) { this.toastMsg = msg; this.toastType = type || 'success'; this.toastVisible = true; setTimeout(() => { this.toastVisible = false; }, 4000); },

    authPage: 'login', authEmail: '', authPassword: '', authName: '', authError: '', authBusy: false, authLoading: true,
    currentUser: null, authToken: null, showLoginPass: false, showRegisterPass: false, showPwdCurrent: false, showPwdNew: false,

    showOnboarding: false, onboardStep: 1, onboardCompany: '', onboardLang: safeGetLang(), onboardBusy: false, paymentJustCompleted: false,

    showNotifPanel: false, notifications: [], unreadNotifCount: 0,
    showUserMenu: false,
    savedFiles: [], savedFilesLoading: false,

    profileName: '', profileCompany: '', profileLang: safeGetLang(), profileBusy: false, profileMsg: '', profileMsgType: 'success',
    pwdCurrent: '', pwdNew: '', pwdBusy: false, pwdMsg: '', pwdMsgType: 'success',

    adminUsers: [], adminActiveSessions: 0, adminLoading: false, adminConfirmDelete: null, adminMessage: '', adminMessageType: 'success',
    adminNewName: '', adminNewEmail: '', adminNewPassword: '', adminNewRole: 'user', adminNewMarketplace: '', adminCreateBusy: false, adminCreateMsg: '', adminCreateOk: false,
    adminTab: 'dashboard',
    adminMarketplaceFilter: '',
    adminMarketplaces: JSON.parse(storeGet('adminMarketplaces') || '["sprinter"]'),
    adminNewMarketplaceName: '',
    adminDashboard: { loading: false, totalJobs: 0, totalProducts: 0, todayJobs: 0, byTool: [], byUser: [], recentActivity: [] },

    page: 'home', showHistory: false, historyJobs: safeGetHistory(), chartMarketplace: 'all', chartMetric: 'products',

    init() {
      const saved = safeGetToken();
      if (saved) { this.authToken = saved; this.verifySession(saved); }
      else { this.authLoading = false; }
      this.$watch('darkMode', v => safeSaveDarkMode(v));
      this.$watch('browserNotifs', v => safeSaveBrowserNotifs(v));
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('payment') === 'success') {
        this.paymentJustCompleted = true;
        window.history.replaceState({}, '', window.location.pathname);
      }
    },

    async doRegister() {
      this.authError = this.t('register_disabled');
    },

    async doLogin() {
      if (this.authBusy) return;
      this.authError = '';
      if (!this.authEmail || !this.authPassword) { this.authError = this.t('empty_credentials'); return; }
      if (!_rateLimiter.check('login', 5, 60000)) { this.authError = this.t('rate_limit'); return; }
      this.authBusy = true;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: this.authEmail, password: this.authPassword }) });
        const data = await resp.json();
        if (!data.success) { this.authError = data.error || this.t('login_error_fallback'); this.authBusy = false; return; }
        this.authToken = data.token;
        const role = data.role === 'admin' ? 'super_admin' : (data.role || 'user');
        this.currentUser = { name: data.name, email: data.email, role, marketplace_id: data.marketplace_id || '', company: data.company || '', onboarded: data.onboarded !== false, subscription_status: data.subscription_status || 'active', stripe_checkout_url: data.stripe_checkout_url || '' };
        safeSaveToken(data.token);
        this.authPassword = '';
        if (data.lang) { this.lang = data.lang; safeSaveLang(data.lang); }
        if (!this.currentUser.onboarded) { this.showOnboarding = true; }
        this.authBusy = false;
        this.loadNotifications();
        this.loadSavedFiles();
      } catch(e) { this.authError = this.t('connection_error'); this.authBusy = false; this.authPassword = ''; }
    },

    async verifySession(token) {
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
        const data = await resp.json();
        if (data.success) {
          const role = data.role === 'admin' ? 'super_admin' : (data.role || 'user');
          this.currentUser = { name: data.name, email: data.email, role, marketplace_id: data.marketplace_id || '', company: data.company || '', onboarded: data.onboarded !== false, subscription_status: data.subscription_status || 'active', stripe_checkout_url: data.stripe_checkout_url || '' };
          if (data.lang) { this.lang = data.lang; safeSaveLang(data.lang); }
          this.unreadNotifCount = data.unreadNotifications || 0;
          this.profileName = data.name; this.profileCompany = data.company || ''; this.profileLang = data.lang || this.lang;
          if (!this.currentUser.onboarded) { this.showOnboarding = true; }
          this.loadSavedFiles();
          if (this.paymentJustCompleted && this.currentUser.subscription_status !== 'active') {
            this.currentUser.subscription_status = 'active';
            fetch(N8N_BASE + '/webhook/auth-admin-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, email: this.currentUser.email, subscription_status: 'active', source: 'stripe_redirect' }) });
          }
        } else { safeClearToken(); this.authToken = null; }
      } catch(e) { safeClearToken(); this.authToken = null; }
      this.authLoading = false;
    },

    doLogout() {
      this.currentUser = null; this.authToken = null; this.authEmail = ''; this.authPassword = '';
      this.authName = ''; this.authError = ''; this.authPage = 'login'; this.showUserMenu = false;
      this.showNotifPanel = false; this.notifications = []; this.unreadNotifCount = 0;
      this.savedFiles = [];
      safeClearToken();
      storeDel('darkMode'); storeDel('browserNotifs'); storeDel('appLang'); storeDel('catalogHistory');
      window.location.href = '/';
    },

    async finishOnboarding() {
      this.onboardBusy = true;
      this.lang = this.onboardLang;
      safeSaveLang(this.onboardLang);
      try {
        await fetch(N8N_BASE + '/webhook/auth-profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, company: this.onboardCompany, lang: this.onboardLang, onboarded: true }) });
        if (this.currentUser) { this.currentUser.company = this.onboardCompany; this.currentUser.onboarded = true; }
        this.profileName = this.currentUser?.name || ''; this.profileCompany = this.onboardCompany; this.profileLang = this.onboardLang;
      } catch(e) {}
      this.showOnboarding = false;
      this.onboardBusy = false;
    },

    async loadNotifications() {
      if (!this.authToken) return;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'list' }) });
        const data = await resp.json();
        if (data.success) {
          this.notifications = data.notifications || [];
          this.unreadNotifCount = this.notifications.filter(n => !n.read).length;
        }
      } catch(e) {}
    },

    async markNotifRead(id) {
      try {
        await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'markRead', notifId: id }) });
        const n = this.notifications.find(x => x.id === id);
        if (n) n.read = true;
        this.unreadNotifCount = this.notifications.filter(x => !x.read).length;
      } catch(e) {}
    },

    async markAllNotifRead() {
      try {
        await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'markAllRead' }) });
        this.notifications.forEach(n => n.read = true);
        this.unreadNotifCount = 0;
      } catch(e) {}
    },

    async createServerNotification(message) {
      if (!this.authToken) return;
      try {
        await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'create', message }) });
        this.loadNotifications();
      } catch(e) {}
    },

    async clearNotifications() {
      try {
        await fetch(N8N_BASE + '/webhook/auth-notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, action: 'clear' }) });
        this.notifications = []; this.unreadNotifCount = 0;
      } catch(e) {}
    },

    async saveProfile() {
      this.profileBusy = true; this.profileMsg = '';
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, name: this.profileName, company: this.profileCompany, lang: this.profileLang }) });
        const data = await resp.json();
        if (data.success) {
          this.profileMsg = data.message || this.t('saved_msg'); this.profileMsgType = 'success';
          if (this.currentUser) { this.currentUser.name = this.profileName; this.currentUser.company = this.profileCompany; }
          this.lang = this.profileLang; safeSaveLang(this.profileLang);
        } else { this.profileMsg = data.error || 'Error'; this.profileMsgType = 'error'; }
      } catch(e) { this.profileMsg = this.t('connection_error_short'); this.profileMsgType = 'error'; }
      this.profileBusy = false;
      setTimeout(() => { this.profileMsg = ''; }, 4000);
    },

    async changePassword() {
      this.pwdBusy = true; this.pwdMsg = '';
      if (!this.pwdCurrent || !this.pwdNew) { this.pwdMsg = this.t('fill_both_fields'); this.pwdMsgType = 'error'; this.pwdBusy = false; return; }
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, currentPassword: this.pwdCurrent, newPassword: this.pwdNew }) });
        const data = await resp.json();
        if (data.success) { this.pwdMsg = data.message || this.t('updated_msg'); this.pwdMsgType = 'success'; this.pwdCurrent = ''; this.pwdNew = ''; }
        else { this.pwdMsg = data.error || 'Error'; this.pwdMsgType = 'error'; }
      } catch(e) { this.pwdMsg = this.t('connection_error_short'); this.pwdMsgType = 'error'; }
      this.pwdBusy = false;
      setTimeout(() => { this.pwdMsg = ''; }, 4000);
    },

    async loadAdminUsers() {
      if (!this.authToken) return;
      this.adminLoading = true; this.adminMessage = '';
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-admin-users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken }) });
        const data = await resp.json();
        if (data.success) { this.adminUsers = data.users || []; this.adminActiveSessions = data.activeSessions || 0; }
        else { this.showAdminMsg(data.error || 'Error', 'error'); }
      } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
      this.adminLoading = false;
    },

    async deleteUser(email) {
      if (!this.authToken || !email) return;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-admin-delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, email }) });
        const data = await resp.json();
        if (data.success) { this.showAdminMsg(data.message, 'success'); this.loadAdminUsers(); }
        else { this.showAdminMsg(data.error || 'Error', 'error'); }
      } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
    },

    async toggleUserRole(email, newRole) {
      if (!this.authToken || !email) return;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-admin-role', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, email, role: newRole }) });
        const data = await resp.json();
        if (data.success) { this.showAdminMsg(data.message || 'OK', 'success'); this.loadAdminUsers(); }
        else { this.showAdminMsg(data.error || 'Error', 'error'); }
      } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
    },

    async assignMarketplace(email, marketplace_id) {
      if (!this.authToken || !email) return;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-admin-role', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, email, marketplace_id }) });
        const data = await resp.json();
        if (data.success) { this.showAdminMsg(data.message || 'OK', 'success'); this.loadAdminUsers(); }
        else { this.showAdminMsg(data.error || 'Error', 'error'); }
      } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
    },

    addMarketplace() {
      const name = this.adminNewMarketplaceName.trim().toLowerCase();
      if (!name || this.adminMarketplaces.includes(name)) return;
      this.adminMarketplaces.push(name);
      storeSet('adminMarketplaces', JSON.stringify(this.adminMarketplaces));
      this.adminNewMarketplaceName = '';
    },

    removeMarketplace(name) {
      this.adminMarketplaces = this.adminMarketplaces.filter(m => m !== name);
      storeSet('adminMarketplaces', JSON.stringify(this.adminMarketplaces));
    },

    get isAdmin() { return this.currentUser && (this.currentUser.role === 'super_admin' || this.currentUser.role === 'admin'); },
    get isMarketplaceAdmin() { return this.currentUser && this.currentUser.role === 'marketplace_admin'; },
    get canAccessAdmin() { return this.isAdmin || this.isMarketplaceAdmin; },

    get filteredAdminUsers() {
      let users = this.adminUsers;
      if (this.isMarketplaceAdmin && this.currentUser.marketplace_id) {
        users = users.filter(u => u.marketplace_id === this.currentUser.marketplace_id);
      } else if (this.adminMarketplaceFilter) {
        users = users.filter(u => u.marketplace_id === this.adminMarketplaceFilter);
      }
      return users;
    },

    getRoleBadge(role) {
      if (role === 'super_admin' || role === 'admin') return { label: this.t('role_super_admin'), class: 'bg-purple-100 text-purple-700' };
      if (role === 'marketplace_admin') return { label: this.t('role_marketplace_admin'), class: 'bg-blue-100 text-blue-700' };
      return { label: this.t('role_user'), class: 'bg-gray-100 text-gray-500' };
    },

    get subscriptionActive() {
      if (!this.currentUser) return false;
      if (this.currentUser.role === 'super_admin' || this.currentUser.role === 'admin') return true;
      return this.currentUser.subscription_status === 'active';
    },

    get subscriptionPending() {
      if (!this.currentUser) return false;
      if (this.currentUser.role === 'super_admin' || this.currentUser.role === 'admin') return false;
      return this.currentUser.subscription_status === 'pending_payment';
    },

    get subscriptionSuspended() {
      if (!this.currentUser) return false;
      if (this.currentUser.role === 'super_admin' || this.currentUser.role === 'admin') return false;
      return this.currentUser.subscription_status === 'suspended' || this.currentUser.subscription_status === 'cancelled';
    },

    getSubStatusBadge(status) {
      if (status === 'active') return { label: this.t('sub_status_active'), class: 'bg-green-100 text-green-700' };
      if (status === 'pending_payment') return { label: this.t('sub_status_pending'), class: 'bg-amber-100 text-amber-700' };
      if (status === 'suspended') return { label: this.t('sub_status_suspended'), class: 'bg-red-100 text-red-700' };
      if (status === 'cancelled') return { label: this.t('sub_status_cancelled'), class: 'bg-gray-100 text-gray-500' };
      return { label: status || 'N/A', class: 'bg-gray-100 text-gray-500' };
    },

    async changeSubscriptionStatus(email, newStatus) {
      if (!this.authToken || !email) return;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-admin-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, email, subscription_status: newStatus }) });
        const data = await resp.json();
        if (data.success) { this.showAdminMsg(data.message || 'OK', 'success'); this.loadAdminUsers(); }
        else { this.showAdminMsg(data.error || 'Error', 'error'); }
      } catch(e) { this.showAdminMsg(this.t('connection_error_short'), 'error'); }
    },

    async openStripeCheckout() {
      if (this.currentUser && this.currentUser.stripe_checkout_url) {
        window.location.href = this.currentUser.stripe_checkout_url;
        return;
      }
      try {
        const resp = await fetch(N8N_BASE + '/webhook/stripe-create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.currentUser?.email || '', role: this.currentUser?.role || 'user' })
        });
        const data = await resp.json();
        if (data.success && data.checkout_url) {
          window.location.href = data.checkout_url;
        } else {
          this.showToast(data.error || 'Error al crear sesión de pago', 'error');
        }
      } catch(e) {
        this.showToast('Error de conexión con el servidor de pagos', 'error');
      }
    },

    async openBillingPortal() {
      try {
        const resp = await fetch(N8N_BASE + '/webhook/stripe-portal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.currentUser?.email || '' })
        });
        const data = await resp.json();
        if (data.success && data.portal_url) {
          window.location.href = data.portal_url;
        } else {
          this.showToast(data.error || this.t('billing_portal_error'), 'error');
        }
      } catch(e) {
        this.showToast(this.t('billing_portal_error'), 'error');
      }
    },

    async loadAdminDashboard() {
      if (!this.authToken) return;
      this.adminDashboard.loading = true;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-admin-dashboard', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken }) });
        const data = await resp.json();
        if (data.success) {
          const toolLabels = { catalog: this.t('nav_converter'), prices: this.t('nav_prices'), validation: this.t('nav_validation'), stock: this.t('nav_stock'), repricing: this.t('nav_repricing') };
          const toolColors = { catalog: 'bg-blue-500', prices: 'bg-green-500', validation: 'bg-yellow-500', stock: 'bg-purple-500', repricing: 'bg-rose-500' };
          const allFiles = data.allFiles || [];
          const now = Date.now();
          const todayStart = new Date(); todayStart.setHours(0,0,0,0);
          let totalProducts = 0; let todayJobs = 0;
          const toolMap = {}; const userMap = {};
          const activity = [];
          for (const f of allFiles) {
            totalProducts += (f.count || 0);
            if (new Date(f.date).getTime() >= todayStart.getTime()) todayJobs++;
            const t = f.tool || 'unknown';
            if (!toolMap[t]) toolMap[t] = { count: 0, products: 0 };
            toolMap[t].count++; toolMap[t].products += (f.count || 0);
            const ue = f.userEmail || 'unknown';
            if (!userMap[ue]) userMap[ue] = { name: f.userName || ue, email: ue, jobs: 0, products: 0 };
            userMap[ue].jobs++; userMap[ue].products += (f.count || 0);
            const ago = now - new Date(f.date).getTime();
            let timeAgo = '';
            if (ago < 60000) timeAgo = this.t('time_now');
            else if (ago < 3600000) timeAgo = Math.floor(ago/60000) + ' min';
            else if (ago < 86400000) timeAgo = Math.floor(ago/3600000) + ' h';
            else timeAgo = Math.floor(ago/86400000) + ' d';
            activity.push({ tool: t, toolLabel: toolLabels[t] || t, userName: f.userName || ue, filename: f.filename, count: f.count || 0, timeAgo, date: f.date });
          }
          this.adminDashboard.totalJobs = allFiles.length;
          this.adminDashboard.totalProducts = totalProducts;
          this.adminDashboard.todayJobs = todayJobs;
          this.adminDashboard.byTool = Object.entries(toolMap).map(([k, v]) => ({ name: toolLabels[k] || k, count: v.count, products: v.products, color: toolColors[k] || 'bg-gray-500' })).sort((a,b) => b.count - a.count);
          this.adminDashboard.byUser = Object.values(userMap).sort((a,b) => b.jobs - a.jobs);
          this.adminDashboard.recentActivity = activity.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 30);
        }
      } catch(e) {}
      this.adminDashboard.loading = false;
    },

    showAdminMsg(msg, type) { this.adminMessage = msg; this.adminMessageType = type; setTimeout(() => { this.adminMessage = ''; }, 4000); },

    async adminCreateUser() {
      if (!this.adminNewName || !this.adminNewEmail || this.adminNewPassword.length < 8) return;
      this.adminCreateBusy = true; this.adminCreateMsg = '';
      try {
        const role = this.isMarketplaceAdmin ? (this.adminNewRole === 'marketplace_admin' ? 'marketplace_admin' : 'user') : this.adminNewRole;
        const marketplace_id = this.isMarketplaceAdmin ? this.currentUser.marketplace_id : this.adminNewMarketplace;
        const payload = { name: this.adminNewName, email: this.adminNewEmail, password: this.adminNewPassword, adminToken: this.authToken, role, marketplace_id };
        const resp = await fetch(N8N_BASE + '/webhook/auth-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await resp.json();
        if (data.success) {
          this.adminCreateMsg = this.t('user_created') + this.adminNewEmail;
          this.adminCreateOk = true;
          fetch(N8N_BASE + '/webhook/katalync-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'welcome', email: this.adminNewEmail, name: this.adminNewName }) }).catch(() => {});
          this.adminNewName = ''; this.adminNewEmail = ''; this.adminNewPassword = ''; this.adminNewRole = 'user'; this.adminNewMarketplace = '';
          this.loadAdminUsers();
        } else { this.adminCreateMsg = data.error || 'Error'; this.adminCreateOk = false; }
      } catch(e) { this.adminCreateMsg = this.t('connection_error_short'); this.adminCreateOk = false; }
      this.adminCreateBusy = false;
      setTimeout(() => { this.adminCreateMsg = ''; }, 5000);
    },

    get totalProductsProcessed() { return this.historyJobs.reduce((sum, j) => sum + (j.count || 0), 0); },
    get successRate() {
      if (this.historyJobs.length === 0) return 100;
      const total = this.historyJobs.reduce((s, j) => s + (j.count || 0), 0);
      return total > 0 ? Math.round((total / (total + this.historyJobs.reduce((s, j) => s + (j.errors || 0), 0))) * 100) : 100;
    },
    get avgProductsPerJob() {
      if (this.historyJobs.length === 0) return 0;
      return Math.round(this.totalProductsProcessed / this.historyJobs.length);
    },

    get chartData() {
      const filtered = this.chartMarketplace === 'all' ? this.historyJobs : this.historyJobs.filter(j => j.marketplace === this.chartMarketplace);
      const catalog = filtered.filter(j => j.tool === 'catalog').reduce((s, j) => s + (j.count || 0), 0);
      const prices = filtered.filter(j => j.tool === 'prices').reduce((s, j) => s + (j.count || 0), 0);
      const validation = filtered.filter(j => j.tool === 'validation').reduce((s, j) => s + (j.count || 0), 0);
      const stock = filtered.filter(j => j.tool === 'stock').reduce((s, j) => s + (j.count || 0), 0);
      const repricing = filtered.filter(j => j.tool === 'repricing').reduce((s, j) => s + (j.count || 0), 0);
      return { catalog, prices, validation, stock, repricing, maxVal: Math.max(catalog, prices, validation, stock, repricing, 1) };
    },

    get recentActivity() { return this.historyJobs.slice(0, 5); },

    ratios: [{ value: '2:3', label: '2:3', dims: '1000x1500' }, { value: '1:1', label: '1:1', dims: '1000x1000' }, { value: '4:3', label: '4:3', dims: '1000x750' }],

    formatSize(bytes) { if (!bytes) return ''; if (bytes < 1024) return bytes + ' B'; if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'; return (bytes / (1024 * 1024)).toFixed(1) + ' MB'; },
    isValidExcel(file) { if (!file) return false; if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) { alert(this.t('file_too_large').replace('{max}', MAX_FILE_SIZE_MB)); return false; } return /\.(xlsx|xls|csv)$/i.test(file.name) && ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv', 'application/csv'].includes(file.type); },
    async parseExcel(file) { try { const data = await file.arrayBuffer(); const wb = XLSX.read(data); return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '' }); } catch (err) { return []; } },
    addLog(logArr, refName, type, message) { const time = new Date().toLocaleTimeString(this.lang === 'pt' ? 'pt-PT' : 'es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); logArr.push({ type, message, time }); this.$nextTick(() => { const c = this.$refs[refName]; if (c) c.scrollTop = c.scrollHeight; }); },

    requestNotifPermission() {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    },
    sendBrowserNotif(title, body) {
      if (!this.browserNotifs) return;
      if ('Notification' in window && Notification.permission === 'granted') {
        try { new Notification(title, { body, icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAIAAABl4DQWAAAGKUlEQVR42nVWW6hdVxUdc861zm3SNK0JxQipoUbTUmpLoSVgSosPxIKWRlBJLQShiB/2y7aUoqBFKmIUsR+iH0ZL9UOMDzSKokgbTcXEPpI2pdKYaJp3bu69ubk35+615hx+rH2OJ2ncX+csxtxr7Tkec0mtFQBJESEJoP1469/LwUJEJ9cvgSkAgq2gPeP6hsPEM64fwXBJVcOPYUoSgZSSu4uIiNRaU0oRIYCZubuqkoyIlFKtVVV1AkZSVWutZgmAj2AioiKiqqWUnHOD5pxLKWZGoNaac25QM2swd48JWDvQYJDdq4ikHpZISimlfVdEqOpbm9vWGUFAVRkUvRwHEaJKEqCIRoQ0Tibbiv/3iPQdl8sjJylocADaeu3uKaVGi5m15oqgrUe4iKioezWz1sAxJUAPc3cAqupe23rfmdbTtoG7D3IujT3VUrqUcoSTTHlQui6lBLBWH1OiqrWUPBi4O8mUUk9J03tEtEONNndVJcigmXm4QEQTL7yuV6wPYhLWGqWqHq6ik29TXsxPTxeEJDiyEikp8fSPeeIpqgExKepWGIy+asIxilGv20EaB5as7aGqXqumjKUzPPgFrcedoiOqJj83PExtfPDmnrHeuybkpveu68yMYK01Z62QOP5DXTiJC6/lcthpDM85l9KZGYBa6yDnUsukLRihZASZUi6ltLM3BzUBmGmpNLic/h07xbljfvhJNRVFrSWlHpaSdaUk60Ux4VWIiDCoamTfzeaFnq6UOTyN2cPoBlwY6Js/w6Fv0gYCjmERVNVgjA0oIgQUIgp4uKmQ0c4bESoiQLT1pVnMnZSSMN9xcSAHnpTDz2ieCi+Ng9brnirpy/sU60Ojd5CUUnPOHgEgpakS0G5WFhdRVbsisxdkKck/Ho5jz+apZe6lF3jXpZQIenjOuY5ZFZFayjjwei+oUpMvHE+xyHP/QkdUctUmDhnTizi3oH95qJ4/YSlLI38wqKVntcUnSW3u1yZ+1f4zVUMESzN44YmQKRzaiSVgWPHeR7HiVjlzHvMJR/brnm2hBtLU3F2tV6TqOMXIy7mJVMXft8mpN3jiJX3lFxhClr0baz+EG7biAmR+iLJMX9iOUweYsiB6c3HszSCp0sKklhZDEZHMCkUXz+rfvqenTtovP4fZC7IAbvxqxLzcshXrNnF2iCXD6bP28jMQqV6bCgE2vZslkhoRETHIg5Y7qlq6pZwT9u3Em9M4+Cre2Itz4KYnuOFee/HzXs7woz/A1LU4u8ChxMu/lW4x5akRq3D3PBjUUQhqy6MmKZJmGgAPPIsZwXAKc4i7HuYHvySvbseup3X3l7lmA+//EboBFiFH/slTB0PVVCIC0odHe5teMmcBiiZGyNFDGBKnh7xlMzd/Q17/je54EFgtu76PXV/jTffwI49jnpi+IDNHCYiAJEiZGCkXj2NREakRKULmh5xH2NWx5dv6nxflu1ti9e28axtv2CI//aLs2xH3PBarrueMyHBoQK3eMqdN7T7FRiNiNLWDWbWIMV/NaeDmD9vb34nvPMCD5zn1HrqGrsXJkKc+o3WI2+7jOcZgZQVyzj4e7l2X04jV8bRrqeOlSyZ8x02cE67fGK/9lUPyznvl+R3kcux6Gje/P1beyL2/xpoNuEJw7fUGVHc1IxnulpOHi6DFCWTy0iNKAHduhhPTMzh2CHd8Chu3kNfg3wewqLz943L3pzE3h2NHuO42WbMOtWDiAiDo+z9Kgn46ByNSzt4tya3vk7s/gN//HKuuw59/JYPlfnResFJOzotdxT/tRLoqXtqrn3gEqjFxwVKzWj0lI9vUJixZ6UofQ+4DswKRY0f4yY149Ov4409Axo13wDsVcHaW+3fr1sfxyh489i1xV7PaLlKjpOpKSWYqIqJSa005BXsOSoQycN06bP9DPP9cfOyzfnQ6XJGWc9nq2LcfWx6BZDz0ldZZd7eUavQ6qbU2VqWWwosvp/+7f7ljMMDsDOdmYs/uum9PWrkihkNbu17vux9XXomUxStHd4JLy8nUvGRmpdZesO45pdqGeK11xcp0zdtk3bsiZZw+KWuW2wMPwsPDU7iTk6nbciUlK6Wa2X8BjsIPINGLxyMAAAAASUVORK5CYII=' }); } catch(e) {}
      }
    },
    toggleBrowserNotifs() {
      if (!this.browserNotifs) {
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission().then(p => { this.browserNotifs = p === 'granted'; });
        } else if ('Notification' in window && Notification.permission === 'granted') {
          this.browserNotifs = true;
        }
      } else {
        this.browserNotifs = false;
      }
    },

    downloadTemplate(type) {
      const templates = {
        catalog: { filename: this.t('tpl_filename_catalog'), headers: ['sku', 'product-id', 'product-id-type', 'description', 'price', 'quantity', 'state', 'leadtime-to-ship', 'logistic-class', 'discount-price', 'discount-start-date', 'discount-end-date', 'brand', 'product_name', 'category', 'gender', 'color', 'size', 'image_url'], rows: [
          { 'sku': 'MI-TIENDA-001', 'product-id': '8412345678901', 'product-id-type': 'EAN', 'description': 'Zapatillas deportivas clasicas Nike Air Max 90', 'price': '129.99', 'quantity': '50', 'state': '11', 'leadtime-to-ship': '3', 'logistic-class': '', 'discount-price': '', 'discount-start-date': '', 'discount-end-date': '', 'brand': 'Nike', 'product_name': 'Air Max 90', 'category': 'Zapatillas', 'gender': 'Hombre', 'color': 'Negro', 'size': '42', 'image_url': 'https://ejemplo.com/img1.jpg' },
          { 'sku': 'MI-TIENDA-002', 'product-id': '8412345678902', 'product-id-type': 'EAN', 'description': 'Zapatillas de running Adidas Ultraboost 22 con tecnologia Boost', 'price': '179.99', 'quantity': '30', 'state': '11', 'leadtime-to-ship': '3', 'logistic-class': '', 'discount-price': '149.99', 'discount-start-date': '2026-06-01', 'discount-end-date': '2026-06-30', 'brand': 'Adidas', 'product_name': 'Ultraboost 22', 'category': 'Running', 'gender': 'Mujer', 'color': 'Blanco', 'size': '38', 'image_url': 'https://ejemplo.com/img2.jpg' }
        ]},
        prices: { filename: this.t('tpl_filename_prices'), headers: ['offer-sku', 'price', 'discount-price', 'discount-start-date', 'discount-end-date'], rows: [
          { 'offer-sku': 'MI-TIENDA-001', 'price': '129.99', 'discount-price': '99.99', 'discount-start-date': '2026-06-01', 'discount-end-date': '2026-06-30' },
          { 'offer-sku': 'MI-TIENDA-002', 'price': '179.99', 'discount-price': '149.99', 'discount-start-date': '2026-06-01', 'discount-end-date': '2026-06-30' },
          { 'offer-sku': 'MI-TIENDA-003', 'price': '89.99', 'discount-price': '', 'discount-start-date': '', 'discount-end-date': '' }
        ]},
        stock: { filename: this.t('tpl_filename_stock'), headers: ['offer-sku', 'quantity'], rows: [
          { 'offer-sku': 'MI-TIENDA-001', 'quantity': '50' },
          { 'offer-sku': 'MI-TIENDA-002', 'quantity': '120' },
          { 'offer-sku': 'MI-TIENDA-003', 'quantity': '0' }
        ]},
        validation: { filename: this.t('tpl_filename_validation'), headers: ['sku', 'product-id', 'product-id-type', 'price', 'quantity', 'state', 'leadtime-to-ship', 'brand', 'product_name', 'image_url', 'category'], rows: [
          { 'sku': 'MI-TIENDA-001', 'product-id': '8412345678901', 'product-id-type': 'EAN', 'price': '129.99', 'quantity': '50', 'state': '11', 'leadtime-to-ship': '3', 'brand': 'Nike', 'product_name': 'Air Max 90', 'image_url': 'https://ejemplo.com/img1.jpg', 'category': 'Zapatillas' },
          { 'sku': 'MI-TIENDA-002', 'product-id': '8412345678902', 'product-id-type': 'EAN', 'price': '179.99', 'quantity': '30', 'state': '11', 'leadtime-to-ship': '3', 'brand': 'Adidas', 'product_name': 'Ultraboost 22', 'image_url': 'https://ejemplo.com/img2.jpg', 'category': 'Running' }
        ]},
        repricing_products: { filename: this.lang === 'pt' ? 'modelo_repricing_produtos.xlsx' : 'modelo_repricing_productos.xlsx', headers: ['offer-sku', 'price', 'cost'], rows: [
          { 'offer-sku': 'MI-TIENDA-001', 'price': '129.99', 'cost': '65.00' },
          { 'offer-sku': 'MI-TIENDA-002', 'price': '179.99', 'cost': '90.00' },
          { 'offer-sku': 'MI-TIENDA-003', 'price': '89.99', 'cost': '45.00' }
        ]},
        repricing_competitors: { filename: this.lang === 'pt' ? 'modelo_repricing_concorrentes.xlsx' : 'modelo_repricing_competidores.xlsx', headers: ['offer-sku', 'price', 'shipping'], rows: [
          { 'offer-sku': 'MI-TIENDA-001', 'price': '119.99', 'shipping': '4.99' },
          { 'offer-sku': 'MI-TIENDA-002', 'price': '169.99', 'shipping': '0.00' },
          { 'offer-sku': 'MI-TIENDA-003', 'price': '84.99', 'shipping': '3.99' }
        ]}
      };
      const tpl = templates[type];
      if (!tpl) return;
      const ws = XLSX.utils.json_to_sheet(tpl.rows, { header: tpl.headers });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, this.t('tpl_sheet_name'));
      XLSX.writeFile(wb, tpl.filename);
    },

    async saveFileToAccount(tool, filename, count, csvBase64, marketplace) {
      if (!this.authToken || !csvBase64) return;
      try {
        await fetch(N8N_BASE + '/webhook/auth-save-file', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken, email: this.currentUser?.email, userName: this.currentUser?.name, tool, filename, count, csvBase64, marketplace, date: new Date().toISOString() })
        });
      } catch(e) {}
    },

    async loadSavedFiles() {
      if (!this.authToken) return;
      this.savedFilesLoading = true;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-saved-files', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken, email: this.currentUser?.email })
        });
        const data = await resp.json();
        if (data.success && data.files) {
          this.savedFiles = data.files.map(f => {
            const created = new Date(f.date);
            const expires = new Date(created.getTime() + 15 * 24 * 60 * 60 * 1000);
            const daysLeft = Math.max(0, Math.ceil((expires - new Date()) / (1000 * 60 * 60 * 24)));
            let downloadUrl = '#';
            if (f.csvBase64) downloadUrl = this.makeBlobUrl(f.csvBase64);
            return { ...f, daysLeft, downloadUrl, date: created.toLocaleDateString(this.lang === 'pt' ? 'pt-PT' : 'es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) };
          });
        } else { this.savedFiles = []; }
      } catch(e) { this.savedFiles = []; }
      this.savedFilesLoading = false;
    },

    saveToHistory(tool, filename, count, url, marketplace) {
      const entry = { tool, filename: filename || 'archivo.csv', date: new Date().toLocaleDateString(this.lang === 'pt' ? 'pt-PT' : 'es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }), count: count || 0, url: url || '', marketplace: marketplace || '' };
      this.historyJobs.unshift(entry);
      if (this.historyJobs.length > 20) this.historyJobs = this.historyJobs.slice(0, 20);
      safeSaveHistory(this.historyJobs);
    },
    makeBlobUrl(base64) { const raw = atob(base64); const bytes = new Uint8Array(raw.length); for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i); return URL.createObjectURL(new Blob([bytes], { type: 'text/csv;charset=utf-8' })); },

    catalogStep: 'upload', catalogMarketplace: 'sprinter_es', catalogRatio: '2:3', catalogGenDesc: true, catalogGenTitle: true, catalogConvertImages: true,
    catalogFile: null, catalogRows: [], catalogCols: [], catalogTotalProducts: 0, catalogLog: [],
    showCatalogErrors: false, catalogResults: { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '' },
    handleCatalogDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.catalogFile = file; this.loadCatalogExcel(file); } },
    handleCatalogSelect(event) { const file = event.target.files[0]; if (file) { this.catalogFile = file; this.loadCatalogExcel(file); } },
    async loadCatalogExcel(file) { const rows = await this.parseExcel(file); this.catalogRows = rows; this.catalogCols = rows.length > 0 ? Object.keys(rows[0]) : []; },
    async startCatalogProcessing() {
      if (!this.catalogFile || this.catalogRows.length === 0) return;
      if (this.catalogRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.catalogLog, 'catalogLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', this.catalogRows.length)); return; }
      this.requestNotifPermission();
      this.catalogStep = 'processing'; this.catalogLog = []; this.catalogTotalProducts = this.catalogRows.length;
      this.addLog(this.catalogLog, 'catalogLogContainer', 'info', this.catalogRows.length + ' ' + this.t('log_products_read'));
      this.addLog(this.catalogLog, 'catalogLogContainer', 'info', this.t('log_marketplace') + ' ' + this.catalogMarketplace + ' | Ratio: ' + this.catalogRatio);
      this.addLog(this.catalogLog, 'catalogLogContainer', 'info', this.t('log_sending'));
      try {
        const resp = await fetch(N8N_BASE + '/webhook/catalog-process', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.catalogMarketplace, ratio: this.catalogRatio, generateDescriptions: this.catalogGenDesc, generateTitles: this.catalogGenTitle, convertImages: this.catalogConvertImages, products: this.catalogRows }) });
        if (!resp.ok) throw new Error(this.t('log_server_error'));
        const result = await resp.json();
        if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
        this.addLog(this.catalogLog, 'catalogLogContainer', 'info', result.message || this.t('log_completed'));
        if (result.errors > 0) this.addLog(this.catalogLog, 'catalogLogContainer', 'error', result.errors + ' ' + this.t('log_products_with_errors'));
        let excelUrl = '#'; if (result.csvBase64) excelUrl = this.makeBlobUrl(result.csvBase64);
        this.catalogResults = { success: result.success || 0, errors: result.errors || 0, previews: result.products || [], errorList: result.errorList || [], excelUrl, csvFilename: result.csvFilename || 'catalogo.csv' };
        this.saveToHistory('catalog', result.csvFilename, result.success, excelUrl, this.catalogMarketplace);
        this.saveFileToAccount('catalog', result.csvFilename, result.success, result.csvBase64, this.catalogMarketplace);
        this.sendBrowserNotif(this.t('notif_catalog_done'), (result.success || 0) + ' ' + this.t('products_ok'));
        this.createServerNotification(this.t('notif_catalog_done') + ': ' + (result.success || 0) + ' ' + this.t('products_ok'));
        this.catalogStep = 'results';
      } catch (err) { this.addLog(this.catalogLog, 'catalogLogContainer', 'error', 'Error: ' + err.message); }
    },
    resetCatalog() { this.catalogStep = 'upload'; this.catalogFile = null; this.catalogRows = []; this.catalogCols = []; this.catalogTotalProducts = 0; this.catalogLog = []; this.showCatalogErrors = false; this.catalogResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '' }; },

    priceStep: 'upload', priceMarketplace: 'sprinter_es', priceIncludeDiscount: false, pricePromoTag: '',
    priceFile: null, priceRows: [], priceCols: [], priceTotalProducts: 0, priceLog: [],
    showPriceErrors: false, priceResults: { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '' },
    handlePriceDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.priceFile = file; this.loadPriceExcel(file); } },
    handlePriceSelect(event) { const file = event.target.files[0]; if (file) { this.priceFile = file; this.loadPriceExcel(file); } },
    async loadPriceExcel(file) { const rows = await this.parseExcel(file); this.priceRows = rows; this.priceCols = rows.length > 0 ? Object.keys(rows[0]) : []; },
    async startPriceProcessing() {
      if (!this.priceFile || this.priceRows.length === 0) return;
      if (this.priceRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.priceLog, 'priceLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', this.priceRows.length)); return; }
      this.requestNotifPermission();
      this.priceStep = 'processing'; this.priceLog = []; this.priceTotalProducts = this.priceRows.length;
      this.addLog(this.priceLog, 'priceLogContainer', 'info', this.priceRows.length + ' ' + this.t('log_products_read'));
      this.addLog(this.priceLog, 'priceLogContainer', 'info', this.t('log_marketplace') + ' ' + this.priceMarketplace);
      this.addLog(this.priceLog, 'priceLogContainer', 'info', this.t('log_sending'));
      try {
        const resp = await fetch(N8N_BASE + '/webhook/price-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.priceMarketplace, includeDiscount: this.priceIncludeDiscount, promoTag: this.pricePromoTag.trim(), products: this.priceRows }) });
        if (!resp.ok) throw new Error(this.t('log_server_error'));
        const result = await resp.json();
        if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
        this.addLog(this.priceLog, 'priceLogContainer', 'info', result.message || this.t('log_completed'));
        if (result.errors > 0) this.addLog(this.priceLog, 'priceLogContainer', 'error', result.errors + ' ' + this.t('log_products_with_errors'));
        let excelUrl = '#'; if (result.csvBase64) excelUrl = this.makeBlobUrl(result.csvBase64);
        this.priceResults = { success: result.success || 0, errors: result.errors || 0, previews: result.products || [], errorList: result.errorList || [], excelUrl, csvFilename: result.csvFilename || 'precios.csv' };
        this.saveToHistory('prices', result.csvFilename, result.success, excelUrl, this.priceMarketplace);
        this.saveFileToAccount('prices', result.csvFilename, result.success, result.csvBase64, this.priceMarketplace);
        this.sendBrowserNotif(this.t('notif_prices_done'), (result.success || 0) + ' ' + this.t('products_ok'));
        this.createServerNotification(this.t('notif_prices_done') + ': ' + (result.success || 0) + ' ' + this.t('products_ok'));
        this.priceStep = 'results';
      } catch (err) { this.addLog(this.priceLog, 'priceLogContainer', 'error', 'Error: ' + err.message); }
    },
    resetPrices() { this.priceStep = 'upload'; this.priceFile = null; this.priceRows = []; this.priceCols = []; this.priceTotalProducts = 0; this.priceLog = []; this.showPriceErrors = false; this.pricePromoTag = ''; this.priceResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '' }; },

    stockStep: 'upload', stockMarketplace: 'sprinter_es',
    stockFile: null, stockRows: [], stockCols: [], stockTotalProducts: 0, stockLog: [],
    showStockErrors: false, stockResults: { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '' },
    handleStockDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.stockFile = file; this.loadStockExcel(file); } },
    handleStockSelect(event) { const file = event.target.files[0]; if (file) { this.stockFile = file; this.loadStockExcel(file); } },
    async loadStockExcel(file) { const rows = await this.parseExcel(file); this.stockRows = rows; this.stockCols = rows.length > 0 ? Object.keys(rows[0]) : []; },
    async startStockProcessing() {
      if (!this.stockFile || this.stockRows.length === 0) return;
      if (this.stockRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.stockLog, 'stockLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', this.stockRows.length)); return; }
      this.requestNotifPermission();
      this.stockStep = 'processing'; this.stockLog = []; this.stockTotalProducts = this.stockRows.length;
      this.addLog(this.stockLog, 'stockLogContainer', 'info', this.stockRows.length + ' ' + this.t('log_products_read'));
      this.addLog(this.stockLog, 'stockLogContainer', 'info', this.t('log_marketplace') + ' ' + this.stockMarketplace);
      this.addLog(this.stockLog, 'stockLogContainer', 'info', this.t('log_sending'));
      try {
        const resp = await fetch(N8N_BASE + '/webhook/stock-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.stockMarketplace, products: this.stockRows }) });
        if (!resp.ok) throw new Error(this.t('log_server_error'));
        const result = await resp.json();
        if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
        this.addLog(this.stockLog, 'stockLogContainer', 'info', result.message || this.t('log_completed'));
        if (result.errors > 0) this.addLog(this.stockLog, 'stockLogContainer', 'error', result.errors + ' ' + this.t('log_products_with_errors'));
        let excelUrl = '#'; if (result.csvBase64) excelUrl = this.makeBlobUrl(result.csvBase64);
        this.stockResults = { success: result.success || 0, errors: result.errors || 0, previews: result.products || [], errorList: result.errorList || [], excelUrl, csvFilename: result.csvFilename || 'stock.csv' };
        this.saveToHistory('stock', result.csvFilename, result.success, excelUrl, this.stockMarketplace);
        this.saveFileToAccount('stock', result.csvFilename, result.success, result.csvBase64, this.stockMarketplace);
        this.sendBrowserNotif(this.t('notif_stock_done'), (result.success || 0) + ' ' + this.t('products_ok'));
        this.createServerNotification(this.t('notif_stock_done') + ': ' + (result.success || 0) + ' ' + this.t('products_ok'));
        this.stockStep = 'results';
      } catch (err) { this.addLog(this.stockLog, 'stockLogContainer', 'error', 'Error: ' + err.message); }
    },
    resetStock() { this.stockStep = 'upload'; this.stockFile = null; this.stockRows = []; this.stockCols = []; this.stockTotalProducts = 0; this.stockLog = []; this.showStockErrors = false; this.stockResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '' }; },

    validateStep: 'upload', validateMarketplace: 'sprinter_es', validateFile: null, validateRows: [], validateCols: [],
    validateTotalProducts: 0, validateLog: [], showValidateErrors: false, showValidateWarnings: false,
    validateResults: { validCount: 0, totalCount: 0, checks: [], errorList: [], warningList: [] },
    handleValidateDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.validateFile = file; this.loadValidateExcel(file); } },
    handleValidateSelect(event) { const file = event.target.files[0]; if (file) { this.validateFile = file; this.loadValidateExcel(file); } },
    async loadValidateExcel(file) { const rows = await this.parseExcel(file); this.validateRows = rows; this.validateCols = rows.length > 0 ? Object.keys(rows[0]) : []; },
    async startValidation() {
      if (!this.validateFile || this.validateRows.length === 0) return;
      if (this.validateRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.validateLog, 'validateLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', this.validateRows.length)); return; }
      this.requestNotifPermission();
      this.validateStep = 'processing'; this.validateLog = []; this.validateTotalProducts = this.validateRows.length;
      this.addLog(this.validateLog, 'validateLogContainer', 'info', this.validateRows.length + ' ' + this.t('log_products_read'));
      this.addLog(this.validateLog, 'validateLogContainer', 'info', this.t('log_marketplace') + ' ' + this.validateMarketplace);
      this.addLog(this.validateLog, 'validateLogContainer', 'info', this.t('log_sending'));
      try {
        const resp = await fetch(N8N_BASE + '/webhook/catalog-validate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.validateMarketplace, products: this.validateRows }) });
        if (!resp.ok) throw new Error(this.t('log_server_error'));
        const result = await resp.json();
        if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
        this.addLog(this.validateLog, 'validateLogContainer', 'info', result.message || this.t('log_validation_complete'));
        const s = result.summary || {};
        const validCount = s.valid || result.validCount || 0;
        const totalCount = s.total || result.totalCount || this.validateRows.length;
        const checks = s.checks || result.checks || [{ name: 'SKU', passed: 0, failed: 0, warnings: 0 }, { name: 'EAN', passed: 0, failed: 0, warnings: 0 }, { name: 'Imagen', passed: 0, failed: 0, warnings: 0 }, { name: 'Precio', passed: 0, failed: 0, warnings: 0 }, { name: 'Categoria', passed: 0, failed: 0, warnings: 0 }, { name: 'Marca', passed: 0, failed: 0, warnings: 0 }];
        const errorList = result.errors || result.errorList || [];
        const warningList = result.warnings || result.warningList || [];
        if (errorList.length > 0) this.addLog(this.validateLog, 'validateLogContainer', 'error', errorList.length + ' ' + this.t('log_errors_found'));
        if (warningList.length > 0) this.addLog(this.validateLog, 'validateLogContainer', 'warn', warningList.length + ' ' + this.t('log_warnings_found'));
        this.validateResults = { validCount, totalCount, checks, errorList, warningList };
        this.saveToHistory('validation', this.validateFile.name, totalCount, '', this.validateMarketplace);
        this.saveFileToAccount('validation', this.validateFile.name, totalCount, '', this.validateMarketplace);
        this.sendBrowserNotif(this.t('notif_validate_done'), validCount + ' / ' + totalCount + ' ' + this.t('valid_products'));
        this.createServerNotification(this.t('notif_validate_done') + ': ' + validCount + ' / ' + totalCount + ' ' + this.t('valid_products'));
        this.validateStep = 'results';
      } catch (err) { this.addLog(this.validateLog, 'validateLogContainer', 'error', 'Error: ' + err.message); }
    },
    resetValidation() { this.validateStep = 'upload'; this.validateFile = null; this.validateRows = []; this.validateCols = []; this.validateTotalProducts = 0; this.validateLog = []; this.showValidateErrors = false; this.showValidateWarnings = false; this.validateResults = { validCount: 0, totalCount: 0, checks: [], errorList: [], warningList: [] }; },

    repricingStep: 'upload', repricingMarketplace: 'sprinter_es',
    repricingProductFile: null, repricingProductRows: [], repricingProductCols: [],
    repricingCompFile: null, repricingCompRows: [], repricingCompCols: [],
    repricingMarginMin: 15, repricingUndercut: 0.50, repricingMaxDecrease: 10, repricingRoundTo: '.99',
    repricingLog: [], repricingResults: { recommendations: [], summary: {}, csvUrl: '', csvFilename: '' },
    handleRepricingProductDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.repricingProductFile = file; this.loadRepricingProducts(file); } },
    handleRepricingProductSelect(event) { const file = event.target.files[0]; if (file) { this.repricingProductFile = file; this.loadRepricingProducts(file); } },
    async loadRepricingProducts(file) { const rows = await this.parseExcel(file); this.repricingProductRows = rows; this.repricingProductCols = rows.length > 0 ? Object.keys(rows[0]) : []; },
    handleRepricingCompDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.repricingCompFile = file; this.loadRepricingComp(file); } },
    handleRepricingCompSelect(event) { const file = event.target.files[0]; if (file) { this.repricingCompFile = file; this.loadRepricingComp(file); } },
    async loadRepricingComp(file) { const rows = await this.parseExcel(file); this.repricingCompRows = rows; this.repricingCompCols = rows.length > 0 ? Object.keys(rows[0]) : []; },
    calculateRepricing() {
      if (!this.repricingProductFile || this.repricingProductRows.length === 0) return;
      this.repricingStep = 'processing'; this.repricingLog = [];
      this.addLog(this.repricingLog, 'repricingLogContainer', 'info', this.repricingProductRows.length + ' ' + this.t('log_products_read'));
      const getSku = (row) => String(row['offer-sku'] || row['sku'] || row['SKU'] || row['Sku'] || row['shop-sku'] || '').trim();
      const compMap = {};
      for (const c of this.repricingCompRows) {
        const sku = getSku(c);
        if (!sku) continue;
        const price = parseFloat(c.price || c.Price || c.precio || c.Precio || 0);
        const shipping = parseFloat(c.shipping || c.Shipping || c.envio || c.Envio || 0);
        const total = price + shipping;
        if (!compMap[sku] || total < compMap[sku].total) {
          compMap[sku] = { price, shipping, total };
        }
      }
      this.addLog(this.repricingLog, 'repricingLogContainer', 'info', Object.keys(compMap).length + ' SKUs competidores cargados');
      const recommendations = [];
      let lowerCount = 0, keepCount = 0, noCompCount = 0, totalMargin = 0, marginCount = 0;
      for (const p of this.repricingProductRows) {
        const sku = getSku(p);
        if (!sku) continue;
        const myPrice = parseFloat(p.price || p.Price || p.precio || p.Precio || 0);
        const myCost = parseFloat(p.cost || p.Cost || p.coste || p.Coste || p.costo || p.Costo || 0);
        const comp = compMap[sku];
        let recommended = myPrice;
        let action = 'keep';
        let margin = myCost > 0 ? ((myPrice - myCost) / myPrice) * 100 : 0;
        if (!comp) {
          action = 'no_data';
          noCompCount++;
        } else {
          const target = comp.total - this.repricingUndercut;
          const minByMargin = myCost > 0 ? myCost / (1 - this.repricingMarginMin / 100) : 0;
          const maxDecrease = myPrice * (1 - this.repricingMaxDecrease / 100);
          const floor = Math.max(minByMargin, maxDecrease);
          if (myPrice <= comp.total) {
            action = 'keep';
            keepCount++;
          } else if (target >= floor) {
            recommended = target;
            action = 'lower';
            lowerCount++;
          } else if (floor < myPrice) {
            recommended = floor;
            action = 'lower';
            lowerCount++;
          } else {
            action = 'keep';
            keepCount++;
          }
        }
        if (this.repricingRoundTo === '.99') recommended = Math.floor(recommended) + 0.99;
        else if (this.repricingRoundTo === '.95') recommended = Math.floor(recommended) + 0.95;
        else recommended = Math.round(recommended * 100) / 100;
        if (recommended > myPrice) recommended = myPrice;
        const finalMargin = myCost > 0 ? ((recommended - myCost) / recommended) * 100 : 0;
        totalMargin += finalMargin; marginCount++;
        recommendations.push({
          sku, currentPrice: myPrice, cost: myCost,
          competitorPrice: comp ? comp.total : null,
          competitorShipping: comp ? comp.shipping : null,
          recommended: Math.round(recommended * 100) / 100,
          margin: Math.round(finalMargin * 10) / 10,
          action, savings: comp ? Math.round((myPrice - recommended) * 100) / 100 : 0
        });
      }
      const avgMargin = marginCount > 0 ? Math.round(totalMargin / marginCount * 10) / 10 : 0;
      const totalSavings = recommendations.reduce((s, r) => s + (r.savings || 0), 0).toFixed(2);
      this.addLog(this.repricingLog, 'repricingLogContainer', 'info', this.t('log_completed'));
      this.addLog(this.repricingLog, 'repricingLogContainer', 'info', lowerCount + ' ' + this.t('repricing_lower') + ' | ' + keepCount + ' ' + this.t('repricing_keep') + ' | ' + noCompCount + ' ' + this.t('repricing_no_data'));
      const csvRows = [['offer-sku', 'price', 'discount-price', 'discount-start-date', 'discount-end-date']];
      for (const r of recommendations) {
        csvRows.push([r.sku, r.recommended, '', '', '']);
      }
      let csvContent = csvRows.map(row => row.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(';')).join('\n');
      const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const csvUrl = URL.createObjectURL(csvBlob);
      const csvFilename = 'repricing_' + new Date().toISOString().slice(0,10) + '.csv';
      this.repricingResults = {
        recommendations: recommendations.slice(0, 50),
        summary: { total: recommendations.length, lower: lowerCount, keep: keepCount, noComp: noCompCount, avgMargin, totalSavings },
        csvUrl, csvFilename
      };
      this.saveToHistory('repricing', csvFilename, recommendations.length, csvUrl, this.repricingMarketplace);
      this.sendBrowserNotif(this.t('repricing_done'), recommendations.length + ' ' + this.t('repricing_recommendations'));
      this.createServerNotification(this.t('repricing_done') + ': ' + recommendations.length + ' ' + this.t('repricing_recommendations'));
      this.repricingStep = 'results';
    },
    resetRepricing() { this.repricingStep = 'upload'; this.repricingProductFile = null; this.repricingProductRows = []; this.repricingProductCols = []; this.repricingCompFile = null; this.repricingCompRows = []; this.repricingCompCols = []; this.repricingLog = []; this.repricingResults = { recommendations: [], summary: {}, csvUrl: '', csvFilename: '' }; },

    chatOpen: false, chatInput: '', chatMessages: [], chatTyping: false,

    chatInit() {
      this.chatMessages = [{ role: 'bot', text: this.t('chat_welcome') }];
    },

    chatSend() {
      const q = this.chatInput.trim();
      if (!q) return;
      this.chatMessages.push({ role: 'user', text: q });
      this.chatInput = '';
      this.chatTyping = true;
      this.$nextTick(() => { const el = this.$refs.chatBody; if (el) el.scrollTop = el.scrollHeight; });
      setTimeout(() => {
        const answer = this._chatAnswer(q);
        this.chatMessages.push({ role: 'bot', text: answer });
        this.chatTyping = false;
        this.$nextTick(() => { const el = this.$refs.chatBody; if (el) el.scrollTop = el.scrollHeight; });
      }, 400 + Math.random() * 400);
    },

    _chatBlocked(q) {
      const blocked = ['n8n', 'webhook', 'api', 'backend', 'servidor', 'server', 'stack', 'tecnolog', 'infraestructur', 'base de datos', 'database', 'hosting', 'hostinger', 'easypanel', 'cloudflare', 'alpine', 'framework', 'codigo fuente', 'source code', 'como esta hecho', 'como lo habeis hecho', 'como funciona por detras', 'como funciona por detrás', 'que tecnologia', 'que lenguaje', 'supabase', 'docker', 'nginx', 'node', 'react', 'como se hizo', 'arquitectura', 'repositorio', 'github', 'cómo está montado', 'como esta montado', 'qué usáis', 'que usais', 'open source', 'código', 'codigo', 'prompt', 'system prompt', 'instrucciones', 'eres un bot', 'eres ia', 'eres una ia', 'gpt', 'openai', 'anthropic', 'claude', 'modelo de ia', 'llm', 'inteligencia artificial', 'machine learning', 'deep learning'];
      const low = q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      return blocked.some(b => low.includes(b.normalize('NFD').replace(/[̀-ͯ]/g, '')));
    },

    _chatAnswer(q) {
      if (this._chatBlocked(q)) return this.t('chat_blocked');
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
          a: { es: 'Para el Conversor de Catálogo, las columnas principales son:\n\nsku, ean, brand, product_name, model, category, gender, color, size, image_url, price, description\n\nNo todas son obligatorias. Al mínimo necesitas: sku, product_name y price. Descarga la plantilla de ejemplo desde el inicio.',
               pt: 'Para o Conversor de Catálogo, as colunas principais são:\n\nsku, ean, brand, product_name, model, category, gender, color, size, image_url, price, description\n\nNem todas são obrigatórias. No mínimo você precisa de: sku, product_name e price. Baixe o modelo de exemplo na página inicial.' }},
        { k: ['precio', 'precios', 'actualizar precio', 'descuento', 'rebaja', 'oferta', 'promo', 'promocion', 'tag'],
          a: { es: 'La herramienta de Precios necesita estas columnas:\n\nsku, price, discount_price (opcional), currency\n\nSi activas "Incluir precio de descuento", asegúrate de tener la columna discount_price.\n\nEl tag de promoción (ej: wintersales_2025) se añade a la descripción de oferta para que los productos aparezcan en las promociones del marketplace.',
               pt: 'A ferramenta de Preços precisa destas colunas:\n\nsku, price, discount_price (opcional), currency\n\nSe ativar "Incluir preço de desconto", certifique-se de ter a coluna discount_price.\n\nO tag de promoção (ex: wintersales_2025) é adicionado à descrição da oferta para que os produtos apareçam nas promoções do marketplace.' }},
        { k: ['stock', 'inventario', 'cantidad', 'sincronizar stock', 'actualizar stock'],
          a: { es: 'Para Stock solo necesitas dos columnas:\n\nsku, quantity\n\nEl SKU debe coincidir exactamente con el que tienes en el marketplace. La cantidad es el número de unidades disponibles.',
               pt: 'Para Estoque só precisa de duas colunas:\n\nsku, quantity\n\nO SKU deve coincidir exatamente com o que tem no marketplace. A quantidade é o número de unidades disponíveis.' }},
        { k: ['validar', 'validacion', 'comprobar', 'verificar', 'error', 'check'],
          a: { es: 'La Validación Pre-Upload comprueba:\n\n- SKU: que no esté vacío ni duplicado\n- EAN: formato correcto (13 dígitos)\n- Imagen: URL válida y accesible\n- Precio: número válido > 0\n- Categoría: que no esté vacía\n- Marca: que no esté vacía\n\nTe muestra errores y avisos antes de subir al marketplace.',
               pt: 'A Validação Pre-Upload verifica:\n\n- SKU: que não esteja vazio nem duplicado\n- EAN: formato correto (13 dígitos)\n- Imagem: URL válida e acessível\n- Preço: número válido > 0\n- Categoria: que não esteja vazia\n- Marca: que não esteja vazia\n\nMostra erros e avisos antes de subir ao marketplace.' }},
        { k: ['error servidor', 'error del servidor', 'no funciona', 'no carga', 'falla', 'se queda', 'tarda mucho', 'cargando', 'no responde'],
          a: { es: 'Si ves "Error del servidor":\n\n1. Comprueba que tu archivo no supere los 10.000 productos\n2. Verifica que el formato sea .xlsx, .xls o .csv\n3. Asegúrate de que el archivo no esté dañado (ábrelo en Excel para verificar)\n4. Espera unos segundos e inténtalo de nuevo\n\nSi el problema persiste, contacta con soporte desde el menú de usuario.',
               pt: 'Se vir "Erro do servidor":\n\n1. Verifique se seu arquivo não ultrapassa 10.000 produtos\n2. Verifique se o formato é .xlsx, .xls ou .csv\n3. Certifique-se de que o arquivo não está danificado (abra-o no Excel para verificar)\n4. Aguarde alguns segundos e tente novamente\n\nSe o problema persistir, contacte o suporte no menu do usuário.' }},
        { k: ['imagen', 'imágenes', 'imagenes', 'foto', 'cdn', '2:3', 'ratio', 'convertir imagen', 'url imagen'],
          a: { es: 'Las imágenes del catálogo:\n\n- Deben ser URLs públicas accesibles (no Google Drive, Dropbox ni iCloud)\n- Se convierten automáticamente al ratio seleccionado (2:3, 1:1 o 4:3)\n- Se suben a un CDN con URLs públicas para Mirakl\n\nSi la URL de imagen no es válida o no es accesible, el producto se procesará pero sin imagen convertida.',
               pt: 'As imagens do catálogo:\n\n- Devem ser URLs públicas acessíveis (não Google Drive, Dropbox nem iCloud)\n- São convertidas automaticamente para o ratio selecionado (2:3, 1:1 ou 4:3)\n- São enviadas para um CDN com URLs públicas para Mirakl\n\nSe a URL da imagem não for válida ou acessível, o produto será processado mas sem imagem convertida.' }},
        { k: ['plantilla', 'modelo', 'template', 'ejemplo', 'descargar plantilla', 'descargar modelo', 'ejemplo excel'],
          a: { es: 'Puedes descargar plantillas de ejemplo desde la página de inicio, en la sección "Plantillas de ejemplo":\n\n- Conversor: con todas las columnas del catálogo\n- Precios: SKU, precio, descuento y moneda\n- Stock: SKU y cantidad\n- Validación: campos principales para verificar\n\nCada plantilla incluye 2-3 filas de ejemplo para que veas el formato correcto.',
               pt: 'Pode baixar modelos de exemplo na página inicial, na seção "Modelos de exemplo":\n\n- Conversor: com todas as colunas do catálogo\n- Preços: SKU, preço, desconto e moeda\n- Estoque: SKU e quantidade\n- Validação: campos principais para verificar\n\nCada modelo inclui 2-3 linhas de exemplo para ver o formato correto.' }},
        { k: ['marketplace', 'sprinter', 'mirakl', 'destino', 'que marketplace'],
          a: { es: 'Actualmente puedes seleccionar el marketplace de destino antes de procesar. El sistema genera el CSV en el formato específico que cada marketplace necesita para importar por Mirakl.\n\nAsegúrate de seleccionar el marketplace correcto antes de procesar para que el formato de salida sea compatible.',
               pt: 'Atualmente pode selecionar o marketplace de destino antes de processar. O sistema gera o CSV no formato específico que cada marketplace precisa para importar pelo Mirakl.\n\nCertifique-se de selecionar o marketplace correto antes de processar para que o formato de saída seja compatível.' }},
        { k: ['descargar', 'csv', 'resultado', 'donde', 'archivo generado', 'mis archivos', 'descarga'],
          a: { es: 'Después de procesar, puedes descargar el CSV desde:\n\n1. El botón "Descargar CSV" en la pantalla de resultados\n2. La sección "Mis archivos" en el menú de usuario (se guardan 15 días)\n3. El historial de la barra superior\n\nLos archivos se guardan automáticamente en tu cuenta durante 15 días.',
               pt: 'Depois de processar, pode baixar o CSV de:\n\n1. O botão "Baixar CSV" na tela de resultados\n2. A seção "Meus arquivos" no menu do usuário (guardados por 15 dias)\n3. O histórico na barra superior\n\nOs arquivos são salvos automaticamente na sua conta por 15 dias.' }},
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
        { k: ['titulo', 'generar titulo', 'formatear titulo', 'title'],
          a: { es: 'La opción "Formatear títulos" genera un título estandarizado con el formato:\n\nCategoría + Marca + Color (+ Talla si aplica)\n\nEjemplo: "Zapatillas Nike Negro 42"\n\nPuedes desactivar esta opción si prefieres mantener tus títulos originales.',
               pt: 'A opção "Formatar títulos" gera um título padronizado com o formato:\n\nCategoria + Marca + Cor (+ Tamanho se aplicável)\n\nExemplo: "Tênis Nike Preto 42"\n\nPode desativar esta opção se preferir manter seus títulos originais.' }},
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
          a: { es: 'Katalync tiene dos planes de suscripción:\n\n- Vendedor: 39€/mes — acceso completo a todas las herramientas (Conversor, Precios, Stock, Validación y Repricing)\n- Marketplace Partner: 99€/mes — todo lo anterior + dashboard de gestión de vendedores\n\nLa suscripción se activa tras el pago con tarjeta. Se renueva automáticamente cada mes y puedes cancelar en cualquier momento.',
               pt: 'O Katalync tem dois planos de assinatura:\n\n- Vendedor: 39€/mês — acesso completo a todas as ferramentas (Conversor, Preços, Estoque, Validação e Repricing)\n- Marketplace Partner: 99€/mês — tudo acima + dashboard de gestão de vendedores\n\nA assinatura é ativada após o pagamento com cartão. Renova automaticamente a cada mês e pode cancelar a qualquer momento.' }},
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
        { k: ['que es katalync', 'para que sirve', 'que hace', 'como funciona', 'explicar'],
          a: { es: 'Katalync es una plataforma SaaS para automatizar la preparación de catálogos para marketplace. Incluye 5 herramientas:\n\n1. Conversor de Catálogo — formatea títulos, descripciones, convierte imágenes a 2:3 y genera CSV Mirakl-ready\n2. Actualización de Precios — genera CSV de precios y descuentos listo para importar\n3. Sincronización de Stock — actualiza cantidades desde tu Excel\n4. Validación Pre-Upload — verifica EAN, SKU, imágenes y campos antes de subir\n5. Repricing — ajusta precios vs competencia con estrategia personalizada\n\nTodo desde una sola plataforma, sin necesidad de otros programas.',
               pt: 'O Katalync é uma plataforma SaaS para automatizar a preparação de catálogos para marketplace. Inclui 5 ferramentas:\n\n1. Conversor de Catálogo — formata títulos, descrições, converte imagens para 2:3 e gera CSV Mirakl-ready\n2. Atualização de Preços — gera CSV de preços e descontos pronto para importar\n3. Sincronização de Estoque — atualiza quantidades do seu Excel\n4. Validação Pre-Upload — verifica EAN, SKU, imagens e campos antes de subir\n5. Repricing — ajusta preços vs concorrência com estratégia personalizada\n\nTudo numa só plataforma, sem necessidade de outros programas.' }}
      ];
    },
  };
}
  