export const SPRINTER_PRODUCTS_HEADERS = [
  ['Categorías','Sku de vendedor','Nombre del articulo','PT - Nombre Del Articulo','Subtitulo de Productos','GPSR - Pais Fabricacion','Marcas','Genero','EAN','Descripcion del producto','Cuidados','Imagen  1','Imagenes 2','Imagenes 3','Imagenes 4','Video','Guia de Tallas','PT - Cuidados','PT - Descripción Del Producto','GPSR - PT - País Fabricación','PT - Subtitulo de productos','GPSR - Nombre Del Fabricante','GPSR - Nombre Comercial Registrado Del Fabricante','GPSR - Dirección Del Fabricante','GPSR - Correo Electrónico Del Fabricante','GPSR - Nombre de la Persona Responsable en la EU','GPSR - Dirección de la Persona Responsable','GPSR - Correo Electrónico De La Persona Responsable','GPSR - Foto De La Etiqueta Del Producto','GPSR - Avisos y/o Manual de Seguridad Del Producto','Colores','Talla','Colecciones','Material Composicion','Variant Group Code','Consejos de Utilizacion','Impermeable','Informacion Tecnica','PT - Consejos de uso','PT - Información Tecnica','PT - Composición Del Material','PT - Colecciones'],
  ['categorias','sku-de-vendedor','nombre-del-articulo','nombre-del-articulo-pt','subtitulo-de-productos','pais-fabricante','marcas','genero','ean','descripion-del-producto','cuidados','imagenes-1','imagenes-2','imagenes-3','imagenes-4','video','guia-de-tallas','cuidados-pt','descripion-del-producto-pt','pais-fabricante-pt','subtitulo-de-productos-pt','nombre-del-fabricante','nombre-comercial-registrado-del-fabricante','direccion-del-fabricante','correo-electronico-del-fabricante','nombre-persona-responsable-en-eu','direccion-de-la-persona-responsable','correo-electronico-de-la-persona-responsable','foto-etiqueta-del-producto','manual-de-seguridad-del-producto','colores','talla','colecciones','material-composicion','variant_group_code','consejos-de-utilizacion','impermeable','informacion-tecnica','consejos-de-utilizacion-pt','informacion-tecnica-pt','material-composicion-pt','colecciones-pt']
];

export const SPRINTER_OFFERS_HEADERS = [
  ['SKU de oferta','ID de producto','Tipo de ID de producto','Descripción de la oferta','Descripción interna de la oferta','Precio de la oferta','Información adicional sobre el precio de la oferta','Cantidad de la oferta','Alerta de cantidad mínima','Estado de la oferta','Fecha de inicio de la disponibilidad','Fecha de finalización de la disponibilidad','Clase logística','Rango de favorita','Precio de descuento','Fecha de inicio del descuento','Fecha de finalización del descuento','Rangos de descuento','Plazo de envío (en días)','Actualizar/Eliminar','Precio de oferta por canal INIT','Precio de descuento por canal INIT','Fecha de inicio del descuento para el canal INIT','Fecha de fin del descuento para el canal INIT','Rangos de descuentos para el canal INIT','Shipment Origin','% of VAT'],
  ['sku','product-id','product-id-type','description','internal-description','price','price-additional-info','quantity','min-quantity-alert','state','available-start-date','available-end-date','logistic-class','favorite-rank','discount-price','discount-start-date','discount-end-date','discount-ranges','leadtime-to-ship','update-delete','price[channel=INIT]','discount-price[channel=INIT]','discount-start-date[channel=INIT]','discount-end-date[channel=INIT]','discount-ranges[channel=INIT]','shipment-origin','vat-percentage']
];

export const SPRINTER_INPUT_MAP = {
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

export const N8N_WEBHOOK_BASE = (window.__CT_API_BASE || '');

export const MAX_PRODUCTS_PER_REQUEST = 10000;
export const MAX_FILE_SIZE_MB = 15;

export const _rateLimiter = {
  attempts: {},
  check(key, maxAttempts, windowMs) {
    const now = Date.now();
    if (!this.attempts[key]) this.attempts[key] = [];
    this.attempts[key] = this.attempts[key].filter(t => now - t < windowMs);
    if (this.attempts[key].length >= maxAttempts) return false;
    this.attempts[key].push(now);
    return true;
  }
};
