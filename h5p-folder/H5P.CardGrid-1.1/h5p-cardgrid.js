/**
 * cardgrid module
 * based on the accordion module: https://github.com/h5p/h5p-accordion/blob/master/h5p-accordion.js
 * @param {jQuery} $
 */
 H5P.CardGrid = (function ($) {
    /**
     * multicard @constructor
     * @extends H5P.EventDispatcher
     * @param {Object} params parametres that come directly from semantics.json
     * @param {Number} id identifier
     */
    function CardGrid(params, id) {
        this.id = id;
        H5P.EventDispatcher.call(this);

        this.params = $.extend({}, {
            title: [],
            cards: []
        }, params);

        this.instances = [];
        for (var i = 0; i < this.params.cards.length; ++i) {
            this.instances[i] = H5P.newRunnable(this.params.cards[i].content, id);
        }
    }

    CardGrid.prototype = Object.create(H5P.EventDispatcher.prototype);
    CardGrid.prototype.constructor = CardGrid;

    /**
     * append to the wrapper
     * @param {jQuery} $container the object to attach to
     */
     CardGrid.prototype.attach = function ($container) {
        var self = this;

        if (self.$elements === undefined) {
            cards = [];
            for (var j = 0; j < self.params.cards.length; ++j) {
                cards[j] = document.createElement('button');
                cards[j].classList.add('h5p-cardgrid-card');

                let front = document.createElement('h3');
                front.innerHTML = self.params.cards[j].title;

                // have to use jQuery for H5P reasons
                let back = $(document.createElement('div'));
                back.innerHTML = 'inside';
                self.instances[j].attach(back);

                cards[j].appendChild(front);
                
                // why does the "this" keyword exist -_-
                function swap () {
                    this.getElementsByTagName('h3').length ? 
                        this.replaceChild(back[0], front) :
                        this.replaceChild(front, back[0]);
                    self.trigger('resize');
                }

                cards[j].onclick = swap;
            }

            self.$elements = $('<div>', {
                'class': 'h5p-cardgrid'
            }).append($(cards));
        }

        $container.addClass('h5p-cardgrid').append(self.$elements);
    };

    
    return CardGrid;
})(H5P.jQuery);