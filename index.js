import * as postcss from 'postcss';

export default postcss.plugin('postcss-spacing', (options = {}) => {

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

    return css => {

        var sizes = [];
        var querySizes = {};
        var queries = [];

        css.walkAtRules(atrule => {
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
        css.walkDecls(decl => {

            if (shortcuts[decl.prop]) {
                if (founds.indexOf(decl.parent) === -1) {
                    founds.push(decl.parent);
                }
            }

        });

        if (founds.length > 0) {
            founds.forEach((node) => {
                queries.forEach(query => {
                    var props = [];
                    node.nodes.forEach(decl => {
                        if (shortcuts[decl.prop]) {
                            props.push({raws: {before: '\n', between: ': '}, type: 'decl', prop: delc.prop, value: delc.value});
                        }
                    });
                    query.append({selector: node.selector, type: 'rule', nodes: props});
                });
            }); 
        }

        css.walkDecls(decl => {
            if (shortcuts[decl.prop]) {
                decl.prop = shortcuts[decl.props];
                decl.value = sizes[parseInt(decl.value) - 1];
            }
        });

    };

});
