const html = require('nanohtml')
const searchWithYourKeyboard = require('.')

const $main = html`
<main>
  <input 
    type="text" 
    name="query"
    id="search"
    autofocus="on"
    autocapitalize="off"
    autocomplete="off"
    autocorrect="off"
  >

  <div id="hits">
    <div class="hit"><a href="http://en.wikipedia.org/wiki/apples">apples</a></div>
    <div class="hit" style="display:none"><a href="http://en.wikipedia.org/wiki/bananas">bananas</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
    <div class="hit"><a href="http://en.wikipedia.org/wiki/carrots">carrots</a></div>
  </div>
</main>
`

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild($main)
  searchWithYourKeyboard('#search', '.hit')
})
