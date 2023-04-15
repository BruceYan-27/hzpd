// stores/product_attributes.js
import { defineStore } from 'pinia';

export const useProductAttributesStore = defineStore( 'product_attributes', {
    unistorage: true,
    state: () => ({
        attributes: [
            {
                // id 随机生成 不能重复 用于更新数据
                id: Math.random().toString(36).substr(2),
                name: '纯色组',
                children: [
                    {
                        // id 随机生成 不能重复 用于更新数据
                        id: Math.random().toString(36).substr(2),
                        name: '蓝色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '绿色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '红色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '黄色',
                        default: false,
                    }
                ],
            },
            {
                id: Math.random().toString(36).substr(2),
                name: '暖色组',
                children: [
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '橙色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '粉色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '紫色',
                        default: false,
                    },
                ]
            },
            {
                id: Math.random().toString(36).substr(2),
                name: '袜色组',
                children: [
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '黑色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '白色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '灰色',
                        default: false,
                    }
                ]
            },
            {
                id: Math.random().toString(36).substr(2),
                name: '其他组',
                children: [
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '均色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '藏青色',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '浅花色',
                        default: false,
                    }
                ]
            }
        ],
        productSize: [
            {
                id: Math.random().toString(36).substr(2),
                name: '通用尺码',
                children: [
                    {
                        id: Math.random().toString(36).substr(2),
                        name: 'S',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: 'M',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: 'L',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: 'XL',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: 'XXL',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: 'XS',
                        default: false,
                    },
                ],
            },
            {
                id: Math.random().toString(36).substr(2),
                name: '袜子尺码',
                children: [
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '32码（21cm）',
                        default: false,
                    },
                    {
                        id:2,
                        name: '33码（22cm）',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '34码（23cm）',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '35码（24cm）',
                        default: false,
                    },
                ]
            },
            {
                id: Math.random().toString(36).substr(2),
                name: '裤子尺码',
                children: [
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '28码',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '29码',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '30码',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '31码',
                        default: false,
                    },
                    {
                        id: Math.random().toString(36).substr(2),
                        name: '32码',
                        default: false,
                    }
                ]
            },
        ],
        // 品牌
        brand: [],
        // 材质
        material: [],
        // 分类
        category: [],
        // 季节
        season: [],
        // 款式
        style: [],
        // 单位
        unit: [],

    }),
    getters: {
        getAttributes(state) {
            return state.attributes;
        },
        getProductSize(state) {
            return state.productSize;
        },
        // 获取品牌
        getBrand(state) {
            return state.brand;
        },
        // 获取材质
        getMaterial(state) { return state.material; },
        // 获取分类
        getCategory(state) { return state.category; },
        // 获取季节
        getSeason(state) { return state.season; },
        // 获取款式
        getStyle(state) { return state.style; },
        // 获取单位
        getUnit(state) { return state.unit; },
    },
    actions: {
        setAttributes(attributes) {
            this.attributes = attributes;
        },
        setProductSize(productSize) {
            this.productSize = productSize;
        },
        // 添加一条数据
        addAttributes(attributes) {
            this.attributes.push(attributes);
            // 打印一下
            console.log(this.attributes);
        },
        // 更新二维数组里面的数据
        updateAttributes(attributes) {
            console.log(attributes);
            // 找到对应的id
            const index = this.attributes.findIndex(item => item.id === attributes.id);
            // 更新数据
            this.attributes[index] = attributes;
            // 打印一下
            console.log(this.attributes);
        }

    },
});



