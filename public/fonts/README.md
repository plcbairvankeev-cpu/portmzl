# Шрифты

Self-hosted woff2, без внешних запросов к Google Fonts (раздел 2 ТЗ).
Источник — пакеты **Fontsource** (зеркало Google Fonts), все три гарнитуры под **SIL Open Font License**:
`@fontsource/onest`, `@fontsource/golos-text`, `@fontsource/jetbrains-mono` (в devDependencies).

Файлы — подмножества **cyrillic** и **latin**, подключены в `src/styles/tokens.css`
через `@font-face` с `unicode-range` (браузер тянет только нужный subset).

| Файл | Гарнитура | Начертание | Subset |
|---|---|---|---|
| `onest-cyrillic-800-normal.woff2` | Onest | 800 | cyrillic |
| `onest-latin-800-normal.woff2` | Onest | 800 | latin |
| `golos-text-cyrillic-400-normal.woff2` | Golos Text | 400 | cyrillic |
| `golos-text-latin-400-normal.woff2` | Golos Text | 400 | latin |
| `golos-text-cyrillic-500-normal.woff2` | Golos Text | 500 | cyrillic |
| `golos-text-latin-500-normal.woff2` | Golos Text | 500 | latin |
| `jetbrains-mono-cyrillic-500-normal.woff2` | JetBrains Mono | 500 | cyrillic |
| `jetbrains-mono-latin-500-normal.woff2` | JetBrains Mono | 500 | latin |

Обновление: `npm i -D @fontsource/<имя>@latest`, затем скопировать нужные
`node_modules/@fontsource/<имя>/files/*-{cyrillic,latin}-<вес>-normal.woff2` сюда.
Диапазоны `unicode-range` в `tokens.css` — стандартные Google Fonts.
Расширенные подмножества (cyrillic-ext, latin-ext) не подключены: на сайте нет их символов.
Редкие знаки (≥, ◉, CJK) берутся из `system-ui` fallback — это нормально.
