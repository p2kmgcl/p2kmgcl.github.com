```javascript
var Timer = (function () {
    var MAX_FPS = 60,
        MIN_DELTA = 1 / MAX_FPS;

    function Timer () {
        this.last = new Date();
        this.now = null;
    }
    
    /**
     * Obtiene la diferencia de tiempo entre
     * la última llamada y la actual.
     * Cuidado, aunque la página actual no esté
     * activa el contador seguirá su curso, es
     * recomendable refrescarlo cuando la página
     * vuelva a activarse con getDeltaTime()
     */
    Timer.prototype.getDeltaTime = function () {
        this.now = new Date();
        
        var now = this.now.getTime(),
            last = this.last.getTime(),
            time = (now - last) / 1000;
        
        this.last = this.now;
        return Math.max(time, MIN_DELTA);
    };
    
    return Timer;
}());
```

```javascript
var t1 = new Timer();
t1.getDeltaTime();
```
