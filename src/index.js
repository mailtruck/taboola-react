import React from 'react';

const Taboola = (function(){
    function loadScript({ publisher, pageType }) {
        window._taboola = window._taboola || [];
        window._taboola.push({ [pageType]: 'auto' });
        (function (e, f, u, i) {
            if (!document.getElementById(i)) {
                e.async = 1;
                e.src = u;
                e.id = i;
                if (!f) {
                    document.head.append(e)
                } else {
                    f.parentNode.insertBefore(e, f);
                }
            }
        })(
            document.createElement('script'),
            document.getElementsByTagName('script')[0],
            `https://cdn.taboola.com/libtrc/${publisher}/loader.js`,
            'tb_loader_script'
        );
        if (window.performance && typeof window.performance.mark == 'function') {
            window.performance.mark('tbl_ic');
        }
    }

    function formatContainerId(placement) {
        return placement
            .toLowerCase()
            .split(' ')
            .join('-');
    }

    function loadWidget({ mode, placement, targetType, containerId }) {
        window._taboola = window._taboola || [];
        window._taboola.push({
            mode,
            container: containerId,
            placement,
            target_type: targetType,
        });
    }

    return ({ publisher, mode, placement, pageType, targetType }) => {
        loadScript({ publisher, pageType });
        const containerId = formatContainerId(placement);

        return (
            <React.Fragment>
                <div id={containerId} />
                {loadWidget({ mode, placement, targetType, containerId })}
            </React.Fragment>
        );
    };
})();

export default Taboola
