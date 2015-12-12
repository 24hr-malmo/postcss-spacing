var postcss = require('postcss');

module.exports = postcss.plugin('postcss-spacing', function() {

    var shortcuts = {
        pa: 'padding',
        pt: 'padding-top',
        pb: 'padding-bottom',
        pl: 'padding-left',
        pr: 'padding-right',
        ma: 'margin',
        mt: 'margin-top',
        mb: 'margin-bottom',
        mr: 'margin-rigth',
        ml: 'margin-left'
    }

    return function(css) {

        var sizes = [];
        var querySizes = {};
        var queries = [];

        css.walkAtRules(function(atrule) {
            if (atrule.name === 'spacing') {
                if (atrule.parent.name === 'media') {
                    queries.push(atrule.parent);
                    querySizes[atrule.parent.params] = atrule.params.replace(/ /g, '').split(',');
                } else {
                    sizes = atrule.params.replace(/ /g, '').split(',');
                }
                atrule.remove();
            }
        });

        var founds = [];
        css.walkDecls(function(decl) {

            if (shortcuts[decl.prop]) {
                if (founds.indexOf(decl.parent) === -1) {
                    founds.push(decl.parent);
                }
            }

        });

        if (founds.length > 0) {
            founds.forEach(function(node) {
                queries.forEach(function(query) {
                    var props = [];
                    node.nodes.forEach(function(decl) {
                        if (shortcuts[decl.prop]) {
                            var index = parseInt(decl.value) - 1;
                            var value = querySizes[query.params][index];
                            props.push({raws: {before: '\n', between: ': '}, type: 'decl', prop: shortcuts[decl.prop], value: value});
                        }
                    });
                    query.append({selector: node.selector, type: 'rule', nodes: props});
                });
            }); 
        }

        css.walkDecls(function(decl) {
            if (shortcuts[decl.prop]) {
                decl.prop = shortcuts[decl.prop];
                decl.value = sizes[parseInt(decl.value) - 1];
            }
        });

    };

});
