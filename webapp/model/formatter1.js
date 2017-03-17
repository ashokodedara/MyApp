sap.ui.define(["webapp/model/formatter"], function(formatVal) {
	"use strict";
	return {
		getResult: function(value1,value2) {
           
           var val=value1-value2;
           var finalval=Math.abs(val);
           var delta=formatVal.delivery(finalval);
			return delta;
		}
	};
});