<template>
	<gui-page :customHeader="true" :headerClass="['gui-bg-blue', 'gui-dark-bg-level-1']">
    <!-- 自定义头部导航 -->
    <template v-slot:gHeader>
      <view class="header">
        <view class="header-left">
          <view class="header-left-icon">
              <text>库存调成</text>
              <text class="gui-icons gui-block gui-color-white">&#xe661;</text>
          </view>
            <view class="header-left-icon">
                <text>全部库存</text>
                <text class="gui-icons gui-block gui-color-white">&#xe661;</text>
            </view>
        </view>
        <view class="header-right">
            <view class="header-right-icon" @tap="add_product">
                <text class="gui-icons gui-block gui-color-white">&#xe6c7;</text>
                <text>新增</text>
            </view>
            <view class="header-right-icon">
                <text class="gui-icons gui-block gui-color-white">&#xe614;</text>
                <text>更多</text>
            </view>
        </view>
      </view>
    </template>
    <template v-slot:gBody>
        <!-- 扫一扫 检索框 筛选 -->
        <view class="search">
            <view class="search-left">
                <view class="search-left-icon">
                    <text class="gui-icons gui-block gui-color-blue">&#xe61d;</text>
                    <text>扫一扫</text>
                </view>
                <view class="search-left-input">
                    <input type="text" placeholder="请输入商品名称/条码/拼音码"  @input="search_product"/>
                </view>
            </view>
            <view class="search-right">
                <view class="search-right-icon">
                    <text class="gui-icons gui-block gui-color-blue">&#xe686;</text>
                    <text>筛选</text>
                </view>
            </view>
        </view>
        <!-- 商品数 库存数 库存成本 库存预警 -->
        <view class="product">
            <view class="product-left">
                <view class="product-left-item">
                    <text>20</text>
                    <text>商品数</text>
                </view>
                <view class="product-left-item">
                    <text>14</text>
                    <text>库存数</text>
                </view>
                <view class="product-left-item">
                    <text>¥1348.00</text>
                    <text>库存成本</text>
                </view>
                <view class="product-left-item">
                    <text>7</text>
                    <text>库存预警</text>
                </view>
            </view>
        </view>
        <!-- 商品筛选 默认 名称 货号 库存量 可以库存 待入库 待出库 -->
        <view class="product-filter">
            <view class="product-filter-item" v-for="(item, index) in productFilter" :key="index" @tap="productFilterClick(item, index)">
                <view v-if="activeIndex == 0">
                    <text v-if="index==activeIndex" class="gui-icons gui-block gui-color-blue">&#xe69b;</text>
                </view>
                <view v-else>
                    <text v-if="index==activeIndex" class="gui-icons gui-block gui-color-blue">&#xe661;</text>
                </view>
                <text :style="{color: index === activeIndex? activeColor : 'black'}">{{ item.name }}</text>
            </view>
        </view>
        <!-- 商品列表 -->
        <scroll-view :show-scrollbar="false" :scroll-y="true" :style=" 'height:' + productListRef + 'rpx' ">
            <view class="product-list" v-for="(item, index) in productList[0]" @tap="edit_product(item)">
                <view class="product-list-item">
                    <view class="product-list-item-image">
                        <!--获取第一张图片的地址-->
                        <image :src="item.images[0].image" mode=""></image>
                    </view>
                    <view class="product-list-item-content">
                        <view class="product-list-item-content-title">
                            <text>{{ item.name }}</text>
                            <view class="product-list-item-content-title-icon">
                                <text class="gui-icons gui-block gui-color-blue">&#xe606;</text>
                                <text class="gui-color-blue">分享</text>
                            </view>
                        </view>
                        <view class="product-list-item-content-info">
                            <view class="product-list-item-content-info-text">
                                <text>{{item.availableStock}}</text>
                                <text>可用库存</text>
                            </view>
                            <view class="product-list-item-content-info-text">
                                <text>{{item.pendingStock}}</text>
                                <text>待入库</text>
                            </view>
                            <view class="product-list-item-content-info-text">
                                <text>{{item.pendingOutStock}}</text>
                                <text>待出库</text>
                            </view>
                            <view class="product-list-item-content-info-text">
                                <text>{{item.location}}</text>
                                <text>库位</text>
                            </view>
                        </view>
                        <view class="product-list-item-content-price">
                            <view class="product-list-item-content-price-text">
                                <text>{{ item.purchasePrice }}</text>
                                <text>采购价</text>
                            </view>
                            <view class="product-list-item-content-price-text">
                                <text>{{ item.tradePrice }}</text>
                                <text>批发价</text>
                            </view>
                            <view class="product-list-item-content-price-text">
                                <text>{{ item.retailPrice }}</text>
                                <text>零售价</text>
                            </view>
                            <view class="product-list-item-content-price-text">
                                <text>{{item.stock}}</text>
                                <text>库存量</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
    </template>


  </gui-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import { onShow, onUnload, onReady, onLoad } from '@dcloudio/uni-app'
import { useProductStore } from "@/store/modules/product"

// product数据
const productList = reactive([])

// 结构useProductStore
const {getProduct, addProduct, deleteProduct, updateProduct}= useProductStore()


// 商品筛选
const productFilter = reactive([
    {name: '默认', value: 'default', active: false},
    {name: '名称', value: 'name', active: false},
    {name: '货号', value: 'number', active: false},
    {name: '库存量', value: 'stock', active: false},
    {name: '可用库存', value: 'availableStock', active: false},
    {name: '待入库', value: 'pendingInbound', active: false},
    {name: '待出库', value: 'pendingOutbound', active: false}
])
// 选中坐标
const activeIndex = ref(0)
// 选中颜色
const activeColor = ref('#1890ff')

// 商品筛选点击事件
const productFilterClick = (item: any, index) => {
    console.log(item)
    activeIndex.value = index
    item = productFilter[index]
    item.active = !item.active
    console.log(productFilter)
}
onMounted(() => {
    console.log('onMounted')
    getProductList()
})

// 给product-list加上高度 超出滚动
const productFilterHeight = ref(0)
const productListHeight = ref(0)
const productHeader = ref(0)
const productSearch = ref(0)
const productListRef = ref(null)
onReady(() => {
    // 获取商品筛选高度
    uni.createSelectorQuery().select('.product-filter').boundingClientRect((rect) => {
        productFilterHeight.value = rect.height
    }).exec()
    // 获取数据列表高度
    uni.createSelectorQuery().select('.product').boundingClientRect((rect) => {
        productListHeight.value = rect.height
    }).exec()
    // 获取头部高度
    uni.createSelectorQuery().select('.header').boundingClientRect((rect) => {
        productHeader.value = rect.height
    }).exec()
    // 获取搜索高度
    uni.createSelectorQuery().select('.search').boundingClientRect((rect) => {
        productSearch.value = rect.height
    }).exec()
    // 获取系统高度
    uni.getSystemInfo({
        success: (res) => {
            productListRef.value = res.windowHeight - productFilterHeight.value - productHeader.value - productSearch.value - productListHeight.value
            console.log(productListRef.value)
        }
    })

})
// 获取商品列表
const getProductList = () => {
    productList[0] = getProduct
    console.log(productList)
}

// 新增商品
const add_product = () => {
    uni.navigateTo({
        url: '/pages/product_management/add_product'
    })
}

// 检索商品
const search_product = (e) => {
    console.log(e)
   // 查询和检索productList
    if(e.detail.value == ''){
        getProductList()
    }else {
        let arr = productList[0].filter(items => {
            // console.log(items)
            // 根据items.name是否包含e.detail.value 或者 items.articleNumber是否包含e.detail.value
            return items.name.includes(e.detail.value) || items.articleNumber.includes(e.detail.value)


        })
        productList[0] = arr
    }
}
// 编辑商品
const edit_product = (item) => {
    console.log(item)
    // 传递参数
    uni.navigateTo({
        url: '/pages/product_management/add_product?item=' + JSON.stringify(item)
    })
}

</script>

<style scoped lang="scss">
// 自定义头部导航
.header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 0 10px;
  color: white;
  .header-left{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .header-left-icon{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      text-align: center;
      .gui-icons{
        font-size: 20px;
        margin-left: 5px;
      }
    }
  }
  .header-right{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .header-right-icon{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      text-align: center;
      .gui-icons{
        font-size: 20px;
        margin-left: 5px;
      }
    }
  }
}
// 扫一扫 检索框 筛选
.search{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding:  20rpx;
  border-bottom: 1px solid #e5e5e5;
  .search-left{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .search-left-icon{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      text-align: center;
      width: 120rpx;
      color: #1565C0;
      .gui-icons{
        font-size: 20px;
        margin-left: 5px;
      }
      text{
        font-size: 24rpx;
      }
    }
    .search-left-input{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 80rpx;
      //padding-top: 40rpx;
      input{
        width: 100%;
        height: 100%;
        border: 1px solid #e5e5e5;
        background: none;
        border-radius: 10rpx;
        padding-left: 20rpx;
        font-size: 28rpx;
      }
    }
  }
  .search-right{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    .search-right-icon{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      text-align: center;
      color: #1565C0;
      .gui-icons{
        font-size: 20px;
        margin-left: 5px;
      }
      text{
        font-size: 24rpx;
      }
    }
  }
}
// 商品数 库存数 库存成本 库存预警
.product{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 20rpx;
  border-bottom: 1px solid #e5e5e5;
  //color: white;
  .product-left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    .product-left-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      text-align: center;
      flex: 1;
      color: gray;
      text{
        font-size: 24rpx;
      }
      text:nth-child(1){
        font-size: 32rpx;
        color: black;
      }
    }
    .product-left-item:nth-child(4) {
      text:nth-child(1){
        color: red;
      }
    }
  }
}
// 商品筛选 默认 名称 货号 库存量 可以库存 待入库 待出库
.product-filter{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 20rpx;
  border-bottom: 1px solid #e5e5e5;
  //color: white;
  .product-filter-item{
    display: flex;
    //flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    text-align: center;
    flex: 1;
    color: gray;
    text{
      font-size: 24rpx;
    }
    text:nth-child(1){
      font-size: 32rpx;
      color: black;
    }
  }
}
// 商品列表
.product-list{
  display: flex;
  &-item{
      display: flex;
      border-bottom: 1px solid #e5e5e5;
      flex: 1;
      align-items: center;
      &-image{
          width: 220rpx;
          height: 220rpx;
          overflow: hidden;
          image{
              width: 100%;
              height: 100%;
          }
      }
      &-content{
          flex: 1;
          .product-list-item-content-title{
              display: flex;
              justify-content: space-between;
              border-bottom: 1px #e5e5e5 dashed;
              padding: 20rpx;
              .product-list-item-content-title-icon{
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  margin-right: 10px;
                  text-align: center;
                  color: #1565C0;
                  .gui-icons{
                      font-size: 20px;
                      margin-left: 5px;
                  }

              }
          }
          .product-list-item-content-info{
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 20rpx;
              border-bottom: 1px #e5e5e5 dashed;
              &-text{
                  display: flex;
                  flex-direction: column;
                  margin-right: 10px;
                  flex: 1;
                  color: gray;
                  text{
                      font-size: 24rpx;
                  }
                  text:nth-child(1){
                      font-size: 32rpx;
                      color: black;
                  }
              }
          }
          &-price{
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 20rpx;
              //border-bottom: 1px #e5e5e5 dashed;
              &-text{
                  display: flex;
                  flex-direction: column;
                  margin-right: 10px;
                  flex: 1;
                  color: gray;
                  text{
                      font-size: 24rpx;
                  }
                  text:nth-child(1){
                      font-size: 32rpx;
                      color: orange;
                  }
              }
          }
      }
  }

}
</style>
