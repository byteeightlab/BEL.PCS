# PrefersColorScheme [BEL.PCS]
Элементарная библиотека, позволяющая определить установленную в системе цветовую схему (темная или светлая).

## Подключение

Скопируйте репозиторий в нужную папку, например в js.

```bash
git clone https://github.com/byteeightlab/BEL.PCS.git
```

Подключение **pcs.bel.min.js** необходимо выполнить как можно ближе к началу документа, в теге head, перед загрузкой стилей. Перед подключенным скриптом должен находиться перед meta tag color-scheme и supported-color-schemes, в случае отсутствия скрипт создаст их сам.

```html
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="light dark">
<script src="/js/BEL.PCS/pcs.bel.min.js" type="text/javascript"></script>
```

**color-scheme** - Цветовая схема по умолчанию, если указать **auto** будет установлена системная тема.
**supported-color-schemes** - Список доступных схем.

Для корневого элемента **html** будет установлен класс с именем темы и постфиксом **-theme**, например: **dark-theme**

## Методы

#### Выбранная схема

```js
prefersColorScheme.get() : String
// или
prefersColorScheme() : String
```

Возвращает действующую в данный момент схему. Возможные варианты можно получить выполнив **prefersColorScheme.supported()**

#### Системная схема

```js
prefersColorScheme.systemic() : String
```

Возвращает схему установленную в **prefers-color-scheme**. Возможны только два варианта: **light** или **dark**

#### Изменить схему

```js
prefersColorScheme.set( String theme, Bool write ) : undefined
// или
prefersColorScheme( String theme, Bool write ) : undefined
```
Изменяет цветовую схему на доступную из списка **prefersColorScheme.supported()**
- **theme** - Название схемы
- **write** - True - Запомнить выбор. По умолчанию: True

#### Удалить выбор

```js
prefersColorScheme.remove() : undefined
```

Сбрасывает выбор цветовой схемы, удаляет выбор из памяти, устанавливает системную схему. 

#### Переключить схему

```js
prefersColorScheme.toggle() : undefined
```

Переключает схемы из **prefersColorScheme.supported()** по очереди.

#### Доступные схемы

```js
prefersColorScheme.supported() : Array
```

Доступные схемы, по умолчанию **light** и **dark**, или значения перечисленные в meta tag **supported-color-schemes**, **light** и **dark** должны присудствовать в любом случает, по скольку являются стандартными для **prefers-color-scheme**.

## События

**prefersColorSchemeSet** - срабатывает при изменении темы.

```js
document.addEventListener( 'prefersColorSchemeChange', e => console.log( 'Theme: ' + prefersColorScheme() ) );
```