/* Copyright (c) 2006 securitycompass.com
   See the file LICENSE.txt for licensing information. */

/* module AttackDetectionRegExpContainer */

var AttackDetectionRegExpContainerModule = new Object();

const AttackDetectionRegExpContainer_CONTRACTID     = "@securitycompass.com/jsAttackDetectionRegExpContainer;1";
const AttackDetectionRegExpContainer_CID        = Components.ID("{532eee66-f87f-4993-885f-c9ab52b7f4c4}");
const Ci = Components.interfaces;

function AttackDetectionRegExpContainer()
{
    this.prefContainer = Components.
            classes["@SecurityCompass/jsPreferenceContainer;1"].
            createInstance(Ci.SecCompIPreferenceContainer);
    this.prefContainer.QueryInterface(Ci.SecCompIGenericPreferenceContainer).
            setSetSpecifiPreferenceContainer(this);
    this.wrappedJSObject = this;
}
AttackDetectionRegExpContainer.prototype = {

    getContents: function(foo) {
        var rv = this.prefContainer.getContents(foo);
        dump(typeof(rv)+ " " + typeof(rv.length) + " " + rv.length);
        return rv; 
    }
    ,
    addString: function(str, sig){
        return this.prefContainer.addString(str, sig);
    }
    ,
    save: function() {
        return this.prefContainer.save();
    }
    ,
    swap: function (index1, index2){
        return this.prefContainer.swap(index1, index2);
    }
    ,
    getPrefName: function() {
        return "attackParamDetectRegex";
    }
    ,
    getBranchName: function(){
        return "extensions.accessme."; 
    }
    ,
    remove: function(index){
        return this.prefContainer.remove(index);
    }
    ,
    QueryInterface: function(iid) {
        if (!iid.equals(Ci.SecCompIPreferenceContainer) &&
            !iid.equals(Ci.SecCompISpecificPreferenceContainer) &&
            !iid.equals(Components.interfaces.nsISupports)) {
            throw Components.results.NS_ERROR_NO_INTERFACE;
        }
        return this;
    }
}


AttackDetectionRegExpContainerModule.registerSelf =
function (compMgr, fileSpec, location, type)
{
    compMgr = compMgr.QueryInterface(Components.interfaces.nsIComponentRegistrar);
    compMgr.registerFactoryLocation(AttackDetectionRegExpContainer_CID, 
                                "AttackDetectionRegExpContainer Component",
                                AttackDetectionRegExpContainer_CONTRACTID, 
                                fileSpec, 
                                location,
                                type);
}

AttackDetectionRegExpContainerModule.getClassObject =
function (compMgr, cid, iid) {
    
    if (!iid.equals(Components.interfaces.nsIFactory))
        throw Components.results.NS_ERROR_NOT_IMPLEMENTED;

    if (cid.equals(AttackDetectionRegExpContainer_CID))
        return AttackDetectionRegExpContainerFactory;
    
    throw Components.results.NS_ERROR_NO_INTERFACE;
    
}

AttackDetectionRegExpContainerModule.canUnload =
function(compMgr)
{
    return true;
}
    
/* factory object */
var AttackDetectionRegExpContainerFactory = new Object();
var foo = null;

AttackDetectionRegExpContainerFactory.createInstance =
function (outer, iid) {try {

    if (outer != null)
        throw Components.results.NS_ERROR_NO_AGGREGATION;

    if (foo === null)
        foo = new AttackDetectionRegExpContainer();
    return foo.QueryInterface(iid);
}
catch(e){
    dump(e);
}
}

/* entrypoint */
function NSGetModule(compMgr, fileSpec) {
    return AttackDetectionRegExpContainerModule;
}
