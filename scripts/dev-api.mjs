import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const host = '127.0.0.1';
const port = '8080';

const phpCandidates = [
  process.env.PHP_BIN,
  process.env.PHP_PATH,
  'C:/xampp/php/php.exe',
  '/c/xampp/php/php.exe',
  'php',
].filter(Boolean);

function resolvePhpBinary() {
  for (const candidate of phpCandidates) {
    if (candidate === 'php') {
      return candidate;
    }

    const normalized = candidate.replace(/^\/c\//i, 'C:/');
    if (existsSync(normalized)) {
      return normalized;
    }
  }

  return 'php';
}

const phpBin = resolvePhpBinary();
const args = ['-S', `${host}:${port}`, '-t', 'public'];
const useShell = phpBin === 'php';

console.log(`[dev:api] Starting PHP at http://${host}:${port} (${phpBin})`);

const child = spawn(useShell ? phpBin : phpBin, useShell ? args : args, {
  cwd: rootDir,
  stdio: 'inherit',
  shell: useShell,
  ...(useShell ? {} : { windowsHide: true }),
});

child.on('error', (error) => {
  console.error('[dev:api] Failed to start PHP server.');
  console.error(error.message);
  console.error('Set PHP_BIN to your php.exe path, e.g. C:/xampp/php/php.exe');
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
