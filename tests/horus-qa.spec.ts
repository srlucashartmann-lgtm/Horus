import { test, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const REPORT_PATH = path.join(__dirname, 'qa-report.md');
const results: { status: string; area: string; detail: string }[] = [];

function log(status: '🔴 CRÍTICO' | '🟡 ATENÇÃO' | '🟢 OK', area: string, detail: string) {
  results.push({ status, area, detail });
}

async function shot(page: Page, name: string) {
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${name}.png`), fullPage: true });
}

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
});

test.afterAll(() => {
  const c = results.filter(r => r.status === '🔴 CRÍTICO');
  const a = results.filter(r => r.status === '🟡 ATENÇÃO');
  const o = results.filter(r => r.status === '🟢 OK');
  const lines = [
    '# 📋 Relatório QA — Sistema Hórus', '',
    `> Gerado em ${new Date().toLocaleString('pt-BR')}`, '',
    '| Status | Total |', '|--------|-------|',
    `| 🔴 Crítico | ${c.length} |`,
    `| 🟡 Atenção | ${a.length} |`,
    `| 🟢 OK | ${o.length} |`, '', '---', '',
  ];
  if (c.length) { lines.push('## 🔴 CRÍTICO', ''); c.forEach(r => lines.push(`- **[${r.area}]** ${r.detail}`)); lines.push(''); }
  if (a.length) { lines.push('## 🟡 ATENÇÃO', ''); a.forEach(r => lines.push(`- **[${r.area}]** ${r.detail}`)); lines.push(''); }
  if (o.length) { lines.push('## 🟢 OK', ''); o.forEach(r => lines.push(`- **[${r.area}]** ${r.detail}`)); lines.push(''); }
  lines.push('---', '', '## 📸 Screenshots', '', 'Salvas em `tests/screenshots/`', '');
  const files = fs.existsSync(SCREENSHOT_DIR) ? fs.readdirSync(SCREENSHOT_DIR).filter(f => f.endsWith('.png')) : [];
  files.forEach(f => lines.push(`- \`${f}\``));
  fs.writeFileSync(REPORT_PATH, lines.join('\n'), 'utf-8');
});

// ─── ROTAS ───

const ROUTES = [
  { path: '/war-room', name: 'War Room', title: 'War Room' },
  { path: '/quantitativo/tracking', name: 'Tracking', title: 'Filtros' },
  { path: '/quantitativo/cross-tabs', name: 'Cross-Tabs', title: 'Cruzamento' },
  { path: '/quantitativo/simulacoes', name: 'Simulacoes', title: 'Simulações' },
  { path: '/qualitativo/sessoes', name: 'Sessoes', title: 'Sessões' },
  { path: '/qualitativo/clipes', name: 'Clipes', title: 'Clipes' },
  { path: '/qualitativo/sentimentos', name: 'Sentimentos', title: 'Sentimentos' },
  { path: '/inteligencia/alertas', name: 'Alertas', title: 'Alertas' },
  { path: '/inteligencia/sintese', name: 'Sintese', title: 'Síntese' },
  { path: '/inteligencia/causa-efeito', name: 'CausaEfeito', title: 'Causa' },
  { path: '/configuracoes/dicionario', name: 'Dicionario', title: 'Dicionário' },
];

// ─── NAVEGAÇÃO ───

test.describe.serial('Navegação e Screenshots', () => {
  for (const route of ROUTES) {
    test(`${route.name} → ${route.path}`, async ({ page }) => {
      const jsErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          const t = msg.text();
          if (!t.includes('Warning') && !t.includes('DevTools') && !t.includes('favicon') && !t.includes('hydrat') && !t.includes('Download the React') && !t.includes('Third-party'))
            jsErrors.push(t);
        }
      });

      await page.goto(route.path, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await shot(page, route.name);

      const body = await page.locator('body').innerText();

      // 404 ou branco?
      if ((body.includes('404') && body.length < 500) || body.trim().length < 20) {
        log('🔴 CRÍTICO', `Nav/${route.name}`, `Página 404 ou em branco em ${route.path}`);
      } else {
        log('🟢 OK', `Nav/${route.name}`, `Carregou corretamente`);
      }

      // Título
      if (body.includes(route.title)) {
        log('🟢 OK', `Nav/${route.name}`, `Título "${route.title}" presente`);
      } else {
        log('🟡 ATENÇÃO', `Nav/${route.name}`, `Título "${route.title}" NÃO encontrado`);
      }

      // Sidebar
      const nav = await page.locator('nav').first().isVisible().catch(() => false);
      if (nav) log('🟢 OK', `Nav/${route.name}`, 'Sidebar visível');
      else log('🟡 ATENÇÃO', `Nav/${route.name}`, 'Sidebar não visível');

      // Erros JS
      if (jsErrors.length > 0) {
        log('🔴 CRÍTICO', `JS/${route.name}`, `${jsErrors.length} erro(s): ${jsErrors[0]?.substring(0, 150)}`);
      } else {
        log('🟢 OK', `JS/${route.name}`, 'Sem erros JS');
      }
    });
  }
});

// ─── BOTÕES WAR ROOM ───

test.describe.serial('Botões — War Room', () => {
  test('Menu settings abre', async ({ page }) => {
    await page.goto('/war-room', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const btns = page.locator('button:visible');
    const count = await btns.count();
    let found = false;

    for (let i = 0; i < count && !found; i++) {
      try {
        await btns.nth(i).click({ timeout: 800 });
        await page.waitForTimeout(300);
        const menu = page.locator('.MuiPopover-root:visible, .MuiMenu-root:visible, [role="menu"]:visible').first();
        if (await menu.isVisible().catch(() => false)) {
          const txt = await menu.innerText().catch(() => '');
          if (txt.includes('Editar') || txt.includes('Layout') || txt.includes('Exportar') || txt.includes('TV')) {
            log('🟢 OK', 'WarRoom/Menu⚙', `Dropdown: ${txt.replace(/\n/g, ' | ').substring(0, 100)}`);
            found = true;
            await shot(page, 'WarRoom-menu');
          }
          await page.keyboard.press('Escape');
          await page.waitForTimeout(200);
        }
      } catch { /* skip */ }
    }
    if (!found) log('🟡 ATENÇÃO', 'WarRoom/Menu⚙', 'Menu settings não encontrado');
  });
});

// ─── BOTÕES TRACKING ───

test.describe.serial('Botões — Tracking', () => {
  test('Selects, Aplicar, Tabs', async ({ page }) => {
    await page.goto('/quantitativo/tracking', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Selects
    const selects = page.locator('.MuiSelect-select:visible');
    let opened = 0;
    for (let i = 0; i < await selects.count(); i++) {
      try {
        await selects.nth(i).click({ timeout: 1500 });
        await page.waitForTimeout(300);
        if (await page.locator('[role="listbox"]:visible').isVisible().catch(() => false)) {
          opened++;
          await page.keyboard.press('Escape');
          await page.waitForTimeout(200);
        }
      } catch { /* skip */ }
    }
    log(opened >= 2 ? '🟢 OK' : '🟡 ATENÇÃO', 'Tracking/Selects', `${opened} selects abrem`);

    // Aplicar
    const aplicar = page.locator('button:visible:has-text("Aplicar")').first();
    if (await aplicar.isVisible().catch(() => false)) {
      await aplicar.click();
      log('🟢 OK', 'Tracking/Aplicar', 'Botão clicado');
    } else log('🔴 CRÍTICO', 'Tracking/Aplicar', 'Não encontrado');

    // Tabs
    let tabs = 0;
    for (const t of ['Intenção de Voto', 'Rejeição', 'Aprovação']) {
      const btn = page.locator(`button:visible:has-text("${t}")`).first();
      try {
        if (await btn.isVisible({ timeout: 1500 })) { await btn.click(); tabs++; await page.waitForTimeout(300); }
      } catch { /* skip */ }
    }
    log(tabs === 3 ? '🟢 OK' : '🟡 ATENÇÃO', 'Tracking/Tabs', `${tabs}/3 tabs clicados`);
    await shot(page, 'Tracking-botoes');
  });
});

// ─── BOTÕES CROSS-TABS ───

test.describe.serial('Botões — Cross-Tabs', () => {
  test('Selects, Gerar, Switch', async ({ page }) => {
    await page.goto('/quantitativo/cross-tabs', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const selects = page.locator('.MuiSelect-select:visible');
    let opened = 0;
    for (let i = 0; i < Math.min(await selects.count(), 5); i++) {
      try {
        await selects.nth(i).click({ timeout: 1500 });
        await page.waitForTimeout(300);
        if (await page.locator('[role="listbox"]:visible').isVisible().catch(() => false)) {
          opened++;
          await page.keyboard.press('Escape');
          await page.waitForTimeout(200);
        }
      } catch { /* skip */ }
    }
    log(opened >= 2 ? '🟢 OK' : '🟡 ATENÇÃO', 'CrossTabs/Selects', `${opened} selects`);

    const gerar = page.locator('button:visible:has-text("Gerar Cruzamento")').first();
    if (await gerar.isVisible().catch(() => false)) {
      await gerar.click(); await page.waitForTimeout(500);
      log('🟢 OK', 'CrossTabs/Gerar', 'Botão clicado');
    } else log('🔴 CRÍTICO', 'CrossTabs/Gerar', 'Não encontrado');

    const sw = page.locator('.MuiSwitch-switchBase input').first();
    try { await sw.check({ force: true }); await sw.uncheck({ force: true }); log('🟢 OK', 'CrossTabs/Switch', 'Funciona'); }
    catch { log('🟡 ATENÇÃO', 'CrossTabs/Switch', 'Não interagível'); }

    await shot(page, 'CrossTabs-botoes');
  });
});

// ─── BOTÕES SIMULAÇÕES ───

test.describe.serial('Botões — Simulações', () => {
  test('Tabs de cenário', async ({ page }) => {
    await page.goto('/quantitativo/simulacoes', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    let clicked = 0;
    for (const t of ['Cenário Atual', 'Desistência', 'Segundo Turno', 'Conversão']) {
      const btn = page.locator(`button:visible:has-text("${t}")`).first();
      try { if (await btn.isVisible({ timeout: 1500 })) { await btn.click(); clicked++; await page.waitForTimeout(400); } } catch {}
    }
    log(clicked >= 3 ? '🟢 OK' : '🟡 ATENÇÃO', 'Simulacoes/Tabs', `${clicked}/4 tabs`);

    // Redistribuir
    const redist = page.locator('button:visible:has-text("Redistribuir")').first();
    if (await redist.isVisible().catch(() => false)) {
      await redist.click(); log('🟢 OK', 'Simulacoes/Redistribuir', 'Funciona');
    }
    await shot(page, 'Simulacoes-botoes');
  });
});

// ─── BOTÕES SESSÕES ───

test.describe.serial('Botões — Sessões', () => {
  test('Nova Sessão e Filtrar', async ({ page }) => {
    await page.goto('/qualitativo/sessoes', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const nova = page.locator('button:visible:has-text("Nova Sess")').first();
    if (await nova.isVisible().catch(() => false)) {
      await nova.click(); await page.waitForTimeout(500);
      const modal = page.locator('[role="dialog"]:visible').first();
      if (await modal.isVisible().catch(() => false)) {
        log('🟢 OK', 'Sessoes/NovaSessao', 'Modal abriu');
        await shot(page, 'Sessoes-nova-modal');
        await page.keyboard.press('Escape'); await page.waitForTimeout(300);
      } else log('🟡 ATENÇÃO', 'Sessoes/NovaSessao', 'Modal não abriu');
    } else log('🔴 CRÍTICO', 'Sessoes/NovaSessao', 'Botão não encontrado');

    const filtrar = page.locator('button:visible:has-text("Filtrar")').first();
    if (await filtrar.isVisible().catch(() => false)) {
      await filtrar.click(); await page.waitForTimeout(400);
      log('🟢 OK', 'Sessoes/Filtrar', 'Botão clicado');
    }

    await shot(page, 'Sessoes-botoes');
  });
});

// ─── BOTÕES CLIPES ───

test.describe.serial('Botões — Clipes', () => {
  test('Adicionar e filtros', async ({ page }) => {
    await page.goto('/qualitativo/clipes', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const add = page.locator('button:visible:has-text("Adicionar")').first();
    if (await add.isVisible().catch(() => false)) {
      await add.click(); await page.waitForTimeout(500);
      const modal = page.locator('[role="dialog"]:visible').first();
      if (await modal.isVisible().catch(() => false)) {
        log('🟢 OK', 'Clipes/Adicionar', 'Modal abriu');
        await shot(page, 'Clipes-adicionar-modal');
        await page.keyboard.press('Escape'); await page.waitForTimeout(300);
      } else log('🟡 ATENÇÃO', 'Clipes/Adicionar', 'Modal não abriu');
    } else log('🔴 CRÍTICO', 'Clipes/Adicionar', 'Botão não encontrado');

    const selects = page.locator('.MuiSelect-select:visible');
    let opened = 0;
    for (let i = 0; i < Math.min(await selects.count(), 5); i++) {
      try {
        await selects.nth(i).click({ timeout: 1500 });
        await page.waitForTimeout(300);
        if (await page.locator('[role="listbox"]:visible').isVisible().catch(() => false)) { opened++; await page.keyboard.press('Escape'); await page.waitForTimeout(200); }
      } catch {}
    }
    log(opened >= 3 ? '🟢 OK' : '🟡 ATENÇÃO', 'Clipes/Filtros', `${opened} selects`);

    const sw = page.locator('.MuiSwitch-switchBase input').first();
    try { await sw.check({ force: true }); log('🟢 OK', 'Clipes/Favoritos', 'Toggle funciona'); await sw.uncheck({ force: true }); }
    catch { log('🟡 ATENÇÃO', 'Clipes/Favoritos', 'Toggle não encontrado'); }

    await shot(page, 'Clipes-botoes');
  });
});

// ─── BOTÕES ALERTAS ───

test.describe.serial('Botões — Alertas', () => {
  test('Investigar, Resolvido, Silenciar, Switches', async ({ page }) => {
    await page.goto('/inteligencia/alertas', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    for (const label of ['Investigar', 'Resolvido', 'Silenciar']) {
      const btn = page.locator(`button:visible:has-text("${label}")`).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click(); await page.waitForTimeout(300);
        log('🟢 OK', `Alertas/${label}`, 'Botão clicado');
        if (label === 'Investigar') { await page.goBack(); await page.waitForLoadState('networkidle'); await page.waitForTimeout(1000); }
      } else log('🟡 ATENÇÃO', `Alertas/${label}`, 'Não encontrado');
    }

    const switches = page.locator('.MuiSwitch-switchBase input');
    let toggled = 0;
    for (let i = 0; i < Math.min(await switches.count(), 4); i++) {
      try { await switches.nth(i).check({ force: true }); toggled++; await switches.nth(i).uncheck({ force: true }); } catch {}
    }
    log(toggled > 0 ? '🟢 OK' : '🟡 ATENÇÃO', 'Alertas/Switches', `${toggled} regras toggled`);

    await shot(page, 'Alertas-botoes');
  });
});

// ─── BOTÕES SÍNTESE ───

test.describe.serial('Botões — Síntese', () => {
  test('Select semana, Exportar, Cheat Sheet, Checkboxes', async ({ page }) => {
    await page.goto('/inteligencia/sintese', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const selects = page.locator('.MuiSelect-select:visible');
    if (await selects.first().isVisible().catch(() => false)) {
      await selects.first().click(); await page.waitForTimeout(300);
      if (await page.locator('[role="listbox"]:visible').isVisible().catch(() => false)) {
        log('🟢 OK', 'Sintese/SelectSemana', 'Abre');
        await page.keyboard.press('Escape'); await page.waitForTimeout(200);
      }
    }

    const exportPdf = page.locator('button:visible:has-text("Exportar PDF")').first();
    if (await exportPdf.isVisible().catch(() => false)) { await exportPdf.click(); log('🟢 OK', 'Sintese/ExportarPDF', 'Clicado'); }
    else log('🟡 ATENÇÃO', 'Sintese/ExportarPDF', 'Não encontrado');

    const cheat = page.locator('button:visible:has-text("Cheat Sheet")').first();
    if (await cheat.isVisible().catch(() => false)) {
      await cheat.click(); await page.waitForTimeout(500);
      log('🟢 OK', 'Sintese/CheatSheet', 'Clicado');
      await shot(page, 'Sintese-cheatsheet');
    }

    const cbs = page.locator('.MuiCheckbox-root input');
    let checked = 0;
    for (let i = 0; i < Math.min(await cbs.count(), 5); i++) {
      try { await cbs.nth(i).check({ force: true }); checked++; } catch {}
    }
    log(checked > 0 ? '🟢 OK' : '🟡 ATENÇÃO', 'Sintese/Checkboxes', `${checked} marcados`);

    const exportCheat = page.locator('button:visible:has-text("Exportar Cheat")').first();
    if (await exportCheat.isVisible().catch(() => false)) { await exportCheat.click(); log('🟢 OK', 'Sintese/ExportCheat', 'Clicado'); }

    await shot(page, 'Sintese-botoes');
  });
});

// ─── BOTÕES CAUSA E EFEITO ───

test.describe.serial('Botões — Causa e Efeito', () => {
  test('Selects, Analisar, Checkboxes, Exportar', async ({ page }) => {
    await page.goto('/inteligencia/causa-efeito', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const selects = page.locator('.MuiSelect-select:visible');
    let opened = 0;
    for (let i = 0; i < Math.min(await selects.count(), 3); i++) {
      try {
        await selects.nth(i).click({ timeout: 1500 });
        await page.waitForTimeout(300);
        if (await page.locator('[role="listbox"]:visible').isVisible().catch(() => false)) { opened++; await page.keyboard.press('Escape'); await page.waitForTimeout(200); }
      } catch {}
    }
    log(opened >= 2 ? '🟢 OK' : '🟡 ATENÇÃO', 'CausaEfeito/Selects', `${opened} selects`);

    const analisar = page.locator('button:visible:has-text("Analisar")').first();
    if (await analisar.isVisible().catch(() => false)) {
      await analisar.click(); await page.waitForTimeout(800);
      log('🟢 OK', 'CausaEfeito/Analisar', 'Clicado');
    } else log('🔴 CRÍTICO', 'CausaEfeito/Analisar', 'Não encontrado');

    const cbs = page.locator('.MuiCheckbox-root input');
    let checked = 0;
    for (let i = 0; i < Math.min(await cbs.count(), 5); i++) {
      try { await cbs.nth(i).check({ force: true }); checked++; } catch {}
    }
    log(checked > 0 ? '🟢 OK' : '🟡 ATENÇÃO', 'CausaEfeito/Plano', `${checked} checkboxes`);

    const exp = page.locator('button:visible:has-text("Exportar Plano")').first();
    if (await exp.isVisible().catch(() => false)) { await exp.click(); log('🟢 OK', 'CausaEfeito/Exportar', 'Clicado'); }

    await shot(page, 'CausaEfeito-botoes');
  });
});

// ─── GLOBAIS ───

test.describe.serial('Verificações Globais', () => {
  test('Inglês remanescente e Unicode quebrado', async ({ page }) => {
    for (const p of ['/war-room', '/quantitativo/tracking', '/qualitativo/sessoes']) {
      await page.goto(p, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      const body = await page.locator('body').innerText();

      for (const eng of ['Dashboard', 'Settings', 'Loading', 'Submit', 'Cancel', 'Delete', 'Something went wrong']) {
        if (body.includes(eng)) log('🟡 ATENÇÃO', `Idioma/${p}`, `Texto em inglês: "${eng}"`);
      }

      if (body.includes('�') || body.includes('Ã§') || body.includes('Ã£'))
        log('🔴 CRÍTICO', `Unicode/${p}`, 'Caracteres quebrados');
    }
    log('🟢 OK', 'Global/Idioma', 'Verificação concluída');
    log('🟢 OK', 'Global/Unicode', 'Verificação concluída');
  });

  test('Dark/Light toggle', async ({ page }) => {
    await page.goto('/war-room', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const btns = page.locator('header button:visible');
    let found = false;
    for (let i = 0; i < await btns.count() && !found; i++) {
      try {
        const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        await btns.nth(i).click({ timeout: 800 });
        await page.waitForTimeout(500);
        const after = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
        if (before !== after) {
          found = true;
          log('🟢 OK', 'Global/DarkLight', 'Toggle funciona');
          await shot(page, 'DarkMode');
          await btns.nth(i).click();
        } else { await page.keyboard.press('Escape'); await page.waitForTimeout(200); }
      } catch {}
    }
    if (!found) log('🟡 ATENÇÃO', 'Global/DarkLight', 'Toggle não encontrado');
  });
});
