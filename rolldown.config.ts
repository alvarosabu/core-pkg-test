/** @type {import('rolldown').Config} */
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    {
      name: 'typescript',
      transform(code, id) {
        if (id.endsWith('.ts')) {
          // Basic TypeScript transformation
          return {
            code: code.replace(/export\s+class/g, 'export class'),
            map: null
          };
        }
      }
    }
  ]
}; 