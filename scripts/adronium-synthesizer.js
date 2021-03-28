const adroniumColor = Color.valueOf("e0b179");

const adroniumSynthesizer = extend(GenericSmelter, "adronium-synthesizer", {
    rotReg: null,
    load() {
        this.super$load();
        this.rotReg = Core.atlas.find(this.name + "-rotator");
    },
    getR() {
        return this.rotReg;
    },
    icons() {
        return [
            Core.atlas.find(this.name),
            Core.atlas.find(this.name + "-rotator")
        ]
    }
});

adroniumSynthesizer.buildType = prov(() => extend(GenericSmelter.SmelterBuild, adroniumSynthesizer, {
    draw() {
        this.super$draw();
        Draw.rect(this.block.getR(), this.x, this.y, 360 * Interp.pow3Out.apply(this.progress));
    },
    consume() {
        this.cons.trigger();
        Effect.shake(1.44, 1.44, this.x, this.y)
    }
}));

adroniumSynthesizer.craftEffect = new Effect(14, cons(e => {
    Draw.color(adroniumColor);
    Angles.randLenVectors(e.id, 9, 27 * e.fin(), new Floatc2({
        get(x, y) {
            Fill.square(e.x + x, e.y + y, 3 * e.fout())
        }
    }));
}));