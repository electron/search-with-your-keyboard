# search-with-your-keyboard 

> Add keyboard navigation to your existing client-side search interface.

This module is designed to make [Algolia InstantSearch] results navigable
with a keyboard. It's not Algolia-specific though, and should work with any 
search setup so long as it includes a search input and a list of 
client-side-updated results.

## Behavior

Key | Action
--- | ------
<kbd>/</kbd> | Focuses the search input.
<kbd>esc</kbd> | Focuses the search input and clears it.
<kbd>down</kbd> | Adds an `active` class to the next result.
<kbd>up</kbd> | Adds an `active` class to the previous result. If already on the first search result, the search input is focused.
<kbd>enter</kbd> | Sets `window.location` to the `href` of the first `<a>` tag in the current `.active` result, if present.

## Installation

```sh
npm install search-with-your-keyboard
```

## Usage

```js
const searchWithYourKeyboard = require('search-with-your-keyboard')

searchWithYourKeyboard('#search-input', '.ais-hits--item')  
```

## Styles

You should specify styles for the `.active` class on your results,
to make the currently active result visible to the user. You may want this
to be the same style as `:hover`ing on a result:

```css
.ais-hits--item:hover, .ais-hits--item.active {
  background-color: #F0F0F0;
}
```

## API

### `searchWithYourKeyboard(inputSelector, hitsSelector)`

Arguments:

- `inputSelector` String (required) - A CSS selector used to find the search input, e.g. `#search-input`
- `hitsSelector` String (required) - A CSS selector used to find all results, e.g. `.ais-hits--item`

## Tests

```sh
npm install
npm test
```

## License

MIT

[Algolia InstantSearch]: https://github.com/algolia/instantsearch.js