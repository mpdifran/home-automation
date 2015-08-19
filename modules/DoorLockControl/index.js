/*** DoorLockControl Z-Way HA module *******************************************

Version: 1.0.0
(c) Z-Wave.Me, 2015
-----------------------------------------------------------------------------
Author: Martin Vach <mv@zwaveeurope.com>
Description: DoorLockControl reveals who and when opened (closed) the lock. 
******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function DoorLockControl (id, controller) {
    // Call superconstructor first (AutomationModule)
    DoorLockControl.super_.call(this, id, controller);
}

inherits(DoorLockControl, AutomationModule);

_module = DoorLockControl;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

DoorLockControl.prototype.init = function (config) {
    DoorLockControl.super_.prototype.init.call(this, config);

    var self = this;
    
    var events = [{
                    "id": "ZWayVDev_zway_4-0-50-0",
                    "user": "Barack Obama",
                    "success": true,
                    "level": "close",
                    "updateTime": 1438847769
                }, {
                    "id": "ZWayVDev_zway_4-0-50-2",
                    "user": "Angela Merkel",
                    "success": true,
                    "level": "opened",
                    "updateTime": 1438607281
                }, {
                    "id": "ZWayVDev_zway_6-0-49-4",
                    "user": "Vladimir Putin",
                    "success": true,
                    "level": "close",
                    "updateTime": 1438848925
                }, {
                    "id": "ZWayVDev_zway_6-0-50-0",
                    "user": "Joe Doe",
                    "success": true,
                    "level": "close",
                    "updateTime": 1437559884
                }, {
                    "id": "ZWayVDev_zway_6-0-50-2",
                    "user": false,
                    "success": false,
                    "level": "open",
                    "updateTime": 1437983761
                }];

    this.vDev = this.controller.devices.create({
        deviceId: "DoorLockControl_" + this.id,
        defaults: {
            metrics: {
                level: 'close',
                title: 'Door Lock Control ' + this.id,
                icon: 'doorlockcontrol',
                events: events
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
            //this.set("metrics:level", 'closed');
            this.set("metrics:level", 'close');
        },
        moduleId: this.id
    });
};

DoorLockControl.prototype.stop = function () {
    if (this.vDev) {
        this.controller.devices.remove(this.vDev.id);
        this.vDev = null;
    }

    DoorLockControl.super_.prototype.stop.call(this);
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------
