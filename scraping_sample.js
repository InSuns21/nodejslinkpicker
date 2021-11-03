"use strict";

const { asyncLinkgetter } = require("./scraping");

// node、スクリプト名、の次に有効なコマンドライン引数が入る
if (process.argv.length <= 2) {
  console.log("Usage: node scraping.js [URL]");
  process.exit(1);
}

// HTMLコンテンツを読み込む
const argUrl = process.argv[2];

(async () => {
  const { links, sorted } = await asyncLinkgetter(argUrl);
  console.log(`url contains ${links.length} links`);
  for (let i = 0; i < links.length; ++i) {
    const host = sorted.hosts[i];
    if (sorted.hostLinks[host]) {
      console.log(`  ${host}, ${sorted.hostLinks[host].length} links`);
      for (let j = 0; j < sorted.hostLinks[host].length; ++j) {
        console.log(`    ${sorted.hostLinks[host][j].href}`);
      }
      console.log(``);
    }
  }
})();
