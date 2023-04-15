// stores/product_attributes.js
import { defineStore } from 'pinia';

export const useProductAttributesStore = defineStore( 'product_attributes', {
    state: () => ({
        attributes: [
            {
                id: 1,
                name: '纯色组',
                children: [
                    {
                        id: 1,
                        name: '蓝色',
                        default: false,
                    },
                    {
                        id: 2,
                        name: '绿色',
                        default: false,
                    },
                    {
                        id: 3,
                        name: '红色',
                        default: false,
                    },
                    {
                        id: 4,
                        name: '黄色',
                        default: false,
                    }
                ],
            },
            {
                id: 2,
                name: '暖色组',
                children: [
                    {
                        id: 1,
                        name: '橙色',
                        default: false,
                    },
                    {
                        id: 2,
                        name: '粉色',
                        default: false,
                    },
                    {
                        id: 3,
                        name: '紫色',
                        default: false,
                    },
                ]
            },
            {
                id: 3,
                name: '袜色组',
                children: [
                    {
                        id: 1,
                        name: '黑色',
                        default: false,
                    },
                    {
                        id: 2,
                        name: '白色',
                        default: false,
                    },
                    {
                        id: 3,
                        name: '灰色',
                        default: false,
                    }
                ]
            },
            {
                id: 4,
                name: '其他组',
                children: [
                    {
                        id: 1,
                        name: '均色',
                        default: false,
                    },
                    {
                        id: 2,
                        name: '藏青色',
                        default: false,
                    },
                    {
                        id: 3,
                        name: '浅花色',
                        default: false,
                    }
                ]
            }
        ],
    }),
    getters: {
        getAttributes(state) {
            return state.attributes;
        },
    },
    actions: {
        setAttributes(attributes) {
            this.attributes = attributes;
        }
    },
});



