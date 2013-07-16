// Automation Module constructor

function EventLog (id, controller) {
    EventLog.super_.call(this, id, controller);

    this.eventLog = {};
}

// Module inheritance and setup

_module = EventLog;

inherits(EventLog, AutomationModule);

// Module methods

EventLog.prototype.init = function (config) {
    EventLog.super_.prototype.init.call(this, config);

    var self = this;
    this.controller.eventlog = {};
    this.controller.onAny(function () {
        var newArgs = arguments.values();
        newArgs.unshift(this.event);
        self.logEvent.apply(self, newArgs);
    });
};

Object.prototype.values = function () {
    var self = this;
    return Object.keys(this).map(function(key) { return self[key]; });
};

EventLog.prototype.logEvent = function () {
    var now = new Date();
    var timestamp = Math.round(now.getTime() / 1000);

    var args = arguments.values();
    var eventId = args.shift();

    if (!this.eventLog.hasOwnProperty(timestamp)) {
        this.eventLog[timestamp] = [];
    };

    this.eventLog[timestamp].push([eventId, args]);

    console.log("--- EVENT:", now.toISOString(), timestamp, eventId, JSON.stringify(args));
};
