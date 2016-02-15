/* eslint-env Handlebars */
import { Router5 } from 'router5';
import listenersPlugin from 'router5-listeners';
import historyPlugin from 'router5-history';

const router = new Router5()
    .setOption('useHash', true)
    .setOption('defaultRoute', 'home')
    // Routes
    .addNode('home', '/home')
    .addNode('section', '/:section')
    // Plugins
    .usePlugin(Router5.loggerPlugin())
    .usePlugin(listenersPlugin())
    .usePlugin(historyPlugin());
        
export default router;