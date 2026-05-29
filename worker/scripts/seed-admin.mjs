import bcrypt from 'bcryptjs';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const remote = process.argv.includes('--remote');
const flag = remote ? '--remote' : '--local';

function loadDevVars(): Record<string, string> {
  const path = join(__dirname, '..', '.dev.vars');
  const vars: Record<string, string> = {};
  try {
    const content = readFileSync(path, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
      const [key, ...rest] = trimmed.split('=');
      vars[key.trim()] = rest.join('=').trim();
    }
  } catch {
    // fall back to env
  }
  return vars;
}

const devVars = loadDevVars();
const email = (process.env.ADMIN_EMAIL ?? devVars.ADMIN_EMAIL ?? 'barbell@ballerina.com').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? devVars.ADMIN_PASSWORD ?? 'Admin123';
const hash = bcrypt.hashSync(password, 12);

const sql = `-- generated seed
INSERT INTO admins (email, password_hash) VALUES ('${email.replace(/'/g, "''")}', '${hash.replace(/'/g, "''")}')
ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash;
`;

const sqlPath = join(__dirname, '..', '.seed-admin.sql');
writeFileSync(sqlPath, sql, 'utf8');

try {
  execSync(`npx wrangler d1 execute tbb-db ${flag} --file=.seed-admin.sql`, {
    stdio: 'inherit',
    cwd: join(__dirname, '..'),
  });
  console.log(`Upserted admin: ${email}`);
} finally {
  unlinkSync(sqlPath);
}
