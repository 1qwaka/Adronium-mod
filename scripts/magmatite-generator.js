const magmatiteGenerator = extend(SingleTypeGenerator , "magmatite-generator", {
    load(){
        this.super$load();
        this.topRegion = Core.atlas.find(this.name+"-rotator");
    },
    icons(){
        return [
            Core.atlas.find(this.name),
            Core.atlas.find(this.name+"-rotator")
        ]
    }
});

magmatiteGenerator.buildType = prov(() => extend(ItemLiquidGenerator.ItemLiquidGeneratorBuild , magmatiteGenerator, {
    draw(){
        Draw.rect(this.block.region,this.x,this.y);
        Drawf.liquid(this.block.liquidRegion, this.x, this.y, this.liquids.total() / this.block.liquidCapacity, this.liquids.current().color);
        Draw.rect(this.block.topRegion,this.x,this.y,this.totalTime*2.0);
    }
}));