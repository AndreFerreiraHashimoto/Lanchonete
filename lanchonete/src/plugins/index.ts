import router from '../router';
import {createPinia} from 'pinia';
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'

// Plugins
import vuetify from './vuetify'
// TypeScript: firebase is a JS module without typings. Ignore missing declaration file.
// @ts-ignore
import firebaseApp from './firebase';

export function registerPlugins (app: App) {
 app.use(vuetify)
 // firebaseApp is a FirebaseApp instance, not a Vue plugin — provide it to the app instead
 app.provide('firebase', firebaseApp)
 app.use(createPinia());
 app.use(router);
}