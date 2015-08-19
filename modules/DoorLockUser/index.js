/*** DoorLockUser Z-Way HA module *******************************************

Version: 1.0.0
(c) Z-Wave.Me, 2015
-----------------------------------------------------------------------------
Author: Martin Vach <mv@zwaveeurope.com>
Description: Allows to dynamically assign user codes to people.
******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function DoorLockUser (id, controller) {
    // Call superconstructor first (AutomationModule)
    DoorLockUser.super_.call(this, id, controller);
}

inherits(DoorLockUser, AutomationModule);

_module = DoorLockUser;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

DoorLockUser.prototype.init = function (config) {
    DoorLockUser.super_.prototype.init.call(this, config);

    var self = this;
    return;
    this.vDev = this.controller.devices.create({
        deviceId: "DoorLockUser_" + this.id,
        defaults: {
            metrics: {
                level: 'close',
                title: 'Door Lock User ' + this.id,
                icon: 'doorlockuser'
            }
        },
        overlay: {
            //deviceType: this.config.deviceType
             deviceType: 'doorLockControl'
        },
        handler: function(command, args) {
            var level = command;
//            if (this.get('deviceType') === "switchMultilevel") {
//                if (command === "on") {
//                    level = 99;
//                } else if (command === "off") {
//                    level = 0;
//                } else {
//                    level = args.level;
//                }
//            }
            //this.set("metrics:level", level);
             //this.set("metrics:level", 'closed');
        },
        moduleId: this.id
    });
};

DoorLockUser.prototype.stop = function () {
    if (this.vDev) {
        this.controller.devices.remove(this.vDev.id);
        this.vDev = null;
    }

    DoorLockUser.super_.prototype.stop.call(this);
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------
