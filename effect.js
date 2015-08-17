$(document).ready(function() {

    var tentacles = [];
    function init() {
        var w = $(window).width();
        var h = $(window).height();
        var s = w > h ? w : h;

        for (var i = 0; i < 8; i++)
            tentacles.push(new Tentacle(50, 30, Math.random() * s/8 + s/8, i));

        window.requestAnimationFrame(draw);
    }

    var start = new Date();

    function psin(a) {
        return Math.sin(a)*0.5 + 0.5;
    }

    function draw() {
        var canvas = document.getElementById('c');
        var w = $(window).width();
        var h = $(window).height();
        var s = w > h ? w : h;
        var s2 = w < h ? w : h;

        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);

        var ctx = canvas.getContext('2d');

        var time = new Date() - start;
        var d = time/20;
        var t = (d % 1000)/1000
        var cx = w / 2;
        var cy = h / 2;
        var radius = 100;
        var count = 10;

        //ctx.globalCompositeOperation = 'destination-over';
        ctx.clearRect(0, 0, w, h); // clear canvas

        for (var i = 0; i < count; i++) {
            var a = i/count;
            var r = (a * s + d) % s;
            var rr = 1/r * 100000;

            ctx.beginPath();
            ctx.moveTo(cx, cy-rr);
            ctx.lineTo(cx+rr, cy);
            ctx.lineTo(cx, cy+rr);
            ctx.lineTo(cx-rr, cy);
            ctx.closePath();

            ctx.lineWidth = 20-(r/s)*20;
            // ctx.strokeStyle = 'rgba(74, 95, 109, '+(1-r/s)+')';
            ctx.strokeStyle = 'rgba(133, 239, 230, '+(1-r/s)+')';
            ctx.stroke();
        }

        var logo = $('#logo');
        var wa = (count * d % s)/s / 2;
        var lw = s2/2;
        logo.css('left', (w/2 - lw/2) + 'px');
        logo.css('top', (h/2 - lw/2) + 'px');
        logo.css('width', lw);
        logo.css('height', lw);

        var logoText = $('#logo-text');
        lw = s2/2;
        logoText.css('left', (w/2 - lw/2) + 'px');
        logoText.css('top', (h/2 - lw/2) + 'px');
        logoText.css('width', lw);
        logoText.css('height', lw);

        for (var t in tentacles) {
            var tentacle = tentacles[t];
            tentacle.position = { x: cx + Math.cos(t/tentacles.length*Math.PI*2) * 15, y: cy + Math.sin(t/tentacles.length*Math.PI*2) * 15 };
            tentacle.render(time, ctx, t);
        }


        window.requestAnimationFrame(draw);
    }

    init();
});
