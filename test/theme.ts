import { readFileSync } from 'node:fs';

// Read from disk: vitest stubs CSS imports, `?raw` included, to an empty string.
const source = readFileSync(new URL('../src/styles/theme.css', import.meta.url), 'utf8').replaceAll(
  /\/\*[\s\S]*?\*\//g,
  '',
);

// The body of the block `header` opens, up to its matching brace.
function block(header: string): string {
  const open = source.indexOf(`${header} {`);
  if (open === -1) throw new Error(`theme.css has no \`${header} {\` block`);
  const start = source.indexOf('{', open) + 1;
  let depth = 1;
  for (let i = start; i < source.length; i++) {
    if (source[i] === '{') depth++;
    if (source[i] === '}' && --depth === 0) return source.slice(start, i);
  }
  throw new Error(`theme.css never closes \`${header}\``);
}

function declarations(body: string): Map<string, string> {
  return new Map([...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]));
}

// Every semantic token of one theme, with its `var()` chain followed down to a colour literal.
function resolve(tokens: Map<string, string>, primitives: Map<string, string>): Map<string, string> {
  const literal = (value: string): string =>
    value.replaceAll(/var\((--[\w-]+)\)/g, (_, name: string) => {
      const next = tokens.get(name) ?? primitives.get(name);
      if (next === undefined) throw new Error(`theme.css uses ${name} but never defines it`);
      return literal(next);
    });
  return new Map([...tokens].map(([name, value]) => [name, literal(value)]));
}

export function themes(): Record<'light' | 'dark', Map<string, string>> {
  const primitives = declarations(block(':root'));
  const light = declarations(block('@theme static'));
  const dark = new Map([...light, ...declarations(block('.dark'))]);
  return { light: resolve(light, primitives), dark: resolve(dark, primitives) };
}

// WCAG relative luminance of an `oklch()` colour, through OKLab and linear sRGB. A colour outside
// sRGB is clipped per channel, as a browser on an sRGB screen does.
function luminance(colour: string): number {
  const match = /^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+|none)\s*(?:\/\s*[\d.]+%?\s*)?\)$/.exec(colour);
  if (!match) throw new Error(`not an oklch() colour: ${colour}`);
  const [lightness, chroma, hue] = [
    Number(match[1]) / 100,
    Number(match[2]),
    match[3] === 'none' ? 0 : Number(match[3]),
  ];
  const a = chroma * Math.cos((hue * Math.PI) / 180);
  const b = chroma * Math.sin((hue * Math.PI) / 180);

  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  const clip = (channel: number) => Math.min(1, Math.max(0, channel));
  const red = clip(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s);
  const green = clip(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s);
  const blue = clip(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrast(first: string, second: string): number {
  const [light, dark] = [luminance(first), luminance(second)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}
