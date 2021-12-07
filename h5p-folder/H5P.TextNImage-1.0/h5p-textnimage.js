H5P.TextNImage = (function ($) {
    function TextNImage(params, id) {
        this.id = id;
        H5P.EventDispatcher.call(this);
        this.params = $.extend({}, {
            sideImage: null,
            sideToggle: null
        }, params);
        overlayOn = true;
        this.content = H5P.newRunnable(this.params.content, id);
    }

    TextNImage.prototype = Object.create(H5P.EventDispatcher.prototype);
    TextNImage.prototype.constructor = TextNImage;

    TextNImage.prototype.attach = function ($container) {
        var self = this;

        function toggleOverlay() {
            if (overlayOn) {
                // console.log('remove text');
                overlayOn = false;
                $text.css('display', 'none');
                self.trigger('loaded');
            } else {
                // console.log('add text back')
                overlayOn = true;
                $text.css('display', 'block');
                self.trigger('loaded');
            }
        }

        // image on page
        var $image = $('<img>', {
            'class': self.params.iconToggle ? 'h5p-textnimage-icon' : 'h5p-textnimage-image',
            'src': H5P.getPath(self.params.sideImage.path, self.id),
            'alt': self.params.altText,
            'tabindex': self.params.expandToggle ? 0 : -1,
            'on': {
                'load': function () {
                    self.trigger('loaded'); 
                },
                'click': self.params.expandToggle && toggleOverlay, // i love javascript
                'keydown': function (event) {
                    switch(event.keyCode) {
                        case 32:
                        case 13:
                            self.params.expandToggle && toggleOverlay()
                        default:
                            break;
                    }
                }
            }
        });
        // again, i love javascript
        self.params.expandToggle && $image.addClass('h5p-textnimage-image-button');

        // text
        var $text = $('<div>', {
            'class': 'h5p-textnimage-text'
        });
        self.content.attach($text);

        var left = self.params.sideToggle;
        /*
        // image overlay
        var $overlay = $('<div>', {
            'class': 'h5p-textnimage-overlay',
            'html': '<img class="h5p-textnimage-overlay-image" src="' 
                    + H5P.getPath(self.params.sideImage.path, self.id) 
                    + '">',
            'on': {
                'click': toggleOverlay
            }
        });
        */
        

        // put it all together
        var $wrapper = $('<div>', {
            'class': 'h5p-textnimage-wrapper',
            
        }).append($text).append($image);
        left ? $wrapper.css('flex-direction', 'row') : $wrapper.css('flex-direction', 'row-reverse');

        $container.addClass('h5p-textnimage').append($wrapper);
    };

    return TextNImage;
})(H5P.jQuery);