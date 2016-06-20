# Code Highlight Linenums

Wraps `highlight.js`-highlighted code with the ability to render line numbers via CSS.

This library makes it easy to take code output from `highlight.js` and render it with line numbers.

## Usage

_Note: I'm using ES6 code here to make it easier to see multiline strings._

```js
const codeHighlightLinenums = require('code-highlight-linenums');

let code = 
`class Foo
{
    Foo() {

    }
    static int bar = 2;
}`;

let formattedCode = codeHighlightLinenums(code, {
        hljs: window.hljs, // pass in your copy of highlight.js
        lang: 'java', // pass in the language (optional: uses highlight's auto feature if not provided)
        start: 1, // pass in the starting line number, this is required!
    });
    
// <span class="line width-1" start="1"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span></span></span>
// <span class="line width-1" start="2">{</span>
// ...
```

## Example LessCSS

Once you have your formatted code, you can use CSS similar to the following to render the line numbers (note, this assumes you wrapped the code in markdown-like `<pre><code></code></pre>` tags:

```less
pre > code {
    .line {
        @pre-padding: 9px;
        display: inline-block;
        position: relative;
        padding-left: ~"calc(2ch + " @pre-padding * 2 ~")";
        // fixes empty lines
        &:after { content: ' '; }
        &:before {
            box-sizing: content-box;
            display: inline-block;
            position: absolute;
            top: 0;
            bottom: 0;
            text-align: right;
            width: 2ch;
            content: attr(start); // use the start attribute for the line number
            padding-right: @pre-padding;
            padding-left: @pre-padding;
            margin-left: ~"calc(-2ch + " -@pre-padding * 3 ~")";
            margin-right: @pre-padding;
            
            // Color of the line number
            color: fade(@pre-color, 50%);
            // background of the line number gutter
            background-color: darken(@pre-bg, 5%);
        }
        &:first-child:before {
            padding-top: @pre-padding;
            margin-top: -@pre-padding;
            border-top-left-radius: @border-radius-base;
        }
        &:last-child:before {
            padding-bottom: @pre-padding;
            margin-bottom: -@pre-padding;
            border-bottom-left-radius: @border-radius-base;
        }
        &.width-3 {
            padding-left: ~"calc(3ch + " @pre-padding * 2 ~")";
            &:before {
                width: 3ch;
                margin-left: ~"calc(-3ch + " -@pre-padding * 3 ~")";
            }
        }
        &.width-4 {
            padding-left: ~"calc(4ch + " @pre-padding * 2 ~")";
            &:before {
                width: 4ch;
                margin-left: ~"calc(-4ch + " -@pre-padding * 3 ~")";
            }
        }

        &.width-5 {
            padding-left: ~"calc(5ch + " @pre-padding * 2 ~")";
            &:before {
                width: 5ch;
                margin-left: ~"calc(-5ch + " -@pre-padding * 3 ~")";
            }
        }
        &.width-6 {
            padding-left: ~"calc(6ch + " @pre-padding * 2 ~")";
            &:before {
                width: 6ch;
                margin-left: ~"calc(-6ch + " -@pre-padding * 3 ~")";
            }
        }
    }
}
```


## LICENSE

[MIT License](http://en.wikipedia.org/wiki/MIT_License)