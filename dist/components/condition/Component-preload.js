jQuery.sap.registerPreloadedModules({
	"version": "2.0",
	"name": "aklc/cm/components/condition/Component-preload",
	"modules": {
		"aklc/cm/components/condition/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e,t){\"use strict\";var o=e.extend(\"aklc.cm.components.condition.Component\",{metadata:{rootView:\"aklc.cm.components.condition.view.Main\",dependencies:{version:\"1.8\",libs:[\"sap.ui.core\"]},config:{resourceBundle:\"i18n/i18n.properties\"},properties:{componentData:\"\",eventBusSubscription:{name:\"eventBusSubscription\",type:\"object\",defaultValue:{channel:\"condition\",events:{contextChanged:\"contextChanged\",checkValid:\"checkValid\",submitChanges:\"submitChanges\"}}}}}});return o.prototype.init=function(){var t=this.getMetadata().getConfig(),o=new sap.ui.model.resource.ResourceModel({bundleUrl:[this.getRootPath(),t.resourceBundle].join(\"/\")});this.setModel(o,\"i18n\"),this._oViewModel=new sap.ui.model.json.JSONModel({CreateMode:!0,UpdateBtn_Visible:!1}),this.setModel(this._oViewModel,\"vm\");var n=this.getComponentData();n&&(this._oEventBus=n.eventBus,this.setModel(n.model)),e.prototype.init.apply(this)},o.prototype._setViewModelProperty=function(e,t){this._oViewModel.setProperty(\"/\"+e,t)},o.prototype.getRootPath=function(){return this.rootPath||(this.rootPath=jQuery.sap.getModulePath(\"aklc.cm.components.condition\")),this.rootPath},o});",
		"aklc/cm/components/condition/controller/Condition.controller.js": "sap.ui.define([\"aklc/cm/library/common/controller/BaseController\",\"aklc/cm/library/common/controller/Validation\"],function(n,t){\"use strict\";return n.extend(\"aklc.cm.components.condition.controller.Condition\",{onInit:function(n){var t=this.getView().byId(\"richtext\"),o=t.getButtonGroups()[0];o&&4===o.buttons.length&&o.buttons.pop()},handleConditionEdit:function(n){return!0===n},handleBeforeEditorInit:function(n){n.getSource().getBinding(\"value\").setBindingMode(\"OneWay\")}})});",
		"aklc/cm/components/condition/controller/Detail.controller.js": "sap.ui.define([\"aklc/cm/library/common/controller/BaseController\",\"sap/ui/commons/MessageToast\",\"aklc/cm/library/common/controller/Validation\"],function(e,t,o){\"use strict\";return e.extend(\"aklc.cm.components.condition.controller.Detail\",{_formFields:[],_sUpdate:\"UPDATE\",_oMainController:\"\",onInit:function(t){e.prototype.onInit.apply(this),this._oForm=this._oView.byId(\"oh\"),this.oComponent=this.getOwnerComponent(),this._oBundle=this.getComponent().getModel(\"i18n\").getResourceBundle(),this.oValidation=new o(this),this._oMessageManager=sap.ui.getCore().getMessageManager(),this._oMessageManager.registerObject(this.getView(),!0),this._oMonitorView=this.byId(\"MonitorView\"),this._oConditionView=this.byId(\"conditionView\"),this._oHelpView=this.byId(\"HelpView\"),this.oComplianceTemplate=this._oMonitorView.byId(\"complianceDrp\").clone();var i=this;this.getEventBus().subscribe(\"condition\",\"refreshconditionForm\",function(e,t,o){i._oForm.setBindingContext(o.context),o.action===i._sUpdate?i.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!0):o.action===i._sCreate&&i.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!0)}),this._oIcontabBar=this.getView().byId(\"itb1\")},onContextChanged:function(e,t,o){this._oMainController=o.controller,this._sLinkCond=null,this._sStepKey=this._oModel.getProperty(\"StepKey\",o.context);var i=[];i.push(new sap.ui.model.Filter(\"StepKey\",sap.ui.model.FilterOperator.EQ,this._sStepKey));var n=this.getView().byId(\"cancelId\"),s=this.getView().byId(\"helpId\"),a=this.getView().byId(\"monitorId\");this.getView().byId(\"cancelId\")._oImageControl?n._getImageControl().attachBrowserEvent(\"click\",this.handleIconTabBarSelect,this):n&&n.setIcon(\"sap-icon://cancel-maintenance\"),this.getView().byId(\"helpId\")._oImageControl?s._getImageControl().attachBrowserEvent(\"click\",this.handleIconTabBarSelect,this):s&&s.setIcon(\"sap-icon://sys-help\"),this.getView().byId(\"monitorId\")._oImageControl?a._getImageControl().attachBrowserEvent(\"click\",this.handleIconTabBarSelect,this):a&&a.setIcon(\"sap-icon://sys-monitor\"),this._oMonitorView.byId(\"compliance\").bindAggregation(\"items\",{path:\"/VH_ConditionStatus\",sorter:null,parameters:null,template:this.oComplianceTemplate,filters:i}),this._sLinkCond=\"/\"+this._oModel.createKey(\"ApplicationLinks\",{StepKey:this._sStepKey,Component:\"CONDHLINK\"});var r=function(e){e&&(this._sLinkCond=e.getObject().Url,this.oComponent._sLinkCond=this._sLinkCond)}.bind(this);this._oModel.createBindingContext(this._sLinkCond,null,null,r,!0)},VisibilityLink:function(e){return!0===e&&(this.getView().byId(\"linkCondition\").setText(\"Link to condition document\"),!0)},onLinkPress:function(){this._sLinkCond&&window.open(this._sLinkCond,\"Newwindow\",\"width=1400,height=900,resizable=1\")},onUpdate:function(e){var o=this,i=(e.getSource().getBindingContext(),e.getSource().getBindingContext().getObject()),n=o._oConditionView.byId(\"richtext\"),s=n.getBinding(\"value\"),a=n.getValue();i.ConditionText!==a&&(i.ConditionText=a);var r=this._oMonitorView.byId(\"final\").getSelectedKey(),l=this;if(\"true\"===r?i.Final=!0:\"false\"===r&&(i.Final=!1),-1===i.ConditionText.search(\"<HTML>\")){var d=i.ConditionText;i.ConditionText=\"<HTML><HEAD><TITLE>X</TITLE></HEAD><BODY>\"+d+\"</BODY></HTML>\",this._oModel.setProperty(\"ConditionText\",i.ConditionText,s.getContext())}if(-1===i.ConditionHelpText.search(\"<HTML>\")){var h=i.ConditionHelpText;i.ConditionHelpText=\"<HTML><HEAD><TITLE>X</TITLE></HEAD><BODY>\"+h+\"</BODY></HTML>\"}if(this._oMainResolve&&\"X\"!==this._oMainResolve.ValidationRequired||this.oValidation.validateForm(),this.oValidation._oError)this._oMainResolve&&(this._oMainResolve.WhenValid.resolve(\"Error\"),this._oMainResolve=\"\");else if(this._oModel.hasPendingChanges()){this.getView().getParent().setBusyIndicatorDelay(0),this.getView().getParent().setBusy(!0),this._oForm.setBindingContext(null);var g=\"/\"+this._oModel.createKey(this._oMainController._sStepsCollection,{ApplicationKey:this._oMainController._sProcessKey,StepKey:this._oMainController._sStepKey});this._oModel.submitChanges({success:function(e){var o=!1;if($.each(e.__batchResponses,function(e,t){if(t.response){var i=t.response.body,n=JSON.parse(i);if($.each(n.error.innererror.errordetails,function(e,t){if(\"error\"===t.severity)return o=!0,!1}),!0===o)return!1}}),!0===o){l.deleteDuplicateMessages();var i=[];$.each(l._oModel.mChangedEntities,function(e,t){\"ApplicationHold(\"===e.substring(0,16)&&(e=\"/\"+e,i.push(e))}),i.length>0&&l._oModel.resetChanges(i),l.getView().getParent().setBusy(!1),t.show(l.getI18NText(\"UpdateFailedMessage\")),jQuery.sap.log.error(\"Error adding new note\"),l._oMainResolve&&(l._oMainResolve.WhenValid.resolve(\"Error\"),l._oMainResolve=\"\")}else l._oModel.getContext(g).getObject().Status=\"S\",l._oModel.setProperty(\"Status\",\"S\",l._oModel.getContext(g)),l._oMainController.refreshNavBarIcons(),l._oModel.submitChanges(),l.getView().getParent().setBusy(!1),l.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!0),jQuery.sap.log.info(\"Updated Condition\"),l._oMainResolve&&(l._oMainResolve.WhenValid.resolve(\"Success\"),l._oMainResolve=\"\")},error:function(e){l.getView().getParent().setBusy(!1),jQuery.sap.log.error(\"Error while updating Condition\"),l._oMainResolve&&(l._oMainResolve.WhenValid.resolve(\"Error\"),l._oMainResolve=\"\")}})}else this.getView().getParent().setBusy(!1),t.show(this.getI18NText(\"NoChangeSaveMessage\")),this._oMainResolve&&(this._oMainResolve.WhenValid.resolve(\"Info\"),this._oMainResolve=\"\")},handleIconTabBarSelect:function(e){var t=this.getView().byId(\"itb1\");if(\"click\"!==e.type)var o=e.getParameter(\"key\");else-1!==e.target.id.indexOf(\"cancelId\")?(t.setSelectedKey(\"Condition\"),o=\"Condition\"):-1!==e.target.id.indexOf(\"helpId\")?(t.setSelectedKey(\"Help\"),o=\"Help\"):-1!==e.target.id.indexOf(\"monitorId\")&&(t.setSelectedKey(\"Monitor\"),o=\"Monitor\");if(\"Help\"===o)this._oHelpView.byId(\"helpRichtext\").setEditable(!1);else if(\"Condition\"===o&&this._oForm.getBindingContext()){var i=this._oForm.getBindingContext().getObject().EditFlag;this._oConditionView.byId(\"richtext\").setEditable(i)}},onAfterRendering:function(){},onCheckValid:function(e,t,o){this.getView().byId(\"cancelId\")&&this.getView().byId(\"cancelId\")._oImageControl.destroy(),this.getView().byId(\"helpId\")&&this.getView().byId(\"helpId\")._oImageControl.destroy(),this.getView().byId(\"monitorId\")&&this.getView().byId(\"monitorId\")._oImageControl.destroy(),this.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!1),o.WhenValid.resolve()},getI18NText:function(e,t){return this.getView().getModel(\"i18n\").getResourceBundle().getText(e,t)},deleteDuplicateMessages:function(){var e=[],t=!1,o=sap.ui.getCore().getMessageManager().getMessageModel().oData;$.each(o,function(o,i){if(0===e.length)return e.push(i),!0;t=!1,$.each(e,function(e,o){if(o.message===i.message)return t=!0,!1}),!1===t&&e.push(i)}),sap.ui.getCore().getMessageManager().removeAllMessages(),sap.ui.getCore().getMessageManager().getMessageModel().oData=[],sap.ui.getCore().getMessageManager().getMessageModel().oData=e,sap.ui.getCore().getMessageManager().getMessageModel().refresh()},onSubmitChanges:function(e,t,o){this._oMainResolve=o,this.getView().byId(\"update\").firePress()}})});",
		"aklc/cm/components/condition/controller/Master.controller.js": "sap.ui.define([\"aklc/cm/library/common/controller/BaseController\",\"sap/ui/commons/Dialog\",\"sap/ui/commons/TextView\",\"sap/ui/commons/RowRepeaterFilter\",\"sap/ui/model/Sorter\",\"sap/ui/model/Filter\",\"sap/ui/model/FilterOperator\",\"sap/ui/commons/RowRepeaterSorter\"],function(e,t,o,i,n,s,r,a){\"use strict\";return e.extend(\"aklc.cm.components.condition.controller.Master\",{_sConditionCollection:\"Conditions\",_sUpdate:\"UPDATE\",_sCreate:\"CREATE\",_sFilterFrag:\"aklc.cm.components.condition.fragments.Filter\",_sAddCondition:\"aklc.cm.components.condition.fragments.AddCondition\",_oMainController:\"\",onInit:function(t){e.prototype.onInit.apply(this),this.oCondition=this.oView.byId(\"condition\"),this.oBundle=this.getComponent().getModel(\"i18n\").getResourceBundle(),this.oComponent=this.getOwnerComponent(),this._rowRepeatConfig();var o=this;if(!this.oTemplate){this.oTemplate=this.byId(\"RowTemp\").clone();var i=function(e){var t=jQuery(e.target).closest(\".npcRowRepeat\").attr(\"id\");this.oSelectedId=t;var o;this.oCondition.getRows().forEach(function(e,i){var n=t===e.getId();e.toggleStyleClass(\"npcSelectedRow\",n),n&&(o=e)}),this.onRowSelect(o.getBindingContext(),this._sUpdate)}.bind(this);this.oTemplate.addEventDelegate({onclick:i}),this.oTemplate.addEventDelegate({onAfterRendering:function(){var e=o.oCondition.getRows()[0].getId(),t=o.oCondition.getRows()[0].aCustomStyleClasses.indexOf(\"npcSelectedRow\"),i=o.oComponent._oViewModel.getProperty(\"/UpdateBtn_Visible\");e&&-1===t&&0==i?$(\"#\"+e).trigger(\"click\"):o.oSelectedId&&1==i&&$(\"#\"+o.oSelectedId).trigger(\"click\")}})}this.oPSTemplate=new sap.m.ColumnListItem({type:\"Active\",cells:[new sap.m.Text({text:\"{ConditionGrpname}\"}),new sap.m.ObjectIdentifier({text:\"{ConditionTitle}\"}),new sap.m.Text({text:\"{ConditionTypeDesc}\"})]})},_rowRepeatConfig:function(){var e=new a(\"ConditionTitle\",{text:\"Condition Title\",sorter:new n(\"ConditionTitle\")}),t=new a(\"ConditionTypeDesc\",{text:\"Condition Type\",sorter:new n(\"ConditionTypeDesc\")}),o=new a(\"ConditionGroup\",{text:\"Condition Group\",sorter:new n(\"ConditionGrpname\")});this.oCondition.addSorter(e),this.oCondition.addSorter(t),this.oCondition.addSorter(o)},rowRepeatSort:function(e){this.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!1);var t=e.getParameter(\"sorterId\");e.getSource().getSorters().forEach(function(e,o){e.getId()===t&&(e.getSorter().bDescending=!e.getSorter().bDescending)})},onContextChanged:function(e,t,o){this._oMainController=o.controller,this._sStepKey=this._oModel.getProperty(\"StepKey\",o.context),this.aFilterBy=[],this.aFilterBy.push(new s(\"StepKey\",r.EQ,this._sStepKey)),this.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!1),this.bindRows(),this._sPreview=\"/\"+this._oModel.createKey(\"ApplicationLinks\",{StepKey:this._sStepKey,Component:\"CONDLINK\"});var i=function(e){e&&(this._sPreview=e.getObject().Url)}.bind(this);this._oModel.createBindingContext(this._sPreview,null,null,i,!0)},bindRows:function(){this._oMainController.setScreenBusyIndicator(),this.oCondition.bindAggregation(\"rows\",{path:\"/\"+this._sConditionCollection,parameters:{},template:this.oTemplate,filters:this.aFilterBy}),this.oCondition.getBinding(\"rows\").attachEvent(\"dataRequested\",this._oMainController.setScreenBusyIndicator,this._oMainController),this.oCondition.getBinding(\"rows\").attachEvent(\"dataReceived\",this._oMainController.removeScreenBusyIndicator,this._oMainController)},onRowSelect:function(e,t){this.getEventBus().publish(\"condition\",\"refreshconditionForm\",{context:e,action:t}),this.deleteDuplicateMessages()},onPreview:function(){this._sPreview&&window.open(this._sPreview,\"Newwindow\",\"width=1400,height=900,resizable=1\")},onFilter:function(e){var t=this;if(this.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!1),!this._oFilterDialog){this._oFilterDialog=sap.ui.xmlfragment(this._sFilterFrag,this),this.aFilterBy=[],this.aFilterBy.push(new s(\"StepKey\",r.EQ,this._sStepKey)),this._oFilterDialog.setModel(this._oModel),this._oFilterDialog.setModel(this.getComponent().getModel(\"i18n\"),\"i18n\");this._oFilterDialog.getFilterItems().forEach(function(e,o){\"ConditionGrp\"===e.getId()?t._oFilterDialog.getFilterItems()[o].bindAggregation(\"items\",{path:\"/VH_ConditionGrp\",sorter:null,parameters:{},template:new sap.m.ViewSettingsItem({text:\"{ConditionGrpname}\",key:\"{ConditionGroup}\"}),filters:t.aFilterBy}):\"ConditionTypes\"===e.getId()&&t._oFilterDialog.getFilterItems()[o].bindAggregation(\"items\",{path:\"/VH_ConditionType\",sorter:null,parameters:{},template:new sap.m.ViewSettingsItem({text:\"{ConditionTypeDesc}\",key:\"{ConditionType}\"}),filters:t.aFilterBy})})}this._oFilterDialog.open()},onHandleConfirm:function(e){if(e.getParameters().filterString){var t=e.getParameter(\"filterItems\");this.aFilterBy=[],this.aFilterBy.push(new s(\"StepKey\",r.EQ,this._sStepKey)),t.forEach(function(e,t){e.getParent().getId().indexOf(\"ConditionGrp\")>-1?this.aFilterBy.push(new s(\"ConditionGroup\",r.EQ,e.getProperty(\"key\"))):e.getParent().getId().indexOf(\"ConditionTypes\")>-1&&this.aFilterBy.push(new s(\"ConditionType\",r.EQ,e.getProperty(\"key\")))}.bind(this)),this.bindRows()}},onAddRow:function(){this.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!1),this._pAddCondDialog||(this._pAddCondDialog=sap.ui.xmlfragment(\"AddCond\",this._sAddCondition,this),this._pAddCondDialog.setModel(this._oModel),this._pAddCondDialog.setModel(this.getView().getModel(\"i18n\"),\"i18n\"),this.getView().addDependent(this._pAddCondDialog),this.partnerSearch=sap.ui.core.Fragment.byId(\"AddCond\",\"partySearchDialog\")),this.partnerSearch.bindAggregation(\"items\",{path:\"/ConditionSearch\",sorter:null,parameters:{},template:this.oPSTemplate,filters:this.aFilterBy}),this._pAddCondDialog.open()},onPress:function(e){var t=e.getParameter(\"listItem\").getBindingContext();this.page2=sap.ui.core.Fragment.byId(\"AddCond\",\"page2\"),this.page1=sap.ui.core.Fragment.byId(\"AddCond\",\"page1\"),this.page2.setBindingContext(t),this.navContainer=sap.ui.core.Fragment.byId(\"AddCond\",\"navCon\"),this.backButton=sap.ui.core.Fragment.byId(\"AddCond\",\"back\"),this.addButton=sap.ui.core.Fragment.byId(\"AddCond\",\"addBtn\"),this.addButton.setVisible(!1),this.backButton.setVisible(!0),this.navContainer.to(this.page2)},onBack:function(e){this.backButton.setVisible(!1),this.navContainer.to(this.page1),this.addButton.setVisible(!0)},onClose:function(e){this._pAddCondDialog.close(),this._pAddCondDialog&&(this._pAddCondDialog.destroy(),this._pAddCondDialog=null)},onResetFilter:function(e){this.aFilterBy=[],this.aFilterBy.push(new s(\"StepKey\",r.EQ,this._sStepKey)),this.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!1),this.bindRows(),this._oFilterDialog&&(this._oFilterDialog.destroy(),this._oFilterDialog=null)},onAdd:function(e){this._oModel.mChangedEntities&&this._oModel.resetChanges();var t=this,o=this.partnerSearch.getSelectedItems(),i=[],n=[],s=[],r=[];this.getView().byId(\"condition\").getRows().forEach(function(e){var t=e.getBindingContext().getObject();s.push(t),r.push(t.ConditionTypeDesc)}),o.forEach(function(e){var t=e.getBindingContext().getObject();i.push(t),n.push(t.ConditionTypeDesc)}),n=n.filter(function(e){return-1!==r.indexOf(e)}),i=i.filter(function(e){return!s.filter(function(t){return t.ConditionTypeDesc==e.ConditionTypeDesc})[0]}),i.forEach(function(e){var o={StepKey:t._sStepKey,ConditionTitle:e.ConditionTitle,ConditionGroup:e.ConditionGroup,ConditionGrpname:e.ConditionGrpname,ConditionType:e.ConditionType,ConditionTypeDesc:e.ConditionTypeDesc,ValidFrom:new Date,ValidTo:e.ValidTo,ConditionSeq:e.ConditionSeq,ConditionStat:e.ConditionStat,ConditionStatDesc:e.ConditionStatDesc,TextId:e.CondTextId,Parameter1:e.Parameter1,Parameter2:e.Parameter2,ConditionText:e.ConditionText,ConditionHelpText:e.ConditionHelpText,Comments:e.Comments};t._oModel.createEntry(t._sConditionCollection,{properties:o})}),this._pAddCondDialog.close(),this._pAddCondDialog&&(this._pAddCondDialog.destroy(),this._pAddCondDialog=null),n.length&&(sap.m.MessageToast.show(\"Duplicate conditions will be ignored and non duplicate conditions will be saved.\"),t._oMessageManager=sap.ui.getCore().getMessageManager(),$.each(n,function(e,o){t._oMessageManager.addMessages(new sap.ui.core.message.Message({message:\"Conditions error: Overlapping conditions not allowed(\"+n[e]+\")\",type:sap.ui.core.MessageType.Error,processor:t._oModel}))})),this._oMainController.setScreenBusyIndicator(),this._oModel.submitChanges({success:function(e){try{var o=JSON.parse(e.__batchResponses[0].response.body);t._oMessageManager=sap.ui.getCore().getMessageManager(),$.each(o.error.innererror.errordetails,function(e,o){t._oMessageManager.addMessages(new sap.ui.core.message.Message({message:o.message,type:sap.ui.core.MessageType.Error,processor:t._oModel}))})}catch(e){}t._oMainController.removeScreenBusyIndicator(),jQuery.sap.log.info(\"Added Condtion\"),t.onResetFilter()},error:function(e){t._oMainController.removeScreenBusyIndicator(),jQuery.sap.log.error(\"Error adding new condition\"),t.onResetFilter()}})},_handleCondtionSearch:function(e){var t=e.getParameters().newValue,o=[];o.push(new s(\"SearchTerm\",r.Contains,t));var i=new s({filters:o,and:!1});this.partnerSearch.getBinding(\"items\").filter(i)},onDeleteRow:function(e){var i=this;if(this.sDeletePath=e.getSource().getBindingContext().getPath(),!this.oDialog){this.oDialog=new t({resizable:!1,title:this.oBundle.getText(\"CONDITION_DELETE_TITLE\"),modal:!0,showCloseButton:!1});var n=new o({text:this.oBundle.getText(\"CONDITION_DELETE\")}),s=function(e){this.oDialog.close(),\"YesBtnCon\"===e.getSource().getId()&&(this.getView().getParent().setBusyIndicatorDelay(0),this.getView().getParent().setBusy(!0),this._oModel.remove(this.sDeletePath,{success:function(e){i.getView().getParent().setBusy(!1),i.oComponent._setViewModelProperty(\"UpdateBtn_Visible\",!1),i.onResetFilter(),jQuery.sap.log.info(\"Deleted existing Condition\")},error:function(e){i.getView().getParent().setBusy(!1),i.onResetFilter(),jQuery.sap.log.error(\"Error Delete existing Condition\")}}))}.bind(this);this.oDialog.addContent(n),this.oDialog.addButton(new sap.ui.commons.Button({id:\"YesBtnCon\",text:this.oBundle.getText(\"YES_TXT\"),press:s})),this.oDialog.addButton(new sap.ui.commons.Button({text:this.oBundle.getText(\"NO_TXT\"),press:s}))}this.oDialog.open()},VisibilityLink:function(e){return!0===e&&(sap.ui.core.Fragment.byId(\"AddCond\",\"linkCondition1\").setText(\"Link to condition document\"),!0)},onLinkPress:function(){this.oComponent._sLinkCond&&window.open(this.oComponent._sLinkCond,\"Newwindow\",\"width=1400,height=900,resizable=1\")},handleBeforeEditorInit:function(e){e.getSource().getBinding(\"value\").setBindingMode(\"OneWay\")},onValidateForm:function(e){this.oValidation.validateForm()},deleteDuplicateMessages:function(){var e=[],t=!1,o=sap.ui.getCore().getMessageManager().getMessageModel().oData;$.each(o,function(o,i){if(0===e.length)return e.push(i),!0;t=!1,$.each(e,function(e,o){if(o.message===i.message)return t=!0,!1}),!1===t&&e.push(i)}),sap.ui.getCore().getMessageManager().removeAllMessages(),sap.ui.getCore().getMessageManager().getMessageModel().oData=[],sap.ui.getCore().getMessageManager().getMessageModel().oData=e,sap.ui.getCore().getMessageManager().getMessageModel().refresh()},getI18NText:function(e,t){return this.getView().getModel(\"i18n\").getResourceBundle().getText(e,t)},VisibilityRich:function(e){return!1}})});",
		"aklc/cm/components/condition/controller/Monitor.controller.js": "sap.ui.define([\"aklc/cm/library/common/controller/BaseController\",\"aklc/cm/library/common/controller/Validation\"],function(e,n){\"use strict\";return e.extend(\"aklc.cm.components.condition.controller.Monitor\",{onInit:function(e){},setFinal:function(e){!0===e?this.getView().byId(\"final\").setSelectedKey(\"true\"):this.getView().byId(\"final\").setSelectedKey(\"false\")}})});",
		"aklc/cm/components/condition/fragments/AddCondition.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.m\" xmlns:core=\"sap.ui.core\" xmlns:rich=\"sap.ui.richtexteditor\"><Dialog title=\"{i18n>ADD_CONDITION}\" contentHeight=\"45rem\" contentWidth=\"80rem\"><buttons><Button text=\"Close\" press=\"onClose\" /><Button id=\"back\" text=\"Back\" press=\"onBack\" visible=\"false\" /><Button text=\"Add Condition\" press=\"onAdd\" id=\"addBtn\" /></buttons><content><NavContainer id=\"navCon\"><Page id=\"page1\" showHeader=\"false\"><subHeader><Toolbar><SearchField id=\"conditionSearch\" liveChange=\"_handleCondtionSearch\" width=\"100%\" /></Toolbar></subHeader><content><Table id=\"partySearchDialog\" noDataText=\"{i18n>NO_CONDITION_FOUND}\" title=\"{i18n>PARTY_SEARCH}\" rememberSelections=\"false\" contentWidth=\"100%\" contentHeight=\"100%\" class=\"sapUiPopupWithPadding\" mode=\"MultiSelect\" itemPress=\"onPress\"><columns><Column width=\"30%\"><header><Text text=\"{i18n>CONDITION_GROUP}\" /></header></Column ><Column minScreenWidth=\"Tablet\" demandPopin=\"true\"  width=\"50%\"><header><Text text=\"{i18n>CONDITION_TITLE}\" /></header></Column ><Column minScreenWidth=\"Tablet\" demandPopin=\"true\" width=\"20%\"><header><Text text=\"{i18n>CONDITION_ID}\" /></header></Column></columns></Table></content></Page><Page id=\"page2\" title=\"{ConditionTitle}\"><content><Link id=\"linkCondition1\" visible=\"{ path : 'ConditionLink',  formatter:'.VisibilityLink'}\" press=\"onLinkPress\" /><HBox><items><VBox><items><Label text=\"{i18n>COND_TXT}\" class=\".ncpLinkFont\" /><rich:RichTextEditor id=\"conditionText\" value=\"{ConditionText}\" height=\"40rem\" width=\"40rem\" editable=\"{ path : 'ConditionLink',  formatter:'.VisibilityRich'}\" change=\"onChange\"\nbeforeEditorInit=\"handleBeforeEditorInit\"></rich:RichTextEditor></items></VBox><VBox><items><Label text=\"{i18n>COND_HELP_TXT}\" class=\".ncpLinkFont\" /><rich:RichTextEditor id=\"helpText\" value=\"{ConditionHelpText}\" height=\"40rem\" width=\"40rem\" editable=\"{ path : 'ConditionLink',  formatter:'.VisibilityRich'}\" change=\"onChange\"\nbeforeEditorInit=\"handleBeforeEditorInit\"></rich:RichTextEditor></items></VBox></items></HBox></content></Page></NavContainer></content></Dialog></core:FragmentDefinition>",
		"aklc/cm/components/condition/fragments/Filter.fragment.xml": "<core:FragmentDefinition xmlns=\"sap.m\" xmlns:core=\"sap.ui.core\"><ViewSettingsDialog id=\"CondtionFilters\" confirm=\"onHandleConfirm\"><filterItems><ViewSettingsFilterItem id=\"ConditionGrp\" text=\"{i18n>COND_GRP}\" multiSelect=\"false\"><items><ViewSettingsItem key=\"{ConditionGroup}\" text=\"{ConditionGrpname}\" /></items></ViewSettingsFilterItem><ViewSettingsFilterItem id=\"ConditionTypes\" text=\"{i18n>COND_TYPE}\" multiSelect=\"false\"></ViewSettingsFilterItem></filterItems></ViewSettingsDialog></core:FragmentDefinition>\n",
		"aklc/cm/components/condition/view/Condition.view.xml": "<mvc:View controllerName=\"aklc.cm.components.condition.controller.Condition\" xmlns=\"sap.m\" xmlns:form=\"sap.ui.layout.form\" xmlns:core=\"sap.ui.core\" xmlns:l=\"sap.ui.layout\" xmlns:commons=\"sap.ui.commons\" xmlns:rich=\"sap.ui.richtexteditor\" xmlns:mvc=\"sap.ui.core.mvc\" ><form:Form id=\"CONDITION_FORM\" editable=\"true\" height=\"50rem\"><form:title></form:title><form:layout><form:ResponsiveGridLayout columnsM=\"1\" columnsL=\"1\" labelSpanL=\"1\" labelSpanM=\"1\" emptySpanM=\"0\" emptySpanL=\"0\" /></form:layout><form:formContainers><form:FormContainer><form:formElements><form:FormElement><form:fields><commons:Label id=\"Text1Label\" text=\"{/#Conditions/Parameter1/@sap:label}\" class=\"formLabel\" required=\"false\" /><Input id=\"Parameter1\" value=\"{Parameter1}\" liveChange=\"onChangeParam1\" valueLiveUpdate=\"false\" editable=\"true\" maxLength=\"60\"></Input></form:fields></form:FormElement></form:formElements></form:FormContainer><form:FormContainer><form:formElements><form:FormElement><form:fields><commons:Label text=\"{/#Conditions/Parameter2/@sap:label}\" class=\"formLabel\" required=\"false\" /><Input id=\"Parameter2\" value=\"{Parameter2}\" editable=\"true\" maxLength=\"60\" liveChange=\"onChangeParam2\" valueLiveUpdate=\"false\" /></form:fields></form:FormElement></form:formElements></form:FormContainer><form:FormContainer><form:formElements><form:FormElement><form:fields><commons:Label text=\"{/#Conditions/ConditionText/@sap:label}\" class=\"formLabel\" required=\"false\" /><rich:RichTextEditor id=\"richtext\" value=\"{ConditionText}\" height=\"200px\" width=\"100%\" editable=\"{ path: 'EditFlag', formatter :'.handleConditionEdit'}\" beforeEditorInit=\"handleBeforeEditorInit\" showGroupStructure=\"false\" showGroupTextAlign=\"false\"></rich:RichTextEditor></form:fields></form:FormElement></form:formElements></form:FormContainer></form:formContainers></form:Form></mvc:View>\n",
		"aklc/cm/components/condition/view/Detail.view.xml": "<mvc:View controllerName=\"aklc.cm.components.condition.controller.Detail\" xmlns=\"sap.m\" xmlns:form=\"sap.ui.layout.form\" xmlns:core=\"sap.ui.core\" xmlns:commons=\"sap.ui.commons\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns:layout=\"sap.ui.layout\"><layout:VerticalLayout id=\"oh\" width=\"90%\" ><ObjectHeader id=\"oh1\" title=\"{ConditionTitle}\" fullScreenOptimized=\"true\" backgroundDesign=\"Translucent\"><attributes><ObjectAttribute text=\"Condition Type: {ConditionTypeDesc}\" /><ObjectAttribute text=\"Condition Group: {ConditionGrpname}\" /></attributes><headerContainer></headerContainer></ObjectHeader><Link id=\"linkCondition\" class=\"ncpLinkFont\" visible=\"{ path : 'ConditionHlink', \n        formatter:'.VisibilityLink'}\" press=\"onLinkPress\" /><form:Form class=\"editableForm\" id=\"DATE_FORM\" editable=\"true\"><form:title></form:title><form:layout><form:ResponsiveGridLayout columnsM=\"2\" columnsL=\"2\" labelSpanL=\"4\" labelSpanM=\"4\" /></form:layout><form:formContainers><form:FormContainer><form:formElements><form:FormElement><form:fields><Label text=\"{i18n>VALID_FROM}\" class=\"rrFormLabel\" /><DatePicker id=\"fromDate\" displayFormat=\"dd/MM/yyyy\" dateValue=\"{ValidFrom}\" editable=\"false\" /></form:fields></form:FormElement></form:formElements></form:FormContainer></form:formContainers><form:formContainers><form:FormContainer><form:formElements><form:FormElement><form:fields><Label text=\"{i18n>VALID_TO}\" class=\"rrFormLabel\" /><DatePicker id=\"toDate\" displayFormat=\"dd/MM/yyyy\" dateValue=\"{ValidTo}\" editable=\"true\" width=\"10rem\" /></form:fields></form:FormElement></form:formElements></form:FormContainer></form:formContainers></form:Form><IconTabBar id=\"itb1\" selectedKey=\"key3\" upperCase=\"true\" select=\"handleIconTabBarSelect\" class=\"sapUiResponsiveContentPadding\"><items><IconTabFilter  key=\"Condition\" tooltip=\"Condition\" id=\"cancelId\"><Text text=\"{i18n>COND}\" class=\"npcIconFormSize\" /><customData><core:CustomData key=\"mydata\" value=\"iconTabFilter\" writeToDom=\"true\" /></customData><mvc:XMLView id=\"conditionView\" viewName=\"aklc.cm.components.condition.view.Condition\" /></IconTabFilter><IconTabFilter  key=\"Help\" tooltip=\"Help Text\" id=\"helpId\"><Text text=\"{i18n>HELP_TXT}\" class=\"npcIconFormSize\" /><customData><core:CustomData key=\"mydata1\" value=\"iconTabFilter\" writeToDom=\"true\" /></customData><mvc:XMLView id=\"HelpView\" viewName=\"aklc.cm.components.condition.view.Help\" /></IconTabFilter><IconTabFilter key=\"Monitor\" tooltip=\"Monitor\" id=\"monitorId\"><Text text=\"{i18n>MONITOR}\" class=\"npcIconFormSize\" /><customData><core:CustomData key=\"mydata2\" value=\"iconTabFilter\" writeToDom=\"true\" /></customData><mvc:XMLView id=\"MonitorView\" viewName=\"aklc.cm.components.condition.view.Monitor\" /></IconTabFilter></items></IconTabBar><commons:Button id=\"update\" text=\"{i18n>UPDATE_BTN_TEXT}\" press=\".onUpdate\" style=\"Emph\" class=\"nextButton navButton\" visible=\"true\" /></layout:VerticalLayout></mvc:View>\n",
		"aklc/cm/components/condition/view/Help.view.xml": "<mvc:View xmlns=\"sap.m\"  xmlns:form=\"sap.ui.layout.form\" xmlns:core=\"sap.ui.core\" xmlns:commons=\"sap.ui.commons\" xmlns:rich=\"sap.ui.richtexteditor\" xmlns:mvc=\"sap.ui.core.mvc\"><rich:RichTextEditor id=\"helpRichtext\" value=\"{ConditionHelpText}\" height=\"300px\" width=\"500px\" editable=\"false\" showGroupFontStyle=\"false\" showGroupTextAlign=\"false\" showGroupStructure=\"false\" showGroupClipboard=\"false\"/></mvc:View>\n",
		"aklc/cm/components/condition/view/Main.view.xml": "<mvc:View  xmlns:unified=\"sap.ui.unified\" xmlns:l=\"sap.ui.layout\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns=\"sap.m\"><unified:SplitContainer id=\"splitContainer\" showSecondaryContent=\"true\" secondaryContentSize=\"420px\"><unified:content><mvc:XMLView viewName=\"aklc.cm.components.condition.view.Detail\" height=\"60rem\"/></unified:content><unified:secondaryContent><mvc:XMLView viewName=\"aklc.cm.components.condition.view.Master\" /></unified:secondaryContent></unified:SplitContainer></mvc:View>\n",
		"aklc/cm/components/condition/view/Master.view.xml": "<mvc:View controllerName=\"aklc.cm.components.condition.controller.Master\" xmlns:mvc=\"sap.ui.core.mvc\" xmlns:layout=\"sap.ui.layout\" xmlns:core=\"sap.ui.core\" xmlns=\"sap.m\" xmlns:commons=\"sap.ui.commons\" xmlns:html=\"http://www.w3.org/1999/xhtml\"><Button icon=\"sap-icon://add\" class=\"npcRowRepeatAdd\" press=\".onAddRow\" type=\"Transparent\" tooltip=\"{i18n>ADD_ROW}\" /><Button icon=\"sap-icon://filter\" class=\"npcRowRepeatToolBar\" press=\".onFilter\" tooltip=\"{i18n>FILTER_LIST}\" type=\"Transparent\" /><Button icon=\"sap-icon://undo\" class=\"npcRowRepeatToolBar\" press=\".onResetFilter\" tooltip=\"{i18n>RESET_FILTER}\" type=\"Transparent\" /><Button icon=\"sap-icon://refresh\" class=\"npcRowRepeatToolBar\" press=\".onResetFilter\" type=\"Transparent\" tooltip=\"{i18n>REFRESH}\" /><Button class=\"npcRowRepeatToolBar\" press=\".onPreview\" type=\"Accept\" tooltip=\"Preview Condition\" text=\"{i18n>PREV}\" /><ScrollContainer height=\"30rem\" width=\"100%\" horizontal=\"false\" vertical=\"true\" focusable=\"false\"><commons:RowRepeater id=\"condition\" design=\"Transparent\" numberOfRows=\"50\" sort=\".rowRepeatSort\"><commons:rows title=\"\"><layout:HorizontalLayout id=\"RowTemp\" class=\"npcRowRepeat\"><commons:Image class=\"npcStatusBar\"></commons:Image><layout:VerticalLayout><commons:TextView text=\"{ConditionTitle}\" width=\"14rem\" class=\"formLabel\" wrapping=\"false\" design=\"Bold\"><commons:tooltip><commons:RichTooltip text=\"{ConditionTypeDesc}\" title=\"{ConditionTitle}\" /></commons:tooltip></commons:TextView><commons:Label text=\"{ConditionTypeDesc}\" /></layout:VerticalLayout><commons:TextView text=\"{ConditionGrpname}\" width=\"8rem\" class=\"formLabel\" wrapping=\"false\" design=\"Bold\"><commons:tooltip><commons:RichTooltip title=\"{ConditionGrpname}\" /></commons:tooltip></commons:TextView><core:Icon src=\"sap-icon://decline\" class=\"npcRowRepeatDelete\" color=\"#FF0000\" press=\"onDeleteRow\"></core:Icon></layout:HorizontalLayout></commons:rows></commons:RowRepeater></ScrollContainer></mvc:View>\n",
		"aklc/cm/components/condition/view/Monitor.view.xml": "<mvc:View controllerName=\"aklc.cm.components.condition.controller.Monitor\" xmlns=\"sap.m\" xmlns:form=\"sap.ui.layout.form\" xmlns:core=\"sap.ui.core\" xmlns:commons=\"sap.ui.commons\" xmlns:rich=\"sap.ui.richtexteditor\" xmlns:mvc=\"sap.ui.core.mvc\"><form:Form class=\"editableForm\" id=\"MONITOR_FORM\" editable=\"true\"><form:title></form:title><form:layout><form:ResponsiveGridLayout columnsM=\"1\" columnsL=\"1\" labelSpanL=\"4\" labelSpanM=\"4\" emptySpanL=\"4\" emptySpanM=\"4\" /></form:layout><form:formContainers><form:FormContainer><form:formElements><form:FormElement><form:fields><Label text=\"{i18n>COMPLIANCE}\" /><ComboBox id=\"compliance\" selectionChange=\".onValidateForm\" selectedKey=\"{ConditionStat}\" editable=\"true\"><core:Item id=\"complianceDrp\" key=\"{ConditionStatus}\" text=\"{ConditionStatusText}\" tooltip=\"{ConditionStatusText}\" /></ComboBox></form:fields></form:FormElement></form:formElements></form:FormContainer><form:FormContainer><form:formElements><form:FormElement><form:fields><Label text=\"{i18n>FINAL}\" /><SegmentedButton id=\"final\" selectedKey=\"{ path: 'Final' ,\n                               formatter: '.setFinal' }\" class=\"sapUiSmallMarginBottom\"><items><SegmentedButtonItem text=\"Yes\" key=\"true\" /><SegmentedButtonItem text=\"No\" key=\"false\" /></items></SegmentedButton></form:fields></form:FormElement></form:formElements></form:FormContainer><form:FormContainer><form:formElements><form:FormElement><form:fields><Label text=\"\" /><TextArea id=\"idCondition\" height=\"100%\" value=\"{Comments}\" valueLiveUpdate=\"false\"/></form:fields></form:FormElement></form:formElements></form:FormContainer></form:formContainers></form:Form></mvc:View>\n",
		"aklc/cm/components/condition/i18n/i18n.properties": "UPDATE_BTN_TEXT = Update\nFILTER_TITLE=Filter By:\nADD_ROW = Add New\nADD_CONDITION = Add Condition\nCONDITION_GROUP = Group\nCONDITION_TITLE = Title\nCONDITION_ID = Condition ID\nCOMMENT = Comment\nYES_TXT = Yes\nNO_TXT = No\t\nCONDITION_DELETE = Do you wish to delete this Condition?\nCONDITION_DELETE_TITLE = Delete Condition \nNO_CONDITION_FOUND= No Condtion Found\nUPDATE_BTN_TEXT = Update\nRESET_FILTER = Reset filters and sorts\nFILTER_LIST = Filter options\nREFRESH = Refresh the list\nNoChangeSaveMessage= No Data Change in the Application\nUpdateFailedMessage= Backend update has failed, Please check the Message Log in the Header\nCOND_TXT=Condition Text\nCOND_HELP_TXT=Condition Help Text\nCOND_GRP=Condition Group\nCOND_TYPE=Condition Type\nVALID_FROM=Condition Valid From\nVALID_TO=Condition Valid to\nCOND=Condition\nHELP_TXT=Help Text\nMONITOR=Monitor\nPREV=Preview\nCOMPLIANCE=Compliance\nFINAL=Final\n\n\n"
	}
});