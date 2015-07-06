/* jshint node: true */
/* global describe, it, beforeEach */
'use strict';

var codeHighlightLinenums = require('../'),
	should = require('should'),
	hljs = require('highlight.js'),
	fs = require('fs'),
	path = require('path'),
	mocha = require('mocha');

function loadFixture(name) {
	return fs.readFileSync(path.join(__dirname, 'fixtures', name)).toString();
}

describe('code-highlight-linenums', function() {

	var simpleInput,
		classInput;

	beforeEach(function() {
		simpleInput = loadFixture('simple.js');
		classInput = loadFixture('class-test.java');
	});

	it("should handle simple cases", function() {
		var output = codeHighlightLinenums(simpleInput),
			expected = loadFixture('simple.html');

		output.should.eql(expected);
	});

	it("should handle simple cases with linenumbers", function() {
		var output = codeHighlightLinenums(simpleInput, { start: 1 }),
			expected = loadFixture('simple-linenums.html');

		output.should.eql(expected);
	});

	it("should handle simple cases with linenumbers in lang", function() {
		var output = codeHighlightLinenums(simpleInput, { lang: 'javascript:1' }),
			expected = loadFixture('simple-linenums.html');

		output.should.eql(expected);
	});

	it("should handle cases with non-1 linenumbers", function() {
		var output = codeHighlightLinenums(simpleInput, { start: 10 }),
			expected = loadFixture('simple-linenums-10.html');

		output.should.eql(expected);
	});

	it("should handle cases with non-1 linenumbers in lang", function() {
		var output = codeHighlightLinenums(simpleInput, { lang: 'javascript:10' }),
			expected = loadFixture('simple-linenums-10.html');

		output.should.eql(expected);
	});

	it("should handle cases with linenumbers near character rollover", function() {
		var output = codeHighlightLinenums(simpleInput, { start: 5 }),
			expected = loadFixture('simple-linenums-5.html');

		output.should.eql(expected);
	});

	it("should handle hljs", function() {
		var output = codeHighlightLinenums(simpleInput, { lang: 'javascript', hljs: hljs }),
			expected = loadFixture('simple-hljs.html');

		output.should.eql(expected);
	});

	it("should handle hljs with linenums", function() {
		var output = codeHighlightLinenums(simpleInput, { lang: 'javascript:1', hljs: hljs }),
			expected = loadFixture('simple-hljs-linenums.html');

		output.should.eql(expected);
	});

	it("should handle complex hljs", function() {
		var output = codeHighlightLinenums(classInput, { lang: 'java', hljs: hljs }),
			expected = loadFixture('class-test.html');

		output.should.eql(expected);
	});

	it("should handle complex hljs with linenums", function() {
		var output = codeHighlightLinenums(classInput, { lang: 'java:1', hljs: hljs }),
			expected = loadFixture('class-test-linenums.html');

		output.should.eql(expected);
	});

	it("should handle clojure", function() {
		var output = codeHighlightLinenums(loadFixture('clojure-test.clj'), { lang: 'clojure', hljs: hljs }),
			expected = loadFixture('clojure-test.html');

		output.should.eql(expected);
	});

	it("should handle clojure with linenums", function() {
		var output = codeHighlightLinenums(loadFixture('clojure-test.clj'), { lang: 'clojure:1', hljs: hljs }),
			expected = loadFixture('clojure-test-linenums.html');

		output.should.eql(expected);
	});
});