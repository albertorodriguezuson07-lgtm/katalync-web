const https = require('https');

function verifyToken(token) {
  return new Promise((resolve) => {
    if (!token) { resolve(false); return; }
    const postData = JSON.stringify({ token });
    const req = https.request({ hostname: 'prometeix-servidor-n8n.reyl9a.easypanel.host', port: 443, path: '/webhook/auth-verify', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) } }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => { try { const d = JSON.parse(Buffer.concat(chunks).toString()); resolve(d.success === true); } catch(e) { resolve(false); } });
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => { req.destroy(); resolve(false); });
    req.write(postData);
    req.end();
  });
}

const input = $input.first().json.body;
const tokenValid = await verifyToken(input.token);
if (!tokenValid) {
  return [{ json: { status: 'error', message: 'Sesion no valida o expirada. Vuelve a iniciar sesion.', errors: 1, success: 0, errorList: [], csvBase64: '', csvFilename: '', products: [] } }];
}

const products = input.products || [];
const marketplace = input.marketplace || 'sprinter_es';
const ratio = input.ratio || '2:3';
const generateDescriptions = input.generateDescriptions !== false;
const generateTitles = input.generateTitles !== false;
const convertImages = input.convertImages !== false;
const removeBg = input.removeBg === true;
const shipmentOrigin = input.shipmentOrigin || 'ES';
const vatPct = input.vatPct || 'ES-21%,PT-23%';
const offerState = input.offerState || 'Nuevo';
const outputFormat = input.outputFormat || '';
const isPT = marketplace === 'sportzone_pt';

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
  // Native Mirakl API codes (identity mapping)
  'categorias': 'categorias',
  'sku-de-vendedor': 'sku-de-vendedor',
  'nombre-del-articulo': 'nombre-del-articulo',
  'nombre-del-articulo-pt': 'nombre-del-articulo-pt',
  'subtitulo-de-productos': 'subtitulo-de-productos',
  'subtitulo-de-productos-pt': 'subtitulo-de-productos-pt',
  'pais-fabricante': 'pais-fabricante',
  'pais-fabricante-pt': 'pais-fabricante-pt',
  'marcas': 'marcas',
  'descripion-del-producto': 'descripion-del-producto',
  'imagenes-1': 'imagenes-1',
  'imagenes-2': 'imagenes-2',
  'imagenes-3': 'imagenes-3',
  'imagenes-4': 'imagenes-4',
  'colores': 'colores',
  'tipos-de-deportes': 'tipos-de-deportes',
  'nombre-del-fabricante': 'nombre-del-fabricante',
  'nombre-comercial-registrado-del-fabricante': 'nombre-comercial-registrado-del-fabricante',
  'direccion-del-fabricante': 'direccion-del-fabricante',
  'correo-electronico-del-fabricante': 'correo-electronico-del-fabricante',
  'nombre-persona-responsable-en-eu': 'nombre-persona-responsable-en-eu',
  'direccion-de-la-persona-responsable': 'direccion-de-la-persona-responsable',
  'correo-electronico-de-la-persona-responsable': 'correo-electronico-de-la-persona-responsable',
  'foto-etiqueta-del-producto': 'foto-etiqueta-del-producto',
  'manual-de-seguridad-del-producto': 'manual-de-seguridad-del-producto',
  'video': 'video',
  'guia-de-tallas': 'guia-de-tallas',
  'colecciones': 'colecciones',
  'cuidados': 'cuidados',
  // Display name mappings (from XLSX first header row)
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

const CAT_ALIAS={'abdominales':'equipamiento_accesorios-fitness-abdominales','accesorios':'equipamiento_accesorios-accesorios-accesorios_de_agilidad','accesorios de agilidad':'equipamiento_accesorios-accesorios-accesorios_de_agilidad','accesorios de compresion':'equipamiento_accesorios-accesorios-accesorios_de_compresion','accesorios piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-accesorios_piscinas','accesorios snowboard':'equipamiento_accesorios-accesorios_snowboard-fijaciones_snowboard','adelgazamiento':'nutricion-adelgazamiento-cla','air hockey':'equipamiento_accesorios-juegos-air_hockey','alas wingfoil':'equipamiento_accesorios-wingfoil-alas_wingfoil','aletas buceo':'equipamiento_accesorios-buceo-aletas_buceo','aletas natacion':'equipamiento_accesorios-natacion-aletas_natacion','aletas paddlesurf':'equipamiento_accesorios-paddlesurf-aletas_paddlesurf','alfombrillas gaming':'equipamiento_accesorios-gaming-alfombrillas_gaming','alforjas':'equipamiento_accesorios-ciclismo-alforjas','alimentacion saludable':'nutricion-alimentacion_saludable-batidos_y_smoothies','almacenamiento ciclismo':'equipamiento_accesorios-ciclismo-almacenamiento_ciclismo','altavoces':'equipamiento_accesorios-electronica_deportiva-altavoces','aminoacidos':'nutricion-recuperacion_muscular-aminoacidos','anillas':'equipamiento_accesorios-fitness-anillas','antioxidantes':'nutricion-salud-antioxidantes','antipinchazos':'equipamiento_accesorios-ciclismo-antipinchazos','aparcabicicletas':'equipamiento_accesorios-ciclismo-aparcabicicletas','aquagym':'equipamiento_accesorios-aquagym-material_aquagym-churros_y_conectores','arcos':'equipamiento_accesorios-tiro_con_arco-arcos','arneses':'equipamiento_accesorios-escalada-material_escalada-arneses','aros yoga pilates':'equipamiento_accesorios-yoga_pilates-aros_yoga_pilates','arrastables':'equipamiento_accesorios-esqui_acuatico-arrastables','artes marciales':'calzado-artes_marciales','articulaciones cartilagos y huesos':'nutricion-salud-articulaciones_cartilagos_y_huesos','aseguradoresdescendores':'equipamiento_accesorios-escalada-material_escalada-aseguradoresdescendores','asiento kayak':'equipamiento_accesorios-kayak-asiento_kayak','asientos paddlesurf':'equipamiento_accesorios-paddlesurf-asientos_paddlesurf','aumento muscular':'nutricion-aumento_muscular-carbohidratos','badminton':'calzado-badminton','bailes de salon':'calzado-bailes_de_salon','bailes regionales':'calzado-bailes_regionales','ballet':'calzado-ballet','baloncesto':'calzado-baloncesto','balones baloncesto':'equipamiento_accesorios-baloncesto-balones_baloncesto','balones fitness':'equipamiento_accesorios-fitness-balones_fitness','balones futbol':'equipamiento_accesorios-futbol-balones_futbol','balones medicinales':'equipamiento_accesorios-fitness-balones_medicinales','balones rugby':'equipamiento_accesorios-rugby-balones_rugby','balones voleibol':'equipamiento_accesorios-voleibol-balones_voleibol','balones yoga pilates':'equipamiento_accesorios-yoga_pilates-balones_yoga_pilates','balonmano':'calzado-balonmano','balonmano balones':'equipamiento_accesorios-balonmano-balonmano_balones','balonmano otros':'equipamiento_accesorios-balonmano-balonmano_otros','banador':'ropa-onepiece-banador','banco':'equipamiento_accesorios-accesorios-muebles-banco','bancos fitness':'equipamiento_accesorios-fitness-bancos_fitness','bancos suecos':'equipamiento_accesorios-fitness-bancos_suecos','banda pulsometro':'equipamiento_accesorios-electronica_deportiva-banda_pulsometro','bandas elasticas':'equipamiento_accesorios-fitness-bandas_elasticas','bandas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-bandas_gimnasia_ritmica','banderines':'equipamiento_accesorios-futbol-banderines','banderines arbitro':'equipamiento_accesorios-futbol-banderines_arbitro','bandolera':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-bandolera','barbacoas':'equipamiento_accesorios-accesorios-cocina-barbacoas','barcas':'equipamiento_accesorios-juegos-barcas','barra dominadas':'equipamiento_accesorios-fitness-barra_dominadas','barras fitness':'equipamiento_accesorios-fitness-barras_fitness','barras halterofilia':'equipamiento_accesorios-halterofilia-barras_halterofilia','barras paralelas':'equipamiento_accesorios-fitness-barras_paralelas','bascula':'nutricion-utensilios_cocina-bascula','basculas':'equipamiento_accesorios-electronica_deportiva-basculas','base sombrilla':'equipamiento_accesorios-accesorios-muebles-sombrillas-base_sombrilla','baston trekking':'equipamiento_accesorios-trekking_montana-baston_trekking','bastones marcha nordica':'equipamiento_accesorios-marcha_nordica-bastones_marcha_nordica','baterias camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-baterias_camping','bates beisbol':'equipamiento_accesorios-beisbol-bates_beisbol','batidora':'nutricion-utensilios_cocina-batidora','batidos y smoothies':'nutricion-alimentacion_saludable-batidos_y_smoothies','baul moto':'equipamiento_accesorios-motociclismo-baul_moto','bcaa y otros aminoacidos':'nutricion-recuperacion_muscular-bcaa_y_otros_aminoacidos','bebida':'nutricion-alimentacion_saludable-bebida','bebidas isotonicas':'nutricion-recuperacion_muscular-bebidas_isotonicas','beisbol':'calzado-beisbol','bicicleta electrica montana':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_electricas-bicicleta_electrica_montana','bicicleta montana':'equipamiento_accesorios-ciclismo-bicicletas-bicicleta_montana','bicicletas bmx':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_bmx','bicicletas carretera':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_carretera','bicicletas ciudad':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_ciudad','bicicletas elipticas':'equipamiento_accesorios-fitness-maquinas_fitness-bicicletas_elipticas','bicicletas estaticas':'equipamiento_accesorios-fitness-maquinas_fitness-bicicletas_estaticas','bicicletas fixie':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_fixie','bicicletas gravel':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_gravel','bicicletas ninos':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_ninos','bicicletas plegables':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_plegables','bicicletas spinning':'equipamiento_accesorios-fitness-maquinas_fitness-bicicletas_spinning','bikini':'ropa-onepiece-bikini','billar':'equipamiento_accesorios-billar-mesas_billar','bloques yoga pilates':'equipamiento_accesorios-yoga_pilates-bloques_yoga_pilates','body':'ropa-onepiece-body','bodyboard':'equipamiento_accesorios-bodyboard-otros_bodyboard','bokken y shinai':'equipamiento_accesorios-accesorios-bokken_y_shinai','bolsa estanca':'equipamiento_accesorios-paddlesurf-bolsa_estanca','bolsa magnesio':'equipamiento_accesorios-escalada-material_escalada-bolsa_magnesio','bolsa sillin':'equipamiento_accesorios-ciclismo-bolsa_sillin','bombas':'equipamiento_accesorios-ciclismo-bombas','botas apres ski':'calzado-esqui-botas_apres_ski','botas casual':'calzado-casual-botas_casual','botas de agua':'calzado-casual-botas_de_agua','botas esqui':'calzado-esqui-botas_esqui','botas multitacos':'calzado-futbol-botas_multitacos','botas sala':'calzado-futbol-botas_sala','botas seguridad':'calzado-seguridad-botas_seguridad','botas snowboard':'calzado-snowboard-botas_snowboard','botas tacos':'calzado-futbol-botas_tacos','botas trekking montana':'calzado-trekking_montana-botas_trekking_montana','botellas':'equipamiento_accesorios-accesorios-botellas','bottoms':'ropa-bottoms-falda_vestido','bottoms bano':'ropa-bottoms-bottoms_bano','boxeo':'calzado-boxeo','boyas natacion':'equipamiento_accesorios-natacion-boyas_natacion','brazaletes':'equipamiento_accesorios-accesorios-accesorios_movil-brazaletes','brujulas':'equipamiento_accesorios-trekking_montana-brujulas','buceo':'calzado-buceo','bufandas':'equipamiento_accesorios-accesorios-bufandas','cabina ducha':'equipamiento_accesorios-trekking_montana-accesorios_camping-cabina_ducha','cajon pliometrico':'equipamiento_accesorios-fitness-cajon_pliometrico','calcetines':'equipamiento_accesorios-accesorios-calcetines','calleras':'equipamiento_accesorios-fitness-calleras','calleras gimnasia artistica':'equipamiento_accesorios-gimnasia_artistica-protecciones_gimnasia_artistica-calleras_gimnasia_artistica','calzado artes marciales':'calzado-artes_marciales','calzado atletismo':'calzado-atletismo-carrera','calzado badminton':'calzado-badminton','calzado bailes de salon':'calzado-bailes_de_salon','calzado bailes regionales':'calzado-bailes_regionales','calzado ballet':'calzado-ballet','calzado baloncesto':'calzado-baloncesto','calzado balonmano':'calzado-balonmano','calzado beisbol':'calzado-beisbol','calzado boxeo':'calzado-boxeo','calzado buceo':'calzado-buceo','calzado calzado artes marciales':'calzado-artes_marciales','calzado calzado atletismo calzado carrera':'calzado-atletismo-carrera','calzado calzado atletismo calzado lanzamientos':'calzado-atletismo-lanzamientos','calzado calzado atletismo calzado salto':'calzado-atletismo-salto','calzado calzado atletismo calzados marcha':'calzado-atletismo-marcha','calzado calzado badminton':'calzado-badminton','calzado calzado bailes de salon':'calzado-bailes_de_salon','calzado calzado bailes regionales':'calzado-bailes_regionales','calzado calzado ballet':'calzado-ballet','calzado calzado baloncesto':'calzado-baloncesto','calzado calzado balonmano':'calzado-balonmano','calzado calzado beisbol':'calzado-beisbol','calzado calzado boxeo':'calzado-boxeo','calzado calzado buceo':'calzado-buceo','calzado calzado casual botas casual':'calzado-casual-botas_casual','calzado calzado casual botas de agua':'calzado-casual-botas_de_agua','calzado calzado casual calzado sneaker':'calzado-casual-sneaker','calzado calzado chanclas':'calzado-chanclas','calzado calzado ciclismo':'calzado-ciclismo','calzado calzado correr caminar':'calzado-correr_caminar','calzado calzado cricket':'calzado-cricket','calzado calzado escalada':'calzado-escalada','calzado calzado esqui botas apres ski':'calzado-esqui-botas_apres_ski','calzado calzado esqui botas esqui':'calzado-esqui-botas_esqui','calzado calzado fitness':'calzado-fitness','calzado calzado flamenco':'calzado-flamenco','calzado calzado futbol americano':'calzado-futbol_americano','calzado calzado futbol botas multitacos':'calzado-futbol-botas_multitacos','calzado calzado futbol botas sala':'calzado-futbol-botas_sala','calzado calzado futbol botas tacos':'calzado-futbol-botas_tacos','calzado calzado golf':'calzado-golf','calzado calzado halterofilia':'calzado-halterofilia','calzado calzado hockey campo':'calzado-hockey_campo','calzado calzado natacion':'calzado-natacion','calzado calzado padel':'calzado-padel','calzado calzado patinaje':'calzado-patinaje','calzado calzado pingpong':'calzado-pingpong','calzado calzado plantillas':'calzado-plantillas','calzado calzado rugby':'calzado-rugby','calzado calzado seguridad botas seguridad':'calzado-seguridad-botas_seguridad','calzado calzado seguridad zapatillas seguridad':'calzado-seguridad-zapatillas_seguridad','calzado calzado snowboard botas snowboard':'calzado-snowboard-botas_snowboard','calzado calzado tenis':'calzado-tenis','calzado calzado trail running':'calzado-trail_running','calzado calzado trekking montana botas de agua':'calzado-trekking_montana-botas_de_agua','calzado calzado trekking montana botas trekking montana':'calzado-trekking_montana-botas_trekking_montana','calzado calzado trekking montana slippers camping':'calzado-trekking_montana-slippers_camping','calzado calzado trekking montana zapatillas trekking montana':'calzado-trekking_montana-zapatillas_trekking_montana','calzado calzado voleibol':'calzado-voleibol','calzado calzado wrestling':'calzado-wrestling','calzado carrera':'calzado-atletismo-carrera','calzado casual':'calzado-casual-botas_casual','calzado chanclas':'calzado-chanclas','calzado ciclismo':'calzado-ciclismo','calzado correr caminar':'calzado-correr_caminar','calzado cricket':'calzado-cricket','calzado cuidados calzado':'calzado-cuidados_calzado','calzado escalada':'calzado-escalada','calzado esqui':'calzado-esqui-botas_apres_ski','calzado fitness':'calzado-fitness','calzado flamenco':'calzado-flamenco','calzado futbol':'calzado-futbol-botas_multitacos','calzado futbol americano':'calzado-futbol_americano','calzado golf':'calzado-golf','calzado halterofilia':'calzado-halterofilia','calzado hockey campo':'calzado-hockey_campo','calzado lanzamientos':'calzado-atletismo-lanzamientos','calzado natacion':'calzado-natacion','calzado padel':'calzado-padel','calzado patinaje':'calzado-patinaje','calzado pesca':'equipamiento_accesorios-pesca-calzado_pesca','calzado pingpong':'calzado-pingpong','calzado plantillas':'calzado-plantillas','calzado rugby':'calzado-rugby','calzado salto':'calzado-atletismo-salto','calzado sandalias':'calzado-sandalias','calzado seguridad':'calzado-seguridad-botas_seguridad','calzado sneaker':'calzado-casual-sneaker','calzado snowboard':'calzado-snowboard-botas_snowboard','calzado tenis':'calzado-tenis','calzado trail running':'calzado-trail_running','calzado trekking montana':'calzado-trekking_montana-botas_de_agua','calzado voleibol':'calzado-voleibol','calzado wrestling':'calzado-wrestling','calzado zuecos':'calzado-zuecos','calzados marcha':'calzado-atletismo-marcha','cama camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-cama_camping','camara deportiva':'equipamiento_accesorios-electronica_deportiva-camara_deportiva','camaras':'equipamiento_accesorios-ciclismo-camaras','camisa':'ropa-top-camisa','camiseta portero':'ropa-onepiece-equipacion_portero-camiseta_portero','camisetas':'ropa-top-camisetas','canastas baloncesto':'equipamiento_accesorios-baloncesto-canastas_baloncesto','candados':'equipamiento_accesorios-ciclismo-candados','carbohidratos':'nutricion-aumento_muscular-carbohidratos','carcasas y fundas':'equipamiento_accesorios-electronica_deportiva-auriculares-carcasas_y_fundas','carpas':'equipamiento_accesorios-accesorios-muebles-carpas','carrera':'calzado-atletismo-carrera','carros kayak':'equipamiento_accesorios-kayak-carros_kayak','carros tenis':'equipamiento_accesorios-tenis-carros_tenis','cartera':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-cartera','cascos':'equipamiento_accesorios-escalada-material_escalada-cascos','cascos beisbol':'equipamiento_accesorios-beisbol-cascos_beisbol','cascos boxeo':'equipamiento_accesorios-boxeo-cascos_boxeo','cascos ciclismo':'equipamiento_accesorios-ciclismo-cascos_ciclismo','cascos esqui':'equipamiento_accesorios-esqui-cascos_esqui','cascos motociclismo':'equipamiento_accesorios-motociclismo-cascos_motociclismo','cascos y auriculares gaming':'equipamiento_accesorios-gaming-perifericos_gaming-cascos_y_auriculares_gaming','caseina':'nutricion-proteinas-caseina','castanuelas':'equipamiento_accesorios-danza_baile-castanuelas','chaleco':'ropa-top-chaleco','chalecos salvavidas':'equipamiento_accesorios-accesorios-chalecos_salvavidas','chanclas':'calzado-chanclas','chandal':'ropa-onepiece-chandal','chaquetas cortavientos':'ropa-top-chaquetas-chaquetas_cortavientos','chaquetas softshell':'ropa-top-chaquetas-chaquetas_softshell','chubasquero':'ropa-top-chubasquero','churros y conectores':'equipamiento_accesorios-aquagym-material_aquagym-churros_y_conectores','ciclismo':'calzado-ciclismo','cintas':'cuidados_del_deportista-cintas','cintas de correr':'equipamiento_accesorios-fitness-maquinas_fitness-cintas_de_correr','cintas de correr curva':'equipamiento_accesorios-fitness-maquinas_fitness-cintas_de_correr_curva','cintas express':'equipamiento_accesorios-escalada-material_escalada-cintas_express','cintas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-cintas_gimnasia_ritmica','cintasmunequeras':'equipamiento_accesorios-tenis-cintasmunequeras','cinturones':'equipamiento_accesorios-accesorios-cinturones','cinturones aquagym':'equipamiento_accesorios-aquagym-material_aquagym-cinturones_aquagym','cinturonruso':'equipamiento_accesorios-fitness-cinturonruso','cla':'nutricion-adelgazamiento-cla','coderas':'equipamiento_accesorios-accesorios-coderas','coderas balonmano':'equipamiento_accesorios-balonmano-protecciones_balonmano-coderas_balonmano','colchones camping':'equipamiento_accesorios-trekking_montana-colchones_camping','colchonetas rocodromo':'equipamiento_accesorios-escalada-rocodromos-colchonetas_rocodromo','colchonetas trekking':'equipamiento_accesorios-trekking_montana-colchonetas_trekking','collar aquagym':'equipamiento_accesorios-aquagym-material_aquagym-collar_aquagym','columpios':'equipamiento_accesorios-juegos-jardin-columpios','combas':'equipamiento_accesorios-fitness-combas','cometa kitesurf':'equipamiento_accesorios-kitesurf-cometa_kitesurf','conjuntos':'ropa-onepiece-conjuntos','conjuntos artes marciales':'ropa-onepiece-conjuntos-conjuntos_artes_marciales','conjuntos portero':'ropa-onepiece-equipacion_portero-conjuntos_portero','conos':'equipamiento_accesorios-futbol-conos','consolas gaming':'equipamiento_accesorios-gaming-consolas_gaming','coquillas boxeo':'equipamiento_accesorios-boxeo-protecciones-coquillas_boxeo','cordaje tenis':'equipamiento_accesorios-tenis-cordaje_tenis','correas de elevacion':'equipamiento_accesorios-fitness-correas_de_elevacion','correas reloj':'equipamiento_accesorios-electronica_deportiva-correas_reloj','correr caminar':'calzado-correr_caminar','creatina':'nutricion-aumento_muscular-creatina','cremas y geles':'cuidados_del_deportista-cremas_y_geles-proteccion_solar','cremas y salsas':'nutricion-alimentacion_saludable-cremas_y_salsas','cricket':'calzado-cricket','cronometros':'equipamiento_accesorios-electronica_deportiva-cronometros','cubiertas piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-cubiertas_piscinas','cubrepatines':'equipamiento_accesorios-patinaje-cubrepatines','cuentakilometros':'equipamiento_accesorios-electronica_deportiva-cuentakilometros','cuerdas escalada':'equipamiento_accesorios-escalada-material_escalada-cuerdas_escalada','cuerdas fitness':'equipamiento_accesorios-fitness-cuerdas_fitness','cuerdas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-cuerdas_gimnasia_ritmica','cuidados calzado':'calzado-cuidados_calzado','cuidados del caballo':'equipamiento_accesorios-hipica-cuidados_del_caballo','cuidados del deportista cintas':'cuidados_del_deportista-cintas','cuidados del deportista cremas y geles proteccion solar':'cuidados_del_deportista-cremas_y_geles-proteccion_solar','cuidados del deportista cremas y geles repelente de mosquitos':'cuidados_del_deportista-cremas_y_geles-repelente_de_mosquitos','cuidados del deportista higiene':'cuidados_del_deportista-higiene','cuidados del deportista material de recuperacion masajeadores masajeadores corporales':'cuidados_del_deportista-material_de_recuperacion-masajeadores-masajeadores_corporales','cuidados del deportista material de recuperacion masajeadores otros masajeadores':'cuidados_del_deportista-material_de_recuperacion-masajeadores-otros_masajeadores','cuidados del deportista material de recuperacion masajeadores pelotas y bolas':'cuidados_del_deportista-material_de_recuperacion-masajeadores-pelotas_y_bolas','cuidados del deportista material de recuperacion masajeadores pistola masaje':'cuidados_del_deportista-material_de_recuperacion-masajeadores-pistola_masaje','cuidados del deportista material de recuperacion masajeadores presoterapia':'cuidados_del_deportista-material_de_recuperacion-masajeadores-presoterapia','cuidados del deportista otros cuidados':'cuidados_del_deportista-otros_cuidados','cuidados del deportista perfumes':'cuidados_del_deportista-perfumes','culottes':'ropa-onepiece-culottes','danza baile':'equipamiento_accesorios-danza_baile-castanuelas','danza baile otros':'equipamiento_accesorios-danza_baile-danza_baile_otros','dardos diana':'equipamiento_accesorios-juegos-dianas-dardos_diana','defensas y barreras':'equipamiento_accesorios-futbol-defensas_y_barreras','depositos de agua':'equipamiento_accesorios-trekking_montana-accesorios_camping-depositos_de_agua','diademas cintas':'equipamiento_accesorios-accesorios-diademas_cintas','dieteticas':'nutricion-fuerza_y_energia-barritas-dieteticas','discos':'equipamiento_accesorios-fitness-pesas-discos','discos aquagym':'equipamiento_accesorios-aquagym-material_aquagym-discos_aquagym','discos halterofilia':'equipamiento_accesorios-halterofilia-discos_halterofilia','drones':'equipamiento_accesorios-electronica_deportiva-drones','electroestimulacion':'equipamiento_accesorios-electronica_deportiva-electroestimulacion','electronica deportiva':'equipamiento_accesorios-electronica_deportiva-altavoces','energeticas':'nutricion-fuerza_y_energia-barritas-energeticas','energizantes naturales':'nutricion-recuperacion_muscular-energizantes_naturales','entrenamiento futbol':'equipamiento_accesorios-futbol-entrenamiento_futbol','equipacion arbitro':'ropa-onepiece-equipacion_arbitro','equipaciones de clubs':'ropa-top-equipaciones_de_clubs','equipamiento accesorios accesorios accesorios de agilidad':'equipamiento_accesorios-accesorios-accesorios_de_agilidad','equipamiento accesorios accesorios accesorios de compresion':'equipamiento_accesorios-accesorios-accesorios_de_compresion','equipamiento accesorios accesorios accesorios movil brazaletes':'equipamiento_accesorios-accesorios-accesorios_movil-brazaletes','equipamiento accesorios accesorios accesorios movil fundas acuaticas':'equipamiento_accesorios-accesorios-accesorios_movil-fundas_acuaticas','equipamiento accesorios accesorios accesorios movil otros accesorios movil':'equipamiento_accesorios-accesorios-accesorios_movil-otros_accesorios_movil','equipamiento accesorios accesorios accesorios movil palos y soporte':'equipamiento_accesorios-accesorios-accesorios_movil-palos_y_soporte','equipamiento accesorios accesorios accesorios movil powerbank':'equipamiento_accesorios-accesorios-accesorios_movil-powerbank','equipamiento accesorios accesorios bokken y shinai':'equipamiento_accesorios-accesorios-bokken_y_shinai','equipamiento accesorios accesorios botellas':'equipamiento_accesorios-accesorios-botellas','equipamiento accesorios accesorios bufandas':'equipamiento_accesorios-accesorios-bufandas','equipamiento accesorios accesorios calcetines':'equipamiento_accesorios-accesorios-calcetines','equipamiento accesorios accesorios chalecos salvavidas':'equipamiento_accesorios-accesorios-chalecos_salvavidas','equipamiento accesorios accesorios cinturones':'equipamiento_accesorios-accesorios-cinturones','equipamiento accesorios accesorios cocina barbacoas':'equipamiento_accesorios-accesorios-cocina-barbacoas','equipamiento accesorios accesorios cocina hornillos y gas':'equipamiento_accesorios-accesorios-cocina-hornillos_y_gas','equipamiento accesorios accesorios cocina menaje termos':'equipamiento_accesorios-accesorios-cocina-menaje-termos','equipamiento accesorios accesorios cocina menaje vajillas':'equipamiento_accesorios-accesorios-cocina-menaje-vajillas','equipamiento accesorios accesorios cocina neveras':'equipamiento_accesorios-accesorios-cocina-neveras','equipamiento accesorios accesorios coderas':'equipamiento_accesorios-accesorios-coderas','equipamiento accesorios accesorios diademas cintas':'equipamiento_accesorios-accesorios-diademas_cintas','equipamiento accesorios accesorios funda casco':'equipamiento_accesorios-accesorios-funda_casco','equipamiento accesorios accesorios gafas lentes':'equipamiento_accesorios-accesorios-gafas-lentes','equipamiento accesorios accesorios gorras':'equipamiento_accesorios-accesorios-gorras','equipamiento accesorios accesorios gorros':'equipamiento_accesorios-accesorios-gorros','equipamiento accesorios accesorios guantes':'equipamiento_accesorios-accesorios-guantes','equipamiento accesorios accesorios guantillas':'equipamiento_accesorios-accesorios-guantillas','equipamiento accesorios accesorios hinchador':'equipamiento_accesorios-accesorios-hinchador','equipamiento accesorios accesorios manguitos':'equipamiento_accesorios-accesorios-manguitos','equipamiento accesorios accesorios mascarillas':'equipamiento_accesorios-accesorios-mascarillas','equipamiento accesorios accesorios mochilas y bolsas':'equipamiento_accesorios-accesorios-mochilas_y_bolsas','equipamiento accesorios accesorios mochilas y bolsas bandolera':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-bandolera','equipamiento accesorios accesorios mochilas y bolsas cartera':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-cartera','equipamiento accesorios accesorios mochilas y bolsas estuches':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-estuches','equipamiento accesorios accesorios mochilas y bolsas maleta trolley':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-maleta_trolley','equipamiento accesorios accesorios mochilas y bolsas neceser':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-neceser','equipamiento accesorios accesorios mochilas y bolsas portameriendas':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-portameriendas','equipamiento accesorios accesorios mochilas y bolsas rinonera':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-rinonera','equipamiento accesorios accesorios mochilas y bolsas zapatilleros':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-zapatilleros','equipamiento accesorios accesorios muebles banco':'equipamiento_accesorios-accesorios-muebles-banco','equipamiento accesorios accesorios muebles carpas':'equipamiento_accesorios-accesorios-muebles-carpas','equipamiento accesorios accesorios muebles hamaca':'equipamiento_accesorios-accesorios-muebles-hamaca','equipamiento accesorios accesorios muebles mesa':'equipamiento_accesorios-accesorios-muebles-mesa','equipamiento accesorios accesorios muebles silla':'equipamiento_accesorios-accesorios-muebles-silla','equipamiento accesorios accesorios muebles sombrillas base sombrilla':'equipamiento_accesorios-accesorios-muebles-sombrillas-base_sombrilla','equipamiento accesorios accesorios muebles tumbona':'equipamiento_accesorios-accesorios-muebles-tumbona','equipamiento accesorios accesorios munequeras':'equipamiento_accesorios-accesorios-munequeras','equipamiento accesorios accesorios paos y almohadillas':'equipamiento_accesorios-accesorios-paos_y_almohadillas','equipamiento accesorios accesorios portabotellas':'equipamiento_accesorios-accesorios-portabotellas','equipamiento accesorios accesorios protecciones':'equipamiento_accesorios-accesorios-protecciones','equipamiento accesorios accesorios rodilleras':'equipamiento_accesorios-accesorios-rodilleras','equipamiento accesorios accesorios snowboard fijaciones snowboard':'equipamiento_accesorios-accesorios_snowboard-fijaciones_snowboard','equipamiento accesorios accesorios snowboard otros snowboard':'equipamiento_accesorios-accesorios_snowboard-otros_snowboard','equipamiento accesorios accesorios snowboard tabla snowboard':'equipamiento_accesorios-accesorios_snowboard-tabla_snowboard','equipamiento accesorios accesorios sombrero':'equipamiento_accesorios-accesorios-sombrero','equipamiento accesorios accesorios tenuguis':'equipamiento_accesorios-accesorios-tenuguis','equipamiento accesorios accesorios toallas':'equipamiento_accesorios-accesorios-toallas','equipamiento accesorios aquagym material aquagym churros y conectores':'equipamiento_accesorios-aquagym-material_aquagym-churros_y_conectores','equipamiento accesorios aquagym material aquagym cinturones aquagym':'equipamiento_accesorios-aquagym-material_aquagym-cinturones_aquagym','equipamiento accesorios aquagym material aquagym collar aquagym':'equipamiento_accesorios-aquagym-material_aquagym-collar_aquagym','equipamiento accesorios aquagym material aquagym discos aquagym':'equipamiento_accesorios-aquagym-material_aquagym-discos_aquagym','equipamiento accesorios aquagym material aquagym mancuerna aquagym':'equipamiento_accesorios-aquagym-material_aquagym-mancuerna_aquagym','equipamiento accesorios aquagym material aquagym munequeras aquagym':'equipamiento_accesorios-aquagym-material_aquagym-munequeras_aquagym','equipamiento accesorios aquagym material aquagym pullboys aquagym':'equipamiento_accesorios-aquagym-material_aquagym-pullboys_aquagym','equipamiento accesorios aquagym material aquagym tapiz aquagym':'equipamiento_accesorios-aquagym-material_aquagym-tapiz_aquagym','equipamiento accesorios artes marciales otros artes marciales':'equipamiento_accesorios-artes_marciales-otros_artes_marciales','equipamiento accesorios artes marciales suelo protector':'equipamiento_accesorios-artes_marciales-suelo_protector','equipamiento accesorios badminton otros accesorios badminton':'equipamiento_accesorios-badminton-otros_accesorios_badminton','equipamiento accesorios badminton protecciones badminton':'equipamiento_accesorios-badminton-protecciones_badminton','equipamiento accesorios badminton raqueta badminton':'equipamiento_accesorios-badminton-raqueta_badminton','equipamiento accesorios badminton volante badminton':'equipamiento_accesorios-badminton-volante_badminton','equipamiento accesorios baloncesto balones baloncesto':'equipamiento_accesorios-baloncesto-balones_baloncesto','equipamiento accesorios baloncesto canastas baloncesto':'equipamiento_accesorios-baloncesto-canastas_baloncesto','equipamiento accesorios baloncesto otros accesorios baloncesto':'equipamiento_accesorios-baloncesto-otros_accesorios_baloncesto','equipamiento accesorios baloncesto protecciones baloncesto':'equipamiento_accesorios-baloncesto-protecciones_baloncesto','equipamiento accesorios balonmano balonmano balones':'equipamiento_accesorios-balonmano-balonmano_balones','equipamiento accesorios balonmano balonmano otros':'equipamiento_accesorios-balonmano-balonmano_otros','equipamiento accesorios balonmano protecciones balonmano coderas balonmano':'equipamiento_accesorios-balonmano-protecciones_balonmano-coderas_balonmano','equipamiento accesorios beisbol bates beisbol':'equipamiento_accesorios-beisbol-bates_beisbol','equipamiento accesorios beisbol cascos beisbol':'equipamiento_accesorios-beisbol-cascos_beisbol','equipamiento accesorios beisbol mascaras beisbol':'equipamiento_accesorios-beisbol-mascaras_beisbol','equipamiento accesorios beisbol otros beisbol':'equipamiento_accesorios-beisbol-otros_beisbol','equipamiento accesorios beisbol pelotas beisbol':'equipamiento_accesorios-beisbol-pelotas_beisbol','equipamiento accesorios billar mesas billar':'equipamiento_accesorios-billar-mesas_billar','equipamiento accesorios billar tacos billar':'equipamiento_accesorios-billar-tacos_billar','equipamiento accesorios billar tapetes billar':'equipamiento_accesorios-billar-tapetes_billar','equipamiento accesorios bodyboard otros bodyboard':'equipamiento_accesorios-bodyboard-otros_bodyboard','equipamiento accesorios bodyboard tabla bodyboard':'equipamiento_accesorios-bodyboard-tabla_bodyboard','equipamiento accesorios boxeo cascos boxeo':'equipamiento_accesorios-boxeo-cascos_boxeo','equipamiento accesorios boxeo otros boxeo':'equipamiento_accesorios-boxeo-otros_boxeo','equipamiento accesorios boxeo peras boxeo':'equipamiento_accesorios-boxeo-peras_boxeo','equipamiento accesorios boxeo protecciones coquillas boxeo':'equipamiento_accesorios-boxeo-protecciones-coquillas_boxeo','equipamiento accesorios boxeo protecciones protecciones pecho':'equipamiento_accesorios-boxeo-protecciones-protecciones_pecho','equipamiento accesorios boxeo protecciones protector bucal boxeo':'equipamiento_accesorios-boxeo-protecciones-protector_bucal_boxeo','equipamiento accesorios boxeo sacos boxeo':'equipamiento_accesorios-boxeo-sacos_boxeo','equipamiento accesorios boxeo sacos de pie':'equipamiento_accesorios-boxeo-sacos_de_pie','equipamiento accesorios boxeo soportes boxeo':'equipamiento_accesorios-boxeo-soportes_boxeo','equipamiento accesorios buceo aletas buceo':'equipamiento_accesorios-buceo-aletas_buceo','equipamiento accesorios buceo kit snorkel':'equipamiento_accesorios-buceo-kit_snorkel','equipamiento accesorios buceo mascaras buceo':'equipamiento_accesorios-buceo-mascaras_buceo','equipamiento accesorios buceo ordenadores buceo':'equipamiento_accesorios-buceo-ordenadores_buceo','equipamiento accesorios buceo otros buceo':'equipamiento_accesorios-buceo-otros_buceo','equipamiento accesorios buceo traje de buceo':'equipamiento_accesorios-buceo-traje_de_buceo','equipamiento accesorios buceo tubo snorkel':'equipamiento_accesorios-buceo-tubo_snorkel','equipamiento accesorios ciclismo alforjas':'equipamiento_accesorios-ciclismo-alforjas','equipamiento accesorios ciclismo almacenamiento ciclismo':'equipamiento_accesorios-ciclismo-almacenamiento_ciclismo','equipamiento accesorios ciclismo antipinchazos':'equipamiento_accesorios-ciclismo-antipinchazos','equipamiento accesorios ciclismo aparcabicicletas':'equipamiento_accesorios-ciclismo-aparcabicicletas','equipamiento accesorios ciclismo bicicletas bicicleta montana':'equipamiento_accesorios-ciclismo-bicicletas-bicicleta_montana','equipamiento accesorios ciclismo bicicletas bicicletas bmx':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_bmx','equipamiento accesorios ciclismo bicicletas bicicletas carretera':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_carretera','equipamiento accesorios ciclismo bicicletas bicicletas ciudad':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_ciudad','equipamiento accesorios ciclismo bicicletas bicicletas electricas bicicleta electrica montana':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_electricas-bicicleta_electrica_montana','equipamiento accesorios ciclismo bicicletas bicicletas fixie':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_fixie','equipamiento accesorios ciclismo bicicletas bicicletas gravel':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_gravel','equipamiento accesorios ciclismo bicicletas bicicletas ninos':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_ninos','equipamiento accesorios ciclismo bicicletas bicicletas plegables':'equipamiento_accesorios-ciclismo-bicicletas-bicicletas_plegables','equipamiento accesorios ciclismo bolsa sillin':'equipamiento_accesorios-ciclismo-bolsa_sillin','equipamiento accesorios ciclismo bombas':'equipamiento_accesorios-ciclismo-bombas','equipamiento accesorios ciclismo camaras':'equipamiento_accesorios-ciclismo-camaras','equipamiento accesorios ciclismo candados':'equipamiento_accesorios-ciclismo-candados','equipamiento accesorios ciclismo cascos ciclismo':'equipamiento_accesorios-ciclismo-cascos_ciclismo','equipamiento accesorios ciclismo funda sillin':'equipamiento_accesorios-ciclismo-funda_sillin','equipamiento accesorios ciclismo herramienta ciclismo':'equipamiento_accesorios-ciclismo-herramienta_ciclismo','equipamiento accesorios ciclismo inflador co2':'equipamiento_accesorios-ciclismo-inflador_co2','equipamiento accesorios ciclismo limpieza lubricantes':'equipamiento_accesorios-ciclismo-limpieza_lubricantes','equipamiento accesorios ciclismo luces ciclismo':'equipamiento_accesorios-ciclismo-luces_ciclismo','equipamiento accesorios ciclismo manillares y repuestos':'equipamiento_accesorios-ciclismo-manillares_y_repuestos','equipamiento accesorios ciclismo monociclos':'equipamiento_accesorios-ciclismo-monociclos','equipamiento accesorios ciclismo otros ciclismo':'equipamiento_accesorios-ciclismo-otros_ciclismo','equipamiento accesorios ciclismo pedales':'equipamiento_accesorios-ciclismo-pedales','equipamiento accesorios ciclismo portabicicletas':'equipamiento_accesorios-ciclismo-portabicicletas','equipamiento accesorios ciclismo protecciones ciclismo':'equipamiento_accesorios-ciclismo-protecciones_ciclismo','equipamiento accesorios ciclismo punos bici':'equipamiento_accesorios-ciclismo-punos_bici','equipamiento accesorios ciclismo reflectantes':'equipamiento_accesorios-ciclismo-reflectantes','equipamiento accesorios ciclismo remolques':'equipamiento_accesorios-ciclismo-remolques','equipamiento accesorios ciclismo rodillos':'equipamiento_accesorios-ciclismo-rodillos','equipamiento accesorios ciclismo ruedas':'equipamiento_accesorios-ciclismo-ruedas','equipamiento accesorios ciclismo silla portabebes':'equipamiento_accesorios-ciclismo-silla_portabebes','equipamiento accesorios ciclismo sillines':'equipamiento_accesorios-ciclismo-sillines','equipamiento accesorios ciclismo timbres bici':'equipamiento_accesorios-ciclismo-timbres_bici','equipamiento accesorios ciclismo triciclos':'equipamiento_accesorios-ciclismo-triciclos','equipamiento accesorios correr caminar otros correr caminar':'equipamiento_accesorios-correr_caminar-otros_correr_caminar','equipamiento accesorios danza baile castanuelas':'equipamiento_accesorios-danza_baile-castanuelas','equipamiento accesorios danza baile danza baile otros':'equipamiento_accesorios-danza_baile-danza_baile_otros','equipamiento accesorios electronica deportiva altavoces':'equipamiento_accesorios-electronica_deportiva-altavoces','equipamiento accesorios electronica deportiva auriculares carcasas y fundas':'equipamiento_accesorios-electronica_deportiva-auriculares-carcasas_y_fundas','equipamiento accesorios electronica deportiva banda pulsometro':'equipamiento_accesorios-electronica_deportiva-banda_pulsometro','equipamiento accesorios electronica deportiva basculas':'equipamiento_accesorios-electronica_deportiva-basculas','equipamiento accesorios electronica deportiva camara deportiva':'equipamiento_accesorios-electronica_deportiva-camara_deportiva','equipamiento accesorios electronica deportiva correas reloj':'equipamiento_accesorios-electronica_deportiva-correas_reloj','equipamiento accesorios electronica deportiva cronometros':'equipamiento_accesorios-electronica_deportiva-cronometros','equipamiento accesorios electronica deportiva cuentakilometros':'equipamiento_accesorios-electronica_deportiva-cuentakilometros','equipamiento accesorios electronica deportiva drones':'equipamiento_accesorios-electronica_deportiva-drones','equipamiento accesorios electronica deportiva electroestimulacion':'equipamiento_accesorios-electronica_deportiva-electroestimulacion','equipamiento accesorios electronica deportiva estacion meteorologica':'equipamiento_accesorios-electronica_deportiva-estacion_meteorologica','equipamiento accesorios electronica deportiva moviles':'equipamiento_accesorios-electronica_deportiva-moviles','equipamiento accesorios electronica deportiva navegacion gps':'equipamiento_accesorios-electronica_deportiva-navegacion_gps','equipamiento accesorios electronica deportiva optica deportiva otros optica deportiva':'equipamiento_accesorios-electronica_deportiva-optica_deportiva-otros_optica_deportiva','equipamiento accesorios electronica deportiva optica deportiva prismaticos':'equipamiento_accesorios-electronica_deportiva-optica_deportiva-prismaticos','equipamiento accesorios electronica deportiva optica deportiva telescopio':'equipamiento_accesorios-electronica_deportiva-optica_deportiva-telescopio','equipamiento accesorios electronica deportiva otros':'equipamiento_accesorios-electronica_deportiva-otros','equipamiento accesorios electronica deportiva protectores reloj':'equipamiento_accesorios-electronica_deportiva-protectores_reloj','equipamiento accesorios electronica deportiva pulsera actividad':'equipamiento_accesorios-electronica_deportiva-pulsera_actividad','equipamiento accesorios electronica deportiva relojes':'equipamiento_accesorios-electronica_deportiva-relojes','equipamiento accesorios electronica deportiva relojes pulseras gps pulsometros':'equipamiento_accesorios-electronica_deportiva-relojes_pulseras_gps_pulsometros','equipamiento accesorios electronica deportiva reproductor de musica':'equipamiento_accesorios-electronica_deportiva-reproductor_de_musica','equipamiento accesorios electronica deportiva sensor deportivo':'equipamiento_accesorios-electronica_deportiva-sensor_deportivo','equipamiento accesorios electronica deportiva walkie talkie':'equipamiento_accesorios-electronica_deportiva-walkie_talkie','equipamiento accesorios escalada magnesio':'equipamiento_accesorios-escalada-magnesio','equipamiento accesorios escalada material escalada arneses':'equipamiento_accesorios-escalada-material_escalada-arneses','equipamiento accesorios escalada material escalada aseguradoresdescendores':'equipamiento_accesorios-escalada-material_escalada-aseguradoresdescendores','equipamiento accesorios escalada material escalada bolsa magnesio':'equipamiento_accesorios-escalada-material_escalada-bolsa_magnesio','equipamiento accesorios escalada material escalada cascos':'equipamiento_accesorios-escalada-material_escalada-cascos','equipamiento accesorios escalada material escalada cintas express':'equipamiento_accesorios-escalada-material_escalada-cintas_express','equipamiento accesorios escalada material escalada cuerdas escalada':'equipamiento_accesorios-escalada-material_escalada-cuerdas_escalada','equipamiento accesorios escalada material escalada frontales':'equipamiento_accesorios-escalada-material_escalada-frontales','equipamiento accesorios escalada material escalada mosquetones':'equipamiento_accesorios-escalada-material_escalada-mosquetones','equipamiento accesorios escalada material escalada piolets':'equipamiento_accesorios-escalada-material_escalada-piolets','equipamiento accesorios escalada material escalada poleas':'equipamiento_accesorios-escalada-material_escalada-poleas','equipamiento accesorios escalada otros escalada':'equipamiento_accesorios-escalada-otros_escalada','equipamiento accesorios escalada rocodromos colchonetas rocodromo':'equipamiento_accesorios-escalada-rocodromos-colchonetas_rocodromo','equipamiento accesorios escalada rocodromos volumenes y pesas':'equipamiento_accesorios-escalada-rocodromos-volumenes_y_pesas','equipamiento accesorios esqui acuatico arrastables':'equipamiento_accesorios-esqui_acuatico-arrastables','equipamiento accesorios esqui acuatico esquis':'equipamiento_accesorios-esqui_acuatico-esquis','equipamiento accesorios esqui cascos esqui':'equipamiento_accesorios-esqui-cascos_esqui','equipamiento accesorios esqui esquis':'equipamiento_accesorios-esqui-esquis','equipamiento accesorios esqui fundas mascaras':'equipamiento_accesorios-esqui-fundas_mascaras','equipamiento accesorios esqui mascaras esqui':'equipamiento_accesorios-esqui-mascaras_esqui','equipamiento accesorios esqui otros esqui':'equipamiento_accesorios-esqui-otros_esqui','equipamiento accesorios esqui trineos':'equipamiento_accesorios-esqui-trineos','equipamiento accesorios fitness abdominales':'equipamiento_accesorios-fitness-abdominales','equipamiento accesorios fitness anillas':'equipamiento_accesorios-fitness-anillas','equipamiento accesorios fitness balones fitness':'equipamiento_accesorios-fitness-balones_fitness','equipamiento accesorios fitness balones medicinales':'equipamiento_accesorios-fitness-balones_medicinales','equipamiento accesorios fitness bancos fitness':'equipamiento_accesorios-fitness-bancos_fitness','equipamiento accesorios fitness bancos suecos':'equipamiento_accesorios-fitness-bancos_suecos','equipamiento accesorios fitness bandas elasticas':'equipamiento_accesorios-fitness-bandas_elasticas','equipamiento accesorios fitness barra dominadas':'equipamiento_accesorios-fitness-barra_dominadas','equipamiento accesorios fitness barras fitness':'equipamiento_accesorios-fitness-barras_fitness','equipamiento accesorios fitness barras paralelas':'equipamiento_accesorios-fitness-barras_paralelas','equipamiento accesorios fitness cajon pliometrico':'equipamiento_accesorios-fitness-cajon_pliometrico','equipamiento accesorios fitness calleras':'equipamiento_accesorios-fitness-calleras','equipamiento accesorios fitness cinturonruso':'equipamiento_accesorios-fitness-cinturonruso','equipamiento accesorios fitness combas':'equipamiento_accesorios-fitness-combas','equipamiento accesorios fitness correas de elevacion':'equipamiento_accesorios-fitness-correas_de_elevacion','equipamiento accesorios fitness cuerdas fitness':'equipamiento_accesorios-fitness-cuerdas_fitness','equipamiento accesorios fitness esterillas fitness':'equipamiento_accesorios-fitness-esterillas_fitness','equipamiento accesorios fitness kit entrenamiento':'equipamiento_accesorios-fitness-kit_entrenamiento','equipamiento accesorios fitness maquinas fitness bicicletas elipticas':'equipamiento_accesorios-fitness-maquinas_fitness-bicicletas_elipticas','equipamiento accesorios fitness maquinas fitness bicicletas estaticas':'equipamiento_accesorios-fitness-maquinas_fitness-bicicletas_estaticas','equipamiento accesorios fitness maquinas fitness bicicletas spinning':'equipamiento_accesorios-fitness-maquinas_fitness-bicicletas_spinning','equipamiento accesorios fitness maquinas fitness cintas de correr':'equipamiento_accesorios-fitness-maquinas_fitness-cintas_de_correr','equipamiento accesorios fitness maquinas fitness cintas de correr curva':'equipamiento_accesorios-fitness-maquinas_fitness-cintas_de_correr_curva','equipamiento accesorios fitness maquinas fitness maquinas multiestacion':'equipamiento_accesorios-fitness-maquinas_fitness-maquinas_multiestacion','equipamiento accesorios fitness maquinas fitness maquinas steppers':'equipamiento_accesorios-fitness-maquinas_fitness-maquinas_steppers','equipamiento accesorios fitness maquinas fitness musculacion':'equipamiento_accesorios-fitness-maquinas_fitness-musculacion','equipamiento accesorios fitness maquinas fitness pedalina':'equipamiento_accesorios-fitness-maquinas_fitness-pedalina','equipamiento accesorios fitness maquinas fitness plataformas vibratorias':'equipamiento_accesorios-fitness-maquinas_fitness-plataformas_vibratorias','equipamiento accesorios fitness maquinas fitness remos':'equipamiento_accesorios-fitness-maquinas_fitness-remos','equipamiento accesorios fitness otros fitness':'equipamiento_accesorios-fitness-otros_fitness','equipamiento accesorios fitness pesas discos':'equipamiento_accesorios-fitness-pesas-discos','equipamiento accesorios fitness pesas fijaciones pesas':'equipamiento_accesorios-fitness-pesas-fijaciones_pesas','equipamiento accesorios fitness pesas kettlebells':'equipamiento_accesorios-fitness-pesas-kettlebells','equipamiento accesorios fitness pesas mancuernas':'equipamiento_accesorios-fitness-pesas-mancuernas','equipamiento accesorios fitness pesas otros':'equipamiento_accesorios-fitness-pesas-otros','equipamiento accesorios fitness pesas peso lastrado':'equipamiento_accesorios-fitness-pesas-peso_lastrado','equipamiento accesorios fitness protecciones':'equipamiento_accesorios-fitness-protecciones','equipamiento accesorios fitness rodillos masajes':'equipamiento_accesorios-fitness-rodillos_masajes','equipamiento accesorios fitness saco bulgaro':'equipamiento_accesorios-fitness-saco_bulgaro','equipamiento accesorios frontenis otros frontenis':'equipamiento_accesorios-frontenis-otros_frontenis','equipamiento accesorios frontenis pelotas frontenis':'equipamiento_accesorios-frontenis-pelotas_frontenis','equipamiento accesorios frontenis protecciones frontenis':'equipamiento_accesorios-frontenis-protecciones_frontenis','equipamiento accesorios frontenis raquetas frontenis':'equipamiento_accesorios-frontenis-raquetas_frontenis','equipamiento accesorios frontenis raqueteros frontenis':'equipamiento_accesorios-frontenis-raqueteros_frontenis','equipamiento accesorios futbol americano pelotas futbol americano':'equipamiento_accesorios-futbol_americano-pelotas_futbol_americano','equipamiento accesorios futbol balones futbol':'equipamiento_accesorios-futbol-balones_futbol','equipamiento accesorios futbol banderines':'equipamiento_accesorios-futbol-banderines','equipamiento accesorios futbol banderines arbitro':'equipamiento_accesorios-futbol-banderines_arbitro','equipamiento accesorios futbol brazaletes':'equipamiento_accesorios-futbol-brazaletes','equipamiento accesorios futbol conos':'equipamiento_accesorios-futbol-conos','equipamiento accesorios futbol defensas y barreras':'equipamiento_accesorios-futbol-defensas_y_barreras','equipamiento accesorios futbol entrenamiento futbol':'equipamiento_accesorios-futbol-entrenamiento_futbol','equipamiento accesorios futbol espinilleras':'equipamiento_accesorios-futbol-espinilleras','equipamiento accesorios futbol guantes portero':'equipamiento_accesorios-futbol-guantes_portero','equipamiento accesorios futbol infladores':'equipamiento_accesorios-futbol-infladores','equipamiento accesorios futbol medias calzas':'equipamiento_accesorios-futbol-medias_calzas','equipamiento accesorios futbol otros futbol':'equipamiento_accesorios-futbol-otros_futbol','equipamiento accesorios futbol petos futbol':'equipamiento_accesorios-futbol-petos_futbol','equipamiento accesorios futbol pizarras futbol':'equipamiento_accesorios-futbol-pizarras_futbol','equipamiento accesorios futbol portabalones':'equipamiento_accesorios-futbol-portabalones','equipamiento accesorios futbol porteria futbol':'equipamiento_accesorios-futbol-porteria_futbol','equipamiento accesorios futbol protecciones otros':'equipamiento_accesorios-futbol-protecciones_otros','equipamiento accesorios futbol reboteador futbol':'equipamiento_accesorios-futbol-reboteador_futbol','equipamiento accesorios futbol redes futbol':'equipamiento_accesorios-futbol-redes_futbol','equipamiento accesorios futbol silbatos':'equipamiento_accesorios-futbol-silbatos','equipamiento accesorios futbol tarjeta arbitro':'equipamiento_accesorios-futbol-tarjeta_arbitro','equipamiento accesorios gaming alfombrillas gaming':'equipamiento_accesorios-gaming-alfombrillas_gaming','equipamiento accesorios gaming consolas gaming':'equipamiento_accesorios-gaming-consolas_gaming','equipamiento accesorios gaming mobiliario gaming mesas gaming':'equipamiento_accesorios-gaming-mobiliario_gaming-mesas_gaming','equipamiento accesorios gaming mobiliario gaming sillas gaming':'equipamiento_accesorios-gaming-mobiliario_gaming-sillas_gaming','equipamiento accesorios gaming ordenadores gaming panel lateral gaming':'equipamiento_accesorios-gaming-ordenadores_gaming-panel_lateral_gaming','equipamiento accesorios gaming ordenadores gaming pc gaming':'equipamiento_accesorios-gaming-ordenadores_gaming-pc_gaming','equipamiento accesorios gaming ordenadores gaming portatil gaming':'equipamiento_accesorios-gaming-ordenadores_gaming-portatil_gaming','equipamiento accesorios gaming ordenadores gaming torres gaming':'equipamiento_accesorios-gaming-ordenadores_gaming-torres_gaming','equipamiento accesorios gaming otros gaming':'equipamiento_accesorios-gaming-otros_gaming','equipamiento accesorios gaming perifericos gaming':'equipamiento_accesorios-gaming-perifericos_gaming','equipamiento accesorios gaming perifericos gaming cascos y auriculares gaming':'equipamiento_accesorios-gaming-perifericos_gaming-cascos_y_auriculares_gaming','equipamiento accesorios gaming perifericos gaming gafas 3d gaming':'equipamiento_accesorios-gaming-perifericos_gaming-gafas_3d_gaming','equipamiento accesorios gaming perifericos gaming microfonos gaming':'equipamiento_accesorios-gaming-perifericos_gaming-microfonos_gaming','equipamiento accesorios gaming perifericos gaming pantallas gaming':'equipamiento_accesorios-gaming-perifericos_gaming-pantallas_gaming','equipamiento accesorios gaming perifericos gaming raton gaming':'equipamiento_accesorios-gaming-perifericos_gaming-raton_gaming','equipamiento accesorios gaming perifericos gaming teclado gaming':'equipamiento_accesorios-gaming-perifericos_gaming-teclado_gaming','equipamiento accesorios gaming perifericos gaming volantes gaming':'equipamiento_accesorios-gaming-perifericos_gaming-volantes_gaming','equipamiento accesorios gaming videojuegos':'equipamiento_accesorios-gaming-videojuegos','equipamiento accesorios gimnasia artistica protecciones gimnasia artistica calleras gimnasia artistica':'equipamiento_accesorios-gimnasia_artistica-protecciones_gimnasia_artistica-calleras_gimnasia_artistica','equipamiento accesorios gimnasia ritmica aparatos gimnasia ritmica bandas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-bandas_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica aparatos gimnasia ritmica cintas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-cintas_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica aparatos gimnasia ritmica cuerdas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-cuerdas_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica aparatos gimnasia ritmica mazas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-mazas_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica aparatos gimnasia ritmica otros gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-otros_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica aparatos gimnasia ritmica pelotas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-pelotas_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica aparatos gimnasia ritmica varillas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-varillas_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica otros gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-otros_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica protecciones gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-protecciones_gimnasia_ritmica','equipamiento accesorios gimnasia ritmica puntas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-puntas_gimnasia_ritmica','equipamiento accesorios golf otros golf':'equipamiento_accesorios-golf-otros_golf','equipamiento accesorios golf palos golf':'equipamiento_accesorios-golf-palos_golf','equipamiento accesorios golf pelotas golf':'equipamiento_accesorios-golf-pelotas_golf','equipamiento accesorios golf trolleys golf':'equipamiento_accesorios-golf-trolleys_golf','equipamiento accesorios halterofilia barras halterofilia':'equipamiento_accesorios-halterofilia-barras_halterofilia','equipamiento accesorios halterofilia discos halterofilia':'equipamiento_accesorios-halterofilia-discos_halterofilia','equipamiento accesorios hipica cuidados del caballo':'equipamiento_accesorios-hipica-cuidados_del_caballo','equipamiento accesorios hipica equipamiento caballo':'equipamiento_accesorios-hipica-equipamiento_caballo','equipamiento accesorios hipica equipamiento jinete':'equipamiento_accesorios-hipica-equipamiento_jinete','equipamiento accesorios hipica otros hipica':'equipamiento_accesorios-hipica-otros_hipica','equipamiento accesorios hockey otros hockey':'equipamiento_accesorios-hockey-otros_hockey','equipamiento accesorios hockey palos hockey':'equipamiento_accesorios-hockey-palos_hockey','equipamiento accesorios hockey pelotas y discos hockey':'equipamiento_accesorios-hockey-pelotas_y_discos_hockey','equipamiento accesorios juegos air hockey':'equipamiento_accesorios-juegos-air_hockey','equipamiento accesorios juegos barcas':'equipamiento_accesorios-juegos-barcas','equipamiento accesorios juegos dianas dardos diana':'equipamiento_accesorios-juegos-dianas-dardos_diana','equipamiento accesorios juegos futbolin':'equipamiento_accesorios-juegos-futbolin','equipamiento accesorios juegos jardin cama elastica protectores cama elastica':'equipamiento_accesorios-juegos-jardin-cama_elastica-protectores_cama_elastica','equipamiento accesorios juegos jardin columpios':'equipamiento_accesorios-juegos-jardin-columpios','equipamiento accesorios juegos jardin hinchables':'equipamiento_accesorios-juegos-jardin-hinchables','equipamiento accesorios juegos jardin petanca':'equipamiento_accesorios-juegos-jardin-petanca','equipamiento accesorios juegos jardin toboganes':'equipamiento_accesorios-juegos-jardin-toboganes','equipamiento accesorios juegos juegos acuaticos':'equipamiento_accesorios-juegos-juegos_acuaticos','equipamiento accesorios juegos juegos baloncesto':'equipamiento_accesorios-juegos-juegos_baloncesto','equipamiento accesorios juegos juegos lanzadores':'equipamiento_accesorios-juegos-juegos_lanzadores','equipamiento accesorios juegos juegos otros':'equipamiento_accesorios-juegos-juegos_otros','equipamiento accesorios juegos karts':'equipamiento_accesorios-juegos-karts','equipamiento accesorios juegos mesas multijuegos':'equipamiento_accesorios-juegos-mesas_multijuegos','equipamiento accesorios juegos parques infantiles':'equipamiento_accesorios-juegos-parques_infantiles','equipamiento accesorios kayak asiento kayak':'equipamiento_accesorios-kayak-asiento_kayak','equipamiento accesorios kayak carros kayak':'equipamiento_accesorios-kayak-carros_kayak','equipamiento accesorios kayak kayaks kayak hinchables':'equipamiento_accesorios-kayak-kayaks-kayak_hinchables','equipamiento accesorios kayak kayaks kayak rigidos':'equipamiento_accesorios-kayak-kayaks-kayak_rigidos','equipamiento accesorios kayak otros kayak':'equipamiento_accesorios-kayak-otros_kayak','equipamiento accesorios kayak remo kayak':'equipamiento_accesorios-kayak-remo_kayak','equipamiento accesorios kitesurf cometa kitesurf':'equipamiento_accesorios-kitesurf-cometa_kitesurf','equipamiento accesorios kitesurf tabla kitesurf':'equipamiento_accesorios-kitesurf-tabla_kitesurf','equipamiento accesorios marcha nordica bastones marcha nordica':'equipamiento_accesorios-marcha_nordica-bastones_marcha_nordica','equipamiento accesorios motociclismo baul moto':'equipamiento_accesorios-motociclismo-baul_moto','equipamiento accesorios motociclismo cascos motociclismo':'equipamiento_accesorios-motociclismo-cascos_motociclismo','equipamiento accesorios motociclismo otros motociclismo':'equipamiento_accesorios-motociclismo-otros_motociclismo','equipamiento accesorios muay thai protecciones muay thai':'equipamiento_accesorios-muay_thai-protecciones_muay_thai','equipamiento accesorios natacion aletas natacion':'equipamiento_accesorios-natacion-aletas_natacion','equipamiento accesorios natacion boyas natacion':'equipamiento_accesorios-natacion-boyas_natacion','equipamiento accesorios natacion gafas piscina':'equipamiento_accesorios-natacion-gafas_piscina','equipamiento accesorios natacion gorros piscina':'equipamiento_accesorios-natacion-gorros_piscina','equipamiento accesorios natacion manoplas natacion':'equipamiento_accesorios-natacion-manoplas_natacion','equipamiento accesorios natacion otros natacion':'equipamiento_accesorios-natacion-otros_natacion','equipamiento accesorios natacion pinzas nariz':'equipamiento_accesorios-natacion-pinzas_nariz','equipamiento accesorios natacion piscinas accesorios piscinas accesorios piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-accesorios_piscinas','equipamiento accesorios natacion piscinas accesorios piscinas cubiertas piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-cubiertas_piscinas','equipamiento accesorios natacion piscinas accesorios piscinas escaleras piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-escaleras_piscinas','equipamiento accesorios natacion piscinas accesorios piscinas limpieza piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-limpieza_piscinas','equipamiento accesorios natacion piscinas accesorios piscinas otros piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-otros_piscinas','equipamiento accesorios natacion piscinas jacuzzi piscinas':'equipamiento_accesorios-natacion-piscinas-jacuzzi_piscinas','equipamiento accesorios natacion piscinas piscinas desmontables':'equipamiento_accesorios-natacion-piscinas-piscinas_desmontables','equipamiento accesorios natacion piscinas piscinas hinchables piscinas infantiles':'equipamiento_accesorios-natacion-piscinas-piscinas_hinchables-piscinas_infantiles','equipamiento accesorios natacion piscinas piscinas madera':'equipamiento_accesorios-natacion-piscinas-piscinas_madera','equipamiento accesorios natacion tablas natacion':'equipamiento_accesorios-natacion-tablas_natacion','equipamiento accesorios natacion tapones':'equipamiento_accesorios-natacion-tapones','equipamiento accesorios paddlesurf aletas paddlesurf':'equipamiento_accesorios-paddlesurf-aletas_paddlesurf','equipamiento accesorios paddlesurf asientos paddlesurf':'equipamiento_accesorios-paddlesurf-asientos_paddlesurf','equipamiento accesorios paddlesurf bolsa estanca':'equipamiento_accesorios-paddlesurf-bolsa_estanca','equipamiento accesorios paddlesurf leash':'equipamiento_accesorios-paddlesurf-leash','equipamiento accesorios paddlesurf otros paddlesurf':'equipamiento_accesorios-paddlesurf-otros_paddlesurf','equipamiento accesorios paddlesurf remo paddlesurf':'equipamiento_accesorios-paddlesurf-remo_paddlesurf','equipamiento accesorios paddlesurf tabla paddlesurf':'equipamiento_accesorios-paddlesurf-tabla_paddlesurf','equipamiento accesorios padel otros padel':'equipamiento_accesorios-padel-otros_padel','equipamiento accesorios padel overgrips':'equipamiento_accesorios-padel-overgrips','equipamiento accesorios padel palas padel':'equipamiento_accesorios-padel-palas_padel','equipamiento accesorios padel paleteros padel':'equipamiento_accesorios-padel-paleteros_padel','equipamiento accesorios padel pelotas padel':'equipamiento_accesorios-padel-pelotas_padel','equipamiento accesorios padel protecciones padel':'equipamiento_accesorios-padel-protecciones_padel','equipamiento accesorios patinaje cubrepatines':'equipamiento_accesorios-patinaje-cubrepatines','equipamiento accesorios patinaje hoverboards fundas hoverboards':'equipamiento_accesorios-patinaje-hoverboards-fundas_hoverboards','equipamiento accesorios patinaje hoverkarts':'equipamiento_accesorios-patinaje-hoverkarts','equipamiento accesorios patinaje monopatines':'equipamiento_accesorios-patinaje-monopatines','equipamiento accesorios patinaje otros patinaje':'equipamiento_accesorios-patinaje-otros_patinaje','equipamiento accesorios patinaje patinaje cascos':'equipamiento_accesorios-patinaje-patinaje_cascos','equipamiento accesorios patinaje patines hielo':'equipamiento_accesorios-patinaje-patines_hielo','equipamiento accesorios patinaje patines patines linea':'equipamiento_accesorios-patinaje-patines-patines_linea','equipamiento accesorios patinaje patines patines quad':'equipamiento_accesorios-patinaje-patines-patines_quad','equipamiento accesorios patinaje patinetes electricos':'equipamiento_accesorios-patinaje-patinetes_electricos','equipamiento accesorios patinaje patinetes repuestos patinetes ruedas patinetes':'equipamiento_accesorios-patinaje-patinetes-repuestos_patinetes-ruedas_patinetes','equipamiento accesorios patinaje protecciones patinaje':'equipamiento_accesorios-patinaje-protecciones_patinaje','equipamiento accesorios patinaje recambios patinaje':'equipamiento_accesorios-patinaje-recambios_patinaje','equipamiento accesorios patinaje ruedas patinaje':'equipamiento_accesorios-patinaje-ruedas_patinaje','equipamiento accesorios pesca calzado pesca':'equipamiento_accesorios-pesca-calzado_pesca','equipamiento accesorios pesca otros pesca':'equipamiento_accesorios-pesca-otros_pesca','equipamiento accesorios pesca redes pesca':'equipamiento_accesorios-pesca-redes_pesca','equipamiento accesorios pickleball otros accesorios de pickleball':'equipamiento_accesorios-pickleball-otros_accesorios_de_pickleball','equipamiento accesorios pickleball palas de pickleball':'equipamiento_accesorios-pickleball-palas_de_pickleball','equipamiento accesorios pickleball pelotas de pickleball':'equipamiento_accesorios-pickleball-pelotas_de_pickleball','equipamiento accesorios pingpong mesas pingpong':'equipamiento_accesorios-pingpong-mesas_pingpong','equipamiento accesorios pingpong otros pingpong':'equipamiento_accesorios-pingpong-otros_pingpong','equipamiento accesorios pingpong pelotas pingpong':'equipamiento_accesorios-pingpong-pelotas_pingpong','equipamiento accesorios pingpong protecciones pingpong':'equipamiento_accesorios-pingpong-protecciones_pingpong','equipamiento accesorios pingpong raquetas pingpong':'equipamiento_accesorios-pingpong-raquetas_pingpong','equipamiento accesorios playa esterillas playa':'equipamiento_accesorios-playa-esterillas_playa','equipamiento accesorios playa otros playa':'equipamiento_accesorios-playa-otros_playa','equipamiento accesorios playa paravientos playa':'equipamiento_accesorios-playa-paravientos_playa','equipamiento accesorios rugby balones rugby':'equipamiento_accesorios-rugby-balones_rugby','equipamiento accesorios skimboard otros skimboard':'equipamiento_accesorios-skimboard-otros_skimboard','equipamiento accesorios skimboard tabla skimboard':'equipamiento_accesorios-skimboard-tabla_skimboard','equipamiento accesorios squash otros squash':'equipamiento_accesorios-squash-otros_squash','equipamiento accesorios squash pelotas squash':'equipamiento_accesorios-squash-pelotas_squash','equipamiento accesorios squash raquetas squash':'equipamiento_accesorios-squash-raquetas_squash','equipamiento accesorios surf otros surf':'equipamiento_accesorios-surf-otros_surf','equipamiento accesorios surf tabla surf':'equipamiento_accesorios-surf-tabla_surf','equipamiento accesorios tenis carros tenis':'equipamiento_accesorios-tenis-carros_tenis','equipamiento accesorios tenis cintasmunequeras':'equipamiento_accesorios-tenis-cintasmunequeras','equipamiento accesorios tenis cordaje tenis':'equipamiento_accesorios-tenis-cordaje_tenis','equipamiento accesorios tenis otros tenis':'equipamiento_accesorios-tenis-otros_tenis','equipamiento accesorios tenis palas tenis playa':'equipamiento_accesorios-tenis-palas_tenis_playa','equipamiento accesorios tenis pelotas tenis':'equipamiento_accesorios-tenis-pelotas_tenis','equipamiento accesorios tenis protecciones tenis':'equipamiento_accesorios-tenis-protecciones_tenis','equipamiento accesorios tenis raquetas tenis':'equipamiento_accesorios-tenis-raquetas_tenis','equipamiento accesorios tenis raqueteros tenis':'equipamiento_accesorios-tenis-raqueteros_tenis','equipamiento accesorios tiro con arco arcos':'equipamiento_accesorios-tiro_con_arco-arcos','equipamiento accesorios tiro con arco flechas':'equipamiento_accesorios-tiro_con_arco-flechas','equipamiento accesorios trekking montana accesorios camping baterias camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-baterias_camping','equipamiento accesorios trekking montana accesorios camping cabina ducha':'equipamiento_accesorios-trekking_montana-accesorios_camping-cabina_ducha','equipamiento accesorios trekking montana accesorios camping cama camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-cama_camping','equipamiento accesorios trekking montana accesorios camping depositos de agua':'equipamiento_accesorios-trekking_montana-accesorios_camping-depositos_de_agua','equipamiento accesorios trekking montana accesorios camping mosquiteras camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-mosquiteras_camping','equipamiento accesorios trekking montana accesorios camping muebles camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-muebles_camping','equipamiento accesorios trekking montana accesorios camping suelo tienda campana':'equipamiento_accesorios-trekking_montana-accesorios_camping-suelo_tienda_campana','equipamiento accesorios trekking montana accesorios camping toldos camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-toldos_camping','equipamiento accesorios trekking montana accesorios camping wc portatil':'equipamiento_accesorios-trekking_montana-accesorios_camping-wc_portatil','equipamiento accesorios trekking montana baston trekking':'equipamiento_accesorios-trekking_montana-baston_trekking','equipamiento accesorios trekking montana brujulas':'equipamiento_accesorios-trekking_montana-brujulas','equipamiento accesorios trekking montana colchones camping':'equipamiento_accesorios-trekking_montana-colchones_camping','equipamiento accesorios trekking montana colchonetas trekking':'equipamiento_accesorios-trekking_montana-colchonetas_trekking','equipamiento accesorios trekking montana iluminacion lamparas camping':'equipamiento_accesorios-trekking_montana-iluminacion-lamparas_camping','equipamiento accesorios trekking montana iluminacion linternas':'equipamiento_accesorios-trekking_montana-iluminacion-linternas','equipamiento accesorios trekking montana montana hidratacion':'equipamiento_accesorios-trekking_montana-montana_hidratacion','equipamiento accesorios trekking montana otros trekking':'equipamiento_accesorios-trekking_montana-otros_trekking','equipamiento accesorios trekking montana sacos de dormir':'equipamiento_accesorios-trekking_montana-sacos_de_dormir','equipamiento accesorios trekking montana tiendas de campana':'equipamiento_accesorios-trekking_montana-tiendas_de_campana','equipamiento accesorios triatlon otros triatlon':'equipamiento_accesorios-triatlon-otros_triatlon','equipamiento accesorios triatlon triatlon trajes':'equipamiento_accesorios-triatlon-triatlon_trajes','equipamiento accesorios voleibol balones voleibol':'equipamiento_accesorios-voleibol-balones_voleibol','equipamiento accesorios voleibol otros voleibol':'equipamiento_accesorios-voleibol-otros_voleibol','equipamiento accesorios voleibol protecciones voleibol':'equipamiento_accesorios-voleibol-protecciones_voleibol','equipamiento accesorios wakeboard otros wakeboard':'equipamiento_accesorios-wakeboard-otros_wakeboard','equipamiento accesorios wakeboard tabla wakeboard':'equipamiento_accesorios-wakeboard-tabla_wakeboard','equipamiento accesorios windsurf otros windsurf':'equipamiento_accesorios-windsurf-otros_windsurf','equipamiento accesorios windsurf tabla windsurf':'equipamiento_accesorios-windsurf-tabla_windsurf','equipamiento accesorios windsurf vela windsurf':'equipamiento_accesorios-windsurf-vela_windsurf','equipamiento accesorios wingfoil alas wingfoil':'equipamiento_accesorios-wingfoil-alas_wingfoil','equipamiento accesorios wingfoil foil motor':'equipamiento_accesorios-wingfoil-foil_motor','equipamiento accesorios wingfoil otros wingfoil':'equipamiento_accesorios-wingfoil-otros_wingfoil','equipamiento accesorios wingfoil tabla wingfoil':'equipamiento_accesorios-wingfoil-tabla_wingfoil','equipamiento accesorios yoga pilates aros yoga pilates':'equipamiento_accesorios-yoga_pilates-aros_yoga_pilates','equipamiento accesorios yoga pilates balones yoga pilates':'equipamiento_accesorios-yoga_pilates-balones_yoga_pilates','equipamiento accesorios yoga pilates bloques yoga pilates':'equipamiento_accesorios-yoga_pilates-bloques_yoga_pilates','equipamiento accesorios yoga pilates esterillas yoga pilates':'equipamiento_accesorios-yoga_pilates-esterillas_yoga_pilates','equipamiento accesorios yoga pilates kit yoga pilates':'equipamiento_accesorios-yoga_pilates-kit_yoga_pilates','equipamiento accesorios yoga pilates maquinas yoga pilates':'equipamiento_accesorios-yoga_pilates-maquinas_yoga_pilates','equipamiento accesorios yoga pilates otros yoga pilates':'equipamiento_accesorios-yoga_pilates-otros_yoga_pilates','equipamiento accesorios yoga pilates ruedas yoga pilates':'equipamiento_accesorios-yoga_pilates-ruedas_yoga_pilates','equipamiento accesorios yoga pilates zafus y cojines':'equipamiento_accesorios-yoga_pilates-zafus_y_cojines','equipamiento caballo':'equipamiento_accesorios-hipica-equipamiento_caballo','equipamiento jinete':'equipamiento_accesorios-hipica-equipamiento_jinete','escalada':'calzado-escalada','escaleras piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-escaleras_piscinas','espinilleras':'equipamiento_accesorios-futbol-espinilleras','esqui':'equipamiento_accesorios-esqui-cascos_esqui','esqui acuatico':'equipamiento_accesorios-esqui_acuatico-arrastables','esquis':'equipamiento_accesorios-esqui-esquis','estacion meteorologica':'equipamiento_accesorios-electronica_deportiva-estacion_meteorologica','esterillas fitness':'equipamiento_accesorios-fitness-esterillas_fitness','esterillas playa':'equipamiento_accesorios-playa-esterillas_playa','esterillas yoga pilates':'equipamiento_accesorios-yoga_pilates-esterillas_yoga_pilates','estimulante de testosterona':'nutricion-fuerza_y_energia-estimulante_de_testosterona','estuches':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-estuches','experiencias aire':'experiencias_multiaventura-experiencias_aire','experiencias mar':'experiencias_multiaventura-experiencias_mar','experiencias montana':'experiencias_multiaventura-experiencias_montana','experiencias multiaventura experiencias aire':'experiencias_multiaventura-experiencias_aire','experiencias multiaventura experiencias mar':'experiencias_multiaventura-experiencias_mar','experiencias multiaventura experiencias montana':'experiencias_multiaventura-experiencias_montana','experiencias multiaventura experiencias ocio':'experiencias_multiaventura-experiencias_ocio','experiencias ocio':'experiencias_multiaventura-experiencias_ocio','falda vestido':'ropa-bottoms-falda_vestido','fijaciones pesas':'equipamiento_accesorios-fitness-pesas-fijaciones_pesas','fijaciones snowboard':'equipamiento_accesorios-accesorios_snowboard-fijaciones_snowboard','fitness':'calzado-fitness','flamenco':'calzado-flamenco','flechas':'equipamiento_accesorios-tiro_con_arco-flechas','foil motor':'equipamiento_accesorios-wingfoil-foil_motor','forrospolares':'ropa-top-forrospolares','frontales':'equipamiento_accesorios-escalada-material_escalada-frontales','frontenis':'equipamiento_accesorios-frontenis-otros_frontenis','frutos secos':'nutricion-alimentacion_saludable-frutos_secos','fuerza y energia':'nutricion-fuerza_y_energia-barritas-dieteticas','funda casco':'equipamiento_accesorios-accesorios-funda_casco','funda sillin':'equipamiento_accesorios-ciclismo-funda_sillin','fundas acuaticas':'equipamiento_accesorios-accesorios-accesorios_movil-fundas_acuaticas','fundas hoverboards':'equipamiento_accesorios-patinaje-hoverboards-fundas_hoverboards','fundas mascaras':'equipamiento_accesorios-esqui-fundas_mascaras','futbol':'equipamiento_accesorios-futbol-balones_futbol','futbol americano':'calzado-futbol_americano','futbolin':'equipamiento_accesorios-juegos-futbolin','gafas 3d gaming':'equipamiento_accesorios-gaming-perifericos_gaming-gafas_3d_gaming','gafas piscina':'equipamiento_accesorios-natacion-gafas_piscina','gaming':'equipamiento_accesorios-gaming-alfombrillas_gaming','ganadores de masa':'nutricion-aumento_muscular-ganadores_de_masa','gel':'nutricion-fuerza_y_energia-gel','gimnasia artistica':'equipamiento_accesorios-gimnasia_artistica-protecciones_gimnasia_artistica-calleras_gimnasia_artistica','gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-bandas_gimnasia_ritmica','gofres':'nutricion-alimentacion_saludable-gofres','golf':'calzado-golf','gorras':'equipamiento_accesorios-accesorios-gorras','gorros':'equipamiento_accesorios-accesorios-gorros','gorros piscina':'equipamiento_accesorios-natacion-gorros_piscina','guantes':'equipamiento_accesorios-accesorios-guantes','guantes portero':'equipamiento_accesorios-futbol-guantes_portero','guantillas':'equipamiento_accesorios-accesorios-guantillas','halterofilia':'calzado-halterofilia','hamaca':'equipamiento_accesorios-accesorios-muebles-hamaca','harinas cereales y derivados':'nutricion-alimentacion_saludable-harinas_cereales_y_derivados','herramienta ciclismo':'equipamiento_accesorios-ciclismo-herramienta_ciclismo','hervidor agua':'nutricion-utensilios_cocina-hervidor_agua','higiene':'cuidados_del_deportista-higiene','hinchables':'equipamiento_accesorios-juegos-jardin-hinchables','hinchador':'equipamiento_accesorios-accesorios-hinchador','hipica':'equipamiento_accesorios-hipica-cuidados_del_caballo','hockey':'equipamiento_accesorios-hockey-otros_hockey','hockey campo':'calzado-hockey_campo','hornillos y gas':'equipamiento_accesorios-accesorios-cocina-hornillos_y_gas','hoverkarts':'equipamiento_accesorios-patinaje-hoverkarts','inflador co2':'equipamiento_accesorios-ciclismo-inflador_co2','infladores':'equipamiento_accesorios-futbol-infladores','interior':'ropa-bottoms-interior','isolate whey':'nutricion-proteinas-whey-isolate_whey','jacuzzi piscinas':'equipamiento_accesorios-natacion-piscinas-jacuzzi_piscinas','juegos':'equipamiento_accesorios-juegos-air_hockey','juegos acuaticos':'equipamiento_accesorios-juegos-juegos_acuaticos','juegos baloncesto':'equipamiento_accesorios-juegos-juegos_baloncesto','juegos lanzadores':'equipamiento_accesorios-juegos-juegos_lanzadores','juegos otros':'equipamiento_accesorios-juegos-juegos_otros','karts':'equipamiento_accesorios-juegos-karts','kayak':'equipamiento_accesorios-kayak-asiento_kayak','kayak hinchables':'equipamiento_accesorios-kayak-kayaks-kayak_hinchables','kayak rigidos':'equipamiento_accesorios-kayak-kayaks-kayak_rigidos','kettlebells':'equipamiento_accesorios-fitness-pesas-kettlebells','kit entrenamiento':'equipamiento_accesorios-fitness-kit_entrenamiento','kit snorkel':'equipamiento_accesorios-buceo-kit_snorkel','kit yoga pilates':'equipamiento_accesorios-yoga_pilates-kit_yoga_pilates','kitesurf':'equipamiento_accesorios-kitesurf-cometa_kitesurf','l-carlitina':'nutricion-adelgazamiento-l-carlitina','lamparas camping':'equipamiento_accesorios-trekking_montana-iluminacion-lamparas_camping','lanzamientos':'calzado-atletismo-lanzamientos','leash':'equipamiento_accesorios-paddlesurf-leash','lentes':'equipamiento_accesorios-accesorios-gafas-lentes','licuadora':'nutricion-utensilios_cocina-licuadora','limpieza lubricantes':'equipamiento_accesorios-ciclismo-limpieza_lubricantes','limpieza piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-limpieza_piscinas','linternas':'equipamiento_accesorios-trekking_montana-iluminacion-linternas','luces ciclismo':'equipamiento_accesorios-ciclismo-luces_ciclismo','magnesio':'equipamiento_accesorios-escalada-magnesio','maillots':'ropa-top-maillots','maleta trolley':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-maleta_trolley','malla termica':'ropa-bottoms-malla_termica','mallas cortas':'ropa-bottoms-leggins_mallas-mallas_cortas','mallas largas':'ropa-bottoms-leggins_mallas-mallas_largas','mallas pirata':'ropa-bottoms-leggins_mallas-mallas_pirata','mancuerna aquagym':'equipamiento_accesorios-aquagym-material_aquagym-mancuerna_aquagym','mancuernas':'equipamiento_accesorios-fitness-pesas-mancuernas','manguitos':'equipamiento_accesorios-accesorios-manguitos','manillares y repuestos':'equipamiento_accesorios-ciclismo-manillares_y_repuestos','manoplas natacion':'equipamiento_accesorios-natacion-manoplas_natacion','maquinas multiestacion':'equipamiento_accesorios-fitness-maquinas_fitness-maquinas_multiestacion','maquinas steppers':'equipamiento_accesorios-fitness-maquinas_fitness-maquinas_steppers','maquinas yoga pilates':'equipamiento_accesorios-yoga_pilates-maquinas_yoga_pilates','marcha':'calzado-atletismo-marcha','marcha nordica':'equipamiento_accesorios-marcha_nordica-bastones_marcha_nordica','masajeadores corporales':'cuidados_del_deportista-material_de_recuperacion-masajeadores-masajeadores_corporales','mascaras beisbol':'equipamiento_accesorios-beisbol-mascaras_beisbol','mascaras buceo':'equipamiento_accesorios-buceo-mascaras_buceo','mascaras esqui':'equipamiento_accesorios-esqui-mascaras_esqui','mascarillas':'equipamiento_accesorios-accesorios-mascarillas','material de recuperacion':'cuidados_del_deportista-material_de_recuperacion-masajeadores-masajeadores_corporales','mazas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-mazas_gimnasia_ritmica','medias calzas':'equipamiento_accesorios-futbol-medias_calzas','mesa':'equipamiento_accesorios-accesorios-muebles-mesa','mesas billar':'equipamiento_accesorios-billar-mesas_billar','mesas gaming':'equipamiento_accesorios-gaming-mobiliario_gaming-mesas_gaming','mesas multijuegos':'equipamiento_accesorios-juegos-mesas_multijuegos','mesas pingpong':'equipamiento_accesorios-pingpong-mesas_pingpong','microfonos gaming':'equipamiento_accesorios-gaming-perifericos_gaming-microfonos_gaming','mochilas y bolsas':'equipamiento_accesorios-accesorios-mochilas_y_bolsas','monociclos':'equipamiento_accesorios-ciclismo-monociclos','monopatines':'equipamiento_accesorios-patinaje-monopatines','monos':'ropa-onepiece-monos','montana hidratacion':'equipamiento_accesorios-trekking_montana-montana_hidratacion','mosquetones':'equipamiento_accesorios-escalada-material_escalada-mosquetones','mosquiteras camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-mosquiteras_camping','motociclismo':'equipamiento_accesorios-motociclismo-baul_moto','moviles':'equipamiento_accesorios-electronica_deportiva-moviles','muay thai':'equipamiento_accesorios-muay_thai-protecciones_muay_thai','muebles camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-muebles_camping','munequeras':'equipamiento_accesorios-accesorios-munequeras','munequeras aquagym':'equipamiento_accesorios-aquagym-material_aquagym-munequeras_aquagym','musculacion':'equipamiento_accesorios-fitness-maquinas_fitness-musculacion','natacion':'calzado-natacion','navegacion gps':'equipamiento_accesorios-electronica_deportiva-navegacion_gps','neceser':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-neceser','neoprenos':'ropa-onepiece-neoprenos','neveras':'equipamiento_accesorios-accesorios-cocina-neveras','nutricion adelgazamiento cla':'nutricion-adelgazamiento-cla','nutricion adelgazamiento l-carlitina':'nutricion-adelgazamiento-l-carlitina','nutricion adelgazamiento termogenicos':'nutricion-adelgazamiento-termogenicos','nutricion alimentacion saludable batidos y smoothies':'nutricion-alimentacion_saludable-batidos_y_smoothies','nutricion alimentacion saludable bebida':'nutricion-alimentacion_saludable-bebida','nutricion alimentacion saludable cremas y salsas':'nutricion-alimentacion_saludable-cremas_y_salsas','nutricion alimentacion saludable frutos secos':'nutricion-alimentacion_saludable-frutos_secos','nutricion alimentacion saludable gofres':'nutricion-alimentacion_saludable-gofres','nutricion alimentacion saludable harinas cereales y derivados':'nutricion-alimentacion_saludable-harinas_cereales_y_derivados','nutricion alimentacion saludable platos preparados':'nutricion-alimentacion_saludable-platos_preparados','nutricion alimentacion saludable snacks':'nutricion-alimentacion_saludable-snacks','nutricion alimentacion saludable tortitas':'nutricion-alimentacion_saludable-tortitas','nutricion aumento muscular carbohidratos':'nutricion-aumento_muscular-carbohidratos','nutricion aumento muscular creatina':'nutricion-aumento_muscular-creatina','nutricion aumento muscular ganadores de masa':'nutricion-aumento_muscular-ganadores_de_masa','nutricion fuerza y energia barritas dieteticas':'nutricion-fuerza_y_energia-barritas-dieteticas','nutricion fuerza y energia barritas energeticas':'nutricion-fuerza_y_energia-barritas-energeticas','nutricion fuerza y energia barritas proteicas':'nutricion-fuerza_y_energia-barritas-proteicas','nutricion fuerza y energia estimulante de testosterona':'nutricion-fuerza_y_energia-estimulante_de_testosterona','nutricion fuerza y energia gel':'nutricion-fuerza_y_energia-gel','nutricion otros nutricion':'nutricion-otros_nutricion','nutricion proteinas caseina':'nutricion-proteinas-caseina','nutricion proteinas organica':'nutricion-proteinas-organica','nutricion proteinas whey isolate whey':'nutricion-proteinas-whey-isolate_whey','nutricion proteinas whey whey hidrolizado':'nutricion-proteinas-whey-whey_hidrolizado','nutricion proteinas whey whey vegan':'nutricion-proteinas-whey-whey_vegan','nutricion recuperacion muscular aminoacidos':'nutricion-recuperacion_muscular-aminoacidos','nutricion recuperacion muscular bcaa y otros aminoacidos':'nutricion-recuperacion_muscular-bcaa_y_otros_aminoacidos','nutricion recuperacion muscular bebidas isotonicas':'nutricion-recuperacion_muscular-bebidas_isotonicas','nutricion recuperacion muscular energizantes naturales':'nutricion-recuperacion_muscular-energizantes_naturales','nutricion salud antioxidantes':'nutricion-salud-antioxidantes','nutricion salud articulaciones cartilagos y huesos':'nutricion-salud-articulaciones_cartilagos_y_huesos','nutricion salud omega 3 y otros acidos grasos':'nutricion-salud-omega_3_y_otros_acidos_grasos','nutricion salud productos organicos':'nutricion-salud-productos_organicos','nutricion salud semillas hierbas y alimentos ricos en fibra':'nutricion-salud-semillas_hierbas_y_alimentos_ricos_en_fibra','nutricion salud vitaminas y minerales':'nutricion-salud-vitaminas_y_minerales','nutricion utensilios cocina bascula':'nutricion-utensilios_cocina-bascula','nutricion utensilios cocina batidora':'nutricion-utensilios_cocina-batidora','nutricion utensilios cocina hervidor agua':'nutricion-utensilios_cocina-hervidor_agua','nutricion utensilios cocina licuadora':'nutricion-utensilios_cocina-licuadora','nutricion utensilios cocina otros utensilios cocina':'nutricion-utensilios_cocina-otros_utensilios_cocina','omega 3 y otros acidos grasos':'nutricion-salud-omega_3_y_otros_acidos_grasos','onepiece':'ropa-onepiece-banador','ordenadores buceo':'equipamiento_accesorios-buceo-ordenadores_buceo','organica':'nutricion-proteinas-organica','otros':'equipamiento_accesorios-electronica_deportiva-otros','otros accesorios badminton':'equipamiento_accesorios-badminton-otros_accesorios_badminton','otros accesorios baloncesto':'equipamiento_accesorios-baloncesto-otros_accesorios_baloncesto','otros accesorios de pickleball':'equipamiento_accesorios-pickleball-otros_accesorios_de_pickleball','otros accesorios movil':'equipamiento_accesorios-accesorios-accesorios_movil-otros_accesorios_movil','otros artes marciales':'equipamiento_accesorios-artes_marciales-otros_artes_marciales','otros beisbol':'equipamiento_accesorios-beisbol-otros_beisbol','otros bodyboard':'equipamiento_accesorios-bodyboard-otros_bodyboard','otros boxeo':'equipamiento_accesorios-boxeo-otros_boxeo','otros buceo':'equipamiento_accesorios-buceo-otros_buceo','otros ciclismo':'equipamiento_accesorios-ciclismo-otros_ciclismo','otros correr caminar':'equipamiento_accesorios-correr_caminar-otros_correr_caminar','otros cuidados':'cuidados_del_deportista-otros_cuidados','otros escalada':'equipamiento_accesorios-escalada-otros_escalada','otros esqui':'equipamiento_accesorios-esqui-otros_esqui','otros fitness':'equipamiento_accesorios-fitness-otros_fitness','otros frontenis':'equipamiento_accesorios-frontenis-otros_frontenis','otros futbol':'equipamiento_accesorios-futbol-otros_futbol','otros gaming':'equipamiento_accesorios-gaming-otros_gaming','otros gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-otros_gimnasia_ritmica','otros golf':'equipamiento_accesorios-golf-otros_golf','otros hipica':'equipamiento_accesorios-hipica-otros_hipica','otros hockey':'equipamiento_accesorios-hockey-otros_hockey','otros kayak':'equipamiento_accesorios-kayak-otros_kayak','otros masajeadores':'cuidados_del_deportista-material_de_recuperacion-masajeadores-otros_masajeadores','otros motociclismo':'equipamiento_accesorios-motociclismo-otros_motociclismo','otros natacion':'equipamiento_accesorios-natacion-otros_natacion','otros nutricion':'nutricion-otros_nutricion','otros optica deportiva':'equipamiento_accesorios-electronica_deportiva-optica_deportiva-otros_optica_deportiva','otros paddlesurf':'equipamiento_accesorios-paddlesurf-otros_paddlesurf','otros padel':'equipamiento_accesorios-padel-otros_padel','otros patinaje':'equipamiento_accesorios-patinaje-otros_patinaje','otros pesca':'equipamiento_accesorios-pesca-otros_pesca','otros pingpong':'equipamiento_accesorios-pingpong-otros_pingpong','otros piscinas':'equipamiento_accesorios-natacion-piscinas-accesorios_piscinas-otros_piscinas','otros playa':'equipamiento_accesorios-playa-otros_playa','otros skimboard':'equipamiento_accesorios-skimboard-otros_skimboard','otros snowboard':'equipamiento_accesorios-accesorios_snowboard-otros_snowboard','otros squash':'equipamiento_accesorios-squash-otros_squash','otros surf':'equipamiento_accesorios-surf-otros_surf','otros tenis':'equipamiento_accesorios-tenis-otros_tenis','otros trekking':'equipamiento_accesorios-trekking_montana-otros_trekking','otros triatlon':'equipamiento_accesorios-triatlon-otros_triatlon','otros utensilios cocina':'nutricion-utensilios_cocina-otros_utensilios_cocina','otros voleibol':'equipamiento_accesorios-voleibol-otros_voleibol','otros wakeboard':'equipamiento_accesorios-wakeboard-otros_wakeboard','otros windsurf':'equipamiento_accesorios-windsurf-otros_windsurf','otros wingfoil':'equipamiento_accesorios-wingfoil-otros_wingfoil','otros yoga pilates':'equipamiento_accesorios-yoga_pilates-otros_yoga_pilates','overgrips':'equipamiento_accesorios-padel-overgrips','paddlesurf':'equipamiento_accesorios-paddlesurf-aletas_paddlesurf','padel':'calzado-padel','palas de pickleball':'equipamiento_accesorios-pickleball-palas_de_pickleball','palas padel':'equipamiento_accesorios-padel-palas_padel','palas tenis playa':'equipamiento_accesorios-tenis-palas_tenis_playa','paleteros padel':'equipamiento_accesorios-padel-paleteros_padel','palos golf':'equipamiento_accesorios-golf-palos_golf','palos hockey':'equipamiento_accesorios-hockey-palos_hockey','palos y soporte':'equipamiento_accesorios-accesorios-accesorios_movil-palos_y_soporte','panel lateral gaming':'equipamiento_accesorios-gaming-ordenadores_gaming-panel_lateral_gaming','pantallas gaming':'equipamiento_accesorios-gaming-perifericos_gaming-pantallas_gaming','pantalones':'ropa-bottoms-pantalones','pantalones corto':'ropa-bottoms-pantalones_corto','pantalones pirata':'ropa-bottoms-pantalones_pirata','pantalones portero':'ropa-onepiece-equipacion_portero-pantalones_portero','pantys':'ropa-bottoms-pantys','paos y almohadillas':'equipamiento_accesorios-accesorios-paos_y_almohadillas','paravientos playa':'equipamiento_accesorios-playa-paravientos_playa','parques infantiles':'equipamiento_accesorios-juegos-parques_infantiles','patinaje':'calzado-patinaje','patinaje cascos':'equipamiento_accesorios-patinaje-patinaje_cascos','patines hielo':'equipamiento_accesorios-patinaje-patines_hielo','patines linea':'equipamiento_accesorios-patinaje-patines-patines_linea','patines quad':'equipamiento_accesorios-patinaje-patines-patines_quad','patinetes electricos':'equipamiento_accesorios-patinaje-patinetes_electricos','pc gaming':'equipamiento_accesorios-gaming-ordenadores_gaming-pc_gaming','pedales':'equipamiento_accesorios-ciclismo-pedales','pedalina':'equipamiento_accesorios-fitness-maquinas_fitness-pedalina','pelotas beisbol':'equipamiento_accesorios-beisbol-pelotas_beisbol','pelotas de pickleball':'equipamiento_accesorios-pickleball-pelotas_de_pickleball','pelotas frontenis':'equipamiento_accesorios-frontenis-pelotas_frontenis','pelotas futbol americano':'equipamiento_accesorios-futbol_americano-pelotas_futbol_americano','pelotas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-pelotas_gimnasia_ritmica','pelotas golf':'equipamiento_accesorios-golf-pelotas_golf','pelotas padel':'equipamiento_accesorios-padel-pelotas_padel','pelotas pingpong':'equipamiento_accesorios-pingpong-pelotas_pingpong','pelotas squash':'equipamiento_accesorios-squash-pelotas_squash','pelotas tenis':'equipamiento_accesorios-tenis-pelotas_tenis','pelotas y bolas':'cuidados_del_deportista-material_de_recuperacion-masajeadores-pelotas_y_bolas','pelotas y discos hockey':'equipamiento_accesorios-hockey-pelotas_y_discos_hockey','peras boxeo':'equipamiento_accesorios-boxeo-peras_boxeo','perfumes':'cuidados_del_deportista-perfumes','perifericos gaming':'equipamiento_accesorios-gaming-perifericos_gaming','pesca':'equipamiento_accesorios-pesca-calzado_pesca','peso lastrado':'equipamiento_accesorios-fitness-pesas-peso_lastrado','petanca':'equipamiento_accesorios-juegos-jardin-petanca','petos futbol':'equipamiento_accesorios-futbol-petos_futbol','pickleball':'equipamiento_accesorios-pickleball-otros_accesorios_de_pickleball','pingpong':'calzado-pingpong','pinzas nariz':'equipamiento_accesorios-natacion-pinzas_nariz','piolets':'equipamiento_accesorios-escalada-material_escalada-piolets','piscinas desmontables':'equipamiento_accesorios-natacion-piscinas-piscinas_desmontables','piscinas infantiles':'equipamiento_accesorios-natacion-piscinas-piscinas_hinchables-piscinas_infantiles','piscinas madera':'equipamiento_accesorios-natacion-piscinas-piscinas_madera','pistola masaje':'cuidados_del_deportista-material_de_recuperacion-masajeadores-pistola_masaje','pizarras futbol':'equipamiento_accesorios-futbol-pizarras_futbol','plantillas':'calzado-plantillas','plataformas vibratorias':'equipamiento_accesorios-fitness-maquinas_fitness-plataformas_vibratorias','platos preparados':'nutricion-alimentacion_saludable-platos_preparados','playa':'equipamiento_accesorios-playa-esterillas_playa','poleas':'equipamiento_accesorios-escalada-material_escalada-poleas','polos':'ropa-top-polos','portabalones':'equipamiento_accesorios-futbol-portabalones','portabicicletas':'equipamiento_accesorios-ciclismo-portabicicletas','portabotellas':'equipamiento_accesorios-accesorios-portabotellas','portameriendas':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-portameriendas','portatil gaming':'equipamiento_accesorios-gaming-ordenadores_gaming-portatil_gaming','porteria futbol':'equipamiento_accesorios-futbol-porteria_futbol','powerbank':'equipamiento_accesorios-accesorios-accesorios_movil-powerbank','presoterapia':'cuidados_del_deportista-material_de_recuperacion-masajeadores-presoterapia','prismaticos':'equipamiento_accesorios-electronica_deportiva-optica_deportiva-prismaticos','productos organicos':'nutricion-salud-productos_organicos','proteccion solar':'cuidados_del_deportista-cremas_y_geles-proteccion_solar','protecciones':'equipamiento_accesorios-accesorios-protecciones','protecciones badminton':'equipamiento_accesorios-badminton-protecciones_badminton','protecciones baloncesto':'equipamiento_accesorios-baloncesto-protecciones_baloncesto','protecciones ciclismo':'equipamiento_accesorios-ciclismo-protecciones_ciclismo','protecciones frontenis':'equipamiento_accesorios-frontenis-protecciones_frontenis','protecciones gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-protecciones_gimnasia_ritmica','protecciones muay thai':'equipamiento_accesorios-muay_thai-protecciones_muay_thai','protecciones otros':'equipamiento_accesorios-futbol-protecciones_otros','protecciones padel':'equipamiento_accesorios-padel-protecciones_padel','protecciones patinaje':'equipamiento_accesorios-patinaje-protecciones_patinaje','protecciones pecho':'equipamiento_accesorios-boxeo-protecciones-protecciones_pecho','protecciones pingpong':'equipamiento_accesorios-pingpong-protecciones_pingpong','protecciones tenis':'equipamiento_accesorios-tenis-protecciones_tenis','protecciones voleibol':'equipamiento_accesorios-voleibol-protecciones_voleibol','protector bucal boxeo':'equipamiento_accesorios-boxeo-protecciones-protector_bucal_boxeo','protectores cama elastica':'equipamiento_accesorios-juegos-jardin-cama_elastica-protectores_cama_elastica','protectores reloj':'equipamiento_accesorios-electronica_deportiva-protectores_reloj','proteicas':'nutricion-fuerza_y_energia-barritas-proteicas','proteinas':'nutricion-proteinas-caseina','pullboys aquagym':'equipamiento_accesorios-aquagym-material_aquagym-pullboys_aquagym','pulsera actividad':'equipamiento_accesorios-electronica_deportiva-pulsera_actividad','punos bici':'equipamiento_accesorios-ciclismo-punos_bici','puntas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-puntas_gimnasia_ritmica','raqueta badminton':'equipamiento_accesorios-badminton-raqueta_badminton','raquetas frontenis':'equipamiento_accesorios-frontenis-raquetas_frontenis','raquetas pingpong':'equipamiento_accesorios-pingpong-raquetas_pingpong','raquetas squash':'equipamiento_accesorios-squash-raquetas_squash','raquetas tenis':'equipamiento_accesorios-tenis-raquetas_tenis','raqueteros frontenis':'equipamiento_accesorios-frontenis-raqueteros_frontenis','raqueteros tenis':'equipamiento_accesorios-tenis-raqueteros_tenis','raton gaming':'equipamiento_accesorios-gaming-perifericos_gaming-raton_gaming','reboteador futbol':'equipamiento_accesorios-futbol-reboteador_futbol','recambios patinaje':'equipamiento_accesorios-patinaje-recambios_patinaje','recuperacion muscular':'nutricion-recuperacion_muscular-aminoacidos','redes futbol':'equipamiento_accesorios-futbol-redes_futbol','redes pesca':'equipamiento_accesorios-pesca-redes_pesca','reflectantes':'equipamiento_accesorios-ciclismo-reflectantes','relojes':'equipamiento_accesorios-electronica_deportiva-relojes','relojes pulseras gps pulsometros':'equipamiento_accesorios-electronica_deportiva-relojes_pulseras_gps_pulsometros','remo kayak':'equipamiento_accesorios-kayak-remo_kayak','remo paddlesurf':'equipamiento_accesorios-paddlesurf-remo_paddlesurf','remolques':'equipamiento_accesorios-ciclismo-remolques','remos':'equipamiento_accesorios-fitness-maquinas_fitness-remos','repelente de mosquitos':'cuidados_del_deportista-cremas_y_geles-repelente_de_mosquitos','reproductor de musica':'equipamiento_accesorios-electronica_deportiva-reproductor_de_musica','rinonera':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-rinonera','rodilleras':'equipamiento_accesorios-accesorios-rodilleras','rodillos':'equipamiento_accesorios-ciclismo-rodillos','rodillos masajes':'equipamiento_accesorios-fitness-rodillos_masajes','ropa bottoms bano':'ropa-bottoms-bottoms_bano','ropa bottoms falda vestido':'ropa-bottoms-falda_vestido','ropa bottoms leggins mallas mallas cortas':'ropa-bottoms-leggins_mallas-mallas_cortas','ropa bottoms leggins mallas mallas largas':'ropa-bottoms-leggins_mallas-mallas_largas','ropa bottoms leggins mallas mallas pirata':'ropa-bottoms-leggins_mallas-mallas_pirata','ropa bottoms malla termica':'ropa-bottoms-malla_termica','ropa bottoms pantalones':'ropa-bottoms-pantalones','ropa bottoms pantalones corto':'ropa-bottoms-pantalones_corto','ropa bottoms pantalones pirata':'ropa-bottoms-pantalones_pirata','ropa bottoms pantys':'ropa-bottoms-pantys','ropa bottoms ropa bottoms bano':'ropa-bottoms-bottoms_bano','ropa bottoms ropa interior':'ropa-bottoms-interior','ropa bottoms tutu':'ropa-bottoms-tutu','ropa interior':'ropa-bottoms-interior','ropa onepiece banador':'ropa-onepiece-banador','ropa onepiece bikini':'ropa-onepiece-bikini','ropa onepiece body':'ropa-onepiece-body','ropa onepiece chandal':'ropa-onepiece-chandal','ropa onepiece conjuntos':'ropa-onepiece-conjuntos','ropa onepiece conjuntos conjuntos artes marciales':'ropa-onepiece-conjuntos-conjuntos_artes_marciales','ropa onepiece culottes':'ropa-onepiece-culottes','ropa onepiece equipacion arbitro':'ropa-onepiece-equipacion_arbitro','ropa onepiece equipacion portero camiseta portero':'ropa-onepiece-equipacion_portero-camiseta_portero','ropa onepiece equipacion portero conjuntos portero':'ropa-onepiece-equipacion_portero-conjuntos_portero','ropa onepiece equipacion portero pantalones portero':'ropa-onepiece-equipacion_portero-pantalones_portero','ropa onepiece monos':'ropa-onepiece-monos','ropa onepiece neoprenos':'ropa-onepiece-neoprenos','ropa top bano':'ropa-top-top_bano','ropa top camisa':'ropa-top-camisa','ropa top camisetas':'ropa-top-camisetas','ropa top chaleco':'ropa-top-chaleco','ropa top chaquetas chaquetas cortavientos':'ropa-top-chaquetas-chaquetas_cortavientos','ropa top chaquetas chaquetas softshell':'ropa-top-chaquetas-chaquetas_softshell','ropa top chubasquero':'ropa-top-chubasquero','ropa top equipaciones de clubs':'ropa-top-equipaciones_de_clubs','ropa top forrospolares':'ropa-top-forrospolares','ropa top maillots':'ropa-top-maillots','ropa top polos':'ropa-top-polos','ropa top ropa interior':'ropa-top-interior','ropa top ropa top bano':'ropa-top-top_bano','ropa top ropa top termica':'ropa-top-top_termica','ropa top sudaderas':'ropa-top-sudaderas','ropa top sujetadores':'ropa-top-sujetadores','ropa top termica':'ropa-top-top_termica','ruedas':'equipamiento_accesorios-ciclismo-ruedas','ruedas patinaje':'equipamiento_accesorios-patinaje-ruedas_patinaje','ruedas patinetes':'equipamiento_accesorios-patinaje-patinetes-repuestos_patinetes-ruedas_patinetes','ruedas yoga pilates':'equipamiento_accesorios-yoga_pilates-ruedas_yoga_pilates','rugby':'calzado-rugby','saco bulgaro':'equipamiento_accesorios-fitness-saco_bulgaro','sacos boxeo':'equipamiento_accesorios-boxeo-sacos_boxeo','sacos de dormir':'equipamiento_accesorios-trekking_montana-sacos_de_dormir','sacos de pie':'equipamiento_accesorios-boxeo-sacos_de_pie','salto':'calzado-atletismo-salto','salud':'nutricion-salud-antioxidantes','sandalias':'calzado-sandalias','semillas hierbas y alimentos ricos en fibra':'nutricion-salud-semillas_hierbas_y_alimentos_ricos_en_fibra','sensor deportivo':'equipamiento_accesorios-electronica_deportiva-sensor_deportivo','silbatos':'equipamiento_accesorios-futbol-silbatos','silla':'equipamiento_accesorios-accesorios-muebles-silla','silla portabebes':'equipamiento_accesorios-ciclismo-silla_portabebes','sillas gaming':'equipamiento_accesorios-gaming-mobiliario_gaming-sillas_gaming','sillines':'equipamiento_accesorios-ciclismo-sillines','skimboard':'equipamiento_accesorios-skimboard-otros_skimboard','slippers camping':'calzado-trekking_montana-slippers_camping','snacks':'nutricion-alimentacion_saludable-snacks','sneaker':'calzado-casual-sneaker','sombrero':'equipamiento_accesorios-accesorios-sombrero','soportes boxeo':'equipamiento_accesorios-boxeo-soportes_boxeo','squash':'equipamiento_accesorios-squash-otros_squash','sudaderas':'ropa-top-sudaderas','suelo protector':'equipamiento_accesorios-artes_marciales-suelo_protector','suelo tienda campana':'equipamiento_accesorios-trekking_montana-accesorios_camping-suelo_tienda_campana','sujetadores':'ropa-top-sujetadores','surf':'equipamiento_accesorios-surf-otros_surf','tabla bodyboard':'equipamiento_accesorios-bodyboard-tabla_bodyboard','tabla kitesurf':'equipamiento_accesorios-kitesurf-tabla_kitesurf','tabla paddlesurf':'equipamiento_accesorios-paddlesurf-tabla_paddlesurf','tabla skimboard':'equipamiento_accesorios-skimboard-tabla_skimboard','tabla snowboard':'equipamiento_accesorios-accesorios_snowboard-tabla_snowboard','tabla surf':'equipamiento_accesorios-surf-tabla_surf','tabla wakeboard':'equipamiento_accesorios-wakeboard-tabla_wakeboard','tabla windsurf':'equipamiento_accesorios-windsurf-tabla_windsurf','tabla wingfoil':'equipamiento_accesorios-wingfoil-tabla_wingfoil','tablas natacion':'equipamiento_accesorios-natacion-tablas_natacion','tacos billar':'equipamiento_accesorios-billar-tacos_billar','tapetes billar':'equipamiento_accesorios-billar-tapetes_billar','tapiz aquagym':'equipamiento_accesorios-aquagym-material_aquagym-tapiz_aquagym','tapones':'equipamiento_accesorios-natacion-tapones','tarjeta arbitro':'equipamiento_accesorios-futbol-tarjeta_arbitro','teclado gaming':'equipamiento_accesorios-gaming-perifericos_gaming-teclado_gaming','telescopio':'equipamiento_accesorios-electronica_deportiva-optica_deportiva-telescopio','tenis':'calzado-tenis','tenuguis':'equipamiento_accesorios-accesorios-tenuguis','termogenicos':'nutricion-adelgazamiento-termogenicos','termos':'equipamiento_accesorios-accesorios-cocina-menaje-termos','tiendas de campana':'equipamiento_accesorios-trekking_montana-tiendas_de_campana','timbres bici':'equipamiento_accesorios-ciclismo-timbres_bici','tiro con arco':'equipamiento_accesorios-tiro_con_arco-arcos','toallas':'equipamiento_accesorios-accesorios-toallas','toboganes':'equipamiento_accesorios-juegos-jardin-toboganes','toldos camping':'equipamiento_accesorios-trekking_montana-accesorios_camping-toldos_camping','top':'ropa-top-camisa','top bano':'ropa-top-top_bano','top termica':'ropa-top-top_termica','torres gaming':'equipamiento_accesorios-gaming-ordenadores_gaming-torres_gaming','tortitas':'nutricion-alimentacion_saludable-tortitas','trail running':'calzado-trail_running','traje de buceo':'equipamiento_accesorios-buceo-traje_de_buceo','trekking montana':'equipamiento_accesorios-trekking_montana-accesorios_camping-baterias_camping','triatlon':'equipamiento_accesorios-triatlon-otros_triatlon','triatlon trajes':'equipamiento_accesorios-triatlon-triatlon_trajes','triciclos':'equipamiento_accesorios-ciclismo-triciclos','trineos':'equipamiento_accesorios-esqui-trineos','trolleys golf':'equipamiento_accesorios-golf-trolleys_golf','tubo snorkel':'equipamiento_accesorios-buceo-tubo_snorkel','tumbona':'equipamiento_accesorios-accesorios-muebles-tumbona','tutu':'ropa-bottoms-tutu','utensilios cocina':'nutricion-utensilios_cocina-bascula','vajillas':'equipamiento_accesorios-accesorios-cocina-menaje-vajillas','varillas gimnasia ritmica':'equipamiento_accesorios-gimnasia_ritmica-aparatos_gimnasia_ritmica-varillas_gimnasia_ritmica','vela windsurf':'equipamiento_accesorios-windsurf-vela_windsurf','videojuegos':'equipamiento_accesorios-gaming-videojuegos','vitaminas y minerales':'nutricion-salud-vitaminas_y_minerales','volante badminton':'equipamiento_accesorios-badminton-volante_badminton','volantes gaming':'equipamiento_accesorios-gaming-perifericos_gaming-volantes_gaming','voleibol':'calzado-voleibol','volumenes y pesas':'equipamiento_accesorios-escalada-rocodromos-volumenes_y_pesas','wakeboard':'equipamiento_accesorios-wakeboard-otros_wakeboard','walkie talkie':'equipamiento_accesorios-electronica_deportiva-walkie_talkie','wc portatil':'equipamiento_accesorios-trekking_montana-accesorios_camping-wc_portatil','whey hidrolizado':'nutricion-proteinas-whey-whey_hidrolizado','whey vegan':'nutricion-proteinas-whey-whey_vegan','windsurf':'equipamiento_accesorios-windsurf-otros_windsurf','wingfoil':'equipamiento_accesorios-wingfoil-alas_wingfoil','wrestling':'calzado-wrestling','yoga pilates':'equipamiento_accesorios-yoga_pilates-aros_yoga_pilates','zafus y cojines':'equipamiento_accesorios-yoga_pilates-zafus_y_cojines','zapatillas seguridad':'calzado-seguridad-zapatillas_seguridad','zapatillas trekking montana':'calzado-trekking_montana-zapatillas_trekking_montana','zapatilleros':'equipamiento_accesorios-accesorios-mochilas_y_bolsas-zapatilleros','zuecos':'calzado-zuecos'};
// ================================================================
// CATEGORY SLUG MAPPING (Sprinter/Mirakl taxonomy)
// ================================================================

function removeAccents(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function categoryToSlug(input) {
  if (!input) return '';
  const norm = removeAccents(input.toLowerCase().trim());
  // 1. Direct lookup in alias map
  if (CAT_ALIAS[norm]) return CAT_ALIAS[norm];
  // 2. Algorithmic: if starts with known parent, generate slug
  const parentMap = {
    'calzado': 'calzado', 'ropa': 'ropa',
    'equipamiento accesorios': 'equipamiento_accesorios', 'equipamiento': 'equipamiento_accesorios',
    'nutricion': 'nutricion', 'cuidados del deportista': 'cuidados_del_deportista',
    'experiencias multiaventura': 'experiencias_multiaventura'
  };
  for (const prefix of Object.keys(parentMap).sort((a,b) => b.length - a.length)) {
    if (norm.startsWith(prefix + ' ')) {
      const rest = norm.slice(prefix.length + 1).replace(/ /g, '_');
      return parentMap[prefix] + '-' + rest;
    }
    if (norm === prefix) return parentMap[prefix];
  }
  // 3. Fallback: generic slugify
  return norm.replace(/ /g, '_');
}

// ================================================================
// PRODUCT TYPE FOR TITLES (Producto singular from category)
// ================================================================

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
        var nextNorm3 = i+1 < words.length ? removeAccents(words[i+1].toLowerCase()).replace(/[\/\.\,\-\+]/g, '') : '';
        if (PARSE_STOP_WORDS.has(nextNorm3) || (i+1 < words.length && words[i+1].includes('/')) || i+1 >= typeWordIdx) break;
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
  if (!detectedType) { detectedType = 'Zapatilla'; categoryHint = 'calzado-correr_caminar'; }
  return { prodType: detectedType, model: model, categoryHint: categoryHint };
}

function getProductTypePT(prodTypeES) {
  return PRODUCT_TYPE_PT[prodTypeES] || '';
}

// ================================================================
// SINGLE COLOR EXTRACTION
// ================================================================

const VALID_COLORS = [
  'Azul Marino','Azul Claro','Azul Oscuro','Azul Real','Azul Cielo','Azul Electrico',
  'Verde Oliva','Verde Oscuro','Verde Claro','Verde Militar','Verde Menta',
  'Gris Claro','Gris Oscuro','Gris Marengo',
  'Rojo Oscuro','Rosa Claro','Rosa Fucsia','Rosa Pastel',
  'Marron Claro','Marron Oscuro',
  'Negro','Blanco','Rojo','Azul','Verde','Amarillo',
  'Naranja','Rosa','Morado','Violeta','Gris','Marron',
  'Beige','Crema','Dorado','Plateado','Granate','Burdeos',
  'Turquesa','Coral','Salmon','Lila','Fucsia','Caqui',
  'Camel','Nude','Multicolor','Transparente','Bronce',
];

function extractSingleColor(colorInput) {
  if (!colorInput) return '';
  const input = colorInput.trim();
  const inputNorm = removeAccents(input.toLowerCase());
  // 1. Full input is a valid color
  for (const c of VALID_COLORS) {
    if (inputNorm === removeAccents(c.toLowerCase())) return c;
  }
  // 2. Split by separators
  const parts = input.split(/[\/\-,\+]+/).map(p => p.trim()).filter(Boolean);
  for (const part of parts) {
    const partNorm = removeAccents(part.toLowerCase());
    for (const c of VALID_COLORS) {
      if (partNorm === removeAccents(c.toLowerCase())) return c;
    }
  }
  // 3. Fallback: capitalize first part
  if (parts[0]) {
    const p = parts[0].toLowerCase();
    return p.charAt(0).toUpperCase() + p.slice(1);
  }
  return input;
}

const IMGPROXY_HOST = 'imgproxy.reyl9a.easypanel.host';
const R2_HOST = '1ad99f42539d9623984dd787e28151ba.r2.cloudflarestorage.com';
const R2_BUCKET = 'sprinter-images';
const R2_ACCESS_KEY = '81e11f2adc76f7cb3da11063e4f2d9d4';
const R2_SECRET_KEY = '1172046df1975dea35c76f7d73df05669cc9a331ce1f1b0620225e73eb257265';
const CDN_BASE = 'https://pub-3dd3844245694c3f82abf1a5f3f07c43.r2.dev';

const { createHmac, createHash } = require('crypto');

// Translation dictionary ES -> PT for product content
const catTranslations = {
  // ================================================================
  // MULTI-WORD PHRASES (must come first — longest match priority)
  // ================================================================
  // Footwear types
  'Zapatillas de Running': 'Sapatilhas de Running', 'Zapatillas de Training': 'Sapatilhas de Training',
  'Zapatillas de Trail': 'Sapatilhas de Trail', 'Zapatillas de Tenis': 'Sapatilhas de Ténis',
  'Zapatillas Running': 'Sapatilhas Running', 'Zapatillas Training': 'Sapatilhas Training',
  'Zapatillas Casual': 'Sapatilhas Casual', 'Zapatillas Trail': 'Sapatilhas Trail',
  'Zapatillas Padel': 'Sapatilhas Padel', 'Zapatillas Tenis': 'Sapatilhas Ténis',
  'Zapatillas Futbol': 'Sapatilhas Futebol', 'Zapatillas Fútbol': 'Sapatilhas Futebol',
  'Zapatillas Baloncesto': 'Sapatilhas Basquetebol',
  'Zapatos de Vestir': 'Sapatos de Vestir', 'Zapatos de Tacón': 'Sapatos de Salto',
  'Botas de Montaña': 'Botas de Montanha', 'Botas de Fútbol': 'Botas de Futebol',
  'Botas de Agua': 'Galochas', 'Botas de Nieve': 'Botas de Neve',
  'Tacón Alto': 'Salto Alto', 'Tacón Bajo': 'Salto Baixo',
  // Clothing types
  'Camiseta Manga Larga': 'Camisola Manga Comprida', 'Camiseta Tirantes': 'Camisola de Alças',
  'Pantalón Corto': 'Calções', 'Pantalon Corto': 'Calções', 'Pantalones Cortos': 'Calções',
  'Pantalón Largo': 'Calças', 'Pantalon Largo': 'Calças',
  'Pantalones Vaqueros': 'Calças de Ganga', 'Pantalón Vaquero': 'Calças de Ganga',
  'Sudadera con Capucha': 'Sweatshirt com Capuz',
  'Chándal': 'Fato de Treino', 'Chandal': 'Fato de Treino',
  'Sujetador Deportivo': 'Top Desportivo',
  'Traje de Baño': 'Fato de Banho',
  'Ropa Interior': 'Roupa Interior', 'Ropa de Cama': 'Roupa de Cama',
  'Ropa de Trabajo': 'Roupa de Trabalho',
  // Accessories
  'Gafas de Sol': 'Óculos de Sol', 'Gafas de Vista': 'Óculos de Vista',
  'Bolsa de Deporte': 'Saco de Desporto', 'Bolso de Mano': 'Mala de Mão',
  'Riñonera': 'Bolsa de Cintura', 'Rinonera': 'Bolsa de Cintura',
  'Pala de Padel': 'Raquete de Padel',
  'Guia de Tallas': 'Guia de Tamanhos', 'guia de tallas': 'guia de tamanhos',
  // Materials
  'Material sintetico': 'Material sintético', 'Material sintético': 'Material sintético',
  'Acero Inoxidable': 'Aço Inoxidável', 'acero inoxidable': 'aço inoxidável',
  'Piel Sintética': 'Pele Sintética', 'Cuero Sintético': 'Couro Sintético',
  'Fibra de Vidrio': 'Fibra de Vidro', 'Fibra de Carbono': 'Fibra de Carbono',
  // Descriptions
  'suela flexible': 'sola flexível', 'suela de goma': 'sola de borracha',
  'suela antideslizante': 'sola antiderrapante',
  'con cremallera': 'com fecho', 'con capucha': 'com capuz',
  'con bolsillos': 'com bolsos', 'con forro': 'com forro',
  'manga corta': 'manga curta', 'manga larga': 'manga comprida',
  'sin mangas': 'sem mangas', 'cuello redondo': 'gola redonda',
  'cuello alto': 'gola alta', 'cuello en V': 'gola em V',
  'para baño': 'para banho', 'para hombre': 'para homem', 'para mujer': 'para mulher',
  'para niño': 'para criança', 'para niña': 'para criança',
  'de goma': 'de borracha', 'de cuero': 'de couro', 'de tela': 'de tecido',
  'de dedo': 'de dedo', 'de vestir': 'de vestir',
  'a prueba de agua': 'à prova de água', 'a prueba de viento': 'à prova de vento',
  'hecho a mano': 'feito à mão', 'hecha a mano': 'feita à mão',
  'alta calidad': 'alta qualidade', 'buena calidad': 'boa qualidade',
  'talla única': 'tamanho único',
  'uso diario': 'uso diário',
  'edición limitada': 'edição limitada', 'Edición Limitada': 'Edição Limitada',
  ' y ': ' e ', ' Y ': ' E ',

  // ================================================================
  // FOOTWEAR
  // ================================================================
  'Zapatillas': 'Sapatilhas', 'Zapatilla': 'Sapatilha', 'zapatillas': 'sapatilhas', 'zapatilla': 'sapatilha',
  'Zapatos': 'Sapatos', 'Zapato': 'Sapato', 'zapatos': 'sapatos', 'zapato': 'sapato',
  'Botas': 'Botas', 'Bota': 'Bota', 'botas': 'botas', 'bota': 'bota',
  'Botines': 'Botins', 'Botín': 'Botim', 'botines': 'botins',
  'Chanclas': 'Chinelos', 'Chancla': 'Chinelo', 'chanclas': 'chinelos', 'chancla': 'chinelo',
  'Sandalias': 'Sandálias', 'Sandalia': 'Sandália', 'sandalias': 'sandálias', 'sandalia': 'sandália',
  'Mocasines': 'Mocassins', 'Mocasín': 'Mocassim', 'mocasines': 'mocassins',
  'Alpargatas': 'Alpercatas', 'alpargatas': 'alpercatas',
  'Zuecos': 'Tamancos', 'zuecos': 'tamancos',
  'Náuticos': 'Náuticos', 'nauticos': 'náuticos',
  'Bailarinas': 'Bailarinas', 'Tacones': 'Saltos', 'tacones': 'saltos',
  'Pantuflas': 'Pantufas', 'pantuflas': 'pantufas',
  'Deportivas': 'Desportivas', 'Deportiva': 'Desportiva', 'Deportivo': 'Desportivo',
  'deportivas': 'desportivas', 'deportiva': 'desportiva', 'deportivo': 'desportivo',
  'deportes': 'desportos',

  // ================================================================
  // CLOTHING
  // ================================================================
  'Camiseta': 'Camisola', 'Camisetas': 'Camisolas', 'camiseta': 'camisola', 'camisetas': 'camisolas',
  'Camisa': 'Camisa', 'Camisas': 'Camisas', 'camisa': 'camisa',
  'Blusa': 'Blusa', 'Blusas': 'Blusas', 'blusa': 'blusa',
  'Pantalón': 'Calças', 'Pantalon': 'Calças', 'Pantalones': 'Calças',
  'pantalón': 'calças', 'pantalon': 'calças', 'pantalones': 'calças',
  'Vaqueros': 'Ganga', 'vaqueros': 'ganga', 'Jeans': 'Jeans',
  'Sudadera': 'Sweatshirt', 'Sudaderas': 'Sweatshirts', 'sudadera': 'sweatshirt',
  'Jersey': 'Camisola de Malha', 'jersey': 'camisola de malha',
  'Chaqueta': 'Casaco', 'Chaquetas': 'Casacos', 'chaqueta': 'casaco',
  'Abrigo': 'Casaco', 'Abrigos': 'Casacos', 'abrigo': 'casaco',
  'Cazadora': 'Blusão', 'cazadora': 'blusão',
  'Parka': 'Parka', 'Anorak': 'Anorak',
  'Chaleco': 'Colete', 'Chalecos': 'Coletes', 'chaleco': 'colete',
  'Cortavientos': 'Corta-vento', 'cortavientos': 'corta-vento',
  'Bermuda': 'Bermuda', 'Bermudas': 'Bermudas',
  'Bikini': 'Biquíni', 'Bañador': 'Fato de Banho', 'Banador': 'Fato de Banho', 'bañador': 'fato de banho',
  'Malla': 'Legging', 'Mallas': 'Leggings', 'mallas': 'leggings',
  'Polo': 'Polo', 'Top': 'Top', 'Tops': 'Tops',
  'Falda': 'Saia', 'Faldas': 'Saias', 'falda': 'saia',
  'Vestido': 'Vestido', 'Vestidos': 'Vestidos', 'vestido': 'vestido',
  'Mono': 'Macacão', 'mono': 'macacão',
  'Pijama': 'Pijama', 'pijama': 'pijama',
  'Bata': 'Robe', 'bata': 'robe',
  'Delantal': 'Avental', 'delantal': 'avental',
  'Uniforme': 'Uniforme', 'uniforme': 'uniforme',
  'Traje': 'Fato', 'traje': 'fato',
  'Corbata': 'Gravata', 'corbata': 'gravata',
  'Pajarita': 'Laço', 'pajarita': 'laço',

  // ================================================================
  // ACCESSORIES
  // ================================================================
  'Mochila': 'Mochila', 'Mochilas': 'Mochilas', 'mochila': 'mochila',
  'Bolso': 'Mala', 'bolso': 'mala', 'Bolsos': 'Malas',
  'Cartera': 'Carteira', 'cartera': 'carteira',
  'Monedero': 'Porta-moedas', 'monedero': 'porta-moedas',
  'Calcetines': 'Meias', 'Calcetín': 'Meia', 'Calcetin': 'Meia', 'calcetines': 'meias',
  'Medias': 'Meias-calças', 'medias': 'meias-calças',
  'Gorra': 'Boné', 'Gorras': 'Bonés', 'Gorro': 'Gorro', 'gorra': 'boné', 'gorro': 'gorro',
  'Sombrero': 'Chapéu', 'sombrero': 'chapéu', 'Sombreros': 'Chapéus',
  'Guantes': 'Luvas', 'Guante': 'Luva', 'guantes': 'luvas',
  'Bufanda': 'Cachecol', 'bufanda': 'cachecol', 'Pañuelo': 'Lenço', 'pañuelo': 'lenço',
  'Gafas': 'Óculos', 'gafas': 'óculos',
  'Reloj': 'Relógio', 'Relojes': 'Relógios', 'reloj': 'relógio',
  'Pulsera': 'Pulseira', 'pulsera': 'pulseira',
  'Collar': 'Colar', 'collar': 'colar',
  'Anillo': 'Anel', 'anillo': 'anel', 'Anillos': 'Anéis',
  'Pendientes': 'Brincos', 'pendientes': 'brincos',
  'Cinturón': 'Cinto', 'cinturón': 'cinto', 'Cinturon': 'Cinto',
  'Paraguas': 'Guarda-chuva', 'paraguas': 'guarda-chuva',
  'Llavero': 'Porta-chaves', 'llavero': 'porta-chaves',
  'Bolsa': 'Saco', 'bolsa': 'saco',
  'Toalla': 'Toalha', 'Toallas': 'Toalhas', 'toalla': 'toalha',
  'Cinta': 'Fita', 'Muñequera': 'Pulseira',
  'Tobillera': 'Tornozeleira', 'Rodillera': 'Joelheira', 'rodillera': 'joelheira',
  'Codera': 'Cotoveleira', 'codera': 'cotoveleira',
  'Espinillera': 'Caneleira', 'Espinilleras': 'Caneleiras',
  'Protector': 'Protetor', 'Protección': 'Proteção',

  // ================================================================
  // SPORTS EQUIPMENT
  // ================================================================
  'Balón': 'Bola', 'Balon': 'Bola', 'Pelota': 'Bola', 'balón': 'bola', 'pelota': 'bola',
  'Raqueta': 'Raquete', 'Pala': 'Raquete', 'raqueta': 'raquete',
  'Portero': 'Guarda-redes', 'portero': 'guarda-redes',
  'Red': 'Rede', 'red': 'rede',
  'Canasta': 'Cesto', 'canasta': 'cesto',
  'Pesas': 'Pesos', 'pesas': 'pesos', 'Mancuernas': 'Halteres',
  'Esterilla': 'Tapete', 'esterilla': 'tapete',
  'Cuerda': 'Corda', 'cuerda': 'corda',
  'Bicicleta': 'Bicicleta', 'Casco': 'Capacete', 'casco': 'capacete',

  // ================================================================
  // HOME / ELECTRONICS / GENERAL PRODUCTS
  // ================================================================
  'Lámpara': 'Candeeiro', 'lámpara': 'candeeiro',
  'Mesa': 'Mesa', 'Silla': 'Cadeira', 'silla': 'cadeira',
  'Estantería': 'Estante', 'estantería': 'estante',
  'Alfombra': 'Tapete', 'alfombra': 'tapete',
  'Cortina': 'Cortina', 'Cortinas': 'Cortinas',
  'Cojín': 'Almofada', 'cojín': 'almofada', 'Cojin': 'Almofada',
  'Almohada': 'Almofada', 'almohada': 'almofada',
  'Manta': 'Manta', 'Sábana': 'Lençol', 'sábana': 'lençol',
  'Edredón': 'Edredão', 'edredón': 'edredão',
  'Funda': 'Capa', 'funda': 'capa',
  'Cargador': 'Carregador', 'cargador': 'carregador',
  'Auriculares': 'Auriculares', 'auriculares': 'auriculares',
  'Altavoz': 'Altifalante', 'altavoz': 'altifalante',
  'Pantalla': 'Ecrã', 'pantalla': 'ecrã',
  'Teclado': 'Teclado', 'Ratón': 'Rato', 'ratón': 'rato',
  'Batería': 'Bateria', 'batería': 'bateria',
  'Cable': 'Cabo', 'cable': 'cabo',
  'Enchufe': 'Tomada', 'enchufe': 'tomada',
  'Herramienta': 'Ferramenta', 'herramienta': 'ferramenta',
  'Herramientas': 'Ferramentas', 'herramientas': 'ferramentas',
  'Juguete': 'Brinquedo', 'juguete': 'brinquedo',
  'Juguetes': 'Brinquedos', 'juguetes': 'brinquedos',
  'Libro': 'Livro', 'libro': 'livro',

  // ================================================================
  // BEAUTY / HEALTH / COSMETICS
  // ================================================================
  'Perfume': 'Perfume', 'Crema': 'Creme', 'crema': 'creme',
  'Jabón': 'Sabão', 'jabón': 'sabão', 'Jabon': 'Sabão',
  'Champú': 'Champô', 'champú': 'champô', 'Champu': 'Champô',
  'Gel': 'Gel', 'Loción': 'Loção', 'loción': 'loção',
  'Maquillaje': 'Maquilhagem', 'maquillaje': 'maquilhagem',
  'Pintalabios': 'Batom', 'pintalabios': 'batom',
  'Esmalte': 'Verniz', 'esmalte': 'verniz',
  'Cepillo': 'Escova', 'cepillo': 'escova',
  'Peine': 'Pente', 'peine': 'pente',
  'Secador': 'Secador', 'Plancha': 'Prancha', 'plancha': 'prancha',
  'Espejo': 'Espelho', 'espejo': 'espelho',
  'Neceser': 'Necessaire', 'neceser': 'necessaire',

  // ================================================================
  // FOOD & DRINK (supplements, nutrition)
  // ================================================================
  'Proteína': 'Proteína', 'Vitamina': 'Vitamina',
  'Suplemento': 'Suplemento', 'suplemento': 'suplemento',
  'Bebida': 'Bebida', 'bebida': 'bebida',
  'Botella': 'Garrafa', 'botella': 'garrafa',
  'Bidón': 'Bidão', 'bidón': 'bidão',

  // ================================================================
  // CATEGORIES
  // ================================================================
  'Calzado': 'Calçado', 'calzado': 'calçado',
  'Ropa': 'Roupa', 'ropa': 'roupa',
  'Accesorios': 'Acessórios', 'accesorios': 'acessórios',
  'Equipamiento': 'Equipamento', 'equipamiento': 'equipamento',
  'Hogar': 'Casa', 'hogar': 'casa',
  'Jardín': 'Jardim', 'jardín': 'jardim',
  'Cocina': 'Cozinha', 'cocina': 'cozinha',
  'Electrónica': 'Eletrónica', 'electrónica': 'eletrónica',
  'Juguetería': 'Brinquedos', 'Alimentación': 'Alimentação',
  'Belleza': 'Beleza', 'belleza': 'beleza',
  'Salud': 'Saúde', 'salud': 'saúde',
  'Mascotas': 'Animais', 'mascotas': 'animais',
  'Bebé': 'Bebé', 'bebé': 'bebé',
  'Niños': 'Crianças', 'niños': 'crianças',
  'Papelería': 'Papelaria', 'papelería': 'papelaria',
  'Bricolaje': 'Bricolage', 'bricolaje': 'bricolage',
  'Automoción': 'Automóvel', 'automoción': 'automóvel',

  // ================================================================
  // GENDER
  // ================================================================
  'Hombre': 'Homem', 'hombre': 'homem',
  'Mujer': 'Mulher', 'mujer': 'mulher',
  'Unisex': 'Unissexo', 'unisex': 'unissexo',
  'Niño': 'Criança', 'Nino': 'Criança', 'niño': 'criança', 'nino': 'criança',
  'Niña': 'Criança', 'Nina': 'Criança', 'niña': 'criança', 'nina': 'criança',
  'Junior': 'Júnior', 'junior': 'júnior',
  'Infantil': 'Infantil', 'infantil': 'infantil', 'infantiles': 'infantis',
  'Adulto': 'Adulto', 'adulto': 'adulto',
  'Señora': 'Senhora', 'señora': 'senhora',
  'Caballero': 'Cavalheiro', 'caballero': 'cavalheiro',

  // ================================================================
  // COLORS (with case variants)
  // ================================================================
  'Negro': 'Preto', 'negro': 'preto', 'Negra': 'Preta', 'negra': 'preta', 'Negros': 'Pretos', 'negros': 'pretos', 'Negras': 'Pretas', 'negras': 'pretas',
  'Blanco': 'Branco', 'blanco': 'branco', 'Blanca': 'Branca', 'blanca': 'branca', 'Blancos': 'Brancos', 'blancos': 'brancos', 'Blancas': 'Brancas', 'blancas': 'brancas',
  'Azul': 'Azul', 'azul': 'azul',
  'Rojo': 'Vermelho', 'rojo': 'vermelho', 'Roja': 'Vermelha', 'roja': 'vermelha', 'Rojos': 'Vermelhos', 'Rojas': 'Vermelhas',
  'Verde': 'Verde', 'verde': 'verde',
  'Gris': 'Cinzento', 'gris': 'cinzento', 'Grises': 'Cinzentos', 'grises': 'cinzentos',
  'Amarillo': 'Amarelo', 'amarillo': 'amarelo', 'Amarilla': 'Amarela', 'amarilla': 'amarela', 'Amarillos': 'Amarelos', 'Amarillas': 'Amarelas',
  'Naranja': 'Laranja', 'naranja': 'laranja',
  'Rosa': 'Rosa', 'rosa': 'rosa',
  'Morado': 'Roxo', 'morado': 'roxo', 'Morada': 'Roxa', 'morada': 'roxa',
  'Violeta': 'Violeta', 'violeta': 'violeta',
  'Marrón': 'Castanho', 'Marron': 'Castanho', 'marrón': 'castanho', 'marron': 'castanho',
  'Beige': 'Bege', 'beige': 'bege',
  'Dorado': 'Dourado', 'dorado': 'dourado', 'Dorada': 'Dourada', 'dorada': 'dourada',
  'Plateado': 'Prateado', 'plateado': 'prateado', 'Plateada': 'Prateada', 'plateada': 'prateada',
  'Marino': 'Marinho', 'marino': 'marinho',
  'Fucsia': 'Fúcsia', 'fucsia': 'fúcsia',
  'Lima': 'Lima', 'Plata': 'Prata', 'plata': 'prata',
  'Multicolor': 'Multicolor', 'Coral': 'Coral', 'Turquesa': 'Turquesa',
  'Granate': 'Grená', 'granate': 'grená',
  'Lila': 'Lilás', 'lila': 'lilás',
  'Burdeos': 'Bordô', 'burdeos': 'bordô',
  'Crudo': 'Cru', 'crudo': 'cru',
  'Oliva': 'Oliva', 'Caqui': 'Caqui', 'caqui': 'caqui',
  'Oro': 'Ouro', 'oro': 'ouro',
  'Bronce': 'Bronze', 'bronce': 'bronze',
  'Cobre': 'Cobre', 'cobre': 'cobre',
  'Hueso': 'Osso', 'Marfil': 'Marfim', 'marfil': 'marfim',
  'Celeste': 'Celeste', 'Índigo': 'Índigo',
  // Color abbreviations in product names
  'NEG': 'PRETO', 'BLO': 'BRANCO', 'BLAN': 'BRANCO', 'AZU': 'AZUL',
  'ROJ': 'VERMELHO', 'MAR': 'MARINHO', 'COG': 'CASTANHO',

  // ================================================================
  // MATERIALS (comprehensive)
  // ================================================================
  'Sintético': 'Sintético', 'sintético': 'sintético',
  'Algodón': 'Algodão', 'algodón': 'algodão', 'Algodon': 'Algodão',
  'Poliéster': 'Poliéster', 'poliéster': 'poliéster', 'Poliester': 'Poliéster',
  'Cuero': 'Couro', 'cuero': 'couro',
  'Piel': 'Pele', 'piel': 'pele',
  'Nylon': 'Nylon', 'nylon': 'nylon',
  'Caucho': 'Borracha', 'caucho': 'borracha',
  'Goma': 'Borracha', 'goma': 'borracha',
  'Textil': 'Têxtil', 'textil': 'têxtil',
  'Tejido': 'Tecido', 'tejido': 'tecido',
  'Lona': 'Lona', 'lona': 'lona',
  'Espuma': 'Espuma', 'espuma': 'espuma',
  'Lycra': 'Lycra', 'Elastano': 'Elastano',
  'Microfibra': 'Microfibra', 'microfibra': 'microfibra',
  'Terciopelo': 'Veludo', 'terciopelo': 'veludo',
  'Felpa': 'Felpa', 'Punto': 'Malha', 'punto': 'malha',
  'Seda': 'Seda', 'seda': 'seda',
  'Lino': 'Linho', 'lino': 'linho',
  'Lana': 'Lã', 'lana': 'lã',
  'Cachemir': 'Caxemira', 'cachemir': 'caxemira',
  'Denim': 'Denim', 'Satén': 'Cetim', 'satén': 'cetim',
  'Raso': 'Cetim', 'raso': 'cetim',
  'Encaje': 'Renda', 'encaje': 'renda',
  'Tul': 'Tule', 'tul': 'tule',
  'Madera': 'Madeira', 'madera': 'madeira',
  'Metal': 'Metal', 'metal': 'metal',
  'Plástico': 'Plástico', 'plástico': 'plástico', 'Plastico': 'Plástico',
  'Cristal': 'Cristal', 'Vidrio': 'Vidro', 'vidrio': 'vidro',
  'Cerámica': 'Cerâmica', 'cerámica': 'cerâmica',
  'Porcelana': 'Porcelana',
  'Acero': 'Aço', 'acero': 'aço',
  'Aluminio': 'Alumínio', 'aluminio': 'alumínio',
  'Silicona': 'Silicone', 'silicona': 'silicone',
  'Ganchillo': 'Croché', 'ganchillo': 'croché',
  'Bambú': 'Bambu', 'bambú': 'bambu',
  'Corcho': 'Cortiça', 'corcho': 'cortiça',
  'Mármol': 'Mármore', 'mármol': 'mármore',
  'Granito': 'Granito',

  // ================================================================
  // SHOE/CLOTHING PARTS
  // ================================================================
  'suela': 'sola', 'Suela': 'Sola',
  'plantilla': 'palmilha', 'Plantilla': 'Palmilha',
  'mediasuela': 'entressola', 'Mediasuela': 'Entressola',
  'empeine': 'parte superior', 'Empeine': 'Parte superior',
  'cordones': 'atacadores', 'Cordones': 'Atacadores',
  'velcro': 'velcro', 'cierre': 'fecho', 'Cierre': 'Fecho',
  'cremallera': 'fecho', 'Cremallera': 'Fecho',
  'hebilla': 'fivela', 'Hebilla': 'Fivela',
  'lengüeta': 'lingueta', 'Lengüeta': 'Lingueta',
  'puntera': 'biqueira', 'Puntera': 'Biqueira',
  'ojales': 'ilhós', 'Ojales': 'Ilhós',
  'talonera': 'taloneira', 'Talonera': 'Taloneira',
  'capucha': 'capuz', 'Capucha': 'Capuz',
  'bolsillo': 'bolso', 'bolsillos': 'bolsos', 'Bolsillo': 'Bolso', 'Bolsillos': 'Bolsos',
  'cuello': 'gola', 'Cuello': 'Gola',
  'puños': 'punhos', 'Puños': 'Punhos',
  'cintura': 'cintura', 'cinturilla': 'cós',
  'forro': 'forro', 'Forro': 'Forro',
  'dobladillo': 'bainha', 'Dobladillo': 'Bainha',
  'botones': 'botões', 'botón': 'botão', 'Botones': 'Botões',
  'bordado': 'bordado', 'Bordado': 'Bordado',
  'estampado': 'estampado', 'Estampado': 'Estampado',
  'Correas': 'Correias', 'correas': 'correias',

  // ================================================================
  // ADJECTIVES (product descriptions)
  // ================================================================
  'acolchado': 'acolchoado', 'acolchada': 'acolchoada',
  'ajustable': 'ajustável', 'ajustables': 'ajustáveis',
  'ajustada': 'ajustada', 'ajustado': 'ajustado',
  'transpirable': 'respirável', 'Transpirable': 'Respirável',
  'ligero': 'leve', 'ligera': 'leve', 'Ligero': 'Leve', 'Ligera': 'Leve',
  'resistente': 'resistente', 'Resistente': 'Resistente', 'resistentes': 'resistentes',
  'cómodo': 'confortável', 'cómoda': 'confortável', 'cómodas': 'confortáveis',
  'flexible': 'flexível', 'Flexible': 'Flexível',
  'duraderas': 'duráveis', 'duradera': 'durável', 'duradero': 'durável',
  'antideslizante': 'antiderrapante', 'Antideslizante': 'Antiderrapante',
  'reforzado': 'reforçado', 'reforzada': 'reforçada',
  'cosida': 'cosida', 'cosido': 'cosido',
  'inyectado': 'injetado', 'inyectada': 'injetada',
  'secado': 'secagem', 'Secado': 'Secagem',
  'rápido': 'rápido', 'Rápido': 'Rápido',
  'segura': 'segura', 'seguro': 'seguro',
  'natural': 'natural', 'Natural': 'Natural',
  'superior': 'superior', 'interior': 'interior',
  'esponjoso': 'esponjoso', 'Esponjoso': 'Esponjoso',
  'doble': 'duplo', 'Doble': 'Duplo',
  'alta': 'alta', 'alto': 'alto',
  'buena': 'boa', 'bueno': 'bom',
  'máxima': 'máxima', 'máximo': 'máximo',
  'mayor': 'maior', 'mejor': 'melhor',
  'gran': 'grande',
  'nuevo': 'novo', 'nueva': 'nova',
  'pequeño': 'pequeno', 'pequeña': 'pequena', 'pequeños': 'pequenos',
  'grande': 'grande', 'grandes': 'grandes',
  'largo': 'comprido', 'larga': 'comprida', 'largas': 'compridas',
  'corto': 'curto', 'corta': 'curta',
  'ancho': 'largo', 'ancha': 'larga',
  'estrecho': 'estreito', 'estrecha': 'estreita',
  'suave': 'suave', 'Suave': 'Suave',
  'blando': 'macio', 'blanda': 'macia',
  'duro': 'duro', 'dura': 'dura',
  'grueso': 'grosso', 'gruesa': 'grossa',
  'fino': 'fino', 'fina': 'fina',
  'lavable': 'lavável', 'Lavable': 'Lavável',
  'reciclado': 'reciclado', 'reciclada': 'reciclada',
  'orgánico': 'orgânico', 'orgánica': 'orgânica',
  'ecológico': 'ecológico', 'ecológica': 'ecológica',
  'sostenible': 'sustentável', 'Sostenible': 'Sustentável',
  'combinables': 'combináveis',
  'diferentes': 'diferentes',
  'disponible': 'disponível', 'Disponible': 'Disponível',
  'vendidas': 'vendidas',
  'preferidas': 'preferidas',
  'apto': 'adequado', 'Apto': 'Adequado',
  'especial': 'especial', 'Especial': 'Especial',
  'perfecta': 'perfeita', 'perfecto': 'perfeito',
  'clásico': 'clássico', 'clásica': 'clássica',
  'moderno': 'moderno', 'moderna': 'moderna',
  'elegante': 'elegante', 'Elegante': 'Elegante',
  'último': 'último', 'última': 'última',
  'Impermeable': 'Impermeável', 'impermeable': 'impermeável',

  // ================================================================
  // NOUNS (product descriptions)
  // ================================================================
  'durabilidad': 'durabilidade', 'Durabilidad': 'Durabilidade',
  'amortiguación': 'amortecimento', 'Amortiguación': 'Amortecimento',
  'agarre': 'aderência', 'Agarre': 'Aderência',
  'sujeción': 'suporte', 'Sujeción': 'Suporte',
  'comodidad': 'conforto', 'Comodidad': 'Conforto',
  'estabilidad': 'estabilidade', 'Estabilidad': 'Estabilidade',
  'tracción': 'tração', 'Tracción': 'Tração',
  'absorción': 'absorção', 'Absorción': 'Absorção',
  'adaptación': 'adaptação', 'Adaptación': 'Adaptação',
  'protección': 'proteção', 'Protección': 'Proteção',
  'ventilación': 'ventilação', 'Ventilación': 'Ventilação',
  'desgaste': 'desgaste', 'abrasión': 'abrasão',
  'refuerzo': 'reforço', 'Refuerzo': 'Reforço',
  'rozamiento': 'fricção',
  'resbalones': 'escorregões',
  'lesiones': 'lesões',
  'pisada': 'pisada', 'Pisada': 'Pisada',
  'talón': 'calcanhar', 'Talón': 'Calcanhar',
  'tobillo': 'tornozelo', 'Tobillo': 'Tornozelo',
  'rodilla': 'joelho', 'Rodilla': 'Joelho',
  'pie': 'pé', 'pies': 'pés',
  'peso': 'peso', 'Peso': 'Peso',
  'corte': 'corte', 'Corte': 'Corte',
  'estilo': 'estilo', 'Estilo': 'Estilo',
  'diseño': 'design', 'Diseño': 'Design',
  'forma': 'forma', 'Forma': 'Forma',
  'ajuste': 'ajuste', 'Ajuste': 'Ajuste',
  'colección': 'coleção', 'Colección': 'Coleção', 'Coleccion': 'Coleção', 'coleccion': 'coleção',
  'colecciones': 'coleções',
  'temporada': 'temporada', 'Temporada': 'Temporada',
  'combinación': 'combinação', 'Combinación': 'Combinação',
  'tecnología': 'tecnologia', 'Tecnología': 'Tecnologia',
  'movimiento': 'movimento', 'Movimiento': 'Movimento',
  'calidad': 'qualidade', 'Calidad': 'Qualidade',
  'garantía': 'garantia', 'Garantía': 'Garantia',
  'precio': 'preço', 'Precio': 'Preço',
  'oferta': 'oferta', 'Oferta': 'Oferta',
  'descuento': 'desconto', 'Descuento': 'Desconto',
  'envío': 'envio', 'Envío': 'Envio', 'Envio': 'Envio',
  'entrega': 'entrega', 'Entrega': 'Entrega',
  'devolución': 'devolução', 'Devolución': 'Devolução',
  'giros': 'rotações', 'luces': 'luzes', 'Luces': 'Luzes',
  'detalles': 'detalhes', 'Detalles': 'Detalhes',
  'cuidado': 'cuidado', 'cuidados': 'cuidados', 'Cuidados': 'Cuidados',
  'consejos': 'conselhos', 'Consejos': 'Conselhos',
  'talla': 'tamanho', 'Talla': 'Tamanho',
  'tamaño': 'tamanho', 'Tamaño': 'Tamanho',
  'medida': 'medida', 'medidas': 'medidas',
  'colores': 'cores', 'Colores': 'Cores',
  'color': 'cor',
  'marca': 'marca', 'Marca': 'Marca',
  'modelo': 'modelo',
  'referencia': 'referência', 'Referencia': 'Referência',
  'cantidad': 'quantidade', 'Cantidad': 'Quantidade',
  'unidad': 'unidade', 'unidades': 'unidades',
  'pieza': 'peça', 'piezas': 'peças',
  'juego': 'conjunto', 'Juego': 'Conjunto',
  'conjunto': 'conjunto', 'pack': 'pack',
  'contenido': 'conteúdo', 'Contenido': 'Conteúdo',
  'incluye': 'inclui', 'Incluye': 'Inclui',

  // ================================================================
  // VERBS / ACTION WORDS
  // ================================================================
  'diseñado': 'desenhado', 'diseñada': 'desenhada',
  'creado': 'criado', 'creada': 'criada',
  'fabricado': 'fabricado', 'fabricada': 'fabricada',
  'hecho': 'feito', 'hecha': 'feita',
  'Destinada': 'Destinada', 'Destinado': 'Destinado',
  'Incorpora': 'Incorpora', 'incorpora': 'incorpora',
  'Tiene': 'Tem', 'tiene': 'tem',
  'Disfruta': 'Desfruta', 'disfruta': 'desfruta',
  'alargando': 'alongando',
  'facilitando': 'facilitando',
  'mejorando': 'melhorando',
  'favorecer': 'favorecer',
  'evitar': 'evitar',
  'conseguir': 'conseguir',
  'completar': 'completar',
  'añadir': 'adicionar',
  'andar': 'andar',
  'llevar': 'usar',
  'pueden': 'podem',
  'están': 'estão',
  'iluminan': 'iluminam',

  // ================================================================
  // SPORTS & ACTIVITIES
  // ================================================================
  'Entrenamiento': 'Treino', 'entrenamiento': 'treino',
  'Competición': 'Competição', 'Competicion': 'Competição', 'competición': 'competição',
  'Senderismo': 'Caminhada', 'senderismo': 'caminhada',
  'Montaña': 'Montanha', 'montaña': 'montanha',
  'Gimnasio': 'Ginásio', 'gimnasio': 'ginásio',

  // ================================================================
  // CONTEXT & USAGE
  // ================================================================
  'baño': 'banho', 'Baño': 'Banho',
  'verano': 'verão', 'Verano': 'Verão',
  'invierno': 'inverno', 'Invierno': 'Inverno',
  'primavera': 'primavera', 'otoño': 'outono',
  'colegio': 'escola', 'Colegio': 'Escola',
  'diario': 'diário', 'Diario': 'Diário',
  'libre': 'livre', 'Libre': 'Livre',
  'trabajo': 'trabalho', 'Trabajo': 'Trabalho',
  'fiesta': 'festa', 'Fiesta': 'Festa',
  'playa': 'praia', 'Playa': 'Praia',
  'piscina': 'piscina', 'Piscina': 'Piscina',
  'campo': 'campo', 'ciudad': 'cidade',

  // ================================================================
  // CONNECTORS & COMMON WORDS
  // ================================================================
  'con': 'com', 'Con': 'Com',
  'son': 'são', 'Son': 'São',
  'muy': 'muito', 'Muy': 'Muito',
  'más': 'mais', 'Más': 'Mais',
  'cualquier': 'qualquer',
  'entre': 'entre',
  'también': 'também', 'También': 'Também',
  'siempre': 'sempre', 'Siempre': 'Sempre',
  'nunca': 'nunca', 'Nunca': 'Nunca',

  // ================================================================
  // LABELS & STATUS
  // ================================================================
  'Categoría': 'Categoria', 'Categoria': 'Categoria',
  'Género': 'Género', 'Genero': 'Género',
  'Color': 'Cor', 'Modelo': 'Modelo', 'Material': 'Material',
  'Descripción': 'Descrição', 'Descripcion': 'Descrição',
  'Producto': 'Produto', 'Productos': 'Produtos',
  'Nuevo': 'Novo', 'Usado': 'Usado', 'Reacondicionado': 'Recondicionado',
  'composicion': 'composição', 'Composicion': 'Composição',
  'informacion': 'informação', 'Informacion': 'Informação',
  'fabricante': 'fabricante', 'Fabricante': 'Fabricante',
  'responsable': 'responsável', 'Responsable': 'Responsável',
  'utilización': 'utilização', 'Utilización': 'Utilização', 'utilizacion': 'utilização'
};
function toPT(text) {
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

const [rw, rh] = ratio.split(':').map(Number);
const W = 1000;
const H = Math.round(W * rh / rw);

function hmacSHA256(key, data) { return createHmac('sha256', key).update(data).digest(); }
function sha256hex(data) { return createHash('sha256').update(data).digest('hex'); }

function httpsGet(hostname, path, timeout) {
  const ms = timeout || 15000;
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path, port: 443, method: 'GET' }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        const match = loc.match(/^https:\/\/([^/]+)(\/.*)$/);
        if (match) { httpsGet(match[1], match[2], ms).then(resolve).catch(reject); }
        else { reject(new Error('Bad redirect: ' + loc)); }
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(chunks) }));
    });
    req.on('error', reject);
    req.setTimeout(ms, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

function httpsPut(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path, port: 443, method: 'PUT', headers }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(chunks) }));
    });
    req.on('error', reject);
    req.setTimeout(60000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(body);
    req.end();
  });
}

function uploadToR2(imageBuffer, objectKey) {
  const now = new Date();
  const dateStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const shortDate = dateStamp.substring(0, 8);
  const region = 'auto'; const svc = 's3';
  const payloadHash = sha256hex(imageBuffer);
  const canonicalUri = '/' + R2_BUCKET + '/' + objectKey;
  const NL = String.fromCharCode(10);
  const canonicalHeaders = 'content-type:image/jpeg' + NL + 'host:' + R2_HOST + NL + 'x-amz-content-sha256:' + payloadHash + NL + 'x-amz-date:' + dateStamp + NL;
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';
  const canonicalRequest = 'PUT' + NL + canonicalUri + NL + NL + canonicalHeaders + NL + signedHeaders + NL + payloadHash;
  const credentialScope = shortDate + '/' + region + '/' + svc + '/aws4_request';
  const stringToSign = 'AWS4-HMAC-SHA256' + NL + dateStamp + NL + credentialScope + NL + sha256hex(canonicalRequest);
  const signingKey = hmacSHA256(hmacSHA256(hmacSHA256(hmacSHA256('AWS4' + R2_SECRET_KEY, shortDate), region), svc), 'aws4_request');
  const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  const authHeader = 'AWS4-HMAC-SHA256 Credential=' + R2_ACCESS_KEY + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;
  return httpsPut(R2_HOST, '/' + R2_BUCKET + '/' + objectKey, { 'Content-Type': 'image/jpeg', 'Host': R2_HOST, 'x-amz-content-sha256': payloadHash, 'x-amz-date': dateStamp, 'Authorization': authHeader, 'Content-Length': imageBuffer.length }, imageBuffer);
}


function httpsPostBinary(hostname, path, imageBuffer, contentType) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path, port: 443, method: 'POST', headers: { 'Content-Type': contentType || 'application/octet-stream', 'Content-Length': imageBuffer.length } }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, data: Buffer.concat(chunks) }));
    });
    req.on('error', reject);
    req.setTimeout(120000, () => { req.destroy(); reject(new Error('Rembg timeout')); });
    req.write(imageBuffer);
    req.end();
  });
}

function uploadToR2Png(imageBuffer, objectKey) {
  const now = new Date();
  const dateStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const shortDate = dateStamp.substring(0, 8);
  const region = 'auto'; const svc = 's3';
  const payloadHash = sha256hex(imageBuffer);
  const canonicalUri = '/' + R2_BUCKET + '/' + objectKey;
  const NL = String.fromCharCode(10);
  const canonicalHeaders = 'content-type:image/png' + NL + 'host:' + R2_HOST + NL + 'x-amz-content-sha256:' + payloadHash + NL + 'x-amz-date:' + dateStamp + NL;
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';
  const canonicalRequest = 'PUT' + NL + canonicalUri + NL + NL + canonicalHeaders + NL + signedHeaders + NL + payloadHash;
  const credentialScope = shortDate + '/' + region + '/' + svc + '/aws4_request';
  const stringToSign = 'AWS4-HMAC-SHA256' + NL + dateStamp + NL + credentialScope + NL + sha256hex(canonicalRequest);
  const signingKey = hmacSHA256(hmacSHA256(hmacSHA256(hmacSHA256('AWS4' + R2_SECRET_KEY, shortDate), region), svc), 'aws4_request');
  const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  const authHeader = 'AWS4-HMAC-SHA256 Credential=' + R2_ACCESS_KEY + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;
  return httpsPut(R2_HOST, '/' + R2_BUCKET + '/' + objectKey, { 'Content-Type': 'image/png', 'Host': R2_HOST, 'x-amz-content-sha256': payloadHash, 'x-amz-date': dateStamp, 'Authorization': authHeader, 'Content-Length': imageBuffer.length }, imageBuffer);
}

const REMBG_HOST = 'image-tools-rembg.reyl9a.easypanel.host';

const results = [];
const errors = [];
for (const p of products) {
  try {
    const m = mapInputRow(p);
    const sku = m['sku-de-vendedor'] || m['_offer-sku'] || '';
    const name = m['nombre-del-articulo'] || '';
    const brand = m['marcas'] || '';
    const model = m['_model'] || '';
    const category = m['categorias'] || '';
    const gender = m['genero'] || '';
    const color = extractSingleColor(m['colores'] || '');
    const ean = String(m['ean'] || '');
    const price = String(m['_price'] || '');
    const imageUrl = m['imagenes-1'] || '';
    const material = m['material-composicion'] || 'Material sintetico';
    const gsr = m['pais-fabricante'] || '';
    const userDesc = m['descripion-del-producto'] || '';
    const userDescPT = m['descripion-del-producto-pt'] || '';
    const userTitle = m['subtitulo-de-productos'] || '';
    const userTitlePT = m['nombre-del-articulo-pt'] || m['subtitulo-de-productos-pt'] || '';
    let title = '';
    let titlePT = '';
    const parsed = parseProductName(name, brand);
    const modelPart = model || parsed.model || name;
    const modelPartPT = toPT(modelPart);
    const parsedCategoryHint = parsed.categoryHint || '';
    if (generateTitles) {
      const prodTypeES = parsed.prodType || 'Producto';
      const prodTypePT = getProductTypePT(prodTypeES) || toPT(prodTypeES) || 'Produto';
      title = [prodTypeES, brand, parsed.model].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
      titlePT = [prodTypePT, brand, toPT(parsed.model) || parsed.model].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
    } else {
      title = userTitle || name || '';
      titlePT = userTitlePT || toPT(title) || '';
    }
    let description = '';
    let descriptionPT = '';
    if (userDesc && userDesc.trim().length > 5) { description = userDesc.trim(); }
    else if (generateDescriptions) {
      const parts = [];
      parts.push((brand + ' ' + modelPart).trim());
      if (model) parts.push('Modelo: ' + model);
      if (category) parts.push('Categoría: ' + category);
      if (gender) parts.push('Género: ' + gender);
      if (color) parts.push('Color: ' + color);
      if (material) parts.push('Material: ' + material);
      description = parts.filter(Boolean).join('. ') + '.';
    }
    if (userDescPT && userDescPT.trim().length > 5) { descriptionPT = userDescPT.trim(); }
    else if (userDesc && userDesc.trim().length > 5 && isPT) {
      descriptionPT = toPT(userDesc.trim());
    } else if (generateDescriptions) {
      const ptParts = [];
      ptParts.push((brand + ' ' + modelPartPT).trim());
      if (model) ptParts.push('Modelo: ' + model);
      if (category) ptParts.push('Categoria: ' + toPT(category));
      if (gender) ptParts.push('Género: ' + toPT(gender));
      if (color) ptParts.push('Cor: ' + toPT(color));
      if (material) ptParts.push('Material: ' + toPT(material));
      descriptionPT = ptParts.filter(Boolean).join('. ') + '.';
    }
    let convertedImageUrl = '';
    let convertedImageUrl2 = '';
    let convertedImageUrl3 = '';
    let convertedImageUrl4 = '';
    if (convertImages && imageUrl) {
      // Build list of image URLs to process (up to 4)
      const imageUrlsToProcess = [imageUrl];
      const img2Input = m['imagenes-2'] || '';
      const img3Input = m['imagenes-3'] || '';
      const img4Input = m['imagenes-4'] || '';
      if (img2Input) imageUrlsToProcess.push(img2Input);
      if (img3Input) imageUrlsToProcess.push(img3Input);
      if (img4Input) imageUrlsToProcess.push(img4Input);
      // If only 1 image provided, try to discover more by pattern (e.g. 13092-2-original.jpg -> try -1, -3, -4)
      if (imageUrlsToProcess.length === 1) {
        const patternMatch = imageUrl.match(/^(.*?)(\d+)-(\d+)-original(\.\w+)$/);
        if (patternMatch) {
          const urlPrefix = patternMatch[1];
          const productId = patternMatch[2];
          const ext = patternMatch[4];
          for (let imgNum = 1; imgNum <= 4 && imageUrlsToProcess.length < 4; imgNum++) {
            const candidate = urlPrefix + productId + '-' + imgNum + '-original' + ext;
            if (!imageUrlsToProcess.includes(candidate)) {
              try {
                const urlObj = new URL(candidate);
                const headResp = await httpsGet(urlObj.hostname, urlObj.pathname, 5000);
                if (headResp.status === 200 && headResp.data.length > 1000) {
                  imageUrlsToProcess.push(candidate);
                }
              } catch (e) { /* skip if URL fails */ }
            }
          }
        }
      }
      // Process each image URL: imgproxy conversion + R2 upload
      const convertedUrls = [];
      for (let imgIdx = 0; imgIdx < imageUrlsToProcess.length && imgIdx < 4; imgIdx++) {
        try {
          let srcUrl = imageUrlsToProcess[imgIdx];
          const driveMatch = srcUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/);
          if (driveMatch) { srcUrl = 'https://drive.google.com/uc?export=download&id=' + driveMatch[1]; }
          let imgproxyInput = encodeURIComponent(srcUrl);
          if (removeBg && imgIdx === 0) {
            try {
              const urlObj = new URL(srcUrl);
              const origResponse = await httpsGet(urlObj.hostname, urlObj.pathname + urlObj.search);
              if (origResponse.status === 200 && origResponse.data.length > 1000) {
                const rembgResponse = await httpsPostBinary(REMBG_HOST, '/api/remove', origResponse.data, 'application/octet-stream');
                if (rembgResponse.status === 200 && rembgResponse.data.length > 1000) {
                  const tempKey = 'sprinter/tmp/' + sku.toLowerCase().replace(/[^a-z0-9-_]/g, '-') + '-nobg.png';
                  const tmpUpload = await uploadToR2Png(rembgResponse.data, tempKey);
                  if (tmpUpload.status === 200) {
                    imgproxyInput = encodeURIComponent(CDN_BASE + '/' + tempKey);
                  }
                }
              }
            } catch (e) { /* fallback */ }
          }
          const suffix = imgIdx === 0 ? '' : '-' + (imgIdx + 1);
          const imgproxyPath = '/insecure/rs:fit:' + W + ':' + H + ':1/bg:FFFFFF/ex:1/g:ce/format:jpg/quality:90/plain/' + imgproxyInput;
          const imgResponse = await httpsGet(IMGPROXY_HOST, imgproxyPath);
          if (imgResponse.status === 200 && imgResponse.data.length > 1000) {
            const objectKey = 'sprinter/' + sku.toLowerCase().replace(/[^a-z0-9-_]/g, '-') + suffix + '.jpg';
            const uploadResponse = await uploadToR2(imgResponse.data, objectKey);
            if (uploadResponse.status === 200) { convertedUrls.push(CDN_BASE + '/' + objectKey); }
            else { convertedUrls.push(''); }
          } else { convertedUrls.push(''); }
        } catch (e) { convertedUrls.push(''); }
      }
      convertedImageUrl = convertedUrls[0] || '';
      convertedImageUrl2 = convertedUrls[1] || '';
      convertedImageUrl3 = convertedUrls[2] || '';
      convertedImageUrl4 = convertedUrls[3] || '';
    }
    const mapped = m;
    const sprinterProduct = {
      'categorias': parsedCategoryHint || categoryToSlug(category) || categoryToSlug(mapped['categorias']) || '',
      'sku-de-vendedor': mapped['sku-de-vendedor'] || sku,
      'nombre-del-articulo': isPT ? (titlePT || toPT(title) || toPT(mapped['nombre-del-articulo']) || '') : (title || mapped['nombre-del-articulo'] || ''),
      'nombre-del-articulo-pt': isPT ? (titlePT || toPT(title) || toPT(mapped['nombre-del-articulo']) || '') : (titlePT || mapped['nombre-del-articulo-pt'] || ''),
      'subtitulo-de-productos': isPT ? (titlePT || toPT(title) || toPT(mapped['subtitulo-de-productos']) || '') : (title || mapped['subtitulo-de-productos'] || ''),
      'pais-fabricante': mapped['pais-fabricante'] || '',
      'marcas': mapped['marcas'] || brand,
      'genero': isPT ? (toPT(gender) || mapped['genero'] || '') : (mapped['genero'] || gender),
      'ean': ean,
      'descripion-del-producto': isPT ? (descriptionPT || toPT(description) || toPT(mapped['descripion-del-producto']) || '') : (description || mapped['descripion-del-producto'] || ''),
      'cuidados': mapped['cuidados'] || '',
      'imagenes-1': convertedImageUrl || mapped['imagenes-1'] || imageUrl || '',
      'imagenes-2': convertedImageUrl2 || mapped['imagenes-2'] || '',
      'imagenes-3': convertedImageUrl3 || mapped['imagenes-3'] || '',
      'imagenes-4': convertedImageUrl4 || mapped['imagenes-4'] || '',
      'video': mapped['video'] || '',
      'guia-de-tallas': mapped['guia-de-tallas'] || '',
      'cuidados-pt': mapped['cuidados-pt'] || mapped['cuidados'] || '',
      'descripion-del-producto-pt': isPT ? (descriptionPT || toPT(description) || toPT(mapped['descripion-del-producto']) || '') : (mapped['descripion-del-producto-pt'] || descriptionPT || ''),
      'pais-fabricante-pt': mapped['pais-fabricante-pt'] || mapped['pais-fabricante'] || '',
      'subtitulo-de-productos-pt': isPT ? (titlePT || toPT(title) || toPT(mapped['subtitulo-de-productos']) || '') : (titlePT || mapped['subtitulo-de-productos-pt'] || ''),
      'nombre-del-fabricante': mapped['nombre-del-fabricante'] || '',
      'nombre-comercial-registrado-del-fabricante': mapped['nombre-comercial-registrado-del-fabricante'] || '',
      'direccion-del-fabricante': mapped['direccion-del-fabricante'] || '',
      'correo-electronico-del-fabricante': mapped['correo-electronico-del-fabricante'] || '',
      'nombre-persona-responsable-en-eu': mapped['nombre-persona-responsable-en-eu'] || '',
      'direccion-de-la-persona-responsable': mapped['direccion-de-la-persona-responsable'] || '',
      'correo-electronico-de-la-persona-responsable': mapped['correo-electronico-de-la-persona-responsable'] || '',
      'foto-etiqueta-del-producto': mapped['foto-etiqueta-del-producto'] || '',
      'manual-de-seguridad-del-producto': mapped['manual-de-seguridad-del-producto'] || '',
      'colores': isPT ? toPT(color || mapped['colores'] || '') : (color || mapped['colores'] || ''),
      'talla': mapped['talla'] || '',
      'colecciones': isPT ? toPT(mapped['colecciones'] || '') : (mapped['colecciones'] || ''),
      'material-composicion': isPT ? toPT(mapped['material-composicion'] || material || '') : (mapped['material-composicion'] || material),
      'variant_group_code': mapped['variant_group_code'] || sku.replace(/-\d+$/, ''),
      'consejos-de-utilizacion': isPT ? toPT(mapped['consejos-de-utilizacion'] || '') : (mapped['consejos-de-utilizacion'] || ''),
      'impermeable': mapped['impermeable'] || '',
      'informacion-tecnica': isPT ? toPT(mapped['informacion-tecnica'] || '') : (mapped['informacion-tecnica'] || ''),
      'consejos-de-utilizacion-pt': isPT ? toPT(mapped['consejos-de-utilizacion-pt'] || mapped['consejos-de-utilizacion'] || '') : (mapped['consejos-de-utilizacion-pt'] || mapped['consejos-de-utilizacion'] || ''),
      'informacion-tecnica-pt': isPT ? toPT(mapped['informacion-tecnica-pt'] || mapped['informacion-tecnica'] || '') : (mapped['informacion-tecnica-pt'] || mapped['informacion-tecnica'] || ''),
      'material-composicion-pt': isPT ? toPT(mapped['material-composicion-pt'] || mapped['material-composicion'] || material || '') : (mapped['material-composicion-pt'] || mapped['material-composicion'] || material || ''),
      'colecciones-pt': isPT ? toPT(mapped['colecciones-pt'] || mapped['colecciones'] || '') : (mapped['colecciones-pt'] || mapped['colecciones'] || '')
    };
    const offerSku = mapped['_offer-sku'] || mapped['sku-de-vendedor'] || sku;
    const sprinterOffer = {
      'sku': offerSku,
      'product-id': ean,
      'product-id-type': 'EAN',
      'description': mapped['_offer-description'] || '',
      'internal-description': '',
      'price': mapped['_price'] || price,
      'price-additional-info': '',
      'quantity': mapped['_quantity'] || '0',
      'min-quantity-alert': '',
      'state': offerState,
      'available-start-date': '',
      'available-end-date': '',
      'logistic-class': '',
      'favorite-rank': '',
      'discount-price': mapped['_discount-price'] || '',
      'discount-start-date': mapped['_discount-start-date'] || '',
      'discount-end-date': mapped['_discount-end-date'] || '',
      'discount-ranges': '',
      'leadtime-to-ship': '',
      'update-delete': '',
      'price[channel=INIT]': mapped['_price'] || price,
      'discount-price[channel=INIT]': mapped['_discount-price'] || '',
      'discount-start-date[channel=INIT]': mapped['_discount-start-date'] || '',
      'discount-end-date[channel=INIT]': mapped['_discount-end-date'] || '',
      'discount-ranges[channel=INIT]': '',
      'shipment-origin': shipmentOrigin,
      'vat-percentage': vatPct
    };
    results.push({ json: { sku, ean, title, description, material, gsr, original_image_url: imageUrl, converted_image_url: convertedImageUrl, price, brand, size: mapped['talla'] || '', category: toPT(category), gender: toPT(gender), color: toPT(color), marketplace, sprinterProduct, sprinterOffer } });
  } catch (err) {
    errors.push({ sku: p.sku || p.SKU || '?', message: err.message });
    results.push({ json: { sku: p.sku || p.SKU || '?', ean: '', title: '', description: '', material: '', gsr: '', original_image_url: '', converted_image_url: '', price: '', brand: '', category: '', gender: '', color: '', marketplace } });
  }
}
if (results.length === 0) results.push({ json: { _empty: true } });
results[results.length - 1].json._errors = errors;
results[results.length - 1].json._totalInput = products.length;
results[results.length - 1].json._marketplace = marketplace;
results[results.length - 1].json._convertImages = convertImages;
results[results.length - 1].json._outputFormat = outputFormat;
results[results.length - 1].json._shipmentOrigin = shipmentOrigin;
results[results.length - 1].json._vatPct = vatPct;
return results;

