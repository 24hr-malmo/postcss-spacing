var postcss = require('postcss');

function checkSize(value) {
    if (value.match(/s\d+/)) {
        return value;
    }
}

function replace(decl, sizes, result) {
    var values = decl.value.split(' ');
    var newValues = [];
    values.forEach(function(org) {
        var newValue = sizes[org];
        if (!newValue && checkSize(org)) {
            decl.warn(result, 'The size "' + org + '" doesnt exist');
            newValue = org;
        }
        newValues.push(newValue);
    });
    return {raws: {before: '\n', between: ': '}, type: 'decl', prop: decl.prop, value: newValues.join(' ')};
}


module.exports = postcss.plugin('postcss-spacing', function() {

    return function(css, result) {

        var sizes = {};
        var querySizes = {};
        var queries = [];

        css.walkAtRules(function(atrule) {
            if (atrule.name === 'spacing') {
                if (atrule.parent.name === 'media') {
                    queries.push(atrule.parent);
                    querySizes[atrule.parent.params] = {};
                    atrule.params.replace(/ /g, '').split(',').forEach(function(step, index) {
                        querySizes[atrule.parent.params]['s' + (index + 1)] = step;
                    });

                } else {
                    atrule.params.replace(/ /g, '').split(',').forEach(function(step, index) {
                        sizes['s' + (index + 1)] = step;
                    });
                }
                atrule.remove();
            }
        });

        var founds = [];
        css.walkDecls(function(decl) {

            if (checkSize(decl.value)) {
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
                        if (checkSize(decl.value)) {
                            var newProps = replace(decl, querySizes[query.params], result);
                            props.push(newProps);
                        }
                    });
                    query.append({selector: node.selector, type: 'rule', nodes: props});
                });
            }); 
        }

        css.walkDecls(function(decl) {
            if (checkSize(decl.value)) {
                var newProps = replace(decl, sizes, result);
                decl.value = newProps.value;
            }
        });

    };

});
