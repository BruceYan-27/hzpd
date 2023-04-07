import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import App from "./App.vue";
// import { appPlugin } from "./common/index";
// import tmui from "./tmui";
import GraceRequest from '@/Grace6/js/request'
// @ts-ignore
uni.gRequest = GraceRequest

export function createApp() {
    const app = createSSRApp(App);
    app.use(Pinia.createPinia())
    return { app, Pinia };
}