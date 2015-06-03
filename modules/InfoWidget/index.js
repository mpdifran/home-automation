/*** InfoWidget Z-Way HA module *******************************************

Version: 1.0.0
(c) Z-Wave.Me, 2014
-----------------------------------------------------------------------------
Author: Niels Roche <nir@zwave.eu>
Description:
    Creates a text/information widget as devicetype 'text'
******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function InfoWidget (id, controller) {
    // Call superconstructor first (AutomationModule)
    InfoWidget.super_.call(this, id, controller);
}

inherits(InfoWidget, AutomationModule);

_module = InfoWidget;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

InfoWidget.prototype.init = function (config) {
    InfoWidget.super_.prototype.init.call(this, config);

    var self = this,
        vDev;

    this.vDev = [];

    if(self.config.widgets.length > 0){

        self.config.widgets.forEach(function (widget, indx) {

            vDev = this.controller.devices.create({
                deviceId: "InfoWidget_" + self.id + '_' + indx,
                defaults: {
                    metrics: {
                        title: widget.headline,
                        text: widget.text,
                        img: widget.imgURI
                    }          
                },
                overlay: {
                    deviceType: "text"
                },
                moduleId: self.id
            });

            self.vDev.push(vDev);
        });
    }
};

InfoWidget.prototype.stop = function () {
    var self = this;
    
    if(self.vDev) {
        self.vDev.forEach(function (dev){
            this.controller.devices.remove(dev.id);
        });

        self.vDev = null;
    }

    InfoWidget.super_.prototype.stop.call(this);
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------