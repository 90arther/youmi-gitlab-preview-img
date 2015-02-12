// Copyright (c) 2015 90arther@gmail.com. All rights reserved.
/*
 * constructor:
 *  |- dom      document element.
 *  |- init     initialize.
 *  |- create   create element for dom.
 *
 ***************************************************************/


YOUMIGITLABPREVIEW = {

    dom : {
        btnOpen : null,
        overlay : null,
        img     : null,
        btnClose: null
    },


    // initial, include modify style and element.
    init: function(){


        var self = this;

        // create a button for open preview dialog.
        // a overlay for over the original page.
        // a img for preview.
        // a button for close the dialog.
        // bind element with handler.
        self.dom.btnOpen    = self.createBtnOpen();
        self.dom.overlay    = self.createOverLay();
        self.dom.img        = self.createImg();
        self.dom.btnClose   = self.createBtnClose();


        self.initialEventHandler();

    },


    // create a button for open preview dialog.
    createBtnOpen : function() {

        var self = this;

        // filter all img from page and add button to all item.
        $('img').filter('.note-image-attach').each(function(){

            $(this).parent().append('<span class="youmiGitlabNote-btn "'+
                                    'data-src="' + $(this).attr('src')+'"'+
                                    'data-imgwidth="' + $(this)[0].naturalWidth+'"'+
                                    '>点击预览效果</span>')
        });

        return $('.youmiGitlabNote');

    },


    // creat overlay.
    // invoke self.create to create a element used for overlay.
    createOverLay : function() {

        var self = this;

        var element = self.create("div", {
            styles: {
                display: "none",
                width: "100%",
                backgroundColor: "#000",
                opacity: 0.85,
                position: "fixed",
                zIndex: 100,
                left: 0,
                top: 0,
                bottom: 0
            }
        });
        document.body.appendChild(element);
        return {
            ele: element,
            display: false,
            show: function() {
                element.style.display = "block";
                this.display = true;
                return this;
            },
            hide: function() {
                element.style.display = "none";
                this.display = false;
                return this;
            }
        };

    },


    // Return object.
    createImg : function() {

        var self = this;

        var element = self.create("img", {
            styles: {
                display: "none",
                position: "fixed",
                left: 0,
                top: 0,
                width: 'auto',
                height: 'auto',
                zIndex: 101,
                cursor: 'move'
            }
        });
        element.id = "draggable";
        document.body.appendChild(element);
        return {
            ele: element,
            display: false,
            show: function() {
                element.style.display = "inline-block";
                this.display = true;
                return this;
            },
            hide: function() {
                element.style.display = "none";
                this.display = false;
                return this;
            }
        }

    },


    // create btnClose
    createBtnClose : function() {

        var self = this;

        var element = self.create("div");
        element.setAttribute("id", "btnCloseYoumiPreview");
        element.className = 'youmiGitlabNote-btnClose';
        element.innerHTML = "&times;"
        document.body.appendChild(element);
        return {
            ele: element,
            display: false,
            show: function() {
                element.style.display = "block";
                this.display = true;
                return this;
            },
            hide: function() {
                element.style.display = "none";
                this.display = false;
                return this;
            }
        };

    },

    initialEventHandler : function() {

        var self = this;

        // enable the img drag handler.
        $('#draggable').draggable();


        $('.youmiGitlabNote-btn').on('click', function(){


            // reset preview img
            self.resetPreviewImg($(this));

            // toggle preview element
            self.togglePreview();

            // 关闭默认的下载
            return false;

        });


        $('#btnCloseYoumiPreview').on('click', function(){

            self.togglePreview();

        });

    },


    togglePreview : function(){

        var self = this;

        self.dom.overlay[self.dom.overlay.display? "hide":"show"]();
        self.dom.img[self.dom.img.display? "hide":"show"]();
        self.dom.btnClose[self.dom.btnClose.display? "hide":"show"]();

    },


    resetPreviewImg: function(button) {

        var self = this;

        self.dom.img.ele.src = button.data('src');

        self.dom.img.ele.style.left = document.body.clientWidth/2 - button.data('imgwidth')/2 + 'px';
        self.dom.img.ele.style.top = 0 + 'px';

    },


    /**
     * @param {string} tagName - tagName for create a element in body.
     * @param {object} attr - element attr, including style.
     */
    create : function(tagName, attr) {
        var element = null;
        if (typeof tagName === "string") {
            element = document.createElement(tagName);

            if (typeof attr === "object") {
                var keyAttr, keyStyle;
                for (keyAttr in attr) {
                    if (keyAttr === "styles" && typeof attr[keyAttr] === "object") {
                        // 样式们
                        for (keyStyle in attr[keyAttr]) {
                            element.style[keyStyle]    = attr[keyAttr][keyStyle];

                            if (keyStyle === "opacity" && window.innerWidth + "" == "undefined") {
                                element.style.filter = "alpha(opacity="+ (attr[keyAttr][keyStyle] * 100) +")";
                            }
                        }
                    } else {
                        if (keyAttr === "class") {
                            keyAttr = "className";
                        }
                        element[keyAttr] = attr["class"];
                    }

                }
            }
        }
        return element;
    }

    // code your api here.

}

$(document).ready(function() {

    YOUMIGITLABPREVIEW.init();

});
