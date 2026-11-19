        /* =========================================================
           БЕЗОПАСНЫЕ СТРОКОВЫЕ КОНСТАНТЫ ТЕГОВ (ЗАЩИТА ОТ HTML-ПАРСЕРА)
           ========================================================= */
        const LT = String.fromCharCode(60);
        const GT = String.fromCharCode(62);
        const TAG = {
            scriptOpen: LT + 'script' + GT,
            scriptClose: LT + '/script' + GT,
            styleOpen: LT + 'style' + GT,
            styleClose: LT + '/style' + GT,
            headClose: LT + '/head' + GT,
            bodyClose: LT + '/body' + GT,
            htmlClose: LT + '/html' + GT
        };

        const STARTER_TEMPLATES = [
            {
                id: 'tpl-hello',
                name: 'Интерактивная карточка',
                desc: 'Современный адаптивный макет со счётчиком кликов',
                html: `<div class="card">\n  <h1>Привет!</h1>\n  <button id="btn">Кликни меня</button>\n</div>`,
                css: `body {\n  background: #0f172a;\n  color: #ffffff;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  font-family: sans-serif;\n}\n.card {\n  background: #1e293b;\n  padding: 24px;\n  border-radius: 16px;\n  text-align: center;\n}`,
                js: `console.log('Карточка готова');\ndocument.getElementById('btn').onclick = () => {\n  console.log('Нажата кнопка!');\n  alert('Работает!');\n};`
            },
            {
                id: 'tpl-blank',
                name: 'Чистый лист',
                desc: 'Пустая заготовка',
                html: `<h1>Новый проект</h1>`,
                css: `body {\n  font-family: system-ui;\n  padding: 20px;\n}`,
                js: `console.log('Старт!');`
            }
        ];

        const CDN_CATALOG = [
            { name: 'Tailwind CSS (Play CDN)', desc: 'Утилитарный CSS-фреймворк', tag: LT + 'script src="https://cdn.tailwindcss.com"' + GT + TAG.scriptClose },
            { name: 'FontAwesome 6', desc: 'Популярный набор векторных иконок', tag: LT + 'link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"' + GT },
            { name: 'Animate.css', desc: 'Готовые CSS-анимации классов', tag: LT + 'link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"' + GT },
            { name: 'Three.js (r128)', desc: '3D-графика и WebGL в браузере', tag: LT + 'script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"' + GT + TAG.scriptClose },
            { name: 'Chart.js', desc: 'Красивые графики и диаграммы', tag: LT + 'script src="https://cdn.jsdelivr.net/npm/chart.js"' + GT + TAG.scriptClose },
            { name: 'GSAP 3', desc: 'Профессиональные JS-анимации', tag: LT + 'script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"' + GT + TAG.scriptClose },
            { name: 'Canvas Confetti', desc: 'Праздничный салют из конфетти', tag: LT + 'script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"' + GT + TAG.scriptClose },
            { name: 'Alpine.js', desc: 'Лёгкая реактивность прямо в HTML', tag: LT + 'script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"' + GT + TAG.scriptClose }
        ];

        const BUILTIN_SNIPPETS = [
            { id: 'builtin-1', lang: 'html', title: 'Адаптивная карточка', code: `<div class="card">\n  <h3>Заголовок</h3>\n  <p>Описание карточки</p>\n  <button>Действие</button>\n</div>` },
            { id: 'builtin-2', lang: 'html', title: 'Форма обратной связи', code: `<form id="contactForm">\n  <input type="text" placeholder="Ваше имя" required>\n  <input type="email" placeholder="Email" required>\n  <button type="submit">Отправить</button>\n</form>` },
            { id: 'builtin-3', lang: 'html', title: 'Полноэкранный Canvas', code: `<canvas id="gameCanvas"></canvas>` },
            { id: 'builtin-4', lang: 'css', title: 'Центрирование Flexbox', code: `display: flex;\nalign-items: center;\njustify-content: center;` },
            { id: 'builtin-5', lang: 'css', title: 'Эффект матового стекла (Glass)', code: `background: rgba(255, 255, 255, 0.1);\nbackdrop-filter: blur(12px);\n-webkit-backdrop-filter: blur(12px);\nborder: 1px solid rgba(255, 255, 255, 0.2);\nborder-radius: 16px;` },
            { id: 'builtin-6', lang: 'css', title: 'Плавная анимация появления', code: `animation: fadeIn 0.4s ease-in-out;\n@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(6px); }\n  to { opacity: 1; transform: translateY(0); }\n}` },
            { id: 'builtin-7', lang: 'js', title: 'Запрос Fetch API', code: `fetch('https://api.example.com/data')\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));` },
            { id: 'builtin-8', lang: 'js', title: 'Управление классом по клику', code: `document.getElementById('myElement').addEventListener('click', function() {\n  this.classList.toggle('active');\n});` },
            { id: 'builtin-9', lang: 'js', title: 'Локальное хранилище (LocalStorage)', code: `localStorage.setItem('key', JSON.stringify(data));\nconst saved = JSON.parse(localStorage.getItem('key'));` }
        ];

        const AUTO_PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
        const CLOSING_PAIRS = new Set([')', ']', '}', '"', "'"]);

        const STORAGE_KEYS = {
            SESSION: 'codedock_session_v14',
            PROJECTS: 'codedock_projects_v14',
            FOLDERS: 'codedock_folders_v14',
            CUSTOM_SNIPPETS: 'codedock_custom_snippets_v1',
            THEME: 'codedock_theme_v1'
        };

        const state = {
            theme: 'dark',
            mode: 'split',
            activeTab: 'html',
            lastCodeTab: 'html',
            currentProjectId: null,
            projectName: 'Мой проект',
            unsaved: false,
            consoleOpen: true,
            consoleCount: 0,
            consoleErrorCount: 0,
            code: { html: STARTER_TEMPLATES[0].html, css: STARTER_TEMPLATES[0].css, js: STARTER_TEMPLATES[0].js, single: '' }
        };

        const historyStacks = {
            html: { undo: [], redo: [] },
            css: { undo: [], redo: [] },
            js: { undo: [], redo: [] },
            single: { undo: [], redo: [] }
        };

        let csCurrentTab = 'cdn';
        let csCurrentFilter = 'all';

        const textarea = document.getElementById('code-textarea');
        const codePre = document.getElementById('code-pre');
        const highlightContent = document.getElementById('code-highlight-content');
        const lineNumbers = document.getElementById('line-numbers');

        window.addEventListener('DOMContentLoaded', () => {
            initTheme();
            initDefaultData();
            loadSession();
            seedInitialHistory();
            updateUI();
            setupEditorListeners();
            setupConsoleBridge();
            setupSystemBackHandler();
        });

        /* =========================================================
           СИСТЕМНАЯ КНОПКА «НАЗАД» (ANDROID / MOBILE BROWSER / PWA)
           ========================================================= */
        const MODAL_STACK_ORDER = [
            'modal-confirm',
            'modal-create-project',
            'modal-folder',
            'modal-create-snippet',
            'modal-projects',
            'modal-cdn-snippets',
            'modal-templates'
        ];

        let lastExitAttemptTime = 0;
        let isSystemBackArmed = false;

        function getTopOpenModalId() {
            for (const id of MODAL_STACK_ORDER) {
                const el = document.getElementById(id);
                if (el && !el.classList.contains('hidden')) {
                    return id;
                }
            }
            return null;
        }

        function armSystemBackSentinel() {
            if (isSystemBackArmed) return;
            try {
                history.pushState({ codedockSentinel: true, ts: Date.now() }, '', location.href);
                isSystemBackArmed = true;
            } catch (_) {}
        }

        function setupSystemBackHandler() {
            armSystemBackSentinel();

            window.addEventListener('popstate', () => {
                isSystemBackArmed = false;

                // 1. Приоритет: закрываем верхнее открытое модальное окно
                const topModalId = getTopOpenModalId();
                if (topModalId) {
                    closeModal(topModalId);
                    armSystemBackSentinel();
                    return;
                }

                // 2. Приоритет: если открыт предпросмотр — возвращаемся в редактор кода
                if (state.activeTab === 'preview') {
                    switchTab(getTargetCodeTab());
                    armSystemBackSentinel();
                    return;
                }

                // 3. Приоритет: главный экран редактора — двойное нажатие для выхода
                const now = Date.now();
                if (now - lastExitAttemptTime < 2000) {
                    // Позволяем браузеру выполнить штатный выход назад
                    history.back();
                    return;
                }

                lastExitAttemptTime = now;
                showToast('Нажмите «Назад» ещё раз для выхода', '⬅️');
                armSystemBackSentinel();
            });

            // Поддержка клавиши Escape на внешних клавиатурах / десктопе
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const topModalId = getTopOpenModalId();
                    if (topModalId) {
                        e.preventDefault();
                        closeModal(topModalId);
                    } else if (state.activeTab === 'preview') {
                        e.preventDefault();
                        switchTab(getTargetCodeTab());
                    }
                }
            });
        }

        /* =========================================================
           АВТОФОРМАТИРОВАНИЕ КОДА (СТУПЕНЬКАМИ И ПО ПРЯМОЙ)
           ========================================================= */
        const HTML_VOID_TAGS = new Set([
            'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
            'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype'
        ]);

        function formatBraceLanguage(code, indentStr = '  ') {
            const lines = String(code || '').replace(/\r\n/g, '\n').split('\n');
            const out = [];
            let level = 0;
            let inBlockComment = false;

            for (let rawLine of lines) {
                const trimmed = rawLine.trim();
                if (!trimmed) {
                    if (out.length > 0 && out[out.length - 1] !== '') out.push('');
                    continue;
                }

                // Многострочные комментарии /* ... */ сохраняют выравнивание по прямой текущего уровня
                if (inBlockComment) {
                    out.push(indentStr.repeat(level) + trimmed);
                    if (trimmed.includes('*/')) inBlockComment = false;
                    continue;
                }

                if (trimmed.startsWith('/*') && !trimmed.includes('*/')) {
                    out.push(indentStr.repeat(level) + trimmed);
                    inBlockComment = true;
                    continue;
                }

                // Очищаем строки и комментарии для точного подсчёта скобок { и }
                const codeOnly = trimmed
                    .replace(/\/\*[\s\S]*?\*\//g, '')
                    .replace(/\/\/.*$/, '')
                    .replace(/`(?:\\[\s\S]|[^\\`])*`/g, '""')
                    .replace(/"(?:\\.|[^"\\])*"/g, '""')
                    .replace(/'(?:\\.|[^'\\])*'/g, "''");

                const leadingCloseMatch = codeOnly.match(/^([}\])]+)/);
                const leadingCloses = leadingCloseMatch ? leadingCloseMatch[1].length : 0;
                const currentLevel = Math.max(0, level - leadingCloses);

                out.push(indentStr.repeat(currentLevel) + trimmed);

                let openCount = 0;
                let closeCount = 0;
                for (let i = 0; i < codeOnly.length; i++) {
                    const ch = codeOnly[i];
                    if (ch === '{') openCount++;
                    else if (ch === '}') closeCount++;
                }

                const netDelta = openCount - (closeCount - leadingCloses);
                level = Math.max(0, currentLevel + netDelta);
            }

            while (out.length > 0 && out[out.length - 1] === '') out.pop();
            return out.join('\n');
        }

        function formatCssCode(code, indentStr = '  ') {
            // Раскрываем компактные однострочные правила вида ".card { color: red; padding: 10px; }"
            let prepared = String(code || '').replace(/\r\n/g, '\n');
            prepared = prepared
                .replace(/\{\s*([^\n{}]+?)\s*\}/g, (_, inner) => {
                    const decls = inner.split(';').map(s => s.trim()).filter(Boolean);
                    if (decls.length <= 1) {
                        return decls.length === 1 ? `{\n  ${decls[0]};\n}` : '{}';
                    }
                    return `{\n  ${decls.join(';\n  ')};\n}`;
                });

            return formatBraceLanguage(prepared, indentStr);
        }

        function formatJsCode(code, indentStr = '  ') {
            return formatBraceLanguage(code, indentStr);
        }

        function formatHtmlCode(code, indentStr = '  ') {
            let source = String(code || '').replace(/\r\n/g, '\n').trim();
            if (!source) return '';

            // Извлекаем содержимое <style> и <script>, чтобы отформатировать их по правилам CSS и JS
            const embeddedBlocks = [];
            const styleRe = new RegExp('(' + LT + 'style\\b[^>]*' + GT + ')([\\s\\S]*?)(' + TAG.styleClose + ')', 'gi');
            const scriptRe = new RegExp('(' + LT + 'script\\b[^>]*' + GT + ')([\\s\\S]*?)(' + TAG.scriptClose + ')', 'gi');

            source = source.replace(styleRe, (_, openT, body, closeT) => {
                const token = `__FMT_EMBED_${embeddedBlocks.length}__`;
                embeddedBlocks.push({ openT: openT.trim(), body: formatCssCode(body, indentStr), closeT: closeT.trim() });
                return `\n${token}\n`;
            });

            source = source.replace(scriptRe, (_, openT, body, closeT) => {
                const token = `__FMT_EMBED_${embeddedBlocks.length}__`;
                embeddedBlocks.push({ openT: openT.trim(), body: formatJsCode(body, indentStr), closeT: closeT.trim() });
                return `\n${token}\n`;
            });

            // Разделяем слипшиеся теги "><" на отдельные строки, сохраняя однострочные пары "<tag>текст</tag>"
            source = source.replace(/>\s*</g, '>\n<');

            const rawLines = source.split('\n');
            const out = [];
            let level = 0;

            for (let rawLine of rawLines) {
                const trimmed = rawLine.trim();
                if (!trimmed) continue;

                // Вставка отформатированного <style> / <script> блока ступеньками
                const embedMatch = trimmed.match(/^__FMT_EMBED_(\d+)__$/);
                if (embedMatch) {
                    const block = embeddedBlocks[Number(embedMatch[1])];
                    const baseIndent = indentStr.repeat(level);
                    out.push(baseIndent + block.openT);
                    if (block.body) {
                        const innerIndent = indentStr.repeat(level + 1);
                        block.body.split('\n').forEach(bLine => {
                            out.push(bLine ? innerIndent + bLine : '');
                        });
                    }
                    out.push(baseIndent + block.closeT);
                    continue;
                }

                // Закрывающий тег в начале строки: </div...>
                const isClosingTag = /^<\s*\//.test(trimmed);
                if (isClosingTag) {
                    level = Math.max(0, level - 1);
                }

                out.push(indentStr.repeat(level) + trimmed);

                // Определяем, нужно ли увеличить отступ для следующих строк
                if (!isClosingTag && trimmed.startsWith('<') && !trimmed.startsWith('<!--') && !trimmed.startsWith('<!')) {
                    const tagMatch = trimmed.match(/^<\s*([a-zA-Z0-9-]+)/);
                    const tagName = tagMatch ? tagMatch[1].toLowerCase() : '';
                    const isSelfClosing = /\/\s*>$/.test(trimmed) || HTML_VOID_TAGS.has(tagName);
                    const hasClosingOnSameLine = tagName && new RegExp(`<\\/\\s*${tagName}\\s*>\\s*$`, 'i').test(trimmed);

                    if (!isSelfClosing && !hasClosingOnSameLine && trimmed.endsWith('>')) {
                        level += 1;
                    }
                }
            }

            return out.join('\n');
        }

        function formatCurrentCode() {
            const tab = state.activeTab;
            if (tab === 'preview') return;

            const raw = textarea.value;
            if (!raw.trim()) {
                showToast('Нечего форматировать', 'ℹ️');
                return;
            }

            let formatted = raw;
            if (tab === 'css') formatted = formatCssCode(raw, '  ');
            else if (tab === 'js') formatted = formatJsCode(raw, '  ');
            else formatted = formatHtmlCode(raw, '  ');

            if (formatted === raw) {
                showToast('Код уже выровнен', '✨');
                return;
            }

            applyTextMutation(formatted, 0, 0);
            textarea.scrollTop = 0;
            syncEditorScroll();
            showToast('Код выровнен', '✨');
        }

        /* =========================================================
           ПАРСЕР ЕДИНОГО HTML <-> РАЗДЕЛЬНЫЕ ВКЛАДКИ (НА DOMParser)
           ========================================================= */
        function parseSingleHtmlToSplit(rawHtml) {
            const text = String(rawHtml || '');
            if (!text.trim()) {
                return { html: '', css: '', js: '' };
            }

            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');

                const cssParts = [];
                doc.querySelectorAll('style').forEach((styleEl) => {
                    const cssText = (styleEl.textContent || '').trim();
                    if (cssText) cssParts.push(cssText);
                    styleEl.remove();
                });

                const jsParts = [];
                const externalTags = [];

                doc.querySelectorAll('script').forEach((scriptEl) => {
                    if (scriptEl.getAttribute('src')) {
                        externalTags.push(scriptEl.outerHTML.trim());
                        scriptEl.remove();
                        return;
                    }
                    const jsText = (scriptEl.textContent || '').trim();
                    if (jsText) jsParts.push(jsText);
                    scriptEl.remove();
                });

                if (doc.head) {
                    doc.head.querySelectorAll('link[rel="stylesheet"]').forEach((linkEl) => {
                        externalTags.push(linkEl.outerHTML.trim());
                    });
                }

                const bodyHtml = doc.body ? doc.body.innerHTML.trim() : '';
                const uniqueExternals = Array.from(new Set(externalTags));
                const finalHtml = uniqueExternals.length
                    ? `${uniqueExternals.join('\n')}\n\n${bodyHtml}`.trim()
                    : bodyHtml;

                return {
                    html: finalHtml,
                    css: cssParts.join('\n\n'),
                    js: jsParts.join('\n\n')
                };
            } catch (_) {
                return { html: text, css: '', js: '' };
            }
        }

        function buildSingleHtmlFromSplit(html, css, js) {
            const h = String(html || '');
            const c = String(css || '').trim();
            const j = String(js || '').trim();

            const hasDoc = /<!doctype|<html|<head|<body/i.test(h);
            if (hasDoc) {
                let out = h;
                if (c) {
                    const styleBlock = `${TAG.styleOpen}\n${c}\n${TAG.styleClose}`;
                    const headCloseIdx = out.search(/<\/head>/i);
                    if (headCloseIdx !== -1) {
                        out = out.slice(0, headCloseIdx) + styleBlock + '\n' + out.slice(headCloseIdx);
                    } else {
                        out = `${styleBlock}\n${out}`;
                    }
                }
                if (j) {
                    const scriptBlock = `${TAG.scriptOpen}\n${j}\n${TAG.scriptClose}`;
                    const bodyCloseIdx = out.search(/<\/body>/i);
                    if (bodyCloseIdx !== -1) {
                        out = out.slice(0, bodyCloseIdx) + scriptBlock + '\n' + out.slice(bodyCloseIdx);
                    } else {
                        out = `${out}\n${scriptBlock}`;
                    }
                }
                return out;
            }

            return [
                '<!DOCTYPE html>',
                '<html lang="ru">',
                '<head>',
                '<meta charset="UTF-8">',
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                `<title>${escapeHtml(state.projectName)}</title>`,
                c ? `${TAG.styleOpen}\n${c}\n${TAG.styleClose}` : '',
                TAG.headClose,
                '<body>',
                h,
                j ? `${TAG.scriptOpen}\n${j}\n${TAG.scriptClose}` : '',
                TAG.bodyClose,
                TAG.htmlClose
            ].filter(Boolean).join('\n');
        }

        /* =========================================================
           ИСТОРИЯ ИЗМЕНЕНИЙ (UNDO / REDO)
           ========================================================= */
        function seedInitialHistory() {
            ['html', 'css', 'js', 'single'].forEach(tab => {
                historyStacks[tab] = {
                    undo: [{ value: state.code[tab] || '', selStart: 0, selEnd: 0 }],
                    redo: []
                };
            });
            updateUndoRedoButtons();
        }

        function recordHistorySnapshot(tab, value, selStart = 0, selEnd = 0) {
            if (!historyStacks[tab]) historyStacks[tab] = { undo: [], redo: [] };
            const stack = historyStacks[tab].undo;
            const last = stack[stack.length - 1];
            if (last && last.value === value) return;
            stack.push({ value, selStart, selEnd });
            if (stack.length > 80) stack.shift();
            historyStacks[tab].redo = [];
            updateUndoRedoButtons();
        }

        function undoEditor() {
            const tab = state.activeTab;
            if (tab === 'preview' || !historyStacks[tab]) return;
            const stack = historyStacks[tab];
            if (stack.undo.length <= 1) return;

            const currentEntry = stack.undo.pop();
            stack.redo.push(currentEntry);
            const prevEntry = stack.undo[stack.undo.length - 1];
            applyHistoryEntry(tab, prevEntry);
        }

        function redoEditor() {
            const tab = state.activeTab;
            if (tab === 'preview' || !historyStacks[tab]) return;
            const stack = historyStacks[tab];
            if (stack.redo.length === 0) return;

            const nextEntry = stack.redo.pop();
            stack.undo.push(nextEntry);
            applyHistoryEntry(tab, nextEntry);
        }

        function applyHistoryEntry(tab, entry) {
            state.code[tab] = entry.value;
            textarea.value = entry.value;
            textarea.focus();
            textarea.selectionStart = entry.selStart ?? entry.value.length;
            textarea.selectionEnd = entry.selEnd ?? entry.value.length;
            state.unsaved = true;
            updateUnsavedIndicator();
            highlightCode();
            updateLineNumbers();
            updateUndoRedoButtons();
            saveSession();
        }

        function updateUndoRedoButtons() {
            const undoBtn = document.getElementById('btn-undo');
            const redoBtn = document.getElementById('btn-redo');
            const tab = state.activeTab;
            if (!undoBtn || !redoBtn) return;

            if (tab === 'preview' || !historyStacks[tab]) {
                undoBtn.disabled = true;
                redoBtn.disabled = true;
                return;
            }
            undoBtn.disabled = historyStacks[tab].undo.length <= 1;
            redoBtn.disabled = historyStacks[tab].redo.length === 0;
        }

        /* =========================================================
           АВТОЗАКРЫТИЕ ПАРНЫХ СИМВОЛОВ
           ========================================================= */
        function applyTextMutation(newValue, newSelStart, newSelEnd = newSelStart) {
            const tab = state.activeTab;
            if (tab === 'preview') return;
            textarea.value = newValue;
            textarea.focus();
            textarea.selectionStart = newSelStart;
            textarea.selectionEnd = newSelEnd;
            state.code[tab] = newValue;
            state.unsaved = true;
            updateUnsavedIndicator();
            highlightCode();
            updateLineNumbers();
            recordHistorySnapshot(tab, newValue, newSelStart, newSelEnd);
            saveSession();
        }

        function handlePairTyping(typedChar) {
            if (state.activeTab === 'preview') return false;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const val = textarea.value;
            const nextChar = val.charAt(end);

            if (start === end && CLOSING_PAIRS.has(typedChar) && nextChar === typedChar) {
                if (typedChar === '"' || typedChar === "'") {
                    const prevChar = val.charAt(start - 1);
                    if (prevChar !== '\\') {
                        applyTextMutation(val, start + 1, start + 1);
                        return true;
                    }
                } else {
                    applyTextMutation(val, start + 1, start + 1);
                    return true;
                }
            }

            if (AUTO_PAIRS[typedChar]) {
                const closing = AUTO_PAIRS[typedChar];
                const selected = val.substring(start, end);
                const updated = val.substring(0, start) + typedChar + selected + closing + val.substring(end);
                const cursorPos = start + 1 + selected.length;
                applyTextMutation(updated, cursorPos, cursorPos);
                return true;
            }

            return false;
        }

        /* =========================================================
           ПОДСВЕТКА СИНТАКСИСА (БЕЗ ПРЯМЫХ ЗАКРЫВАЮЩИХ ТЕГОВ В JS)
           ========================================================= */
        function tokenizeJs(code) {
            const pattern = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^\\`])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|super|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|true|false|null|undefined)\b|\b(\d+(?:\.\d+)?)\b|\b([a-zA-Z_$][\w$]*)(?=\s*\()|([{}()[\];.,:=+\-*/<>!&|?]+)/g;
            let result = '';
            let lastIndex = 0;
            let match;

            while ((match = pattern.exec(code)) !== null) {
                if (match.index > lastIndex) result += escapeHtml(code.slice(lastIndex, match.index));
                const full = escapeHtml(match[0]);
                if (match[1]) result += `<span class="tok-comment">${full}</span>`;
                else if (match[2]) result += `<span class="tok-string">${full}</span>`;
                else if (match[3]) result += `<span class="tok-keyword">${full}</span>`;
                else if (match[4]) result += `<span class="tok-number">${full}</span>`;
                else if (match[5]) result += `<span class="tok-func">${full}</span>`;
                else if (match[6]) result += `<span class="tok-punct">${full}</span>`;
                else result += full;
                lastIndex = pattern.lastIndex;
            }
            if (lastIndex < code.length) result += escapeHtml(code.slice(lastIndex));
            return result;
        }

        function tokenizeCss(code) {
            const pattern = /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@[a-zA-Z-]+)|([a-zA-Z-]+)(?=\s*:)|(#(?:[0-9a-fA-F]{3,8})\b|\b\d+(?:\.\d+)?(?:px|rem|em|vh|vw|%|s|ms|deg|fr)?\b)|([{}();:,])/g;
            let result = '';
            let lastIndex = 0;
            let match;

            while ((match = pattern.exec(code)) !== null) {
                if (match.index > lastIndex) result += escapeHtml(code.slice(lastIndex, match.index));
                const full = escapeHtml(match[0]);
                if (match[1]) result += `<span class="tok-comment">${full}</span>`;
                else if (match[2]) result += `<span class="tok-string">${full}</span>`;
                else if (match[3]) result += `<span class="tok-keyword">${full}</span>`;
                else if (match[4]) result += `<span class="tok-prop">${full}</span>`;
                else if (match[5]) result += `<span class="tok-number">${full}</span>`;
                else if (match[6]) result += `<span class="tok-punct">${full}</span>`;
                else result += full;
                lastIndex = pattern.lastIndex;
            }
            if (lastIndex < code.length) result += escapeHtml(code.slice(lastIndex));
            return result;
        }

        function highlightHtmlTag(rawTag) {
            const tagPattern = /^(<\/?)([a-zA-Z0-9-]+)([\s\S]*?)(\/?>)$/;
            const m = rawTag.match(tagPattern);
            if (!m) return escapeHtml(rawTag);

            const openBracket = `<span class="tok-punct">${escapeHtml(m[1])}</span>`;
            const tagName = `<span class="tok-tag">${escapeHtml(m[2])}</span>`;
            const closeBracket = `<span class="tok-punct">${escapeHtml(m[4])}</span>`;
            const attrsRaw = m[3];

            const attrPattern = /([a-zA-Z_:][\w:.-]*)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g;
            let attrsHtml = '';
            let lastIdx = 0;
            let am;

            while ((am = attrPattern.exec(attrsRaw)) !== null) {
                if (am.index > lastIdx) attrsHtml += escapeHtml(attrsRaw.slice(lastIdx, am.index));
                attrsHtml += `<span class="tok-attr">${escapeHtml(am[1])}</span>`;
                if (am[2]) attrsHtml += `<span class="tok-punct">${escapeHtml(am[2])}</span>`;
                if (am[3]) attrsHtml += `<span class="tok-string">${escapeHtml(am[3])}</span>`;
                lastIdx = attrPattern.lastIndex;
            }
            if (lastIdx < attrsRaw.length) attrsHtml += escapeHtml(attrsRaw.slice(lastIdx));

            return openBracket + tagName + attrsHtml + closeBracket;
        }

        function tokenizeHtml(code) {
            const styleRe = new RegExp('(' + LT + 'style\\b[^>]*' + GT + ')([\\s\\S]*?)(' + TAG.styleClose + ')', 'gi');
            const scriptRe = new RegExp('(' + LT + 'script\\b[^>]*' + GT + ')([\\s\\S]*?)(' + TAG.scriptClose + ')', 'gi');
            const genericRe = new RegExp('(<!--[\\s\\S]*?-->)|(<!DOCTYPE[^>]*' + GT + ')|(' + LT + '\\/?[a-zA-Z0-9-]+(?:\\s+[^' + LT + GT + ']*?)?\\/?' + GT + ')', 'gi');

            const blocks = [];
            let withPlaceholders = code.replace(styleRe, (_, openT, body, closeT) => {
                const token = `__CODEDOCK_BLOCK_${blocks.length}__`;
                blocks.push(highlightHtmlTag(openT) + tokenizeCss(body) + highlightHtmlTag(closeT));
                return token;
            });

            withPlaceholders = withPlaceholders.replace(scriptRe, (_, openT, body, closeT) => {
                const token = `__CODEDOCK_BLOCK_${blocks.length}__`;
                blocks.push(highlightHtmlTag(openT) + tokenizeJs(body) + highlightHtmlTag(closeT));
                return token;
            });

            let result = '';
            let lastIndex = 0;
            let match;
            while ((match = genericRe.exec(withPlaceholders)) !== null) {
                if (match.index > lastIndex) result += escapeHtml(withPlaceholders.slice(lastIndex, match.index));
                if (match[1]) result += `<span class="tok-comment">${escapeHtml(match[1])}</span>`;
                else if (match[2]) result += `<span class="tok-keyword">${escapeHtml(match[2])}</span>`;
                else if (match[3]) result += highlightHtmlTag(match[3]);
                lastIndex = genericRe.lastIndex;
            }
            if (lastIndex < withPlaceholders.length) result += escapeHtml(withPlaceholders.slice(lastIndex));

            return result.replace(/__CODEDOCK_BLOCK_(\d+)__/g, (_, idx) => blocks[Number(idx)] || '');
        }

        function highlightCode() {
            const raw = textarea.value;
            let html = '';
            if (state.activeTab === 'css') html = tokenizeCss(raw);
            else if (state.activeTab === 'js') html = tokenizeJs(raw);
            else html = tokenizeHtml(raw);

            if (raw.endsWith('\n')) html += ' ';
            highlightContent.innerHTML = html;
            syncEditorScroll();
        }

        function syncEditorScroll() {
            codePre.scrollTop = textarea.scrollTop;
            codePre.scrollLeft = textarea.scrollLeft;
            lineNumbers.scrollTop = textarea.scrollTop;
        }

        /* =========================================================
           КОНСОЛЬ ПРЕДПРОСМОТРА
           ========================================================= */
        function setupConsoleBridge() {
            window.addEventListener('message', (event) => {
                const data = event.data;
                if (!data || data.source !== 'codedock-preview-console') return;
                appendConsoleEntry(data.level || 'log', data.args || []);
            });
        }

        function formatConsoleArg(arg) {
            if (arg === null) return 'null';
            if (arg === undefined) return 'undefined';
            if (typeof arg === 'object') {
                try { return JSON.stringify(arg, null, 2); }
                catch (_) { return String(arg); }
            }
            return String(arg);
        }

        function appendConsoleEntry(level, args) {
            const logsContainer = document.getElementById('console-logs');
            const emptyPlaceholder = logsContainer.querySelector('.console-empty');
            if (emptyPlaceholder) emptyPlaceholder.remove();

            state.consoleCount += 1;
            if (level === 'error') state.consoleErrorCount += 1;
            updateConsoleBadge();

            const now = new Date();
            const timeStr = now.toTimeString().slice(0, 8);
            const row = document.createElement('div');
            row.className = `console-row ${level}`;
            const formattedText = args.map(formatConsoleArg).join(' ');
            row.innerHTML = `<span class="console-meta">[${timeStr}] ${level.toUpperCase()}:</span>${escapeHtml(formattedText)}`;
            logsContainer.appendChild(row);
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }

        function clearConsoleLogs() {
            state.consoleCount = 0;
            state.consoleErrorCount = 0;
            updateConsoleBadge();
            document.getElementById('console-logs').innerHTML = '<div class="console-empty">Консоль очищена.</div>';
        }

        function updateConsoleBadge() {
            const badge = document.getElementById('console-count-badge');
            const toggleBtn = document.getElementById('btn-toggle-console');
            badge.textContent = String(state.consoleCount);
            toggleBtn.classList.toggle('has-errors', state.consoleErrorCount > 0);
            toggleBtn.classList.toggle('open', state.consoleOpen);
        }

        function toggleConsolePanel(forceState) {
            const panel = document.getElementById('preview-console-panel');
            state.consoleOpen = typeof forceState === 'boolean' ? forceState : !state.consoleOpen;
            panel.classList.toggle('hidden', !state.consoleOpen);
            updateConsoleBadge();
        }

        function buildConsoleHookScript() {
            const body = [
                '(function() {',
                '  if (window.__codedockHooked) return;',
                '  window.__codedockHooked = true;',
                '  function sendToParent(level, args) {',
                '    try {',
                '      var safeArgs = Array.prototype.slice.call(args).map(function(item) {',
                '        if (item instanceof Error) return item.name + ": " + item.message;',
                '        if (typeof item === "function") return item.toString();',
                '        if (typeof item === "object" && item !== null) {',
                '          try { return JSON.parse(JSON.stringify(item)); }',
                '          catch (_) { return String(item); }',
                '        }',
                '        return item;',
                '      });',
                '      parent.postMessage({ source: "codedock-preview-console", level: level, args: safeArgs }, "*");',
                '    } catch (_) {}',
                '  }',
                '  ["log", "info", "warn", "error"].forEach(function(method) {',
                '    var orig = console[method];',
                '    console[method] = function() {',
                '      sendToParent(method, arguments);',
                '      if (typeof orig === "function") orig.apply(console, arguments);',
                '    };',
                '  });',
                '  window.addEventListener("error", function(e) {',
                '    sendToParent("error", [e.message + (e.lineno ? " (строка " + e.lineno + ")" : "")]);',
                '  });',
                '  window.addEventListener("unhandledrejection", function(e) {',
                '    var reason = e.reason && e.reason.message ? e.reason.message : e.reason;',
                '    sendToParent("error", ["Unhandled Promise: " + reason]);',
                '  });',
                '})();'
            ].join('\n');
            return `${TAG.scriptOpen}\n${body}\n${TAG.scriptClose}`;
        }

        function injectConsoleIntoHtml(htmlStr) {
            const hook = buildConsoleHookScript();
            const headRegex = new RegExp(LT + 'head[^>]*' + GT, 'i');
            if (headRegex.test(htmlStr)) {
                return htmlStr.replace(headRegex, (matched) => `${matched}\n${hook}`);
            }
            return `${hook}\n${htmlStr}`;
        }

        /* =========================================================
           ТЕМА И БАЗОВЫЕ ДАННЫЕ
           ========================================================= */
        function initTheme() {
            let saved = 'dark';
            try { saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark'; } catch(e){}
            applyTheme(saved, false);
        }

        function applyTheme(themeName, notify = false) {
            state.theme = themeName;
            const sun = document.getElementById('theme-icon-sun');
            const moon = document.getElementById('theme-icon-moon');
            if (themeName === 'light') {
                document.documentElement.classList.add('light');
                sun.classList.add('hidden');
                moon.classList.remove('hidden');
            } else {
                document.documentElement.classList.remove('light');
                moon.classList.add('hidden');
                sun.classList.remove('hidden');
            }
            try { localStorage.setItem(STORAGE_KEYS.THEME, themeName); } catch(e){}
            if(notify) showToast(themeName === 'light' ? 'Светлая тема' : 'Тёмная тема', themeName === 'light' ? '☀️' : '🌙');
        }

        function toggleAppTheme() {
            applyTheme(state.theme === 'dark' ? 'light' : 'dark', true);
        }

        function initDefaultData() {
            if (!localStorage.getItem(STORAGE_KEYS.FOLDERS)) {
                localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify([{ id: 'folder-main', name: 'Мои сайты' }]));
            }
            if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
                const defProj = {
                    id: 'proj-1',
                    name: 'Мой проект',
                    folderId: 'folder-main',
                    mode: 'split',
                    code: { html: STARTER_TEMPLATES[0].html, css: STARTER_TEMPLATES[0].css, js: STARTER_TEMPLATES[0].js, single: '' }
                };
                localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([defProj]));
                state.currentProjectId = 'proj-1';
            }
        }

        function getSavedFolders() { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.FOLDERS) || '[]'); } catch{ return []; } }
        function getSavedProjects() { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS) || '[]'); } catch{ return []; } }
        function getCustomSnippets() { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_SNIPPETS) || '[]'); } catch{ return []; } }

        function getAllSnippets() {
            return [...getCustomSnippets(), ...BUILTIN_SNIPPETS];
        }

        function saveSession() {
            try {
                localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
                    mode: state.mode,
                    activeTab: state.activeTab,
                    lastCodeTab: state.lastCodeTab,
                    currentProjectId: state.currentProjectId,
                    projectName: state.projectName,
                    code: state.code
                }));
            } catch(e){}
        }

        function loadSession() {
            try {
                const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
                if (!raw) return;
                const saved = JSON.parse(raw);
                if (saved && saved.code) {
                    state.mode = saved.mode || 'split';
                    state.activeTab = saved.activeTab || 'html';
                    state.lastCodeTab = saved.lastCodeTab || (state.activeTab !== 'preview' ? state.activeTab : (state.mode === 'single' ? 'single' : 'html'));
                    state.currentProjectId = saved.currentProjectId || null;
                    state.projectName = saved.projectName || 'Мой проект';
                    state.code = saved.code;
                }
            } catch(e){}
        }

        function setupEditorListeners() {
            textarea.addEventListener('beforeinput', (e) => {
                if (state.activeTab === 'preview') return;
                if (e.inputType === 'insertText' && e.data && e.data.length === 1) {
                    if (handlePairTyping(e.data)) {
                        e.preventDefault();
                    }
                }
            });

            textarea.addEventListener('keydown', (e) => {
                if (state.activeTab === 'preview') return;
                if ((e.metaKey || e.ctrlKey) && !e.altKey) {
                    const k = e.key.toLowerCase();
                    if (k === 'z' && !e.shiftKey) {
                        e.preventDefault();
                        undoEditor();
                        return;
                    }
                    if ((k === 'y') || (k === 'z' && e.shiftKey)) {
                        e.preventDefault();
                        redoEditor();
                        return;
                    }
                }
                if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
                    if (handlePairTyping(e.key)) {
                        e.preventDefault();
                    }
                }
            });

            textarea.addEventListener('input', () => {
                if (state.activeTab !== 'preview') {
                    state.code[state.activeTab] = textarea.value;
                    state.unsaved = true;
                    updateUnsavedIndicator();
                    debouncedHighlight();
                    updateLineNumbers();
                    recordHistorySnapshot(state.activeTab, textarea.value, textarea.selectionStart, textarea.selectionEnd);
                    saveSession();
                }
            });

            textarea.addEventListener('scroll', syncEditorScroll);
        }

        function updateLineNumbers() {
            const count = Math.max(1, textarea.value.split('\n').length);
            let html = '';
            for(let i=1; i<=count; i++) html += i + '<br>';
            lineNumbers.innerHTML = html;
            syncEditorScroll();
        }

        function insertQuickSymbol(sym) {
            if (state.activeTab === 'preview') return;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const val = textarea.value;
            const updated = val.substring(0, start) + sym + val.substring(end);
            const nextPos = start + sym.length;
            applyTextMutation(updated, nextPos, nextPos);
        }

        function copyCurrentCode() {
            const textToCopy = state.activeTab === 'preview' 
              ? (state.mode === 'single' ? state.code.single : buildSingleHtmlFromSplit(state.code.html, state.code.css, state.code.js))
              : textarea.value;
        
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Скопировано в буфер обмена');
            }).catch(() => {
                textarea.value = textToCopy;
                textarea.select();
                document.execCommand('copy');
                showToast('Скопировано');
            });
        }

        function confirmClearCode() {
            openConfirm('Очистить?', 'Весь код вкладки будет стёрт.', () => {
                applyTextMutation('', 0, 0);
                showToast('Очищено');
            });
        }

        function updateUI() {
            document.getElementById('header-project-name').textContent = state.projectName;
            updateUnsavedIndicator();
            renderUnifiedBottomDock();
            if (state.activeTab !== 'preview') {
                textarea.value = state.code[state.activeTab] || '';
                highlightCode();
                updateLineNumbers();
            }
            updateUndoRedoButtons();
        }

        function updateUnsavedIndicator() {
            const dot = document.getElementById('unsaved-dot');
            if (state.unsaved) dot.classList.remove('hidden');
            else dot.classList.add('hidden');
        }

        function renderUnifiedBottomDock() {
            const dock = document.getElementById('bottom-dock-nav');
            const modeLabel = document.getElementById('mode-toggle-label');
            const isPreview = state.activeTab === 'preview';

            let fileButtonsHtml = '';

            if (state.mode === 'split') {
                modeLabel.textContent = 'Единый файл';
                const files = [
                    { id: 'html', title: 'HTML', sub: 'Разметка', dot: '#f97316', color: '#fb923c' },
                    { id: 'css',  title: 'CSS',  sub: 'Стили',    dot: '#0ea5e9', color: '#38bdf8' },
                    { id: 'js',   title: 'JS',   sub: 'Логика',   dot: '#eab308', color: '#facc15' }
                ];
                fileButtonsHtml = files.map(f => {
                    const isActive = state.activeTab === f.id;
                    return `
                        <button type="button" onclick="switchTab('${f.id}')" class="dock-btn ${isActive ? 'active-file' : ''}">
                            <div class="dock-title-row" style="color: ${isActive ? 'var(--text-strong)' : f.color};">
                                <span class="dock-dot" style="background: ${f.dot};"></span>
                                <span>${f.title}</span>
                            </div>
                            <span class="dock-sub">${f.sub}</span>
                        </button>
                    `;
                }).join('');
            } else {
                modeLabel.textContent = 'Раздельные файлы';
                const isActive = state.activeTab === 'single';
                fileButtonsHtml = `
                    <button type="button" onclick="switchTab('single')" class="dock-btn ${isActive ? 'active-single' : ''}">
                        <div class="dock-title-row" style="color: var(--purple);">
                            <span class="dock-dot" style="background: var(--purple);"></span>
                            <span>INDEX</span>
                        </div>
                        <span class="dock-sub">Единый</span>
                    </button>
                `;
            }

            const runBtnTitle = isPreview ? '✎ Код' : '▶ Запуск';
            const runBtnSub = isPreview ? 'Редактор' : 'Просмотр';

            dock.innerHTML = `
                ${fileButtonsHtml}
                <button type="button" id="dock-btn-preview" onclick="handleRunOrCodeButton()" class="dock-btn ${isPreview ? 'active-preview' : ''}">
                    <div class="dock-title-row" style="color: ${isPreview ? 'var(--blue-text)' : 'var(--emerald-text)'};">
                        <span>${runBtnTitle}</span>
                    </div>
                    <span class="dock-sub">${runBtnSub}</span>
                </button>
                <button type="button" onclick="openProjectsModal()" class="dock-btn">
                    <div class="dock-title-row" style="color: var(--amber);">
                        <span>📁 Проекты</span>
                    </div>
                    <span class="dock-sub">Менеджер</span>
                </button>
            `;
        }

        function getTargetCodeTab() {
            if (state.mode === 'single') return 'single';
            if (state.lastCodeTab && ['html', 'css', 'js'].includes(state.lastCodeTab)) {
                return state.lastCodeTab;
            }
            return 'html';
        }

        function handleRunOrCodeButton() {
            if (state.activeTab === 'preview') {
                switchTab(getTargetCodeTab());
            } else {
                switchTab('preview');
            }
        }

        function switchTab(tab) {
            if (state.activeTab !== 'preview' && tab === 'preview') {
                state.lastCodeTab = state.activeTab;
            }
            state.activeTab = tab;
            if (tab !== 'preview') {
                state.lastCodeTab = tab;
            }

            const viewEditor = document.getElementById('view-editor');
            const viewPreview = document.getElementById('view-preview');

            if (tab === 'preview') {
                viewEditor.classList.add('hidden');
                viewPreview.classList.remove('hidden');
                runPreview();
            } else {
                viewPreview.classList.add('hidden');
                viewEditor.classList.remove('hidden');
                textarea.value = state.code[tab] || '';
                highlightCode();
                updateLineNumbers();
            }
            updateUndoRedoButtons();
            renderUnifiedBottomDock();
            saveSession();
        }

        function toggleEditorMode() {
            const currentTab = state.activeTab !== 'preview' ? state.activeTab : (state.mode === 'single' ? 'single' : 'html');
            const currentCursor = textarea.selectionStart;
        
            if (state.mode === 'split') {
                if (state.activeTab !== 'preview') state.code[currentTab] = textarea.value;
                state.code.single = buildSingleHtmlFromSplit(state.code.html, state.code.css, state.code.js);
                recordHistorySnapshot('single', state.code.single, currentCursor, currentCursor);
                state.mode = 'single';
                state.lastCodeTab = 'single';
                switchTab('single');
                showToast('Собрано в единый HTML');
            } else {
                const rawSingle = state.activeTab === 'single' ? textarea.value : state.code.single;
                state.code.single = rawSingle;
                const parsed = parseSingleHtmlToSplit(rawSingle);
                state.code.html = parsed.html;
                state.code.css = parsed.css;
                state.code.js = parsed.js;
                
                recordHistorySnapshot('html', state.code.html, state.code.html.length, state.code.html.length);
                recordHistorySnapshot('css', state.code.css, state.code.css.length, state.code.css.length);
                recordHistorySnapshot('js', state.code.js, state.code.js.length, state.code.js.length);
                
                state.mode = 'split';
                state.lastCodeTab = 'html';
                switchTab('html');
                showToast('Разделено на HTML, CSS и JS');
            }
        }

        function runPreview() {
            if (state.activeTab !== 'preview' && state.activeTab !== 'single') state.code[state.activeTab] = textarea.value;
            else if (state.activeTab === 'single') state.code.single = textarea.value;

            state.consoleCount = 0;
            state.consoleErrorCount = 0;
            updateConsoleBadge();
            document.getElementById('console-logs').innerHTML = '';

            const rawHtml = state.mode === 'single'
                ? state.code.single
                : buildSingleHtmlFromSplit(state.code.html, state.code.css, state.code.js);
            document.getElementById('preview-iframe').srcdoc = injectConsoleIntoHtml(rawHtml);
        }

        function setPreviewViewport(mode) {
            ['auto', 'mobile', 'tablet'].forEach(m => document.getElementById(`vp-btn-${m}`).className = 'vp-btn');
            document.getElementById(`vp-btn-${mode}`).className = 'vp-btn active';
            updateConsoleBadge();
            const wrapper = document.getElementById('preview-frame-wrapper');
            if (mode === 'mobile') { wrapper.style.width = '375px'; wrapper.style.height = '667px'; }
            else if (mode === 'tablet') { wrapper.style.width = '768px'; wrapper.style.height = '1024px'; }
            else { wrapper.style.width = '100%'; wrapper.style.height = '100%'; }
        }

        function saveCurrentProjectFast() {
            if (state.activeTab !== 'preview') state.code[state.activeTab] = textarea.value;
            const projects = getSavedProjects();
            if (state.currentProjectId) {
                const p = projects.find(item => item.id === state.currentProjectId);
                if (p) { p.code = { ...state.code }; p.mode = state.mode; }
            }
            saveProjectsList(projects);
            state.unsaved = false;
            updateUnsavedIndicator();
            showToast('Проект сохранён!');
        }

        /* =========================================================
           CDN И СНИППЕТЫ
           ========================================================= */
        function openCdnSnippetsModal(tab = 'cdn') {
            csCurrentTab = tab;
            csCurrentFilter = 'all';
            document.getElementById('cs-search-input').value = '';
            updateCsTabUI();
            renderCsContent();
            document.getElementById('modal-cdn-snippets').classList.remove('hidden');
        }

        function switchCsTab(tab) {
            csCurrentTab = tab;
            csCurrentFilter = 'all';
            document.getElementById('cs-search-input').value = '';
            updateCsTabUI();
            renderCsContent();
        }

        function updateCsTabUI() {
            const btnCdn = document.getElementById('cs-tab-btn-cdn');
            const btnSnippets = document.getElementById('cs-tab-btn-snippets');
            const filterRow = document.getElementById('cs-filter-chips');
            const addSnippetBtn = document.getElementById('btn-open-new-snippet');

            if (csCurrentTab === 'cdn') {
                btnCdn.className = 'cs-tab-btn active';
                btnSnippets.className = 'cs-tab-btn';
                filterRow.innerHTML = '';
                addSnippetBtn.classList.add('hidden');
            } else {
                btnCdn.className = 'cs-tab-btn';
                btnSnippets.className = 'cs-tab-btn active';
                addSnippetBtn.classList.remove('hidden');
                filterRow.innerHTML = `
                    <button type="button" onclick="setCsFilter('all')" class="cs-filter-chip ${csCurrentFilter==='all'?'active':''}">Все</button>
                    <button type="button" onclick="setCsFilter('custom')" class="cs-filter-chip ${csCurrentFilter==='custom'?'active':''}">Мои</button>
                    <button type="button" onclick="setCsFilter('html')" class="cs-filter-chip ${csCurrentFilter==='html'?'active':''}">HTML</button>
                    <button type="button" onclick="setCsFilter('css')" class="cs-filter-chip ${csCurrentFilter==='css'?'active':''}">CSS</button>
                    <button type="button" onclick="setCsFilter('js')" class="cs-filter-chip ${csCurrentFilter==='js'?'active':''}">JS</button>
                `;
            }
        }

        function setCsFilter(filter) {
            csCurrentFilter = filter;
            updateCsTabUI();
            renderCsContent();
        }

        function filterCsContent() {
            renderCsContent();
        }

        function renderCsContent() {
            const container = document.getElementById('cs-list-container');
            const query = document.getElementById('cs-search-input').value.toLowerCase().trim();

            if (csCurrentTab === 'cdn') {
                const filtered = CDN_CATALOG.filter(c => c.name.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query));
                container.innerHTML = filtered.map(c => `
                    <div class="item-box">
                        <div>
                            <div style="font-weight:600; font-size:12px; color:var(--text-strong);">${escapeHtml(c.name)}</div>
                            <div style="font-size:11px; color:var(--text-muted);">${escapeHtml(c.desc)}</div>
                        </div>
                        <button type="button" onclick="insertCdnByIndex(${CDN_CATALOG.indexOf(c)})" class="btn-primary" style="padding:6px 12px; font-size:11px;">Подключить</button>
                    </div>
                `).join('') || '<div style="text-align:center; color:var(--text-dim); padding:20px; font-size:12px;">Ничего не найдено</div>';
            } else {
                const allSnippets = getAllSnippets();
                const filtered = allSnippets.filter(s => {
                    const matchLang = csCurrentFilter === 'all'
                        || (csCurrentFilter === 'custom' && s.custom)
                        || s.lang === csCurrentFilter;
                    const matchQuery = s.title.toLowerCase().includes(query) || s.code.toLowerCase().includes(query);
                    return matchLang && matchQuery;
                });

                container.innerHTML = filtered.map(s => `
                    <div class="snippet-box">
                        <div style="display:flex; justify-content:space-between; align-items:center; gap: 8px;">
                            <div style="min-width:0;">
                                <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--blue-text);">[${s.lang}] ${escapeHtml(s.title)}</span>
                                ${s.custom ? '<span class="custom-badge">Мой</span>' : ''}
                            </div>
                            <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
                                ${s.custom ? `<button type="button" onclick="deleteCustomSnippet('${s.id}')" style="color:var(--rose-text); font-size:11px; padding:4px 6px;">Удалить</button>` : ''}
                                <button type="button" onclick="insertSnippetById('${s.id}')" class="btn-secondary" style="padding:4px 10px; font-size:11px;">Вставить</button>
                            </div>
                        </div>
                        <pre class="snippet-code-preview"><code>${escapeHtml(s.code)}</code></pre>
                    </div>
                `).join('') || '<div style="text-align:center; color:var(--text-dim); padding:20px; font-size:12px;">Сниппеты не найдены</div>';
            }
        }

        function openCreateSnippetModal() {
            const titleInput = document.getElementById('snippet-title-input');
            const langSelect = document.getElementById('snippet-lang-select');
            const codeInput = document.getElementById('snippet-code-input');

            titleInput.value = '';
            if (state.activeTab === 'css' || state.activeTab === 'js' || state.activeTab === 'html') {
                langSelect.value = state.activeTab;
            } else {
                langSelect.value = 'html';
            }

            const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd).trim();
            codeInput.value = selectedText || '';

            document.getElementById('modal-create-snippet').classList.remove('hidden');
            setTimeout(() => titleInput.focus(), 50);
        }

        function saveCustomSnippet() {
            const title = document.getElementById('snippet-title-input').value.trim();
            const lang = document.getElementById('snippet-lang-select').value;
            const code = document.getElementById('snippet-code-input').value;

            if (!title) {
                showToast('Введите название сниппета', '⚠️');
                return;
            }
            if (!code.trim()) {
                showToast('Код сниппета пуст', '⚠️');
                return;
            }

            const list = getCustomSnippets();
            list.unshift({ id: 'custom-' + Date.now(), lang, title, code, custom: true });
            saveCustomSnippetsList(list);

            closeModal('modal-create-snippet');
            renderCsContent();
            showToast('Сниппет сохранён');
        }

        function deleteCustomSnippet(id) {
            openConfirm('Удалить сниппет?', 'Сниппет будет удалён из вашей коллекции.', () => {
                const updated = getCustomSnippets().filter(s => s.id !== id);
                saveCustomSnippetsList(updated);
                renderCsContent();
                showToast('Сниппет удалён');
            });
        }

        function insertCdnByIndex(idx) {
            const pkg = CDN_CATALOG[idx];
            const tab = state.mode === 'single' ? 'single' : 'html';
            let html = state.code[tab] || '';
            if (!html.includes(pkg.tag)) {
                const headCloseIdx = html.search(/<\/head>/i);
                html = headCloseIdx !== -1
                    ? html.slice(0, headCloseIdx) + `  ${pkg.tag}\n` + html.slice(headCloseIdx)
                    : pkg.tag + '\n' + html;
                state.code[tab] = html;
                state.unsaved = true;
                recordHistorySnapshot(tab, html, 0, 0);
            }
            closeModal('modal-cdn-snippets');
            switchTab(tab);
            updateUI();
            showToast('CDN подключен');
        }

        function insertSnippetById(id) {
            const s = getAllSnippets().find(item => item.id === id);
            if (!s) return;
            closeModal('modal-cdn-snippets');
            if (state.activeTab === 'preview') {
                switchTab(state.mode === 'single' ? 'single' : s.lang);
            }
            insertQuickSymbol('\n' + s.code + '\n');
            showToast('Сниппет вставлен');
        }

        // TEMPLATES MODAL
        function openTemplatesModal() {
            document.getElementById('templates-list').innerHTML = STARTER_TEMPLATES.map(t => `
                <div class="item-box">
                    <div><div style="font-weight:700; font-size:12px;">${escapeHtml(t.name)}</div><div style="font-size:11px; color:var(--text-muted);">${escapeHtml(t.desc)}</div></div>
                    <button type="button" onclick="applyTpl('${t.id}')" class="btn-primary" style="padding:6px 12px; font-size:11px;">Выбрать</button>
                </div>
            `).join('');
            document.getElementById('modal-templates').classList.remove('hidden');
        }

        function applyTpl(id) {
            const t = STARTER_TEMPLATES.find(item => item.id === id);
            if (!t) return;
            closeModal('modal-templates');
            openConfirm('Загрузить шаблон?', 'Текущий несохранённый код будет заменён.', () => {
                state.mode = 'split';
                state.code = { html: t.html, css: t.css, js: t.js, single: '' };
                state.unsaved = true;
                seedInitialHistory();
                switchTab('html');
                updateUI();
                showToast('Шаблон загружен');
            });
        }

        // PROJECTS & FOLDERS
        function openProjectsModal() {
            renderProjectsTree();
            document.getElementById('modal-projects').classList.remove('hidden');
        }

        function renderProjectsTree() {
            const container = document.getElementById('projects-tree-container');
            const folders = getSavedFolders();
            const projects = getSavedProjects();
            let html = '';

            folders.forEach(f => {
                const fProj = projects.filter(p => p.folderId === f.id);
                html += `
                    <div class="folder-card">
                        <div class="folder-head">
                            <div class="folder-toggle">📁 <b>${escapeHtml(f.name)}</b></div>
                            <button type="button" onclick="deleteFolder('${f.id}')" style="color:var(--rose-text); font-size:11px;">Удалить</button>
                        </div>
                        <div class="folder-projects">
                            ${fProj.map(p => `
                                <div class="project-tree-item ${p.id === state.currentProjectId ? 'current' : ''}">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <b style="font-size:12px; cursor:pointer;" onclick="loadProject('${p.id}')">${escapeHtml(p.name)}</b>
                                        <button type="button" onclick="deleteProject('${p.id}')" style="color:var(--rose-text); font-size:10px;">Удалить</button>
                                    </div>
                                    <div class="file-chips-row">
                                        <span class="file-chip ${p.id === state.currentProjectId && state.activeTab==='html'?'active':''}" onclick="loadProjectFile('${p.id}', 'html')">html</span>
                                        <span class="file-chip ${p.id === state.currentProjectId && state.activeTab==='css'?'active':''}" onclick="loadProjectFile('${p.id}', 'css')">css</span>
                                        <span class="file-chip ${p.id === state.currentProjectId && state.activeTab==='js'?'active':''}" onclick="loadProjectFile('${p.id}', 'js')">js</span>
                                    </div>
                                </div>
                            `).join('') || '<div style="font-size:11px; color:var(--text-dim);">Нет проектов в папке</div>'}
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        function openCreateProjectModal() {
            const select = document.getElementById('new-project-folder');
            const folders = getSavedFolders();
            select.innerHTML = folders.map(f => `<option value="${f.id}">${escapeHtml(f.name)}</option>`).join('');
            document.getElementById('new-project-name').value = '';
            document.getElementById('modal-create-project').classList.remove('hidden');
        }

        function confirmCreateProject() {
            const name = document.getElementById('new-project-name').value.trim() || 'Новый проект';
            const folderId = document.getElementById('new-project-folder').value;
            const projects = getSavedProjects();
            const newId = 'proj-' + Date.now();

            projects.unshift({
                id: newId,
                name: name,
                folderId: folderId,
                mode: 'split',
                code: { html: '<h1>' + name + '</h1>', css: 'body {\n  background: #0f172a;\n  color: #ffffff;\n}', js: "console.log('OK');", single: '' }
            });

            saveProjectsList(projects);
            loadProject(newId);
            closeModal('modal-create-project');
            closeModal('modal-projects');
            showToast('Проект создан');
        }

        function loadProject(id) {
            const projects = getSavedProjects();
            const p = projects.find(item => item.id === id);
            if (!p) return;
            state.currentProjectId = p.id;
            state.projectName = p.name;
            state.mode = p.mode || 'split';
            state.code = p.code;
            state.unsaved = false;
            seedInitialHistory();
            closeModal('modal-projects');
            switchTab(state.mode === 'single' ? 'single' : 'html');
            updateUI();
            showToast(`Открыт: ${p.name}`);
        }

        function loadProjectFile(id, fileTab) {
            loadProject(id);
            switchTab(fileTab);
        }

        function deleteProject(id) {
            openConfirm('Удалить проект?', 'Действие необратимо.', () => {
                saveProjectsList(getSavedProjects().filter(p => p.id !== id));
                renderProjectsTree();
                showToast('Удалено');
            });
        }

        function openCreateFolderModal() {
            document.getElementById('folder-name-input').value = '';
            document.getElementById('modal-folder').classList.remove('hidden');
        }

        function submitFolderModal() {
            const name = document.getElementById('folder-name-input').value.trim();
            if (!name) return;
            const folders = getSavedFolders();
            folders.push({ id: 'folder-' + Date.now(), name });
            saveFoldersList(folders);
            closeModal('modal-folder');
            renderProjectsTree();
            showToast('Папка создана');
        }

        function deleteFolder(id) {
            openConfirm('Удалить папку?', 'Проекты внутри будут перенесены в корень.', () => {
                saveFoldersList(getSavedFolders().filter(f => f.id !== id));
                renderProjectsTree();
                showToast('Папка удалена');
            });
        }

        // IO EXPORT / IMPORT
        function downloadBlob(blob, name) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = name;
            document.body.appendChild(a); a.click(); a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        function exportCurrentProjectSingleHtml() {
            if (state.activeTab !== 'preview') state.code[state.activeTab] = textarea.value;
            const full = state.mode === 'single'
                ? state.code.single
                : buildSingleHtmlFromSplit(state.code.html, state.code.css, state.code.js);
            downloadBlob(new Blob([full], {type: 'text/html;charset=utf-8'}), `${state.projectName}.html`);
            showToast('Экспортировано');
        }

        function exportFullBackupJson() {
            const payload = {
                folders: getSavedFolders(),
                projects: getSavedProjects(),
                customSnippets: getCustomSnippets()
            };
            downloadBlob(new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'}), 'codedock_backup.json');
            showToast('Бэкап сохранён');
        }

        async function handleFileImport(e) {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
                const text = await file.text();
                if (file.name.endsWith('.json')) {
                    const data = JSON.parse(text);
                    if(data.folders) saveFoldersList(data.folders);
                    if(data.projects) saveProjectsList(data.projects);
                    if(Array.isArray(data.customSnippets)) saveCustomSnippetsList(data.customSnippets);
                    renderProjectsTree();
                    showToast('Импортировано');
                } else {
                    const parsed = parseSingleHtmlToSplit(text);
                    state.currentProjectId = null;
                    state.projectName = file.name.replace(/\.[^/.]+$/, '');
                    state.mode = 'split';
                    state.code = { html: parsed.html, css: parsed.css, js: parsed.js, single: text };
                    state.unsaved = true;
                    seedInitialHistory();
                    closeModal('modal-projects');
                    switchTab('html');
                    updateUI();
                    showToast('Файл открыт и разделён');
                }
            } catch(err) { showToast('Ошибка', '⚠️'); }
            e.target.value = '';
        }

        function closeModal(id) { document.getElementById(id).classList.add('hidden'); }
        function openConfirm(title, msg, onYes) {
            document.getElementById('confirm-title').textContent = title;
            document.getElementById('confirm-message').textContent = msg;
            document.getElementById('confirm-yes-btn').onclick = () => { closeModal('modal-confirm'); onYes(); };
            document.getElementById('modal-confirm').classList.remove('hidden');
        }
        let toastTimer;
        function showToast(text, icon = '✓') {
            const toast = document.getElementById('toast');
            document.getElementById('toast-text').textContent = text;
            document.getElementById('toast-icon').textContent = icon;
            toast.classList.add('visible');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
        }
        function escapeHtml(str) {
            return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
        function safeSave(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (e) {
                console.error('LocalStorage full or disabled', e);
                showToast('Ошибка: недостаточно памяти в браузере', '⚠️');
            }
        }

        function saveFoldersList(list) { safeSave(STORAGE_KEYS.FOLDERS, list); }
        function saveProjectsList(list) { safeSave(STORAGE_KEYS.PROJECTS, list); }
        function saveCustomSnippetsList(list) { safeSave(STORAGE_KEYS.CUSTOM_SNIPPETS, list); }

        let highlightTimeout;
        function debouncedHighlight() {
            clearTimeout(highlightTimeout);
            highlightTimeout = setTimeout(highlightCode, 50);
        }

        textarea.addEventListener('focus', () => {
            setTimeout(() => {
                textarea.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }, 300);
        });