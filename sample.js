"use strict";

const fs = require("fs");
const { JSDOM } = require("jsdom");
// domToHtml = require('jsdom/lib/browser/domtohtml');

// node、スクリプト名、の次に有効なコマンドライン引数が入る
if (process.argv.length <= 2) {
  console.log("Usage: node sample.js [FILE]");
  process.exit(1);
}

// HTMLコンテンツを読み込む
// コマンドライン起動前提なので同期I/Oで
const content = fs.readFileSync(process.argv[2], "utf8");

// HTMLコンテンツからwindowオブジェクトを作る
const jsdom = new JSDOM(content);
const document = jsdom.window.document;
const window = jsdom.window;
const $ = require("jquery")(window);
$("body").append("<div>More Hello World!!</div>");
// DOMツリーを出力する
if (document.doctype) {
  console.log(String(jsdom.serialize()));
}