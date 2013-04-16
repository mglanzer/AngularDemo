'use strict';

/* Directives */


angular.module('app.directives', [])
    .directive('snippet', ['$http', 'Cache', 'SyntaxHighlight', function ($http, cache, highlighter) {
        return {
            restrict: 'EA',
            replace: false,
            transclude: false,
            scope: {},
            link: function(scope, elm, attrs) {
                var src = attrs.src,
                    from = parseInt(attrs.from),
                    to = parseInt(attrs.to),
                    code = angular.element('<code></code>'),
                    pre = angular.element('<pre></pre>'),
                    cacheKey = src,
                    content,
                    takeContent = function(s) {
                        var lineSeparator = '\n',
                            a = s.split(lineSeparator),
                            sub = a.splice(from - 1, to - from + 1);
                        
                        return sub;
                    },
                    linesToHtml = function(a) {
                        a = _.map(a, function (line) {
                            return line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        });
                        return a.join('<br/>');
                    },
                    appendAndHighlight = function (s) {
                        var a = takeContent(s),
                            html = linesToHtml(a);
                        
                        code.html(html);
                        highlighter.highlight(code);
                    };

                pre.append(code);
                elm.append(pre);

                content = cache.get(cacheKey);
                if (content) {
                    appendAndHighlight(content);
                    return;
                }

                $http.get(src).success(function(s) {
                    cache.put(cacheKey, s);
                    appendAndHighlight(s);
                });
            }
        };
    }]);