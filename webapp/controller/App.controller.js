sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"webapp/model/formatter",
		"webapp/model/formatter1",
		"jquery.sap.global",
		"sap/ui/core/Fragment",
		"sap/ui/model/Sorter"

	],
	function(Controller, MessageToast, Filter, FilterOperator, formatter, formatter1, jQuery, Fragment, Sorter) {

		return Controller.extend("webapp.controller.App", {
			formatter: formatter,
			formatter1: formatter1,
			OnShowHello: function() {
				var oBundle = this.getView().getModel("i18n").getResourceBundle();
				var sRecipient =
					this.getView().getModel("helloPanel").getProperty("/recipient/name");
				var sMsg = oBundle.getText("helloMsg", [sRecipient]);
				// show message
				MessageToast.show(sMsg);

			},
			onFilterProducts: function(oEvent) {
				var mParams = oEvent.getParameters();
				var aFilter = [];
				var sQuery = oEvent.getParameter("query");
				if (sQuery) {
					aFilter.push(new Filter("MpId", FilterOperator.Contains, sQuery));
				}
				var oList = this.getView().byId("myTable");
				var oBinding = oList.getBinding("items");
				oBinding.filter(aFilter);

			},
			handleViewSettingsDialogButtonPressed: function(oEvent) {
				if (!this._oDialog) {
					this._oDialog = sap.ui.xmlfragment("webapp.view.Dialog", this);
				}
				// toggle compact style
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
				this._oDialog.open();
			},
			handleConfirm: function(oEvent) {

				var oView = this.getView();
				var oTable = oView.byId("myTable");

				var mParams = oEvent.getParameters();
				var oBinding = oTable.getBinding("items");

				// apply sorter to binding
				// (grouping comes before sorting)
				var aSorters = [];
				if (mParams.groupItem) {
					var sPath = mParams.groupItem.getKey();
					var bDescending = mParams.groupDescending;
					var vGroup = this.mGroupFunctions[sPath];
					aSorters.push(new Sorter(sPath, bDescending, vGroup));
				}
				var sPath1 = mParams.sortItem.getKey();
				var bDescending1 = mParams.sortDescending;
				aSorters.push(new Sorter(sPath1, bDescending1));
				oBinding.sort(aSorters);

				// apply filters to binding
				var aFilters = [];
				jQuery.each(mParams.filterItems, function(i, oItem) {
					var aSplit = oItem.getKey().split("___");
					var sPath = aSplit[0];
					var sOperator = aSplit[1];
					var sValue1 = aSplit[2];
					var sValue2 = aSplit[3];
					var oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
					aFilters.push(oFilter);
				});
				oBinding.filter(aFilters);

				// update filter bar
				oView.byId("vsdFilterBar").setVisible(aFilters.length > 0);
				oView.byId("vsdFilterLabel").setText(mParams.filterString);
			}

		});
	});