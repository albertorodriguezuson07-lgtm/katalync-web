const {
  INPUT_MAP,
  TYPE_KEYWORDS_DETECT,
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
} = require('../lib/functions');

// ================================================================
// Suite 1: mapInputRow
// ================================================================
describe('mapInputRow', () => {
  test('maps "sku" to "sku-de-vendedor"', () => {
    const result = mapInputRow({ sku: 'ABC123' });
    expect(result['sku-de-vendedor']).toBe('ABC123');
  });

  test('maps "SKU" (uppercase) to "sku-de-vendedor"', () => {
    const result = mapInputRow({ SKU: 'DEF456' });
    expect(result['sku-de-vendedor']).toBe('DEF456');
  });

  test('maps "marca" to "marcas"', () => {
    const result = mapInputRow({ marca: 'Nike' });
    expect(result['marcas']).toBe('Nike');
  });

  test('maps native Mirakl codes as identity', () => {
    const result = mapInputRow({ 'sku-de-vendedor': 'NATIVE1', 'marcas': 'Adidas' });
    expect(result['sku-de-vendedor']).toBe('NATIVE1');
    expect(result['marcas']).toBe('Adidas');
  });

  test('skips empty and null values', () => {
    const result = mapInputRow({ sku: '', marca: null, nombre: '  ' });
    expect(Object.keys(result).length).toBe(0);
  });

  test('trims whitespace from values', () => {
    const result = mapInputRow({ sku: '  TRIMMED  ' });
    expect(result['sku-de-vendedor']).toBe('TRIMMED');
  });
});

// ================================================================
// Suite 2: removeAccents
// ================================================================
describe('removeAccents', () => {
  test('removes accents from Spanish text', () => {
    expect(removeAccents('Categoría')).toBe('Categoria');
  });

  test('removes accents from Portuguese text', () => {
    expect(removeAccents('Sandália')).toBe('Sandalia');
  });

  test('handles multiple accented characters', () => {
    expect(removeAccents('Línéà')).toBe('Linea');
  });

  test('returns unaccented text unchanged', () => {
    expect(removeAccents('Hello World')).toBe('Hello World');
  });
});

// ================================================================
// Suite 3: categoryToSlug
// ================================================================
describe('categoryToSlug', () => {
  test('converts "Calzado Running" to slug', () => {
    expect(categoryToSlug('Calzado Running')).toBe('calzado-running');
  });

  test('converts "Ropa Top Camisetas" to slug', () => {
    expect(categoryToSlug('Ropa Top Camisetas')).toBe('ropa-top_camisetas');
  });

  test('handles accented input', () => {
    expect(categoryToSlug('Nutrición Suplementos')).toBe('nutricion-suplementos');
  });

  test('returns empty string for empty input', () => {
    expect(categoryToSlug('')).toBe('');
    expect(categoryToSlug(null)).toBe('');
    expect(categoryToSlug(undefined)).toBe('');
  });
});

// ================================================================
// Suite 4: parseProductName
// ================================================================
describe('parseProductName', () => {
  test('detects "Chancla" type from product name', () => {
    const result = parseProductName('Nike Victori One Chancla');
    expect(result.prodType).toBe('Chancla');
    expect(result.confidence).toBe('high');
  });

  test('extracts model from "Nike Air Max 90 Trail"', () => {
    const result = parseProductName('Nike Air Max 90 Trail', 'Nike');
    expect(result.prodType).toBe('Zapatilla');
    expect(result.model).toBe('Air Max 90');
    expect(result.categoryHint).toBe('calzado-trail_running');
  });

  test('strips brand from model words', () => {
    const result = parseProductName('Adidas Predator AG Taco', 'Adidas');
    expect(result.model).not.toMatch(/^Adidas/);
    expect(result.prodType).toBe('Bota');
  });

  test('detects "Camiseta" type', () => {
    const result = parseProductName('Puma TeamGOAL Camiseta Manga Corta');
    expect(result.prodType).toBe('Camiseta');
    expect(result.categoryHint).toBe('ropa-top-camisetas');
  });

  test('detects "Sudadera" type', () => {
    const result = parseProductName('Nike Sportswear Club Sudadera');
    expect(result.prodType).toBe('Sudadera');
    expect(result.categoryHint).toBe('ropa-top-sudaderas');
  });

  test('stops model extraction at stop words (colors)', () => {
    const result = parseProductName('Nike Air Max Negro/Blanco Chancla', 'Nike');
    expect(result.model).toBe('Air Max');
  });

  test('stops at year numbers (2024+)', () => {
    const result = parseProductName('2025 Nike Air Max Trail');
    expect(result.model).toBe('');
  });

  test('defaults to Zapatilla with low confidence when no keyword found', () => {
    const result = parseProductName('Nike Air Max 90');
    expect(result.prodType).toBe('Zapatilla');
    expect(result.confidence).toBe('low');
    expect(result.categoryHint).toBe('calzado-correr_caminar');
  });
});

// ================================================================
// Suite 5: prodTypeToCategoryHint
// ================================================================
describe('prodTypeToCategoryHint', () => {
  test('maps Chancla to calzado-chanclas', () => {
    expect(prodTypeToCategoryHint('Chancla')).toBe('calzado-chanclas');
  });

  test('maps Zapatilla + trail to calzado-trail_running', () => {
    expect(prodTypeToCategoryHint('Zapatilla', 'nike air max trail')).toBe('calzado-trail_running');
  });

  test('maps Bota + sala to calzado-futbol-botas_sala', () => {
    expect(prodTypeToCategoryHint('Bota', 'nike mercurial sala')).toBe('calzado-futbol-botas_sala');
  });

  test('returns empty string for unknown type', () => {
    expect(prodTypeToCategoryHint('TipoDesconocido')).toBe('');
  });
});

// ================================================================
// Suite 6: getProductTypePT
// ================================================================
describe('getProductTypePT', () => {
  test('translates Zapatilla to Sapatilha', () => {
    expect(getProductTypePT('Zapatilla')).toBe('Sapatilha');
  });

  test('translates Camiseta to Camisola', () => {
    expect(getProductTypePT('Camiseta')).toBe('Camisola');
  });

  test('returns empty string for unknown type', () => {
    expect(getProductTypePT('TipoDesconocido')).toBe('');
  });
});

// ================================================================
// Suite 7: extractSingleColor
// ================================================================
describe('extractSingleColor', () => {
  test('returns exact match for valid color', () => {
    expect(extractSingleColor('Negro')).toBe('Negro');
  });

  test('extracts first color from slash-separated input', () => {
    expect(extractSingleColor('Negro/Blanco')).toBe('Negro');
  });

  test('handles compound color "Azul Marino"', () => {
    expect(extractSingleColor('Azul Marino')).toBe('Azul Marino');
  });

  test('returns empty string for empty input', () => {
    expect(extractSingleColor('')).toBe('');
    expect(extractSingleColor(null)).toBe('');
    expect(extractSingleColor(undefined)).toBe('');
  });

  test('capitalizes unknown color fallback', () => {
    expect(extractSingleColor('magenta')).toBe('Magenta');
  });
});

// ================================================================
// Suite 8: toPT
// ================================================================
describe('toPT', () => {
  test('translates "Zapatillas Running" to "Sapatilhas Running"', () => {
    expect(toPT('Zapatillas Running', true)).toBe('Sapatilhas Running');
  });

  test('translates single word "Negro" to "Preto"', () => {
    expect(toPT('Negro', true)).toBe('Preto');
  });

  test('returns original text when isPT is false', () => {
    expect(toPT('Zapatillas Running', false)).toBe('Zapatillas Running');
  });

  test('returns null/empty unchanged', () => {
    expect(toPT('', true)).toBe('');
    expect(toPT(null, true)).toBe(null);
  });
});
