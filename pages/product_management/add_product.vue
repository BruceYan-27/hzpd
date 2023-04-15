<template>
    <gui-page :customHeader="true" :headerClass="['gui-bg-blue', 'gui-dark-bg-level-1']">
        <!-- 自定义头部导航 -->
        <template v-slot:gHeader>
            <view class="header">
                <view class="header-left">
                    <view class="header-left-icon" @tap="back">
                        <text class="gui-icons gui-block gui-color-white">&#xe600;</text>
                        <text v-if="isEdit">修改产品</text>
                        <text v-else>新增产品</text>
                    </view>
                </view>
                <view class="header-right" @tap="submit">
                    <view class="header-right-icon">
                        <text>保存</text>
                    </view>
                </view>
            </view>
        </template>
        <!-- 自定义内容区域 -->
        <template v-slot:gBody>
            <!-- 提交表单  -->
            <view class="addForm">
                <form>
                    <!--基本信息-->
                    <view class="gui-margin-top gui-padding-x">
                        <text class="gui-h6 gui-secondary-text">基本信息</text>
                    </view>
                    <!--商品名称 货号-->
                    <view class="addForm-basicInformation gui-bg-white gui-margin-top">
                        <view class="gui-form-item gui-border-b">
                            <text class="gui-form-label gui-secondary-text">名称</text>
                            <view class="gui-form-body">
                                <input type="text" class="gui-form-input" v-model="formData.name" name="name1" placeholder="请输入产品名称" />
                            </view>
                            <view class="addForm-basicInformation-icon" @tap="drop_discriminate">
                                <text class="gui-icons gui-block gui-color-blue">&#xe61d;</text>
                                <text style="font-size: 24rpx">吊牌识别</text>
                            </view>
                        </view>
                        <view class="gui-form-item">
                            <view class="gui-form-item">
                                <text class="gui-form-label gui-secondary-text">货号</text>
                                <view class="gui-form-body">
                                    <input type="text" class="gui-form-input"
                                           v-model="formData.articleNumber" name="articleNumber" placeholder="自动生成" disabled />
                                </view>
                            </view>
                        </view>
                    </view>
                    <!-- 颜色列表 -->
                    <view class="addForm-color gui-margin-top">
                        <view class="addForm-color-text" @tap="add_color(0)">
                            <view>
                                <text class="gui-h6 gui-secondary-text">颜色</text>
                                <text style="font-size: 24rpx" v-if="formData.color.length === 0">（可设置默认颜色，以便快速选择）</text>
                            </view>
                            <text class="gui-icons gui-block gui-color-gray">&#xe601;</text>
                        </view>
                        <view class="addForm-color-tag" v-if="formData.color.length">
                            <gui-tags  v-for="(item, index) in formData.color" borderColor="rgba(69, 90, 100, 0.6)" :key="index" :text="item.name" :customClass="['gui-transparent-bg', 'gui-color-gray']" :size="26"></gui-tags>
                        </view>
                    </view>
                    <!-- 尺码列表 -->
                    <view class="addForm-size gui-margin-top">
                        <view class="addForm-size-text" @tap="add_color(1)">
                            <view>
                                <text class="gui-h6 gui-secondary-text" >尺码</text>
                                <text style="font-size: 24rpx" v-if="formData.size.length === 0">（可设置默认尺码，以便快速选择）</text>
                            </view>
                            <text class="gui-icons gui-block gui-color-gray">&#xe601;</text>
                        </view>
                        <view class="addForm-color-tag" v-if="formData.size.length">
                            <gui-tags v-for="(item, index) in formData.size" borderColor="rgba(69, 90, 100, 0.6)" :key="index" :text="item.name" :customClass="['gui-transparent-bg', 'gui-color-gray']" :size="26"></gui-tags>
                        </view>
                    </view>

                    <!--     采购价 批发价 零售价 建议零售价       -->
                    <view class="addForm-basicInformation gui-bg-white gui-margin-top">
                        <view class="gui-form-item gui-border-b">
                            <text class="gui-form-label gui-secondary-text">采购价</text>
                            <view class="gui-form-body">
                                <input type="text" class="gui-form-input" v-model="formData.tradePrice" name="tradePrice" placeholder="¥ 0.00" />
                            </view>
                        </view>
                        <view class="gui-form-item gui-border-b">
                            <view class="gui-form-item">
                                <text class="gui-form-label gui-secondary-text">批发价</text>
                                <view class="gui-form-body">
                                    <input type="text" class="gui-form-input"
                                           v-model="formData.retailPrice" name="retailPrice" placeholder="¥ 0.00"  />
                                </view>
                            </view>
                        </view>
                        <view class="gui-form-item gui-border-b">
                            <view class="gui-form-item">
                                <text class="gui-form-label gui-secondary-text">零售价</text>
                                <view class="gui-form-body">
                                    <input type="text" class="gui-form-input"
                                           v-model="formData.purchasePrice" name="purchasePrice" placeholder="¥ 0.00"  />
                                </view>
                            </view>
                        </view>
                    </view>
                    <!--辅助属性-->
                    <view class="gui-margin-top gui-padding-x">
                        <text class="gui-h6 gui-secondary-text">辅助属性</text>
                    </view>
                    <!--  供应商 品牌 分类 单位 性别 材质 款式 季节 上市日 年份 列表 -->
                    <view class="addForm-list gui-margin-top">
                        <view class="addForm-list-item" v-for="(item, index) in auxiliary_attribute">
                            <view class="addForm-list-item-title gui-border-b" @tap.stop="choose(item)">
                                <text class="addForm-list-item-label gui-secondary-text">{{item}}</text>
                                <view class="addForm-list-item-body" :style="item === '上市日'? 'flex:' + 1 : ''">
                                    <text v-if="item === '供应商'">最近采购的{{item}}</text>
                                    <text v-else-if="item === '性别'" style="color: black">{{ sex[sexIndex] }}</text>
<!--                                    <text v-else-if="item === '上市日'" style="color: black">{{ nowDate }}</text>-->
                                    <gui-datetime v-else-if="item === '上市日'" style="flex: 1"
                                        @confirm="confirm"
                                        :value="nowDate" :width="100 + '%'"
                                        :isTime="false">
                                        <text class="demo gui-border-radius-large  gui-icons">&#xe6d1; {{ nowDate }}</text>
                                    </gui-datetime>
                                    <text v-else-if="item === '年份'" style="color: black">上半年</text>
                                    <text v-else>选择{{item}}</text>
                                    <text v-if="item !== '供应商'" class="gui-icons gui-block gui-color-black">&#xe601;</text>
                                </view>
                            </view>
                        </view>
                    </view>


                    <view class="addForm-images gui-margin-top">
                        <view class="shangchuan">
                            <view class="sc2" v-for="(item, index) in needPploadedImgs" :key="index">
                                <text class="del gui-icons gui-block gui-color-red" @click="del(index)">&#xe78a;</text>
                                <image class="Img3" :src="item" mode=""></image>
                            </view>
                            <view class="sc2" v-if="formData.images.length < 9" @click="upload">
                                <text class="sc3 gui-icons gui-block gui-color-white">&#xe6c7;</text>
                            </view>
                        </view>
                    </view>



                </form>
            </view>


            <!-- 点击颜色或者尺码弹出对应弹窗 -->
<!--            <view v-if="Product.modal" class="gui-modal">-->
<!--                <view class="gui-modal-content">-->
<!--                    <view class="gui-modal-header">-->
<!--                        <view class="gui-modal-title">-->
<!--                            <view @tap="product_back">-->
<!--&lt;!&ndash;                                <text class="gui-icons gui-color-white">&#xe600;</text>&ndash;&gt;-->
<!--                                <text style="font-size: 28rpx;margin-right: 30rpx">添加分组</text>-->
<!--                            </view>-->
<!--                            <text>{{ ProductAttribute[ProductIndex] }}设置</text>-->
<!--                        </view>-->
<!--                        <view class="gui-modal-close" @tap="addGroups" >-->
<!--                            <text>保存</text>-->
<!--                        </view>-->
<!--                    </view>-->
<!--                    &lt;!&ndash; 输入框模糊查询 &ndash;&gt;-->
<!--                    <view class="gui-input-group">-->
<!--                        <view class="gui-input-group-items">-->
<!--                            <view class="gui-input-group-body">-->
<!--                                <view class="gui-input-group-input">-->
<!--                                    &lt;!&ndash; 检索框 自动检索 &ndash;&gt;-->
<!--                                    <input class="gui-input" type="text" placeholder="输入关键字检索" @input="retrieval" />-->
<!--                                </view>-->
<!--                            </view>-->
<!--                        </view>-->
<!--                    </view>-->
                    <!-- 颜色尺码分组 ProductIndex==1 ProductIndex==2 展示  -->
<!--                    <view class="hzpb-list" v-if="ProductIndex === 0 || ProductIndex === 1">-->
<!--                        <view  v-for="(item, index) in _ProductAttribute[0]" :key="index">-->
<!--                            <view class="hzpb-list-item" style="display: flex;justify-content: space-between">-->
<!--                                <text class="hzpb-list-item-text">{{item.name}}</text>-->
<!--                                &lt;!&ndash; 字体图标 &ndash;&gt;-->
<!--                                <view style="padding-right: 28rpx">-->
<!--                                    <text @tap="revise(item)" class="hzpb-list-item-icon gui-icons gui-color-orange" style="margin-right: 30rpx;font-size: 36rpx">&#xe69e;</text>-->
<!--                                    <text @tap="deleteGroups(item)" class="hzpb-list-item-icon gui-icons gui-color-red" style="font-size: 36rpx">&#xe794;</text>-->
<!--                                </view>-->
<!--                            </view>-->
<!--                            <view class="hzpb-list-tage">-->
<!--                                <gui-tags @tapme="tapme(items,indexs)" v-for="(items, indexs) in item.children" :borderColor="'rgba(69, 90, 100, 0.6)'" :key="indexs" :text="items.name" :customClass="[items.default === false ? 'gui-color-gray': 'gui-color-white', items.default === false ? 'gui-transparent-bg': 'gui-bg-primary']"  :size="26"></gui-tags>-->
<!--                                <text class="hzpb-list-tage-addTag" @tap="newlyIncreased(item)">新增{{ProductAttribute[ProductIndex]}}</text>-->
<!--                            </view>-->
<!--                        </view>-->
<!--                    </view>-->
<!--                    <view v-else class="hzpb-list">-->
<!--                        &lt;!&ndash; 提示语 &ndash;&gt;-->
<!--                        <view class="hzpb-list-item" style="display: flex;align-items: center">-->
<!--                            &lt;!&ndash;字体图标&ndash;&gt;-->
<!--                            <text class="hzpb-list-item-icon gui-icons gui-color-orange" style="font-size: 36rpx;margin-right: 20rpx">&#xe645;</text>-->
<!--                            <text class="hzpb-list-item-text" style="font-size: 24rpx">【向左滑动】选项可进行删除</text>-->
<!--                        </view>-->
<!--                        &lt;!&ndash; 实现左滑删除 &ndash;&gt;-->
<!--                        <scroll-view :scroll-y="true">-->
<!--                            <view v-for="(item,index) in _ProductAttribute[0]" :key="index" class="good-item" style="display: flex" :style="{ right: item.right + 'rpx'}" >-->
<!--                                <view  class="good-item" @touchstart="startHandle($event,index)" @touchmove="moveHandle($event,index)"-->
<!--                                       @touchend="endHandle($event,index)" @click="revise(item)"   >-->
<!--                                    <view class="good-info">-->
<!--                                        <view class="name">{{item.name}}</view>-->
<!--                                    </view>-->
<!--                                </view>-->
<!--                                <view class="del-btn" @click="deleteGroups(item)">删除</view>-->
<!--                            </view>-->
<!--                        </scroll-view>-->
<!--                    </view>-->
<!--                </view>-->
<!--            </view>-->

            <myl-product-modal :show="Product.modal"
                               :ProductIndex="ProductIndex"
                               :data="_ProductAttribute"
                               :Attribute="ProductAttribute[ProductIndex]"
                                @update:model-value="retrieval"
            ></myl-product-modal>
            <myl-pop1 :show="Product.groups" :Attribute="ProductAttribute[ProductIndex]"
                      @update:model-value="groups" @on-close="Product.groups = false" @on-submit="submitGroups"></myl-pop1>
            <myl-pop :data="sex" :show="Product.sex_pop" :width="'30%'" @on-click="sex_s"></myl-pop>

        </template>
    </gui-page>
</template>

<script setup>


// import { onMounted, onUnmounted } from 'vue'
import {reactive, ref} from "vue";
import {onLoad} from '@dcloudio/uni-app'
import {useProductAttributesStore} from '@/store/modules/product_attributes'
import {useProductStore} from '@/store/modules/product'
import MylPop from "../../uni_modules/myl-components/components/myl-pop.vue";
import MylPop1 from "../../uni_modules/myl-components/components/myl-pop1.vue";
import MylProductModal from "../../uni_modules/myl-components/components/myl-product-modal.vue";

const formData = reactive({
    name: '',
    articleNumber: '',
    color: [],
    size: [],
    tradePrice: '',
    retailPrice: '',
    purchasePrice: '',
    images: []
})


// 辅助属性
const auxiliary_attribute = reactive(['供应商', '品牌', '分类', '单位', '性别', '材质', '款式', '季节', '上市日', '年份'])
const sex = reactive(['通款', '男', '女'])
let sexIndex = ref(0)
const sex_s = (index, item) => {
    console.log(index, item)
    sexIndex.value = index
    Product.sex_pop = false
}

// 记录需要上传的图片数据
const needPploadedImgs = reactive([])
const group = ref('')
const groups = (e) => {
    group.value = e
}
const ProductAttribute = reactive(['颜色', '尺码'])
// 结构出来
const store = useProductAttributesStore()
const storeProduct = useProductStore()

const ProductIndex = ref(0)
// 定义 Product.modal
const Product = reactive({
    modal: false,
    groups: false,
    sex_pop: false
})

let _date = reactive([])

// 获取当前时间的方法
const getNowFormatDate = () => {
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    // + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return date.getFullYear() + seperator1 + month + seperator1 + strDate;
}

const nowDate = ref(getNowFormatDate())

const confirm = (res) => {
    nowDate.value = res[0]+'-'+res[1]+'-'+res[2];
    console.log(nowDate.value)
}

let _ProductAttribute = reactive([])

// 定义一个变量记录当前是编辑还是新增
let isEdit = false

onLoad((options) => {
    console.log(options.length)
    // 判断options是否有值
    if(options.length !== undefined) {
        // 有值把options处理成对象
        let arr = JSON.parse(options.item)
        console.log(arr)
        isEdit = true
        // 把arr赋值给formData
        formData.name = arr.name
        formData.articleNumber = arr.articleNumber
        formData.color = arr.color
        formData.size = arr.size
        formData.tradePrice = arr.tradePrice
        formData.retailPrice = arr.retailPrice
        formData.purchasePrice = arr.purchasePrice
        formData.images = arr.images
        formData.id = arr.id
        // 把formData.images赋值给needPploadedImgs
        arr.images.forEach(item => {
            needPploadedImgs.push(item.image)
        })

    } else {
        isEdit = false
    }
})
// 返回上一页
const back = () => {
    uni.navigateBack()
}
// drop_discriminate
const drop_discriminate = () => {
    console.log(222)
}

// 提交分组
const submitGroups = () => {
    // 提交分组
    if(ProductIndex.value == 0 || ProductIndex.value == 1){
        _ProductAttribute[0].push(
            {
                name: group.value,
                // id 随机生成 不能重复
                id: Math.random().toString(36).substr(2),
                children: []
            }
        )
    }else {
        _ProductAttribute[0].push(
            {
                name: group.value,
                // id 随机生成 不能重复
                id: Math.random().toString(36).substr(2),
            }
        )
    }

    // 关闭弹窗
    Product.groups = false
    // 清空输入框
    group.value = ''
    // 新增分组后 重新赋值
    addGroupsConfirm()

}
const addGroupsConfirm = () => {
    if(ProductIndex.value === 0) {
        _ProductAttribute[0] = store.getAttributes
    } else if (ProductIndex.value === 1) {
        _ProductAttribute[0] = store.getProductSize
    } else if (ProductIndex.value === 2) {
        // 品牌
        _ProductAttribute[0] = store.getBrand
    } else if (ProductIndex.value === 3) {
        // 材质
        _ProductAttribute[0] = store.getMaterial
    } else if (ProductIndex.value === 4) {
        // 分类
        _ProductAttribute[0] = store.getCategory
    } else if (ProductIndex.value === 5) {
        // 季节
        _ProductAttribute[0] = store.getSeason
    } else if (ProductIndex.value === 6) {
        // 款式
        _ProductAttribute[0] = store.getStyle
    } else if (ProductIndex.value === 7) {
        // 单位
        _ProductAttribute[0] = store.getUnit
    }
}

// add_color
const add_color = (index) => {
    ProductIndex.value = index
    Product.modal = true
    addGroupsConfirm()
    // 如果formdata里面的id和_productAttribute二维数组里面子数据id相同default为true
    // if(index === 0){
    //     _ProductAttribute[0].map(item => {
    //         item.children.map(items => {
    //             formData.color.map(itemss => {
    //                 if(items.id === itemss.id) {
    //                     items.default = true
    //                 }
    //             })
    //         })
    //     })
    //
    // }else {
    //     _ProductAttribute[0].map(item => {
    //         item.children.map(items => {
    //             formData.size.map(itemss => {
    //                 if(items.id === itemss.id) {
    //                     items.default = true
    //                 }
    //             })
    //         })
    //     })
    // }
    console.log(_ProductAttribute[0])

}

//product_back
const product_back = () => {
    Product.groups = true
}

const revise = (item) => {
    console.log(item)
    // 修改
    uni.showModal({
        title: '修改',
        cancelColor: "#FF0606",
        placeholderText: '请输入内容',
        content: item.name,
        editable: 'true',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
                // // 更新二维数组里面的数据
                _ProductAttribute[0].map(items => {
                    if (items.id === item.id) {
                        items.name = res.content
                    }
                })
                // 判断 ProductIndex.value 来从新赋值
                addGroupsConfirm()
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })
}
const deleteGroups = (item) => {
    console.log(item.id)
    // 删除
    uni.showModal({
        title: '删除',
        content: '确定删除吗？',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
                // 删除一条数据
                _ProductAttribute[0].map((items, index) => {
                    if (items.id == item.id) {
                        _ProductAttribute[0].splice(index, 1)
                    }
                })
                // 判断 ProductIndex.value 来从新赋值
                addGroupsConfirm()
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    })
}
const newlyIncreased = (itemsId) => {
    // 新增
    uni.showModal({
        title: '新增',
        cancelColor: "#FF0606",
        placeholderText: '请输入内容',
        content: '',
        editable: 'true',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
                // 新增二维数组里面的数据
                _ProductAttribute[0].map(item => {
                    if(item.id === itemsId.id) {
                        item.children.push({
                            name: res.content,
                            // id 随机生成 不能重复
                            id: Math.random().toString(36).substr(2),
                            default: false,

                        })
                    }
                })
                // 判断 ProductIndex.value 来从新赋值
                addGroupsConfirm()
            } else if (res.cancel) {
                console.log('用户点击取消')
            }
        }
    });
}

// tapme
const tapme = (i,index) => {
    console.log(i,index)
    if(ProductIndex.value === 0){
        if(formData.color.findIndex(item => item.id === i.id) !== -1) {
            // 那splice里面的i.id和_productAttribute二维数组里面子数据id相同default为false
            _ProductAttribute[0].map(item => {
                item.children.map(items => {
                    if(items.id === i.id) {
                        items.default = false
                    }
                })
            })
            // 过滤掉i.id和formdata.color里面id相同的数据
            formData.color = formData.color.filter(item => item.id !== i.id)

            // 判断 ProductIndex.value 来从新赋值
            addGroupsConfirm()
        } else {
            formData.color.push(i)
        }

        _ProductAttribute[0].map(item => {
            item.children.map(items => {
                console.log(items)
                // 如果formdata里面id和_productAttribute二维数组子数据id相同default全为true
                formData.color.map(itemss => {
                    if(items.id === itemss.id) {
                        items.default = true
                    }
                })
            })
        })
        // 判断 ProductIndex.value 来从新赋值
        addGroupsConfirm()
    }else {
        if(formData.size.findIndex(item => item.id === i.id) !== -1) {
            // 那splice里面的i.id和_productAttribute二维数组里面子数据id相同default为false
            _ProductAttribute[0].map(item => {
                item.children.map(items => {
                    if(items.id === i.id) {
                        items.default = false
                    }
                })
            })
            // 过滤掉i.id和formdata.color里面id相同的数据
            formData.size = formData.size.filter(item => item.id !== i.id)

            // 判断 ProductIndex.value 来从新赋值
            addGroupsConfirm()
        } else {
            formData.size.push(i)
        }

        _ProductAttribute[0].map(item => {
            item.children.map(items => {
                console.log(items)
                // 如果formdata里面id和_productAttribute二维数组子数据id相同default全为true
                formData.size.map(itemss => {
                    if(items.id === itemss.id) {
                        items.default = true
                    }
                })
            })
        })
        // 判断 ProductIndex.value 来从新赋值
        addGroupsConfirm()
    }


    console.log(formData.color)
}

//addGroups
const addGroups = () => {
    Product.modal = false
}

// 选择
const choose = (item) => {
    if(item === '性别'){
        Product.sex_pop = true
    }
}

// 记录选择图片时的待提交数据
const upload = (e) => {
    uni.chooseImage({
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //从相册选择 从相机选择
        count: 9, //最多可以选择的图片张数，默认9
        loop: true, //是否循环选图，默认false
        success: result => {
            console.log(result.tempFiles[0].path)
            if (result.tempFilePaths.length !== 0) {
                needPploadedImgs.push(result.tempFilePaths[0])
            }
        }
    })
}

// 删除图片
const del = (index) => {
    // 删除图片
    needPploadedImgs.splice(index, 1)
    // needPploadedImgs.splice(index, 1)
}

// 提交
const submit = () => {

    if(formData.name === '') {
        uni.showToast({
            title: '请输入商品名称',
            icon: 'none',
            duration: 2000
        });
        return
    }
    //tradePrice retailPrice purchasePrice
    if(formData.tradePrice === '') {
        uni.showToast({
            title: '请输入商品批发价',
            icon: 'none',
            duration: 2000
        });
        return
    }
    if(formData.retailPrice === '') {
        uni.showToast({
            title: '请输入商品零售价',
            icon: 'none',
            duration: 2000
        });
        return
    }
    if(formData.purchasePrice === '') {
        uni.showToast({
            title: '请输入商品进货价',
            icon: 'none',
            duration: 2000
        });
        return
    }
    // 加载中
    uni.showLoading({
        title: '加载中'
    });
    // 循环判断needPploadedImgs是否是https开头的 是的话就不做操作 不是的话就上传 然后赋值给formData.images
    needPploadedImgs.map(item => {
        if(item.indexOf('https') === -1) {
            needPploadedImgs.map(item => {
                uni.uploadFile({
                    url: 'https://chenchangzhang.top/goods/upload-image/',
                    filePath: item, //刚刚在data保存的文件路径
                    name: 'image',   //后台获取的凭据
                    success: uploadFileRes => {
                        console.log(JSON.parse(uploadFileRes.data))
                        formData.images.push(JSON.parse(uploadFileRes.data))
                        console.log(formData)
                    },
                    fail(err) {
                        console.log(err);
                    }
                });
            })
        }
    })
    if(isEdit === true) {
        setTimeout(() => {
            uni.hideLoading()
            console.log(formData)
            storeProduct.updateProduct(formData)
            uni.reLaunch({
                url: '/pages/product_management/product_management'
            })
        },500)
    }else {
        formData.articleNumber = 'HZ' + Math.random().toString(36).substr(2)
        formData.id = Math.random().toString(36).substr(2)
        setTimeout(() => {
            uni.hideLoading()
            storeProduct.addProduct(formData)
            uni.navigateBack({
                delta: 1
            })
        },500)
        let color = store.getAttributes
        let size = store.getProductSize
        color.map(item => {
            item.children.map(items => {
                items.default = false
            })
        })
        size.map(item => {
            item.children.map(items => {
                items.default = false
            })
        })
    }
}

</script>

<style scoped lang="scss">
page{
    background: #F8F8F8;
}
// header
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 10px;
    color: white;
    .header-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        .header-left-icon {
            display: flex;
            flex-direction: row;
            align-items: center;
            .gui-icons {
                font-size: 20px;
                margin-right: 5px;
            }
        }
    }
    .header-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        .header-right-icon {
            display: flex;
            flex-direction: row;
            align-items: center;
            .gui-icons {
                font-size: 20px;
                margin-right: 5px;
            }
        }
    }
}
// form
.addForm {
    background: #F8F8F8;
    padding: 0 28rpx;
    .addForm-basicInformation {
        display: flex;
        flex-direction: column;
        border-radius: 20rpx;
        .gui-form-item {
            flex: 1;
            .gui-form-label {
                width: 80px;
                text-align: right;
                margin-right: 10px;
            }
            .gui-form-body {
                flex: 1;
                .gui-form-input {
                    width: 100%;
                    height: 40px;
                    border: none;
                    outline: none;
                    font-size: 14px;
                    color: #333;
                }
            }
            .addForm-basicInformation-icon{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 30rpx;
                .gui-icons {
                    font-size: 20px;
                    margin-right: 5px;
                }
            }
        }

    }
    // 供应商 品牌 分类 单位 性别 材质 款式 季节 上市日 年份 列表
    &-list{
        display: flex;
        flex-direction: column;
        background: white;
        padding: 20rpx 28rpx;
        border-radius: 20rpx;
        &-item {
            flex: 1;

            //display: flex;
            align-items: center;
            &-title {
                display: flex;
                justify-content: space-between;
                padding: 20rpx 0;
                align-items: center;
            }
            &-label {
                width: 80px;
                //text-align: right;
                margin-right: 10px;
            }
            &-body {
                display: flex;
                align-items: center;
                color:  grey;
            }
            .addForm-basicInformation-icon{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-right: 30rpx;
                .gui-icons {
                    font-size: 20px;
                    margin-right: 5px;
                }
            }
        }
    }
    // addForm-color
    .addForm-color {
        display: flex;
        flex-direction: column;
        background: white;
        padding: 20rpx 28rpx;
        border-radius: 20rpx;
        .addForm-color-text {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .gui-icons {
                font-size: 20px;
                margin-right: 5px;
            }
        }
        .addForm-color-tag {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-top: 20rpx;
        }
    }
    // addForm-size
    .addForm-size {
        display: flex;
        flex-direction: column;
        background: white;
        padding: 20rpx 28rpx;
        border-radius: 20rpx;
        .addForm-size-text {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 28rpx;
            .gui-icons {
                font-size: 20px;
                margin-right: 5px;
            }
        }
        .addForm-color-tag {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-top: 20rpx;
        }
    }
    .addForm-images{
        display: flex;
        flex-direction: row;
        background: white;
        padding: 20rpx 28rpx;
        border-radius: 20rpx;
        .addForm-images-text {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 28rpx;
            .gui-icons {
                font-size: 20px;
                margin-right: 5px;
            }
        }
        .addForm-images-tag {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-top: 20rpx;
        }
    }
}

// gui-modal
//.gui-modal{
//    position: fixed;
//    top: 0;
//    left: 0;
//    right: 0;
//    bottom: 0;
//    background-color: rgba(0,0,0,0.5);
//    //z-index: 998;
//    display: flex;
//    justify-content: center;
//    align-items: center;
//}
//.gui-modal-content{
//    width: 80%;
//    background-color: #fff;
//    border-radius: 10px;
//    overflow: hidden;
//}
//.gui-modal-header{
//    display: flex;
//    justify-content: space-between;
//    align-items: center;
//    padding: 10px 20px;
//    border-bottom: 1px solid #eee;
//    background: #1E88E5;
//    color: white;
//}
//.gui-modal-title{
//    font-size: 16px;
//    font-weight: bold;
//    display: flex;
//    align-items: center;
//}
//.gui-modal-close{
//    font-size: 28rpx;
//}
//.gui-modal-footer{
//    display: flex;
//    justify-content: flex-end;
//    align-items: center;
//    padding: 10px 20px;
//    border-top: 1px solid #eee;
//}
//.gui-modal-button{
//    padding: 10px 20px;
//    color: #007aff;
//    font-size: 16px;
//}
//// 输入框模糊查询
//.gui-input-group{
//    display: flex;
//    justify-content: space-between;
//    align-items: center;
//    padding: 10px 0;
//}
//.gui-input-group-items{
//    width: 100%;
//}
//.gui-input-group-body{
//    display: flex;
//    justify-content: space-between;
//    align-items: center;
//    padding: 0 20px;
//}
//.gui-input-group-title{
//    width: 100px;
//    text-align: right;
//    font-size: 14px;
//    color: #333;
//}
//.gui-input-group-input{
//    flex: 1;
//}
//.gui-input{
//    height: 40px;
//    padding: 0 10px;
//    border: 1px solid #eee;
//    border-radius: 5px;
//    font-size: 14px;
//    color: #333;
//}
//.gui-input:focus{
//    border: 1px solid #1E88E5;
//}
//.gui-input-group-button{
//    width: 80px;
//    height: 40px;
//    margin-left: 10px;
//    border: 1px solid #1E88E5;
//    border-radius: 5px;
//    font-size: 14px;
//    color: #1E88E5;
//    background-color: #fff;
//}
//.gui-input-group-button:hover{
//    background-color: #1E88E5;
//    color: #fff;
//}
.hzpb-list-item{
    border-bottom: 1px solid  #eee;
    line-height: 88rpx;
    padding-left: 28rpx;
    background:  #ccc;
}

.hzpb-list-tage{
    display: flex;
    flex-wrap: wrap;
    padding: 40rpx;
}
.hzpb-list-tage-addTag{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14rpx 10rpx;
    border: 1px dashed #ff8000;
    color: #ff8000;
    border-radius: 10rpx;
    margin-right: 30rpx;
    margin-bottom: 30rpx;
    font-size: 28rpx;
}

.gui-tags {
    text-align: center;
    padding: 10rpx 60rpx;
    width: 180rpx;
    margin-right: 30rpx;
}
.hzpb-list{
    max-height: 1000rpx;
    min-height: 600rpx;
    overflow: auto;
}

.shangchuan {
    width: 90%;
    height: 200rpx;
    //margin: 0 auto;
    display: flex;
    align-items: center;
    .sc2 {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
        background-color: #dadfef;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30rpx;
    }
    .Img3 {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
        //margin-right: 20rpx;
    }
    .del {
        width: 32rpx;
        height: 32rpx;
        position: absolute;
        z-index: 1000;
        top: 0rpx;
        right: 0;
        font-size: 32rpx;
    }
    .sc3 {
        font-size: 45rpx;
        font-weight: bold;
    }
}
.demo{display:block; width:100%; line-height:60rpx; font-size:28rpx; text-align:right;}

</style>
