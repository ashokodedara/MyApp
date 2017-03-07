sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast"
	],
	function(Controller, MessageToast) {

		Controller.extend("webapp.controller.App", {
			OnShowHello: function() {
				var oBundle = this.getView().getModel("i18n").getResourceBundle();
				var sRecipient =
					this.getView().getModel("helloPanel").getProperty("/recipient/name");
				var sMsg = oBundle.getText("helloMsg", [sRecipient]);
				// show message
				MessageToast.show(sMsg);

			}
		});
	});