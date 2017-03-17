sap.ui.define([], function() {
	"use strict";
	return {
		delivery: function(value) {
           
            var numberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
				maxFractionDigits: 2
			});
			var text = "$"+numberFormat.format(value / 1000) + " K";

			return text;
		}
	};
});