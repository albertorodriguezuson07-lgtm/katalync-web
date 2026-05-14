  window.__CT_API_BASE = 'https://api.katalync.com';
const N8N_WEBHOOK_BASE = (window.__CT_API_BASE || '');

const SPRINTER_PRODUCTS_HEADERS = [
  ['Categorías','Sku de vendedor','Nombre del articulo','PT - Nombre Del Articulo','Subtitulo de Productos','GPSR - Pais Fabricacion','Marcas','Genero','EAN','Descripcion del producto','Cuidados','Imagen  1','Imagenes 2','Imagenes 3','Imagenes 4','Video','Guia de Tallas','PT - Cuidados','PT - Descripción Del Producto','GPSR - PT - País Fabricación','PT - Subtitulo de productos','GPSR - Nombre Del Fabricante','GPSR - Nombre Comercial Registrado Del Fabricante','GPSR - Dirección Del Fabricante','GPSR - Correo Electrónico Del Fabricante','GPSR - Nombre de la Persona Responsable en la EU','GPSR - Dirección de la Persona Responsable','GPSR - Correo Electrónico De La Persona Responsable','GPSR - Foto De La Etiqueta Del Producto','GPSR - Avisos y/o Manual de Seguridad Del Producto','Colores','Talla','Colecciones','Material Composicion','Variant Group Code','Consejos de Utilizacion','Impermeable','Informacion Tecnica','PT - Consejos de uso','PT - Información Tecnica','PT - Composición Del Material','PT - Colecciones'],
  ['categorias','sku-de-vendedor','nombre-del-articulo','nombre-del-articulo-pt','subtitulo-de-productos','pais-fabricante','marcas','genero','ean','descripion-del-producto','cuidados','imagenes-1','imagenes-2','imagenes-3','imagenes-4','video','guia-de-tallas','cuidados-pt','descripion-del-producto-pt','pais-fabricante-pt','subtitulo-de-productos-pt','nombre-del-fabricante','nombre-comercial-registrado-del-fabricante','direccion-del-fabricante','correo-electronico-del-fabricante','nombre-persona-responsable-en-eu','direccion-de-la-persona-responsable','correo-electronico-de-la-persona-responsable','foto-etiqueta-del-producto','manual-de-seguridad-del-producto','colores','talla','colecciones','material-composicion','variant_group_code','consejos-de-utilizacion','impermeable','informacion-tecnica','consejos-de-utilizacion-pt','informacion-tecnica-pt','material-composicion-pt','colecciones-pt']
];
const SPRINTER_OFFERS_HEADERS = [
  ['SKU de oferta','ID de producto','Tipo de ID de producto','Descripción de la oferta','Descripción interna de la oferta','Precio de la oferta','Información adicional sobre el precio de la oferta','Cantidad de la oferta','Alerta de cantidad mínima','Estado de la oferta','Fecha de inicio de la disponibilidad','Fecha de finalización de la disponibilidad','Clase logística','Rango de favorita','Precio de descuento','Fecha de inicio del descuento','Fecha de finalización del descuento','Rangos de descuento','Plazo de envío (en días)','Actualizar/Eliminar','Precio de oferta por canal INIT','Precio de descuento por canal INIT','Fecha de inicio del descuento para el canal INIT','Fecha de fin del descuento para el canal INIT','Rangos de descuentos para el canal INIT','Shipment Origin','% of VAT'],
  ['sku','product-id','product-id-type','description','internal-description','price','price-additional-info','quantity','min-quantity-alert','state','available-start-date','available-end-date','logistic-class','favorite-rank','discount-price','discount-start-date','discount-end-date','discount-ranges','leadtime-to-ship','update-delete','price[channel=INIT]','discount-price[channel=INIT]','discount-start-date[channel=INIT]','discount-end-date[channel=INIT]','discount-ranges[channel=INIT]','shipment-origin','vat-percentage']
];
const SPRINTER_INPUT_MAP = {
  'sku': 'sku-de-vendedor', 'SKU': 'sku-de-vendedor', 'Sku': 'sku-de-vendedor', 'referencia': 'sku-de-vendedor', 'Referencia': 'sku-de-vendedor',
  'ean': 'ean', 'EAN': 'ean', 'ean13': 'ean', 'product-id': 'ean', 'product_id': 'ean', 'codigo_barras': 'ean',
  'marca': 'marcas', 'Marca': 'marcas', 'brand': 'marcas', 'Brand': 'marcas',
  'nombre': 'nombre-del-articulo', 'Nombre': 'nombre-del-articulo', 'product_name': 'nombre-del-articulo', 'name': 'nombre-del-articulo',
  'modelo': '_model', 'Modelo': '_model', 'model': '_model', 'Model': '_model',
  'categoria': 'categorias', 'Categoria': 'categorias', 'category': 'categorias', 'Category': 'categorias', 'Tipo de producto': 'categorias',
  'genero': 'genero', 'Genero': 'genero', 'gender': 'genero', 'Gender': 'genero', 'Sexo': 'genero',
  'color': 'colores', 'Color': 'colores',
  'talla': 'talla', 'Talla': 'talla', 'size': 'talla', 'Size': 'talla',
  'material': 'material-composicion', 'Material': 'material-composicion', 'composicion': 'material-composicion',
  'imagen': 'imagenes-1', 'Imagen': 'imagenes-1', 'image_url': 'imagenes-1', 'imageUrl': 'imagenes-1', 'foto': 'imagenes-1', 'URL Imagen': 'imagenes-1',
  'imagen_2': 'imagenes-2', 'image_url_2': 'imagenes-2', 'imagen_3': 'imagenes-3', 'image_url_3': 'imagenes-3',
  'precio': 'price', 'Precio': 'price', 'price': 'price', 'Price': 'price', 'PVP': 'price',
  'stock': 'quantity', 'Stock': 'quantity', 'quantity': 'quantity', 'Quantity': 'quantity', 'cantidad': 'quantity',
  'descripcion': 'descripion-del-producto', 'Descripcion': 'descripion-del-producto', 'description': 'descripion-del-producto',
  'variant_group_code': 'variant_group_code', 'grupo_variantes': 'variant_group_code',
  'pais_fabricacion': 'pais-fabricante', 'pais fabricacion': 'pais-fabricante',
  'fabricante_nombre': 'nombre-del-fabricante', 'fabricante_nombre_comercial': 'nombre-comercial-registrado-del-fabricante',
  'fabricante_direccion': 'direccion-del-fabricante', 'fabricante_email': 'correo-electronico-del-fabricante',
  'responsable_ue_nombre': 'nombre-persona-responsable-en-eu', 'responsable_ue_direccion': 'direccion-de-la-persona-responsable',
  'responsable_ue_email': 'correo-electronico-de-la-persona-responsable',
  'coleccion': 'colecciones', 'Coleccion': 'colecciones', 'collection': 'colecciones',
  'cuidados': 'cuidados', 'Cuidados': 'cuidados', 'care': 'cuidados',
  'offer-sku': '_offer-sku', 'offer_sku': '_offer-sku',
  'discount-price': 'discount-price', 'discount_price': 'discount-price', 'precio_descuento': 'discount-price',
  'discount-start-date': 'discount-start-date', 'discount-end-date': 'discount-end-date',
  'categorias': 'categorias', 'sku-de-vendedor': 'sku-de-vendedor',
  'nombre-del-articulo': 'nombre-del-articulo', 'nombre-del-articulo-pt': 'nombre-del-articulo-pt',
  'subtitulo-de-productos': 'subtitulo-de-productos', 'subtitulo-de-productos-pt': 'subtitulo-de-productos-pt',
  'pais-fabricante': 'pais-fabricante', 'pais-fabricante-pt': 'pais-fabricante-pt',
  'marcas': 'marcas', 'descripion-del-producto': 'descripion-del-producto',
  'imagenes-1': 'imagenes-1', 'imagenes-2': 'imagenes-2', 'imagenes-3': 'imagenes-3', 'imagenes-4': 'imagenes-4',
  'colores': 'colores', 'tipos-de-deportes': 'tipos-de-deportes',
  'nombre-del-fabricante': 'nombre-del-fabricante',
  'nombre-comercial-registrado-del-fabricante': 'nombre-comercial-registrado-del-fabricante',
  'direccion-del-fabricante': 'direccion-del-fabricante',
  'correo-electronico-del-fabricante': 'correo-electronico-del-fabricante',
  'cuidados': 'cuidados', 'cuidados-pt': 'cuidados-pt',
  'descripion-del-producto-pt': 'descripion-del-producto-pt',
  'nombre-persona-responsable-en-eu': 'nombre-persona-responsable-en-eu',
  'direccion-de-la-persona-responsable': 'direccion-de-la-persona-responsable',
  'correo-electronico-de-la-persona-responsable': 'correo-electronico-de-la-persona-responsable',
  'foto-etiqueta-del-producto': 'foto-etiqueta-del-producto',
  'manual-de-seguridad-del-producto': 'manual-de-seguridad-del-producto',
  'colecciones': 'colecciones', 'colecciones-pt': 'colecciones-pt',
  'consejos-de-utilizacion': 'consejos-de-utilizacion', 'consejos-de-utilizacion-pt': 'consejos-de-utilizacion-pt',
  'impermeable': 'impermeable', 'informacion-tecnica': 'informacion-tecnica',
  'informacion-tecnica-pt': 'informacion-tecnica-pt', 'material-composicion-pt': 'material-composicion-pt',
  'video': 'video', 'guia-de-tallas': 'guia-de-tallas',
  'material-composicion': 'material-composicion', 'talla': 'talla', 'genero': 'genero', 'ean': 'ean',
  'variant_group_code': 'variant_group_code',
  'Categorías': 'categorias', 'Sku de vendedor': 'sku-de-vendedor', 'Nombre del articulo': 'nombre-del-articulo',
  'PT - Nombre Del Articulo': 'nombre-del-articulo-pt', 'Subtitulo de Productos': 'subtitulo-de-productos',
  'GPSR - Pais Fabricacion': 'pais-fabricante', 'Marcas': 'marcas', 'Genero': 'genero',
  'Descripcion del producto': 'descripion-del-producto', 'Imagen  1': 'imagenes-1', 'Imagen 1': 'imagenes-1',
  'Imagenes 2': 'imagenes-2', 'Imagenes 3': 'imagenes-3', 'Imagenes 4': 'imagenes-4',
  'Video': 'video', 'Guia de Tallas': 'guia-de-tallas', 'PT - Cuidados': 'cuidados-pt',
  'PT - Descripción Del Producto': 'descripion-del-producto-pt',
  'GPSR - PT - País Fabricación': 'pais-fabricante-pt', 'PT - Subtitulo de productos': 'subtitulo-de-productos-pt',
  'GPSR - Nombre Del Fabricante': 'nombre-del-fabricante',
  'GPSR - Nombre Comercial Registrado Del Fabricante': 'nombre-comercial-registrado-del-fabricante',
  'GPSR - Dirección Del Fabricante': 'direccion-del-fabricante',
  'GPSR - Correo Electrónico Del Fabricante': 'correo-electronico-del-fabricante',
  'GPSR - Nombre de la Persona Responsable en la EU': 'nombre-persona-responsable-en-eu',
  'GPSR - Dirección de la Persona Responsable': 'direccion-de-la-persona-responsable',
  'GPSR - Correo Electrónico De La Persona Responsable': 'correo-electronico-de-la-persona-responsable',
  'GPSR - Foto De La Etiqueta Del Producto': 'foto-etiqueta-del-producto',
  'GPSR - Avisos y/o Manual de Seguridad Del Producto': 'manual-de-seguridad-del-producto',
  'Colores': 'colores', 'Talla': 'talla', 'Colecciones': 'colecciones',
  'Material Composicion': 'material-composicion', 'Variant Group Code': 'variant_group_code',
  'Consejos de Utilizacion': 'consejos-de-utilizacion', 'Impermeable': 'impermeable',
  'Informacion Tecnica': 'informacion-tecnica', 'PT - Consejos de uso': 'consejos-de-utilizacion-pt',
  'PT - Información Tecnica': 'informacion-tecnica-pt', 'PT - Composición Del Material': 'material-composicion-pt',
  'PT - Colecciones': 'colecciones-pt'
};

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
    language: 'Idioma', onb_ready_title: '¡Todo listo!', onb_ready_sub: 'Tu tienda está conectada y tus productos sincronizados',
    onb_start: 'Empezar a trabajar', company: 'Empresa',
    onb_connect_title: 'Conecta tu tienda', onb_connect_sub: 'Vincula tu e-commerce para sincronizar productos automáticamente',
    onb_source: 'Plataforma', onb_store_url: 'URL de tu tienda', onb_store_url_hint: 'Ej: mi-tienda.myshopify.com',
    onb_api_key: 'API Key / Access Token', onb_api_secret: 'API Secret', onb_vendor_name: 'Nombre del vendor',
    onb_vendor_name_hint: 'Ej: Mi Marca',
    onb_test_connection: 'Probar conexión', onb_testing: 'Probando...',
    onb_test_ok: 'Conexión exitosa', onb_test_fail: 'No se pudo conectar. Verifica las credenciales.',
    onb_skip_connect: 'Configurar después',
    onb_sync_title: 'Primera sincronización', onb_sync_sub: 'Importando tus productos — esto puede tardar unos segundos',
    onb_syncing: 'Sincronizando productos...', onb_sync_done: 'Sincronización completada',
    onb_sync_products: 'productos importados', onb_sync_converting: 'Convirtiendo a formato marketplace...',
    onb_sync_converted: 'Productos convertidos y listos',
    onb_sync_error: 'Error en la sincronización. Podrás reintentar desde el panel.',
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
    gen_title: 'Formatear títulos', gen_title_hint: 'Genera título estandarizado: Categoría Marca Modelo',
    gen_desc: 'Generar descripciones', gen_desc_hint: 'Genera descripción con marca, modelo, categoría, material...',
    convert_images: 'Convertir imágenes a CDN', convert_images_hint: 'Convierte a 2:3, sube a CDN y genera URLs públicas para Mirakl',
    remove_bg: 'Eliminar fondo', remove_bg_hint: 'Elimina el fondo de la imagen con IA y lo convierte en blanco',
    customize_label: 'Personalizar salida',
    excel_file: 'Archivo Excel', drop_excel: 'Arrastra tu Excel o haz clic', remove: 'Quitar',
    products_detected: 'productos detectados', columns: 'Columnas', process: 'Procesar',
    processing_catalog: 'Procesando catálogo', waiting: 'Esperando...',
    catalog_done: 'Catálogo procesado', products_ok: 'productos OK', errors: 'errores',
    preview: 'Vista previa', title: 'Título', download_csv: 'Descargar CSV Mirakl-ready',
    download_products_xlsx: 'Descargar Productos Sprinter', download_offers_xlsx: 'Descargar Ofertas Sprinter',
    shipment_origin: 'Origen de envío', shipment_origin_hint: 'País desde el que se envían los productos',
    vat_pct: 'IVA', offer_state: 'Estado de oferta',
    gpsr_hint: 'Incluye las columnas GPSR del fabricante en tu Excel (obligatorias)',
    variant_group_hint: 'Agrupa variantes de talla/color con el mismo código',
    sprinter_output_info: 'Se generarán 2 archivos XLSX listos para importar en Mirakl',
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
    tpl_smart_title: 'Plantilla inteligente por categoría', tpl_smart_desc: 'Selecciona tu categoría para una plantilla con ejemplos reales y validaciones',
    tpl_cat_calzado: 'Calzado', tpl_cat_ropa: 'Ropa', tpl_cat_accesorios: 'Accesorios', tpl_cat_equipamiento: 'Equipamiento',
    tpl_sheet_instructions: 'Instrucciones', tpl_download_smart: 'Descargar plantilla inteligente',
    hr_title: 'Salud del catálogo', hr_score_label: 'Puntuación', hr_of: 'de', hr_show_detail: 'Ver informe completo', hr_hide_detail: 'Ocultar informe', hr_download: 'Descargar informe', hr_checks_title: 'Checklist de campos obligatorios', hr_recs_title: 'Recomendaciones', hr_field: 'Campo', hr_completeness: 'Completitud', hr_detail: 'Detalle', hr_products_ok: 'Productos OK', hr_products_error: 'Con errores', hr_with_img2: 'Con imagen 2', hr_with_img3: 'Con imagen 3', hr_missing: 'No encontrado',
    browser_notifs: 'Notificaciones del navegador', notif_enabled: 'Activadas', notif_disabled: 'Desactivadas',
    notif_catalog_done: 'Catálogo procesado', notif_prices_done: 'Precios generados',
    notif_stock_done: 'Stock actualizado', notif_validate_done: 'Validación completada',
    my_files: 'Mis archivos', saved_files: 'Archivos guardados', expires_in: 'Expira en', days: 'días',
    no_saved_files: 'No tienes archivos guardados', no_saved_files_hint: 'Los archivos generados se guardan aquí durante 15 días',
    tag_stock_upper: 'STOCK',
    tag_images_upper: 'IMÁGENES',
    login_invite_only: 'Acceso solo por invitación. Contacta con el administrador.', have_account: '¿Ya tienes cuenta?', login_link: 'Inicia sesión',
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
    admin_dashboard_sub_mp: 'Actividad de tu marketplace',
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
    chat_placeholder: 'Escribe tu pregunta...', chat_thinking: 'Ana está pensando...',
    chat_welcome: '¡Hola! Soy Ana, tu asistente de Katalync. Puedo ayudarte con:\n\n- Cómo subir y procesar archivos\n- Formatos y columnas requeridas\n- Suscripción, pagos y facturación\n- Errores comunes y soluciones\n- Repricing y estrategias de precio\n\n¿En qué puedo ayudarte?',
    chat_no_match: 'No he encontrado una respuesta específica. Puedes contactar con soporte desde el menú de usuario para asistencia personalizada.',
    chat_blocked: 'Solo puedo responder preguntas sobre el uso de Katalync.',
    register_disabled: 'Registro desactivado. Contacta con el administrador.',
    verify_title: 'Verifica tu email', verify_sub: 'Introduce el código de 6 dígitos enviado a tu correo',
    verify_code_placeholder: 'Código de 6 dígitos', verify_btn: 'Verificar', verifying: 'Verificando...',
    verify_resend: '¿No recibiste el código?', verify_resend_link: 'Reenviar', verify_back: 'Volver al registro',
    verify_code_sent: 'Código de verificación enviado a tu email', verify_error: 'Código incorrecto o expirado',
    empty_credentials: 'Introduce email y contraseña',
    rate_limit: 'Demasiados intentos. Espera 1 minuto.',
    max_products_error: 'Máximo {max} productos por lote. Tu archivo tiene {count}',
    log_validation_complete: 'Validación completada',
    log_warnings_found: 'avisos',
    sub_pending_title: 'Activa tu suscripción',
    sub_pending_sub: 'Para acceder a las herramientas de Katalync necesitas activar tu plan.',
    sub_pending_plan_vendor: 'Plan Katalync',
    sub_pending_plan_admin: 'Plan Katalync Partner',
    sub_pending_price_vendor: '39€/mes',
    sub_pending_price_admin: '499€/mes',
    sub_pending_features: 'Incluye todas las herramientas: Conversor dual XLSX, Precios, Stock, Validación GPSR, Repricing, Chatbot IA, Informe de Salud y Plantillas inteligentes',
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
    billing_portal_error: 'No se pudo abrir el portal de facturación',
    payment_confirmed: 'Pago confirmado. Tu suscripción está activa.',
    nav_sync: 'Sync',
    sync_title: 'Centro de Sincronización',
    sync_sub: 'Gestiona la conexión automática entre tus vendedores, Katalync y Sprinter.',
    sync_vendors: 'Vendedores conectados',
    sync_products: 'Productos sincronizados',
    sync_last: 'Última sincronización',
    sync_success_rate: 'Tasa de éxito',
    sync_vendor_name: 'Vendedor',
    sync_source: 'Fuente',
    sync_product_count: 'Productos',
    sync_last_sync: 'Última sync',
    sync_status: 'Estado',
    sync_actions: 'Acciones',
    sync_now: 'Sync ahora',
    sync_active: 'Activo',
    sync_error: 'Error',
    sync_paused: 'Pausado',
    sync_timeline_title: 'Historial de sincronizaciones',
    sync_direction_in: 'CRM → Katalync',
    sync_direction_out: 'Katalync → Sprinter',
    sync_total: 'Total',
    sync_created: 'Creados',
    sync_updated: 'Actualizados',
    sync_errors: 'Errores',
    sync_upload_title: 'Subir catálogo a Sprinter',
    sync_upload_btn: 'Subir a Sprinter',
    sync_upload_desc: 'Sube los productos convertidos directamente a Mirakl/Sprinter via API.',
    sync_uploading: 'Subiendo a Sprinter...',
    sync_upload_done: 'Subida completada',
    sync_upload_result: 'productos subidos',
    sync_no_products: 'Primero procesa un catálogo para tener productos que subir',
    sync_upload_errors: 'errores',
    sync_upload_warnings: 'advertencias',
    sync_simulating: 'Sincronizando...',
    sync_configure: 'Configurar conexión',
    sync_interval: 'Intervalo de sync',
    sync_hours: 'horas',
    sync_ago: 'hace',
    sync_minutes: 'min',
    sync_demo_badge: 'DEMO',
    sync_connect_crm: 'Conectar CRM',
    sync_connect_crm_desc: 'Conecta el ERP/CRM de tu vendedor para sincronización automática.',
    vendor_add: 'Añadir vendedor',
    vendor_edit: 'Editar vendedor',
    vendor_name_label: 'Nombre del vendedor',
    vendor_company_label: 'Empresa',
    vendor_source_label: 'Fuente de datos',
    vendor_url_label: 'URL de la tienda',
    vendor_api_key_label: 'API Key',
    vendor_api_secret_label: 'API Secret',
    vendor_client_id_label: 'Client ID',
    vendor_client_secret_label: 'Client Secret',
    vendor_marketplace_key_label: 'Mirakl API Key',
    vendor_marketplace_url_label: 'URL Marketplace',
    vendor_interval_label: 'Intervalo de sync (horas)',
    vendor_test_connection: 'Probar conexión',
    vendor_testing: 'Probando...',
    vendor_connection_ok: 'Conexión exitosa',
    vendor_connection_failed: 'Conexión fallida',
    vendor_save: 'Guardar vendedor',
    vendor_saving: 'Guardando...',
    vendor_created: 'Vendedor creado correctamente',
    vendor_updated: 'Vendedor actualizado',
    vendor_deleted: 'Vendedor eliminado',
    vendor_delete_confirm: '¿Eliminar vendedor {name}? Se borrarán todos sus productos.',
    vendor_name_required: 'El nombre del vendedor es obligatorio',
    vendor_no_vendors: 'No hay vendedores conectados aún',
    vendor_no_vendors_hint: 'Conecta tu primera tienda para empezar a sincronizar productos automáticamente.',
    shopify_oauth_missing: 'Introduce la URL de la tienda, Client ID y Client Secret antes de conectar',
    shopify_oauth_connect: 'Conectar con Shopify',
    shopify_oauth_connected: 'Conectado',
    shopify_oauth_hint: 'Guarda el vendedor primero, luego haz clic en "Conectar con Shopify" para autorizar el acceso.',
    sync_source_unsupported: 'Tipo de fuente no soportado para sync automático',
    sync_mirakl_not_configured: 'Mirakl API no configurada. Contacta con tu administrador.',
    sync_converting: 'Convirtiendo para marketplace...',
    sync_converted: 'productos convertidos',
    sync_convert_error: 'Error en conversión',
    sync_convert_btn: 'Convertir',
    sync_view_products: 'Ver productos',
    sync_hide_products: 'Ocultar',
    sync_products_loading: 'Cargando productos...',
    sync_products_none: 'No hay productos aún',
    sync_original: 'Original',
    sync_sprinter: 'Sprinter',
    sync_all_converted: 'Todos los productos ya están convertidos',
    vendor_marketplaces_label: 'Mercados de destino',
    vendor_marketplace_es: 'Sprinter (España)',
    vendor_marketplace_pt: 'Sport Zone (Portugal)',
    sync_logs_title: 'Historial de sincronizaciones',
    sync_no_logs: 'Sin sincronizaciones recientes',
    comp_title: 'Estudio de Competidores',
    comp_sub: 'Análisis del marketplace de Sprinter con datos reales.',
    comp_desc: 'Analiza sellers, categorías, precios y productos del marketplace en tiempo real.',
    comp_overview: 'Resumen del Marketplace',
    comp_sellers: 'Sellers Activos',
    comp_categories: 'Categorías',
    comp_products: 'Productos',
    comp_avg_price: 'Precio Medio',
    comp_price_range: 'Rango',
    comp_top_sellers: 'Top Sellers',
    comp_top_categories: 'Top Categorías',
    comp_product_list: 'Productos Destacados',
    comp_seller: 'Seller',
    comp_brand: 'Marca',
    comp_price: 'Precio',
    comp_original: 'Antes',
    comp_discount: 'Dto.',
    comp_category: 'Categoría',
    comp_search: 'Buscar producto, marca o seller...',
    comp_filter_seller: 'Filtrar por seller',
    comp_filter_cat: 'Filtrar por categoría',
    comp_all: 'Todos',
    comp_data_date: 'Datos actualizados',
    comp_source: 'Fuente: sprintersports.com',
    comp_opportunity: 'Oportunidades',
    comp_opp_desc: 'Categorías con poca competencia donde puedes posicionarte',
    comp_few_sellers: 'pocos sellers',
    comp_no_data: 'Sin datos disponibles',
    comp_market_share: 'Cuota de mercado',
    comp_demo_badge: 'LIVE DATA'
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
    language: 'Idioma', onb_ready_title: 'Tudo pronto!', onb_ready_sub: 'Sua loja está conectada e seus produtos sincronizados',
    onb_start: 'Começar a trabalhar', company: 'Empresa',
    onb_connect_title: 'Conecte sua loja', onb_connect_sub: 'Vincule seu e-commerce para sincronizar produtos automaticamente',
    onb_source: 'Plataforma', onb_store_url: 'URL da sua loja', onb_store_url_hint: 'Ex: minha-loja.myshopify.com',
    onb_api_key: 'API Key / Access Token', onb_api_secret: 'API Secret', onb_vendor_name: 'Nome do vendor',
    onb_vendor_name_hint: 'Ex: Minha Marca',
    onb_test_connection: 'Testar conexão', onb_testing: 'Testando...',
    onb_test_ok: 'Conexão bem-sucedida', onb_test_fail: 'Não foi possível conectar. Verifique as credenciais.',
    onb_skip_connect: 'Configurar depois',
    onb_sync_title: 'Primeira sincronização', onb_sync_sub: 'Importando seus produtos — pode levar alguns segundos',
    onb_syncing: 'Sincronizando produtos...', onb_sync_done: 'Sincronização concluída',
    onb_sync_products: 'produtos importados', onb_sync_converting: 'Convertendo para formato marketplace...',
    onb_sync_converted: 'Produtos convertidos e prontos',
    onb_sync_error: 'Erro na sincronização. Poderá tentar novamente no painel.',
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
    gen_title: 'Formatar títulos', gen_title_hint: 'Gera título padronizado: Categoria Marca Modelo',
    gen_desc: 'Gerar descrições', gen_desc_hint: 'Gera descrição com marca, modelo, categoria, material...',
    convert_images: 'Converter imagens para CDN', convert_images_hint: 'Converte para 2:3, envia ao CDN e gera URLs públicas para Mirakl',
    remove_bg: 'Remover fundo', remove_bg_hint: 'Remove o fundo da imagem com IA e converte em branco',
    customize_label: 'Personalizar saída',
    excel_file: 'Arquivo Excel', drop_excel: 'Arraste seu Excel ou clique', remove: 'Remover',
    products_detected: 'produtos detectados', columns: 'Colunas', process: 'Processar',
    processing_catalog: 'Processando catálogo', waiting: 'Aguardando...',
    catalog_done: 'Catálogo processado', products_ok: 'produtos OK', errors: 'erros',
    preview: 'Pré-visualização', title: 'Título', download_csv: 'Baixar CSV Mirakl-ready',
    download_products_xlsx: 'Baixar Produtos Sprinter', download_offers_xlsx: 'Baixar Ofertas Sprinter',
    shipment_origin: 'Origem de envio', shipment_origin_hint: 'País de onde os produtos são enviados',
    vat_pct: 'IVA', offer_state: 'Estado da oferta',
    gpsr_hint: 'Inclua as colunas GPSR do fabricante no seu Excel (obrigatórias)',
    variant_group_hint: 'Agrupe variantes de tamanho/cor com o mesmo código',
    sprinter_output_info: 'Serão gerados 2 ficheiros XLSX prontos para importar no Mirakl',
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
    tpl_smart_title: 'Template inteligente por categoria', tpl_smart_desc: 'Selecione sua categoria para um template com exemplos reais e validações',
    tpl_cat_calzado: 'Calçado', tpl_cat_ropa: 'Roupa', tpl_cat_accesorios: 'Acessórios', tpl_cat_equipamiento: 'Equipamento',
    tpl_sheet_instructions: 'Instruções', tpl_download_smart: 'Baixar template inteligente',
    hr_title: 'Saúde do catálogo', hr_score_label: 'Pontuação', hr_of: 'de', hr_show_detail: 'Ver relatório completo', hr_hide_detail: 'Ocultar relatório', hr_download: 'Baixar relatório', hr_checks_title: 'Checklist de campos obrigatórios', hr_recs_title: 'Recomendações', hr_field: 'Campo', hr_completeness: 'Completude', hr_detail: 'Detalhe', hr_products_ok: 'Produtos OK', hr_products_error: 'Com erros', hr_with_img2: 'Com imagem 2', hr_with_img3: 'Com imagem 3', hr_missing: 'Não encontrado',
    browser_notifs: 'Notificações do navegador', notif_enabled: 'Ativadas', notif_disabled: 'Desativadas',
    notif_catalog_done: 'Catálogo processado', notif_prices_done: 'Preços gerados',
    notif_stock_done: 'Estoque atualizado', notif_validate_done: 'Validação concluída',
    my_files: 'Meus arquivos', saved_files: 'Arquivos salvos', expires_in: 'Expira em', days: 'dias',
    no_saved_files: 'Você não tem arquivos salvos', no_saved_files_hint: 'Os arquivos gerados são salvos aqui por 15 dias',
    tag_stock_upper: 'ESTOQUE',
    tag_images_upper: 'IMAGENS',
    login_invite_only: 'Acesso somente por convite. Contacte o administrador.', have_account: 'Já tem conta?', login_link: 'Faça login',
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
    admin_dashboard_sub_mp: 'Atividade do teu marketplace',
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
    chat_placeholder: 'Escreva sua pergunta...', chat_thinking: 'Ana está a pensar...',
    chat_welcome: 'Olá! Sou a Ana, sua assistente do Katalync. Posso ajudá-lo com:\n\n- Como carregar e processar arquivos\n- Formatos e colunas necessárias\n- Assinatura, pagamentos e faturação\n- Erros comuns e soluções\n- Repricing e estratégias de preço\n\nComo posso ajudá-lo?',
    chat_no_match: 'Não encontrei uma resposta específica. Pode contactar o suporte no menu do usuário para assistência personalizada.',
    chat_blocked: 'Só posso responder perguntas sobre o uso do Katalync.',
    register_disabled: 'Registro desativado. Contate o administrador.',
    verify_title: 'Verifique seu email', verify_sub: 'Insira o código de 6 dígitos enviado ao seu email',
    verify_code_placeholder: 'Código de 6 dígitos', verify_btn: 'Verificar', verifying: 'Verificando...',
    verify_resend: 'Não recebeu o código?', verify_resend_link: 'Reenviar', verify_back: 'Voltar ao registro',
    verify_code_sent: 'Código de verificação enviado ao seu email', verify_error: 'Código incorreto ou expirado',
    empty_credentials: 'Insira email e senha',
    rate_limit: 'Muitas tentativas. Aguarde 1 minuto.',
    max_products_error: 'Máximo {max} produtos por lote. Seu arquivo tem {count}',
    log_validation_complete: 'Validação concluída',
    log_warnings_found: 'avisos',
    sub_pending_title: 'Ative sua assinatura',
    sub_pending_sub: 'Para acessar as ferramentas do Katalync você precisa ativar seu plano.',
    sub_pending_plan_vendor: 'Plano Katalync',
    sub_pending_plan_admin: 'Plano Katalync Partner',
    sub_pending_price_vendor: '39€/mês',
    sub_pending_price_admin: '499€/mês',
    sub_pending_features: 'Inclui todas as ferramentas: Conversor dual XLSX, Preços, Estoque, Validação GPSR, Repricing, Chatbot IA, Relatório de Saúde e Templates inteligentes',
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
    billing_portal_error: 'Não foi possível abrir o portal de faturação',
    payment_confirmed: 'Pagamento confirmado. Sua assinatura está ativa.',
    nav_sync: 'Sync',
    sync_title: 'Centro de Sincronização',
    sync_sub: 'Gere a conexão automática entre os seus vendedores, Katalync e Sprinter.',
    sync_vendors: 'Vendedores conectados',
    sync_products: 'Produtos sincronizados',
    sync_last: 'Última sincronização',
    sync_success_rate: 'Taxa de sucesso',
    sync_vendor_name: 'Vendedor',
    sync_source: 'Fonte',
    sync_product_count: 'Produtos',
    sync_last_sync: 'Última sync',
    sync_status: 'Estado',
    sync_actions: 'Ações',
    sync_now: 'Sync agora',
    sync_active: 'Ativo',
    sync_error: 'Erro',
    sync_paused: 'Pausado',
    sync_timeline_title: 'Histórico de sincronizações',
    sync_direction_in: 'CRM → Katalync',
    sync_direction_out: 'Katalync → Sprinter',
    sync_total: 'Total',
    sync_created: 'Criados',
    sync_updated: 'Atualizados',
    sync_errors: 'Erros',
    sync_upload_title: 'Subir catálogo para Sprinter',
    sync_upload_btn: 'Subir para Sprinter',
    sync_upload_desc: 'Suba os produtos convertidos diretamente para Mirakl/Sprinter via API.',
    sync_uploading: 'A subir para Sprinter...',
    sync_upload_done: 'Subida concluída',
    sync_no_products: 'Primeiro processe um catálogo para ter produtos para subir',
    sync_upload_result: 'produtos subidos',
    sync_upload_errors: 'erros',
    sync_upload_warnings: 'avisos',
    sync_simulating: 'A sincronizar...',
    sync_configure: 'Configurar conexão',
    sync_interval: 'Intervalo de sync',
    sync_hours: 'horas',
    sync_ago: 'há',
    sync_minutes: 'min',
    sync_demo_badge: 'DEMO',
    sync_connect_crm: 'Conectar CRM',
    sync_connect_crm_desc: 'Conecte o ERP/CRM do vendedor para sincronização automática.',
    vendor_add: 'Adicionar vendedor',
    vendor_edit: 'Editar vendedor',
    vendor_name_label: 'Nome do vendedor',
    vendor_company_label: 'Empresa',
    vendor_source_label: 'Fonte de dados',
    vendor_url_label: 'URL da loja',
    vendor_api_key_label: 'API Key',
    vendor_api_secret_label: 'API Secret',
    vendor_client_id_label: 'Client ID',
    vendor_client_secret_label: 'Client Secret',
    vendor_marketplace_key_label: 'Mirakl API Key',
    vendor_marketplace_url_label: 'URL Marketplace',
    vendor_interval_label: 'Intervalo de sync (horas)',
    vendor_test_connection: 'Testar conexão',
    vendor_testing: 'Testando...',
    vendor_connection_ok: 'Conexão bem-sucedida',
    vendor_connection_failed: 'Conexão falhada',
    vendor_save: 'Guardar vendedor',
    vendor_saving: 'Guardando...',
    vendor_created: 'Vendedor criado com sucesso',
    vendor_updated: 'Vendedor atualizado',
    vendor_deleted: 'Vendedor eliminado',
    vendor_delete_confirm: 'Eliminar vendedor {name}? Todos os produtos serão apagados.',
    vendor_name_required: 'O nome do vendedor é obrigatório',
    vendor_no_vendors: 'Nenhum vendedor conectado',
    vendor_no_vendors_hint: 'Conecte a sua primeira loja para começar a sincronizar produtos automaticamente.',
    shopify_oauth_missing: 'Introduza a URL da loja, Client ID e Client Secret antes de conectar',
    shopify_oauth_connect: 'Conectar com Shopify',
    shopify_oauth_connected: 'Conectado',
    shopify_oauth_hint: 'Guarde o vendedor primeiro, depois clique em "Conectar com Shopify" para autorizar o acesso.',
    sync_source_unsupported: 'Tipo de fonte não suportado para sync automático',
    sync_mirakl_not_configured: 'Mirakl API não configurada. Contacte o seu administrador.',
    sync_converting: 'Convertendo para marketplace...',
    sync_converted: 'produtos convertidos',
    sync_convert_error: 'Erro na conversão',
    sync_convert_btn: 'Converter',
    sync_view_products: 'Ver produtos',
    sync_hide_products: 'Ocultar',
    sync_products_loading: 'Carregando produtos...',
    sync_products_none: 'Nenhum produto ainda',
    sync_original: 'Original',
    sync_sprinter: 'Sprinter',
    sync_all_converted: 'Todos os produtos já estão convertidos',
    vendor_marketplaces_label: 'Mercados de destino',
    vendor_marketplace_es: 'Sprinter (Espanha)',
    vendor_marketplace_pt: 'Sport Zone (Portugal)',
    sync_logs_title: 'Histórico de sincronizações',
    sync_no_logs: 'Sem sincronizações recentes',
    comp_title: 'Estudo de Concorrentes',
    comp_sub: 'Análise do marketplace da Sprinter com dados reais.',
    comp_desc: 'Analise sellers, categorias, preços e produtos do marketplace em tempo real.',
    comp_overview: 'Resumo do Marketplace',
    comp_sellers: 'Sellers Ativos',
    comp_categories: 'Categorias',
    comp_products: 'Produtos',
    comp_avg_price: 'Preço Médio',
    comp_price_range: 'Faixa',
    comp_top_sellers: 'Top Sellers',
    comp_top_categories: 'Top Categorias',
    comp_product_list: 'Produtos em Destaque',
    comp_seller: 'Seller',
    comp_brand: 'Marca',
    comp_price: 'Preço',
    comp_original: 'Antes',
    comp_discount: 'Desc.',
    comp_category: 'Categoria',
    comp_search: 'Procurar produto, marca ou seller...',
    comp_filter_seller: 'Filtrar por seller',
    comp_filter_cat: 'Filtrar por categoria',
    comp_all: 'Todos',
    comp_data_date: 'Dados atualizados',
    comp_source: 'Fonte: sprintersports.com',
    comp_opportunity: 'Oportunidades',
    comp_opp_desc: 'Categorias com pouca concorrência onde pode posicionar-se',
    comp_few_sellers: 'poucos sellers',
    comp_no_data: 'Sem dados disponíveis',
    comp_market_share: 'Quota de mercado',
    comp_demo_badge: 'LIVE DATA'
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
    showToast(msg, type) { this.toastMsg = msg; this.toastType = type || 'success'; this.toastVisible = true; setTimeout(() => { this.toastVisible = false; }, type === 'error' ? 6000 : 4000); },

    authPage: 'login', authEmail: '', authPassword: '', authName: '', authError: '', authBusy: false, authLoading: true, verifyCode: '',
    currentUser: null, authToken: null, showLoginPass: false, showRegisterPass: false, showPwdCurrent: false, showPwdNew: false,

    showOnboarding: false, onboardStep: 1, onboardCompany: '', onboardLang: safeGetLang(), onboardBusy: false, paymentJustCompleted: false,
    onboardVendorName: '', onboardSource: 'shopify', onboardSourceUrl: '', onboardApiKey: '', onboardApiSecret: '',
    onboardTestStatus: '', onboardTestBusy: false,
    onboardSyncStatus: '', onboardSyncTotal: 0, onboardSyncConverted: false, onboardVendorId: null,
    onboardSkippedConnect: false,

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

    // Vendor management - real data
    syncVendors: [],
    syncLogs: [],
    syncLoading: false,
    syncSimulating: false, syncSimVendor: null, syncUploadSimulating: false, syncUploadProgress: 0, syncUploadDone: false,

    // Vendor form (for add/edit modal)
    vendorModal: false,
    vendorEditing: null,
    vendorForm: {
      name: '', company: '', source: 'shopify', source_url: '', source_api_key: '',
      source_api_secret: '', marketplace_api_key: '', marketplace_url: '', sync_interval_hours: 4
    },
    vendorTestResult: null,
    vendorTestInfo: '',
    vendorSaving: false,
    convertingVendor: null,
    expandedVendor: null,
    vendorProducts: [],
    vendorProductsLoading: false,

    compSearch: '', compFilterSeller: '', compFilterCat: '', compTab: 'overview',
    compData: {
      meta: { scrapedAt: '2026-05-12', totalProducts: 303, totalSellers: 19, totalCategories: 121, priceRange: { min: 9.99, max: 275.95, avg: 67.05 } },
      sellers: [
        { name: 'adidas ES', products: 93, avg: 64.79, min: 14.99, max: 185.82, cats: ['Balón Fútbol','Botas Fútbol Tacos','Zapatillas Baloncesto','Zapatillas Running','Zapatillas Trekking'] },
        { name: 'Sprinter', products: 92, avg: 80.51, min: 9.99, max: 234.99, cats: ['Botas fútbol tacos','Zapatillas running','Zapatillas casual','Zapatillas montaña','Zapatillas fitness'] },
        { name: 'Sports Sellers ES', products: 80, avg: 55.41, min: 15.07, max: 149.99, cats: ['Zapatillas Baloncesto','Zapatillas Trekking','Zapatillas Running','Camisetas Fútbol','Zapatillas Padel'] },
        { name: 'PadelPROShop', products: 9, avg: 69.95, min: 35.95, max: 189, cats: ['Pala Pádel','Zapatillas Padel'] },
        { name: 'AVENDA', products: 4, avg: 54.20, min: 28.80, max: 72.70, cats: ['Balón Fútbol','Zapatillas Padel'] },
        { name: 'Padel Cañaveral', products: 4, avg: 160.31, min: 44.73, max: 275.95, cats: ['Pala Pádel','Zapatillas Pádel'] },
        { name: 'AREA ZERO', products: 3, avg: 25.32, min: 22.99, max: 27.99, cats: ['Bandolera','Bolsa','Riñonera'] },
        { name: 'Imagina Sport', products: 3, avg: 38.99, min: 17.99, max: 54.99, cats: ['Mallas','Mochila'] },
        { name: 'Stateside', products: 3, avg: 67.91, min: 39.99, max: 101.15, cats: ['Zapatillas Padel','Zapatillas montaña','Zapatillas running'] },
        { name: 'JOMA', products: 2, avg: 83.49, min: 34.99, max: 131.99, cats: ['Zapatillas Fútbol Sala','Zapatillas Tenis'] },
        { name: 'TIENDA PADELPOINT', products: 2, avg: 48.45, min: 31.96, max: 64.95, cats: ['Zapatillas Pádel','Zapatillas Tenis'] },
        { name: 'Deporvillage', products: 1, avg: 31.95, min: 31.95, max: 31.95, cats: ['Forro Polar'] },
        { name: 'Factory Sport', products: 1, avg: 24.97, min: 24.97, max: 24.97, cats: ['Balón Fútbol'] },
        { name: 'ALONSPORT', products: 1, avg: 82.00, min: 82, max: 82, cats: ['Zapatillas Pádel'] },
        { name: 'Calzados Retos', products: 1, avg: 19.99, min: 19.99, max: 19.99, cats: ['Zapatillas Trekking'] },
        { name: 'Base Central Lab', products: 1, avg: 60.00, min: 60, max: 60, cats: ['Zapatillas running'] },
        { name: 'Vanessa Calzados', products: 1, avg: 17.99, min: 17.99, max: 17.99, cats: ['Zapatillas Niña'] },
        { name: 'Todo en Deporte', products: 1, avg: 32.74, min: 32.74, max: 32.74, cats: ['Botas Fútbol Sala'] },
        { name: 'Zona indoor', products: 1, avg: 34.99, min: 34.99, max: 34.99, cats: ['Zapatillas Baloncesto'] }
      ],
      categories: [
        { name: 'Zapatillas running', count: 28, avg: 98.11, min: 49.99, max: 149.99, sellers: ['Sprinter','Sports Sellers ES','adidas ES','Base Central Lab'] },
        { name: 'Zapatillas Baloncesto', count: 16, avg: 74.92, min: 34.99, max: 109.99, sellers: ['Sports Sellers ES','adidas ES','Zona indoor'] },
        { name: 'Zapatillas casual', count: 14, avg: 57.78, min: 32.99, max: 89.99, sellers: ['Sprinter'] },
        { name: 'Botas fútbol tacos', count: 13, avg: 97.68, min: 49.99, max: 234.99, sellers: ['Sprinter','adidas ES'] },
        { name: 'Zapatillas Trekking', count: 13, avg: 83.89, min: 19.99, max: 149.99, sellers: ['Sports Sellers ES','adidas ES','Calzados Retos'] },
        { name: 'Botas fútbol sala', count: 12, avg: 49.16, min: 24.99, max: 84.99, sellers: ['Sprinter'] },
        { name: 'Zapatillas montaña', count: 9, avg: 83.09, min: 39.99, max: 119.99, sellers: ['Sprinter','Stateside'] },
        { name: 'Balón Fútbol', count: 8, avg: 28.81, min: 24.97, max: 34.42, sellers: ['adidas ES','Sports Sellers ES','AVENDA','Factory Sport'] },
        { name: 'Zapatillas fitness', count: 8, avg: 97.21, min: 59.99, max: 119.99, sellers: ['Sprinter','Sports Sellers ES'] },
        { name: 'Botas Fútbol Tacos Jr', count: 6, avg: 88.32, min: 59.99, max: 129.99, sellers: ['Sprinter','adidas ES'] },
        { name: 'Zapatillas Trail', count: 5, avg: 77.52, min: 54.99, max: 102.65, sellers: ['Sports Sellers ES','adidas ES'] },
        { name: 'Zapatillas Pádel', count: 4, avg: 80.44, min: 31.96, max: 137.18, sellers: ['ALONSPORT','Padel Cañaveral','Sports Sellers ES','TIENDA PADELPOINT'] },
        { name: 'Sudadera Mujer', count: 4, avg: 49.99, min: 39.99, max: 74.99, sellers: ['Sports Sellers ES','adidas ES'] },
        { name: 'Camiseta Fútbol', count: 6, avg: 55.26, min: 26.99, max: 99.99, sellers: ['Sports Sellers ES','adidas ES'] },
        { name: 'Mochila', count: 3, avg: 38.45, min: 29.99, max: 44.99, sellers: ['Sports Sellers ES','adidas ES'] },
        { name: 'Zapatillas Tenis', count: 3, avg: 51.64, min: 39.99, max: 64.95, sellers: ['PadelPROShop','Sports Sellers ES','TIENDA PADELPOINT'] }
      ],
      products: [
        { n:'adidas Metalbone 26', p:275.95, op:0, b:'adidas', s:'Padel Cañaveral', c:'Pala Pádel' },
        { n:'adidas Cross It Light', p:249.95, op:0, b:'adidas', s:'Padel Cañaveral', c:'Pala Pádel Mujer' },
        { n:'adidas F50 Elite Fg Lamine Yamal', p:234.99, op:299.76, b:'adidas', s:'Sprinter', c:'Botas fútbol tacos' },
        { n:'Bullpadel Pack Vertex 04', p:189, op:0, b:'Bullpadel', s:'PadelPROShop', c:'Pala Pádel' },
        { n:'adidas Predator Elite Ft Fg', p:185.82, op:279.99, b:'adidas', s:'adidas ES', c:'Botas Fútbol Tacos' },
        { n:'adidas Predator Elite Ft Fg', p:179.99, op:279.99, b:'adidas', s:'Sprinter', c:'Botas fútbol tacos' },
        { n:'1ª Camiseta Real Madrid 25/26', p:149.99, op:0, b:'Real Madrid', s:'adidas ES', c:'Equipación' },
        { n:'adidas Adizero Evo Sl', p:149.99, op:0, b:'adidas', s:'Sprinter', c:'Zapatillas running' },
        { n:'La Sportiva Spire Gtx', p:149.99, op:227.80, b:'La Sportiva', s:'Sports Sellers ES', c:'Zapatillas Trekking' },
        { n:'Hoka Mach 7', p:145.95, op:180.98, b:'Hoka', s:'Sprinter', c:'Zapatillas running' },
        { n:'Merrell Moab Speed 2 Gtx', p:142.95, op:169.99, b:'Merrell', s:'Sprinter', c:'Botas montaña' },
        { n:'adidas Predator Pro Ft Fg', p:139.99, op:169.99, b:'adidas', s:'Sprinter', c:'Botas fútbol tacos' },
        { n:'Hoka Bondi 9', p:138.95, op:184.72, b:'Hoka', s:'Sprinter', c:'Zapatillas running' },
        { n:'Joma Smash', p:137.18, op:0, b:'Joma', s:'Sports Sellers ES', c:'Zapatillas Pádel' },
        { n:'adidas Agravic Speed 2', p:134.99, op:159.99, b:'adidas', s:'Sprinter', c:'Zapatillas running' },
        { n:'La Sportiva Akyra', p:134.99, op:202.65, b:'La Sportiva', s:'Sports Sellers ES', c:'Zapatillas Trekking' },
        { n:'Joma Roland Lady 25', p:131.99, op:0, b:'Joma', s:'JOMA', c:'Zapatillas Tenis' },
        { n:'adidas Ultraboost 5', p:129.99, op:193.61, b:'adidas', s:'Sprinter', c:'Zapatillas running' },
        { n:'adidas Adizero Boston 13', p:124.99, op:159.99, b:'adidas', s:'Sprinter', c:'Zapatillas running' },
        { n:'adidas Soulstride Flow', p:124.99, op:139.99, b:'adidas', s:'Sprinter', c:'Zapatillas running' },
        { n:'adidas Dropset 4 Power', p:119.99, op:129.99, b:'adidas', s:'Sprinter', c:'Zapatillas fitness' },
        { n:'adidas Predator Pro Ft Ag', p:119.99, op:159.99, b:'adidas', s:'adidas ES', c:'Botas Fútbol Tacos' },
        { n:'adidas Terrex Trailmaker 2', p:119.99, op:0, b:'adidas', s:'adidas ES', c:'Zapatillas Trekking' },
        { n:'Anorak adidas', p:119.99, op:0, b:'adidas', s:'adidas ES', c:'Anorak Trekking' },
        { n:'adidas Supernova Rise 2', p:119.66, op:170.53, b:'adidas', s:'adidas ES', c:'Zapatillas Running' },
        { n:'adidas Adizero Adios 9', p:114.99, op:146.28, b:'adidas', s:'Sprinter', c:'Zapatillas running' },
        { n:'adidas Ae 1 Low', p:109.99, op:0, b:'adidas', s:'adidas ES', c:'Zapatillas Baloncesto' },
        { n:'Merrell Moab Speed 2 Gtx', p:108.95, op:274.10, b:'Merrell', s:'Sprinter', c:'Zapatillas montaña' },
        { n:'Merrell Antora 4', p:107.95, op:134.99, b:'Merrell', s:'Sprinter', c:'Zapatillas running' },
        { n:'adidas Ae 2', p:103.98, op:129.99, b:'adidas', s:'adidas ES', c:'Zapatillas Baloncesto' },
        { n:'Mizuno Ultima 17', p:103.95, op:104.99, b:'Mizuno', s:'Sprinter', c:'Zapatillas running' },
        { n:'Joma Point 2204', p:101.15, op:0, b:'Joma', s:'Stateside', c:'Zapatillas Padel' },
        { n:'adidas Harden Volume 9', p:101.10, op:206.10, b:'adidas', s:'Sports Sellers ES', c:'Zapatillas Baloncesto' },
        { n:'Mizuno Fortrush', p:100.95, op:130.06, b:'Mizuno', s:'Sprinter', c:'Zapatillas running' },
        { n:'1ª Camiseta Real Madrid 25/26', p:99.99, op:0, b:'Real Madrid', s:'adidas ES', c:'Camiseta Fútbol' },
        { n:'2ª Camiseta España Mundial 2026', p:99.99, op:126.62, b:'adidas', s:'Sports Sellers ES', c:'Equipación' },
        { n:'3ª Camiseta Arsenal Fc 25/26', p:99.99, op:0, b:'Arsenal Fc', s:'adidas ES', c:'Equipación' },
        { n:'adidas Supernova Glide M', p:99.99, op:129.99, b:'adidas', s:'Sprinter', c:'Zapatillas running' },
        { n:'adidas Terrex Swift R2 Gtx', p:99.99, op:212.69, b:'adidas', s:'Sports Sellers ES', c:'Zapatillas Trekking' },
        { n:'Hoka Rincon 4', p:94.95, op:157.45, b:'Hoka', s:'Sprinter', c:'Zapatillas running' },
        { n:'adidas Barreda Decode Lux', p:89.99, op:0, b:'adidas', s:'Sprinter', c:'Zapatillas casual' },
        { n:'adidas F50 League Fg Mg', p:89.99, op:114.55, b:'adidas', s:'Sprinter', c:'Botas fútbol tacos' },
        { n:'adidas A. Edwards 1', p:89.99, op:106.82, b:'adidas', s:'Sports Sellers ES', c:'Zapatillas Baloncesto' },
        { n:'Babolat Stigma Vita', p:89.85, op:0, b:'Babolat', s:'PadelPROShop', c:'Pala Pádel Mujer' },
        { n:'adidas Terrex Voyager 21', p:86.67, op:103.04, b:'adidas', s:'adidas ES', c:'Zapatillas Trekking' },
        { n:'adidas F50 Elite Fg', p:84.99, op:119.99, b:'adidas', s:'Sprinter', c:'Botas fútbol sala' },
        { n:'adidas Terrex Swift R3', p:84.99, op:210.30, b:'adidas', s:'Sports Sellers ES', c:'Zapatillas Trekking' },
        { n:'adidas Ae 1 Mid', p:82.00, op:0, b:'adidas', s:'ALONSPORT', c:'Zapatillas Pádel' },
        { n:'Columbia Bethany Urban', p:79.99, op:112.62, b:'Columbia', s:'Sports Sellers ES', c:'Zapatillas fitness' },
        { n:'adidas Predator League Fg', p:74.99, op:99.99, b:'adidas', s:'Sprinter', c:'Botas fútbol tacos' }
      ]
    },
    get compFilteredProducts() {
      let list = this.compData.products;
      if (this.compSearch) {
        const q = this.compSearch.toLowerCase();
        list = list.filter(p => p.n.toLowerCase().includes(q) || p.b.toLowerCase().includes(q) || p.s.toLowerCase().includes(q) || p.c.toLowerCase().includes(q));
      }
      if (this.compFilterSeller) list = list.filter(p => p.s === this.compFilterSeller);
      if (this.compFilterCat) list = list.filter(p => p.c.toLowerCase().includes(this.compFilterCat.toLowerCase()));
      return list;
    },
    get compUniqueSellers() { return [...new Set(this.compData.products.map(p => p.s))].sort(); },
    get compUniqueCats() { return [...new Set(this.compData.products.map(p => p.c).filter(Boolean))].sort(); },

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
        this._pollPaymentStatus();
      }
    },

    async _pollPaymentStatus() {
      for (let i = 0; i < 12; i++) {
        await new Promise(r => setTimeout(r, 5000));
        if (!this.authToken) return;
        try {
          const resp = await fetch(N8N_BASE + '/webhook/auth-verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken }) });
          const data = await resp.json();
          if (data.success && data.subscription_status === 'active') {
            this.currentUser.subscription_status = 'active';
            this.showToast(this.t('payment_confirmed'), 'success');
            return;
          }
        } catch(e) {}
      }
    },

    async doRegister() {
      if (this.authBusy) return;
      this.authError = '';
      if (!this.authName || !this.authEmail || !this.authPassword) { this.authError = this.t('empty_credentials'); return; }
      if (this.authPassword.length < 8) { this.authError = this.t('min_chars'); return; }
      if (!_rateLimiter.check('register', 3, 60000)) { this.authError = this.t('rate_limit'); return; }
      this.authBusy = true;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: this.authName, email: this.authEmail, password: this.authPassword }) });
        const data = await resp.json();
        if (!data.success) { this.authError = data.error || this.t('login_error_fallback'); this.authBusy = false; return; }
        if (data.pending_verification) {
          this.authPage = 'verify';
          this.showToast(this.t('verify_code_sent'), 'success');
        } else {
          this.showToast(data.message || 'OK', 'success');
          this.authPage = 'login';
        }
      } catch(e) { this.authError = this.t('connection_error'); }
      this.authBusy = false;
    },

    async doVerifyEmail() {
      if (this.authBusy) return;
      this.authError = '';
      if (!this.verifyCode || this.verifyCode.length !== 6) { this.authError = this.t('verify_error'); return; }
      this.authBusy = true;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/auth-verify-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: this.authEmail, code: this.verifyCode }) });
        const data = await resp.json();
        if (!data.success) { this.authError = data.error || this.t('verify_error'); this.authBusy = false; return; }
        this.authToken = data.token;
        const role = data.role === 'admin' ? 'super_admin' : (data.role || 'user');
        this.currentUser = { name: data.name, email: data.email, role, marketplace_id: '', company: '', onboarded: data.onboarded !== false, subscription_status: data.subscription_status || 'pending_payment', stripe_checkout_url: '' };
        safeSaveToken(data.token);
        this.authPassword = '';
        this.verifyCode = '';
        if (!this.currentUser.onboarded) { this.showOnboarding = true; }
      } catch(e) { this.authError = this.t('connection_error'); }
      this.authBusy = false;
    },

    async resendVerifyCode() {
      if (this.authBusy) return;
      if (!_rateLimiter.check('resend', 2, 60000)) { this.authError = this.t('rate_limit'); return; }
      this.authBusy = true;
      try {
        await fetch(N8N_BASE + '/webhook/auth-register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: this.authName, email: this.authEmail, password: this.authPassword }) });
        this.showToast(this.t('verify_code_sent'), 'success');
      } catch(e) { this.authError = this.t('connection_error'); }
      this.authBusy = false;
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
      if (this.onboardVendorId) { this.loadSyncVendors(); }
    },

    async onboardTestConnection() {
      if (!this.onboardSourceUrl || !this.onboardApiKey) return;
      this.onboardTestBusy = true;
      this.onboardTestStatus = '';
      try {
        const resp = await fetch(N8N_BASE + '/webhook/vendor-test-connection', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, source: this.onboardSource, source_url: this.onboardSourceUrl.replace(/\/+$/, ''), source_api_key: this.onboardApiKey, source_api_secret: this.onboardApiSecret }) });
        const data = await resp.json();
        this.onboardTestStatus = data.success ? 'ok' : 'fail';
      } catch(e) { this.onboardTestStatus = 'fail'; }
      this.onboardTestBusy = false;
    },

    async onboardCreateAndSync() {
      this.onboardSyncStatus = 'creating';
      this.onboardBusy = true;
      try {
        const createResp = await fetch(N8N_BASE + '/webhook/vendor-create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, name: this.onboardVendorName || this.onboardCompany || 'Mi Tienda', company: this.onboardCompany, source: this.onboardSource, source_url: this.onboardSourceUrl.replace(/\/+$/, ''), source_api_key: this.onboardApiKey, source_api_secret: this.onboardApiSecret, sync_interval_hours: 4, marketplaces: ['sprinter_es'] }) });
        const createData = await createResp.json();
        if (!createData.success || !createData.vendor) { this.onboardSyncStatus = 'error'; this.onboardBusy = false; return; }
        this.onboardVendorId = createData.vendor.id;
        this.onboardSyncStatus = 'syncing';
        const syncEndpoint = this.onboardSource === 'woocommerce' ? '/webhook/woocommerce-sync-pull' : this.onboardSource === 'prestashop' ? '/webhook/prestashop-sync-pull' : '/webhook/shopify-sync-pull';
        const syncResp = await fetch(N8N_BASE + syncEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, vendor_id: this.onboardVendorId }) });
        const syncData = await syncResp.json();
        if (!syncData.success) { this.onboardSyncStatus = 'error'; this.onboardBusy = false; return; }
        this.onboardSyncTotal = syncData.total || 0;
        this.onboardSyncStatus = 'done';
      } catch(e) { this.onboardSyncStatus = 'error'; }
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

    get syncTotalProducts() { return this.syncVendors.reduce((s, v) => s + (v.product_count || 0), 0); },
    get syncTotalSynced() { return this.syncVendors.reduce((s, v) => s + (v.last_sync_products_synced || 0), 0); },
    get syncSuccessRate() { const t = this.syncTotalProducts; return t ? ((this.syncTotalSynced / t) * 100).toFixed(1) : '0'; },
    get syncLastTime() {
      const times = this.syncVendors.filter(v => v.last_sync_at).map(v => new Date(v.last_sync_at).getTime());
      if (!times.length) return '-';
      return this.syncTimeAgo(Math.max(...times));
    },

    syncTimeAgo(ts) {
      const diff = Date.now() - ts;
      const mins = Math.floor(diff / 60000);
      if (mins < 60) return mins + ' ' + this.t('sync_minutes');
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return hrs + 'h';
      return Math.floor(hrs / 24) + 'd';
    },

    async loadSyncVendors() {
      this.syncLoading = true;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/vendor-list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken })
        });
        const data = await resp.json();
        if (data.success) {
          this.syncVendors = data.vendors || [];
        }
      } catch(e) { console.error('loadSyncVendors error:', e); }
      this.syncLoading = false;
    },

    async loadSyncLogs() {
      try {
        const resp = await fetch(N8N_BASE + '/webhook/sync-logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken, limit: 20 })
        });
        const data = await resp.json();
        if (data.success) {
          this.syncLogs = data.logs || [];
        }
      } catch(e) { console.error('loadSyncLogs error:', e); }
    },

    openVendorModal(vendor = null) {
      this.vendorEditing = vendor;
      this.vendorTestResult = null;
      this.vendorTestInfo = '';
      if (vendor) {
        this.vendorForm = {
          name: vendor.name || '', company: vendor.company || '', source: vendor.source || 'shopify',
          source_url: vendor.source_url || '',
          source_api_key: vendor.source_api_key ? '••••••' : '',
          source_api_secret: vendor.source_api_secret ? '••••••' : '',
          marketplace_api_key: vendor.marketplace_api_key ? '••••••' : '',
          marketplace_url: vendor.marketplace_url || '',
          sync_interval_hours: vendor.sync_interval_hours || 4,
          marketplaces: (vendor.config && vendor.config.marketplaces) || ['sprinter_es']
        };
      } else {
        this.vendorForm = { name: '', company: '', source: 'shopify', source_url: '', source_api_key: '', source_api_secret: '', marketplace_api_key: '', marketplace_url: '', sync_interval_hours: 4, marketplaces: ['sprinter_es'] };
      }
      this.vendorModal = true;
    },

    async testVendorConnection() {
      if (this.vendorForm.source === 'shopify' && !this.vendorEditing?.config?.connected_at) {
        this.vendorTestResult = 'failed';
        this.vendorTestInfo = this.t('shopify_oauth_hint');
        return;
      }
      this.vendorTestResult = 'testing';
      this.vendorTestInfo = '';
      try {
        const payload = this.vendorEditing
          ? { token: this.authToken, vendor_id: this.vendorEditing.id }
          : { token: this.authToken, source: this.vendorForm.source, source_url: this.vendorForm.source_url, source_api_key: this.vendorForm.source_api_key, source_api_secret: this.vendorForm.source_api_secret };
        const resp = await fetch(N8N_BASE + '/webhook/vendor-test-connection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await resp.json();
        if (data.success && data.connection === 'ok') {
          this.vendorTestResult = 'ok';
          this.vendorTestInfo = (data.shop_name ? data.shop_name + ' — ' : '') + (data.product_count || 0) + ' productos';
        } else {
          this.vendorTestResult = 'failed';
          this.vendorTestInfo = data.error || 'Connection failed';
        }
      } catch(e) {
        this.vendorTestResult = 'failed';
        this.vendorTestInfo = e.message;
      }
    },

    async saveVendor() {
      if (!this.vendorForm.name) { this.showToast(this.t('vendor_name_required'), 'error'); return; }
      this.vendorSaving = true;
      try {
        const endpoint = this.vendorEditing ? '/webhook/vendor-update' : '/webhook/vendor-create';
        const body = { token: this.authToken, ...this.vendorForm };
        if (this.vendorEditing) body.vendor_id = this.vendorEditing.id;
        if (body.source_api_key === '••••••') delete body.source_api_key;
        if (body.source_api_secret === '••••••') delete body.source_api_secret;
        if (body.marketplace_api_key === '••••••') delete body.marketplace_api_key;
        const resp = await fetch(N8N_BASE + endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await resp.json();
        if (data.success) {
          this.vendorModal = false;
          this.showToast(this.vendorEditing ? this.t('vendor_updated') : this.t('vendor_created'), 'success');
          await this.loadSyncVendors();
        } else {
          this.showToast(data.error || 'Error', 'error');
        }
      } catch(e) { this.showToast(e.message, 'error'); }
      this.vendorSaving = false;
    },

    async deleteVendor(vendor) {
      if (!confirm(this.t('vendor_delete_confirm').replace('{name}', vendor.name))) return;
      try {
        const resp = await fetch(N8N_BASE + '/webhook/vendor-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken, vendor_id: vendor.id })
        });
        const data = await resp.json();
        if (data.success) {
          this.showToast(this.t('vendor_deleted'), 'success');
          await this.loadSyncVendors();
        }
      } catch(e) { this.showToast(e.message, 'error'); }
    },

    async triggerSync(vendor) {
      this.syncSimulating = true;
      this.syncSimVendor = vendor.id;
      try {
        const endpoint = vendor.source === 'shopify' ? '/webhook/shopify-sync-pull'
          : vendor.source === 'woocommerce' ? '/webhook/woocommerce-sync-pull'
          : vendor.source === 'prestashop' ? '/webhook/prestashop-sync-pull'
          : null;
        if (!endpoint) {
          this.showToast(this.t('sync_source_unsupported'), 'info');
          this.syncSimulating = false;
          this.syncSimVendor = null;
          return;
        }
        const resp = await fetch(N8N_BASE + endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken, vendor_id: vendor.id })
        });
        const data = await resp.json();
        if (data.success) {
          this.showToast(vendor.name + ': ' + data.total + ' productos sincronizados', 'success');
          await this.loadSyncVendors();
          await this.loadSyncLogs();
          this.syncSimulating = false;
          this.syncSimVendor = null;
          if (data.total > 0) {
            this.autoConvert(vendor);
          }
        } else {
          this.showToast(vendor.name + ': ' + (data.error || 'Error'), 'error');
          this.syncSimulating = false;
          this.syncSimVendor = null;
        }
      } catch(e) {
        this.showToast(e.message, 'error');
        this.syncSimulating = false;
        this.syncSimVendor = null;
      }
    },

    async autoConvert(vendor) {
      this.convertingVendor = vendor.id;
      this.showToast(this.t('sync_converting'), 'info');
      try {
        const mkt = (vendor.config && vendor.config.marketplaces) || ['sprinter_es'];
        const resp = await fetch(N8N_BASE + '/webhook/auto-convert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken, vendor_id: vendor.id, marketplaces: mkt })
        });
        const data = await resp.json();
        if (data.success) {
          if (data.converted > 0) {
            this.showToast(vendor.name + ': ' + data.converted + ' ' + this.t('sync_converted'), 'success');
          } else {
            this.showToast(this.t('sync_all_converted'), 'info');
          }
          await this.loadSyncVendors();
        } else {
          this.showToast(this.t('sync_convert_error') + ': ' + (data.error || ''), 'error');
        }
      } catch(e) { this.showToast(this.t('sync_convert_error') + ': ' + e.message, 'error'); }
      this.convertingVendor = null;
    },

    async loadVendorProducts(vendorId) {
      if (this.expandedVendor === vendorId) {
        this.expandedVendor = null;
        this.vendorProducts = [];
        return;
      }
      this.expandedVendor = vendorId;
      this.vendorProductsLoading = true;
      this.vendorProducts = [];
      try {
        const resp = await fetch(N8N_BASE + '/webhook/vendor-products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken, vendor_id: vendorId, page_size: 50 })
        });
        const data = await resp.json();
        if (data.success) {
          this.vendorProducts = data.products || [];
        }
      } catch(e) { console.error('loadVendorProducts error:', e); }
      this.vendorProductsLoading = false;
    },

    async uploadToSprinter() {
      const convertedVendors = this.syncVendors.filter(v => v.sync_status === 'converted' || v.sync_status === 'synced');
      if (convertedVendors.length === 0) {
        this.showToast(this.t('sync_no_products'), 'info');
        return;
      }
      this.syncUploadSimulating = true;
      this.syncUploadProgress = 0;
      this.syncUploadDone = false;
      try {
        const allProducts = [];
        for (let i = 0; i < convertedVendors.length; i++) {
          this.syncUploadProgress = Math.round((i / convertedVendors.length) * 50);
          const resp = await fetch(N8N_BASE + '/webhook/vendor-products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: this.authToken, vendor_id: convertedVendors[i].id, page_size: 10000 })
          });
          const data = await resp.json();
          if (data.success && data.products) {
            const converted = data.products.filter(p => p.sprinter_product);
            allProducts.push(...converted);
          }
        }
        if (allProducts.length === 0) {
          this.showToast(this.t('sync_no_products'), 'info');
          this.syncUploadSimulating = false;
          return;
        }
        this.syncUploadProgress = 60;
        const resp = await fetch(N8N_BASE + '/webhook/mirakl-upload-products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.authToken, products: allProducts })
        });
        const data = await resp.json();
        if (data.success) {
          this.syncUploadProgress = 100;
          this.syncUploadDone = true;
          this.showToast(this.t('sync_upload_done'), 'success');
        } else if (data.error === 'mirakl_not_configured') {
          this.showToast(this.t('sync_mirakl_not_configured'), 'info');
        } else {
          this.showToast(data.message || data.error || 'Error', 'error');
        }
      } catch(e) { this.showToast(e.message, 'error'); }
      this.syncUploadSimulating = false;
    },

    getSourceIcon(source) {
      const icons = { shopify: 'S', woocommerce: 'W', prestashop: 'P', api: '{}', excel: 'X' };
      return icons[source] || '?';
    },

    getSourceLabel(source) {
      const labels = { shopify: 'Shopify', woocommerce: 'WooCommerce', prestashop: 'PrestaShop', api: 'API', excel: 'Excel' };
      return labels[source] || source;
    },

    getSourceColor(source) {
      const colors = { shopify: 'bg-green-50 text-green-700', woocommerce: 'bg-purple-50 text-purple-700', prestashop: 'bg-blue-50 text-blue-700', api: 'bg-gray-100 text-gray-600', excel: 'bg-amber-50 text-amber-700' };
      return colors[source] || 'bg-gray-100 text-gray-600';
    },

    async connectShopifyOAuth(vendorId) {
      const vendor = this.syncVendors.find(v => v.id === vendorId);
      if (!vendor) return;
      if (!vendor.source_url || !vendor.source_api_key) {
        this.showToast(this.t('shopify_oauth_missing'), 'error');
        return;
      }
      const shop = vendor.source_url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
      const clientId = vendor.source_api_key;
      const redirectUri = N8N_BASE + '/webhook/shopify-oauth-callback';
      const scopes = 'read_products,read_inventory';
      const state = btoa(JSON.stringify({ vendor_id: vendorId }));
      const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
      window.open(authUrl, '_blank');
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
          this.openStripeCheckout();
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
          let allFiles = data.allFiles || [];
          if (this.isMarketplaceAdmin && this.currentUser.marketplace_id) {
            const mpEmails = new Set(this.filteredAdminUsers.map(u => u.email));
            allFiles = allFiles.filter(f => mpEmails.has(f.userEmail));
          }
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
        catalog: { filename: this.t('tpl_filename_catalog'), headers: ['sku', 'ean', 'marca', 'nombre', 'modelo', 'categoria', 'genero', 'color', 'talla', 'material', 'imagen', 'imagen_2', 'imagen_3', 'precio', 'stock', 'descripcion', 'variant_group_code', 'pais_fabricacion', 'fabricante_nombre', 'fabricante_nombre_comercial', 'fabricante_direccion', 'fabricante_email', 'responsable_ue_nombre', 'responsable_ue_direccion', 'responsable_ue_email', 'coleccion', 'cuidados'], rows: [
          { 'sku': 'MI-TIENDA-AIR90-42-NGR', 'ean': '8412345678901', 'marca': 'Nike', 'nombre': 'Air Max 90', 'modelo': 'Air Max 90', 'categoria': 'Calzado', 'genero': 'Hombre', 'color': 'Negro', 'talla': '42', 'material': 'Sintetico/Caucho', 'imagen': 'https://ejemplo.com/img1.jpg', 'imagen_2': '', 'imagen_3': '', 'precio': '129.99', 'stock': '50', 'descripcion': '', 'variant_group_code': 'AIR90-NGR', 'pais_fabricacion': 'China', 'fabricante_nombre': 'Nike Inc', 'fabricante_nombre_comercial': 'Nike', 'fabricante_direccion': 'One Bowerman Dr, Beaverton, OR 97005, USA', 'fabricante_email': 'contact@nike.com', 'responsable_ue_nombre': 'Nike European Operations Netherlands BV', 'responsable_ue_direccion': 'Colosseum 1, 1213NL Hilversum, Netherlands', 'responsable_ue_email': 'eu-compliance@nike.com', 'coleccion': '', 'cuidados': '' },
          { 'sku': 'MI-TIENDA-AIR90-43-NGR', 'ean': '8412345678902', 'marca': 'Nike', 'nombre': 'Air Max 90', 'modelo': 'Air Max 90', 'categoria': 'Calzado', 'genero': 'Hombre', 'color': 'Negro', 'talla': '43', 'material': 'Sintetico/Caucho', 'imagen': 'https://ejemplo.com/img1.jpg', 'imagen_2': '', 'imagen_3': '', 'precio': '129.99', 'stock': '30', 'descripcion': '', 'variant_group_code': 'AIR90-NGR', 'pais_fabricacion': 'China', 'fabricante_nombre': 'Nike Inc', 'fabricante_nombre_comercial': 'Nike', 'fabricante_direccion': 'One Bowerman Dr, Beaverton, OR 97005, USA', 'fabricante_email': 'contact@nike.com', 'responsable_ue_nombre': 'Nike European Operations Netherlands BV', 'responsable_ue_direccion': 'Colosseum 1, 1213NL Hilversum, Netherlands', 'responsable_ue_email': 'eu-compliance@nike.com', 'coleccion': '', 'cuidados': '' }
        ]},
        prices: { filename: this.t('tpl_filename_prices'), headers: ['offer-sku', 'product-id', 'price', 'quantity', 'discount-price', 'discount-start-date', 'discount-end-date'], rows: [
          { 'offer-sku': 'MI-TIENDA-AIR90-42-NGR', 'product-id': '8412345678901', 'price': '129.99', 'quantity': '50', 'discount-price': '99.99', 'discount-start-date': '2026-06-01', 'discount-end-date': '2026-06-30' },
          { 'offer-sku': 'MI-TIENDA-AIR90-43-NGR', 'product-id': '8412345678902', 'price': '129.99', 'quantity': '30', 'discount-price': '', 'discount-start-date': '', 'discount-end-date': '' },
          { 'offer-sku': 'MI-TIENDA-UB22-38-BLC', 'product-id': '8412345678903', 'price': '179.99', 'quantity': '20', 'discount-price': '149.99', 'discount-start-date': '2026-06-01', 'discount-end-date': '2026-06-30' }
        ]},
        stock: { filename: this.t('tpl_filename_stock'), headers: ['offer-sku', 'quantity'], rows: [
          { 'offer-sku': 'MI-TIENDA-001', 'quantity': '50' },
          { 'offer-sku': 'MI-TIENDA-002', 'quantity': '120' },
          { 'offer-sku': 'MI-TIENDA-003', 'quantity': '0' }
        ]},
        validation: { filename: this.t('tpl_filename_validation'), headers: ['sku', 'ean', 'marca', 'nombre', 'categoria', 'genero', 'color', 'talla', 'material', 'imagen', 'precio', 'stock', 'variant_group_code'], rows: [
          { 'sku': 'MI-TIENDA-AIR90-42-NGR', 'ean': '8412345678901', 'marca': 'Nike', 'nombre': 'Air Max 90', 'categoria': 'Calzado', 'genero': 'Hombre', 'color': 'Negro', 'talla': '42', 'material': 'Sintetico/Caucho', 'imagen': 'https://ejemplo.com/img1.jpg', 'precio': '129.99', 'stock': '50', 'variant_group_code': 'AIR90-NGR' },
          { 'sku': 'MI-TIENDA-UB22-38-BLC', 'ean': '8412345678903', 'marca': 'Adidas', 'nombre': 'Ultraboost 22', 'categoria': 'Calzado', 'genero': 'Mujer', 'color': 'Blanco', 'talla': '38', 'material': 'Textile/Sintetico', 'imagen': 'https://ejemplo.com/img2.jpg', 'precio': '179.99', 'stock': '20', 'variant_group_code': 'UB22-BLC' }
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

    buildSmartTemplate() {
      const cat = this.templateCategory;
      const headers = ['sku', 'ean', 'marca', 'nombre', 'modelo', 'categoria', 'genero', 'color', 'talla', 'material', 'imagen', 'imagen_2', 'imagen_3', 'precio', 'stock', 'descripcion', 'variant_group_code', 'pais_fabricacion', 'fabricante_nombre', 'fabricante_nombre_comercial', 'fabricante_direccion', 'fabricante_email', 'responsable_ue_nombre', 'responsable_ue_direccion', 'responsable_ue_email', 'coleccion', 'cuidados'];
      const instructions = {
        sku: 'Tu referencia interna. Ej: MITIENDA-AIR90-42-NGR',
        ean: 'Código de barras EAN-13 (13 dígitos). OBLIGATORIO',
        marca: 'Marca del producto. OBLIGATORIO',
        nombre: 'Nombre del producto. OBLIGATORIO',
        modelo: 'Modelo específico (se usa para generar título)',
        categoria: 'Calzado / Ropa / Accesorios / Equipamiento. OBLIGATORIO',
        genero: 'Hombre / Mujer / Unisex / Niño / Niña. OBLIGATORIO',
        color: 'Color del producto. Usar colores estándar Sprinter',
        talla: 'Talla del producto. OBLIGATORIO',
        material: 'Composición del material. OBLIGATORIO',
        imagen: 'URL pública de la imagen principal (2:3). OBLIGATORIO',
        imagen_2: 'URL imagen secundaria (opcional)',
        imagen_3: 'URL imagen terciaria (opcional)',
        precio: 'Precio con IVA incluido. Usar punto decimal',
        stock: 'Unidades disponibles',
        descripcion: 'Descripción del producto (se autogenera si vacía)',
        variant_group_code: 'Código para agrupar tallas/colores del mismo producto',
        pais_fabricacion: 'País de fabricación (GPSR). OBLIGATORIO',
        fabricante_nombre: 'Nombre del fabricante (GPSR). OBLIGATORIO',
        fabricante_nombre_comercial: 'Nombre comercial registrado (GPSR). OBLIGATORIO',
        fabricante_direccion: 'Dirección completa del fabricante (GPSR). OBLIGATORIO',
        fabricante_email: 'Email del fabricante (GPSR). OBLIGATORIO',
        responsable_ue_nombre: 'Persona responsable en la UE (GPSR)',
        responsable_ue_direccion: 'Dirección del responsable UE (GPSR)',
        responsable_ue_email: 'Email del responsable UE (GPSR)',
        coleccion: 'Colección (opcional)',
        cuidados: 'Instrucciones de cuidado (opcional)'
      };
      const examples = {
        calzado: [
          { sku: 'TIENDA-RUN01-42-NGR', ean: '8412345678901', marca: 'Nike', nombre: 'Revolution 6', modelo: 'Revolution 6', categoria: 'Calzado', genero: 'Hombre', color: 'Negro', talla: '42', material: 'Sintetico/Caucho', imagen: 'https://ejemplo.com/rev6-negro.jpg', imagen_2: '', imagen_3: '', precio: '69.99', stock: '45', descripcion: '', variant_group_code: 'REV6-NGR', pais_fabricacion: 'Vietnam', fabricante_nombre: 'Nike Inc', fabricante_nombre_comercial: 'Nike', fabricante_direccion: 'One Bowerman Dr, Beaverton, OR 97005, USA', fabricante_email: 'contact@nike.com', responsable_ue_nombre: 'Nike European Operations Netherlands BV', responsable_ue_direccion: 'Colosseum 1, 1213NL Hilversum, Netherlands', responsable_ue_email: 'eu-compliance@nike.com', coleccion: 'SS2026', cuidados: 'Limpiar con paño húmedo' },
          { sku: 'TIENDA-TRAIL01-40-AZL', ean: '8412345678902', marca: 'Salomon', nombre: 'Speedcross 6', modelo: 'Speedcross 6', categoria: 'Calzado', genero: 'Mujer', color: 'Azul', talla: '40', material: 'Textile/Caucho', imagen: 'https://ejemplo.com/sc6-azul.jpg', imagen_2: 'https://ejemplo.com/sc6-azul-2.jpg', imagen_3: '', precio: '139.99', stock: '20', descripcion: '', variant_group_code: 'SC6-AZL', pais_fabricacion: 'Vietnam', fabricante_nombre: 'Salomon SAS', fabricante_nombre_comercial: 'Salomon', fabricante_direccion: 'Lieu dit les Gléteins, 74370 Metz-Tessy, France', fabricante_email: 'info@salomon.com', responsable_ue_nombre: 'Salomon SAS', responsable_ue_direccion: 'Lieu dit les Gléteins, 74370 Metz-Tessy, France', responsable_ue_email: 'eu@salomon.com', coleccion: 'Trail SS2026', cuidados: 'No lavar en lavadora' },
          { sku: 'TIENDA-SAND01-38-BLC', ean: '8412345678903', marca: 'Adidas', nombre: 'Adilette Comfort', modelo: 'Adilette Comfort', categoria: 'Calzado', genero: 'Unisex', color: 'Blanco', talla: '38', material: 'EVA/Sintetico', imagen: 'https://ejemplo.com/adilette-blc.jpg', imagen_2: '', imagen_3: '', precio: '29.99', stock: '100', descripcion: '', variant_group_code: 'ADIL-BLC', pais_fabricacion: 'China', fabricante_nombre: 'adidas AG', fabricante_nombre_comercial: 'adidas', fabricante_direccion: 'Adi-Dassler-Str. 1, 91074 Herzogenaurach, Germany', fabricante_email: 'contact@adidas.com', responsable_ue_nombre: 'adidas AG', responsable_ue_direccion: 'Adi-Dassler-Str. 1, 91074 Herzogenaurach, Germany', responsable_ue_email: 'eu-compliance@adidas.com', coleccion: '', cuidados: 'Lavar con agua' }
        ],
        ropa: [
          { sku: 'TIENDA-CAM01-M-NGR', ean: '8412345679001', marca: 'Under Armour', nombre: 'Tech 2.0', modelo: 'Tech 2.0 SS', categoria: 'Ropa', genero: 'Hombre', color: 'Negro', talla: 'M', material: '100% Poliéster', imagen: 'https://ejemplo.com/ua-tech-negro.jpg', imagen_2: '', imagen_3: '', precio: '29.99', stock: '80', descripcion: '', variant_group_code: 'UATECH-NGR', pais_fabricacion: 'Jordan', fabricante_nombre: 'Under Armour Inc', fabricante_nombre_comercial: 'Under Armour', fabricante_direccion: '1020 Hull St, Baltimore, MD 21230, USA', fabricante_email: 'info@underarmour.com', responsable_ue_nombre: 'Under Armour Europe BV', responsable_ue_direccion: 'Stadionplein 10, 1076 CM Amsterdam, Netherlands', responsable_ue_email: 'eu@underarmour.com', coleccion: 'Training SS2026', cuidados: 'Lavar a máquina 30°' },
          { sku: 'TIENDA-PANT01-L-GRS', ean: '8412345679002', marca: 'Nike', nombre: 'Dri-FIT Challenger', modelo: 'Challenger 7"', categoria: 'Ropa', genero: 'Hombre', color: 'Gris', talla: 'L', material: '92% Poliéster / 8% Elastano', imagen: 'https://ejemplo.com/nike-short-gris.jpg', imagen_2: 'https://ejemplo.com/nike-short-gris-2.jpg', imagen_3: '', precio: '39.99', stock: '50', descripcion: '', variant_group_code: 'CHALL-GRS', pais_fabricacion: 'Vietnam', fabricante_nombre: 'Nike Inc', fabricante_nombre_comercial: 'Nike', fabricante_direccion: 'One Bowerman Dr, Beaverton, OR 97005, USA', fabricante_email: 'contact@nike.com', responsable_ue_nombre: 'Nike European Operations Netherlands BV', responsable_ue_direccion: 'Colosseum 1, 1213NL Hilversum, Netherlands', responsable_ue_email: 'eu-compliance@nike.com', coleccion: 'Running SS2026', cuidados: 'Lavar a máquina 30°, no usar secadora' },
          { sku: 'TIENDA-CHAQ01-S-AZL', ean: '8412345679003', marca: 'The North Face', nombre: 'Quest Jacket', modelo: 'Quest', categoria: 'Ropa', genero: 'Mujer', color: 'Azul marino', talla: 'S', material: '100% Nylon DryVent', imagen: 'https://ejemplo.com/tnf-quest-azul.jpg', imagen_2: '', imagen_3: '', precio: '119.99', stock: '15', descripcion: '', variant_group_code: 'QUEST-AZL', pais_fabricacion: 'Bangladesh', fabricante_nombre: 'The North Face (VF Corp)', fabricante_nombre_comercial: 'The North Face', fabricante_direccion: '1551 Wewatta St, Denver, CO 80202, USA', fabricante_email: 'info@thenorthface.com', responsable_ue_nombre: 'VF Northern Europe Ltd', responsable_ue_direccion: '6th Floor, 1 Tudor St, London EC4Y 0AH, UK', responsable_ue_email: 'eu@vfc.com', coleccion: 'Outdoor AW2026', cuidados: 'Lavar a máquina 30°, reaplicar DWR' }
        ],
        accesorios: [
          { sku: 'TIENDA-MOCH01-NGR', ean: '8412345680001', marca: 'Puma', nombre: 'Phase Backpack', modelo: 'Phase', categoria: 'Accesorios', genero: 'Unisex', color: 'Negro', talla: 'Talla única', material: '100% Poliéster', imagen: 'https://ejemplo.com/puma-phase-negro.jpg', imagen_2: '', imagen_3: '', precio: '24.99', stock: '60', descripcion: '', variant_group_code: 'PHASE-NGR', pais_fabricacion: 'China', fabricante_nombre: 'PUMA SE', fabricante_nombre_comercial: 'Puma', fabricante_direccion: 'PUMA Way 1, 91074 Herzogenaurach, Germany', fabricante_email: 'contact@puma.com', responsable_ue_nombre: 'PUMA SE', responsable_ue_direccion: 'PUMA Way 1, 91074 Herzogenaurach, Germany', responsable_ue_email: 'eu@puma.com', coleccion: '', cuidados: 'Limpiar con paño húmedo' },
          { sku: 'TIENDA-GORRA01-BLC', ean: '8412345680002', marca: 'Adidas', nombre: 'Baseball Cap', modelo: 'Aeroready Cap', categoria: 'Accesorios', genero: 'Unisex', color: 'Blanco', talla: 'Talla única', material: '100% Poliéster reciclado', imagen: 'https://ejemplo.com/adidas-cap-blanco.jpg', imagen_2: '', imagen_3: '', precio: '19.99', stock: '100', descripcion: '', variant_group_code: 'CAP-BLC', pais_fabricacion: 'China', fabricante_nombre: 'adidas AG', fabricante_nombre_comercial: 'adidas', fabricante_direccion: 'Adi-Dassler-Str. 1, 91074 Herzogenaurach, Germany', fabricante_email: 'contact@adidas.com', responsable_ue_nombre: 'adidas AG', responsable_ue_direccion: 'Adi-Dassler-Str. 1, 91074 Herzogenaurach, Germany', responsable_ue_email: 'eu-compliance@adidas.com', coleccion: '', cuidados: 'Lavado a mano' },
          { sku: 'TIENDA-GUANT01-M-NGR', ean: '8412345680003', marca: 'Nike', nombre: 'Academy Therma-FIT', modelo: 'Academy Gloves', categoria: 'Accesorios', genero: 'Hombre', color: 'Negro', talla: 'M', material: '95% Poliéster / 5% Elastano', imagen: 'https://ejemplo.com/nike-guantes-negro.jpg', imagen_2: '', imagen_3: '', precio: '24.99', stock: '40', descripcion: '', variant_group_code: 'GLOVE-NGR', pais_fabricacion: 'China', fabricante_nombre: 'Nike Inc', fabricante_nombre_comercial: 'Nike', fabricante_direccion: 'One Bowerman Dr, Beaverton, OR 97005, USA', fabricante_email: 'contact@nike.com', responsable_ue_nombre: 'Nike European Operations Netherlands BV', responsable_ue_direccion: 'Colosseum 1, 1213NL Hilversum, Netherlands', responsable_ue_email: 'eu-compliance@nike.com', coleccion: 'Winter 2026', cuidados: 'Lavar a máquina 30°' }
        ],
        equipamiento: [
          { sku: 'TIENDA-BALL01-5', ean: '8412345681001', marca: 'Adidas', nombre: 'Tiro League', modelo: 'Tiro League Ball', categoria: 'Equipamiento', genero: 'Unisex', color: 'Blanco/Negro', talla: '5', material: 'TPU/Caucho', imagen: 'https://ejemplo.com/adidas-tiro-ball.jpg', imagen_2: '', imagen_3: '', precio: '29.99', stock: '30', descripcion: '', variant_group_code: 'TIRO-BALL', pais_fabricacion: 'Pakistan', fabricante_nombre: 'adidas AG', fabricante_nombre_comercial: 'adidas', fabricante_direccion: 'Adi-Dassler-Str. 1, 91074 Herzogenaurach, Germany', fabricante_email: 'contact@adidas.com', responsable_ue_nombre: 'adidas AG', responsable_ue_direccion: 'Adi-Dassler-Str. 1, 91074 Herzogenaurach, Germany', responsable_ue_email: 'eu-compliance@adidas.com', coleccion: '', cuidados: 'Deshinchar para almacenar' },
          { sku: 'TIENDA-YOGA01-NGR', ean: '8412345681002', marca: 'Nike', nombre: 'Fundamental Yoga Mat', modelo: 'Fundamental Mat 3mm', categoria: 'Equipamiento', genero: 'Unisex', color: 'Negro', talla: '3mm', material: 'PVC/Poliéster', imagen: 'https://ejemplo.com/nike-yoga-mat.jpg', imagen_2: '', imagen_3: '', precio: '24.99', stock: '25', descripcion: '', variant_group_code: 'YOGA-NGR', pais_fabricacion: 'Taiwan', fabricante_nombre: 'Nike Inc', fabricante_nombre_comercial: 'Nike', fabricante_direccion: 'One Bowerman Dr, Beaverton, OR 97005, USA', fabricante_email: 'contact@nike.com', responsable_ue_nombre: 'Nike European Operations Netherlands BV', responsable_ue_direccion: 'Colosseum 1, 1213NL Hilversum, Netherlands', responsable_ue_email: 'eu-compliance@nike.com', coleccion: '', cuidados: 'Limpiar con spray antibacteriano' },
          { sku: 'TIENDA-BOTELLA01-BLC', ean: '8412345681003', marca: 'Under Armour', nombre: 'Playmaker Squeeze', modelo: 'Playmaker 950ml', categoria: 'Equipamiento', genero: 'Unisex', color: 'Blanco', talla: '950ml', material: 'Polipropileno / Silicona', imagen: 'https://ejemplo.com/ua-bottle-blanco.jpg', imagen_2: '', imagen_3: '', precio: '14.99', stock: '75', descripcion: '', variant_group_code: 'BOTTLE-BLC', pais_fabricacion: 'China', fabricante_nombre: 'Under Armour Inc', fabricante_nombre_comercial: 'Under Armour', fabricante_direccion: '1020 Hull St, Baltimore, MD 21230, USA', fabricante_email: 'info@underarmour.com', responsable_ue_nombre: 'Under Armour Europe BV', responsable_ue_direccion: 'Stadionplein 10, 1076 CM Amsterdam, Netherlands', responsable_ue_email: 'eu@underarmour.com', coleccion: '', cuidados: 'Lavaplatos seguro' }
        ]
      };
      const rows = examples[cat] || examples.calzado;
      const instructionRow = {};
      headers.forEach(h => { instructionRow[h] = instructions[h] || ''; });
      const wsData = [instructionRow, ...rows];
      const ws = XLSX.utils.json_to_sheet(wsData, { header: headers });
      const obligatorios = ['sku', 'ean', 'marca', 'nombre', 'categoria', 'genero', 'talla', 'material', 'imagen', 'pais_fabricacion', 'fabricante_nombre', 'fabricante_nombre_comercial', 'fabricante_direccion', 'fabricante_email'];
      const colWidths = headers.map(h => ({ wch: Math.max(h.length + 2, 18) }));
      ws['!cols'] = colWidths;
      headers.forEach((h, i) => {
        const col = XLSX.utils.encode_col(i);
        const cellRef = col + '1';
        if (!ws[cellRef]) ws[cellRef] = { t: 's', v: h };
        if (obligatorios.includes(h)) {
          ws[cellRef].s = { fill: { fgColor: { rgb: 'FFDDDD' } }, font: { bold: true, color: { rgb: 'CC0000' } } };
        } else {
          ws[cellRef].s = { fill: { fgColor: { rgb: 'DDFFDD' } }, font: { bold: true } };
        }
        const instrRef = col + '2';
        if (ws[instrRef]) {
          ws[instrRef].s = { font: { italic: true, color: { rgb: '666666' } }, fill: { fgColor: { rgb: 'FFF9E6' } } };
        }
      });
      const instrWs = XLSX.utils.aoa_to_sheet([
        ['INSTRUCCIONES — Plantilla Katalync para Sprinter'],
        [''],
        ['1. La fila 2 (amarilla) contiene instrucciones para cada columna. BÓRRALA antes de subir.'],
        ['2. Las columnas con header ROJO son OBLIGATORIAS.'],
        ['3. Las columnas con header VERDE son opcionales pero recomendadas.'],
        ['4. Cada fila = una variante (talla/color). Agrupa variantes con variant_group_code.'],
        ['5. Las imágenes deben ser URLs públicas (no Google Drive ni Dropbox).'],
        ['6. Katalync convertirá las imágenes a formato 2:3 automáticamente.'],
        ['7. Los campos GPSR (fabricante_*) son OBLIGATORIOS por normativa europea.'],
        ['8. El EAN debe ser un código de barras válido de 13 dígitos.'],
        ['9. Usa punto (.) como separador decimal en precios: 129.99'],
        ['10. Puedes dejar vacío el campo descripcion — Katalync lo genera automáticamente.'],
        [''],
        ['Campos GPSR obligatorios:'],
        ['- pais_fabricacion: País donde se fabrica el producto'],
        ['- fabricante_nombre: Razón social del fabricante'],
        ['- fabricante_nombre_comercial: Nombre comercial registrado'],
        ['- fabricante_direccion: Dirección postal completa'],
        ['- fabricante_email: Email de contacto del fabricante'],
        [''],
        ['Campos GPSR opcionales (necesarios para campañas/promociones):'],
        ['- responsable_ue_nombre: Persona responsable en la UE'],
        ['- responsable_ue_direccion: Dirección del responsable en la UE'],
        ['- responsable_ue_email: Email del responsable en la UE'],
        [''],
        ['¿Dudas? Usa el chatbot Ana en la app o contacta alberto@prometeix.com']
      ]);
      instrWs['!cols'] = [{ wch: 80 }];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos');
      XLSX.utils.book_append_sheet(wb, instrWs, this.t('tpl_sheet_instructions'));
      const catName = { calzado: 'calzado', ropa: 'ropa', accesorios: 'accesorios', equipamiento: 'equipamiento' };
      XLSX.writeFile(wb, 'plantilla_katalync_' + (catName[cat] || cat) + '.xlsx');
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

    buildSprinterXlsx(headerRows, dataRows) {
      const displayNames = headerRows[0];
      const apiCodes = headerRows[1];
      const ws = XLSX.utils.aoa_to_sheet([displayNames]);
      for (const row of dataRows) {
        const arr = apiCodes.map(code => row[code] || '');
        XLSX.utils.sheet_add_aoa(ws, [arr], { origin: -1 });
      }
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      const xlsxData = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
      return xlsxData;
    },

    saveToHistory(tool, filename, count, url, marketplace) {
      const entry = { tool, filename: filename || 'archivo.csv', date: new Date().toLocaleDateString(this.lang === 'pt' ? 'pt-PT' : 'es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }), count: count || 0, url: url || '', marketplace: marketplace || '' };
      this.historyJobs.unshift(entry);
      if (this.historyJobs.length > 20) this.historyJobs = this.historyJobs.slice(0, 20);
      safeSaveHistory(this.historyJobs);
    },
    makeBlobUrl(base64, mime) { const raw = atob(base64); const bytes = new Uint8Array(raw.length); for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i); return URL.createObjectURL(new Blob([bytes], { type: mime || 'text/csv;charset=utf-8' })); },

    templateCategory: 'calzado',
    catalogStep: 'upload', catalogMarketplace: 'sprinter_es', catalogRatio: '2:3', catalogGenDesc: true, catalogGenTitle: true, catalogConvertImages: true, catalogRemoveBg: false,
    catalogShipmentOrigin: 'ES', catalogVatPct: 'ES-21%,PT-23%', catalogOfferState: 'Nuevo',
    catalogFile: null, catalogRows: [], catalogCols: [], catalogTotalProducts: 0, catalogLog: [],
    showCatalogErrors: false, healthReport: null, showHealthDetail: false,
    catalogBatchCurrent: 0, catalogBatchTotal: 0, catalogProgress: 0,
    catalogResults: { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '', productsUrl: '', productsFilename: '', offersUrl: '', offersFilename: '' },
    handleCatalogDrop(event) { event.currentTarget.classList.remove('dragover'); const file = event.dataTransfer.files[0]; if (file && this.isValidExcel(file)) { this.catalogFile = file; this.loadCatalogExcel(file); } },
    handleCatalogSelect(event) { const file = event.target.files[0]; if (file) { this.catalogFile = file; this.loadCatalogExcel(file); } },
    async loadCatalogExcel(file) { const rows = await this.parseExcel(file); this.catalogRows = rows; this.catalogCols = rows.length > 0 ? Object.keys(rows[0]) : []; },
    _normalizeRows(rows) {
      const apiCodeValues = new Set(SPRINTER_PRODUCTS_HEADERS[1]);
      return rows.filter(row => {
        const vals = Object.values(row).map(v => String(v).trim());
        const matchCount = vals.filter(v => apiCodeValues.has(v)).length;
        return matchCount < 10;
      }).map(row => {
        const mapped = {};
        for (const [key, val] of Object.entries(row)) {
          const target = SPRINTER_INPUT_MAP[key] || key;
          mapped[target] = val;
        }
        return mapped;
      });
    },
    async startCatalogProcessing() {
      if (!this.catalogFile || this.catalogRows.length === 0) return;
      this.requestNotifPermission();
      this.catalogStep = 'processing'; this.catalogLog = [];
      const normalizedRows = this._normalizeRows(this.catalogRows);
      this.catalogTotalProducts = normalizedRows.length;
      if (normalizedRows.length === 0) { this.addLog(this.catalogLog, 'catalogLogContainer', 'error', this.t('no_valid_products') || 'No valid products found'); return; }
      if (normalizedRows.length > MAX_PRODUCTS_PER_REQUEST) { this.addLog(this.catalogLog, 'catalogLogContainer', 'error', this.t('max_products_error').replace('{max}', MAX_PRODUCTS_PER_REQUEST).replace('{count}', normalizedRows.length)); return; }
      this.addLog(this.catalogLog, 'catalogLogContainer', 'info', normalizedRows.length + ' ' + this.t('log_products_read'));
      this.addLog(this.catalogLog, 'catalogLogContainer', 'info', this.t('log_marketplace') + ' ' + this.catalogMarketplace + ' | Ratio: ' + this.catalogRatio);
      const BATCH_SIZE = 50;
      const batches = [];
      for (let i = 0; i < normalizedRows.length; i += BATCH_SIZE) batches.push(normalizedRows.slice(i, i + BATCH_SIZE));
      this.catalogBatchTotal = batches.length;
      this.catalogBatchCurrent = 0;
      this.catalogProgress = 0;
      let allProductRows = [], allOfferRows = [], allPreviews = [], allErrors = [];
      let totalSuccess = 0, totalErrors = 0;
      let csvFilename = '', productsFilename = '', offersFilename = '', lastCsvBase64 = '';
      this.addLog(this.catalogLog, 'catalogLogContainer', 'info', this.t('log_sending') + (batches.length > 1 ? (' (' + batches.length + ' lotes)') : ''));
      for (let b = 0; b < batches.length; b++) {
        this.catalogBatchCurrent = b + 1;
        this.catalogProgress = Math.round((b / batches.length) * 100);
        if (batches.length > 1) this.addLog(this.catalogLog, 'catalogLogContainer', 'info', (this.lang === 'pt' ? 'Lote' : 'Lote') + ' ' + (b + 1) + '/' + batches.length + ' (' + batches[b].length + ' productos)...');
        try {
          const resp = await fetch(N8N_BASE + '/webhook/catalog-process', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.catalogMarketplace, ratio: this.catalogRatio, generateDescriptions: this.catalogGenDesc, generateTitles: this.catalogGenTitle, convertImages: this.catalogConvertImages, removeBg: this.catalogRemoveBg, shipmentOrigin: this.catalogShipmentOrigin, vatPct: this.catalogVatPct, offerState: this.catalogOfferState, outputFormat: 'sprinter_mirakl', products: batches[b] }) });
          if (!resp.ok) throw new Error('Server error ' + resp.status);
          const result = await resp.json();
          if (result.status === 'error') throw new Error(result.message || 'Server error');
          if (result.sprinterProductRows) allProductRows.push(...result.sprinterProductRows);
          if (result.sprinterOfferRows) allOfferRows.push(...result.sprinterOfferRows);
          if (result.products) allPreviews.push(...result.products);
          if (result.errorList) allErrors.push(...result.errorList);
          totalSuccess += result.success || 0;
          totalErrors += result.errors || 0;
          if (result.productsFilename) productsFilename = result.productsFilename;
          if (result.offersFilename) offersFilename = result.offersFilename;
          if (result.csvFilename) csvFilename = result.csvFilename;
          if (result.csvBase64) lastCsvBase64 = result.csvBase64;
          if (batches.length > 1) this.addLog(this.catalogLog, 'catalogLogContainer', 'info', '✓ ' + (this.lang === 'pt' ? 'Lote' : 'Lote') + ' ' + (b + 1) + ': ' + (result.success || 0) + ' OK' + (result.errors > 0 ? (', ' + result.errors + ' errores') : ''));
        } catch (err) {
          totalErrors += batches[b].length;
          this.addLog(this.catalogLog, 'catalogLogContainer', 'error', '✗ ' + (this.lang === 'pt' ? 'Lote' : 'Lote') + ' ' + (b + 1) + ': ' + err.message);
        }
      }
      this.catalogProgress = 100;
      this.addLog(this.catalogLog, 'catalogLogContainer', 'info', (this.t('log_completed') || 'Completed') + ': ' + totalSuccess + ' OK, ' + totalErrors + ' errors');
      if (totalErrors > 0) this.addLog(this.catalogLog, 'catalogLogContainer', 'error', totalErrors + ' ' + this.t('log_products_with_errors'));
      const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      let excelUrl = '#'; if (lastCsvBase64) excelUrl = this.makeBlobUrl(lastCsvBase64);
      let productsUrl = '#', productsB64 = '';
      let offersUrl = '#', offersB64 = '';
      if (allProductRows.length > 0) {
        productsB64 = this.buildSprinterXlsx(SPRINTER_PRODUCTS_HEADERS, allProductRows);
        productsUrl = this.makeBlobUrl(productsB64, xlsxMime);
      }
      if (allOfferRows.length > 0) {
        offersB64 = this.buildSprinterXlsx(SPRINTER_OFFERS_HEADERS, allOfferRows);
        offersUrl = this.makeBlobUrl(offersB64, xlsxMime);
      }
      productsFilename = productsFilename || 'productos_sprinter.xlsx';
      offersFilename = offersFilename || 'ofertas_sprinter.xlsx';
      csvFilename = csvFilename || 'catalogo.csv';
      this.catalogResults = { success: totalSuccess, errors: totalErrors, previews: allPreviews, errorList: allErrors, excelUrl, csvFilename, productsUrl, productsFilename, offersUrl, offersFilename };
      this.saveToHistory('catalog', productsFilename, totalSuccess, productsUrl !== '#' ? productsUrl : excelUrl, this.catalogMarketplace);
      this.saveFileToAccount('catalog', productsFilename, totalSuccess, productsB64 || lastCsvBase64, this.catalogMarketplace);
      this.sendBrowserNotif(this.t('notif_catalog_done'), totalSuccess + ' ' + this.t('products_ok'));
      this.createServerNotification(this.t('notif_catalog_done') + ': ' + totalSuccess + ' ' + this.t('products_ok'));
      const combinedResult = { success: totalSuccess, errors: totalErrors, sprinterProductRows: allProductRows, sprinterOfferRows: allOfferRows, products: allPreviews, errorList: allErrors };
      this.healthReport = this.generateHealthReport(combinedResult, normalizedRows);
      try { localStorage.setItem('kt_last_health', JSON.stringify(this.healthReport)); } catch(e) {}
      this.catalogStep = 'results';
    },
    resetCatalog() { this.catalogStep = 'upload'; this.catalogFile = null; this.catalogRows = []; this.catalogCols = []; this.catalogTotalProducts = 0; this.catalogLog = []; this.showCatalogErrors = false; this.healthReport = null; this.showHealthDetail = false; this.catalogBatchCurrent = 0; this.catalogBatchTotal = 0; this.catalogProgress = 0; this.catalogResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '', productsUrl: '', productsFilename: '', offersUrl: '', offersFilename: '' }; },

    generateHealthReport(result, inputRows) {
      const total = inputRows.length || 1;
      const checks = [];
      const mandatory = [
        { key: 'sku', label: 'SKU', aliases: ['sku', 'SKU', 'referencia', 'sku-de-vendedor'] },
        { key: 'ean', label: 'EAN', aliases: ['ean', 'EAN', 'ean13', 'product-id'] },
        { key: 'marca', label: 'Marca', aliases: ['marca', 'brand', 'marcas'] },
        { key: 'nombre', label: 'Nombre', aliases: ['nombre', 'name', 'product_name', 'nombre-del-articulo'] },
        { key: 'categoria', label: 'Categoría', aliases: ['categoria', 'category', 'categorias', 'Tipo de producto'] },
        { key: 'genero', label: 'Género', aliases: ['genero', 'gender', 'Sexo'] },
        { key: 'talla', label: 'Talla', aliases: ['talla', 'size'] },
        { key: 'material', label: 'Material', aliases: ['material', 'composicion', 'material-composicion'] },
        { key: 'imagen', label: 'Imagen principal', aliases: ['imagen', 'image_url', 'imageUrl', 'foto', 'URL Imagen', 'imagenes-1'] },
        { key: 'pais', label: 'País fabricación', aliases: ['pais_fabricacion', 'pais fabricacion', 'pais-fabricante'] },
        { key: 'fab_nombre', label: 'Fabricante nombre', aliases: ['fabricante_nombre', 'nombre-del-fabricante'] },
        { key: 'fab_nombre_com', label: 'Fabricante nombre comercial', aliases: ['fabricante_nombre_comercial', 'nombre-comercial-registrado-del-fabricante'] },
        { key: 'fab_direccion', label: 'Fabricante dirección', aliases: ['fabricante_direccion', 'direccion-del-fabricante'] },
        { key: 'fab_email', label: 'Fabricante email', aliases: ['fabricante_email', 'correo-electronico-del-fabricante'] },
      ];
      let score = 100;
      const recommendations = [];
      const availableKeys = inputRows.length > 0 ? Object.keys(inputRows[0]) : [];
      const availableKeysLow = availableKeys.map(k => k.toLowerCase().trim());
      for (const field of mandatory) {
        const matchedKey = availableKeys.find(ak => field.aliases.some(alias => ak.toLowerCase().trim() === alias.toLowerCase()));
        if (!matchedKey) {
          checks.push({ field: field.label, status: 'missing', count: 0, total, pct: 0 });
          score -= 5;
          continue;
        }
        let filled = 0;
        for (const row of inputRows) {
          const val = row[matchedKey];
          if (val && String(val).trim()) filled++;
        }
        const pct = Math.round((filled / total) * 100);
        checks.push({ field: field.label, status: pct === 100 ? 'ok' : pct >= 80 ? 'warn' : 'error', count: filled, total, pct });
        if (pct < 100) score -= Math.round((100 - pct) / 20);
      }
      let withImg2 = 0, withImg3 = 0;
      for (const row of inputRows) {
        const keys = Object.keys(row);
        const img2Key = keys.find(k => k.toLowerCase().match(/imagen.?2|image.?2|imagenes.?2/));
        const img3Key = keys.find(k => k.toLowerCase().match(/imagen.?3|image.?3|imagenes.?3/));
        if (img2Key && row[img2Key] && String(row[img2Key]).trim()) withImg2++;
        if (img3Key && row[img3Key] && String(row[img3Key]).trim()) withImg3++;
      }
      const img2Pct = Math.round((withImg2 / total) * 100);
      const img3Pct = Math.round((withImg3 / total) * 100);
      if (img2Pct < 80) recommendations.push({ impact: 'high', text: this.lang === 'es' ? `Añade imagen 2 a ${total - withImg2} productos — mejora la conversión un 35% en Sprinter` : `Adicione imagem 2 a ${total - withImg2} produtos — melhora a conversão 35% no Sprinter` });
      if (img3Pct < 50) recommendations.push({ impact: 'medium', text: this.lang === 'es' ? `Añade imagen 3 a ${total - withImg3} productos para una ficha más completa` : `Adicione imagem 3 a ${total - withImg3} produtos para uma ficha mais completa` });
      if (result.errors > 0) {
        score -= result.errors * 3;
        recommendations.push({ impact: 'high', text: this.lang === 'es' ? `${result.errors} productos con errores — revisa los campos obligatorios antes de subir` : `${result.errors} produtos com erros — revise os campos obrigatórios antes de enviar` });
      }
      const descKey = inputRows.length > 0 ? Object.keys(inputRows[0]).find(k => k.toLowerCase().match(/desc/)) : null;
      if (descKey) {
        const withDesc = inputRows.filter(r => r[descKey] && String(r[descKey]).trim().length > 10).length;
        const descPct = Math.round((withDesc / total) * 100);
        if (descPct < 80) recommendations.push({ impact: 'medium', text: this.lang === 'es' ? `Completa la descripción en ${total - withDesc} productos — Mirakl lo muestra en la ficha` : `Complete a descrição em ${total - withDesc} produtos — Mirakl mostra-a na ficha` });
      }
      const gpsrResponsable = ['nombre-persona-responsable-en-eu', 'direccion-de-la-persona-responsable', 'correo-electronico-de-la-persona-responsable', 'responsable_ue_nombre', 'responsable_ue_direccion', 'responsable_ue_email'];
      let gpsrFound = 0;
      for (const gf of ['nombre-persona-responsable-en-eu', 'direccion-de-la-persona-responsable', 'correo-electronico-de-la-persona-responsable']) {
        if (availableKeysLow.some(k => k === gf || k.replace(/[\s_-]/g, '') === gf.replace(/[\s_-]/g, ''))) gpsrFound++;
      }
      if (gpsrFound === 0) {
        for (const gf of ['responsable_ue_nombre', 'responsable_ue_direccion', 'responsable_ue_email']) {
          if (availableKeysLow.some(k => k.replace(/[\s_-]/g, '') === gf.replace(/[\s_-]/g, ''))) gpsrFound++;
        }
      }
      if (gpsrFound < 3) recommendations.push({ impact: 'medium', text: this.lang === 'es' ? `Falta GPSR Responsable UE (${3 - gpsrFound} campos) — obligatorio para campañas y promociones` : `Falta GPSR Responsável UE (${3 - gpsrFound} campos) — obrigatório para campanhas e promoções` });
      score = Math.max(0, Math.min(100, score));
      return { score, checks, recommendations: recommendations.slice(0, 5), totalProducts: total, successProducts: result.success || 0, errorProducts: result.errors || 0, img2Pct, img3Pct };
    },

    downloadHealthReport() {
      if (!this.healthReport) return;
      const r = this.healthReport;
      const scoreColor = r.score >= 80 ? '#10b981' : r.score >= 50 ? '#f59e0b' : '#ef4444';
      const checksHtml = r.checks.map(c => {
        const icon = c.status === 'ok' ? '&#10004;' : c.status === 'warn' ? '&#9888;' : '&#10008;';
        const color = c.status === 'ok' ? '#10b981' : c.status === 'warn' ? '#f59e0b' : '#ef4444';
        return `<tr><td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;"><span style="color:${color};font-size:16px;margin-right:8px;">${icon}</span>${c.field}</td><td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:center;font-weight:600;">${c.pct}%</td><td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;color:#64748b;">${c.count}/${c.total}</td></tr>`;
      }).join('');
      const recsHtml = r.recommendations.map(rec => `<div style="padding:12px 16px;background:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;margin-bottom:8px;font-size:14px;color:#78350f;">${rec.text}</div>`).join('');
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Informe de Salud — Katalync</title></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:700px;margin:0 auto;padding:40px 24px;color:#0f172a;background:#fff;">
<div style="text-align:center;margin-bottom:32px;"><h1 style="font-size:24px;margin:0 0 4px;">Informe de Salud del Catálogo</h1><p style="color:#64748b;font-size:14px;margin:0;">Generado por Katalync — ${new Date().toLocaleDateString()}</p></div>
<div style="text-align:center;margin-bottom:32px;"><div style="display:inline-block;width:120px;height:120px;border-radius:50%;border:8px solid ${scoreColor};display:flex;align-items:center;justify-content:center;"><span style="font-size:42px;font-weight:700;color:${scoreColor};">${r.score}</span></div><p style="margin-top:8px;font-size:14px;color:#64748b;">/100</p></div>
<div style="display:flex;gap:16px;margin-bottom:32px;justify-content:center;"><div style="text-align:center;padding:16px 24px;background:#f0fdf4;border-radius:12px;"><div style="font-size:24px;font-weight:700;color:#10b981;">${r.successProducts}</div><div style="font-size:12px;color:#64748b;">Productos OK</div></div><div style="text-align:center;padding:16px 24px;background:#fef2f2;border-radius:12px;"><div style="font-size:24px;font-weight:700;color:#ef4444;">${r.errorProducts}</div><div style="font-size:12px;color:#64748b;">Con errores</div></div><div style="text-align:center;padding:16px 24px;background:#f0f9ff;border-radius:12px;"><div style="font-size:24px;font-weight:700;color:#0ea5e9;">${r.img2Pct}%</div><div style="font-size:12px;color:#64748b;">Con imagen 2</div></div></div>
<h2 style="font-size:18px;margin-bottom:12px;">Checklist de campos</h2>
<table style="width:100%;border-collapse:collapse;margin-bottom:32px;"><thead><tr style="background:#f8fafc;"><th style="padding:10px 12px;text-align:left;font-size:13px;color:#64748b;">Campo</th><th style="padding:10px 12px;text-align:center;font-size:13px;color:#64748b;">Completitud</th><th style="padding:10px 12px;text-align:left;font-size:13px;color:#64748b;">Detalle</th></tr></thead><tbody>${checksHtml}</tbody></table>
${recsHtml ? '<h2 style="font-size:18px;margin-bottom:12px;">Recomendaciones</h2>' + recsHtml : ''}
<div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;">Generado por Katalync — katalync.com</div>
</body></html>`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'informe_salud_katalync_' + new Date().toISOString().slice(0, 10) + '.html';
      a.click(); URL.revokeObjectURL(url);
    },

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
        const resp = await fetch(N8N_BASE + '/webhook/price-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.priceMarketplace, includeDiscount: this.priceIncludeDiscount, promoTag: this.pricePromoTag.trim(), shipmentOrigin: this.catalogShipmentOrigin, vatPct: this.catalogVatPct, outputFormat: 'sprinter_mirakl', products: this.priceRows }) });
        if (!resp.ok) throw new Error(this.t('log_server_error'));
        const result = await resp.json();
        if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
        this.addLog(this.priceLog, 'priceLogContainer', 'info', result.message || this.t('log_completed'));
        if (result.errors > 0) this.addLog(this.priceLog, 'priceLogContainer', 'error', result.errors + ' ' + this.t('log_products_with_errors'));
        let excelUrl = '#'; if (result.csvBase64) excelUrl = this.makeBlobUrl(result.csvBase64);
        let offersUrl = ''; let offersFilename = '';
        const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (result.sprinterOfferRows && result.sprinterOfferRows.length > 0) {
          const b64 = this.buildSprinterXlsx(SPRINTER_OFFERS_HEADERS, result.sprinterOfferRows);
          offersUrl = this.makeBlobUrl(b64, xlsxMime);
          offersFilename = result.offersFilename || 'ofertas_sprinter.xlsx';
        }
        this.priceResults = { success: result.success || 0, errors: result.errors || 0, previews: result.products || [], errorList: result.errorList || [], excelUrl, csvFilename: result.csvFilename || 'precios.csv', offersUrl, offersFilename };
        this.saveToHistory('prices', offersFilename || result.csvFilename, result.success, offersUrl || excelUrl, this.priceMarketplace);
        this.saveFileToAccount('prices', result.csvFilename, result.success, result.csvBase64, this.priceMarketplace);
        this.sendBrowserNotif(this.t('notif_prices_done'), (result.success || 0) + ' ' + this.t('products_ok'));
        this.createServerNotification(this.t('notif_prices_done') + ': ' + (result.success || 0) + ' ' + this.t('products_ok'));
        this.priceStep = 'results';
      } catch (err) { this.addLog(this.priceLog, 'priceLogContainer', 'error', 'Error: ' + err.message); }
    },
    resetPrices() { this.priceStep = 'upload'; this.priceFile = null; this.priceRows = []; this.priceCols = []; this.priceTotalProducts = 0; this.priceLog = []; this.showPriceErrors = false; this.pricePromoTag = ''; this.priceResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '', offersUrl: '', offersFilename: '' }; },

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
        const resp = await fetch(N8N_BASE + '/webhook/stock-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: this.authToken, marketplace: this.stockMarketplace, outputFormat: 'sprinter_mirakl', shipmentOrigin: this.catalogShipmentOrigin, vatPct: this.catalogVatPct, products: this.stockRows }) });
        if (!resp.ok) throw new Error(this.t('log_server_error'));
        const result = await resp.json();
        if (result.status === 'error') throw new Error(result.message || this.t('log_server_error'));
        this.addLog(this.stockLog, 'stockLogContainer', 'info', result.message || this.t('log_completed'));
        if (result.errors > 0) this.addLog(this.stockLog, 'stockLogContainer', 'error', result.errors + ' ' + this.t('log_products_with_errors'));
        let excelUrl = '#'; if (result.csvBase64) excelUrl = this.makeBlobUrl(result.csvBase64);
        let offersUrl = ''; let offersFilename = '';
        const xlsxMime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (result.sprinterOfferRows && result.sprinterOfferRows.length > 0) {
          const b64 = this.buildSprinterXlsx(SPRINTER_OFFERS_HEADERS, result.sprinterOfferRows);
          offersUrl = this.makeBlobUrl(b64, xlsxMime);
          offersFilename = result.offersFilename || 'stock_sprinter.xlsx';
        }
        this.stockResults = { success: result.success || 0, errors: result.errors || 0, previews: result.products || [], errorList: result.errorList || [], excelUrl, csvFilename: result.csvFilename || 'stock.csv', offersUrl, offersFilename };
        this.saveToHistory('stock', offersFilename || result.csvFilename, result.success, offersUrl || excelUrl, this.stockMarketplace);
        this.saveFileToAccount('stock', result.csvFilename, result.success, result.csvBase64, this.stockMarketplace);
        this.sendBrowserNotif(this.t('notif_stock_done'), (result.success || 0) + ' ' + this.t('products_ok'));
        this.createServerNotification(this.t('notif_stock_done') + ': ' + (result.success || 0) + ' ' + this.t('products_ok'));
        this.stockStep = 'results';
      } catch (err) { this.addLog(this.stockLog, 'stockLogContainer', 'error', 'Error: ' + err.message); }
    },
    resetStock() { this.stockStep = 'upload'; this.stockFile = null; this.stockRows = []; this.stockCols = []; this.stockTotalProducts = 0; this.stockLog = []; this.showStockErrors = false; this.stockResults = { success: 0, errors: 0, previews: [], errorList: [], excelUrl: '', csvFilename: '', offersUrl: '', offersFilename: '' }; },

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
}
  