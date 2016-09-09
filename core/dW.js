/*
 * dW plugin for teian
 * By Claudius Teodorescu
 * Licensed under LGPL.
 */

window.dW = {
	"countWords" : function() {
		$x.instance('data').load($x._fDocFromNode($('#teian-content *')[0].cloneNode(true)));
		var content = $x.transform($x._fDocFromNode($x.xpath("simpath:instance('data')//dw:docbody")[0]), $x.instance('word-count-xslt').root()).childNodes[0].textContent;
		content = content.replace(/:/g, ' ').replace(/-/g, ' ').replace(/\//g, ' ');
		//alert(content);
		alert(content.split(' ').length);
	},
	"utils" : {}
};

$(document).ready(function() {
		$x.instance('word-count-xslt').load($x.parseFromString("<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"/>"));
		$x.submission({
			"ref" : "simpath:instance('word-count-xslt')",
			"resource" : dW.utils.baseURI + "core/count-words.xml",
			"mode" : "synchronous",
			"method" : "get"
		});
});
//set the module's base URL
(function(sModuleName, sModuleNS) {
	window[sModuleNS ? sModuleNS : sModuleName].utils.baseURI = document.querySelector("script[src*='" + sModuleName + "']").src.match(new RegExp("^(.)*(/)?" + sModuleName + "/"))[0];
})('dW', 'dW');