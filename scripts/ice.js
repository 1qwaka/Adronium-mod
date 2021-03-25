const l = require("lib");
const ice = extend(PowerTurret, "ice-turret", {
    load(){
        this.super$load();
        this.baseRegion = Core.atlas.find(l.mn+"block-6");
    }
});