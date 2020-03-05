import {createDefaultConfig} from '@open-wc/building-rollup';
import copy from 'rollup-plugin-cpy';

const outputDir = 'docs';

const config = createDefaultConfig({input: './index.html', outputDir});

export default {
  ...config,
  output: {
    ...config.output,
    sourcemap: false,
  },
  plugins: [...config.plugins, copy([
    {files: ['./manifest.json'], dest: outputDir},
    {files: ['icons/*.png'], dest: `${outputDir}/icons`}
  ])],
};
