# search-with-your-keyboard

> Add keyboard navigation to your existing client-side search interface.

This module is designed to make [Algolia InstantSearch] results (aka "hits") navigable
with a keyboard. It's not Algolia-specific though, and should work with any
search setup so long as it includes a search input and a list of
client-side-updated results.

## Behavior

Key | Action
--- | ------
<kbd>/</kbd> | Focuses the search input.
<kbd>esc</kbd> | Focuses the search input and clears it.
<kbd>down</kbd> | Adds an `active` class to the next (visible) hit. Only applies when the search input contains a value.
<kbd>up</kbd> | Adds an `active` class to the previous (visible) hit. If already on the first search hit, the search input is focused. Only applies when the search input contains a value.
<kbd>enter</kbd> | Sets `window.location` to the `href` of the first `<a>` tag in the current `.active` hit, if present.
<kbd>cmdOrCtrl+Enter</kbd> | Opens the window in new tab and focus it.

## Installation

```sh
npm install search-with-your-keyboard
```

## Usage

The module exports a single function that expects two CSS selector strings as
arguments: one for the input element, one for the set of hit elements.

```js
const searchWithYourKeyboard = require('search-with-your-keyboard')

searchWithYourKeyboard('#search-input', '.ais-hits--item')
```

## Styles

You should specify styles for the `.active` class on your hits,
to make the currently active hit visible to the user. You may want this
to be the same style as `:hover`ing on a hit:

```css
.ais-hits--item:hover, .ais-hits--item.active {
  background-color: #F0F0F0;
}
```

## API

### `searchWithYourKeyboard(inputSelector, hitsSelector)`

Arguments:

- `inputSelector` String (required) - A CSS selector used to find the search input, e.g. `#search-input`
- `hitsSelector` String (required) - A CSS selector used to find all hits, e.g. `.ais-hits--item`

## Tests

```sh
npm install
npm test
```

## License

MIT

[Algolia InstantSearch]: https://github.com/algolia/instantsearch.js
