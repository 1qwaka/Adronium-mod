const adroniumColor = Color.valueOf("e0b179");
const adroniumColorLight = Color.valueOf("fad1a0");
const lowRadius = 10.0;
const radius = 22.0;
const items = [
    Items.surgeAlloy, Items.surgeAlloy,
    Items.titanium, Items.titanium, Items.titanium,
    Items.thorium
];

const bigAdroniumSynthesizer = extend(GenericCrafter, "big-adronium-synthesizer", {});

bigAdroniumSynthesizer.buildType = prov(() => extend(GenericCrafter.GenericCrafterBuild, bigAdroniumSynthesizer, {
    updateTile() {
        this.super$updateTile();
        this.totalProgress += this.warmup;
    },
    draw() {
        this.super$draw();
        if (this.progress < 0.96) {
            Draw.mixcol(adroniumColorLight, this.progress+0.25);
            Draw.alpha(this.warmup * this.progress+(this.warmup < 0.9 ? 0.35*this.warmup : 0.35));
            for (var i = 0; i < items.length; i++) {
                var angle = 360 / items.length * i;
                Tmp.v1.trns(angle, 4 - this.progress * 4);
                Draw.rect(items[i].icon(Cicon.small), this.x + Tmp.v1.x, this.y + Tmp.v1.y);
            }
        } else {
            Draw.mixcol(adroniumColorLight, (0.04-(this.progress-0.96))/0.04);
            Draw.alpha(this.warmup * this.progress+(this.warmup < 0.9 ? 0.35*this.warmup : 0.35));
            Draw.rect(this.block.outputItem.item.icon(Cicon.small), this.x, this.y);
        }
        if (this.warmup > 0.1) {
            Draw.z(Layer.bullet);
            Lines.stroke(this.warmup * 1.5);
            Draw.color(adroniumColorLight);
            Lines.poly(this.x, this.y, 8, radius, this.totalProgress * 0.7);
            Lines.poly(this.x, this.y, 8, lowRadius, -this.totalProgress * 0.7);
            Draw.color(adroniumColor);
            Lines.poly(this.x, this.y, 8, radius, -this.totalProgress * 0.7);
            Lines.poly(this.x, this.y, 8, lowRadius, this.totalProgress * 0.7);
            Draw.z(Layer.block);
        }
        Draw.reset();
    },
    consume() {
        this.cons.trigger();
        Effect.shake(1.54, 1.54, this.x, this.y)
    }
}));

bigAdroniumSynthesizer.craftEffect = new Effect(16, cons(e => {
    Draw.color(adroniumColor);
    Angles.randLenVectors(e.id, 11, 38 * e.fin(), new Floatc2({
        get(x, y) {
            Fill.square(e.x + x, e.y + y, 4 * e.fout())
        }
    }));
}));