const l = require("lib");
const glacier = extend(LaserTurret, "glacier", {
    load() {
        this.super$load();
        this.baseRegion = Core.atlas.find(l.mn + "block-8");
    },
    init(){
        this.super$init();
        this.consumes.add(new ConsumeLiquidFilter(boolf(liquid => liquid.temperature <= 0.5 && liquid.flammability < 0.1), 0.8)).update(false);
    }
});