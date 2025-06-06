sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/m/MessageToast"
],
/**
* @param {typeof sap.ui.core.mvc.Controller} Controller
*/ 
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("com.training.bootcampcss.controller.MainView", {
        onInit() {
        },

    onAddItem: function (){
     // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
     // var sMsg = oTextBundle.getText("addButtonMsg");
     // this.fnDisplayMsg(sMsg);
     // Instantiate the fragment

        // create dialog lazily
        if (!this.oDialog) {
            // By using loadFragment, we are adding the fragment as a dependent to the View
            // By doing so, we can use the functions inside the view's controller
            this.oDialog = this.loadFragment({
                name: "com.training.bootcampcss.fragment.ProductDialog"
            });
        } 
        this.oDialog.then(function(oDialog) {
            oDialog.open();
        });
  },

  fnDisplayMsg: function (sMsg){
      MessageToast.show(sMsg);
  },
  
  onCloseDialog: function (){
    this.getView().byId("idProductDialog").close();
},


  onChangeMOP: function (oEvent) {
      var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
      var oMobileLabel = this.getView().byId("idLblPhone");
      var oMobileInput = this.getView().byId("idInputPhone");
      var ccLabel = this.getView().byId("idLblCreditCard");
      var ccInput = this.getView().byId("idInputCreditCard");

      if (sSelectedKey === "GCASH"){
          var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
          var sMsg = oTextBundle.getText("GCashlb5");
          this.fnDisplayMsg(sMsg);
          // show the mobile field
          oMobileLabel.setVisible(true);
          oMobileInput.setVisible(true);
          ccLabel.setVisible(false);
          ccInput.setVisible(false);
      } else if (sSelectedKey === "CC"){
          var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
          var sMsg = oTextBundle.getText("CreditCardlb4");
          this.fnDisplayMsg(sMsg);
          // show the mobile field
          ccLabel.setVisible(true);
          ccInput.setVisible(true);
          oMobileLabel.setVisible(false);
          oMobileInput.setVisible(false);
      }
      else {
          var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
          var sMsg = oTextBundle.getText("CashonDeliverylb3");
          this.fnDisplayMsg(sMsg);
          oMobileLabel.setVisible(false);
          oMobileInput.setVisible(false);
          ccLabel.setVisible(false);
          ccInput.setVisible(false);
      }
  },

  onPressCheckout: function (){
      //var oInputFNameValue = this.getView().byId("idInptFName").getValue();
      //var oInputLNameValue = this.getView().byId("idInptLName").getValue();

      // Check if first name is blank
     // if (oInputFNameValue === "" ){ 
     //     var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
     //     var sMsg = oTextBundle.getText("RequiredFieldblank");
     //     this.fnDisplayMsg(sMsg);
    //  } else if (oInputFNameValue === "" && oInputLNameValue === ""){ 
     //   var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
      //  var sMsg = oTextBundle.getText("RequiredFieldblank");
     //   this.fnDisplayMsg(sMsg);
    //  }
    var oInputFName = this.getView().byId("idInptFName");
    var oInputLName = this.getView().byId("idInptLName");
    var oInputFNameValue = oInputFName.getValue();
    var oInputLNameValue = oInputLName.getValue();
    var oRouter = this.getOwnerComponent().getRouter();

    // Check if first name and last name is blank
    if (oInputFNameValue === "" || oInputLNameValue === ""){
       
// set value state to Error
        oInputFName.setValueState("Error");
        oInputLName.setValueState("Error");
    } else {
        oInputFName.setValueState("None");
        oInputLName.setValueState("None");

        //Navigate to review page passing first
        oRouter.navTo("RouteReviewPage", {
            firstName: oInputFNameValue
        });
    }
  },
  onPressClear: function () {
    // IDs of all the input fields to clear
    var aInputIds = [
        "idInptFName",        // First Name
        "idInptLName",        // Last Name
        "idInputPhone",       // Phone
        "idInputCreditCard",   // Credit Card
        "idSelMOP"             // MOP
    ];

    // Loop through and clear them
    aInputIds.forEach(function (sId) {
        var oInput = this.getView().byId(sId);
        if (oInput) {
            oInput.setValue("");
            oInput.setValueState("None"); // clear any error highlighting
        }
    }.bind(this));

    // Optional: Show confirmation
    this.fnDisplayMsg("All fields have been cleared.");
    },

 });
});