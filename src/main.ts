import { ApplicationRef, enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createNewHosts } from '@angularclass/hmr';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.production) {
    enableProdMode();
}

if (!environment.hmr) {
    bootstrap().catch(err => console.error(err));
} else {
    const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
        let ngModule: NgModuleRef<any>;

        module.hot.accept();

        bootstrap().then(mod => ngModule = mod);

        module.hot.dispose(() => {
            const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
            const elements = appRef.components.map(c => c.location.nativeElement);
            const makeVisible = createNewHosts(elements);
            ngModule.destroy();
            makeVisible();
        });
    };

    if (module['hot']) {
        hmrBootstrap(module, bootstrap);
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
}
