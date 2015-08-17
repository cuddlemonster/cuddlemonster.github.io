function TentacleSegment(parent, depth, length) {
    this.parent = parent;
    this.parent.child = this;
    this.depth = depth;

    this.position = { x: 0, y: 0 };
    this.angle = parent.angle;
    this.length = length;
    this.angMomentum = 0;
    this.time = new Date();
}

TentacleSegment.prototype.update = function(time) {
    if (this.child)
        this.child.angMomentum += this.angMomentum * 0.01;

    this.angMomentum *= 0.51;
    this.angMomentum += (this.parent.angle - this.angle) / 4;
    //this.angMomentum += Math.sin(this.depth * Math.PI/30 + time/250) * 0.02 * this.depth * this.depth;

    this.angle += this.angMomentum;
    this.position.x = this.parent.position.x + Math.cos(this.angle + this.parent.angle) * this.length;
    this.position.y = this.parent.position.y + Math.sin(this.angle + this.parent.angle) * this.length;

    if (this.child)
        this.child.update(time);
};

TentacleSegment.prototype.render = function(time, ctx) {
    ctx.beginPath();
    ctx.moveTo(this.parent.position.x, this.parent.position.y);
    ctx.lineTo(this.position.x, this.position.y);
    ctx.lineWidth = 20 - 18.0*this.depth;
    ctx.lineCap = 'round';
    ctx.stroke();

    if (this.child) {
        ctx.lineTo(this.child.position.x, this.child.position.y);
        this.child.render(time, ctx);
    }
};

function Tentacle(segCount, width, length, index) {
    this.index = index;
    this.length = 0;
    this.width = width;
    this.angle = Math.PI/4;
    this.position = { x: 0, y: 0 };
    this.root = new TentacleSegment(this, 0, 20);

    var seg1 = this.root;
    for (var i = 0; i < segCount; i++) {
        seg1 = new TentacleSegment(seg1, i/segCount, length/segCount);
    }
}


Tentacle.prototype.render = function (time, ctx) {
    var time2 = time/2;
    this.angle = (2*Math.sin(time2/90 + this.index*1.323) + Math.sin(time2/633 + this.index*1.323) * Math.cos(time2/200 + this.index*0.723)) * Math.PI/12 + Math.PI/4;
    this.root.update(time2);

    ctx.strokeStyle = this.index % 2 == 0 ? '#4A5F6D' : '#596C79';
    this.root.render(time2, ctx);
};
