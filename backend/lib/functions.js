const INPUT_MAP = {
  'sku': 'sku-de-vendedor', 'SKU': 'sku-de-vendedor', 'Sku': 'sku-de-vendedor', 'referencia': 'sku-de-vendedor', 'Referencia': 'sku-de-vendedor',
  'ean': 'ean', 'EAN': 'ean', 'ean13': 'ean', 'product-id': 'ean', 'product_id': 'ean',
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
  'precio': '_price', 'Precio': '_price', 'price': '_price', 'Price': '_price', 'PVP': '_price',
  'stock': '_quantity', 'Stock': '_quantity', 'quantity': '_quantity', 'cantidad': '_quantity',
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
  'discount-price': '_discount-price', 'discount_price': '_discount-price', 'precio_descuento': '_discount-price',
  'discount-start-date': '_discount-start-date', 'discount-end-date': '_discount-end-date',
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
  'nombre-persona-responsable-en-eu': 'nombre-persona-responsable-en-eu',
  'direccion-de-la-persona-responsable': 'direccion-de-la-persona-responsable',
  'correo-electronico-de-la-persona-responsable': 'correo-electronico-de-la-persona-responsable',
  'foto-etiqueta-del-producto': 'foto-etiqueta-del-producto',
  'manual-de-seguridad-del-producto': 'manual-de-seguridad-del-producto',
  'video': 'video', 'guia-de-tallas': 'guia-de-tallas',
  'colecciones': 'colecciones', 'cuidados': 'cuidados',
  'Categorías': 'categorias', 'Sku de vendedor': 'sku-de-vendedor', 'Nombre del articulo': 'nombre-del-articulo',
  'PT - Nombre Del Articulo': 'nombre-del-articulo-pt', 'Subtitulo de Productos': 'subtitulo-de-productos',
  'GPSR - Pais Fabricacion': 'pais-fabricante', 'Marcas': 'marcas',
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
  'PT - Colecciones': 'colecciones-pt',
  'material-composicion': 'material-composicion', 'talla': 'talla', 'genero': 'genero', 'ean': 'ean',
  'material-composicion-pt': 'material-composicion-pt', 'colecciones-pt': 'colecciones-pt',
  'consejos-de-utilizacion': 'consejos-de-utilizacion', 'consejos-de-utilizacion-pt': 'consejos-de-utilizacion-pt',
  'informacion-tecnica': 'informacion-tecnica', 'informacion-tecnica-pt': 'informacion-tecnica-pt',
  'descripion-del-producto-pt': 'descripion-del-producto-pt', 'cuidados-pt': 'cuidados-pt',
  'variant_group_code': 'variant_group_code', 'impermeable': 'impermeable'
};

function mapInputRow(row) {
  const mapped = {};
  for (const [key, val] of Object.entries(row)) {
    const target = INPUT_MAP[key] || key;
    if (val !== undefined && val !== null && String(val).trim() !== '') mapped[target] = String(val).trim();
  }
  return mapped;
}

function removeAccents(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function categoryToSlug(input) {
  if (!input) return '';
  const norm = removeAccents(input.toLowerCase().trim());
  const parentMap = {
    'calzado': 'calzado', 'ropa': 'ropa',
    'equipamiento accesorios': 'equipamiento_accesorios', 'equipamiento': 'equipamiento_accesorios',
    'nutricion': 'nutricion', 'cuidados del deportista': 'cuidados_del_deportista',
    'experiencias multiaventura': 'experiencias_multiaventura'
  };
  for (const prefix of Object.keys(parentMap).sort((a, b) => b.length - a.length)) {
    if (norm.startsWith(prefix + ' ')) {
      const rest = norm.slice(prefix.length + 1).replace(/ /g, '_');
      return parentMap[prefix] + '-' + rest;
    }
    if (norm === prefix) return parentMap[prefix];
  }
  return norm.replace(/ /g, '_');
}

const TYPE_KEYWORDS_DETECT = [
  ['chancla cogida atras', 'Chancla'], ['chancla cogido atras', 'Chancla'],
  ['chancla cog. atras', 'Chancla'], ['chancla cog. atr.', 'Chancla'],
  ['chancla pala', 'Chancla'], ['chancla sandalia', 'Chancla'], ['chancla', 'Chancla'],
  ['sandalia', 'Sandalia'],
  ['ag taco cesped artificial', 'Bota'], ['ag taco cesped artifi', 'Bota'],
  ['ag taco', 'Bota'], ['taco ag', 'Bota'], ['hg taco', 'Bota'],
  ['taco', 'Bota'],
  ['turf velcro', 'Zapatilla'], ['turf cordon', 'Zapatilla'], ['turf cordón', 'Zapatilla'],
  ['turf velc', 'Zapatilla'], ['turf', 'Zapatilla'],
  ['balon sala', 'Balón'], ['balon', 'Balón'],
  ['sala velcro', 'Zapatilla'], ['sala', 'Zapatilla'],
  ['trail', 'Zapatilla'],
  ['placa carbono', 'Zapatilla'],
  ['espinilleras con media', 'Espinillera'], ['espinillera media', 'Espinillera'], ['espinilleras', 'Espinillera'],
  ['guante portero proteccion', 'Guante'], ['guante portero', 'Guante'],
  ['codera/rodillera', 'Protección'], ['codera acolchada', 'Codera'],
  ['rodillera acolchada', 'Rodillera'], ['rodillera', 'Rodillera'], ['codera', 'Codera'],
  ['chubasquero', 'Chubasquero'],
  ['sudadera con cremallera', 'Sudadera'], ['sudadera licra gorro', 'Sudadera'],
  ['sudadera spandex gorro', 'Sudadera'], ['sudadera', 'Sudadera'],
  ['camiseta manga corta', 'Camiseta'], ['camiseta', 'Camiseta'],
  ['pantalon pitillo', 'Pantalón'], ['pantalon', 'Pantalón'],
  ['chandal poliester elast', 'Chándal'], ['chandal polieste', 'Chándal'], ['chandal', 'Chándal'],
  ['conjunto', 'Conjunto'],
  ['malla corta licra', 'Malla'], ['malla larga licra', 'Malla'], ['malla', 'Malla'],
  ['gymsack', 'Bolsa'],
  ['bañador', 'Bañador'], ['banador', 'Bañador'],
  ['calcetines', 'Calcetín'], ['calcetin', 'Calcetín'],
  ['polo', 'Polo'], ['polos', 'Polo'],
  ['chaleco', 'Chaleco'], ['chalecos', 'Chaleco'],
  ['chaqueta', 'Chaqueta'], ['chaquetas', 'Chaqueta'],
  ['cortavientos', 'Cortavientos'],
  ['gorra', 'Gorra'], ['gorras', 'Gorra'], ['gorro', 'Gorro'], ['gorros', 'Gorro'],
  ['mochila', 'Mochila'], ['mochilas', 'Mochila'],
  ['guantes', 'Guante'],
  ['gafas', 'Gafa'],
  ['bikini', 'Bikini'],
  ['neopreno', 'Neopreno'], ['neoprenos', 'Neopreno'],
  ['raqueta', 'Raqueta'], ['raquetas', 'Raqueta'], ['pala', 'Pala'], ['palas', 'Pala'],
  ['casco', 'Casco'], ['cascos', 'Casco'],
  ['esterilla', 'Esterilla'], ['esterillas', 'Esterilla'],
  ['falda', 'Falda'], ['faldas', 'Falda'],
  ['leggins', 'Malla'], ['leggings', 'Malla'],
  ['bermudas', 'Pantalón corto'], ['bermuda', 'Pantalón corto'],
  ['short', 'Pantalón corto'], ['shorts', 'Pantalón corto'],
  ['top deportivo', 'Top'], ['sujetador deportivo', 'Top'],
  ['zapatillas', ''], ['zapatilla', ''],
];

const PARSE_STOP_WORDS = new Set([
  'lady', 'man', 'men', 'mj', 'jr', 'junior', 'bb', 'w', 'ho',
  'para', 'hombre', 'mujer', 'nino', 'nina', 'ninos', 'ninas', 'unisex', 'psts',
  'negro', 'blanco', 'rojo', 'azul', 'verde', 'amarillo', 'naranja', 'rosa', 'morado',
  'violeta', 'gris', 'marron', 'beige', 'crema', 'dorado', 'plateado', 'granate', 'burdeos',
  'turquesa', 'coral', 'salmon', 'lila', 'fucsia', 'caqui', 'camel', 'nude', 'multicolor',
  'marino', 'lima', 'plata', 'oro', 'celeste', 'petroleo', 'burgundy', 'mostaza', 'kaki',
  'vainilla', 'antracita', 'camuflaje', 'royal', 'fluor', 'flúor',
  'neg', 'blan', 'mar', 'nar', 'amari', 'ama', 'fuc', 'ros', 'verd', 'turq', 'negr',
  'blanca', 'roja', 'negra', 'flu',
  'de', 'del', 'con', 'el', 'la', 'los', 'las',
  'piel', 'foam', 'memory', 'licra', 'spandex', 'gorro',
  'cordon', 'cordón', 'velcro', 'velc', 'cogida', 'cogido', 'atras', 'atr', 'cog',
  'pala', 'elast', 'poliester', 'polieste', 'pitillo', 'cremallera', 'manga', 'corta',
  'larga', 'campana', 'proteccion', 'artifi', 'artificial', 'cesped', 'pat',
  'swim', 'media', 'acolchada', 'portero', 'tir', 'antideslizante', 'luces',
  'acero', 'claro', 'agua', 'tf',
]);

const PRODUCT_TYPE_PT = {
  'Chancla': 'Chinelo', 'Zapatilla': 'Sapatilha', 'Bota': 'Bota',
  'Sandalia': 'Sandália', 'Zueco': 'Tamanco',
  'Camiseta': 'Camisola', 'Sudadera': 'Sweatshirt',
  'Chaqueta': 'Casaco', 'Pantalón': 'Calça', 'Pantalón corto': 'Calção',
  'Pantalón pirata': 'Calção pirata',
  'Malla': 'Legging', 'Chándal': 'Fato de treino',
  'Polo': 'Polo', 'Chaleco': 'Colete',
  'Bañador': 'Fato de banho', 'Bikini': 'Biquíni',
  'Body': 'Body', 'Mono': 'Macacão', 'Vestido': 'Vestido',
  'Falda': 'Saia', 'Ropa interior': 'Roupa interior', 'Panty': 'Collants',
  'Calcetín': 'Meia', 'Camisa': 'Camisa', 'Conjunto': 'Conjunto',
  'Neopreno': 'Neoprene', 'Culotte': 'Culotte', 'Tutú': 'Tutu',
  'Top': 'Top', 'Sujetador deportivo': 'Sutiã desportivo',
  'Cortavientos': 'Corta-vento', 'Chubasquero': 'Impermeável',
  'Forro polar': 'Polar', 'Poncho': 'Poncho', 'Equipación': 'Equipamento',
  'Mochila': 'Mochila', 'Bolsa': 'Saco', 'Bolso': 'Mala',
  'Gorra': 'Boné', 'Gorro': 'Gorro', 'Guante': 'Luva',
  'Cinturón': 'Cinto', 'Gafa': 'Óculos', 'Gafa de sol': 'Óculos de sol',
  'Reloj': 'Relógio', 'Pulsera': 'Pulseira',
  'Bufanda': 'Cachecol', 'Braga de cuello': 'Gola',
  'Balón': 'Bola', 'Raqueta': 'Raquete', 'Pala': 'Raquete',
  'Protección': 'Proteção', 'Rodillera': 'Joelheira', 'Espinillera': 'Caneleira',
  'Casco': 'Capacete', 'Esterilla': 'Tapete',
  'Pesa': 'Peso', 'Mancuerna': 'Haltere',
  'Cinta de correr': 'Passadeira', 'Bicicleta': 'Bicicleta',
  'Producto': 'Produto', 'Codera': 'Cotoveleira',
};

function parseProductName(fullName, brandInput) {
  if (!fullName) return { prodType: '', model: '', categoryHint: '' };
  var s = fullName.replace(/\xa0/g, ' ').replace(/\s+/g, ' ').trim();
  var sNorm = removeAccents(s.toLowerCase());
  var detectedType = '';
  var kwFound = '';
  for (var ki = 0; ki < TYPE_KEYWORDS_DETECT.length; ki++) {
    var kw = TYPE_KEYWORDS_DETECT[ki][0];
    var typ = TYPE_KEYWORDS_DETECT[ki][1];
    var kwNorm = removeAccents(kw.toLowerCase());
    var idx = sNorm.indexOf(kwNorm);
    if (idx !== -1) {
      var before = idx > 0 ? sNorm[idx - 1] : ' ';
      var after = idx + kwNorm.length < sNorm.length ? sNorm[idx + kwNorm.length] : ' ';
      if ((before === ' ' || before === '/' || idx === 0) && (after === ' ' || after === '/' || idx + kwNorm.length === sNorm.length)) {
        detectedType = typ;
        kwFound = kwNorm;
        break;
      }
    }
  }
  var words = s.split(/\s+/);
  var modelWords = [];
  var startIdx = 0;
  if (brandInput && words.length > 0 && removeAccents(words[0].toLowerCase()) === removeAccents(brandInput.toLowerCase())) {
    startIdx = 1;
  }
  var typeWordIdx = words.length;
  if (kwFound) {
    var kwFirstWord = removeAccents(kwFound.split(/[\s\.\/]+/)[0]);
    for (var ti = startIdx; ti < words.length; ti++) {
      var twn = removeAccents(words[ti].toLowerCase()).replace(/[\/\.\,\-\+]/g, '');
      if (twn === kwFirstWord) {
        var remaining = removeAccents(words.slice(ti).join(' ').toLowerCase());
        if (remaining.startsWith(kwFound) || remaining.includes(kwFound)) {
          typeWordIdx = ti;
          break;
        }
      }
    }
  }
  for (var i = startIdx; i < words.length; i++) {
    var wOrig = words[i];
    var wNorm = removeAccents(wOrig.toLowerCase()).replace(/[\/\.\,\-\+]/g, '');
    if (i >= typeWordIdx) break;
    if (wOrig.includes('/')) break;
    if (PARSE_STOP_WORDS.has(wNorm)) break;
    if (/^\d+$/.test(wNorm)) {
      var num = parseInt(wNorm);
      if (wNorm.length <= 2) { modelWords.push(wOrig); continue; }
      if (wNorm.length === 3) {
        if (modelWords.length === 0) { modelWords.push(wOrig); continue; }
        var nextNorm3 = i + 1 < words.length ? removeAccents(words[i + 1].toLowerCase()).replace(/[\/\.\,\-\+]/g, '') : '';
        if (PARSE_STOP_WORDS.has(nextNorm3) || (i + 1 < words.length && words[i + 1].includes('/')) || i + 1 >= typeWordIdx) break;
        modelWords.push(wOrig); continue;
      }
      if (num >= 2000 && num <= 2599 && modelWords.length === 0) break;
      if (num >= 2000 && num <= 2599 && wNorm.length === 4) break;
      modelWords.push(wOrig); continue;
    }
    modelWords.push(wOrig);
  }
  var model = modelWords.join(' ');
  var categoryHint = '';
  if (detectedType === 'Chancla') categoryHint = 'calzado-chanclas';
  else if (detectedType === 'Sandalia') categoryHint = 'calzado-sandalias';
  else if (detectedType === 'Bota' && sNorm.includes('sala')) categoryHint = 'calzado-futbol-botas_sala';
  else if (detectedType === 'Bota') categoryHint = 'calzado-futbol-botas_tacos';
  else if (detectedType === 'Zapatilla' && sNorm.includes('turf')) categoryHint = 'calzado-futbol-botas_multitacos';
  else if (detectedType === 'Zapatilla' && sNorm.includes('sala')) categoryHint = 'calzado-futbol-botas_sala';
  else if (detectedType === 'Zapatilla' && sNorm.includes('trail')) categoryHint = 'calzado-trail_running';
  else if (detectedType === 'Zapatilla' && sNorm.includes('placa carbono')) categoryHint = 'calzado-correr_caminar';
  else if (detectedType === 'Espinillera') categoryHint = 'equipamiento_accesorios-protecciones-espinilleras';
  else if (detectedType === 'Guante') categoryHint = 'equipamiento_accesorios-guantes';
  else if (detectedType === 'Protección' || detectedType === 'Codera' || detectedType === 'Rodillera') categoryHint = 'equipamiento_accesorios-protecciones-rodilleras';
  else if (detectedType === 'Chubasquero') categoryHint = 'ropa-top-chubasqueros';
  else if (detectedType === 'Sudadera') categoryHint = 'ropa-top-sudaderas';
  else if (detectedType === 'Camiseta') categoryHint = 'ropa-top-camisetas';
  else if (detectedType === 'Pantalón') categoryHint = 'ropa-bottoms-pantalones';
  else if (detectedType === 'Chándal') categoryHint = 'ropa-onepiece-chandal';
  else if (detectedType === 'Conjunto') categoryHint = 'ropa-onepiece-conjuntos';
  else if (detectedType === 'Malla') categoryHint = 'ropa-bottoms-leggins_mallas';
  else if (detectedType === 'Bolsa') categoryHint = 'equipamiento_accesorios-bolsas';
  else if (detectedType === 'Bañador') categoryHint = 'ropa-bottoms-banador';
  else if (detectedType === 'Balón') categoryHint = 'equipamiento_accesorios-balones';
  var confidence = detectedType ? 'high' : 'low';
  if (!detectedType) { detectedType = 'Zapatilla'; categoryHint = 'calzado-correr_caminar'; }
  return { prodType: detectedType, model: model, categoryHint: categoryHint, confidence: confidence };
}

function prodTypeToCategoryHint(prodType, nameNorm) {
  if (prodType === 'Chancla') return 'calzado-chanclas';
  if (prodType === 'Sandalia') return 'calzado-sandalias';
  if (prodType === 'Bota' && nameNorm && nameNorm.includes('sala')) return 'calzado-futbol-botas_sala';
  if (prodType === 'Bota') return 'calzado-futbol-botas_tacos';
  if (prodType === 'Zapatilla' && nameNorm && nameNorm.includes('trail')) return 'calzado-trail_running';
  if (prodType === 'Zapatilla' && nameNorm && nameNorm.includes('sala')) return 'calzado-futbol-botas_sala';
  if (prodType === 'Zapatilla') return 'calzado-correr_caminar';
  if (prodType === 'Espinillera') return 'equipamiento_accesorios-protecciones-espinilleras';
  if (prodType === 'Guante') return 'equipamiento_accesorios-guantes';
  if (prodType === 'Protección' || prodType === 'Codera' || prodType === 'Rodillera') return 'equipamiento_accesorios-protecciones-rodilleras';
  if (prodType === 'Chubasquero') return 'ropa-top-chubasqueros';
  if (prodType === 'Sudadera') return 'ropa-top-sudaderas';
  if (prodType === 'Camiseta') return 'ropa-top-camisetas';
  if (prodType === 'Pantalón') return 'ropa-bottoms-pantalones';
  if (prodType === 'Chándal') return 'ropa-onepiece-chandal';
  if (prodType === 'Conjunto') return 'ropa-onepiece-conjuntos';
  if (prodType === 'Malla') return 'ropa-bottoms-leggins_mallas';
  if (prodType === 'Bolsa' || prodType === 'Mochila') return 'equipamiento_accesorios-bolsas';
  if (prodType === 'Bañador') return 'ropa-bottoms-banador';
  if (prodType === 'Balón') return 'equipamiento_accesorios-balones';
  if (prodType === 'Gorra' || prodType === 'Gorro') return 'equipamiento_accesorios-gorras_gorros';
  if (prodType === 'Chaqueta' || prodType === 'Cortavientos') return 'ropa-top-chaquetas';
  if (prodType === 'Polo') return 'ropa-top-polos';
  if (prodType === 'Chaleco') return 'ropa-top-chalecos';
  if (prodType === 'Calcetín') return 'ropa-bottoms-calcetines';
  if (prodType === 'Bikini') return 'ropa-bottoms-bikini';
  if (prodType === 'Neopreno') return 'ropa-onepiece-neoprenos';
  if (prodType === 'Raqueta' || prodType === 'Pala') return 'equipamiento_accesorios-raquetas';
  if (prodType === 'Casco') return 'equipamiento_accesorios-cascos';
  if (prodType === 'Esterilla') return 'equipamiento_accesorios-esterillas';
  if (prodType === 'Falda') return 'ropa-bottoms-falda_vestido';
  if (prodType === 'Top') return 'ropa-top-tops';
  if (prodType === 'Pantalón corto') return 'ropa-bottoms-pantalones_corto';
  if (prodType === 'Gafa') return 'equipamiento_accesorios-gafas';
  return '';
}

function getProductTypePT(prodTypeES) {
  return PRODUCT_TYPE_PT[prodTypeES] || '';
}

const VALID_COLORS = [
  'Azul Marino', 'Azul Claro', 'Azul Oscuro', 'Azul Real', 'Azul Cielo', 'Azul Electrico',
  'Verde Oliva', 'Verde Oscuro', 'Verde Claro', 'Verde Militar', 'Verde Menta',
  'Gris Claro', 'Gris Oscuro', 'Gris Marengo',
  'Rojo Oscuro', 'Rosa Claro', 'Rosa Fucsia', 'Rosa Pastel',
  'Marron Claro', 'Marron Oscuro',
  'Negro', 'Blanco', 'Rojo', 'Azul', 'Verde', 'Amarillo',
  'Naranja', 'Rosa', 'Morado', 'Violeta', 'Gris', 'Marron',
  'Beige', 'Crema', 'Dorado', 'Plateado', 'Granate', 'Burdeos',
  'Turquesa', 'Coral', 'Salmon', 'Lila', 'Fucsia', 'Caqui',
  'Camel', 'Nude', 'Multicolor', 'Transparente', 'Bronce',
];

function extractSingleColor(colorInput) {
  if (!colorInput) return '';
  const input = colorInput.trim();
  const inputNorm = removeAccents(input.toLowerCase());
  for (const c of VALID_COLORS) {
    if (inputNorm === removeAccents(c.toLowerCase())) return c;
  }
  const parts = input.split(/[\/\-,\+]+/).map(p => p.trim()).filter(Boolean);
  for (const part of parts) {
    const partNorm = removeAccents(part.toLowerCase());
    for (const c of VALID_COLORS) {
      if (partNorm === removeAccents(c.toLowerCase())) return c;
    }
  }
  if (parts[0]) {
    const p = parts[0].toLowerCase();
    return p.charAt(0).toUpperCase() + p.slice(1);
  }
  return input;
}

const catTranslations = {
  'Zapatillas de Running': 'Sapatilhas de Running', 'Zapatillas de Training': 'Sapatilhas de Training',
  'Zapatillas de Trail': 'Sapatilhas de Trail', 'Zapatillas de Tenis': 'Sapatilhas de Ténis',
  'Zapatillas Running': 'Sapatilhas Running', 'Zapatillas Training': 'Sapatilhas Training',
  'Zapatillas Casual': 'Sapatilhas Casual', 'Zapatillas Trail': 'Sapatilhas Trail',
  'Zapatillas Padel': 'Sapatilhas Padel', 'Zapatillas Tenis': 'Sapatilhas Ténis',
  'Zapatillas Futbol': 'Sapatilhas Futebol', 'Zapatillas Fútbol': 'Sapatilhas Futebol',
  'Zapatillas Baloncesto': 'Sapatilhas Basquetebol',
  'Camiseta Manga Larga': 'Camisola Manga Comprida', 'Camiseta Tirantes': 'Camisola de Alças',
  'Pantalón Corto': 'Calções', 'Pantalon Corto': 'Calções', 'Pantalones Cortos': 'Calções',
  'Sudadera con Capucha': 'Sweatshirt com Capuz',
  'Chándal': 'Fato de Treino', 'Chandal': 'Fato de Treino',
  'Gafas de Sol': 'Óculos de Sol',
  'Pala de Padel': 'Raquete de Padel',
  'Guia de Tallas': 'Guia de Tamanhos', 'guia de tallas': 'guia de tamanhos',
  'manga corta': 'manga curta', 'manga larga': 'manga comprida',
  'sin mangas': 'sem mangas',
  'con cremallera': 'com fecho', 'con capucha': 'com capuz',
  ' y ': ' e ', ' Y ': ' E ',
  'Zapatillas': 'Sapatilhas', 'Zapatilla': 'Sapatilha', 'zapatillas': 'sapatilhas', 'zapatilla': 'sapatilha',
  'Chanclas': 'Chinelos', 'Chancla': 'Chinelo', 'chanclas': 'chinelos', 'chancla': 'chinelo',
  'Sandalias': 'Sandálias', 'Sandalia': 'Sandália', 'sandalias': 'sandálias', 'sandalia': 'sandália',
  'Camiseta': 'Camisola', 'Camisetas': 'Camisolas', 'camiseta': 'camisola', 'camisetas': 'camisolas',
  'Pantalón': 'Calças', 'Pantalon': 'Calças', 'pantalón': 'calças', 'pantalon': 'calças',
  'Sudadera': 'Sweatshirt', 'sudadera': 'sweatshirt',
  'Chaqueta': 'Casaco', 'chaqueta': 'casaco',
  'Chaleco': 'Colete', 'chaleco': 'colete',
  'Cortavientos': 'Corta-vento', 'cortavientos': 'corta-vento',
  'Mochila': 'Mochila', 'mochila': 'mochila',
  'Calcetines': 'Meias', 'calcetines': 'meias',
  'Gorra': 'Boné', 'gorra': 'boné', 'Gorro': 'Gorro', 'gorro': 'gorro',
  'Guantes': 'Luvas', 'guantes': 'luvas',
  'Gafas': 'Óculos', 'gafas': 'óculos',
  'Bañador': 'Fato de Banho', 'bañador': 'fato de banho',
  'Bikini': 'Biquíni', 'Malla': 'Legging', 'Mallas': 'Leggings', 'mallas': 'leggings',
  'Balón': 'Bola', 'balón': 'bola',
  'Negro': 'Preto', 'negro': 'preto', 'Negra': 'Preta', 'negra': 'preta',
  'Blanco': 'Branco', 'blanco': 'branco', 'Blanca': 'Branca', 'blanca': 'branca',
  'Rojo': 'Vermelho', 'rojo': 'vermelho', 'Roja': 'Vermelha', 'roja': 'vermelha',
  'Gris': 'Cinzento', 'gris': 'cinzento',
  'Amarillo': 'Amarelo', 'amarillo': 'amarelo',
  'Naranja': 'Laranja', 'naranja': 'laranja',
  'Morado': 'Roxo', 'morado': 'roxo',
  'Marrón': 'Castanho', 'Marron': 'Castanho', 'marrón': 'castanho', 'marron': 'castanho',
  'Dorado': 'Dourado', 'dorado': 'dourado',
  'Plateado': 'Prateado', 'plateado': 'prateado',
  'Marino': 'Marinho', 'marino': 'marinho',
  'Algodón': 'Algodão', 'algodón': 'algodão',
  'Poliéster': 'Poliéster', 'poliéster': 'poliéster',
  'Cuero': 'Couro', 'cuero': 'couro',
  'Hombre': 'Homem', 'hombre': 'homem',
  'Mujer': 'Mulher', 'mujer': 'mulher',
  'Niño': 'Criança', 'niño': 'criança',
  'Calzado': 'Calçado', 'calzado': 'calçado',
  'Ropa': 'Roupa', 'ropa': 'roupa',
  'Deportivo': 'Desportivo', 'deportivo': 'desportivo',
  'Deportiva': 'Desportiva', 'deportiva': 'desportiva',
  'con': 'com', 'Con': 'Com',
  'Producto': 'Produto', 'Productos': 'Produtos',
  'Nuevo': 'Novo', 'Colección': 'Coleção', 'colección': 'coleção',
};

function toPT(text, isPT) {
  if (!text || !isPT) return text;
  let result = text;
  const sorted = Object.keys(catTranslations).sort((a, b) => b.length - a.length);
  for (const es of sorted) {
    const escaped = es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const needsBoundary = es.length <= 5 && /^[a-záéíóúñü]+$/i.test(es);
    const pattern = needsBoundary ? ('\\b' + escaped + '\\b') : escaped;
    const regex = new RegExp(pattern, 'gi');
    if (regex.test(result)) {
      regex.lastIndex = 0;
      result = result.replace(regex, (match) => {
        if (match === match.toUpperCase()) return catTranslations[es].toUpperCase();
        if (match[0] === match[0].toUpperCase()) return catTranslations[es].charAt(0).toUpperCase() + catTranslations[es].slice(1);
        return catTranslations[es];
      });
    }
  }
  return result;
}

module.exports = {
  INPUT_MAP,
  TYPE_KEYWORDS_DETECT,
  PARSE_STOP_WORDS,
  PRODUCT_TYPE_PT,
  VALID_COLORS,
  catTranslations,
  mapInputRow,
  removeAccents,
  categoryToSlug,
  parseProductName,
  prodTypeToCategoryHint,
  getProductTypePT,
  extractSingleColor,
  toPT,
};
