/*jslint evil: true, indent: 4 */
/**
    WYMeditor
    =========

    version 1.0.0a3

    WYMeditor : what you see is What You Mean web-based editor

    Main JS file with core classes and functions.

    Copyright
    ---------

    Copyright (c) 2005 - 2010 Jean-Francois Hovinne, http://www.wymeditor.org/
    Dual licensed under the MIT (MIT-license.txt)
    and GPL (GPL-license.txt) licenses.

    Website
    -------

    For further information visit:
    http://www.wymeditor.org/


    Authors
    -------

    See AUTHORS file
*/

// Global WYMeditor namespace.
if (typeof (WYMeditor) === 'undefined') {
    WYMeditor = {};
}

// Wrap the Firebug console in WYMeditor.console
(function () {
    if (!window.console || !window.console.firebug) {
        var names = [
                "log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
                "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile",
                "profileEnd"
            ],
            noOp = function () {},
            i;

        WYMeditor.console = {};
        for (i = 0; i < names.length; i += 1) {
            WYMeditor.console[names[i]] = noOp;
        }

    } else {
        WYMeditor.console = window.console;
    }
}());

jQuery.extend(WYMeditor, {

/**
    Constants
    =========

    Global WYMeditor constants.

    VERSION             - Defines WYMeditor version.
    INSTANCES           - An array of loaded WYMeditor.editor instances.
    STRINGS             - An array of loaded WYMeditor language pairs/values.
    SKINS               - An array of loaded WYMeditor skins.
    NAME                - The "name" attribute.
    INDEX               - A string replaced by the instance index.
    WYM_INDEX           - A string used to get/set the instance index.
    BASE_PATH           - A string replaced by WYMeditor's base path.
    SKIN_PATH           - A string replaced by WYMeditor's skin path.
    WYM_PATH            - A string replaced by WYMeditor's main JS file path.
    SKINS_DEFAULT_PATH  - The skins default base path.
    SKINS_DEFAULT_CSS   - The skins default CSS file.
    LANG_DEFAULT_PATH   - The language files default path.
    IFRAME_BASE_PATH    - A string replaced by the designmode iframe's base path.
    IFRAME_DEFAULT      - The iframe's default base path.
    JQUERY_PATH         - A string replaced by the computed jQuery path.
    DIRECTION           - A string replaced by the text direction (rtl or ltr).
    LOGO                - A string replaced by WYMeditor logo.
    TOOLS               - A string replaced by the toolbar's HTML.
    TOOLS_ITEMS         - A string replaced by the toolbar items.
    TOOL_NAME           - A string replaced by a toolbar item's name.
    TOOL_TITLE          - A string replaced by a toolbar item's title.
    TOOL_CLASS          - A string replaced by a toolbar item's class.
    CLASSES             - A string replaced by the classes panel's HTML.
    CLASSES_ITEMS       - A string replaced by the classes items.
    CLASS_NAME          - A string replaced by a class item's name.
    CLASS_TITLE         - A string replaced by a class item's title.
    CONTAINERS          - A string replaced by the containers panel's HTML.
    CONTAINERS_ITEMS    - A string replaced by the containers items.
    CONTAINER_NAME      - A string replaced by a container item's name.
    CONTAINER_TITLE     - A string replaced by a container item's title.
    CONTAINER_CLASS     - A string replaced by a container item's class.
    HTML                - A string replaced by the HTML view panel's HTML.
    IFRAME              - A string replaced by the designmode iframe.
    STATUS              - A string replaced by the status panel's HTML.
    DIALOG_TITLE        - A string replaced by a dialog's title.
    DIALOG_BODY         - A string replaced by a dialog's HTML body.
    BODY                - The BODY element.
    STRING              - The "string" type.
    BODY,DIV,P,
    H1,H2,H3,H4,H5,H6,
    PRE,BLOCKQUOTE,
    A,BR,IMG,
    TABLE,TD,TH,
    UL,OL,LI            - HTML elements string representation.
    CLASS,HREF,SRC,
    TITLE,REL,ALT       - HTML attributes string representation.
    DIALOG_LINK         - A link dialog type.
    DIALOG_IMAGE        - An image dialog type.
    DIALOG_TABLE        - A table dialog type.
    DIALOG_PASTE        - A 'Paste from Word' dialog type.
    BOLD                - Command: (un)set selection to <strong>.
    ITALIC              - Command: (un)set selection to <em>.
    CREATE_LINK         - Command: open the link dialog or (un)set link.
    INSERT_IMAGE        - Command: open the image dialog or insert an image.
    INSERT_TABLE        - Command: open the table dialog.
    PASTE               - Command: open the paste dialog.
    INDENT              - Command: nest a list item.
    OUTDENT             - Command: unnest a list item.
    TOGGLE_HTML         - Command: display/hide the HTML view.
    FORMAT_BLOCK        - Command: set a block element to another type.
    PREVIEW             - Command: open the preview dialog.
    UNLINK              - Command: unset a link.
    INSERT_UNORDEREDLIST- Command: insert an unordered list.
    INSERT_ORDEREDLIST  - Command: insert an ordered list.
    MAIN_CONTAINERS     - An array of the main HTML containers used in WYMeditor.
    BLOCKS              - An array of the HTML block elements.
    KEY                 - Standard key codes.
    NODE                - Node types.

*/

    VERSION             : "1.0.0a3",
    INSTANCES           : [],
    STRINGS             : [],
    SKINS               : [],
    NAME                : "name",
    INDEX               : "{Wym_Index}",
    WYM_INDEX           : "wym_index",
    BASE_PATH           : "{Wym_Base_Path}",
    CSS_PATH            : "{Wym_Css_Path}",
    WYM_PATH            : "{Wym_Wym_Path}",
    SKINS_DEFAULT_PATH  : "skins/",
    SKINS_DEFAULT_CSS   : "skin.css",
    SKINS_DEFAULT_JS    : "skin.js",
    LANG_DEFAULT_PATH   : "lang/",
    IFRAME_BASE_PATH    : "{Wym_Iframe_Base_Path}",
    IFRAME_DEFAULT      : "iframe/default/",
    JQUERY_PATH         : "{Wym_Jquery_Path}",
    DIRECTION           : "{Wym_Direction}",
    LOGO                : "{Wym_Logo}",
    TOOLS               : "{Wym_Tools}",
    TOOLS_ITEMS         : "{Wym_Tools_Items}",
    TOOL_NAME           : "{Wym_Tool_Name}",
    TOOL_TITLE          : "{Wym_Tool_Title}",
    TOOL_CLASS          : "{Wym_Tool_Class}",
    CLASSES             : "{Wym_Classes}",
    CLASSES_ITEMS       : "{Wym_Classes_Items}",
    CLASS_NAME          : "{Wym_Class_Name}",
    CLASS_TITLE         : "{Wym_Class_Title}",
    CONTAINERS          : "{Wym_Containers}",
    CONTAINERS_ITEMS    : "{Wym_Containers_Items}",
    CONTAINER_NAME      : "{Wym_Container_Name}",
    CONTAINER_TITLE     : "{Wym_Containers_Title}",
    CONTAINER_CLASS     : "{Wym_Container_Class}",
    HTML                : "{Wym_Html}",
    IFRAME              : "{Wym_Iframe}",
    STATUS              : "{Wym_Status}",
    DIALOG_TITLE        : "{Wym_Dialog_Title}",
    DIALOG_BODY         : "{Wym_Dialog_Body}",
    NEWLINE             : "\n",
    STRING              : "string",
    BODY                : "body",
    DIV                 : "div",
    P                   : "p",
    H1                  : "h1",
    H2                  : "h2",
    H3                  : "h3",
    H4                  : "h4",
    H5                  : "h5",
    H6                  : "h6",
    PRE                 : "pre",
    BLOCKQUOTE          : "blockquote",
    A                   : "a",
    BR                  : "br",
    IMG                 : "img",
    TABLE               : "table",
    TR                  : "tr",
    TD                  : "td",
    TH                  : "th",
    UL                  : "ul",
    OL                  : "ol",
    LI                  : "li",
    CLASS               : "class",
    HREF                : "href",
    SRC                 : "src",
    TITLE               : "title",
    REL                 : "rel",
    ALT                 : "alt",
    DIALOG_LINK         : "Link",
    DIALOG_IMAGE        : "Image",
    DIALOG_TABLE        : "Table",
    DIALOG_PASTE        : "Paste_From_Word",
    BOLD                : "Bold",
    ITALIC              : "Italic",
    CREATE_LINK         : "CreateLink",
    INSERT_IMAGE        : "InsertImage",
    INSERT_TABLE        : "InsertTable",
    INSERT_HTML         : "InsertHTML",
    PASTE               : "Paste",
    INDENT              : "Indent",
    OUTDENT             : "Outdent",
    TOGGLE_HTML         : "ToggleHtml",
    FORMAT_BLOCK        : "FormatBlock",
    PREVIEW             : "Preview",
    UNLINK              : "Unlink",
    INSERT_UNORDEREDLIST: "InsertUnorderedList",
    INSERT_ORDEREDLIST  : "InsertOrderedList",

    MAIN_CONTAINERS : ["p",  "h1",  "h2",  "h3", "h4", "h5", "h6", "pre", "blockquote"],

    BLOCKS : ["address", "blockquote", "div", "dl",
        "fieldset", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr",
        "noscript", "ol", "p", "pre", "table", "ul", "dd", "dt",
        "li", "tbody", "td", "tfoot", "th", "thead", "tr"],

    BLOCKING_ELEMENTS : ["table", "blockquote", "pre"],

    NON_BLOCKING_ELEMENTS : ["p", "h1", "h2", "h3", "h4", "h5", "h6"],

    KEY : {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        CTRL: 17,
        END: 35,
        HOME: 36,
        CURSOR: [37, 38, 39, 40],
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46,
        B: 66,
        I: 73,
        R: 82,
        COMMAND: 224
    },

    NODE : {
        ELEMENT: 1,
        ATTRIBUTE: 2,
        TEXT: 3
    },

    /**
        WYMeditor.editor
        ================

        WYMeditor editor main class, instantiated for each editor occurrence.

        See also: WYMeditor.editor.init

        Use
        ---

        Initializes main values (index, elements, paths, ...)
        and calls WYMeditor.editor.init which initializes the editor.

        ### Parameters

        elem - The HTML element to be replaced by the editor.

        options - The hash of options.

        ### Returns

        Nothing.

    */
    editor : function (elem, options) {
        // Store the instance in the INSTANCES array and store the index
        this._index = WYMeditor.INSTANCES.push(this) - 1;
        // The element replaced by the editor
        this._element = elem;
        this._options = options;
        // Store the element's inner value
        this._html = jQuery(elem).val();

        if (this._options.html) {
            this._html = this._options.html;
        }
        // Path to the WYMeditor core
        this._options.wymPath = this._options.wymPath ||
            WYMeditor.computeWymPath();
        // Path to the main JS files
        this._options.basePath = this._options.basePath ||
            WYMeditor.computeBasePath(this._options.wymPath);
        // Path to jQuery (for loading in pop-up dialogs)
        this._options.jQueryPath = this._options.jQueryPath ||
            WYMeditor.computeJqueryPath();
        // Path to skin files
        this._options.skinPath = this._options.skinPath ||
            this._options.basePath + WYMeditor.SKINS_DEFAULT_PATH + this._options.skin + '/';
        // Path to the language files
        this._options.langPath = this._options.langPath ||
            this._options.basePath + WYMeditor.LANG_DEFAULT_PATH;
        // The designmode iframe's base path
        this._options.iframeBasePath = this._options.iframeBasePath ||
            this._options.basePath + WYMeditor.IFRAME_DEFAULT;

        // Initialize the editor instance
        this.init();
    }
});


/********** jQuery Plugin Definition **********/

/**
    wymeditor
    =========

    jQuery plugin function for replacing an HTML element with a WYMeditor
    instance.

    Example
    -------

    `jQuery(".wymeditor").wymeditor({});`
*/
jQuery.fn.wymeditor = function (options) {

    options = jQuery.extend({

        html:       "",
        basePath:   false,
        skinPath:    false,
        wymPath:    false,
        iframeBasePath: false,
        jQueryPath: false,
        styles: false,
        stylesheet: false,
        skin:       "default",
        initSkin:   true,
        loadSkin:   true,
        lang:       "en",
        direction:  "ltr",
        customCommands: [],
        boxHtml: String() +
            "<div class='wym_box'>" +
                "<div class='wym_area_top'>" +
                    WYMeditor.TOOLS +
                "</div>" +
                "<div class='wym_area_left'></div>" +
                "<div class='wym_area_right'>" +
                    WYMeditor.CONTAINERS +
                    WYMeditor.CLASSES +
                "</div>" +
                "<div class='wym_area_main'>" +
                    WYMeditor.HTML +
                    WYMeditor.IFRAME +
                    WYMeditor.STATUS +
                "</div>" +
                "<div class='wym_area_bottom'>" +
                    WYMeditor.LOGO +
                "</div>" +
            "</div>",

        logoHtml: String() +
            '<a class="wym_wymeditor_link" ' +
                'href="http://www.wymeditor.org/">WYMeditor</a>',

        iframeHtml: String() +
            '<div class="wym_iframe wym_section">' +
                '<iframe src="' + WYMeditor.IFRAME_BASE_PATH + 'wymiframe.html" ' +
                    'onload="this.contentWindow.parent.WYMeditor.INSTANCES[' +
                        WYMeditor.INDEX + '].initIframe(this)">' +
                '</iframe>' +
            "</div>",

        editorStyles: [],
        toolsHtml: String() +
            '<div class="wym_tools wym_section">' +
                '<h2>{Tools}</h2>' +
                '<ul>' +
                    WYMeditor.TOOLS_ITEMS +
                '</ul>' +
            '</div>',

        toolsItemHtml: String() +
            '<li class="' + WYMeditor.TOOL_CLASS + '">' +
                '<a href="#" name="' + WYMeditor.TOOL_NAME + '"' +
                        'title="' + WYMeditor.TOOL_TITLE + '">' +
                    WYMeditor.TOOL_TITLE +
                '</a>' +
            '</li>',

        toolsItems: [
            {'name': 'Bold', 'title': 'Strong', 'css': 'wym_tools_strong'},
            {'name': 'Italic', 'title': 'Emphasis', 'css': 'wym_tools_emphasis'},
            {'name': 'Superscript', 'title': 'Superscript',
                'css': 'wym_tools_superscript'},
            {'name': 'Subscript', 'title': 'Subscript',
                'css': 'wym_tools_subscript'},
            {'name': 'InsertOrderedList', 'title': 'Ordered_List',
                'css': 'wym_tools_ordered_list'},
            {'name': 'InsertUnorderedList', 'title': 'Unordered_List',
                'css': 'wym_tools_unordered_list'},
            {'name': 'Indent', 'title': 'Indent', 'css': 'wym_tools_indent'},
            {'name': 'Outdent', 'title': 'Outdent', 'css': 'wym_tools_outdent'},
            {'name': 'Undo', 'title': 'Undo', 'css': 'wym_tools_undo'},
            {'name': 'Redo', 'title': 'Redo', 'css': 'wym_tools_redo'},
            {'name': 'CreateLink', 'title': 'Link', 'css': 'wym_tools_link'},
            {'name': 'Unlink', 'title': 'Unlink', 'css': 'wym_tools_unlink'},
            {'name': 'InsertImage', 'title': 'Image', 'css': 'wym_tools_image'},
            {'name': 'InsertTable', 'title': 'Table', 'css': 'wym_tools_table'},
            {'name': 'Paste', 'title': 'Paste_From_Word',
                'css': 'wym_tools_paste'},
            {'name': 'ToggleHtml', 'title': 'HTML', 'css': 'wym_tools_html'},
            {'name': 'Preview', 'title': 'Preview', 'css': 'wym_tools_preview'}
        ],

        containersHtml: String() +
            '<div class="wym_containers wym_section">' +
                '<h2>{Containers}</h2>' +
                '<ul>' +
                    WYMeditor.CONTAINERS_ITEMS +
                '</ul>' +
            '</div>',

        containersItemHtml: String() +
            '<li class="' + WYMeditor.CONTAINER_CLASS + '">' +
                '<a href="#" name="' + WYMeditor.CONTAINER_NAME + '">' +
                    WYMeditor.CONTAINER_TITLE +
                '</a>' +
            '</li>',

        containersItems: [
            {'name': 'P', 'title': 'Paragraph', 'css': 'wym_containers_p'},
            {'name': 'H1', 'title': 'Heading_1', 'css': 'wym_containers_h1'},
            {'name': 'H2', 'title': 'Heading_2', 'css': 'wym_containers_h2'},
            {'name': 'H3', 'title': 'Heading_3', 'css': 'wym_containers_h3'},
            {'name': 'H4', 'title': 'Heading_4', 'css': 'wym_containers_h4'},
            {'name': 'H5', 'title': 'Heading_5', 'css': 'wym_containers_h5'},
            {'name': 'H6', 'title': 'Heading_6', 'css': 'wym_containers_h6'},
            {'name': 'PRE', 'title': 'Preformatted', 'css': 'wym_containers_pre'},
            {'name': 'BLOCKQUOTE', 'title': 'Blockquote',
                'css': 'wym_containers_blockquote'},
            {'name': 'TH', 'title': 'Table_Header', 'css': 'wym_containers_th'}
        ],

        classesHtml: String() +
            '<div class="wym_classes wym_section">' +
                '<h2>{Classes}</h2>' +
                '<ul>' +
                    WYMeditor.CLASSES_ITEMS +
                '</ul>' +
            '</div>',

        classesItemHtml: String() +
            '<li class="wym_classes_' + WYMeditor.CLASS_NAME + '">' +
                '<a href="#" name="' + WYMeditor.CLASS_NAME + '">' +
                    WYMeditor.CLASS_TITLE +
                '</a>' +
            '</li>',

        classesItems:      [],
        statusHtml: String() +
            '<div class="wym_status wym_section">' +
                '<h2>{Status}</h2>' +
            '</div>',

        htmlHtml: String() +
            '<div class="wym_html wym_section">' +
                '<h2>{Source_Code}</h2>' +
                '<textarea class="wym_html_val"></textarea>' +
            '</div>',

        boxSelector:        ".wym_box",
        toolsSelector:      ".wym_tools",
        toolsListSelector:  " ul",
        containersSelector: ".wym_containers",
        classesSelector:    ".wym_classes",
        htmlSelector:       ".wym_html",
        iframeSelector:     ".wym_iframe iframe",
        iframeBodySelector: ".wym_iframe",
        statusSelector:     ".wym_status",
        toolSelector:       ".wym_tools a",
        containerSelector:  ".wym_containers a",
        classSelector:      ".wym_classes a",
        htmlValSelector:    ".wym_html_val",

        hrefSelector:       ".wym_href",
        srcSelector:        ".wym_src",
        titleSelector:      ".wym_title",
        relSelector:        ".wym_rel",
        altSelector:        ".wym_alt",
        textSelector:       ".wym_text",

        rowsSelector:       ".wym_rows",
        colsSelector:       ".wym_cols",
        captionSelector:    ".wym_caption",
        summarySelector:    ".wym_summary",

        submitSelector:     "form",
        cancelSelector:     ".wym_cancel",
        previewSelector:    "",

        dialogTypeSelector:    ".wym_dialog_type",
        dialogLinkSelector:    ".wym_dialog_link",
        dialogImageSelector:   ".wym_dialog_image",
        dialogTableSelector:   ".wym_dialog_table",
        dialogPasteSelector:   ".wym_dialog_paste",
        dialogPreviewSelector: ".wym_dialog_preview",

        updateSelector:    ".wymupdate",
        updateEvent:       "click",

        dialogFeatures:    "menubar=no,titlebar=no,toolbar=no,resizable=no" +
            ",width=560,height=300,top=0,left=0",
        dialogFeaturesPreview: "menubar=no,titlebar=no,toolbar=no,resizable=no" +
            ",scrollbars=yes,width=560,height=300,top=0,left=0",

        dialogHtml: String() +
            '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
                    '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
            '<html dir="' + WYMeditor.DIRECTION + '">' +
                '<head>' +
                    '<link rel="stylesheet" type="text/css" media="screen" ' +
                        'href="' + WYMeditor.CSS_PATH + '" />' +
                    '<title>' + WYMeditor.DIALOG_TITLE + '</title>' +
                    '<script type="text/javascript" ' +
                        'src="' + WYMeditor.JQUERY_PATH + '"></script>' +
                    '<script type="text/javascript" ' +
                        'src="' + WYMeditor.WYM_PATH + '"></script>' +
                '</head>' +
                WYMeditor.DIALOG_BODY +
            '</html>',

        dialogLinkHtml: String() +
            '<body class="wym_dialog wym_dialog_link" ' +
                    ' onload="WYMeditor.INIT_DIALOG(' + WYMeditor.INDEX + ')">' +
                '<form>' +
                    '<fieldset>' +
                        '<input type="hidden" class="wym_dialog_type" ' +
                            'value="' + WYMeditor.DIALOG_LINK + '" />' +
                        '<legend>{Link}</legend>' +
                        '<div class="row">' +
                            '<label>{URL}</label>' +
                            '<input type="text" class="wym_href" value="" ' +
                                'size="40" autofocus="autofocus" />' +
                        '</div>' +
                        '<div class="row">' +
                            '<label>{Title}</label>' +
                            '<input type="text" class="wym_title" value="" ' +
                                'size="40" />' +
                        '</div>' +
                        '<div class="row">' +
                            '<label>{Relationship}</label>' +
                            '<input type="text" class="wym_rel" value="" ' +
                                'size="40" />' +
                        '</div>' +
                        '<div class="row row-indent">' +
                            '<input class="wym_submit" type="submit" ' +
                                'value="{Submit}" />' +
                            '<input class="wym_cancel" type="button" ' +
                                'value="{Cancel}" />' +
                        '</div>' +
                    '</fieldset>' +
                '</form>' +
            '</body>',

        dialogImageHtml: String() +
            '<body class="wym_dialog wym_dialog_image" ' +
                    'onload="WYMeditor.INIT_DIALOG(' + WYMeditor.INDEX + ')">' +
                '<form>' +
                    '<fieldset>' +
                        '<input type="hidden" class="wym_dialog_type" ' +
                            'value="' + WYMeditor.DIALOG_IMAGE + '" />' +
                        '<legend>{Image}</legend>' +
                        '<div class="row">' +
                            '<label>{URL}</label>' +
                            '<input type="text" class="wym_src" value="" ' +
                                'size="40" autofocus="autofocus" />' +
                        '</div>' +
                        '<div class="row">' +
                            '<label>{Alternative_Text}</label>' +
                            '<input type="text" class="wym_alt" value="" size="40" />' +
                        '</div>' +
                        '<div class="row">' +
                            '<label>{Title}</label>' +
                            '<input type="text" class="wym_title" value="" size="40" />' +
                        '</div>' +
                        '<div class="row row-indent">' +
                            '<input class="wym_submit" type="submit" ' +
                                'value="{Submit}" />' +
                            '<input class="wym_cancel" type="button" ' +
                                'value="{Cancel}" />' +
                        '</div>' +
                    '</fieldset>' +
                '</form>' +
            '</body>',

        dialogTableHtml: String() +
            '<body class="wym_dialog wym_dialog_table" ' +
                    'onload="WYMeditor.INIT_DIALOG(' + WYMeditor.INDEX + ')">' +
                '<form>' +
                    '<fieldset>' +
                        '<input type="hidden" class="wym_dialog_type" ' +
                            'value="' + WYMeditor.DIALOG_TABLE + '" />' +
                        '<legend>{Table}</legend>' +
                        '<div class="row">' +
                            '<label>{Caption}</label>' +
                            '<input type="text" class="wym_caption" value="" ' +
                                'size="40" />' +
                        '</div>' +
                        '<div class="row">' +
                            '<label>{Summary}</label>' +
                            '<input type="text" class="wym_summary" value="" ' +
                                'size="40" />' +
                        '</div>' +
                        '<div class="row">' +
                            '<label>{Number_Of_Rows}</label>' +
                            '<input type="text" class="wym_rows" value="3" size="3" />' +
                        '</div>' +
                        '<div class="row">' +
                            '<label>{Number_Of_Cols}</label>' +
                            '<input type="text" class="wym_cols" value="2" size="3" />' +
                        '</div>' +
                        '<div class="row row-indent">' +
                            '<input class="wym_submit" type="submit" ' +
                                'value="{Submit}" />' +
                            '<input class="wym_cancel" type="button" ' +
                                'value="{Cancel}" />' +
                        '</div>' +
                    '</fieldset>' +
                '</form>' +
            '</body>',

        dialogPasteHtml: String() +
            '<body class="wym_dialog wym_dialog_paste" ' +
                    'onload="WYMeditor.INIT_DIALOG(' + WYMeditor.INDEX + ')">' +
                '<form>' +
                    '<input type="hidden" class="wym_dialog_type" ' +
                        'value="' + WYMeditor.DIALOG_PASTE + '" />' +
                    '<fieldset>' +
                        '<legend>{Paste_From_Word}</legend>' +
                        '<div class="row">' +
                            '<textarea class="wym_text" rows="10" cols="50" ' +
                                'autofocus="autofocus"></textarea>' +
                        '</div>' +
                        '<div class="row">' +
                            '<input class="wym_submit" type="submit" ' +
                                'value="{Submit}" />' +
                            '<input class="wym_cancel" type="button" ' +
                                'value="{Cancel}" />' +
                        '</div>' +
                    '</fieldset>' +
                '</form>' +
            '</body>',

        dialogPreviewHtml: String() +
            '<body class="wym_dialog wym_dialog_preview" ' +
                'onload="WYMeditor.INIT_DIALOG(' + WYMeditor.INDEX + ')"></body>',

        dialogStyles: [],

        stringDelimiterLeft:  "{",
        stringDelimiterRight: "}",

        preInit: null,
        preBind: null,
        postInit: null,

        preInitDialog: null,
        postInitDialog: null

    }, options);

    return this.each(function () {
        // Assigning to _editor because the return value from new isn't
        // actually used, but we need to use new to properly change the
        // prototype
        var _editor = new WYMeditor.editor(jQuery(this), options);
    });
};

// Enable accessing of wymeditor instances via $.wymeditors
jQuery.extend({
    wymeditors: function (i) {
        return WYMeditor.INSTANCES[i];
    }
});

/**
    WYMeditor.computeWymPath
    ========================

    Get the relative path to the WYMeditor core js file for usage as
    a src attribute for script inclusion.

    Looks for script tags on the current page and finds the first matching
    src attribute matching any of these values:
    * jquery.wymeditor.pack.js
    * jquery.wymeditor.min.js
    * jquery.wymeditor.packed.js
    * jquery.wymeditor.js
    * /core.js
*/
WYMeditor.computeWymPath = function () {
    var script = jQuery(
        jQuery.grep(
            jQuery('script'),
            function (s) {
                if (!s.src) {
                    return null;
                }
                return (
                    s.src.match(
                        /jquery\.wymeditor(\.pack|\.min|\.packed)?\.js(\?.*)?$/
                    ) ||
                    s.src.match(
                            /\/core\.js(\?.*)?$/
                        )
                );
            }
        )
    );
    if (script.length > 0) {
        return script.attr('src');
    }
    // We couldn't locate the base path. This will break language loading,
    // dialog boxes and other features.
    WYMeditor.console.warn(
        "Error determining wymPath. No base WYMeditor file located."
    );
    WYMeditor.console.warn("Assuming wymPath to be the current URL");
    WYMeditor.console.warn("Please pass a correct wymPath option");

    // Guess that the wymPath is the current directory
    return '';
};

/**
    WYMeditor.computeBasePath
    =========================

    Get the relative path to the WYMeditor directory root based on the path to
    the wymeditor base file. This path is used as the basis for loading:
    * Language files
    * Skins
    *
*/
WYMeditor.computeBasePath = function (wymPath) {
    // Strip everything after the last slash to get the base path
    var lastSlashIndex = wymPath.lastIndexOf('/');
    return wymPath.substr(0, lastSlashIndex + 1);
};

/**
    WYMeditor.computeJqueryPath
    ===========================

    Get the relative path to the currently-included jquery javascript file.

    Returns the first script src attribute that matches one of the following
    patterns:

    * jquery.pack.js
    * jquery.min.js
    * jquery.packed.js
    * Plus the jquery-<version> variants
*/
WYMeditor.computeJqueryPath = function () {
    return jQuery(
        jQuery.grep(
            jQuery('script'),
            function (s) {
                return (
                    s.src &&
                    s.src.match(
                            /jquery(-(.*)){0,1}(\.pack|\.min|\.packed)?\.js(\?.*)?$/
                        )
                );
            }
        )
    ).attr('src');
};

/********** DIALOGS **********/

WYMeditor.INIT_DIALOG = function (index) {

    var wym = window.opener.WYMeditor.INSTANCES[index],
        doc = window.document,
        selected = wym.selected(),
        dialogType = jQuery(wym._options.dialogTypeSelector).val(),
        sStamp = wym.uniqueStamp(),
        styles,
        aCss,
        tableOnClick;

    if (dialogType === WYMeditor.DIALOG_LINK) {
        // ensure that we select the link to populate the fields
        if (selected && selected.tagName &&
                selected.tagName.toLowerCase !== WYMeditor.A) {
            selected = jQuery(selected).parentsOrSelf(WYMeditor.A);
        }

        // fix MSIE selection if link image has been clicked
        if (!selected && wym._selected_image) {
            selected = jQuery(wym._selected_image).parentsOrSelf(WYMeditor.A);
        }
    }

    // pre-init functions
    if (jQuery.isFunction(wym._options.preInitDialog)) {
        wym._options.preInitDialog(wym, window);
    }

    // add css rules from options
    styles = doc.styleSheets[0];
    aCss = eval(wym._options.dialogStyles);

    wym.addCssRules(doc, aCss);

    // auto populate fields if selected container (e.g. A)
    if (selected) {
        jQuery(wym._options.hrefSelector).val(jQuery(selected).attr(WYMeditor.HREF));
        jQuery(wym._options.srcSelector).val(jQuery(selected).attr(WYMeditor.SRC));
        jQuery(wym._options.titleSelector).val(jQuery(selected).attr(WYMeditor.TITLE));
        jQuery(wym._options.relSelector).val(jQuery(selected).attr(WYMeditor.REL));
        jQuery(wym._options.altSelector).val(jQuery(selected).attr(WYMeditor.ALT));
    }

    // auto populate image fields if selected image
    if (wym._selected_image) {
        jQuery(wym._options.dialogImageSelector + " " + wym._options.srcSelector).val(jQuery(wym._selected_image).attr(WYMeditor.SRC));
        jQuery(wym._options.dialogImageSelector + " " + wym._options.titleSelector).val(jQuery(wym._selected_image).attr(WYMeditor.TITLE));
        jQuery(wym._options.dialogImageSelector + " " + wym._options.altSelector).val(jQuery(wym._selected_image).attr(WYMeditor.ALT));
    }

    jQuery(wym._options.dialogLinkSelector + " " +
            wym._options.submitSelector).submit(function () {

        var sUrl = jQuery(wym._options.hrefSelector).val(),
            link;
        if (sUrl.length > 0) {

            if (selected[0] && selected[0].tagName.toLowerCase() === WYMeditor.A) {
                link = selected;
            } else {
                wym._exec(WYMeditor.CREATE_LINK, sStamp);
                link = jQuery("a[href=" + sStamp + "]", wym._doc.body);
            }

            link.attr(WYMeditor.HREF, sUrl);
            link.attr(WYMeditor.TITLE, jQuery(wym._options.titleSelector).val());
            link.attr(WYMeditor.REL, jQuery(wym._options.relSelector).val());
        }
        window.close();
    });

    jQuery(wym._options.dialogImageSelector + " " +
            wym._options.submitSelector).submit(function () {

        var sUrl = jQuery(wym._options.srcSelector).val(),
            $img;
        if (sUrl.length > 0) {

            wym._exec(WYMeditor.INSERT_IMAGE, sStamp);

            $img = jQuery("img[src$=" + sStamp + "]", wym._doc.body);
            $img.attr(WYMeditor.SRC, sUrl);
            $img.attr(WYMeditor.TITLE, jQuery(wym._options.titleSelector).val());
            $img.attr(WYMeditor.ALT, jQuery(wym._options.altSelector).val());
        }
        window.close();
    });

    tableOnClick = WYMeditor.MAKE_TABLE_ONCLICK(wym);
    jQuery(wym._options.dialogTableSelector + " " + wym._options.submitSelector)
        .submit(tableOnClick);

    jQuery(wym._options.dialogPasteSelector + " " +
            wym._options.submitSelector).submit(function () {

        var sText = jQuery(wym._options.textSelector).val();
        wym.paste(sText);
        window.close();
    });

    jQuery(wym._options.dialogPreviewSelector + " " +
        wym._options.previewSelector).html(wym.xhtml());

    //cancel button
    jQuery(wym._options.cancelSelector).mousedown(function () {
        window.close();
    });

    //pre-init functions
    if (jQuery.isFunction(wym._options.postInitDialog)) {
        wym._options.postInitDialog(wym, window);
    }

};

/********** TABLE DIALOG ONCLICK **********/

WYMeditor.MAKE_TABLE_ONCLICK = function (wym) {
    var tableOnClick = function () {
        var numRows = jQuery(wym._options.rowsSelector).val(),
            numColumns = jQuery(wym._options.colsSelector).val(),
            caption = jQuery(wym._options.captionSelector).val(),
            summary = jQuery(wym._options.summarySelector).val(),

            table = wym.insertTable(numRows, numColumns, caption, summary);

        window.close();
    };

    return tableOnClick;
};


/********** HELPERS **********/

// Returns true if it is a text node with whitespaces only
jQuery.fn.isPhantomNode = function () {
    if (this[0].nodeType === 3) {
        return !(/[^\t\n\r ]/.test(this[0].data));
    }

    return false;
};

WYMeditor.isPhantomNode = function (n) {
    if (n.nodeType === 3) {
        return !(/[^\t\n\r ]/.test(n.data));
    }

    return false;
};

WYMeditor.isPhantomString = function (str) {
    return !(/[^\t\n\r ]/.test(str));
};

// Returns the Parents or the node itself
// jqexpr = a jQuery expression
jQuery.fn.parentsOrSelf = function (jqexpr) {
    var n = this;

    if (n[0].nodeType === 3) {
        n = n.parents().slice(0, 1);
    }

//  if (n.is(jqexpr)) // XXX should work, but doesn't (probably a jQuery bug)
    if (n.filter(jqexpr).size() === 1) {
        return n;
    } else {
        return n.parents(jqexpr).slice(0, 1);
    }
};

// String & array helpers

WYMeditor.Helper = {

    //replace all instances of 'old' by 'rep' in 'str' string
    replaceAll: function (str, old, rep) {
        var rExp = new RegExp(old, "g");
        return str.replace(rExp, rep);
    },

    //insert 'inserted' at position 'pos' in 'str' string
    insertAt: function (str, inserted, pos) {
        return str.substr(0, pos) + inserted + str.substring(pos);
    },

    //trim 'str' string
    trim: function (str) {
        return str.replace(/^(\s*)|(\s*)$/gm, '');
    },

    //return true if 'arr' array contains 'elem', or false
    contains: function (arr, elem) {
        var i;
        for (i = 0; i < arr.length; i += 1) {
            if (arr[i] === elem) {
                return true;
            }
        }
        return false;
    },

    //return 'item' position in 'arr' array, or -1
    indexOf: function (arr, item) {
        var ret = -1, i;
        for (i = 0; i < arr.length; i += 1) {
            if (arr[i] === item) {
                ret = i;
                break;
            }
        }
        return ret;
    },

    //return 'item' object in 'arr' array, checking its 'name' property, or null
    findByName: function (arr, name) {
        var i, item;
        for (i = 0; i < arr.length; i += 1) {
            item = arr[i];
            if (item.name === name) {
                return item;
            }
        }
        return null;
    }
};


/*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2011, Tim Down
 Licensed under the MIT license.
 Version: 1.1.2
 Build date: 30 May 2011
*/
var rangy=function(){function m(o,r){var A=typeof o[r];return A=="function"||!!(A=="object"&&o[r])||A=="unknown"}function N(o,r){return!!(typeof o[r]=="object"&&o[r])}function G(o,r){return typeof o[r]!="undefined"}function F(o){return function(r,A){for(var O=A.length;O--;)if(!o(r,A[O]))return false;return true}}function y(o){window.alert("Rangy not supported in your browser. Reason: "+o);q.initialized=true;q.supported=false}function E(){if(!q.initialized){var o,r=false,A=false;if(m(document,"createRange")){o=
document.createRange();if(x(o,l)&&s(o,Q))r=true;o.detach()}if((o=N(document,"body")?document.body:document.getElementsByTagName("body")[0])&&m(o,"createTextRange")){o=o.createTextRange();if(x(o,t)&&s(o,p))A=true}!r&&!A&&y("Neither Range nor TextRange are implemented");q.initialized=true;q.features={implementsDomRange:r,implementsTextRange:A};r=f.concat(e);A=0;for(o=r.length;A<o;++A)try{r[A](q)}catch(O){N(window,"console")&&m(window.console,"log")&&window.console.log("Init listener threw an exception. Continuing.",
O)}}}function H(o){this.name=o;this.supported=this.initialized=false}var Q=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],l=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],
p=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],t=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint"],x=F(m),B=F(N),s=F(G),q={initialized:false,supported:true,util:{isHostMethod:m,isHostObject:N,isHostProperty:G,areHostMethods:x,areHostObjects:B,areHostProperties:s},features:{},modules:{},config:{alertOnWarn:false}};q.fail=y;q.warn=function(o){o="Rangy warning: "+o;if(q.config.alertOnWarn)window.alert(o);
else typeof window.console!="undefined"&&typeof window.console.log!="undefined"&&window.console.log(o)};var e=[],f=[];q.init=E;q.addInitListener=function(o){q.initialized?o(q):e.push(o)};var k=[];q.addCreateMissingNativeApiListener=function(o){k.push(o)};q.createMissingNativeApi=function(o){o=o||window;E();for(var r=0,A=k.length;r<A;++r)k[r](o)};H.prototype.fail=function(o){this.initialized=true;this.supported=false;throw Error("Module '"+this.name+"' failed to load: "+o);};H.prototype.warn=function(o){q.warn("Module "+
this.name+": "+o)};H.prototype.createError=function(o){return Error("Error in Rangy "+this.name+" module: "+o)};q.createModule=function(o,r){var A=new H(o);q.modules[o]=A;f.push(function(O){r(O,A);A.initialized=true;A.supported=true})};q.requireModules=function(o){for(var r=0,A=o.length,O,I;r<A;++r){I=o[r];O=q.modules[I];if(!O||!(O instanceof H))throw Error("Module '"+I+"' not found");if(!O.supported)throw Error("Module '"+I+"' not supported");}};var u=false;B=function(){if(!u){u=true;q.initialized||
E()}};if(typeof window=="undefined")y("No window found");else if(typeof document=="undefined")y("No document found");else{m(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",B,false);if(m(window,"addEventListener"))window.addEventListener("load",B,false);else m(window,"attachEvent")?window.attachEvent("onload",B):y("Window does not have required addEventListener or attachEvent method");return q}}();
rangy.createModule("DomUtil",function(m,N){function G(e){for(var f=0;e=e.previousSibling;)f++;return f}function F(e,f){var k=[],u;for(u=e;u;u=u.parentNode)k.push(u);for(u=f;u;u=u.parentNode)if(q(k,u))return u;return null}function y(e,f,k){for(k=k?e:e.parentNode;k;){e=k.parentNode;if(e===f)return k;k=e}return null}function E(e){e=e.nodeType;return e==3||e==4||e==8}function H(e,f){var k=f.nextSibling,u=f.parentNode;k?u.insertBefore(e,k):u.appendChild(e);return e}function Q(e){if(e.nodeType==9)return e;
else if(typeof e.ownerDocument!="undefined")return e.ownerDocument;else if(typeof e.document!="undefined")return e.document;else if(e.parentNode)return Q(e.parentNode);else throw Error("getDocument: no document found for node");}function l(e){if(!e)return"[No node]";return E(e)?'"'+e.data+'"':e.nodeType==1?"<"+e.nodeName+(e.id?' id="'+e.id+'"':"")+">["+e.childNodes.length+"]":e.nodeName}function p(e){this._next=this.root=e}function t(e,f){this.node=e;this.offset=f}function x(e){this.code=this[e];
this.codeName=e;this.message="DOMException: "+this.codeName}var B=m.util;B.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||N.fail("document missing a Node creation method");B.isHostMethod(document,"getElementsByTagName")||N.fail("document missing getElementsByTagName method");var s=document.createElement("div");B.areHostMethods(s,["insertBefore","appendChild","cloneNode"])||N.fail("Incomplete Element implementation");s=document.createTextNode("test");B.areHostMethods(s,
["splitText","deleteData","insertData","appendData","cloneNode"])||N.fail("Incomplete Text Node implementation");var q=function(e,f){for(var k=e.length;k--;)if(e[k]===f)return true;return false};p.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var e=this._current=this._next,f;if(this._current)if(f=e.firstChild)this._next=f;else{for(f=null;e!==this.root&&!(f=e.nextSibling);)e=e.parentNode;this._next=f}return this._current},detach:function(){this._current=this._next=
this.root=null}};t.prototype={equals:function(e){return this.node===e.node&this.offset==e.offset},inspect:function(){return"[DomPosition("+l(this.node)+":"+this.offset+")]"}};x.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};x.prototype.toString=function(){return this.message};m.dom={arrayContains:q,getNodeIndex:G,getCommonAncestor:F,isAncestorOf:function(e,f,k){for(f=k?f:f.parentNode;f;)if(f===
e)return true;else f=f.parentNode;return false},getClosestAncestorIn:y,isCharacterDataNode:E,insertAfter:H,splitDataNode:function(e,f){var k;if(e.nodeType==3)k=e.splitText(f);else{k=e.cloneNode();k.deleteData(0,f);e.deleteData(0,e.length-f);H(k,e)}return k},getDocument:Q,getWindow:function(e){e=Q(e);if(typeof e.defaultView!="undefined")return e.defaultView;else if(typeof e.parentWindow!="undefined")return e.parentWindow;else throw Error("Cannot get a window object for node");},getIframeWindow:function(e){if(typeof e.contentWindow!=
"undefined")return e.contentWindow;else if(typeof e.contentDocument!="undefined")return e.contentDocument.defaultView;else throw Error("getIframeWindow: No Window object found for iframe element");},getIframeDocument:function(e){if(typeof e.contentDocument!="undefined")return e.contentDocument;else if(typeof e.contentWindow!="undefined")return e.contentWindow.document;else throw Error("getIframeWindow: No Document object found for iframe element");},getBody:function(e){return B.isHostObject(e,"body")?
e.body:e.getElementsByTagName("body")[0]},comparePoints:function(e,f,k,u){var o;if(e==k)return f===u?0:f<u?-1:1;else if(o=y(k,e,true))return f<=G(o)?-1:1;else if(o=y(e,k,true))return G(o)<u?-1:1;else{f=F(e,k);e=e===f?f:y(e,f,true);k=k===f?f:y(k,f,true);if(e===k)throw Error("comparePoints got to case 4 and childA and childB are the same!");else{for(f=f.firstChild;f;){if(f===e)return-1;else if(f===k)return 1;f=f.nextSibling}throw Error("Should not be here!");}}},inspectNode:l,createIterator:function(e){return new p(e)},
DomPosition:t};m.DOMException=x});
rangy.createModule("DomRange",function(m){function N(b,h){return b.nodeType!=3&&(j.isAncestorOf(b,h.startContainer,true)||j.isAncestorOf(b,h.endContainer,true))}function G(b){return j.getDocument(b.startContainer)}function F(b,h,v){if(h=b._listeners[h])for(var z=0,M=h.length;z<M;++z)h[z].call(b,{target:b,args:v})}function y(b){return new Y(b.parentNode,j.getNodeIndex(b))}function E(b){return new Y(b.parentNode,j.getNodeIndex(b)+1)}function H(b){return j.isCharacterDataNode(b)?b.length:b.childNodes?
b.childNodes.length:0}function Q(b,h,v){var z=b.nodeType==11?b.firstChild:b;if(j.isCharacterDataNode(h))v==h.length?j.insertAfter(b,h):h.parentNode.insertBefore(b,v==0?h:j.splitDataNode(h,v));else v>=h.childNodes.length?h.appendChild(b):h.insertBefore(b,h.childNodes[v]);return z}function l(b){for(var h,v,z=G(b.range).createDocumentFragment();v=b.next();){h=b.isPartiallySelectedSubtree();v=v.cloneNode(!h);if(h){h=b.getSubtreeIterator();v.appendChild(l(h));h.detach(true)}if(v.nodeType==10)throw new T("HIERARCHY_REQUEST_ERR");
z.appendChild(v)}return z}function p(b,h,v){var z,M;for(v=v||{stop:false};z=b.next();)if(b.isPartiallySelectedSubtree())if(h(z)===false){v.stop=true;return}else{z=b.getSubtreeIterator();p(z,h,v);z.detach(true);if(v.stop)return}else for(z=j.createIterator(z);M=z.next();)if(h(M)===false){v.stop=true;return}}function t(b){for(var h;b.next();)if(b.isPartiallySelectedSubtree()){h=b.getSubtreeIterator();t(h);h.detach(true)}else b.remove()}function x(b){for(var h,v=G(b.range).createDocumentFragment(),z;h=
b.next();){if(b.isPartiallySelectedSubtree()){h=h.cloneNode(false);z=b.getSubtreeIterator();h.appendChild(x(z));z.detach(true)}else b.remove();if(h.nodeType==10)throw new T("HIERARCHY_REQUEST_ERR");v.appendChild(h)}return v}function B(b,h,v){var z=!!(h&&h.length),M,V=!!v;if(z)M=RegExp("^("+h.join("|")+")$");var ba=[];p(new q(b,false),function(ca){if((!z||M.test(ca.nodeType))&&(!V||v(ca)))ba.push(ca)});return ba}function s(b){return"["+(typeof b.getName=="undefined"?"Range":b.getName())+"("+j.inspectNode(b.startContainer)+
":"+b.startOffset+", "+j.inspectNode(b.endContainer)+":"+b.endOffset+")]"}function q(b,h){this.range=b;this.clonePartiallySelectedTextNodes=h;if(!b.collapsed){this.sc=b.startContainer;this.so=b.startOffset;this.ec=b.endContainer;this.eo=b.endOffset;var v=b.commonAncestorContainer;if(this.sc===this.ec&&j.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===v&&!j.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:
j.getClosestAncestorIn(this.sc,v,true);this._last=this.ec===v&&!j.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:j.getClosestAncestorIn(this.ec,v,true)}}}function e(b){this.code=this[b];this.codeName=b;this.message="RangeException: "+this.codeName}function f(b,h,v){this.nodes=B(b,h,v);this._next=this.nodes[0];this._position=0}function k(b){return function(h,v){for(var z,M=v?h:h.parentNode;M;){z=M.nodeType;if(j.arrayContains(b,z))return M;M=M.parentNode}return null}}function u(b){for(var h;h=
b.parentNode;)b=h;return b}function o(b,h){if(C(b,h))throw new e("INVALID_NODE_TYPE_ERR");}function r(b){if(!b.startContainer)throw new T("INVALID_STATE_ERR");}function A(b,h){if(!j.arrayContains(h,b.nodeType))throw new e("INVALID_NODE_TYPE_ERR");}function O(b,h){if(h<0||h>(j.isCharacterDataNode(b)?b.length:b.childNodes.length))throw new T("INDEX_SIZE_ERR");}function I(b,h){if(d(b,true)!==d(h,true))throw new T("WRONG_DOCUMENT_ERR");}function U(b){if(i(b,true))throw new T("NO_MODIFICATION_ALLOWED_ERR");
}function Z(b,h){if(!b)throw new T(h);}function J(b){if(!d(b.startContainer,true)||!d(b.endContainer,true)||!(b.startOffset<=(j.isCharacterDataNode(b.startContainer)?b.startContainer.length:b.startContainer.childNodes.length))||!(b.endOffset<=(j.isCharacterDataNode(b.endContainer)?b.endContainer.length:b.endContainer.childNodes.length)))throw Error("Range error: Range is no longer valid after DOM mutation ("+b.inspect()+")");}function W(b){b.START_TO_START=P;b.START_TO_END=X;b.END_TO_END=ka;b.END_TO_START=
la;b.NODE_BEFORE=ma;b.NODE_AFTER=na;b.NODE_BEFORE_AND_AFTER=oa;b.NODE_INSIDE=ja}function da(b){W(b);W(b.prototype)}function ga(b,h,v){function z(c,g){return function(n){r(this);A(n,$);A(u(n),ia);n=(c?y:E)(n);(g?M:V)(this,n.node,n.offset)}}function M(c,g,n){var w=c.endContainer,L=c.endOffset;if(g!==c.startContainer||n!==this.startOffset){if(u(g)!=u(w)||j.comparePoints(g,n,w,L)==1){w=g;L=n}h(c,g,n,w,L)}}function V(c,g,n){var w=c.startContainer,L=c.startOffset;if(g!==c.endContainer||n!==this.endOffset){if(u(g)!=
u(w)||j.comparePoints(g,n,w,L)==-1){w=g;L=n}h(c,w,L,g,n)}}function ba(c,g,n){if(g!==c.startContainer||n!==this.startOffset||g!==c.endContainer||n!==this.endOffset)h(c,g,n,g,n)}function ca(c){return function(){r(this);J(this);var g=this.startContainer,n=this.startOffset,w=this.commonAncestorContainer,L=new q(this,true);if(g!==w){g=j.getClosestAncestorIn(g,w,true);n=E(g);g=n.node;n=n.offset}p(L,U);L.reset();w=c(L);L.detach();h(this,g,n,g,n);return w}}b.prototype={attachListener:function(c,g){this._listeners[c].push(g)},
setStart:function(c,g){r(this);o(c,true);O(c,g);M(this,c,g)},setEnd:function(c,g){r(this);o(c,true);O(c,g);V(this,c,g)},setStartBefore:z(true,true),setStartAfter:z(false,true),setEndBefore:z(true,false),setEndAfter:z(false,false),collapse:function(c){r(this);J(this);c?h(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):h(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(c){r(this);o(c,true);h(this,c,0,c,H(c))},selectNode:function(c){r(this);
o(c,false);A(c,$);var g=y(c);c=E(c);h(this,g.node,g.offset,c.node,c.offset)},compareBoundaryPoints:function(c,g){r(this);J(this);I(this.startContainer,g.startContainer);var n=c==la||c==P?"start":"end",w=c==X||c==P?"start":"end";return j.comparePoints(this[n+"Container"],this[n+"Offset"],g[w+"Container"],g[w+"Offset"])},insertNode:function(c){r(this);J(this);A(c,aa);U(this.startContainer);if(j.isAncestorOf(c,this.startContainer,true))throw new T("HIERARCHY_REQUEST_ERR");this.setStartBefore(Q(c,this.startContainer,
this.startOffset))},cloneContents:function(){r(this);J(this);var c,g;if(this.collapsed)return G(this).createDocumentFragment();else{if(this.startContainer===this.endContainer&&j.isCharacterDataNode(this.startContainer)){c=this.startContainer.cloneNode(true);c.data=c.data.slice(this.startOffset,this.endOffset);g=G(this).createDocumentFragment();g.appendChild(c);return g}else{g=new q(this,true);c=l(g);g.detach()}return c}},extractContents:ca(x),deleteContents:ca(t),canSurroundContents:function(){r(this);
J(this);U(this.startContainer);U(this.endContainer);var c=new q(this,true),g=c._first&&N(c._first,this)||c._last&&N(c._last,this);c.detach();return!g},surroundContents:function(c){A(c,a);if(!this.canSurroundContents())throw new e("BAD_BOUNDARYPOINTS_ERR");var g=this.extractContents();if(c.hasChildNodes())for(;c.lastChild;)c.removeChild(c.lastChild);Q(c,this.startContainer,this.startOffset);c.appendChild(g);this.selectNode(c)},cloneRange:function(){r(this);J(this);for(var c=new K(G(this)),g=D.length,
n;g--;){n=D[g];c[n]=this[n]}return c},detach:function(){v(this)},toString:function(){r(this);J(this);var c=this.startContainer;if(c===this.endContainer&&j.isCharacterDataNode(c))return c.nodeType==3||c.nodeType==4?c.data.slice(this.startOffset,this.endOffset):"";else{var g=[];c=new q(this,true);p(c,function(n){if(n.nodeType==3||n.nodeType==4)g.push(n.data)});c.detach();return g.join("")}},compareNode:function(c){r(this);J(this);var g=c.parentNode,n=j.getNodeIndex(c);if(!g)throw new T("NOT_FOUND_ERR");
c=this.comparePoint(g,n);g=this.comparePoint(g,n+1);return c<0?g>0?oa:ma:g>0?na:ja},comparePoint:function(c,g){r(this);J(this);Z(c,"HIERARCHY_REQUEST_ERR");I(c,this.startContainer);if(j.comparePoints(c,g,this.startContainer,this.startOffset)<0)return-1;else if(j.comparePoints(c,g,this.endContainer,this.endOffset)>0)return 1;return 0},createContextualFragment:function(c){r(this);var g=G(this),n=g.createElement("div");n.innerHTML=c;for(c=g.createDocumentFragment();g=n.firstChild;)c.appendChild(g);return c},
intersectsNode:function(c,g){r(this);J(this);Z(c,"NOT_FOUND_ERR");if(j.getDocument(c)!==G(this))return false;var n=c.parentNode,w=j.getNodeIndex(c);Z(n,"NOT_FOUND_ERR");var L=j.comparePoints(n,w,this.endContainer,this.endOffset);n=j.comparePoints(n,w+1,this.startContainer,this.startOffset);return g?L<=0&&n>=0:L<0&&n>0},isPointInRange:function(c,g){r(this);J(this);Z(c,"HIERARCHY_REQUEST_ERR");I(c,this.startContainer);return j.comparePoints(c,g,this.startContainer,this.startOffset)>=0&&j.comparePoints(c,
g,this.endContainer,this.endOffset)<=0},intersectsRange:function(c){r(this);J(this);if(G(c)!=G(this))throw new T("WRONG_DOCUMENT_ERR");return j.comparePoints(this.startContainer,this.startOffset,c.endContainer,c.endOffset)<0&&j.comparePoints(this.endContainer,this.endOffset,c.startContainer,c.startOffset)>0},intersection:function(c){if(this.intersectsRange(c)){var g=j.comparePoints(this.startContainer,this.startOffset,c.startContainer,c.startOffset),n=j.comparePoints(this.endContainer,this.endOffset,
c.endContainer,c.endOffset),w=this.cloneRange();g==-1&&w.setStart(c.startContainer,c.startOffset);n==1&&w.setEnd(c.endContainer,c.endOffset);return w}return null},containsNode:function(c,g){return g?this.intersectsNode(c,false):this.compareNode(c)==ja},containsNodeContents:function(c){return this.comparePoint(c,0)>=0&&this.comparePoint(c,H(c))<=0},splitBoundaries:function(){J(this);var c=this.startContainer,g=this.startOffset,n=this.endContainer,w=this.endOffset,L=c===n;j.isCharacterDataNode(n)&&
w>0&&w<n.length&&j.splitDataNode(n,w);if(j.isCharacterDataNode(c)&&g>0&&g<c.length){c=j.splitDataNode(c,g);if(L){w-=g;n=c}else n==c.parentNode&&w>=j.getNodeIndex(c)&&w++;g=0}h(this,c,g,n,w)},normalizeBoundaries:function(){J(this);var c=this.startContainer,g=this.startOffset,n=this.endContainer,w=this.endOffset,L=function(S){var R=S.nextSibling;if(R&&R.nodeType==S.nodeType){n=S;w=S.length;S.appendData(R.data);R.parentNode.removeChild(R)}},pa=function(S){var R=S.previousSibling;if(R&&R.nodeType==S.nodeType){c=
S;var qa=S.length;g=R.length;S.insertData(0,R.data);R.parentNode.removeChild(R);if(c==n){w+=g;n=c}else if(n==S.parentNode){R=j.getNodeIndex(S);if(w==R){n=S;w=qa}else w>R&&w--}}},ha=true;if(j.isCharacterDataNode(n))n.length==w&&L(n);else{if(w>0)(ha=n.childNodes[w-1])&&j.isCharacterDataNode(ha)&&L(ha);ha=!this.collapsed}if(ha)if(j.isCharacterDataNode(c))g==0&&pa(c);else{if(g<c.childNodes.length)(L=c.childNodes[g])&&j.isCharacterDataNode(L)&&pa(L)}else{c=n;g=w}h(this,c,g,n,w)},createNodeIterator:function(c,
g){r(this);J(this);return new f(this,c,g)},getNodes:function(c,g){r(this);J(this);return B(this,c,g)},collapseToPoint:function(c,g){r(this);J(this);o(c,true);O(c,g);ba(this,c,g)},collapseBefore:function(c){r(this);this.setEndBefore(c);this.collapse(false)},collapseAfter:function(c){r(this);this.setStartAfter(c);this.collapse(true)},getName:function(){return"DomRange"},equals:function(c){return K.rangesEqual(this,c)},inspect:function(){return s(this)}};da(b)}function ea(b){b.collapsed=b.startContainer===
b.endContainer&&b.startOffset===b.endOffset;b.commonAncestorContainer=b.collapsed?b.startContainer:j.getCommonAncestor(b.startContainer,b.endContainer)}function fa(b,h,v,z,M){var V=b.startContainer!==h||b.startOffset!==v,ba=b.endContainer!==z||b.endOffset!==M;b.startContainer=h;b.startOffset=v;b.endContainer=z;b.endOffset=M;ea(b);F(b,"boundarychange",{startMoved:V,endMoved:ba})}function K(b){this.startContainer=b;this.startOffset=0;this.endContainer=b;this.endOffset=0;this._listeners={boundarychange:[],
detach:[]};ea(this)}m.requireModules(["DomUtil"]);var j=m.dom,Y=j.DomPosition,T=m.DOMException;q.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var b=this._current=this._next;if(b){this._next=b!==this._last?b.nextSibling:null;if(j.isCharacterDataNode(b)&&this.clonePartiallySelectedTextNodes){if(b===this.ec)(b=b.cloneNode(true)).deleteData(this.eo,
b.length-this.eo);if(this._current===this.sc)(b=b.cloneNode(true)).deleteData(0,this.so)}}return b},remove:function(){var b=this._current,h,v;if(j.isCharacterDataNode(b)&&(b===this.sc||b===this.ec)){h=b===this.sc?this.so:0;v=b===this.ec?this.eo:b.length;h!=v&&b.deleteData(h,v-h)}else b.parentNode&&b.parentNode.removeChild(b)},isPartiallySelectedSubtree:function(){return N(this._current,this.range)},getSubtreeIterator:function(){var b;if(this.isSingleCharacterDataNode){b=this.range.cloneRange();b.collapse()}else{b=
new K(G(this.range));var h=this._current,v=h,z=0,M=h,V=H(h);if(j.isAncestorOf(h,this.sc,true)){v=this.sc;z=this.so}if(j.isAncestorOf(h,this.ec,true)){M=this.ec;V=this.eo}fa(b,v,z,M,V)}return new q(b,this.clonePartiallySelectedTextNodes)},detach:function(b){b&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};e.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};e.prototype.toString=function(){return this.message};f.prototype=
{_current:null,hasNext:function(){return!!this._next},next:function(){this._current=this._next;this._next=this.nodes[++this._position];return this._current},detach:function(){this._current=this._next=this.nodes=null}};var $=[1,3,4,5,7,8,10],ia=[2,9,11],aa=[1,3,4,5,7,8,10,11],a=[1,3,4,5,7,8],d=k([9,11]),i=k([5,6,10,12]),C=k([6,10,12]),D=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer"],P=0,X=1,ka=2,la=3,ma=0,na=1,oa=2,ja=3;ga(K,fa,function(b){r(b);b.startContainer=
b.startOffset=b.endContainer=b.endOffset=null;b.collapsed=b.commonAncestorContainer=null;F(b,"detach",null);b._listeners=null});K.fromRange=function(b){var h=new K(G(b));fa(h,b.startContainer,b.startOffset,b.endContainer,b.endOffset);return h};K.rangeProperties=D;K.RangeIterator=q;K.copyComparisonConstants=da;K.createPrototypeRange=ga;K.inspect=s;K.getRangeDocument=G;K.rangesEqual=function(b,h){return b.startContainer===h.startContainer&&b.startOffset===h.startOffset&&b.endContainer===h.endContainer&&
b.endOffset===h.endOffset};K.getEndOffset=H;m.DomRange=K;m.RangeException=e});
rangy.createModule("WrappedRange",function(m){function N(l,p,t,x){var B=l.duplicate();B.collapse(t);var s=B.parentElement();y.isAncestorOf(p,s,true)||(s=p);if(!s.canHaveHTML)return new E(s.parentNode,y.getNodeIndex(s));p=y.getDocument(s).createElement("span");var q,e=t?"StartToStart":"StartToEnd";do{s.insertBefore(p,p.previousSibling);B.moveToElementText(p)}while((q=B.compareEndPoints(e,l))>0&&p.previousSibling);e=p.nextSibling;if(q==-1&&e&&y.isCharacterDataNode(e)){B.setEndPoint(t?"EndToStart":"EndToEnd",
l);if(/[\r\n]/.test(e.data)){s=B.duplicate();t=s.text.replace(/\r\n/g,"\r").length;for(t=s.moveStart("character",t);s.compareEndPoints("StartToEnd",s)==-1;){t++;s.moveStart("character",1)}}else t=B.text.length;s=new E(e,t)}else{e=(x||!t)&&p.previousSibling;s=(t=(x||t)&&p.nextSibling)&&y.isCharacterDataNode(t)?new E(t,0):e&&y.isCharacterDataNode(e)?new E(e,e.length):new E(s,y.getNodeIndex(p))}p.parentNode.removeChild(p);return s}function G(l,p){var t,x,B=l.offset,s=y.getDocument(l.node),q=s.body.createTextRange(),
e=y.isCharacterDataNode(l.node);if(e){t=l.node;x=t.parentNode}else{t=l.node.childNodes;t=B<t.length?t[B]:null;x=l.node}s=s.createElement("span");s.innerHTML="&#feff;";t?x.insertBefore(s,t):x.appendChild(s);q.moveToElementText(s);q.collapse(!p);x.removeChild(s);if(e)q[p?"moveStart":"moveEnd"]("character",B);return q}m.requireModules(["DomUtil","DomRange"]);var F,y=m.dom,E=y.DomPosition,H=m.DomRange;if(m.features.implementsDomRange)(function(){function l(f){for(var k=t.length,u;k--;){u=t[k];f[u]=f.nativeRange[u]}}
var p,t=H.rangeProperties,x,B;F=function(f){if(!f)throw Error("Range must be specified");this.nativeRange=f;l(this)};H.createPrototypeRange(F,function(f,k,u,o,r){var A=f.endContainer!==o||f.endOffset!=r;if(f.startContainer!==k||f.startOffset!=u||A){f.setEnd(o,r);f.setStart(k,u)}},function(f){f.nativeRange.detach();f.detached=true;for(var k=t.length,u;k--;){u=t[k];f[u]=null}});p=F.prototype;p.selectNode=function(f){this.nativeRange.selectNode(f);l(this)};p.deleteContents=function(){this.nativeRange.deleteContents();
l(this)};p.extractContents=function(){var f=this.nativeRange.extractContents();l(this);return f};p.cloneContents=function(){return this.nativeRange.cloneContents()};p.surroundContents=function(f){this.nativeRange.surroundContents(f);l(this)};p.collapse=function(f){this.nativeRange.collapse(f);l(this)};p.cloneRange=function(){return new F(this.nativeRange.cloneRange())};p.refresh=function(){l(this)};p.toString=function(){return this.nativeRange.toString()};var s=document.createTextNode("test");y.getBody(document).appendChild(s);
var q=document.createRange();q.setStart(s,0);q.setEnd(s,0);try{q.setStart(s,1);x=true;p.setStart=function(f,k){this.nativeRange.setStart(f,k);l(this)};p.setEnd=function(f,k){this.nativeRange.setEnd(f,k);l(this)};B=function(f){return function(k){this.nativeRange[f](k);l(this)}}}catch(e){x=false;p.setStart=function(f,k){try{this.nativeRange.setStart(f,k)}catch(u){this.nativeRange.setEnd(f,k);this.nativeRange.setStart(f,k)}l(this)};p.setEnd=function(f,k){try{this.nativeRange.setEnd(f,k)}catch(u){this.nativeRange.setStart(f,
k);this.nativeRange.setEnd(f,k)}l(this)};B=function(f,k){return function(u){try{this.nativeRange[f](u)}catch(o){this.nativeRange[k](u);this.nativeRange[f](u)}l(this)}}}p.setStartBefore=B("setStartBefore","setEndBefore");p.setStartAfter=B("setStartAfter","setEndAfter");p.setEndBefore=B("setEndBefore","setStartBefore");p.setEndAfter=B("setEndAfter","setStartAfter");q.selectNodeContents(s);p.selectNodeContents=q.startContainer==s&&q.endContainer==s&&q.startOffset==0&&q.endOffset==s.length?function(f){this.nativeRange.selectNodeContents(f);
l(this)}:function(f){this.setStart(f,0);this.setEnd(f,H.getEndOffset(f))};q.selectNodeContents(s);q.setEnd(s,3);x=document.createRange();x.selectNodeContents(s);x.setEnd(s,4);x.setStart(s,2);p.compareBoundaryPoints=q.compareBoundaryPoints(q.START_TO_END,x)==-1&q.compareBoundaryPoints(q.END_TO_START,x)==1?function(f,k){k=k.nativeRange||k;if(f==k.START_TO_END)f=k.END_TO_START;else if(f==k.END_TO_START)f=k.START_TO_END;return this.nativeRange.compareBoundaryPoints(f,k)}:function(f,k){return this.nativeRange.compareBoundaryPoints(f,
k.nativeRange||k)};y.getBody(document).removeChild(s);q.detach();x.detach()})();else if(m.features.implementsTextRange){F=function(l){this.textRange=l;this.refresh()};F.prototype=new H(document);F.prototype.refresh=function(){var l,p,t=this.textRange;l=t.parentElement();var x=t.duplicate();x.collapse(true);p=x.parentElement();x=t.duplicate();x.collapse(false);t=x.parentElement();p=p==t?p:y.getCommonAncestor(p,t);p=p==l?p:y.getCommonAncestor(l,p);if(this.textRange.compareEndPoints("StartToEnd",this.textRange)==
0)p=l=N(this.textRange,p,true,true);else{l=N(this.textRange,p,true,false);p=N(this.textRange,p,false,false)}this.setStart(l.node,l.offset);this.setEnd(p.node,p.offset)};F.rangeToTextRange=function(l){if(l.collapsed)return G(new E(l.startContainer,l.startOffset),true);else{var p=G(new E(l.startContainer,l.startOffset),true),t=G(new E(l.endContainer,l.endOffset),false);l=y.getDocument(l.startContainer).body.createTextRange();l.setEndPoint("StartToStart",p);l.setEndPoint("EndToEnd",t);return l}};H.copyComparisonConstants(F);
var Q=function(){return this}();if(typeof Q.Range=="undefined")Q.Range=F}F.prototype.getName=function(){return"WrappedRange"};m.WrappedRange=F;m.createNativeRange=function(l){l=l||document;if(m.features.implementsDomRange)return l.createRange();else if(m.features.implementsTextRange)return l.body.createTextRange()};m.createRange=function(l){l=l||document;return new F(m.createNativeRange(l))};m.createRangyRange=function(l){l=l||document;return new H(l)};m.createIframeRange=function(l){return m.createRange(y.getIframeDocument(l))};
m.createIframeRangyRange=function(l){return m.createRangyRange(y.getIframeDocument(l))};m.addCreateMissingNativeApiListener(function(l){l=l.document;if(typeof l.createRange=="undefined")l.createRange=function(){return m.createRange(this)};l=l=null})});
rangy.createModule("WrappedSelection",function(m,N){function G(a){return(a||window).getSelection()}function F(a){return(a||window).document.selection}function y(a,d,i){var C=i?"end":"start";i=i?"start":"end";a.anchorNode=d[C+"Container"];a.anchorOffset=d[C+"Offset"];a.focusNode=d[i+"Container"];a.focusOffset=d[i+"Offset"]}function E(a){a.anchorNode=a.focusNode=null;a.anchorOffset=a.focusOffset=0;a.rangeCount=0;a.isCollapsed=true;a._ranges.length=0}function H(a){var d;if(a instanceof k){d=a._selectionNativeRange;
if(!d){d=m.createNativeRange(e.getDocument(a.startContainer));d.setEnd(a.endContainer,a.endOffset);d.setStart(a.startContainer,a.startOffset);a._selectionNativeRange=d;a.attachListener("detach",function(){this._selectionNativeRange=null})}}else if(a instanceof u)d=a.nativeRange;else if(window.Range&&a instanceof Range)d=a;return d}function Q(a){var d=a.getNodes(),i;a:if(!d.length||d[0].nodeType!=1)i=false;else{i=1;for(var C=d.length;i<C;++i)if(!e.isAncestorOf(d[0],d[i])){i=false;break a}i=true}if(!i)throw Error("getSingleElementFromRange: range "+
a.inspect()+" did not consist of a single element");return d[0]}function l(a,d){var i=new u(d);a._ranges=[i];y(a,i,false);a.rangeCount=1;a.isCollapsed=i.collapsed}function p(a){a._ranges.length=0;if(a.docSelection.type=="None")E(a);else{var d=a.docSelection.createRange();if(d&&typeof d.text!="undefined")l(a,d);else{a.rangeCount=d.length;for(var i,C=e.getDocument(d.item(0)),D=0;D<a.rangeCount;++D){i=m.createRange(C);i.selectNode(d.item(D));a._ranges.push(i)}a.isCollapsed=a.rangeCount==1&&a._ranges[0].collapsed;
y(a,a._ranges[a.rangeCount-1],false)}}}function t(a,d){var i=a.docSelection.createRange(),C=Q(d),D=e.getDocument(i.item(0));D=e.getBody(D).createControlRange();for(var P=0,X=i.length;P<X;++P)D.add(i.item(P));try{D.add(C)}catch(ka){throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");}D.select();p(a)}function x(a,d,i){this.nativeSelection=a;this.docSelection=d;this._ranges=[];this.win=i;this.refresh()}function B(a,d){var i=e.getDocument(d[0].startContainer);
i=e.getBody(i).createControlRange();for(var C=0,D;C<rangeCount;++C){D=Q(d[C]);try{i.add(D)}catch(P){throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");}}i.select();p(a)}function s(a,d){if(a.anchorNode&&e.getDocument(a.anchorNode)!==e.getDocument(d))throw new o("WRONG_DOCUMENT_ERR");}function q(a){var d=[],i=new r(a.anchorNode,a.anchorOffset),C=new r(a.focusNode,a.focusOffset),D=typeof a.getName=="function"?a.getName():
"Selection";if(typeof a.rangeCount!="undefined")for(var P=0,X=a.rangeCount;P<X;++P)d[P]=k.inspect(a.getRangeAt(P));return"["+D+"(Ranges: "+d.join(", ")+")(anchor: "+i.inspect()+", focus: "+C.inspect()+"]"}m.requireModules(["DomUtil","DomRange","WrappedRange"]);m.config.checkSelectionRanges=true;var e=m.dom,f=m.util,k=m.DomRange,u=m.WrappedRange,o=m.DOMException,r=e.DomPosition,A,O,I=m.util.isHostMethod(window,"getSelection"),U=m.util.isHostObject(document,"selection");if(I){A=G;m.isSelectionValid=
function(){return true}}else if(U){A=F;m.isSelectionValid=function(a){a=(a||window).document;var d=a.selection;return d.type!="None"||e.getDocument(d.createRange().parentElement())==a}}else N.fail("No means of obtaining a selection object");m.getNativeSelection=A;I=A();var Z=m.createNativeRange(document),J=e.getBody(document),W=f.areHostObjects(I,f.areHostProperties(I,["anchorOffset","focusOffset"]));m.features.selectionHasAnchorAndFocus=W;var da=f.isHostMethod(I,"extend");m.features.selectionHasExtend=
da;var ga=typeof I.rangeCount=="number";m.features.selectionHasRangeCount=ga;var ea=false,fa=true;f.areHostMethods(I,["addRange","getRangeAt","removeAllRanges"])&&typeof I.rangeCount=="number"&&m.features.implementsDomRange&&function(){var a=document.createElement("iframe");J.appendChild(a);var d=e.getIframeDocument(a);d.open();d.write("<html><head></head><body>12</body></html>");d.close();var i=e.getIframeWindow(a).getSelection(),C=d.documentElement.lastChild.firstChild;d=d.createRange();d.setStart(C,
1);d.collapse(true);i.addRange(d);fa=i.rangeCount==1;i.removeAllRanges();var D=d.cloneRange();d.setStart(C,0);D.setEnd(C,2);i.addRange(d);i.addRange(D);ea=i.rangeCount==2;d.detach();D.detach();J.removeChild(a)}();m.features.selectionSupportsMultipleRanges=ea;m.features.collapsedNonEditableSelectionsSupported=fa;var K=false,j;if(J&&f.isHostMethod(J,"createControlRange")){j=J.createControlRange();if(f.areHostProperties(j,["item","add"]))K=true}m.features.implementsControlRange=K;O=W?function(a){return a.anchorNode===
a.focusNode&&a.anchorOffset===a.focusOffset}:function(a){return a.rangeCount?a.getRangeAt(a.rangeCount-1).collapsed:false};var Y;if(f.isHostMethod(I,"getRangeAt"))Y=function(a,d){try{return a.getRangeAt(d)}catch(i){return null}};else if(W)Y=function(a){var d=e.getDocument(a.anchorNode);d=m.createRange(d);d.setStart(a.anchorNode,a.anchorOffset);d.setEnd(a.focusNode,a.focusOffset);if(d.collapsed!==this.isCollapsed){d.setStart(a.focusNode,a.focusOffset);d.setEnd(a.anchorNode,a.anchorOffset)}return d};
m.getSelection=function(a){a=a||window;var d=a._rangySelection,i=A(a),C=U?F(a):null;if(d){d.nativeSelection=i;d.docSelection=C;d.refresh(a)}else{d=new x(i,C,a);a._rangySelection=d}return d};m.getIframeSelection=function(a){return m.getSelection(e.getIframeWindow(a))};j=x.prototype;if(W&&f.areHostMethods(I,["removeAllRanges","addRange"])){j.removeAllRanges=function(){this.nativeSelection.removeAllRanges();E(this)};var T=function(a,d){var i=k.getRangeDocument(d);i=m.createRange(i);i.collapseToPoint(d.endContainer,
d.endOffset);a.nativeSelection.addRange(H(i));a.nativeSelection.extend(d.startContainer,d.startOffset);a.refresh()};j.addRange=ga?function(a,d){if(K&&U&&this.docSelection.type=="Control")t(this,a);else if(d&&da)T(this,a);else{var i;if(ea)i=this.rangeCount;else{this.removeAllRanges();i=0}this.nativeSelection.addRange(H(a));this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==i+1){if(m.config.checkSelectionRanges)if((i=Y(this.nativeSelection,this.rangeCount-1))&&!k.rangesEqual(i,a))a=
new u(i);this._ranges[this.rangeCount-1]=a;y(this,a,aa(this.nativeSelection));this.isCollapsed=O(this)}else this.refresh()}}:function(a,d){if(d&&da)T(this,a);else{this.nativeSelection.addRange(H(a));this.refresh()}};j.setRanges=function(a){if(K&&a.length>1)B(this,a);else{this.removeAllRanges();for(var d=0,i=a.length;d<i;++d)this.addRange(a[d])}}}else if(f.isHostMethod(I,"empty")&&f.isHostMethod(Z,"select")&&K&&U){j.removeAllRanges=function(){try{this.docSelection.empty();if(this.docSelection.type!=
"None"){var a;if(this.anchorNode)a=e.getDocument(this.anchorNode);else if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();if(d.length)a=e.getDocument(d.item(0)).body.createTextRange()}if(a){a.body.createTextRange().select();this.docSelection.empty()}}}catch(i){}E(this)};j.addRange=function(a){if(this.docSelection.type=="Control")t(this,a);else{u.rangeToTextRange(a).select();this._ranges[0]=a;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;y(this,a,false)}};j.setRanges=
function(a){this.removeAllRanges();var d=a.length;if(d>1)B(this,a);else d&&this.addRange(a[0])}}else{N.fail("No means of selecting a Range or TextRange was found");return false}j.getRangeAt=function(a){if(a<0||a>=this.rangeCount)throw new o("INDEX_SIZE_ERR");else return this._ranges[a]};var $;if(f.isHostMethod(I,"getRangeAt")&&typeof I.rangeCount=="number")$=function(a){if(K&&U&&a.docSelection.type=="Control")p(a);else{a._ranges.length=a.rangeCount=a.nativeSelection.rangeCount;if(a.rangeCount){for(var d=
0,i=a.rangeCount;d<i;++d)a._ranges[d]=new m.WrappedRange(a.nativeSelection.getRangeAt(d));y(a,a._ranges[a.rangeCount-1],aa(a.nativeSelection));a.isCollapsed=O(a)}else E(a)}};else if(W&&typeof I.isCollapsed=="boolean"&&typeof Z.collapsed=="boolean"&&m.features.implementsDomRange)$=function(a){var d;d=a.nativeSelection;if(d.anchorNode){d=Y(d,0);a._ranges=[d];a.rangeCount=1;d=a.nativeSelection;a.anchorNode=d.anchorNode;a.anchorOffset=d.anchorOffset;a.focusNode=d.focusNode;a.focusOffset=d.focusOffset;
a.isCollapsed=O(a)}else E(a)};else if(f.isHostMethod(I,"createRange")&&U)$=function(a){var d;if(m.isSelectionValid(a.win))d=a.docSelection.createRange();else{d=e.getBody(a.win.document).createTextRange();d.collapse(true)}if(a.docSelection.type=="Control")p(a);else d&&typeof d.text!="undefined"?l(a,d):E(a)};else{N.fail("No means of obtaining a Range or TextRange from the user's selection was found");return false}j.refresh=function(a){var d=a?this._ranges.slice(0):null;$(this);if(a){a=d.length;if(a!=
this._ranges.length)return false;for(;a--;)if(!k.rangesEqual(d[a],this._ranges[a]))return false;return true}};var ia=function(a,d){var i=a.getAllRanges(),C=false;a.removeAllRanges();for(var D=0,P=i.length;D<P;++D)if(C||d!==i[D])a.addRange(i[D]);else C=true;a.rangeCount||E(a)};j.removeRange=K?function(a){if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();a=Q(a);var i=e.getDocument(d.item(0));i=e.getBody(i).createControlRange();for(var C,D=false,P=0,X=d.length;P<X;++P){C=d.item(P);
if(C!==a||D)i.add(d.item(P));else D=true}i.select();p(this)}else ia(this,a)}:function(a){ia(this,a)};var aa;if(W&&m.features.implementsDomRange){aa=function(a){var d=false;if(a.anchorNode)d=e.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset)==1;return d};j.isBackwards=function(){return aa(this)}}else aa=j.isBackwards=function(){return false};j.toString=function(){for(var a=[],d=0,i=this.rangeCount;d<i;++d)a[d]=""+this._ranges[d];return a.join("")};j.collapse=function(a,d){s(this,
a);var i=m.createRange(e.getDocument(a));i.collapseToPoint(a,d);this.removeAllRanges();this.addRange(i);this.isCollapsed=true};j.collapseToStart=function(){if(this.rangeCount){var a=this._ranges[0];this.collapse(a.startContainer,a.startOffset)}else throw new o("INVALID_STATE_ERR");};j.collapseToEnd=function(){if(this.rangeCount){var a=this._ranges[this.rangeCount-1];this.collapse(a.endContainer,a.endOffset)}else throw new o("INVALID_STATE_ERR");};j.selectAllChildren=function(a){s(this,a);var d=m.createRange(e.getDocument(a));
d.selectNodeContents(a);this.removeAllRanges();this.addRange(d)};j.deleteFromDocument=function(){if(K&&U&&this.docSelection.type=="Control"){for(var a=this.docSelection.createRange(),d;a.length;){d=a.item(0);a.remove(d);d.parentNode.removeChild(d)}this.refresh()}else if(this.rangeCount){a=this.getAllRanges();this.removeAllRanges();d=0;for(var i=a.length;d<i;++d)a[d].deleteContents();this.addRange(a[i-1])}};j.getAllRanges=function(){return this._ranges.slice(0)};j.setSingleRange=function(a){this.setRanges([a])};
j.containsNode=function(a,d){for(var i=0,C=this._ranges.length;i<C;++i)if(this._ranges[i].containsNode(a,d))return true;return false};j.getName=function(){return"WrappedSelection"};j.inspect=function(){return q(this)};j.detach=function(){this.win=this.anchorNode=this.focusNode=this.win._rangySelection=null};x.inspect=q;m.Selection=x;m.addCreateMissingNativeApiListener(function(a){if(typeof a.getSelection=="undefined")a.getSelection=function(){return m.getSelection(this)};a=null})});/*jslint evil: true */

/**
    WYMeditor.editor.init
    =====================

    Initialize a wymeditor instance, including detecting the
    current browser and enabling the browser-specific subclass.
*/
WYMeditor.editor.prototype.init = function () {
    // Load the browser-specific subclass
    // If this browser isn't supported, do nothing
    var WymClass = false,
        SaxListener,
        prop,
        h,
        iframeHtml,
        boxHtml,
        aTools,
        sTools,
        oTool,
        sTool,
        i,
        aClasses,
        sClasses,
        oClass,
        sClass,
        aContainers,
        sContainers,
        sContainer,
        oContainer;

    if (jQuery.browser.msie) {
        WymClass = new WYMeditor.WymClassExplorer(this);
    } else if (jQuery.browser.mozilla) {
        WymClass = new WYMeditor.WymClassMozilla(this);
    } else if (jQuery.browser.opera) {
        WymClass = new WYMeditor.WymClassOpera(this);
    } else if (jQuery.browser.safari) {
        WymClass = new WYMeditor.WymClassSafari(this);
    }

    if (WymClass === false) {
        return;
    }

    if (jQuery.isFunction(this._options.preInit)) {
        this._options.preInit(this);
    }

    SaxListener = new WYMeditor.XhtmlSaxListener();
    jQuery.extend(SaxListener, WymClass);
    this.parser = new WYMeditor.XhtmlParser(SaxListener);

    if (this._options.styles || this._options.stylesheet) {
        this.configureEditorUsingRawCss();
    }

    this.helper = new WYMeditor.XmlHelper();

    // Extend the editor object with the browser-specific version.
    // We're not using jQuery.extend because we *want* to copy properties via
    // the prototype chain
    for (prop in WymClass) {
        /*jslint forin: true */
        // Explicitly not using hasOwnProperty for the inheritance here
        // because we want to go up the prototype chain to get all of the
        // browser-specific editor methods. This is kind of a code smell,
        // but works just fine.
        this[prop] = WymClass[prop];
    }

    // Load wymbox
    this._box = jQuery(this._element).
        hide().
        after(this._options.boxHtml).
        next().
        addClass('wym_box_' + this._index);

    // Store the instance index and replaced element in wymbox
    // but keep it compatible with jQuery < 1.2.3, see #122
    if (jQuery.isFunction(jQuery.fn.data)) {
        jQuery.data(this._box.get(0), WYMeditor.WYM_INDEX, this._index);
        jQuery.data(this._element.get(0), WYMeditor.WYM_INDEX, this._index);
    }

    h = WYMeditor.Helper;

    // Construct the iframe
    iframeHtml = this._options.iframeHtml;
    iframeHtml = h.replaceAll(iframeHtml, WYMeditor.INDEX, this._index);
    iframeHtml = h.replaceAll(
        iframeHtml,
        WYMeditor.IFRAME_BASE_PATH,
        this._options.iframeBasePath
    );

    // Construct wymbox
    boxHtml = jQuery(this._box).html();

    boxHtml = h.replaceAll(boxHtml, WYMeditor.LOGO, this._options.logoHtml);
    boxHtml = h.replaceAll(boxHtml, WYMeditor.TOOLS, this._options.toolsHtml);
    boxHtml = h.replaceAll(boxHtml, WYMeditor.CONTAINERS, this._options.containersHtml);
    boxHtml = h.replaceAll(boxHtml, WYMeditor.CLASSES, this._options.classesHtml);
    boxHtml = h.replaceAll(boxHtml, WYMeditor.HTML, this._options.htmlHtml);
    boxHtml = h.replaceAll(boxHtml, WYMeditor.IFRAME, iframeHtml);
    boxHtml = h.replaceAll(boxHtml, WYMeditor.STATUS, this._options.statusHtml);

    // Construct the tools list
    aTools = eval(this._options.toolsItems);
    sTools = "";

    for (i = 0; i < aTools.length; i += 1) {
        oTool = aTools[i];
        sTool = '';
        if (oTool.name && oTool.title) {
            sTool = this._options.toolsItemHtml;
        }
        sTool = h.replaceAll(sTool, WYMeditor.TOOL_NAME, oTool.name);
        sTool = h.replaceAll(
            sTool,
            WYMeditor.TOOL_TITLE,
            this._options.stringDelimiterLeft + oTool.title + this._options.stringDelimiterRight
        );
        sTool = h.replaceAll(sTool, WYMeditor.TOOL_CLASS, oTool.css);
        sTools += sTool;
    }

    boxHtml = h.replaceAll(boxHtml, WYMeditor.TOOLS_ITEMS, sTools);

    // Construct the classes list
    aClasses = eval(this._options.classesItems);
    sClasses = "";

    for (i = 0; i < aClasses.length; i += 1) {
        oClass = aClasses[i];
        sClass = '';
        if (oClass.name && oClass.title) {
            sClass = this._options.classesItemHtml;
        }
        sClass = h.replaceAll(sClass, WYMeditor.CLASS_NAME, oClass.name);
        sClass = h.replaceAll(sClass, WYMeditor.CLASS_TITLE, oClass.title);
        sClasses += sClass;
    }

    boxHtml = h.replaceAll(boxHtml, WYMeditor.CLASSES_ITEMS, sClasses);

    // Construct the containers list
    aContainers = eval(this._options.containersItems);
    sContainers = "";

    for (i = 0; i < aContainers.length; i += 1) {
        oContainer = aContainers[i];
        sContainer = '';
        if (oContainer.name && oContainer.title) {
            sContainer = this._options.containersItemHtml;
        }
        sContainer = h.replaceAll(
            sContainer,
            WYMeditor.CONTAINER_NAME,
            oContainer.name
        );
        sContainer = h.replaceAll(sContainer, WYMeditor.CONTAINER_TITLE,
            this._options.stringDelimiterLeft +
            oContainer.title +
            this._options.stringDelimiterRight);
        sContainer = h.replaceAll(
            sContainer,
            WYMeditor.CONTAINER_CLASS,
            oContainer.css
        );
        sContainers += sContainer;
    }

    boxHtml = h.replaceAll(boxHtml, WYMeditor.CONTAINERS_ITEMS, sContainers);

    // I10n
    boxHtml = this.replaceStrings(boxHtml);

    // Load the html in wymbox
    jQuery(this._box).html(boxHtml);

    // Hide the html value
    jQuery(this._box).find(this._options.htmlSelector).hide();

    this.loadSkin();
};

/**
    WYMeditor.editor.bindEvents
    ===========================

    Bind all event handlers including tool/container clicks, focus events
    and change events.
*/
WYMeditor.editor.prototype.bindEvents = function () {
    var wym = this,
        $html_val;

    // Handle click events on tools buttons
    jQuery(this._box).find(this._options.toolSelector).click(function () {
        wym._iframe.contentWindow.focus(); //See #154
        wym.exec(jQuery(this).attr(WYMeditor.NAME));
        return false;
    });

    // Handle click events on containers buttons
    jQuery(this._box).find(this._options.containerSelector).click(function () {
        wym.container(jQuery(this).attr(WYMeditor.NAME));
        return false;
    });

    // Handle keyup event on html value: set the editor value
    // Handle focus/blur events to check if the element has focus, see #147
    $html_val = jQuery(this._box).find(this._options.htmlValSelector);
    $html_val.keyup(function () {
        jQuery(wym._doc.body).html(jQuery(this).val());
    });
    $html_val.focus(function () {
        jQuery(this).toggleClass('hasfocus');
    });
    $html_val.blur(function () {
        jQuery(this).toggleClass('hasfocus');
    });

    // Handle click events on classes buttons
    jQuery(this._box).find(this._options.classSelector).click(function () {
        var aClasses = eval(wym._options.classesItems),
            sName = jQuery(this).attr(WYMeditor.NAME),

            oClass = WYMeditor.Helper.findByName(aClasses, sName),
            jqexpr;

        if (oClass) {
            jqexpr = oClass.expr;
            wym.toggleClass(sName, jqexpr);
        }
        wym._iframe.contentWindow.focus(); //See #154
        return false;
    });

    // Handle update event on update element
    jQuery(this._options.updateSelector).bind(this._options.updateEvent, function () {
        wym.update();
    });
};

WYMeditor.editor.prototype.ready = function () {
    return this._doc !== null;
};

/**
    WYMeditor.editor.box
    ====================

    Get the wymbox container.
*/
WYMeditor.editor.prototype.box = function () {
    return this._box;
};

/**
    WYMeditor.editor.html
    =====================

    Get or set the wymbox html value.
*/
WYMeditor.editor.prototype.html = function (html) {
    if (typeof html === 'string') {
        jQuery(this._doc.body).html(html);
        this.update();
    } else {
        return jQuery(this._doc.body).html();
    }
};

/**
    WYMeditor.editor.xhtml
    ======================

    Take the current editor's DOM and apply strict xhtml nesting rules to
    enforce a valid, well-formed, semantic xhtml result.
*/
WYMeditor.editor.prototype.xhtml = function () {
    var html;

    // Remove any of the placeholder nodes we've created for start/end content
    // insertion
    jQuery(this._doc.body).children(WYMeditor.BR).remove();

    return this.parser.parse(this.html());
};

/**
    WYMeditor.editor.exec
    =====================

    Execute a button command on the currently-selected container. The command
    can be anything from "indent this element" to "open a dialog to create a
    table."

    `cmd` is a string corresponding to the command that should be run, roughly
    matching the designMode execCommand strategy (and falling through to
    execCommand in some cases).
*/
WYMeditor.editor.prototype.exec = function (cmd) {
    var container, custom_run, _this = this;
    switch (cmd) {

    case WYMeditor.CREATE_LINK:
        container = this.container();
        if (container || this._selected_image) {
            this.dialog(WYMeditor.DIALOG_LINK);
        }
        break;

    case WYMeditor.INSERT_IMAGE:
        this.dialog(WYMeditor.DIALOG_IMAGE);
        break;

    case WYMeditor.INSERT_TABLE:
        this.dialog(WYMeditor.DIALOG_TABLE);
        break;

    case WYMeditor.PASTE:
        this.dialog(WYMeditor.DIALOG_PASTE);
        break;

    case WYMeditor.TOGGLE_HTML:
        this.update();
        this.toggleHtml();
        break;

    case WYMeditor.PREVIEW:
        this.dialog(WYMeditor.PREVIEW, this._options.dialogFeaturesPreview);
        break;

    case WYMeditor.INDENT:
        this.indent();
        break;

    case WYMeditor.OUTDENT:
        this.outdent();
        break;


    default:
        custom_run = false;
        jQuery.each(this._options.customCommands, function () {
            if (cmd === this.name) {
                custom_run = true;
                this.run.apply(_this);
                return false;
            }
        });
        if (!custom_run) {
            this._exec(cmd);
        }
        break;
    }
};

/**
    WYMeditor.editor.selection
    ==========================

    Override the default selection function to use rangy.
*/
WYMeditor.editor.prototype.selection = function () {
    if (window.rangy && !rangy.initialized) {
        rangy.init();
    }

    var iframe = this._iframe,
        sel = rangy.getIframeSelection(iframe);

    return sel;
};

/**
    WYMeditor.editor.selection
    ==========================

    Return the selected node.
*/
WYMeditor.editor.prototype.selected = function () {
    var sel = this.selection(),
        node = sel.focusNode;

    if (node) {
        if (node.nodeName === "#text") {
            return node.parentNode;
        } else {
            return node;
        }
    } else {
        return null;
    }
};

/**
    WYMeditor.editor.selection_collapsed
    ====================================

    Return true if all selections are collapsed, false otherwise.
*/
WYMeditor.editor.prototype.selection_collapsed = function () {
    var sel = this.selection(),
        collapsed = false;

    $.each(sel.getAllRanges(), function () {
        if (this.collapsed) {
            collapsed = true;
            //break
            return false;
        }
    });

    return collapsed;
};

/**
    WYMeditor.editor.selected_contains
    ==================================

    Return an array of nodes that match a jQuery selector
    within the current selection.
*/
WYMeditor.editor.prototype.selected_contains = function (selector) {
    var sel = this.selection(),
        matches = [];

    $.each(sel.getAllRanges(), function () {
        $.each(this.getNodes(), function () {
            if ($(this).is(selector)) {
                matches.push(this);
            }
        });
    });

    return matches;
};

/**
    WYMeditor.editor.selected_parents_contains
    ==================================

    Return an array of nodes that match the selector within
    the selection's parents.
*/
WYMeditor.editor.prototype.selected_parents_contains = function (selector) {
    var $matches = $([]),
        $selected = $(this.selected());
    if ($selected.is(selector)) {
        $matches = $matches.add($selected);
    }
    $matches = $matches.add($selected.parents(selector));
    return $matches;
};

/**
    WYMeditor.editor.container
    ==========================

    Get or set the selected container.
*/
WYMeditor.editor.prototype.container = function (sType) {
    if (typeof (sType) === 'undefined') {
        return this.selected();
    }

    var container = null,
        aTypes = null,
        newNode = null,
        blockquote,
        nodes,
        lgt,
        firstNode = null,
        x;

    if (sType.toLowerCase() === WYMeditor.TH) {
        container = this.container();

        // Find the TD or TH container
        switch (container.tagName.toLowerCase()) {

        case WYMeditor.TD:
        case WYMeditor.TH:
            break;
        default:
            aTypes = [WYMeditor.TD, WYMeditor.TH];
            container = this.findUp(this.container(), aTypes);
            break;
        }

        // If it exists, switch
        if (container !== null) {
            sType = WYMeditor.TD;
            if (container.tagName.toLowerCase() === WYMeditor.TD) {
                sType = WYMeditor.TH;
            }
            this.switchTo(container, sType);
            this.update();
        }
    } else {
        // Set the container type
        aTypes = [
            WYMeditor.P,
            WYMeditor.H1,
            WYMeditor.H2,
            WYMeditor.H3,
            WYMeditor.H4,
            WYMeditor.H5,
            WYMeditor.H6,
            WYMeditor.PRE,
            WYMeditor.BLOCKQUOTE
        ];
        container = this.findUp(this.container(), aTypes);

        if (container) {
            if (sType.toLowerCase() === WYMeditor.BLOCKQUOTE) {
                // Blockquotes must contain a block level element
                blockquote = this.findUp(
                    this.container(),
                    WYMeditor.BLOCKQUOTE
                );
                if (blockquote === null) {
                    newNode = this._doc.createElement(sType);
                    container.parentNode.insertBefore(newNode, container);
                    newNode.appendChild(container);
                    this.setFocusToNode(newNode.firstChild);
                } else {
                    nodes = blockquote.childNodes;
                    lgt = nodes.length;

                    if (lgt > 0) {
                        firstNode = nodes.item(0);
                    }
                    for (x = 0; x < lgt; x += 1) {
                        blockquote.parentNode.insertBefore(
                            nodes.item(0),
                            blockquote
                        );
                    }
                    blockquote.parentNode.removeChild(blockquote);
                    if (firstNode) {
                        this.setFocusToNode(firstNode);
                    }
                }
            } else {
                // Not a blockquote
                this.switchTo(container, sType);
            }

            this.update();
        }
    }

    return false;
};

/**
    WYMeditor.editor.toggleClass
    ============================

    Toggle a class on the selected element or one of its parents
*/
WYMeditor.editor.prototype.toggleClass = function (sClass, jqexpr) {
    var container = null;
    if (this._selected_image) {
        container = this._selected_image;
    } else {
        container = jQuery(this.selected());
    }
    container = jQuery(container).parentsOrSelf(jqexpr);
    jQuery(container).toggleClass(sClass);

    if (!jQuery(container).attr(WYMeditor.CLASS)) {
        jQuery(container).removeAttr(this._class);
    }
};

/**
    WYMeditor.editor.findUp
    =======================

    Return the first parent or self container, based on its type

    `filter` is a string or an array of strings on which to filter the container
*/
WYMeditor.editor.prototype.findUp = function (node, filter) {
    if (typeof (node) === 'undefined' || node === null) {
        return null;
    }

    if (node.nodeName === "#text") {
        // For text nodes, we need to look from the nodes container object
        node = node.parentNode;
    }
    var tagname = node.tagName.toLowerCase(),
        bFound,
        i;
    if (typeof (filter) === WYMeditor.STRING) {
        while (tagname !== filter && tagname !== WYMeditor.BODY) {
            node = node.parentNode;
            tagname = node.tagName.toLowerCase();
        }
    } else {
        bFound = false;
        while (!bFound && tagname !== WYMeditor.BODY) {
            for (i = 0; i < filter.length; i += 1) {
                if (tagname === filter[i]) {
                    bFound = true;
                    break;
                }
            }
            if (!bFound) {
                node = node.parentNode;
                if (node === null) {
                    // No parentNode, so we're not going to find anything
                    // up the ancestry chain that matches
                    return null;
                }
                tagname = node.tagName.toLowerCase();
            }
        }
    }

    if (tagname === WYMeditor.BODY) {
        return null;
    }

    return node;
};

/**
    WYMeditor.editor.switchTo
    =========================

    Switch the type of the given `node` to type `sType`
*/
WYMeditor.editor.prototype.switchTo = function (node, sType) {
    var newNode = this._doc.createElement(sType),
        html = jQuery(node).html();

    node.parentNode.replaceChild(newNode, node);
    jQuery(newNode).html(html);

    this.setFocusToNode(newNode);
};

WYMeditor.editor.prototype.replaceStrings = function (sVal) {
    var key;
    // Check if the language file has already been loaded
    // if not, get it via a synchronous ajax call
    if (!WYMeditor.STRINGS[this._options.lang]) {
        try {
            eval(jQuery.ajax({url: this._options.langPath +
                this._options.lang + '.js', async: false}).responseText);
        } catch (e) {
            WYMeditor.console.error(
                "WYMeditor: error while parsing language file."
            );
            return sVal;
        }
    }

    // Replace all the strings in sVal and return it
    for (key in WYMeditor.STRINGS[this._options.lang]) {
        if (WYMeditor.STRINGS[this._options.lang].hasOwnProperty(key)) {
            sVal = WYMeditor.Helper.replaceAll(
                sVal,
                this._options.stringDelimiterLeft + key + this._options.stringDelimiterRight,
                WYMeditor.STRINGS[this._options.lang][key]
            );
        }
    }
    return sVal;
};

WYMeditor.editor.prototype.encloseString = function (sVal) {
    return this._options.stringDelimiterLeft +
        sVal +
        this._options.stringDelimiterRight;
};

/**
    editor.status
    =============

    Print the given string as a status message.
*/
WYMeditor.editor.prototype.status = function (sMessage) {
    // Print status message
    jQuery(this._box).find(this._options.statusSelector).html(sMessage);
};

/**
    editor.update
    =============

    Update the element and textarea values.
*/
WYMeditor.editor.prototype.update = function () {
    var html;

    // Dirty fix to remove stray line breaks (#189)
    jQuery(this._doc.body).children(WYMeditor.BR).remove();

    html = this.xhtml();
    jQuery(this._element).val(html);
    jQuery(this._box).find(this._options.htmlValSelector).not('.hasfocus').val(html); //#147
    this.fixBodyHtml();
};

/**
    editor.fixBodyHtml
    ==================

    Adjust the editor body html to account for editing changes where
    perfect HTML is not optimal. For instance, <br> elements are useful between
    certain block elements.
*/
WYMeditor.editor.prototype.fixBodyHtml = function () {
    this.fixDoubleBr();
    this.spaceBlockingElements();
};

/**
    editor.spaceBlockingElements
    ============================

    Insert <br> elements between adjacent blocking elements and
    p elements, between block elements or blocking elements and the
    start/end of the document.
*/
WYMeditor.editor.prototype.spaceBlockingElements = function () {
    var blockingSelector = WYMeditor.BLOCKING_ELEMENTS.join(', '),

        $body = $(this._doc).find('body.wym_iframe'),
        children = $body.children(),
        placeholderNode = '<br _moz_editor_bogus_node="TRUE" _moz_dirty="">',
        $firstChild,
        $lastChild,
        blockSepSelector;

    // Make sure that we still have a bogus node at both the begining and end
    if (children.length > 0) {
        $firstChild = $(children[0]);
        $lastChild = $(children[children.length - 1]);

        if ($firstChild.is(blockingSelector)) {
            $firstChild.before(placeholderNode);
        }

        if ($lastChild.is(blockingSelector)) {
            $lastChild.after(placeholderNode);
        }
    }

    blockSepSelector = this._getBlockSepSelector();

    // Put placeholder nodes between consecutive blocking elements and between
    // blocking elements and normal block-level elements
    $body.find(blockSepSelector).before(placeholderNode);
};

/**
    editor._buildBlockSepSelector
    =============================

    Build a string representing a jquery selector that will find all
    elements which need a spacer <br> before them. This includes all consecutive
    blocking elements and between blocking elements and normal non-blocking
    elements.
*/
WYMeditor.editor.prototype._getBlockSepSelector = function () {
    if (typeof (this._blockSpacersSel) !== 'undefined') {
        return this._blockSpacersSel;
    }

    var blockCombo = [];
    // Consecutive blocking elements need separators
    $.each(WYMeditor.BLOCKING_ELEMENTS, function (indexO, elementO) {
        $.each(WYMeditor.BLOCKING_ELEMENTS, function (indexI, elementI) {
            blockCombo.push(elementO + ' + ' + elementI);
        });
    });

    // A blocking element either followed by or preceeded by a block elements
    // needs separators
    $.each(WYMeditor.BLOCKING_ELEMENTS, function (indexO, elementO) {
        $.each(WYMeditor.NON_BLOCKING_ELEMENTS, function (indexI, elementI) {
            blockCombo.push(elementO + ' + ' + elementI);
            blockCombo.push(elementI + ' + ' + elementO);
        });
    });
    this._blockSpacersSel = blockCombo.join(', ');
    return this._blockSpacersSel;
};

/**
    editor.fixDoubleBr
    ==================

    Remove the <br><br> elements that are inserted between
    paragraphs, usually after hitting enter from an existing paragraph.
*/
WYMeditor.editor.prototype.fixDoubleBr = function () {
    var $body = $(this._doc).find('body.wym_iframe'),
        $last_br;
    // Strip consecutive brs unless they're in a a pre tag
    $body.children('br + br').filter(':not(pre br)').remove();

    // Also remove any brs between two p's
    $body.find('p + br').next('p').prev('br').remove();

    // Remove brs floating at the end after a p
    $last_br = $body.find('p + br').slice(-1);
    if ($last_br.length > 0) {
        if ($last_br.next().length === 0) {
            $last_br.remove();
        }
    }
};

/**
    editor.dialog
    =============

    Open a dialog box
*/
WYMeditor.editor.prototype.dialog = function (dialogType, dialogFeatures, bodyHtml) {
    var features = dialogFeatures || this._wym._options.dialogFeatures,
        wDialog = window.open('', 'dialog', features),
        sBodyHtml,
        h = WYMeditor.Helper,
        dialogHtml,
        doc;

    if (wDialog) {
        sBodyHtml = "";

        switch (dialogType) {

        case (WYMeditor.DIALOG_LINK):
            sBodyHtml = this._options.dialogLinkHtml;
            break;
        case (WYMeditor.DIALOG_IMAGE):
            sBodyHtml = this._options.dialogImageHtml;
            break;
        case (WYMeditor.DIALOG_TABLE):
            sBodyHtml = this._options.dialogTableHtml;
            break;
        case (WYMeditor.DIALOG_PASTE):
            sBodyHtml = this._options.dialogPasteHtml;
            break;
        case (WYMeditor.PREVIEW):
            sBodyHtml = this._options.dialogPreviewHtml;
            break;
        default:
            sBodyHtml = bodyHtml;
            break;
        }

        // Construct the dialog
        dialogHtml = this._options.dialogHtml;
        dialogHtml = h.replaceAll(
            dialogHtml,
            WYMeditor.BASE_PATH,
            this._options.basePath
        );
        dialogHtml = h.replaceAll(
            dialogHtml,
            WYMeditor.DIRECTION,
            this._options.direction
        );
        dialogHtml = h.replaceAll(
            dialogHtml,
            WYMeditor.CSS_PATH,
            this._options.skinPath + WYMeditor.SKINS_DEFAULT_CSS
        );
        dialogHtml = h.replaceAll(
            dialogHtml,
            WYMeditor.WYM_PATH,
            this._options.wymPath
        );
        dialogHtml = h.replaceAll(
            dialogHtml,
            WYMeditor.JQUERY_PATH,
            this._options.jQueryPath
        );
        dialogHtml = h.replaceAll(
            dialogHtml,
            WYMeditor.DIALOG_TITLE,
            this.encloseString(dialogType)
        );
        dialogHtml = h.replaceAll(
            dialogHtml,
            WYMeditor.DIALOG_BODY,
            sBodyHtml
        );
        dialogHtml = h.replaceAll(
            dialogHtml,
            WYMeditor.INDEX,
            this._index
        );

        dialogHtml = this.replaceStrings(dialogHtml);

        doc = wDialog.document;
        doc.write(dialogHtml);
        doc.close();
    }
};

/**
    editor.toggleHtml
    =================

    Show/Hide the HTML textarea.
*/
WYMeditor.editor.prototype.toggleHtml = function () {
    jQuery(this._box).find(this._options.htmlSelector).toggle();
};

WYMeditor.editor.prototype.uniqueStamp = function () {
    var now = new Date();
    return "wym-" + now.getTime();
};

/**
    Paste the given array of paragraph-items at the given range inside the given $container.

    It has already been determined that the paragraph has multiple lines and
    that the container we're pasting to is a block container capable of accepting
    further nested blocks.
*/
WYMeditor.editor.prototype._handleMultilineBlockContainerPaste = function (wym, $container, range, paragraphStrings) {

    var i,
        blockSplitter,
        leftSide,
        rightSide,
        rangeNodeComparison,
        $splitRightParagraph,
        firstParagraphString,
        firstParagraphHtml,
        blockParent,
        blockParentType;


    // Now append all subsequent paragraphs
    $insertAfter = $(blockParent);

    // Just need to split the current container and put new block elements
    // in between
    blockSplitter = 'p';
    if ($container.is('li')) {
        // Instead of creating paragraphs on line breaks, we'll need to create li's
        blockSplitter = 'li';
    }
    // Split the selected element then build and insert the appropriate html
    // This accounts for cases where the start selection is at the
    // start of a node or in the middle of a text node by splitting the
    // text nodes using rangy's splitBoundaries()
    range.splitBoundaries(); // Split any partially-select text nodes
    blockParent = wym.findUp(
        range.startContainer,
        ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li']
    );
    blockParentType = blockParent.tagName;
    leftSide = [];
    rightSide = [];
    $(blockParent).contents().each(function (index, element) {
        // Capture all of the dom nodes to the left and right of our
        // range. We can't remove them in the same step because that
        // loses the selection in webkit

        rangeNodeComparison = range.compareNode(element);
        if (rangeNodeComparison === range.NODE_BEFORE ||
                (rangeNodeComparison === range.NODE_BEFORE_AND_AFTER &&
                 range.startOffset === range.startContainer.length)) {
            // Because of the way splitBoundaries() works, the
            // collapsed selection might appear in the right-most index
            // of the border node, which means it will show up as
            //
            // eg. | is the selection and <> are text node boundaries
            // <foo|><bar>
            //
            // We detect that case by counting any
            // NODE_BEFORE_AND_AFTER result where the offset is at the
            // very end of the node as a member of the left side
            leftSide.push(element);
        } else {
            rightSide.push(element);
        }
    });
    // Now remove all of the left and right nodes
    for (i = 0; i < leftSide.length; i++) {
        $(leftSide[i]).remove();
    }
    for (i = 0; i < rightSide.length; i++) {
        $(rightSide[i]).remove();
    }

    // Rebuild our split nodes and add the inserted content
    if (leftSide.length > 0) {
        // We have left-of-selection content
        // Put the content back inside our blockParent
        $(blockParent).prepend(leftSide);
    }
    if (rightSide.length > 0) {
        // We have right-of-selection content.
        // Split it off in to a node of the same type after our
        // blockParent
        $splitRightParagraph = $('<' + blockParentType + '>' +
            '</' + blockParentType + '>', wym._doc);
        $splitRightParagraph.insertAfter($(blockParent));
        $splitRightParagraph.append(rightSide);
    }

    // Insert the first paragraph in to the current node, and then
    // start appending subsequent paragraphs
    firstParagraphString = paragraphStrings.splice(
        0,
        1
    )[0];
    firstParagraphHtml = firstParagraphString.split(WYMeditor.NEWLINE).join('<br />');
    $(blockParent).html($(blockParent).html() + firstParagraphHtml);

    // Now append all subsequent paragraphs
    $insertAfter = $(blockParent);
    for (i = 0; i < paragraphStrings.length; i++) {
        html = '<' + blockSplitter + '>' +
            (paragraphStrings[i].split(WYMeditor.NEWLINE).join('<br />')) +
            '</' + blockSplitter + '>';
        $insertAfter = $(html, wym._doc).insertAfter($insertAfter);
    }
};

/**
    editor.paste
    ============

    Paste text into the editor below the carret, used for "Paste from Word".

    Takes the string to insert as an argument. Two or more newlines separates
    paragraphs. May contain inline HTML.
*/
WYMeditor.editor.prototype.paste = function (str) {
    var container = this.selected(),
        $container,
        html = '',
        paragraphs,
        focusNode,
        i,
        l,
        isSingleLine = false,
        sel,
        textNode,
        wym,
        range;
    wym = this;
    sel = rangy.getIframeSelection(wym._iframe);
    range = sel.getRangeAt(0);
    $container = $(container);

    // Start by collapsing the range to the start of the selection. We're
    // punting on implementing a paste that also replaces existing content for
    // now,
    range.collapse(true); // Collapse to the the begining of the selection

    // Split string into paragraphs by two or more newlines
    paragraphStrings = str.split(new RegExp(WYMeditor.NEWLINE + '{2,}', 'g'));

    if (paragraphStrings.length === 1) {
        // This is a one-line paste, which is an easy case.
        // We try not to wrap these in paragraphs
        isSingleLine = true;
    }

    if (typeof container === 'undefined' ||
            (container && container.tagName.toLowerCase() === WYMeditor.BODY)) {
        // No selection, or body selection. Paste at the end of the document

        if (isSingleLine) {
            // Easy case. Wrap the string in p tags
            paragraphs = jQuery(
                '<p>' + paragraphStrings[0] + '</p>',
                this._doc
            ).appendTo(this._doc.body);
        } else {
            // Need to build paragraphs and insert them at the end
            blockSplitter = 'p';
            for (i = paragraphStrings.length - 1; i >= 0; i -= 1) {
                // Going backwards because rangy.insertNode leaves the
                // selection in front of the inserted node
                html = '<' + blockSplitter + '>' +
                    (paragraphStrings[i].split(WYMeditor.NEWLINE).join('<br />')) +
                    '</' + blockSplitter + '>';
                // Build multiple nodes from the HTML because ie6 chokes
                // creating multiple nodes implicitly via jquery
                var insertionNodes = $(html, wym._doc);
                for (j = insertionNodes.length - 1; j >= 0; j--) {
                    // Loop backwards through all of the nodes because
                    // insertNode moves that direction
                    range.insertNode(insertionNodes[j]);
                }
            }
        }
    } else {
        // Pasting inside an existing element
        if (isSingleLine || $container.is('pre')) {
            // Easy case. Insert a text node at the current selection
            textNode = this._doc.createTextNode(str);
            range.insertNode(textNode);
        } else if ($container.is('p,h1,h2,h3,h4,h5,h6,li')) {
            wym._handleMultilineBlockContainerPaste(wym, $container, range, paragraphStrings);
        } else {
            // We're in a container that doesn't accept nested paragraphs (eg. td). Use
            // <br> separators everywhere instead
            textNodesToInsert = str.split(WYMeditor.NEWLINE);
            for (i = textNodesToInsert.length - 1; i >= 0; i -= 1) {
                // Going backwards because rangy.insertNode leaves the
                // selection in front of the inserted node
                textNode = this._doc.createTextNode(textNodesToInsert[i]);
                range.insertNode(textNode);
                if (i > 0) {
                    // Don't insert an opening br
                    range.insertNode($('<br />', wym._doc).get(0));
                }
            }
        }
    }
};

WYMeditor.editor.prototype.insert = function (html) {
    // Do we have a selection?
    var selection = this._iframe.contentWindow.getSelection(),
        range,
        node;
    if (selection.focusNode !== null) {
        // Overwrite selection with provided html
        range = selection.getRangeAt(0);
        node = range.createContextualFragment(html);
        range.deleteContents();
        range.insertNode(node);
    } else {
        // Fall back to the internal paste function if there's no selection
        this.paste(html);
    }
};

WYMeditor.editor.prototype.wrap = function (left, right) {
    this.insert(
        left + this._iframe.contentWindow.getSelection().toString() + right
    );
};

WYMeditor.editor.prototype.unwrap = function () {
    this.insert(this._iframe.contentWindow.getSelection().toString());
};

WYMeditor.editor.prototype.setFocusToNode = function (node, toStart) {
    var range = this._doc.createRange(),
        selection = this._iframe.contentWindow.getSelection();
    toStart = toStart ? 0 : 1;

    range.selectNodeContents(node);
    selection.addRange(range);
    selection.collapse(node, toStart);
    this._iframe.contentWindow.focus();
};

WYMeditor.editor.prototype.addCssRules = function (doc, aCss) {
    var styles = doc.styleSheets[0],
        i,
        oCss;
    if (styles) {
        for (i = 0; i < aCss.length; i += 1) {
            oCss = aCss[i];
            if (oCss.name && oCss.css) {
                this.addCssRule(styles, oCss);
            }
        }
    }
};

WYMeditor.editor.prototype._canIndent = function (focusNode, anchorNode) {
    // Ensure that we're indenting exactly one list item

    if (focusNode && focusNode === anchorNode &&
            focusNode.tagName.toLowerCase() === WYMeditor.LI) {
        // This is a single li tag

        var ancestor = focusNode.parentNode.parentNode;

        if (focusNode.parentNode.childNodes.length > 1 ||
                ancestor.tagName.toLowerCase() === WYMeditor.OL ||
                ancestor.tagName.toLowerCase() === WYMeditor.UL ||
                ancestor.tagName.toLowerCase() === WYMeditor.LI) {

            return true;
        }
    }

    return false;
};

WYMeditor.editor.prototype._canOutdent = function (focusNode, anchorNode) {
    // Ensure that we're indenting exactly one list item and it's already
    // indented at least one level

    if (focusNode && focusNode === anchorNode &&
            focusNode.tagName.toLowerCase() === WYMeditor.LI) {
        // This is a single li tag

        var ancestor = focusNode.parentNode.parentNode;

        if (focusNode.parentNode.childNodes.length > 1 ||
                ancestor.tagName.toLowerCase() === WYMeditor.OL ||
                ancestor.tagName.toLowerCase() === WYMeditor.UL ||
                ancestor.tagName.toLowerCase() === WYMeditor.LI) {

            // This is a nested list. Now ensure that's already indented
            // at least one level
            if ($(ancestor).parent().is('ol,ul,li')) {
                return true;
            }
        }
    }

    return false;
};

/**
    editor.indent
    =============

    Indent a list item via the dom, ensuring that the selected node moves in
    exactly one level and all other nodes stay at the same level.
 */
WYMeditor.editor.prototype.indent = function () {
    var focusNode = this.selected(),
        sel = rangy.getIframeSelection(this._iframe),
        startContainer = sel.getRangeAt(0).startContainer,
        startOffset = sel.getRangeAt(0).startOffset,
        anchorNode = sel.anchorNode,

        $spacerList,
        $prevList,
        $listContents,

        $focusNode,
        listType,
        itemContents,
        spacerHtml,

        $prevLi,
        $prevSubList,
        $children,

        $sublistContents,

        containerHtml,

        $contents,

        $maybeListSpacer,
        $maybePreviousSublist,

        $nextSublist,

        $spacer,
        $spacerContents,

        iframeWin,
        range;

    focusNode = this.findUp(focusNode, WYMeditor.BLOCKS);
    anchorNode = this.findUp(anchorNode, WYMeditor.BLOCKS);

    if (!this._canIndent(focusNode, anchorNode)) {
        return;
    }

    $focusNode = $(focusNode);
    listType = $focusNode.parent()[0].tagName.toLowerCase();

    // Extract any non-list children so they can be inserted
    // back in the list item after it is moved
    itemContents = $focusNode.contents().not('ol,ul');

    if ($focusNode.prev().length === 0 && $focusNode.parent().not('ul,ol,li')) {
        // First item at the root level of a list
        // Going to need a spacer list item
        spacerHtml = '<li class="spacer_li">' +
            '<' + listType + '></' + listType + '>' +
            '</li>';
        $focusNode.before(spacerHtml);
        $spacerList = $focusNode.prev().find(listType);
        $focusNode.children().unwrap();
        $spacerList.append($focusNode);

    } else if ($focusNode.prev().contents().last().is(listType)) {
        // We have a sublist at the appropriate level as a previous sibling.
        // Leave the children where they are and join the previous sublist
        $prevLi = $focusNode.prev();
        $prevSubList = $prevLi.contents().last();
        $children = $focusNode.children();
        $children.unwrap();
        // Join our node at the end of the target sublist
        $prevSubList.append($focusNode);

        // Stick all of the children at the end of the previous li
        $children.detach();
        $prevLi.append($children);
        // If the first child is of the same list type, join them
        if ($children.first().is(listType)) {
            $sublistContents = $children.first().children();
            $sublistContents.unwrap();
            $sublistContents.detach();
            $prevSubList.append($sublistContents);
        }
    } else if ($focusNode.children('ol,ul').length === 0) {
        // No sublist to join.
        // Leave the children where they are and join the previous list
        $prevList = $focusNode.prev().filter('li');
        $focusNode.children().unwrap();
        containerHtml = '<' + listType + '></' + listType + '>';
        $prevList.append(containerHtml);
        $prevList.children(listType).last().append($focusNode);
    } else {
        // We have a sublist to join, so just jump to the front there and leave
        // the children where they are
        $contents = $focusNode.contents().unwrap();
        $contents.wrapAll('<li class="spacer_li"></li>');
        $contents.filter('ol,ul').first().prepend($focusNode);
    }

    // Put the non-list content back inside the li
    $focusNode.prepend(itemContents);

    // If we just created lists next to eachother, join them
    $maybeListSpacer = $focusNode.parent().parent('li.spacer_li');
    if ($maybeListSpacer.length === 1) {
        $maybePreviousSublist = $maybeListSpacer.prev().filter('li').contents().last();
        if ($maybePreviousSublist.is(listType)) {
            // The last child (including text nodes) of the previous li is the
            // same type of list that we just had to wrap in a listSpacer.
            // Join them.
            $listContents = $focusNode.parent().contents();
            $maybeListSpacer.detach();
            $maybePreviousSublist.append($listContents);
        } else if ($maybeListSpacer.next('li').contents().first().is(listType)) {
            // The first child (including text nodes) of the next li is the same
            // type of list we just wrapped in a listSpacer. Join them.
            $nextSublist = $maybeListSpacer.next('li').children().first();
            $listContents = $focusNode.parent().contents();
            $maybeListSpacer.detach();
            $nextSublist.prepend($listContents);
        } else if ($maybeListSpacer.prev().is('li')) {
            // There is a normal li before our spacer, but it doesn't have
            // a proper sublist. Just join their contents
            $prevList = $maybeListSpacer.prev();
            $maybeListSpacer.detach();
            $prevList.append($maybeListSpacer.contents());
        }
    }

    // If we eliminated the need for a spacer_li, remove it
    if ($focusNode.next().is('.spacer_li')) {
        $spacer = $focusNode.next('.spacer_li');
        $spacerContents = $spacer.contents();
        $spacerContents.detach();
        $focusNode.append($spacerContents);
        $spacer.remove();
    }

    // Put the selection back on the li element
    iframeWin = this._iframe.contentWindow;
    sel = rangy.getSelection(iframeWin);

    range = rangy.createRange(this._doc);
    range.setStart(startContainer, startOffset);
    range.setEnd(startContainer, startOffset);
    range.collapse(false);

    sel.setSingleRange(range);

};

/**
    editor.outdent
    ==============

    Outdent a list item, accounting for firefox bugs to ensure consistent
    behavior and valid HTML.
*/
WYMeditor.editor.prototype.outdent = function () {
    var focusNode = this.selected(),
        sel = rangy.getIframeSelection(this._iframe),
        startContainer = sel.getRangeAt(0).startContainer,
        startOffset = sel.getRangeAt(0).startOffset,
        anchorNode = sel.anchorNode,
        $focusNode,
        $parentItem,
        listType,

        $subsequentItems,
        $childLists,

        $sublist,
        $maybeConsecutiveLists,

        iframeWin,
        range;

    focusNode = this.findUp(focusNode, WYMeditor.BLOCKS);
    anchorNode = this.findUp(anchorNode, WYMeditor.BLOCKS);

    if (!this._canOutdent(focusNode, anchorNode)) {
        return;
    }

    $focusNode = $(focusNode);
    // This item is in a sublist. Firefox doesn't properly dedent this
    // as it's own item, instead it just tacks its content to the end of
    // the parent item after the sublist

    $parentItem = $focusNode.parent().parent('li');
    listType = $focusNode.parent()[0].tagName.toLowerCase();

    // If this li has li's following, those will need to be moved as
    // sublist elements after the outdent
    $subsequentItems = $focusNode.nextAll('li');

    $focusNode.detach();
    $parentItem.after($focusNode);

    // If this node has one or more sublist, they will need to be indented
    // by one with a fake parent to hold their previous position
    $childLists = $focusNode.children('ol,ul');
    if ($childLists.length > 0) {
        $childLists.each(function (index, childList) {
            var $childList = $(childList),
                spacerListHtml;
            $childList.detach();

            spacerListHtml = '<' + listType + '>' +
                '<li class="spacer_li"></li>' +
                '</' + listType + '>';
            $focusNode.append(spacerListHtml);
            $focusNode.children(listType).last().children('li').append($childList);
        });
    }

    if ($subsequentItems.length > 0) {
        // Nest the previously-subsequent items inside the list to
        // retain order and their indent level
        $sublist = $subsequentItems;
        $sublist.detach();

        $focusNode.append("<" + listType + "></" + listType + ">");
        $focusNode.find(listType).last().append($subsequentItems);

        // If we just created lists next to eachother, join them
        $maybeConsecutiveLists = $focusNode
            .children(listType + ' + ' + listType);
        if ($maybeConsecutiveLists.length > 0) {
            // Join the same-type adjacent lists we found
            $maybeConsecutiveLists.each(function (index, list) {
                var $list = $(list),
                    $listContents = $list.contents(),
                    $prevList = $list.prev();

                $listContents.detach();
                $list.remove();
                $prevList.append($listContents);
            });
        }
    }

    // Remove any now-empty lists
    $parentItem.find('ul:empty,ol:empty').remove();

    // If we eliminated the need for a spacer_li, remove it
    // Comes after empty list removal so that we only remove
    // totally empty spacer li's
    if ($parentItem.is('.spacer_li') && $parentItem.is(':empty')) {
        $parentItem.remove();
    }

    // Put the selection back on the li element
    iframeWin = this._iframe.contentWindow;
    sel = rangy.getSelection(iframeWin);

    range = rangy.createRange(this._doc);
    range.setStart(startContainer, startOffset);
    range.setEnd(startContainer, startOffset);
    range.collapse(false);

    sel.setSingleRange(range);
};

/**
     editor.insertTable
     ==================

     Insert a table at the current selection with the given number of rows
     and columns and with the given caption and summary text.
*/
WYMeditor.editor.prototype.insertTable = function (rows, columns, caption, summary) {
    if ((rows <= 0) || (columns <= 0)) {
        // We need rows and columns to make a table

        // TODO: It seems to me we should warn the user when zero columns and/or
        // rows were entered.
        return;
    }

    var table = this._doc.createElement(WYMeditor.TABLE),
        newRow = null,
        newCol = null,
        newCaption,

        x,
        y,

        container;

    // Create the table caption
    newCaption = table.createCaption();
    newCaption.innerHTML = caption;

    // Create the rows and cells
    for (x = 0; x < rows; x += 1) {
        newRow = table.insertRow(x);
        for (y = 0; y < columns; y += 1) {
            newRow.insertCell(y);
        }
    }

    if (summary !== "") {
        // Only need to set the summary if we actually have a summary
        jQuery(table).attr('summary', summary);
    }

    // Find the currently-selected container
    container = jQuery(
        this.findUp(this.container(), WYMeditor.MAIN_CONTAINERS)
    ).get(0);

    if (!container || !container.parentNode) {
        // No valid selected container. Put the table at the end.
        jQuery(this._doc.body).append(table);
    } else {
        // Append the table after the currently-selected container
        jQuery(container).after(table);
    }

    // Handle any browser-specific cleanup
    this.afterInsertTable(table);
    this.fixBodyHtml();

    return table;
};

/**
    editor.afterInsertTable
    =======================

    Handle cleanup/normalization after inserting a table. Different browsers
    need slightly different tweaks.
*/
WYMeditor.editor.prototype.afterInsertTable = function (table) {};

WYMeditor.editor.prototype.configureEditorUsingRawCss = function () {
    var CssParser = new WYMeditor.WymCssParser();
    if (this._options.stylesheet) {
        CssParser.parse(
            jQuery.ajax({
                url: this._options.stylesheet,
                async: false
            }).responseText
        );
    } else {
        CssParser.parse(this._options.styles, false);
    }

    if (this._options.classesItems.length === 0) {
        this._options.classesItems = CssParser.css_settings.classesItems;
    }
    if (this._options.editorStyles.length === 0) {
        this._options.editorStyles = CssParser.css_settings.editorStyles;
    }
    if (this._options.dialogStyles.length === 0) {
        this._options.dialogStyles = CssParser.css_settings.dialogStyles;
    }
};

WYMeditor.editor.prototype.listen = function () {
    var wym = this;

    // Don't use jQuery.find() on the iframe body
    // because of MSIE + jQuery + expando issue (#JQ1143)

    jQuery(this._doc.body).bind("mousedown", function (e) {
        wym.mousedown(e);
    });
};

WYMeditor.editor.prototype.mousedown = function (evt) {
    // Store the selected image if we clicked an <img> tag
    this._selected_image = null;
    if (evt.target.tagName.toLowerCase() === WYMeditor.IMG) {
        this._selected_image = evt.target;
    }
};

/**
    WYMeditor.loadCss
    =================

    Load a stylesheet in the document.

    href - The CSS path.
*/
WYMeditor.loadCss = function (href) {
    var link = document.createElement('link'),
        head;
    link.rel = 'stylesheet';
    link.href = href;

    head = jQuery('head').get(0);
    head.appendChild(link);
};

/**
    WYMeditor.editor.loadSkin
    =========================

    Load the skin CSS and initialization script (if needed).
*/
WYMeditor.editor.prototype.loadSkin = function () {
    // Does the user want to automatically load the CSS (default: yes)?
    // We also test if it hasn't been already loaded by another instance
    // see below for a better (second) test
    if (this._options.loadSkin && !WYMeditor.SKINS[this._options.skin]) {
        // Check if it hasn't been already loaded so we don't load it more
        // than once (we check the existing <link> elements)
        var found = false,
            rExp = new RegExp(this._options.skin +
                '\/' + WYMeditor.SKINS_DEFAULT_CSS + '$');

        jQuery('link').each(function () {
            if (this.href.match(rExp)) {
                found = true;
            }
        });

        // Load it, using the skin path
        if (!found) {
            WYMeditor.loadCss(
                this._options.skinPath + WYMeditor.SKINS_DEFAULT_CSS
            );
        }
    }

    // Put the classname (ex. wym_skin_default) on wym_box
    jQuery(this._box).addClass("wym_skin_" + this._options.skin);

    // Does the user want to use some JS to initialize the skin (default: yes)?
    // Also check if it hasn't already been loaded by another instance
    if (this._options.initSkin && !WYMeditor.SKINS[this._options.skin]) {
        eval(jQuery.ajax({url: this._options.skinPath +
            WYMeditor.SKINS_DEFAULT_JS, async: false}).responseText);
    }

    // Init the skin, if needed
    if (WYMeditor.SKINS[this._options.skin] && WYMeditor.SKINS[this._options.skin].init) {
        WYMeditor.SKINS[this._options.skin].init(this);
    }
};
/*jslint evil: true */
/*
 * WYMeditor : what you see is What You Mean web-based editor
 * Copyright (c) 2005 - 2009 Jean-Francois Hovinne, http://www.wymeditor.org/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 *
 * For further information visit:
 *        http://www.wymeditor.org/
 *
 * File Name:
 *        jquery.wymeditor.explorer.js
 *        MSIE specific class and functions.
 *        See the documentation for more info.
 *
 * File Authors:
 *        Jean-Francois Hovinne (jf.hovinne a-t wymeditor dotorg)
 *        Bermi Ferrer (wymeditor a-t bermi dotorg)
 *        Frédéric Palluel-Lafleur (fpalluel a-t gmail dotcom)
 *        Jonatan Lundin (jonatan.lundin a-t gmail dotcom)
 */

WYMeditor.WymClassExplorer = function (wym) {
    this._wym = wym;
    this._class = "className";
};

WYMeditor.WymClassExplorer.PLACEHOLDER_NODE = '<br>';

WYMeditor.WymClassExplorer.prototype.initIframe = function (iframe) {
    //This function is executed twice, though it is called once!
    //But MSIE needs that, otherwise designMode won't work.
    //Weird.
    this._iframe = iframe;
    this._doc = iframe.contentWindow.document;

    //add css rules from options
    var styles = this._doc.styleSheets[0];
    var aCss = eval(this._options.editorStyles);

    this.addCssRules(this._doc, aCss);

    this._doc.title = this._wym._index;

    //set the text direction
    jQuery('html', this._doc).attr('dir', this._options.direction);

    //init html value
    jQuery(this._doc.body).html(this._wym._html);

    //handle events
    var wym = this;

    this._doc.body.onfocus = function () {
        wym._doc.designMode = "on";
        wym._doc = iframe.contentWindow.document;
    };
    this._doc.onbeforedeactivate = function () {
        wym.saveCaret();
    };
    $(this._doc).bind('keyup', wym.keyup);
    // Workaround for an ie8 => ie7 compatibility mode bug triggered
    // intermittently by certain combinations of CSS on the iframe
    var ieVersion = parseInt($.browser.version, 10);
    if (ieVersion >= 8 && ieVersion < 9) {
        $(this._doc).bind('keydown', function () {
            wym.fixBluescreenOfDeath();
        });
    }
    this._doc.onkeyup = function () {
        wym.saveCaret();
    };
    this._doc.onclick = function () {
        wym.saveCaret();
    };

    this._doc.body.onbeforepaste = function () {
        wym._iframe.contentWindow.event.returnValue = false;
    };

    this._doc.body.onpaste = function () {
        wym._iframe.contentWindow.event.returnValue = false;
        wym.paste(window.clipboardData.getData("Text"));
    };

    //callback can't be executed twice, so we check
    if (this._initialized) {

        //pre-bind functions
        if (jQuery.isFunction(this._options.preBind)) {
            this._options.preBind(this);
        }


        //bind external events
        this._wym.bindEvents();

        //post-init functions
        if (jQuery.isFunction(this._options.postInit)) {
            this._options.postInit(this);
        }

        //add event listeners to doc elements, e.g. images
        this.listen();
    }

    this._initialized = true;

    //init designMode
    this._doc.designMode = "on";
    try {
        // (bermi's note) noticed when running unit tests on IE6
        // Is this really needed, it trigger an unexisting property on IE6
        this._doc = iframe.contentWindow.document;
    } catch (e) {}
};

(function (editorLoadSkin) {
    WYMeditor.WymClassExplorer.prototype.loadSkin = function () {
        // Mark container items as unselectable (#203)
        // Fix for issue explained:
        // http://stackoverflow.com/questions/1470932/ie8-iframe-designmode-loses-selection
        jQuery(this._box).find(this._options.containerSelector).attr('unselectable', 'on');

        editorLoadSkin.call(this);
    };
}(WYMeditor.editor.prototype.loadSkin));

/**
    fixBluescreenOfDeath
    ====================

    In ie8 when using ie7 compatibility mode, certain combinations of CSS on
    the iframe will trigger a bug that causes the rendering engine to give all
    block-level editable elements a negative left position that puts them off of
    the screen. This results in the editor looking blank (just the blue background)
    and requires the user to move the mouse or manipulate the DOM to force a
    re-render, which fixes the problem.

    This workaround detects the negative position and then manipulates the DOM
    to cause a re-render, which puts the elements back in position.

    A real fix would be greatly appreciated.
*/
WYMeditor.WymClassExplorer.prototype.fixBluescreenOfDeath = function () {
    var position = $(this._doc).find('p').eq(0).position();
    if (position !== null && typeof position !== 'undefined' && position.left < 0) {
        $(this._box).append('<br id="wym-bluescreen-bug-fix" />');
        $(this._box).find('#wym-bluescreen-bug-fix').remove();
    }
};


WYMeditor.WymClassExplorer.prototype._exec = function (cmd, param) {
    if (param) {
        this._doc.execCommand(cmd, false, param);
    } else {
        this._doc.execCommand(cmd);
    }
};

WYMeditor.WymClassExplorer.prototype.selected = function () {
    var caretPos = this._iframe.contentWindow.document.caretPos;
    if (caretPos) {
        if (caretPos.parentElement) {
            return caretPos.parentElement();
        }
    }
};

WYMeditor.WymClassExplorer.prototype.saveCaret = function () {
    this._doc.caretPos = this._doc.selection.createRange();
};

WYMeditor.WymClassExplorer.prototype.addCssRule = function (styles, oCss) {
    // IE doesn't handle combined selectors (#196)
    var selectors = oCss.name.split(','),
        i;
    for (i = 0; i < selectors.length; i++) {
        styles.addRule(selectors[i], oCss.css);
    }
};

WYMeditor.WymClassExplorer.prototype.insert = function (html) {

    // Get the current selection
    var range = this._doc.selection.createRange();

    // Check if the current selection is inside the editor
    if (jQuery(range.parentElement()).parents().is(this._options.iframeBodySelector)) {
        try {
            // Overwrite selection with provided html
            range.pasteHTML(html);
        } catch (e) {}
    } else {
        // Fall back to the internal paste function if there's no selection
        this.paste(html);
    }
};

WYMeditor.WymClassExplorer.prototype.wrap = function (left, right) {
    // Get the current selection
    var range = this._doc.selection.createRange();

    // Check if the current selection is inside the editor
    if (jQuery(range.parentElement()).parents().is(this._options.iframeBodySelector)) {
        try {
            // Overwrite selection with provided html
            range.pasteHTML(left + range.text + right);
        } catch (e) {}
    }
};

WYMeditor.WymClassExplorer.prototype.unwrap = function () {
    // Get the current selection
    var range = this._doc.selection.createRange();

    // Check if the current selection is inside the editor
    if (jQuery(range.parentElement()).parents().is(this._options.iframeBodySelector)) {
        try {
            // Unwrap selection
            var text = range.text;
            this._exec('Cut');
            range.pasteHTML(text);
        } catch (e) {}
    }
};

WYMeditor.WymClassExplorer.prototype.keyup = function (evt) {
    //'this' is the doc
    var wym = WYMeditor.INSTANCES[this.title];

    this._selected_image = null;

    var container = null;

    if (evt.keyCode !== WYMeditor.KEY.BACKSPACE &&
            evt.keyCode !== WYMeditor.KEY.CTRL &&
            evt.keyCode !== WYMeditor.KEY.DELETE &&
            evt.keyCode !== WYMeditor.KEY.COMMAND &&
            evt.keyCode !== WYMeditor.KEY.UP &&
            evt.keyCode !== WYMeditor.KEY.DOWN &&
            evt.keyCode !== WYMeditor.KEY.ENTER &&
            !evt.metaKey &&
            !evt.ctrlKey) { // Not BACKSPACE, DELETE, CTRL, or COMMAND key

        container = wym.selected();
        var name = '';
        if (container !== null) {
            name = container.tagName.toLowerCase();
        }

        // Fix forbidden main containers
        if (name === "strong" ||
                name === "b" ||
                name === "em" ||
                name === "i" ||
                name === "sub" ||
                name === "sup" ||
                name === "a") {

            name = container.parentNode.tagName.toLowerCase();
        }

        if (name === WYMeditor.BODY) {
            // Replace text nodes with <p> tags
            wym._exec(WYMeditor.FORMAT_BLOCK, WYMeditor.P);
            wym.fixBodyHtml();
        }
    }

    // If we potentially created a new block level element or moved to a new one
    // then we should ensure that they're in the proper format
    if (evt.keyCode === WYMeditor.KEY.UP ||
            evt.keyCode === WYMeditor.KEY.DOWN ||
            evt.keyCode === WYMeditor.KEY.BACKSPACE ||
            evt.keyCode === WYMeditor.KEY.ENTER) {

        wym.fixBodyHtml();
    }
};

WYMeditor.WymClassExplorer.prototype.setFocusToNode = function (node, toStart) {
    var range = this._doc.selection.createRange();
    toStart = toStart ? true : false;

    range.moveToElementText(node);
    range.collapse(toStart);
    range.select();
    node.focus();
};

/* @name spaceBlockingElements
 * @description Insert <br> elements between adjacent blocking elements and
 * p elements, between block elements or blocking elements and after blocking
 * elements.
 */
WYMeditor.WymClassExplorer.prototype.spaceBlockingElements = function () {
    var blockingSelector = WYMeditor.BLOCKING_ELEMENTS.join(', ');

    var $body = $(this._doc).find('body.wym_iframe');
    var children = $body.children();
    var placeholderNode = WYMeditor.WymClassExplorer.PLACEHOLDER_NODE;

    // Make sure we have the appropriate placeholder nodes
    if (children.length > 0) {
        var $firstChild = $(children[0]);
        var $lastChild = $(children[children.length - 1]);

        // Ensure begining placeholder
        if ($firstChild.is(blockingSelector)) {
            $firstChild.before(placeholderNode);
        }
        if ($.browser.version >= "7.0" && $lastChild.is(blockingSelector)) {
            $lastChild.after(placeholderNode);
        }
    }

    var blockSepSelector = this._getBlockSepSelector();

    // Put placeholder nodes between consecutive blocking elements and between
    // blocking elements and normal block-level elements
    $body.find(blockSepSelector).before(placeholderNode);
};

/*jslint evil: true */
/*
 * WYMeditor : what you see is What You Mean web-based editor
 * Copyright (c) 2005 - 2009 Jean-Francois Hovinne, http://www.wymeditor.org/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 *
 * For further information visit:
 *        http://www.wymeditor.org/
 *
 * File Name:
 *        jquery.wymeditor.mozilla.js
 *        Gecko specific class and functions.
 *        See the documentation for more info.
 *
 * File Authors:
 *        Jean-Francois Hovinne (jf.hovinne a-t wymeditor dotorg)
 *        Volker Mische (vmx a-t gmx dotde)
 *        Bermi Ferrer (wymeditor a-t bermi dotorg)
 *        Frédéric Palluel-Lafleur (fpalluel a-t gmail dotcom)
 *        Jonatan Lundin (jonatan.lundin a-t gmail dotcom)
 */

WYMeditor.WymClassMozilla = function (wym) {
    this._wym = wym;
    this._class = "class";
};

// Placeholder cell to allow content in TD cells for FF 3.5+
WYMeditor.WymClassMozilla.CELL_PLACEHOLDER = '<br _moz_dirty="">';

// Firefox 3.5 and 3.6 require the CELL_PLACEHOLDER and 4.0 doesn't
WYMeditor.WymClassMozilla.NEEDS_CELL_FIX = $.browser.version >= '1.9.1' &&
    $.browser.version < '2.0';

WYMeditor.WymClassMozilla.prototype.initIframe = function (iframe) {
    var wym = this;

    this._iframe = iframe;
    this._doc = iframe.contentDocument;

    //add css rules from options
    var styles = this._doc.styleSheets[0];

    var aCss = eval(this._options.editorStyles);

    this.addCssRules(this._doc, aCss);

    this._doc.title = this._wym._index;

    //set the text direction
    jQuery('html', this._doc).attr('dir', this._options.direction);

    //init html value
    this.html(this._wym._html);

    //init designMode
    this.enableDesignMode();

    //pre-bind functions
    if (jQuery.isFunction(this._options.preBind)) {
        this._options.preBind(this);
    }

    //bind external events
    this._wym.bindEvents();

    //bind editor keydown events
    jQuery(this._doc).bind("keydown", this.keydown);

    //bind editor keyup events
    jQuery(this._doc).bind("keyup", this.keyup);

    //bind editor click events
    jQuery(this._doc).bind("click", this.click);

    //bind editor focus events (used to reset designmode - Gecko bug)
    jQuery(this._doc).bind("focus", function () {
        // Fix scope
        wym.enableDesignMode.call(wym);
    });

    //post-init functions
    if (jQuery.isFunction(this._options.postInit)) {
        this._options.postInit(this);
    }

    //add event listeners to doc elements, e.g. images
    this.listen();
};

/* @name html
 * @description Get/Set the html value
 */
WYMeditor.WymClassMozilla.prototype.html = function (html) {
    if (typeof html === 'string') {
        //disable designMode
        try {
            this._doc.designMode = "off";
        } catch (e) {
            //do nothing
        }

        //replace em by i and strong by bold
        //(designMode issue)
        html = html.replace(/<em(\b[^>]*)>/gi, "<i$1>");
        html = html.replace(/<\/em>/gi, "</i>");
        html = html.replace(/<strong(\b[^>]*)>/gi, "<b$1>");
        html = html.replace(/<\/strong>/gi, "</b>");

        //update the html body
        jQuery(this._doc.body).html(html);
        this._wym.fixBodyHtml();

        //re-init designMode
        this.enableDesignMode();
    } else {
        return jQuery(this._doc.body).html();
    }
    return false;
};

WYMeditor.WymClassMozilla.prototype._exec = function (cmd, param) {
    if (!this.selected()) {
        return false;
    }

    if (param) {
        this._doc.execCommand(cmd, '', param);
    } else {
        this._doc.execCommand(cmd, '', null);
    }

    //set to P if parent = BODY
    var container = this.selected();
    if (container.tagName.toLowerCase() === WYMeditor.BODY) {
        this._exec(WYMeditor.FORMAT_BLOCK, WYMeditor.P);
    }

    return true;
};

WYMeditor.WymClassMozilla.prototype.addCssRule = function (styles, oCss) {

    styles.insertRule(oCss.name + " {" + oCss.css + "}",
        styles.cssRules.length);
};

//keydown handler, mainly used for keyboard shortcuts
WYMeditor.WymClassMozilla.prototype.keydown = function (evt) {
    //'this' is the doc
    var wym = WYMeditor.INSTANCES[this.title];

    if (evt.ctrlKey) {
        if (evt.keyCode === 66) {
            //CTRL+b => STRONG
            wym._exec(WYMeditor.BOLD);
            return false;
        }
        if (evt.keyCode === 73) {
            //CTRL+i => EMPHASIS
            wym._exec(WYMeditor.ITALIC);
            return false;
        }
    }

    return true;
};

// Keyup handler, mainly used for cleanups
WYMeditor.WymClassMozilla.prototype.keyup = function (evt) {
    // 'this' is the doc
    var wym = WYMeditor.INSTANCES[this.title];

    wym._selected_image = null;
    var container = null;

    if (evt.keyCode !== WYMeditor.KEY.BACKSPACE &&
            evt.keyCode !== WYMeditor.KEY.CTRL &&
            evt.keyCode !== WYMeditor.KEY.DELETE &&
            evt.keyCode !== WYMeditor.KEY.COMMAND &&
            evt.keyCode !== WYMeditor.KEY.UP &&
            evt.keyCode !== WYMeditor.KEY.DOWN &&
            evt.keyCode !== WYMeditor.KEY.LEFT &&
            evt.keyCode !== WYMeditor.KEY.RIGHT &&
            evt.keyCode !== WYMeditor.KEY.ENTER &&
            !evt.metaKey &&
            !evt.ctrlKey) { // Not BACKSPACE, DELETE, CTRL, or COMMAND key

        container = wym.selected();
        var name = container.tagName.toLowerCase();

        //fix forbidden main containers
        if (name === "strong" ||
                name === "b" ||
                name === "em" ||
                name === "i" ||
                name === "sub" ||
                name === "sup" ||
                name === "a") {

            name = container.parentNode.tagName.toLowerCase();
        }

        if (name === WYMeditor.BODY) {
            // Replace text nodes with <p> tags
            wym._exec(WYMeditor.FORMAT_BLOCK, WYMeditor.P);
            wym.fixBodyHtml();
        }
    }

    // If we potentially created a new block level element or moved to a new one
    // then we should ensure that they're in the proper format
    if (evt.keyCode === WYMeditor.KEY.UP ||
            evt.keyCode === WYMeditor.KEY.DOWN ||
            evt.keyCode === WYMeditor.KEY.LEFT ||
            evt.keyCode === WYMeditor.KEY.RIGHT ||
            evt.keyCode === WYMeditor.KEY.BACKSPACE ||
            evt.keyCode === WYMeditor.KEY.ENTER) {
        wym.fixBodyHtml();
    }
};

WYMeditor.WymClassMozilla.prototype.click = function (evt) {
    var wym = WYMeditor.INSTANCES[this.title];
    var container = wym.selected();

    if (WYMeditor.WymClassMozilla.NEEDS_CELL_FIX === true) {
        if (container && container.tagName.toLowerCase() === WYMeditor.TR) {
            // Starting with FF 3.6, inserted tables need some content in their
            // cells before they're editable
            jQuery(WYMeditor.TD, wym._doc.body).
                append(WYMeditor.WymClassMozilla.CELL_PLACEHOLDER);

            // The user is still going to need to move out of and then back in
            // to this cell if the table was inserted via an inner_html call
            // (like via the manual HTML editor).
            // TODO: Use rangy or some other selection library to consistently
            // put the users selection out of and then back in this cell
            // so that it appears to be instantly editable
            // Once accomplished, can remove the afterInsertTable handling
        }
    }

    if (container && container.tagName.toLowerCase() === WYMeditor.BODY) {
        // A click in the body means there is no content at all, so we
        // should automatically create a starter paragraph
        var sel = wym._iframe.contentWindow.getSelection();
        if (sel.isCollapsed === true) {
            // If the selection isn't collapsed, we might have a selection that
            // drags over the body, but we shouldn't turn everything in to a
            // paragraph tag. Otherwise, double-clicking in the space to the
            // right of an h2 tag would turn it in to a paragraph
            wym._exec(WYMeditor.FORMAT_BLOCK, WYMeditor.P);
        }
    }
};

WYMeditor.WymClassMozilla.prototype.enableDesignMode = function () {
    if (this._doc.designMode === "off") {
        try {
            this._doc.designMode = "on";
            this._doc.execCommand("styleWithCSS", '', false);
            this._doc.execCommand("enableObjectResizing", false, false);
        } catch (e) {}
    }
};

WYMeditor.WymClassMozilla.prototype.openBlockTag = function (tag, attributes) {
    attributes = this.validator.getValidTagAttributes(tag, attributes);

    // Handle Mozilla styled spans
    if (tag === 'span' && attributes.style) {
        var new_tag = this.getTagForStyle(attributes.style);
        if (new_tag) {
            tag = new_tag;
            this._tag_stack.pop();
            this._tag_stack.push(tag);
            attributes.style = '';
        }
    }

    this.output += this.helper.tag(tag, attributes, true);
};

WYMeditor.WymClassMozilla.prototype.getTagForStyle = function (style) {
    if (/bold/.test(style)) {
        return 'strong';
    } else if (/italic/.test(style)) {
        return 'em';
    } else if (/sub/.test(style)) {
        return 'sub';
    } else if (/super/.test(style)) {
        return 'sup';
    }

    return false;
};

/*
 * Fix new cell contents and ability to insert content at the front and end of
 * the contents.
 */
WYMeditor.WymClassMozilla.prototype.afterInsertTable = function (table) {
    if (WYMeditor.WymClassMozilla.NEEDS_CELL_FIX === true) {
        // In certain FF versions, inserted tables need some content in their
        // cells before they're editable, otherwise the user has to move focus
        // in and then out of a cell first, even with our click() hack
        $(table).find('td').each(function (index, element) {
            $(element).append(WYMeditor.WymClassMozilla.CELL_PLACEHOLDER);
        });
    }
};
/*jslint evil: true */
/*
 * WYMeditor : what you see is What You Mean web-based editor
 * Copyright (c) 2005 - 2009 Jean-Francois Hovinne, http://www.wymeditor.org/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 *
 * For further information visit:
 *        http://www.wymeditor.org/
 *
 * File Name:
 *        jquery.wymeditor.opera.js
 *        Opera specific class and functions.
 *        See the documentation for more info.
 *
 * File Authors:
 *        Jean-Francois Hovinne (jf.hovinne a-t wymeditor dotorg)
 */

WYMeditor.WymClassOpera = function(wym) {
    this._wym = wym;
    this._class = "class";
};

WYMeditor.WymClassOpera.prototype.initIframe = function(iframe) {
    this._iframe = iframe;
    this._doc = iframe.contentWindow.document;

    //add css rules from options
    var styles = this._doc.styleSheets[0];
    var aCss = eval(this._options.editorStyles);

    this.addCssRules(this._doc, aCss);

    this._doc.title = this._wym._index;

    //set the text direction
    jQuery('html', this._doc).attr('dir', this._options.direction);

    //init designMode
    this._doc.designMode = "on";

    //init html value
    this.html(this._wym._html);

    //pre-bind functions
    if (jQuery.isFunction(this._options.preBind)) {
        this._options.preBind(this);
    }

    //bind external events
    this._wym.bindEvents();

    //bind editor keydown events
    jQuery(this._doc).bind("keydown", this.keydown);

    //bind editor events
    jQuery(this._doc).bind("keyup", this.keyup);

    //post-init functions
    if (jQuery.isFunction(this._options.postInit)) {
        this._options.postInit(this);
    }

    //add event listeners to doc elements, e.g. images
    this.listen();
};

WYMeditor.WymClassOpera.prototype._exec = function(cmd, param) {
    if (param) {
        this._doc.execCommand(cmd, false, param);
    }
    else {
        this._doc.execCommand(cmd);
    }
};

WYMeditor.WymClassOpera.prototype.selected = function() {
    var sel = this._iframe.contentWindow.getSelection();
    var node = sel.focusNode;
    if (node) {
        if (node.nodeName == "#text") {
            return node.parentNode;
        } else {
            return node;
        }
    } else {
        return null;
    }
};

WYMeditor.WymClassOpera.prototype.addCssRule = function(styles, oCss) {
    styles.insertRule(
            oCss.name + " {" + oCss.css + "}", styles.cssRules.length);
};

WYMeditor.WymClassOpera.prototype.keydown = function(evt) {
    //'this' is the doc
    var wym = WYMeditor.INSTANCES[this.title];
    var sel = wym._iframe.contentWindow.getSelection();
    startNode = sel.getRangeAt(0).startContainer;

    //Get a P instead of no container
    if (!jQuery(startNode).parentsOrSelf(WYMeditor.MAIN_CONTAINERS.join(","))[0] &&
            !jQuery(startNode).parentsOrSelf('li') &&
            evt.keyCode != WYMeditor.KEY.ENTER &&
            evt.keyCode != WYMeditor.KEY.LEFT &&
            evt.keyCode != WYMeditor.KEY.UP &&
            evt.keyCode != WYMeditor.KEY.RIGHT &&
            evt.keyCode != WYMeditor.KEY.DOWN &&
            evt.keyCode != WYMeditor.KEY.BACKSPACE &&
            evt.keyCode != WYMeditor.KEY.DELETE) {

        wym._exec(WYMeditor.FORMAT_BLOCK, WYMeditor.P);
    }
};

WYMeditor.WymClassOpera.prototype.keyup = function(evt) {
    //'this' is the doc
    var wym = WYMeditor.INSTANCES[this.title];
    wym._selected_image = null;
};
/*jslint evil: true */
/*
 * WYMeditor : what you see is What You Mean web-based editor
 * Copyright (c) 2005 - 2009 Jean-Francois Hovinne, http://www.wymeditor.org/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 *
 * For further information visit:
 *        http://www.wymeditor.org/
 *
 * File Name:
 *        jquery.wymeditor.safari.js
 *        Safari specific class and functions.
 *        See the documentation for more info.
 *
 * File Authors:
 *        Jean-Francois Hovinne (jf.hovinne a-t wymeditor dotorg)
 *        Scott Lewis (lewiscot a-t gmail dotcom)
 */

WYMeditor.WymClassSafari = function(wym) {
    this._wym = wym;
    this._class = "class";
};

WYMeditor.WymClassSafari.prototype.initIframe = function(iframe) {
    this._iframe = iframe;
    this._doc = iframe.contentDocument;

    //add css rules from options
    var styles = this._doc.styleSheets[0];
    var aCss = eval(this._options.editorStyles);

    this.addCssRules(this._doc, aCss);

    this._doc.title = this._wym._index;

    //set the text direction
    jQuery('html', this._doc).attr('dir', this._options.direction);

    //init designMode
    this._doc.designMode = "on";

    //init html value
    this.html(this._wym._html);

    //pre-bind functions
    if (jQuery.isFunction(this._options.preBind)) {
        this._options.preBind(this);
    }

    //bind external events
    this._wym.bindEvents();

    //bind editor keydown events
    jQuery(this._doc).bind("keydown", this.keydown);

    //bind editor keyup events
    jQuery(this._doc).bind("keyup", this.keyup);

    //post-init functions
    if (jQuery.isFunction(this._options.postInit)) {
        this._options.postInit(this);
    }

    //add event listeners to doc elements, e.g. images
    this.listen();
};

WYMeditor.WymClassSafari.prototype._exec = function(cmd, param) {
    if (!this.selected()) {
        return false;
    }

    var focusNode = this.selected();

    switch(cmd) {
    case WYMeditor.INSERT_ORDEREDLIST: case WYMeditor.INSERT_UNORDEREDLIST:

        this._doc.execCommand(cmd,'',null);

        //Safari creates lists in e.g. paragraphs.
        //Find the container, and remove it.
        var container = this.findUp(focusNode, WYMeditor.MAIN_CONTAINERS);
        if (container) {
            jQuery(container).replaceWith(jQuery(container).html());
        }

        break;
    default:
        if (param) {
            this._doc.execCommand(cmd, '', param);
        } else {
            this._doc.execCommand(cmd, '', null);
        }

        break;
    }

    //set to P if parent = BODY
    container = this.selected();
    if (container && container.tagName.toLowerCase() == WYMeditor.BODY) {
        this._exec(WYMeditor.FORMAT_BLOCK, WYMeditor.P);
    }

    return true;
};

WYMeditor.WymClassSafari.prototype.addCssRule = function(styles, oCss) {
    styles.insertRule(oCss.name + " {" + oCss.css + "}",
        styles.cssRules.length);
};


//keydown handler, mainly used for keyboard shortcuts
WYMeditor.WymClassSafari.prototype.keydown = function(e) {
    //'this' is the doc
    var wym = WYMeditor.INSTANCES[this.title];

    if (e.ctrlKey) {
        if (e.keyCode == WYMeditor.KEY.B) {
            //CTRL+b => STRONG
            wym._exec(WYMeditor.BOLD);
            e.preventDefault();
        }
        if (e.keyCode == WYMeditor.KEY.I) {
          //CTRL+i => EMPHASIS
          wym._exec(WYMeditor.ITALIC);
          e.preventDefault();
        }
    } else if (e.shiftKey && e.keyCode == WYMeditor.KEY.ENTER) {
        // Safari 4 and earlier would show a proper linebreak in the editor and
        // then strip it upon save with the default action in the case of inserting
        // a new line after bold text
        wym._exec('InsertLineBreak');
        e.preventDefault();
    }
};

// Keyup handler, mainly used for cleanups
WYMeditor.WymClassSafari.prototype.keyup = function(evt) {
    //'this' is the doc
    var wym = WYMeditor.INSTANCES[this.title];

    wym._selected_image = null;
    var container = null;

    // Fix to allow shift + return to insert a line break in older safari
    if ($.browser.version < 534.1) {
        // Not needed in AT MAX chrome 6.0. Probably safe earlier
        if (evt.keyCode == WYMeditor.KEY.ENTER && evt.shiftKey) {
            wym._exec('InsertLineBreak');
        }
    }

    if (evt.keyCode != WYMeditor.KEY.BACKSPACE &&
            evt.keyCode != WYMeditor.KEY.CTRL &&
            evt.keyCode != WYMeditor.KEY.DELETE &&
            evt.keyCode != WYMeditor.KEY.COMMAND &&
            evt.keyCode != WYMeditor.KEY.UP &&
            evt.keyCode != WYMeditor.KEY.DOWN &&
            evt.keyCode != WYMeditor.KEY.LEFT &&
            evt.keyCode != WYMeditor.KEY.RIGHT &&
            evt.keyCode != WYMeditor.KEY.ENTER &&
            !evt.metaKey &&
            !evt.ctrlKey) {// Not BACKSPACE, DELETE, CTRL, or COMMAND key

        container = wym.selected();
        var name = container.tagName.toLowerCase();

        // Fix forbidden main containers
        if (name == "strong" ||
                name == "b" ||
                name == "em" ||
                name == "i" ||
                name == "sub" ||
                name == "sup" ||
                name == "a" ||
                name == "span") {
            // Webkit tries to use spans as a main container

            name = container.parentNode.tagName.toLowerCase();
        }

        if (name == WYMeditor.BODY || name == WYMeditor.DIV) {
            // Replace text nodes with <p> tags
            wym._exec(WYMeditor.FORMAT_BLOCK, WYMeditor.P);
            wym.fixBodyHtml();
        }
    }

    // If we potentially created a new block level element or moved to a new one
    // then we should ensure that they're in the proper format
    if (evt.keyCode == WYMeditor.KEY.UP ||
            evt.keyCode == WYMeditor.KEY.DOWN ||
            evt.keyCode == WYMeditor.KEY.LEFT ||
            evt.keyCode == WYMeditor.KEY.RIGHT ||
            evt.keyCode == WYMeditor.KEY.BACKSPACE ||
            evt.keyCode == WYMeditor.KEY.ENTER) {
        wym.fixBodyHtml();
    }
};

WYMeditor.WymClassSafari.prototype.openBlockTag = function(tag, attributes) {
    attributes = this.validator.getValidTagAttributes(tag, attributes);

    // Handle Safari styled spans
    if (tag == 'span' && attributes.style) {
        var new_tag = this.getTagForStyle(attributes.style);
        if (new_tag) {
            tag = new_tag;
            this._tag_stack.pop();
            this._tag_stack.push(tag);
            attributes.style = '';

            // Should fix #125 - also removed the xhtml() override
            if (typeof attributes['class'] == 'string') {
                attributes['class'] = attributes['class'].replace(
                        /apple-style-span/gi, '');
            }
        }
    }

    this.output += this.helper.tag(tag, attributes, true);
};

WYMeditor.WymClassSafari.prototype.getTagForStyle = function(style) {
    if (/bold/.test(style)) {
        return 'strong';
    } else if (/italic/.test(style)) {
        return 'em';
    } else if (/sub/.test(style)) {
        return 'sub';
    } else if (/super/.test(style)) {
        return 'sup';
    }

    return false;
};
/********** XHTML LEXER/PARSER **********/

/*
* @name xml
* @description Use these methods to generate XML and XHTML compliant tags and
* escape tag attributes correctly
* @author Bermi Ferrer - http://bermi.org
* @author David Heinemeier Hansson http://loudthinking.com
*/
WYMeditor.XmlHelper = function()
{
    this._entitiesDiv = document.createElement('div');
    return this;
};


/*
* @name tag
* @description
* Returns an empty HTML tag of type *name* which by default is XHTML
* compliant. Setting *open* to true will create an open tag compatible
* with HTML 4.0 and below. Add HTML attributes by passing an attributes
* array to *options*. For attributes with no value like (disabled and
* readonly), give it a value of true in the *options* array.
*
* Examples:
*
*   this.tag('br')
*    # => <br />
*   this.tag ('br', false, true)
*    # => <br>
*   this.tag ('input', jQuery({type:'text',disabled:true }) )
*    # => <input type="text" disabled="disabled" />
*/
WYMeditor.XmlHelper.prototype.tag = function(name, options, open)
{
    options = options || false;
    open = open || false;
    return '<'+name+(options ? this.tagOptions(options) : '')+(open ? '>' : ' />');
};

/*
* @name contentTag
* @description
* Returns a XML block tag of type *name* surrounding the *content*. Add
* XML attributes by passing an attributes array to *options*. For attributes
* with no value like (disabled and readonly), give it a value of true in
* the *options* array. You can use symbols or strings for the attribute names.
*
*   this.contentTag ('p', 'Hello world!' )
*    # => <p>Hello world!</p>
*   this.contentTag('div', this.contentTag('p', "Hello world!"), jQuery({class : "strong"}))
*    # => <div class="strong"><p>Hello world!</p></div>
*   this.contentTag("select", options, jQuery({multiple : true}))
*    # => <select multiple="multiple">...options...</select>
*/
WYMeditor.XmlHelper.prototype.contentTag = function(name, content, options)
{
    options = options || false;
    return '<'+name+(options ? this.tagOptions(options) : '')+'>'+content+'</'+name+'>';
};

/*
* @name cdataSection
* @description
* Returns a CDATA section for the given +content+.  CDATA sections
* are used to escape blocks of text containing characters which would
* otherwise be recognized as markup. CDATA sections begin with the string
* <tt>&lt;![CDATA[</tt> and } with (and may not contain) the string
* <tt>]]></tt>.
*/
WYMeditor.XmlHelper.prototype.cdataSection = function(content)
{
    return '<![CDATA['+content+']]>';
};


/*
* @name escapeOnce
* @description
* Returns the escaped +xml+ without affecting existing escaped entities.
*
*  this.escapeOnce( "1 > 2 &amp; 3")
*    # => "1 &gt; 2 &amp; 3"
*/
WYMeditor.XmlHelper.prototype.escapeOnce = function(xml)
{
    return this._fixDoubleEscape(this.escapeEntities(xml));
};

/*
* @name _fixDoubleEscape
* @description
* Fix double-escaped entities, such as &amp;amp;, &amp;#123;, etc.
*/
WYMeditor.XmlHelper.prototype._fixDoubleEscape = function(escaped)
{
    return escaped.replace(/&amp;([a-z]+|(#\d+));/ig, "&$1;");
};

/*
* @name tagOptions
* @description
* Takes an array like the one generated by Tag.parseAttributes
*  [["src", "http://www.editam.com/?a=b&c=d&amp;f=g"], ["title", "Editam, <Simplified> CMS"]]
* or an object like {src:"http://www.editam.com/?a=b&c=d&amp;f=g", title:"Editam, <Simplified> CMS"}
* and returns a string properly escaped like
* ' src = "http://www.editam.com/?a=b&amp;c=d&amp;f=g" title = "Editam, &lt;Simplified&gt; CMS"'
* which is valid for strict XHTML
*/
WYMeditor.XmlHelper.prototype.tagOptions = function(options)
{
    var xml = this;
    xml._formated_options = '';

    for (var key in options) {
        var formated_options = '';
        var value = options[key];
        if(typeof value != 'function' && value.length > 0) {

    if(parseInt(key, 10) == key && typeof value == 'object'){
        key = value.shift();
        value = value.pop();
    }
    if(key !== '' && value !== ''){
        xml._formated_options += ' '+key+'="'+xml.escapeOnce(value)+'"';
    }
}
}
return xml._formated_options;
};

/*
* @name escapeEntities
* @description
* Escapes XML/HTML entities <, >, & and ". If seccond parameter is set to false it
* will not escape ". If set to true it will also escape '
*/
WYMeditor.XmlHelper.prototype.escapeEntities = function(string, escape_quotes)
{
    this._entitiesDiv.innerHTML = string;
    this._entitiesDiv.textContent = string;
    var result = this._entitiesDiv.innerHTML;
    if(typeof escape_quotes == 'undefined'){
        if(escape_quotes !== false) result = result.replace('"', '&quot;');
        if(escape_quotes === true)  result = result.replace('"', '&#039;');
    }
    return result;
};

/*
* Parses a string conatining tag attributes and values an returns an array formated like
*  [["src", "http://www.editam.com"], ["title", "Editam, Simplified CMS"]]
*/
WYMeditor.XmlHelper.prototype.parseAttributes = function(tag_attributes)
{
    // Use a compounded regex to match single quoted, double quoted and unquoted attribute pairs
    var result = [];
    var matches = tag_attributes.split(/((=\s*")(")("))|((=\s*\')(\')(\'))|((=\s*[^>\s]*))/g);
    if(matches.toString() != tag_attributes){
        for (var k in matches) {
            var v = matches[k];
            if(typeof v != 'function' && v.length !== 0){
                var re = new RegExp('(\\w+)\\s*'+v);
                var match = tag_attributes.match(re);
                if(match) {
                    var value = v.replace(/^[\s=]+/, "");
                    var delimiter = value.charAt(0);
                    delimiter = delimiter == '"' ? '"' : (delimiter=="'"?"'":'');
                    if(delimiter !== ''){
                        value = delimiter == '"' ? value.replace(/^"|"+$/g, '') :  value.replace(/^'|'+$/g, '');
                    }
                    tag_attributes = tag_attributes.replace(match[0],'');
                    result.push([match[1] , value]);
                }
            }
        }
    }
    return result;
};
/**
* XhtmlValidator for validating tag attributes
*
* @author Bermi Ferrer - http://bermi.org
*/
WYMeditor.XhtmlValidator = {
    "_attributes":
    {
        "core":
        {
            "except":[
            "base",
            "head",
            "html",
            "meta",
            "param",
            "script",
            "style",
            "title"
            ],
            "attributes":[
            "class",
            "id",
            "style",
            "title",
            "accesskey",
            "tabindex",
            "/^data-.*/"
            ]
        },
        "language":
        {
            "except":[
            "base",
            "br",
            "hr",
            "iframe",
            "param",
            "script"
            ],
            "attributes":
            {
                "dir":[
                "ltr",
                "rtl"
                ],
                "0":"lang",
                "1":"xml:lang"
            }
        },
        "keyboard":
        {
            "attributes":
            {
                "accesskey":/^(\w){1}$/,
                "tabindex":/^(\d)+$/
            }
        }
    },
    "_events":
    {
        "window":
        {
            "only":[
            "body"
            ],
            "attributes":[
            "onload",
            "onunload"
            ]
        },
        "form":
        {
            "only":[
            "form",
            "input",
            "textarea",
            "select",
            "a",
            "label",
            "button"
            ],
            "attributes":[
            "onchange",
            "onsubmit",
            "onreset",
            "onselect",
            "onblur",
            "onfocus"
            ]
        },
        "keyboard":
        {
            "except":[
            "base",
            "bdo",
            "br",
            "frame",
            "frameset",
            "head",
            "html",
            "iframe",
            "meta",
            "param",
            "script",
            "style",
            "title"
            ],
            "attributes":[
            "onkeydown",
            "onkeypress",
            "onkeyup"
            ]
        },
        "mouse":
        {
            "except":[
            "base",
            "bdo",
            "br",
            "head",
            "html",
            "meta",
            "param",
            "script",
            "style",
            "title"
            ],
            "attributes":[
            "onclick",
            "ondblclick",
            "onmousedown",
            "onmousemove",
            "onmouseover",
            "onmouseout",
            "onmouseup"
            ]
        }
    },
    "_tags":
    {
        "a":
        {
            "attributes":
            {
                "0":"charset",
                "1":"coords",
                "2":"href",
                "3":"hreflang",
                "4":"name",
                "5":"rel",
                "6":"rev",
                "shape":/^(rect|rectangle|circ|circle|poly|polygon)$/,
                "7":"type"
            }
        },
        "0":"abbr",
        "1":"acronym",
        "2":"address",
        "area":
        {
            "attributes":
            {
                "0":"alt",
                "1":"coords",
                "2":"href",
                "nohref":/^(true|false)$/,
                "shape":/^(rect|rectangle|circ|circle|poly|polygon)$/
            },
            "required":[
            "alt"
            ]
        },
        "3":"b",
        "base":
        {
            "attributes":[
            "href"
            ],
            "required":[
            "href"
            ]
        },
        "bdo":
        {
            "attributes":
            {
                "dir":/^(ltr|rtl)$/
            },
            "required":[
            "dir"
            ]
        },
        "4":"big",
        "blockquote":
        {
            "attributes":[
            "cite"
            ]
        },
        "5":"body",
        "6":"br",
        "button":
        {
            "attributes":
            {
                "disabled":/^(disabled)$/,
                "type":/^(button|reset|submit)$/,
                "0":"value"
            },
            "inside":"form"
        },
        "7":"caption",
        "8":"cite",
        "9":"code",
        "col":
        {
            "attributes":
            {
                "align":/^(right|left|center|justify)$/,
                "0":"char",
                "1":"charoff",
                "span":/^(\d)+$/,
                "valign":/^(top|middle|bottom|baseline)$/,
                "2":"width"
            },
            "inside":"colgroup"
        },
        "colgroup":
        {
            "attributes":
            {
                "align":/^(right|left|center|justify)$/,
                "0":"char",
                "1":"charoff",
                "span":/^(\d)+$/,
                "valign":/^(top|middle|bottom|baseline)$/,
                "2":"width"
            }
        },
        "10":"dd",
        "del":
        {
            "attributes":
            {
                "0":"cite",
                "datetime":/^([0-9]){8}/
            }
        },
        "11":"div",
        "12":"dfn",
        "13":"dl",
        "14":"dt",
        "15":"em",
        "fieldset":
        {
            "inside":"form"
        },
        "form":
        {
            "attributes":
            {
                "0":"action",
                "1":"accept",
                "2":"accept-charset",
                "3":"enctype",
                "method":/^(get|post)$/
            },
            "required":[
            "action"
            ]
        },
        "head":
        {
            "attributes":[
            "profile"
            ]
        },
        "16":"h1",
        "17":"h2",
        "18":"h3",
        "19":"h4",
        "20":"h5",
        "21":"h6",
        "22":"hr",
        "html":
        {
            "attributes":[
            "xmlns"
            ]
        },
        "23":"i",
        "img":
        {
            "attributes":[
            "alt",
            "src",
            "height",
            "ismap",
            "longdesc",
            "usemap",
            "width"
            ],
            "required":[
            "alt",
            "src"
            ]
        },
        "input":
        {
            "attributes":
            {
                "0":"accept",
                "1":"alt",
                "checked":/^(checked)$/,
                "disabled":/^(disabled)$/,
                "maxlength":/^(\d)+$/,
                "2":"name",
                "readonly":/^(readonly)$/,
                "size":/^(\d)+$/,
                "3":"src",
                "type":/^(button|checkbox|file|hidden|image|password|radio|reset|submit|text)$/,
                "4":"value"
            },
            "inside":"form"
        },
        "ins":
        {
            "attributes":
            {
                "0":"cite",
                "datetime":/^([0-9]){8}/
            }
        },
        "24":"kbd",
        "label":
        {
            "attributes":[
            "for"
            ],
            "inside":"form"
        },
        "25":"legend",
        "26":"li",
        "link":
        {
            "attributes":
            {
                "0":"charset",
                "1":"href",
                "2":"hreflang",
                "media":/^(all|braille|print|projection|screen|speech|,|;| )+$/i,
                //next comment line required by Opera!
                /*"rel":/^(alternate|appendix|bookmark|chapter|contents|copyright|glossary|help|home|index|next|prev|section|start|stylesheet|subsection| |shortcut|icon)+$/i,*/
                "rel":/^(alternate|appendix|bookmark|chapter|contents|copyright|glossary|help|home|index|next|prev|section|start|stylesheet|subsection| |shortcut|icon)+$/i,
                "rev":/^(alternate|appendix|bookmark|chapter|contents|copyright|glossary|help|home|index|next|prev|section|start|stylesheet|subsection| |shortcut|icon)+$/i,
                "3":"type"
            },
            "inside":"head"
        },
        "map":
        {
            "attributes":[
            "id",
            "name"
            ],
            "required":[
            "id"
            ]
        },
        "meta":
        {
            "attributes":
            {
                "0":"content",
                "http-equiv":/^(content\-type|expires|refresh|set\-cookie)$/i,
                "1":"name",
                "2":"scheme"
            },
            "required":[
            "content"
            ]
        },
        "27":"noscript",
        "object":
        {
            "attributes":[
            "archive",
            "classid",
            "codebase",
            "codetype",
            "data",
            "declare",
            "height",
            "name",
            "standby",
            "type",
            "usemap",
            "width"
            ]
        },
        "28":"ol",
        "optgroup":
        {
            "attributes":
            {
                "0":"label",
                "disabled": /^(disabled)$/
            },
            "required":[
            "label"
            ]
        },
        "option":
        {
            "attributes":
            {
                "0":"label",
                "disabled":/^(disabled)$/,
                "selected":/^(selected)$/,
                "1":"value"
            },
            "inside":"select"
        },
        "29":"p",
        "param":
        {
            "attributes":
            {
                "0":"type",
                "valuetype":/^(data|ref|object)$/,
                "1":"valuetype",
                "2":"value"
            },
            "required":[
            "name"
            ]
        },
        "30":"pre",
        "q":
        {
            "attributes":[
            "cite"
            ]
        },
        "31":"samp",
        "script":
        {
            "attributes":
            {
                "type":/^(text\/ecmascript|text\/javascript|text\/jscript|text\/vbscript|text\/vbs|text\/xml)$/,
                "0":"charset",
                "defer":/^(defer)$/,
                "1":"src"
            },
            "required":[
            "type"
            ]
        },
        "select":
        {
            "attributes":
            {
                "disabled":/^(disabled)$/,
                "multiple":/^(multiple)$/,
                "0":"name",
                "1":"size"
            },
            "inside":"form"
        },
        "32":"small",
        "33":"span",
        "34":"strong",
        "style":
        {
            "attributes":
            {
                "0":"type",
                "media":/^(screen|tty|tv|projection|handheld|print|braille|aural|all)$/
            },
            "required":[
            "type"
            ]
        },
        "35":"sub",
        "36":"sup",
        "table":
        {
            "attributes":
            {
                "0":"border",
                "1":"cellpadding",
                "2":"cellspacing",
                "frame":/^(void|above|below|hsides|lhs|rhs|vsides|box|border)$/,
                "rules":/^(none|groups|rows|cols|all)$/,
                "3":"summary",
                "4":"width"
            }
        },
        "tbody":
        {
            "attributes":
            {
                "align":/^(right|left|center|justify)$/,
                "0":"char",
                "1":"charoff",
                "valign":/^(top|middle|bottom|baseline)$/
            }
        },
        "td":
        {
            "attributes":
            {
                "0":"abbr",
                "align":/^(left|right|center|justify|char)$/,
                "1":"axis",
                "2":"char",
                "3":"charoff",
                "colspan":/^(\d)+$/,
                "4":"headers",
                "rowspan":/^(\d)+$/,
                "scope":/^(col|colgroup|row|rowgroup)$/,
                "valign":/^(top|middle|bottom|baseline)$/
            }
        },
        "textarea":
        {
            "attributes":[
            "cols",
            "rows",
            "disabled",
            "name",
            "readonly"
            ],
            "required":[
            "cols",
            "rows"
            ],
            "inside":"form"
        },
        "tfoot":
        {
            "attributes":
            {
                "align":/^(right|left|center|justify)$/,
                "0":"char",
                "1":"charoff",
                "valign":/^(top|middle|bottom)$/,
                "2":"baseline"
            }
        },
        "th":
        {
            "attributes":
            {
                "0":"abbr",
                "align":/^(left|right|center|justify|char)$/,
                "1":"axis",
                "2":"char",
                "3":"charoff",
                "colspan":/^(\d)+$/,
                "4":"headers",
                "rowspan":/^(\d)+$/,
                "scope":/^(col|colgroup|row|rowgroup)$/,
                "valign":/^(top|middle|bottom|baseline)$/
            }
        },
        "thead":
        {
            "attributes":
            {
                "align":/^(right|left|center|justify)$/,
                "0":"char",
                "1":"charoff",
                "valign":/^(top|middle|bottom|baseline)$/
            }
        },
        "37":"title",
        "tr":
        {
            "attributes":
            {
                "align":/^(right|left|center|justify|char)$/,
                "0":"char",
                "1":"charoff",
                "valign":/^(top|middle|bottom|baseline)$/
            }
        },
        "38":"tt",
        "39":"ul",
        "40":"var"
    },

    // Temporary skiped attributes
    skiped_attributes : [],
    skiped_attribute_values : [],

    getValidTagAttributes: function(tag, attributes)
    {
        var valid_attributes = {};
        var possible_attributes = this.getPossibleTagAttributes(tag);
        for(var attribute in attributes) {
            var value = attributes[attribute];
            attribute = attribute.toLowerCase(); // ie8 uses colSpan
            var h = WYMeditor.Helper;
            if(!h.contains(this.skiped_attributes, attribute) && !h.contains(this.skiped_attribute_values, value)){
                if (typeof value != 'function' && h.contains(possible_attributes, attribute)) {
                    if (this.doesAttributeNeedsValidation(tag, attribute)) {
                        if(this.validateAttribute(tag, attribute, value)){
                            valid_attributes[attribute] = value;
                        }
                    }else{
                        valid_attributes[attribute] = value;
                    }
                } else {
                    jQuery.each(possible_attributes, function() {
                        if(this.match(/\/(.*)\//)) {
                            regex = new RegExp(this.match(/\/(.*)\//)[1]);
                            if(regex.test(attribute)) {
                                valid_attributes[attribute] = value;
                            }
                        }
                    });
                }
            }
        }
        return valid_attributes;
    },
    getUniqueAttributesAndEventsForTag : function(tag)
    {
        var result = [];

        if (this._tags[tag] && this._tags[tag].attributes) {
            for (var k in this._tags[tag].attributes) {
                result.push(parseInt(k, 10) == k ? this._tags[tag].attributes[k] : k);
            }
        }
        return result;
    },
getDefaultAttributesAndEventsForTags : function()
{
    var result = [];
    for (var key in this._events){
        result.push(this._events[key]);
    }
    for (key in this._attributes){
        result.push(this._attributes[key]);
    }
    return result;
},
isValidTag : function(tag)
{
    if(this._tags[tag]){
        return true;
    }
    for(var key in this._tags){
        if(this._tags[key] == tag){
            return true;
        }
    }
    return false;
},
getDefaultAttributesAndEventsForTag : function(tag)
{
    var default_attributes = [];
    if (this.isValidTag(tag)) {
        var default_attributes_and_events = this.getDefaultAttributesAndEventsForTags();

    for(var key in default_attributes_and_events) {
        var defaults = default_attributes_and_events[key];
        if(typeof defaults == 'object'){
            var h = WYMeditor.Helper;
            if ((defaults['except'] && h.contains(defaults['except'], tag)) || (defaults['only'] && !h.contains(defaults['only'], tag))) {
                continue;
            }

    var tag_defaults = defaults['attributes'] ? defaults['attributes'] : defaults['events'];
    for(var k in tag_defaults) {
        default_attributes.push(typeof tag_defaults[k] != 'string' ? k : tag_defaults[k]);
    }
}
}
}
return default_attributes;
},
doesAttributeNeedsValidation: function(tag, attribute)
{
    return this._tags[tag] && ((this._tags[tag]['attributes'] && this._tags[tag]['attributes'][attribute]) || (this._tags[tag]['required'] &&
        WYMeditor.Helper.contains(this._tags[tag]['required'], attribute)));
},
validateAttribute : function(tag, attribute, value)
{
    if ( this._tags[tag] &&
        (this._tags[tag]['attributes'] && this._tags[tag]['attributes'][attribute] && value.length > 0 && !value.match(this._tags[tag]['attributes'][attribute])) || // invalid format
        (this._tags[tag] && this._tags[tag]['required'] && WYMeditor.Helper.contains(this._tags[tag]['required'], attribute) && value.length === 0)) // required attribute
    {
        return false;
    }
    return typeof this._tags[tag] != 'undefined';
},
getPossibleTagAttributes : function(tag)
{
    if (!this._possible_tag_attributes) {
        this._possible_tag_attributes = {};
    }
    if (!this._possible_tag_attributes[tag]) {
        this._possible_tag_attributes[tag] = this.getUniqueAttributesAndEventsForTag(tag).concat(this.getDefaultAttributesAndEventsForTag(tag));
    }
    return this._possible_tag_attributes[tag];
}
};

/**
*    Compounded regular expression. Any of
*    the contained patterns could match and
*    when one does, it's label is returned.
*
*    Constructor. Starts with no patterns.
*    @param boolean case    True for case sensitive, false
*                            for insensitive.
*    @access public
*    @author Marcus Baker (http://lastcraft.com)
*    @author Bermi Ferrer (http://bermi.org)
*/
WYMeditor.ParallelRegex = function(case_sensitive)
{
    this._case = case_sensitive;
    this._patterns = [];
    this._labels = [];
    this._regex = null;
    return this;
};


/**
*    Adds a pattern with an optional label.
*    @param string pattern      Perl style regex, but ( and )
*                                lose the usual meaning.
*    @param string label        Label of regex to be returned
*                                on a match.
*    @access public
*/
WYMeditor.ParallelRegex.prototype.addPattern = function(pattern, label)
{
    label = label || true;
    var count = this._patterns.length;
    this._patterns[count] = pattern;
    this._labels[count] = label;
    this._regex = null;
};

/**
*    Attempts to match all patterns at once against
*    a string.
*    @param string subject      String to match against.
*
*    @return boolean             True on success.
*    @return string match         First matched portion of
*                                subject.
*    @access public
*/
WYMeditor.ParallelRegex.prototype.match = function(subject)
{
    if (this._patterns.length === 0) {
        return [false, ''];
    }
    var matches = subject.match(this._getCompoundedRegex());

    if(!matches){
        return [false, ''];
    }
    var match = matches[0];
    for (var i = 1; i < matches.length; i++) {
        if (matches[i]) {
            return [this._labels[i-1], match];
        }
    }
    return [true, matches[0]];
};

/**
*    Compounds the patterns into a single
*    regular expression separated with the
*    "or" operator. Caches the regex.
*    Will automatically escape (, ) and / tokens.
*    @param array patterns    List of patterns in order.
*    @access private
*/
WYMeditor.ParallelRegex.prototype._getCompoundedRegex = function()
{
    if (this._regex === null) {
        for (var i = 0, count = this._patterns.length; i < count; i++) {
            this._patterns[i] = '(' + this._untokenizeRegex(this._tokenizeRegex(this._patterns[i]).replace(/([\/\(\)])/g,'\\$1')) + ')';
        }
        this._regex = new RegExp(this._patterns.join("|") ,this._getPerlMatchingFlags());
    }
    return this._regex;
};

/**
* Escape lookahead/lookbehind blocks
*/
WYMeditor.ParallelRegex.prototype._tokenizeRegex = function(regex)
{
    return regex.
    replace(/\(\?(i|m|s|x|U)\)/,     '~~~~~~Tk1\$1~~~~~~').
    replace(/\(\?(\-[i|m|s|x|U])\)/, '~~~~~~Tk2\$1~~~~~~').
    replace(/\(\?\=(.*)\)/,          '~~~~~~Tk3\$1~~~~~~').
    replace(/\(\?\!(.*)\)/,          '~~~~~~Tk4\$1~~~~~~').
    replace(/\(\?\<\=(.*)\)/,        '~~~~~~Tk5\$1~~~~~~').
    replace(/\(\?\<\!(.*)\)/,        '~~~~~~Tk6\$1~~~~~~').
    replace(/\(\?\:(.*)\)/,          '~~~~~~Tk7\$1~~~~~~');
};

/**
* Unscape lookahead/lookbehind blocks
*/
WYMeditor.ParallelRegex.prototype._untokenizeRegex = function(regex)
{
    return regex.
    replace(/~~~~~~Tk1(.{1})~~~~~~/,    "(?\$1)").
    replace(/~~~~~~Tk2(.{2})~~~~~~/,    "(?\$1)").
    replace(/~~~~~~Tk3(.*)~~~~~~/,      "(?=\$1)").
    replace(/~~~~~~Tk4(.*)~~~~~~/,      "(?!\$1)").
    replace(/~~~~~~Tk5(.*)~~~~~~/,      "(?<=\$1)").
    replace(/~~~~~~Tk6(.*)~~~~~~/,      "(?<!\$1)").
    replace(/~~~~~~Tk7(.*)~~~~~~/,      "(?:\$1)");
};


/**
*    Accessor for perl regex mode flags to use.
*    @return string       Perl regex flags.
*    @access private
*/
WYMeditor.ParallelRegex.prototype._getPerlMatchingFlags = function()
{
    return (this._case ? "m" : "mi");
};

/**
*    States for a stack machine.
*
*    Constructor. Starts in named state.
*    @param string start        Starting state name.
*    @access public
*    @author Marcus Baker (http://lastcraft.com)
*    @author Bermi Ferrer (http://bermi.org)
*/
WYMeditor.StateStack = function(start)
{
    this._stack = [start];
    return this;
};

/**
*    Accessor for current state.
*    @return string       State.
*    @access public
*/
WYMeditor.StateStack.prototype.getCurrent = function()
{
    return this._stack[this._stack.length - 1];
};

/**
*    Adds a state to the stack and sets it
*    to be the current state.
*    @param string state        New state.
*    @access public
*/
WYMeditor.StateStack.prototype.enter = function(state)
{
    this._stack.push(state);
};

/**
*    Leaves the current state and reverts
*    to the previous one.
*    @return boolean    False if we drop off
*                       the bottom of the list.
*    @access public
*/
WYMeditor.StateStack.prototype.leave = function()
{
    if (this._stack.length == 1) {
        return false;
    }
    this._stack.pop();
    return true;
};

// GLOBALS
WYMeditor.LEXER_ENTER = 1;
WYMeditor.LEXER_MATCHED = 2;
WYMeditor.LEXER_UNMATCHED = 3;
WYMeditor.LEXER_EXIT = 4;
WYMeditor.LEXER_SPECIAL = 5;


/**
*    Accepts text and breaks it into tokens.
*    Some optimisation to make the sure the
*    content is only scanned by the PHP regex
*    parser once. Lexer modes must not start
*    with leading underscores.
*
*    Sets up the lexer in case insensitive matching
*    by default.
*    @param Parser parser  Handling strategy by reference.
*    @param string start            Starting handler.
*    @param boolean case            True for case sensitive.
*    @access public
*    @author Marcus Baker (http://lastcraft.com)
*    @author Bermi Ferrer (http://bermi.org)
*/
WYMeditor.Lexer = function(parser, start, case_sensitive)
{
    start = start || 'accept';
    this._case = case_sensitive || false;
    this._regexes = {};
    this._parser = parser;
    this._mode = new WYMeditor.StateStack(start);
    this._mode_handlers = {};
    this._mode_handlers[start] = start;
    return this;
};

/**
*    Adds a token search pattern for a particular
*    parsing mode. The pattern does not change the
*    current mode.
*    @param string pattern      Perl style regex, but ( and )
*                                lose the usual meaning.
*    @param string mode         Should only apply this
*                                pattern when dealing with
*                                this type of input.
*    @access public
*/
WYMeditor.Lexer.prototype.addPattern = function(pattern, mode)
{
    mode = mode || "accept";
    if (typeof this._regexes[mode] == 'undefined') {
        this._regexes[mode] = new WYMeditor.ParallelRegex(this._case);
    }
    this._regexes[mode].addPattern(pattern);
    if (typeof this._mode_handlers[mode] == 'undefined') {
        this._mode_handlers[mode] = mode;
    }
};

/**
*    Adds a pattern that will enter a new parsing
*    mode. Useful for entering parenthesis, strings,
*    tags, etc.
*    @param string pattern      Perl style regex, but ( and )
*                                lose the usual meaning.
*    @param string mode         Should only apply this
*                                pattern when dealing with
*                                this type of input.
*    @param string new_mode     Change parsing to this new
*                                nested mode.
*    @access public
*/
WYMeditor.Lexer.prototype.addEntryPattern = function(pattern, mode, new_mode)
{
    if (typeof this._regexes[mode] == 'undefined') {
        this._regexes[mode] = new WYMeditor.ParallelRegex(this._case);
    }
    this._regexes[mode].addPattern(pattern, new_mode);
    if (typeof this._mode_handlers[new_mode] == 'undefined') {
        this._mode_handlers[new_mode] = new_mode;
    }
};

/**
*    Adds a pattern that will exit the current mode
*    and re-enter the previous one.
*    @param string pattern      Perl style regex, but ( and )
*                                lose the usual meaning.
*    @param string mode         Mode to leave.
*    @access public
*/
WYMeditor.Lexer.prototype.addExitPattern = function(pattern, mode)
{
    if (typeof this._regexes[mode] == 'undefined') {
        this._regexes[mode] = new WYMeditor.ParallelRegex(this._case);
    }
    this._regexes[mode].addPattern(pattern, "__exit");
    if (typeof this._mode_handlers[mode] == 'undefined') {
        this._mode_handlers[mode] = mode;
    }
};

/**
*    Adds a pattern that has a special mode. Acts as an entry
*    and exit pattern in one go, effectively calling a special
*    parser handler for this token only.
*    @param string pattern      Perl style regex, but ( and )
*                                lose the usual meaning.
*    @param string mode         Should only apply this
*                                pattern when dealing with
*                                this type of input.
*    @param string special      Use this mode for this one token.
*    @access public
*/
WYMeditor.Lexer.prototype.addSpecialPattern =  function(pattern, mode, special)
{
    if (typeof this._regexes[mode] == 'undefined') {
        this._regexes[mode] = new WYMeditor.ParallelRegex(this._case);
    }
    this._regexes[mode].addPattern(pattern, '_'+special);
    if (typeof this._mode_handlers[special] == 'undefined') {
        this._mode_handlers[special] = special;
    }
};

/**
*    Adds a mapping from a mode to another handler.
*    @param string mode        Mode to be remapped.
*    @param string handler     New target handler.
*    @access public
*/
WYMeditor.Lexer.prototype.mapHandler = function(mode, handler)
{
    this._mode_handlers[mode] = handler;
};

/**
*    Splits the page text into tokens. Will fail
*    if the handlers report an error or if no
*    content is consumed. If successful then each
*    unparsed and parsed token invokes a call to the
*    held listener.
*    @param string raw        Raw HTML text.
*    @return boolean           True on success, else false.
*    @access public
*/
WYMeditor.Lexer.prototype.parse = function(raw) {
    if (typeof this._parser == 'undefined') {
        return false;
    }

    var length = raw.length;
    var parsed;
    while (typeof (parsed = this._reduce(raw)) == 'object') {
        raw = parsed[0];
        var unmatched = parsed[1];
        var matched = parsed[2];
        var mode = parsed[3];

        if (! this._dispatchTokens(unmatched, matched, mode)) {
            return false;
        }

        if (raw === '') {
            return true;
        }
        if (raw.length == length) {
            return false;
        }
        length = raw.length;
    }
    if (! parsed ) {
        return false;
    }

    return this._invokeParser(raw, WYMeditor.LEXER_UNMATCHED);
};

/**
*    Sends the matched token and any leading unmatched
*    text to the parser changing the lexer to a new
*    mode if one is listed.
*    @param string unmatched    Unmatched leading portion.
*    @param string matched      Actual token match.
*    @param string mode         Mode after match. A boolean
*                                false mode causes no change.
*    @return boolean             False if there was any error
*                                from the parser.
*    @access private
*/
WYMeditor.Lexer.prototype._dispatchTokens = function(unmatched, matched, mode) {
    mode = mode || false;

    if (! this._invokeParser(unmatched, WYMeditor.LEXER_UNMATCHED)) {
        return false;
    }

    if (typeof mode == 'boolean') {
        return this._invokeParser(matched, WYMeditor.LEXER_MATCHED);
    }
    if (this._isModeEnd(mode)) {
        if (! this._invokeParser(matched, WYMeditor.LEXER_EXIT)) {
            return false;
        }
        return this._mode.leave();
    }
    if (this._isSpecialMode(mode)) {
        this._mode.enter(this._decodeSpecial(mode));
        if (! this._invokeParser(matched, WYMeditor.LEXER_SPECIAL)) {
            return false;
        }
        return this._mode.leave();
    }
    this._mode.enter(mode);

    return this._invokeParser(matched, WYMeditor.LEXER_ENTER);
};

/**
*    Tests to see if the new mode is actually to leave
*    the current mode and pop an item from the matching
*    mode stack.
*    @param string mode    Mode to test.
*    @return boolean        True if this is the exit mode.
*    @access private
*/
WYMeditor.Lexer.prototype._isModeEnd = function(mode) {
    return (mode === "__exit");
};

/**
*    Test to see if the mode is one where this mode
*    is entered for this token only and automatically
*    leaves immediately afterwoods.
*    @param string mode    Mode to test.
*    @return boolean        True if this is the exit mode.
*    @access private
*/
WYMeditor.Lexer.prototype._isSpecialMode = function(mode) {
    return (mode.substring(0,1) == "_");
};

/**
*    Strips the magic underscore marking single token
*    modes.
*    @param string mode    Mode to decode.
*    @return string         Underlying mode name.
*    @access private
*/
WYMeditor.Lexer.prototype._decodeSpecial = function(mode) {
    return mode.substring(1);
};

/**
*    Calls the parser method named after the current
*    mode. Empty content will be ignored. The lexer
*    has a parser handler for each mode in the lexer.
*    @param string content        Text parsed.
*    @param boolean is_match      Token is recognised rather
*                                  than unparsed data.
*    @access private
*/
WYMeditor.Lexer.prototype._invokeParser = function(content, is_match) {
    if (content === '') {
        return true;
    }
    var current = this._mode.getCurrent();
    var handler = this._mode_handlers[current];
    var result = this._parser[handler](content, is_match);
    return result;
};

/**
*    Tries to match a chunk of text and if successful
*    removes the recognised chunk and any leading
*    unparsed data. Empty strings will not be matched.
*    @param string raw         The subject to parse. This is the
*                               content that will be eaten.
*    @return array/boolean      Three item list of unparsed
*                               content followed by the
*                               recognised token and finally the
*                               action the parser is to take.
*                               True if no match, false if there
*                               is a parsing error.
*    @access private
*/
WYMeditor.Lexer.prototype._reduce = function(raw) {
    var matched = this._regexes[this._mode.getCurrent()].match(raw);
    var match = matched[1];
    var action = matched[0];
    if (action) {
        var unparsed_character_count = raw.indexOf(match);
        var unparsed = raw.substr(0, unparsed_character_count);
        raw = raw.substring(unparsed_character_count + match.length);
        return [raw, unparsed, match, action];
    }
    return true;
};

/**
* This are the rules for breaking the XHTML code into events
* handled by the provided parser.
*
*    @author Marcus Baker (http://lastcraft.com)
*    @author Bermi Ferrer (http://bermi.org)
*/
WYMeditor.XhtmlLexer = function(parser) {
    jQuery.extend(this, new WYMeditor.Lexer(parser, 'Text'));

    this.mapHandler('Text', 'Text');

    this.addTokens();

    this.init();

    return this;
};


WYMeditor.XhtmlLexer.prototype.init = function() {
};

WYMeditor.XhtmlLexer.prototype.addTokens = function() {
    this.addCommentTokens('Text');
    this.addScriptTokens('Text');
    this.addCssTokens('Text');
    this.addTagTokens('Text');
};

WYMeditor.XhtmlLexer.prototype.addCommentTokens = function(scope) {
    this.addEntryPattern("<!--", scope, 'Comment');
    this.addExitPattern("-->", 'Comment');
};

WYMeditor.XhtmlLexer.prototype.addScriptTokens = function(scope) {
    this.addEntryPattern("<script", scope, 'Script');
    this.addExitPattern("</script>", 'Script');
};

WYMeditor.XhtmlLexer.prototype.addCssTokens = function(scope) {
    this.addEntryPattern("<style", scope, 'Css');
    this.addExitPattern("</style>", 'Css');
};

WYMeditor.XhtmlLexer.prototype.addTagTokens = function(scope) {
    this.addSpecialPattern("<\\s*[a-z0-9:\-]+\\s*>", scope, 'OpeningTag');
    this.addEntryPattern("<[a-z0-9:\-]+"+'[\\\/ \\\>]+', scope, 'OpeningTag');
    this.addInTagDeclarationTokens('OpeningTag');

    this.addSpecialPattern("</\\s*[a-z0-9:\-]+\\s*>", scope, 'ClosingTag');

};

WYMeditor.XhtmlLexer.prototype.addInTagDeclarationTokens = function(scope) {
    this.addSpecialPattern('\\s+', scope, 'Ignore');

    this.addAttributeTokens(scope);

    this.addExitPattern('/>', scope);
    this.addExitPattern('>', scope);

};

WYMeditor.XhtmlLexer.prototype.addAttributeTokens = function(scope) {
    this.addSpecialPattern("\\s*[a-z-_0-9]*:?[a-z-_0-9]+\\s*(?=\=)\\s*", scope, 'TagAttributes');

    this.addEntryPattern('=\\s*"', scope, 'DoubleQuotedAttribute');
    this.addPattern("\\\\\"", 'DoubleQuotedAttribute');
    this.addExitPattern('"', 'DoubleQuotedAttribute');

    this.addEntryPattern("=\\s*'", scope, 'SingleQuotedAttribute');
    this.addPattern("\\\\'", 'SingleQuotedAttribute');
    this.addExitPattern("'", 'SingleQuotedAttribute');

    this.addSpecialPattern('=\\s*[^>\\s]*', scope, 'UnquotedAttribute');
};

/**
* XHTML Parser.
*
* This XHTML parser will trigger the events available on on
* current SaxListener
*
*    @author Bermi Ferrer (http://bermi.org)
*/
WYMeditor.XhtmlParser = function(Listener, mode) {
    mode = mode || 'Text';
    this._Lexer = new WYMeditor.XhtmlLexer(this);
    this._Listener = Listener;
    this._mode = mode;
    this._matches = [];
    this._last_match = '';
    this._current_match = '';

    return this;
};

WYMeditor.XhtmlParser.prototype.parse = function(raw) {
    this._Lexer.parse(this.beforeParsing(raw));
    return this.afterParsing(this._Listener.getResult());
};

WYMeditor.XhtmlParser.prototype.beforeParsing = function(raw) {
    if (raw.match(/class="MsoNormal"/) || raw.match(/ns = "urn:schemas-microsoft-com/)) {
        // Usefull for cleaning up content pasted from other sources (MSWord)
        this._Listener.avoidStylingTagsAndAttributes();
    }
    return this._Listener.beforeParsing(raw);
};

WYMeditor.XhtmlParser.prototype.afterParsing = function(parsed) {
    if (this._Listener._avoiding_tags_implicitly) {
        this._Listener.allowStylingTagsAndAttributes();
    }
    return this._Listener.afterParsing(parsed);
};


WYMeditor.XhtmlParser.prototype.Ignore = function(match, state) {
    return true;
};

WYMeditor.XhtmlParser.prototype.Text = function(text) {
    this._Listener.addContent(text);
    return true;
};

WYMeditor.XhtmlParser.prototype.Comment = function(match, status) {
    return this._addNonTagBlock(match, status, 'addComment');
};

WYMeditor.XhtmlParser.prototype.Script = function(match, status) {
    return this._addNonTagBlock(match, status, 'addScript');
};

WYMeditor.XhtmlParser.prototype.Css = function(match, status) {
    return this._addNonTagBlock(match, status, 'addCss');
};

WYMeditor.XhtmlParser.prototype._addNonTagBlock = function(match, state, type) {
    switch (state) {
        case WYMeditor.LEXER_ENTER:
            this._non_tag = match;
            break;
        case WYMeditor.LEXER_UNMATCHED:
            this._non_tag += match;
            break;
        case WYMeditor.LEXER_EXIT:
            switch(type) {
                case 'addComment':
                    this._Listener.addComment(this._non_tag+match);
                    break;
                case 'addScript':
                    this._Listener.addScript(this._non_tag+match);
                    break;
                case 'addCss':
                    this._Listener.addCss(this._non_tag+match);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return true;
};

WYMeditor.XhtmlParser.prototype.OpeningTag = function(match, state) {
    switch (state){
        case WYMeditor.LEXER_ENTER:
            this._tag = this.normalizeTag(match);
            this._tag_attributes = {};
            break;
        case WYMeditor.LEXER_SPECIAL:
            this._callOpenTagListener(this.normalizeTag(match));
            break;
        case WYMeditor.LEXER_EXIT:
            this._callOpenTagListener(this._tag, this._tag_attributes);
            break;
        default:
            break;
    }
    return true;
};

WYMeditor.XhtmlParser.prototype.ClosingTag = function(match, state) {
    this._callCloseTagListener(this.normalizeTag(match));
    return true;
};

WYMeditor.XhtmlParser.prototype._callOpenTagListener = function(tag, attributes) {
    attributes = attributes || {};
    this.autoCloseUnclosedBeforeNewOpening(tag);

    if (this._Listener.isBlockTag(tag)) {
        this._Listener._tag_stack.push(tag);
        this._Listener.fixNestingBeforeOpeningBlockTag(tag, attributes);
        this._Listener.openBlockTag(tag, attributes);
        this._increaseOpenTagCounter(tag);
    } else if (this._Listener.isInlineTag(tag)) {
        this._Listener.inlineTag(tag, attributes);
    } else {
        this._Listener.openUnknownTag(tag, attributes);
        this._increaseOpenTagCounter(tag);
    }
    this._Listener.last_tag = tag;
    this._Listener.last_tag_opened = true;
    this._Listener.last_tag_attributes = attributes;
};

WYMeditor.XhtmlParser.prototype._callCloseTagListener = function(tag) {
    if (this._decreaseOpenTagCounter(tag)) {
        this.autoCloseUnclosedBeforeTagClosing(tag);

        if (this._Listener.isBlockTag(tag)) {
            var expected_tag = this._Listener._tag_stack.pop();
            if (expected_tag === false) {
                return;
            } else if (expected_tag != tag) {
                tag = expected_tag;
            }
            this._Listener.closeBlockTag(tag);
        } else {
            this._Listener.closeUnknownTag(tag);
        }
    } else {
        this._Listener.closeUnopenedTag(tag);
    }
    this._Listener.last_tag = tag;
    this._Listener.last_tag_opened = false;
};

WYMeditor.XhtmlParser.prototype._increaseOpenTagCounter = function(tag) {
    this._Listener._open_tags[tag] = this._Listener._open_tags[tag] || 0;
    this._Listener._open_tags[tag]++;
};

WYMeditor.XhtmlParser.prototype._decreaseOpenTagCounter = function(tag) {
    if (this._Listener._open_tags[tag]) {
        this._Listener._open_tags[tag]--;
        if (this._Listener._open_tags[tag] === 0) {
            this._Listener._open_tags[tag] = undefined;
        }
        return true;
    }
    return false;
};

WYMeditor.XhtmlParser.prototype.autoCloseUnclosedBeforeNewOpening = function(new_tag) {
    this._autoCloseUnclosed(new_tag, false);
};

WYMeditor.XhtmlParser.prototype.autoCloseUnclosedBeforeTagClosing = function(tag) {
    this._autoCloseUnclosed(tag, true);
};

WYMeditor.XhtmlParser.prototype._autoCloseUnclosed = function(new_tag, closing) {
    closing = closing || false;
    if (this._Listener._open_tags) {
        for (var tag in this._Listener._open_tags) {
            var counter = this._Listener._open_tags[tag];
            if (counter > 0 && this._Listener.shouldCloseTagAutomatically(tag, new_tag, closing)) {
                this._callCloseTagListener(tag, true);
            }
        }
    }
};

WYMeditor.XhtmlParser.prototype.getTagReplacements = function() {
    return this._Listener.getTagReplacements();
};

WYMeditor.XhtmlParser.prototype.normalizeTag = function(tag) {
    tag = tag.replace(/^([\s<\/>]*)|([\s<\/>]*)$/gm,'').toLowerCase();
    var tags = this._Listener.getTagReplacements();
    if (tags[tag]) {
        return tags[tag];
    }
    return tag;
};

WYMeditor.XhtmlParser.prototype.TagAttributes = function(match, state) {
    if (WYMeditor.LEXER_SPECIAL == state) {
        this._current_attribute = match;
    }
    return true;
};

WYMeditor.XhtmlParser.prototype.DoubleQuotedAttribute = function(match, state) {
    if (WYMeditor.LEXER_UNMATCHED == state) {
        this._tag_attributes[this._current_attribute] = match;
    }
    return true;
};

WYMeditor.XhtmlParser.prototype.SingleQuotedAttribute = function(match, state) {
    if (WYMeditor.LEXER_UNMATCHED == state) {
        this._tag_attributes[this._current_attribute] = match;
    }
    return true;
};

WYMeditor.XhtmlParser.prototype.UnquotedAttribute = function(match, state) {
    this._tag_attributes[this._current_attribute] = match.replace(/^=/,'');
    return true;
};

/**
* XHTML Sax parser.
*
*    @author Bermi Ferrer (http://bermi.org)
*/
WYMeditor.XhtmlSaxListener = function() {
    this.output = '';
    this.helper = new WYMeditor.XmlHelper();
    this._open_tags = {};
    this.validator = WYMeditor.XhtmlValidator;
    this._tag_stack = [];
    this.avoided_tags = [];

    this.entities = {
        '&nbsp;':'&#160;','&iexcl;':'&#161;','&cent;':'&#162;',
        '&pound;':'&#163;','&curren;':'&#164;','&yen;':'&#165;',
        '&brvbar;':'&#166;','&sect;':'&#167;','&uml;':'&#168;',
        '&copy;':'&#169;','&ordf;':'&#170;','&laquo;':'&#171;',
        '&not;':'&#172;','&shy;':'&#173;','&reg;':'&#174;',
        '&macr;':'&#175;','&deg;':'&#176;','&plusmn;':'&#177;',
        '&sup2;':'&#178;','&sup3;':'&#179;','&acute;':'&#180;',
        '&micro;':'&#181;','&para;':'&#182;','&middot;':'&#183;',
        '&cedil;':'&#184;','&sup1;':'&#185;','&ordm;':'&#186;',
        '&raquo;':'&#187;','&frac14;':'&#188;','&frac12;':'&#189;',
        '&frac34;':'&#190;','&iquest;':'&#191;','&Agrave;':'&#192;',
        '&Aacute;':'&#193;','&Acirc;':'&#194;','&Atilde;':'&#195;',
        '&Auml;':'&#196;','&Aring;':'&#197;','&AElig;':'&#198;',
        '&Ccedil;':'&#199;','&Egrave;':'&#200;','&Eacute;':'&#201;',
        '&Ecirc;':'&#202;','&Euml;':'&#203;','&Igrave;':'&#204;',
        '&Iacute;':'&#205;','&Icirc;':'&#206;','&Iuml;':'&#207;',
        '&ETH;':'&#208;','&Ntilde;':'&#209;','&Ograve;':'&#210;',
        '&Oacute;':'&#211;','&Ocirc;':'&#212;','&Otilde;':'&#213;',
        '&Ouml;':'&#214;','&times;':'&#215;','&Oslash;':'&#216;',
        '&Ugrave;':'&#217;','&Uacute;':'&#218;','&Ucirc;':'&#219;',
        '&Uuml;':'&#220;','&Yacute;':'&#221;','&THORN;':'&#222;',
        '&szlig;':'&#223;','&agrave;':'&#224;','&aacute;':'&#225;',
        '&acirc;':'&#226;','&atilde;':'&#227;','&auml;':'&#228;',
        '&aring;':'&#229;','&aelig;':'&#230;','&ccedil;':'&#231;',
        '&egrave;':'&#232;','&eacute;':'&#233;','&ecirc;':'&#234;',
        '&euml;':'&#235;','&igrave;':'&#236;','&iacute;':'&#237;',
        '&icirc;':'&#238;','&iuml;':'&#239;','&eth;':'&#240;',
        '&ntilde;':'&#241;','&ograve;':'&#242;','&oacute;':'&#243;',
        '&ocirc;':'&#244;','&otilde;':'&#245;','&ouml;':'&#246;',
        '&divide;':'&#247;','&oslash;':'&#248;','&ugrave;':'&#249;',
        '&uacute;':'&#250;','&ucirc;':'&#251;','&uuml;':'&#252;',
        '&yacute;':'&#253;','&thorn;':'&#254;','&yuml;':'&#255;',
        '&OElig;':'&#338;','&oelig;':'&#339;','&Scaron;':'&#352;',
        '&scaron;':'&#353;','&Yuml;':'&#376;','&fnof;':'&#402;',
        '&circ;':'&#710;','&tilde;':'&#732;','&Alpha;':'&#913;',
        '&Beta;':'&#914;','&Gamma;':'&#915;','&Delta;':'&#916;',
        '&Epsilon;':'&#917;','&Zeta;':'&#918;','&Eta;':'&#919;',
        '&Theta;':'&#920;','&Iota;':'&#921;','&Kappa;':'&#922;',
        '&Lambda;':'&#923;','&Mu;':'&#924;','&Nu;':'&#925;',
        '&Xi;':'&#926;','&Omicron;':'&#927;','&Pi;':'&#928;',
        '&Rho;':'&#929;','&Sigma;':'&#931;','&Tau;':'&#932;',
        '&Upsilon;':'&#933;','&Phi;':'&#934;','&Chi;':'&#935;',
        '&Psi;':'&#936;','&Omega;':'&#937;','&alpha;':'&#945;',
        '&beta;':'&#946;','&gamma;':'&#947;','&delta;':'&#948;',
        '&epsilon;':'&#949;','&zeta;':'&#950;','&eta;':'&#951;',
        '&theta;':'&#952;','&iota;':'&#953;','&kappa;':'&#954;',
        '&lambda;':'&#955;','&mu;':'&#956;','&nu;':'&#957;',
        '&xi;':'&#958;','&omicron;':'&#959;','&pi;':'&#960;',
        '&rho;':'&#961;','&sigmaf;':'&#962;','&sigma;':'&#963;',
        '&tau;':'&#964;','&upsilon;':'&#965;','&phi;':'&#966;',
        '&chi;':'&#967;','&psi;':'&#968;','&omega;':'&#969;',
        '&thetasym;':'&#977;','&upsih;':'&#978;','&piv;':'&#982;',
        '&ensp;':'&#8194;','&emsp;':'&#8195;','&thinsp;':'&#8201;',
        '&zwnj;':'&#8204;','&zwj;':'&#8205;','&lrm;':'&#8206;',
        '&rlm;':'&#8207;','&ndash;':'&#8211;','&mdash;':'&#8212;',
        '&lsquo;':'&#8216;','&rsquo;':'&#8217;','&sbquo;':'&#8218;',
        '&ldquo;':'&#8220;','&rdquo;':'&#8221;','&bdquo;':'&#8222;',
        '&dagger;':'&#8224;','&Dagger;':'&#8225;','&bull;':'&#8226;',
        '&hellip;':'&#8230;','&permil;':'&#8240;','&prime;':'&#8242;',
        '&Prime;':'&#8243;','&lsaquo;':'&#8249;','&rsaquo;':'&#8250;',
        '&oline;':'&#8254;','&frasl;':'&#8260;','&euro;':'&#8364;',
        '&image;':'&#8465;','&weierp;':'&#8472;','&real;':'&#8476;',
        '&trade;':'&#8482;','&alefsym;':'&#8501;','&larr;':'&#8592;',
        '&uarr;':'&#8593;','&rarr;':'&#8594;','&darr;':'&#8595;',
        '&harr;':'&#8596;','&crarr;':'&#8629;','&lArr;':'&#8656;',
        '&uArr;':'&#8657;','&rArr;':'&#8658;','&dArr;':'&#8659;',
        '&hArr;':'&#8660;','&forall;':'&#8704;','&part;':'&#8706;',
        '&exist;':'&#8707;','&empty;':'&#8709;','&nabla;':'&#8711;',
        '&isin;':'&#8712;','&notin;':'&#8713;','&ni;':'&#8715;',
        '&prod;':'&#8719;','&sum;':'&#8721;','&minus;':'&#8722;',
        '&lowast;':'&#8727;','&radic;':'&#8730;','&prop;':'&#8733;',
        '&infin;':'&#8734;','&ang;':'&#8736;','&and;':'&#8743;',
        '&or;':'&#8744;','&cap;':'&#8745;','&cup;':'&#8746;',
        '&int;':'&#8747;','&there4;':'&#8756;','&sim;':'&#8764;',
        '&cong;':'&#8773;','&asymp;':'&#8776;','&ne;':'&#8800;',
        '&equiv;':'&#8801;','&le;':'&#8804;','&ge;':'&#8805;',
        '&sub;':'&#8834;','&sup;':'&#8835;','&nsub;':'&#8836;',
        '&sube;':'&#8838;','&supe;':'&#8839;','&oplus;':'&#8853;',
        '&otimes;':'&#8855;','&perp;':'&#8869;','&sdot;':'&#8901;',
        '&lceil;':'&#8968;','&rceil;':'&#8969;','&lfloor;':'&#8970;',
        '&rfloor;':'&#8971;','&lang;':'&#9001;','&rang;':'&#9002;',
        '&loz;':'&#9674;','&spades;':'&#9824;','&clubs;':'&#9827;',
        '&hearts;':'&#9829;','&diams;':'&#9830;'};

    this.block_tags = [
        "a", "abbr", "acronym", "address", "area", "b",
        "base", "bdo", "big", "blockquote", "body", "button",
        "caption", "cite", "code", "col", "colgroup", "dd", "del", "div",
        "dfn", "dl", "dt", "em", "fieldset", "form", "head", "h1", "h2",
        "h3", "h4", "h5", "h6", "html", "i", "ins",
        "kbd", "label", "legend", "li", "map", "noscript",
        "object", "ol", "optgroup", "option", "p", "param", "pre", "q",
        "samp", "script", "select", "small", "span", "strong", "style",
        "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th",
        "thead", "title", "tr", "tt", "ul", "var", "extends"];


    this.inline_tags = ["br", "hr", "img", "input"];

    return this;
};

WYMeditor.XhtmlSaxListener.prototype.shouldCloseTagAutomatically = function(tag, now_on_tag, closing) {
    closing = closing || false;
    if (tag == 'td') {
        if ((closing && now_on_tag == 'tr') || (!closing && now_on_tag == 'td')) {
            return true;
        }
    } else if (tag == 'option') {
        if ((closing && now_on_tag == 'select') || (!closing && now_on_tag == 'option')) {
            return true;
        }
    }
    return false;
};

WYMeditor.XhtmlSaxListener.prototype.beforeParsing = function(raw) {
    this.output = '';
    return raw;
};

WYMeditor.XhtmlSaxListener.prototype.afterParsing = function(xhtml) {
    xhtml = this.replaceNamedEntities(xhtml);
    xhtml = this.joinRepeatedEntities(xhtml);
    xhtml = this.removeEmptyTags(xhtml);
    xhtml = this.removeBrInPre(xhtml);
    return xhtml;
};

WYMeditor.XhtmlSaxListener.prototype.replaceNamedEntities = function(xhtml) {
    for (var entity in this.entities) {
        xhtml = xhtml.replace(new RegExp(entity, 'g'), this.entities[entity]);
    }
    return xhtml;
};

WYMeditor.XhtmlSaxListener.prototype.joinRepeatedEntities = function(xhtml) {
    var tags = 'em|strong|sub|sup|acronym|pre|del|address';
    return xhtml.replace(new RegExp('<\/('+tags+')><\\1>' ,''), '').
            replace(
                new RegExp('(\s*<('+tags+')>\s*){2}(.*)(\s*<\/\\2>\s*){2}' ,''),
                '<\$2>\$3<\$2>');
};

WYMeditor.XhtmlSaxListener.prototype.removeEmptyTags = function(xhtml) {
    return xhtml.replace(
            new RegExp(
                '<('+this.block_tags.join("|").
                    replace(/\|td/,'').
                    replace(/\|th/, '') +
                ')>(<br \/>|&#160;|&nbsp;|\\s)*<\/\\1>' ,'g'),
            '');
};

WYMeditor.XhtmlSaxListener.prototype.removeBrInPre = function(xhtml) {
    var matches = xhtml.match(new RegExp('<pre[^>]*>(.*?)<\/pre>','gmi'));
    if (matches) {
        for (var i=0; i<matches.length; i++) {
            xhtml = xhtml.replace(
                matches[i],
                matches[i].replace(new RegExp('<br \/>', 'g'), String.fromCharCode(13,10)));
        }
    }
    return xhtml;
};

WYMeditor.XhtmlSaxListener.prototype.getResult = function() {
    return this.output;
};

WYMeditor.XhtmlSaxListener.prototype.getTagReplacements = function() {
    return {'b':'strong', 'i':'em'};
};

WYMeditor.XhtmlSaxListener.prototype.addContent = function(text) {
    if (this.last_tag && this.last_tag == 'li') {
        // We should strip trailing newlines from text inside li tags because
        // IE adds random significant newlines inside nested lists
        text = text.replace(/\n/, '');
        text = text.replace(/\r/, '');
    }
    this.output += text;
};

WYMeditor.XhtmlSaxListener.prototype.addComment = function(text) {
    if (this.remove_comments) {
        this.output += text;
    }
};

WYMeditor.XhtmlSaxListener.prototype.addScript = function(text) {
    if (!this.remove_scripts) {
        this.output += text;
    }
};

WYMeditor.XhtmlSaxListener.prototype.addCss = function(text) {
    if (!this.remove_embeded_styles) {
        this.output += text;
    }
};

WYMeditor.XhtmlSaxListener.prototype.openBlockTag = function(tag, attributes) {
    this.output += this.helper.tag(
        tag,
        this.validator.getValidTagAttributes(tag, attributes),
        true);
};

WYMeditor.XhtmlSaxListener.prototype.inlineTag = function(tag, attributes) {
    this.output += this.helper.tag(
        tag,
        this.validator.getValidTagAttributes(tag, attributes));
};

WYMeditor.XhtmlSaxListener.prototype.openUnknownTag = function(tag, attributes) {
    //this.output += this.helper.tag(tag, attributes, true);
};

WYMeditor.XhtmlSaxListener.prototype.closeBlockTag = function(tag) {
    this.output = this.output.replace(/<br \/>$/, '') +
        this._getClosingTagContent('before', tag) +
        "</"+tag+">" +
        this._getClosingTagContent('after', tag);
};

WYMeditor.XhtmlSaxListener.prototype.closeUnknownTag = function(tag) {
    //this.output += "</"+tag+">";
};

WYMeditor.XhtmlSaxListener.prototype.closeUnopenedTag = function(tag) {
    this.output += "</" + tag + ">";
};

WYMeditor.XhtmlSaxListener.prototype.avoidStylingTagsAndAttributes = function() {
    this.avoided_tags = ['div','span'];
    this.validator.skiped_attributes = ['style'];
    this.validator.skiped_attribute_values = ['MsoNormal','main1']; // MS Word attributes for class
    this._avoiding_tags_implicitly = true;
};

WYMeditor.XhtmlSaxListener.prototype.allowStylingTagsAndAttributes = function() {
    this.avoided_tags = [];
    this.validator.skiped_attributes = [];
    this.validator.skiped_attribute_values = [];
    this._avoiding_tags_implicitly = false;
};

WYMeditor.XhtmlSaxListener.prototype.isBlockTag = function(tag) {
    return !WYMeditor.Helper.contains(this.avoided_tags, tag) &&
            WYMeditor.Helper.contains(this.block_tags, tag);
};

WYMeditor.XhtmlSaxListener.prototype.isInlineTag = function(tag) {
    return !WYMeditor.Helper.contains(this.avoided_tags, tag) &&
            WYMeditor.Helper.contains(this.inline_tags, tag);
};

WYMeditor.XhtmlSaxListener.prototype.insertContentAfterClosingTag = function(tag, content) {
    this._insertContentWhenClosingTag('after', tag, content);
};

WYMeditor.XhtmlSaxListener.prototype.insertContentBeforeClosingTag = function(tag, content) {
    this._insertContentWhenClosingTag('before', tag, content);
};

WYMeditor.XhtmlSaxListener.prototype.fixNestingBeforeOpeningBlockTag = function(tag, attributes) {
    if ((tag == 'ul' || tag == 'ol') && this.last_tag &&
            !this.last_tag_opened && this.last_tag == 'li') {
        // We have a <li></li><ol>... situation. The new list should be a
        // child of the li tag. Not a sibling.

        this.output = this.output.replace(/<\/li>\s*$/, '');
        this.insertContentAfterClosingTag(tag, '</li>');
    } else if ((tag == 'ul' || tag == 'ol') && this.last_tag &&
            this.last_tag_opened && (this.last_tag == 'ul' || this.last_tag == 'ol')) {
        // We have a <ol|ul><ol|ul>... situation. The new list should be have
        // a li tag parent and shouldn't be directly nested.

        // Add an opening li tag before and after this tag
        this.output += this.helper.tag('li', {}, true);
        this.insertContentAfterClosingTag(tag, '</li>');
    } else if (tag == 'li' && !this.last_tag_opened) {
        // Closest open tag that's not this tag
        if (this._tag_stack.length >= 2) {
            var closestOpenTag = this._tag_stack[this._tag_stack.length - 2];
            if (closestOpenTag == 'li'){
                // Pop the tag off of the stack to indicate we closed it
                this._open_tags['li']--;
                if (this._open_tags['li'] === 0) {
                    this._open_tags['li'] = undefined;
                }
                this._tag_stack.pop(this._tag_stack.length - 2);
                this.output += '</li>';
            }
        }
        // Opening a new li tag while another li tag is still open.
        // LI tags aren't allowed to be nested within eachother
        // It probably means we forgot to close the last LI tag
        //return true;
    }
};

WYMeditor.XhtmlSaxListener.prototype._insertContentWhenClosingTag = function(position, tag, content) {
    if (!this['_insert_'+position+'_closing']) {
        this['_insert_'+position+'_closing'] = [];
    }
    if (!this['_insert_'+position+'_closing'][tag]) {
        this['_insert_'+position+'_closing'][tag] = [];
    }
    this['_insert_'+position+'_closing'][tag].push(content);
};

WYMeditor.XhtmlSaxListener.prototype._getClosingTagContent = function(position, tag) {
    if (this['_insert_'+position+'_closing'] &&
            this['_insert_'+position+'_closing'][tag] &&
            this['_insert_'+position+'_closing'][tag].length > 0) {
        return this['_insert_'+position+'_closing'][tag].pop();
    }
    return '';
};

WYMeditor.WymCssLexer = function(parser, only_wym_blocks)
{
    only_wym_blocks = (typeof only_wym_blocks == 'undefined' ? true : only_wym_blocks);

    jQuery.extend(this, new WYMeditor.Lexer(parser, (only_wym_blocks?'Ignore':'WymCss')));

    this.mapHandler('WymCss', 'Ignore');

    if(only_wym_blocks === true){
        this.addEntryPattern("/\\\x2a[<\\s]*WYMeditor[>\\s]*\\\x2a/", 'Ignore', 'WymCss');
        this.addExitPattern("/\\\x2a[<\/\\s]*WYMeditor[>\\s]*\\\x2a/", 'WymCss');
    }

    this.addSpecialPattern("[\\sa-z1-6]*\\\x2e[a-z-_0-9]+", 'WymCss', 'WymCssStyleDeclaration');

    this.addEntryPattern("/\\\x2a", 'WymCss', 'WymCssComment');
    this.addExitPattern("\\\x2a/", 'WymCssComment');

    this.addEntryPattern("\x7b", 'WymCss', 'WymCssStyle');
    this.addExitPattern("\x7d", 'WymCssStyle');

    this.addEntryPattern("/\\\x2a", 'WymCssStyle', 'WymCssFeedbackStyle');
    this.addExitPattern("\\\x2a/", 'WymCssFeedbackStyle');

    return this;
};

WYMeditor.WymCssParser = function()
{
    this._in_style = false;
    this._has_title = false;
    this.only_wym_blocks = true;
    this.css_settings = {'classesItems':[], 'editorStyles':[], 'dialogStyles':[]};
    return this;
};

WYMeditor.WymCssParser.prototype.parse = function(raw, only_wym_blocks)
{
    only_wym_blocks = (typeof only_wym_blocks == 'undefined' ? this.only_wym_blocks : only_wym_blocks);
    this._Lexer = new WYMeditor.WymCssLexer(this, only_wym_blocks);
    this._Lexer.parse(raw);
};

WYMeditor.WymCssParser.prototype.Ignore = function(match, state)
{
    return true;
};

WYMeditor.WymCssParser.prototype.WymCssComment = function(text, status)
{
    if(text.match(/end[a-z0-9\s]*wym[a-z0-9\s]*/mi)){
        return false;
    }
    if(status == WYMeditor.LEXER_UNMATCHED){
        if(!this._in_style){
            this._has_title = true;
            this._current_item = {'title':WYMeditor.Helper.trim(text)};
        }else{
            if(this._current_item[this._current_element]){
                if(!this._current_item[this._current_element].expressions){
                    this._current_item[this._current_element].expressions = [text];
                }else{
                    this._current_item[this._current_element].expressions.push(text);
                }
            }
        }
        this._in_style = true;
    }
    return true;
};

WYMeditor.WymCssParser.prototype.WymCssStyle = function(match, status)
{
    if(status == WYMeditor.LEXER_UNMATCHED){
        match = WYMeditor.Helper.trim(match);
        if(match !== ''){
            this._current_item[this._current_element].style = match;
        }
    }else if (status == WYMeditor.LEXER_EXIT){
        this._in_style = false;
        this._has_title = false;
        this.addStyleSetting(this._current_item);
    }
    return true;
};

WYMeditor.WymCssParser.prototype.WymCssFeedbackStyle = function(match, status)
{
    if(status == WYMeditor.LEXER_UNMATCHED){
        this._current_item[this._current_element].feedback_style = match.replace(/^([\s\/\*]*)|([\s\/\*]*)$/gm,'');
    }
    return true;
};

WYMeditor.WymCssParser.prototype.WymCssStyleDeclaration = function(match)
{
    match = match.replace(/^([\s\.]*)|([\s\.*]*)$/gm, '');

    var tag = '';
    if(match.indexOf('.') > 0){
        var parts = match.split('.');
        this._current_element = parts[1];
        tag = parts[0];
    }else{
        this._current_element = match;
    }

    if(!this._has_title){
        this._current_item = {'title':(!tag?'':tag.toUpperCase()+': ')+this._current_element};
        this._has_title = true;
    }

    if(!this._current_item[this._current_element]){
        this._current_item[this._current_element] = {'name':this._current_element};
    }
    if(tag){
        if(!this._current_item[this._current_element].tags){
            this._current_item[this._current_element].tags = [tag];
        }else{
            this._current_item[this._current_element].tags.push(tag);
        }
    }
    return true;
};

WYMeditor.WymCssParser.prototype.addStyleSetting = function(style_details)
{
    for (var name in style_details){
        var details = style_details[name];
        if(typeof details == 'object' && name != 'title'){

    this.css_settings.classesItems.push({
        'name': WYMeditor.Helper.trim(details.name),
        'title': style_details.title,
        'expr' : WYMeditor.Helper.trim((details.expressions||details.tags).join(', '))
    });
    if(details.feedback_style){
        this.css_settings.editorStyles.push({
            'name': '.'+ WYMeditor.Helper.trim(details.name),
            'css': details.feedback_style
        });
    }
    if(details.style){
        this.css_settings.dialogStyles.push({
            'name': '.'+ WYMeditor.Helper.trim(details.name),
            'css': details.style
        });
    }
}
}
};


