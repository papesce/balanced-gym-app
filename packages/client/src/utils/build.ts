import s from 'shelljs';
import config from '../../tsconfig.json';
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('-a', `../server/api-explorer/.`, `${outDir}/spi-explorer`);
