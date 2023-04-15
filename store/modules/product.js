import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
    unistorage: true,
    state: () => ({
        Product: [
            {
                // id 随机生成 不能重复 用于更新数据
                id: Math.random().toString(36).substr(2),
                name: '秋冬男式加厚双排扣外套呢子大衣',
                tradePrice: 100,
                retailPrice: 200,
                purchasePrice: 50,
                stock: 100,
                // 可用库存
                availableStock: 100,
                // 待入库
                pendingStock: 0,
                // 待出库
                pendingOutStock: 0,
                // 库位
                location: 'A1',
                // 货号
                articleNumber: '123456',
                // 条形码
                barCode: '123456',
                // 状态
                status: true,
                // 单位
                unit: '件',
                // 分类
                category: '男装',
                // 品牌
                brand: '阿迪达斯',
                // 供应商
                supplier: '阿迪达斯',
                // 款式
                style: '男式',
                // 颜色
                color: [],
                // 尺码
                size: [],
                // 图片
                images: [{
                        // 图片地址
                        image: "https://chenchangzhang.top/media/images/jy.png",
                        // id 随机生成 不能重复 用于更新数据
                        id: Math.random().toString(36).substr(2),
                    },
                    {
                        // 图片地址
                        image: "https://chenchangzhang.top/media/images/jy.png",
                        // id 随机生成 不能重复 用于更新数据
                        id: Math.random().toString(36).substr(2),
                    },
                ],
                // 年份
                year: '2021',
                // 季节
                season: '秋冬',
                // 上市日期
                marketDate: '2021-10-10',
            }
        ]
    }),
    getters: {
        getProduct: (state) => {
            return state.Product;
        }
    },
    actions: {
        // 添加商品
        addProduct(payload) {
            this.Product.push(payload);
        },
        // 删除商品
        deleteProduct(payload) {
            this.Product.splice(payload, 1);
        },
        // 更新商品

        updateProduct(payload) {
            // console.log(payload.data);
            // this.Product[payload.index] = payload.data;
            // 从新渲染
            // this.Product = [...this.Product];
            // 修改数据this.Product的id和payload.id相同的数据 用payload.data替换
            this.Product = this.Product.map((item) => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            })
            console.log(this.Product);
            // 更新数据
            this.Product = [...this.Product];
        }
    }
});
