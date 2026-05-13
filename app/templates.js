export default {
  templateCategory: 'calzado',

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
};
