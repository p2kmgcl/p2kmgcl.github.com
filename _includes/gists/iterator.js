
function Iterator (params) {
    'use strict';

    params = params || {};
    this.begin = params.begin || 0;
    this.end = params.end || Infinity;
    this.step = params.step || 1;
    this.positive = (typeof params.positive === 'boolean') ? params.positive : true;
    
    this.value = this.begin;
}

Iterator.prototype = {
    go: function () {
        'use strict';
        if (this.positive) {
            this.value += this.step;
            if (this.value > this.end) {
                this.value = this.begin;
            }
        } else {
            this.value -= this.step;
            if (this.value < this.end) {
                this.value = this.begin;
            }
        }

        return this.value;
    },

    before: function () {
        'use strict';
        return (this.positive) ?
        (this.value <= this.begin) ?
        this.end : (this.value - this.step)
        :
        (this.value >= this.end) ?
        this.begin : (this.value + this.step);
    },

    current: function () {
        'use strict';
        return this.value;
    },

    next: function () {
        'use strict';
        return (this.positive) ?
        (this.value >= this.end) ?
        this.begin : (this.value + this.step)
        :
        (this.value <= this.end) ?
        this.begin : (this.value + this.step);
    }
};