/**
 * multicard module
 * based on the accordion module: https://github.com/h5p/h5p-accordion/blob/master/h5p-accordion.js
 * @param {jQuery} $
 */
H5P.Multicard = (function ($) {
    /**
     * multicard constructor
     * @extends H5p.EventDispatcher
     * @param {Object} params parametres that come directly from semantics.json
     * @param {Number} id identifier
     */
    function Multicard(params, id) {
        this.id = id;
        H5P.EventDispatcher.call(this);

        this.params = $.extend({}, {
            cards: []
        }, params);

        this.instances = [];
        for (var i = 0; i < this.params.cards.length; ++i) {
            this.instances[i] = H5P.newRunnable(this.params.cards[i].content, id);

            // this.on('resize', function (event) {
            //     this.instances[i].trigger('resize', event);
            // });
        }
    }

    Multicard.prototype = Object.create(H5P.EventDispatcher.prototype);
    Multicard.prototype.constructor = Multicard;

    /**
     * append to the wrapper
     * @param {jQuery} $container the object to attach to
     */
    Multicard.prototype.attach = function ($container) {
        var self = this;

        if (self.$titles === undefined && self.$descrp === undefined) {
            self.titles = [];
            self.descrp = [];
            for (var i = 0; i < self.params.cards.length; ++i) {
                self.createCard(i);
            }
            self.$titles = $('<nav>', {
                'class': 'h5p-card-titles',
                'aria-label': 'Multicard, Navigate to each card through each button.'
            }).append($(self.titles));
            self.$descrp = $('<div>', {
                'class': 'h5p-card-cards'
            }).append($(self.descrp));
        }

        $container.addClass('h5p-multicard').append(self.$titles).append(self.$descrp);
    };

    /**
     * create the HTML for the cards
     * @param {number} id
     */
    Multicard.prototype.createCard = function (id) {
        var self = this;

        // local fn
        var toggleSwap = function () {
            self.closeOtherCards();
            self.openCard($title, $content);
        };

        // make title, button
        var $title = $('<button>', {
            'class': 'h5p-card-title',
            'html': '<h3>' + self.params.cards[id].title + '</h3>',
            'on': {
                'click': toggleSwap
            }
        });

        // make content
        var $content = $('<div>', {
            'class': 'h5p-card-content',
            'role': 'region'
        });
        // attach it
        self.instances[id].attach($content);

        // start with the first
        if (id !== 0) {
            $content.hide();
        } else {
            $title.addClass('h5p-open-card');
            self.$openTitle = $title;
            self.$openCard = $content;
        }

        // gather it up
        self.titles.push($title[0]);
        self.descrp.push($content[0]);
    };

    // opens up card
    Multicard.prototype.openCard = function ($title, $content) {
        var self = this;
        $title.addClass('h5p-open-card');
        $content.show();
        self.trigger('resize');
        self.$openTitle = $title;
        self.$openCard = $content;
    };

    // closed the open card
    Multicard.prototype.closeOtherCards = function () {
        var self = this;
        if (this.$openTitle !== undefined) {
            this.$openTitle.removeClass('h5p-open-card');
        }
        if (this.$openCard !== undefined) {
            this.$openCard.hide();
            self.trigger('resize');
        }
    };

    return Multicard;
})(H5P.jQuery);