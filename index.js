(function() {
	"use strict";

	function codeHighlightLinenums(code, opts) {
		opts = opts || {};
		var hljs = opts.hljs,
			lang = opts.lang,
			start = opts.start || 0;
		// prevent errors by hljs
		code = code || '';
		if(lang && /:/.test(lang)) {
			start = +lang.split(/:/)[1];
			lang = lang.split(/:/)[0];
		} else {
			start = +start;
		}

		if(lang && hljs) {
			code = hljs.highlight(lang, code).value;
		}

		if(start) {
			// move all closing spans to the previous line
			code = code.replace(/([\r\n]\s*)(<\/span>)/ig, '$2$1');

			// replace spans with line-wraps inside them
			var wrappedSpan = /(<span[^>]*>)([^<]*?[\r\n][^<]*)(<\/span>)/ig;
			code = code.replace(wrappedSpan, function(m, start, contents, end) {
				return start + contents.replace(/(\r\n|\r|\n)/g, end + '$1' + start) + end;
			});

			code = code.split(/\r\n|\r|\n/);
			var max = (start + code.length).toString().length;

			code = code
				.map(function(line, i) {
					return '<span class="line width-' + max + '" start="' + (start + i) + '">' + line + '</span>';
				})
				.join('\n');
		}

		return code;
	}

	(function(root, factory) {
		if(typeof define === 'function' && define.amd) {
			// AMD. Register as an anonymous module.
			define(factory)
		} else if(typeof exports === 'object') {
			/**
			 * Node. Does not work with strict CommonJS, but
			 * only CommonJS-like enviroments that support module.exports,
			 * like Node.
			 */
			module.exports = factory();
		} else {
			// Browser globals (root is window)
			root.codeHighlightLinenums = factory();
		}
	}(this, function() {
		/**
		 * Just return a value to define the module export.
		 * This example returns an object, but the module
		 * can return a function as the exported value.
		 */
		return codeHighlightLinenums;
	}))

})();