import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import App from "./App.vue";
import GraceRequest from '@/Grace6/js/request'
import { createUnistorage } from './uni_modules/pinia-plugin-unistorage'
// @ts-ignore
uni.gRequest = GraceRequest

export function createApp() {
    const app = createSSRApp(App);
    // 状态管理 Pinia'
    const pinia = Pinia.createPinia();
    pinia.use(createUnistorage());
    app.use(pinia);
    return { app, Pinia };
}
