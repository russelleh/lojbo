"use strict";
exports.__esModule = true;
var words = require("./dictionary.json");
window.onload = function (event) {
    var input = document.getElementsByTagName("input")[0];
    var dictionary = document.getElementById("dictionary");
    input.focus();
    input.onkeyup = function (event) {
        if (input.value.length) {
            var term = input.value.toLowerCase();
            var format = term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            var pattern_1 = new RegExp("^" + format);
            var result = words.filter(function (word) {
                var meanings = word.meaning.split(" ").reduce(function (result, meaning) {
                    return result || pattern_1.test(meaning);
                }, false);
                var sources = word.sources.reduce(function (result, source) {
                    return result || pattern_1.test(source.source);
                }, false);
                return pattern_1.test(word.value) ||
                    meanings ||
                    sources;
            });
            dictionary.innerHTML = result.reduce(function (words, word) {
                var sources = word.sources.sort(function (source_a, source_b) {
                    if (source_a.language > source_b.language) {
                        return 1;
                    }
                    else if (source_a.language < source_b.language) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }).reduce(function (sources, source) {
                    return sources +
                        "<li class=\"" + source.language + "\">" +
                        source.source +
                        "</li>";
                }, "");
                var meaning = word.meaning.replace(/x([1-5])/g, "x<sub>$1</sub>");
                return words + "<div class=\"word\">" +
                    "<h4>" + word.value + "</h4>" +
                    "<ul>" + sources + "</ul>" +
                    "<div class=\"meaning\">" + meaning + "</div>" +
                    "</div>";
            }, "");
        }
        else {
            dictionary.innerHTML = "";
        }
    };
};
