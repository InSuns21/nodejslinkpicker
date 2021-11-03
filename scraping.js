"use strict";

const { JSDOM } = require("jsdom");
const https = require("https");
const { URL } = require("url");
const _ = require("underscore");

/**
 * オリジンごとにグループ分けしたリンクを返します。
 * @param {array.<URL>} links
 * @returns
 */
const sortLinksByHost = function (links) {
  const hostLinks = _.groupBy(links, (link) => {
    return link.origin;
  });
  const hosts = Object.keys(hostLinks);
  return { hosts, hostLinks };
};

/**
 * 指定したURL内のaタグのリンクの一覧と、ホストごとにソートしたリンクを返します。
 * @param {string} argUrl
 * @return {Promise}
 */
const asyncLinkgetter = async (argUrl) => {
  return new Promise((resolve, reject) => {
    https
      .get(argUrl, (res) => {
        let html = "";
        if (res.statusCode < 200 || res.statusCode > 299) {
          reject(new Error(`Error Occured. statusCode: ${res.statusCode}`));
          return;
        }
        res.on("data", (line) => (html += line));
        res.on("end", () => {
          // HTMLコンテンツからwindowオブジェクトを作る
          const jsdom = new JSDOM(html);
          const window = jsdom.window;
          const $ = require("jquery")(window);
          var links = [];
          $("a").each((index, val) => {
            links.push(new URL($(val).attr("href"), argUrl));
          });

          links.sort(function (a, b) {
            if (a.href < b.href) return -1;
            else if (a.href > b.href) return 1;
            else return 0;
          });
          const sorted = sortLinksByHost(links);
          resolve({ links, sorted });
        });
      })
      .on("error", function (e) {
        reject(e);
      });
  });
};

module.exports.asyncLinkgetter = asyncLinkgetter;
module.exports.sortLinksByHost = sortLinksByHost;
