const l = require("lib");
const iceBlue = Color.valueOf("5eb2f2");
const icy = extend(PowerTurret, "icy", {});
icy.shootType = extend(BasicBulletType, {
    splashDamage: 170,
    damage: 100,
    splashDamageRadius: 36,
    speed: 3.8,
    lifetime: 45,
    status: extend(StatusEffect, "weak-freezing", {
        color: Color.valueOf("6ecdec"),
        speedMultiplier: 0.8,
        effect: Fx.freezing,
        init() {
            this.opposite(StatusEffects.melting, StatusEffects.burning);
        }
    }),
    hitEffect: Fx.none,
    despawnEffect: new Effect(14, cons(e => {
        Draw.color(iceBlue, Color.white, e.fin());
        Lines.stroke(5 * e.fout());
        Lines.circle(e.x, e.y, e.finpow() * 42 + 4);
    })),
    draw(b) {
        Draw.color(iceBlue);
        Fill.circle(b.x, b.y, 7 + Mathf.sin(13.0 * b.fin(), 1.0, 0.8));
        Draw.color(Color.white);
        Fill.circle(b.x, b.y, 4 + Mathf.sin(11.0 * b.fin(), 1.0, 0.8));
    }
});
icy.chargeBeginEffect = new Effect(30, cons(e => {
    Draw.color(iceBlue);
    Fill.circle(e.x, e.y, 2 + 5 * e.fin());
    Draw.color(Color.white);
    Fill.circle(e.x, e.y, 1 + 3 * e.fin());
}));
icy.chargeEffect = new Effect(18, cons(e => {
    Draw.color(iceBlue, Color.white, e.fin() + 0.2);
    Angles.randLenVectors(e.id, 4, 25 * e.fout(), new Floatc2({
        get(x, y) {
            Fill.circle(e.x + x, e.y + y, 0.5 + 2 * e.fin())
        }
    }));
}));