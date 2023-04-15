<template>
  <view class="gui-list gui-margin-top gui-padding-x">
    <view class="gui-list-items" v-for="(item, index) in ProductAttribute" :key="index" @tap="ProductColor(index)">
      <view class="gui-list-body gui-border-b">
        <view class="gui-list-title">
          <text class="gui-list-title-text">{{ item }}</text>
        </view>
      </view>
      <text class="gui-list-arrow-right gui-icons gui-color-gray">&#xe601;</text>
    </view>
  </view>
  <!-- 点击颜色或者尺码弹出对应弹窗 -->
  <view v-if="Product.modal" class="gui-modal">
    <view class="gui-modal-content">
      <view class="gui-modal-header">
        <view class="gui-modal-title">
          <view @tap="Product.modal = false">
            <text class="gui-icons gui-color-white">&#xe600;</text>
            <text style="font-size: 28rpx;margin-right: 30rpx">返回</text>
          </view>
          <text>{{ ProductAttribute[ProductIndex] }}管理</text>
        </view>
        <view class="gui-modal-close" @tap="addGroups" >
          <text>添加分组</text>
        </view>
      </view>
        <!-- 输入框模糊查询 -->
        <view class="gui-input-group">
          <view class="gui-input-group-items">
            <view class="gui-input-group-body">
              <view class="gui-input-group-input">
                <!-- 检索框 自动检索 -->
                <input class="gui-input" type="text" placeholder="输入关键字检索" @input="retrieval" />
              </view>
            </view>
          </view>
        </view>
      <!-- 颜色尺码分组 ProductIndex==1 ProductIndex==2 展示  -->
      <view class="hzpb-list"  v-if="ProductIndex === 0 || ProductIndex === 1">
        <view  v-for="(item, index) in _ProductAttribute[0]" :key="index">
          <view class="hzpb-list-item" style="display: flex;justify-content: space-between">
            <text class="hzpb-list-item-text">{{item.name}}</text>
            <!-- 字体图标 -->
            <view style="padding-right: 28rpx">
              <text @tap="revise(item)" class="hzpb-list-item-icon gui-icons gui-color-orange" style="margin-right: 30rpx;font-size: 36rpx">&#xe69e;</text>
              <text @tap="deleteGroups(item)" class="hzpb-list-item-icon gui-icons gui-color-red" style="font-size: 36rpx">&#xe794;</text>
            </view>
          </view>
          <view class="hzpb-list-tage">
            <gui-tags @tapme="tapme(items)" v-for="(items, indexs) in item.children" borderColor="rgba(69, 90, 100, 0.6)" :key="indexs" :text="items.name" :customClass="['gui-transparent-bg', 'gui-color-gray']"  :size="26"></gui-tags>
            <text class="hzpb-list-tage-addTag" @tap="newlyIncreased(item)">新增{{ProductAttribute[ProductIndex]}}</text>
          </view>
        </view>
      </view>
      <view v-else class="hzpb-list">
        <!-- 提示语 -->
        <view class="hzpb-list-item" style="display: flex;align-items: center">
          <!--字体图标-->
          <text class="hzpb-list-item-icon gui-icons gui-color-orange" style="font-size: 36rpx;margin-right: 20rpx">&#xe645;</text>
          <text class="hzpb-list-item-text" style="font-size: 24rpx">【向左滑动】选项可进行删除</text>
        </view>
        <!-- 实现左滑删除 -->
          <scroll-view :scroll-y="true">
            <view v-for="(item,index) in _ProductAttribute[0]" :key="index" class="good-item" style="display: flex" :style="{ right: item.right + 'rpx'}" >
              <view  class="good-item" @touchstart="startHandle($event,index)" @touchmove="moveHandle($event,index)"
                     @touchend="endHandle($event,index)" @click="revise(item)"   >
                <view class="good-info">
                  <view class="name">{{item.name}}</view>
                </view>
              </view>
              <view class="del-btn" @click="deleteGroups(item)">删除</view>
            </view>
          </scroll-view>
      </view>
    </view>
  </view>

<!-- 点击addGroups 弹出groups添加框 -->
  <view v-if="Product.groups" class="gui-groups">
    <view class="gui-groups-content">
      <view class="gui-groups-title">
        {{ ProductAttribute[ProductIndex] }}添加/分组
      </view>
      <view class="gui-groups-body">
        <input class="gui-input" v-model="group" type="text" placeholder="颜色分组名称/颜色" />
      </view>
      <view class="gui-groups-footer">
        <view class="gui-modal-button" @tap="Product.groups = false">取消</view>
        <view class="gui-modal-button" @tap="submitGroups">确定</view>
      </view>
    </view>
  </view>



</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
// 导入dcloudio/uni-app
import { onShow, onUnload, onReady, onLoad } from '@dcloudio/uni-app'

// 导入本地pinia store
import { useProductAttributesStore } from "@/store/modules/product_attributes"
import index from "../index/index.vue";

// 定义 Product.modal
const Product = reactive({
  modal: false,
  groups: false
})
const group = ref('')

const ProductIndex = ref(0)
const ProductAttribute = reactive(['颜色', '尺码', '品牌', '材质', '分类', '季节', '款式', '单位'])
const windowHeight = ref(0)
const delBtnWidth = ref(140)
const startX = ref('')

const _ProductAttribute = reactive([])

// 结构出来
const store = useProductAttributesStore()

onLoad(() => {
  // 初始化
  console.log('onLoad')
  uni.getSystemInfo({
    success: res => {
      windowHeight.value = res.windowHeight
      console.log(windowHeight.value)
    }
  })

})

// startHandle
const startHandle = (e, index) => {
  let touch = e.touches[0]
  for (let index in _ProductAttribute[0]) {
    _ProductAttribute[0][index].right = 0
  }
  startX.value = touch.clientX
}
 //moveHandle
const moveHandle = (e, index) => {
  let touch = e.touches[0]
  let disX = startX.value - touch.clientX //计算手指移动的距离
  if (disX >= 20){
    if(disX > delBtnWidth.value){
      disX = delBtnWidth.value
    }
    _ProductAttribute[0][index].right = disX
  }else {
    _ProductAttribute[0][index].right = 0
  }
}
// endHandle
const endHandle = (e, index) => {
  let good = _ProductAttribute[0][index]
  if (good.right >= delBtnWidth.value / 2) {
    _ProductAttribute[0][index].right = delBtnWidth.value
  } else {
    _ProductAttribute[0][index].right = 0
  }
}

// delHandle
const delHandle = (id) => {
  console.log(id)
  // store.delProductAttributes(id)
  _ProductAttribute[0] = _ProductAttribute[0].filter(item => {
    return item.id !== id
  })

}



const ProductColor = (index) => {
  Product.modal = true
  ProductIndex.value = index
  addGroupsConfirm()
}

const retrieval = (e) => {
  if(e.detail.value !== '') {
    // 二维数组 查询和检索
    if(ProductIndex.value == 0 || ProductIndex.value == 1){
      let arrs = _ProductAttribute[0].map(item => {
        return item.children.filter(items => {
          return items.name.includes(e.detail.value)
        })
      })
      let arr = _ProductAttribute[0].map(item => {
        return {
          name: item.name,
          children: item.children.filter(items => {
            return items.name.includes(e.detail.value)
          })
        }
      })
      _ProductAttribute[0] = arr
    }else {
      let arr = _ProductAttribute[0].filter(item => {
        return item.name.includes(e.detail.value)
      })
      _ProductAttribute[0] = arr
    }
    // 重新赋值
    // _ProductAttribute[0] = arr
  }else {
    addGroupsConfirm()
  }

  console.log(_ProductAttribute[0])
}

// 添加分组
const addGroups = () => {
  Product.groups = true
}

// 判断 ProductIndex.value 来从新赋值
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


const revise = (item: ) => {
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
          if (items.id == item.id) {
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

// 点击选择弹窗 修改或者删除
const tapme = (itemsId) => {
  console.log(itemsId)
  // 修改 删除
  uni.showActionSheet({
    itemList: ['修改', '删除'],
    success: function (res) {
      console.log(res.tapIndex)
      if (res.tapIndex == 0) {
        // 修改
        uni.showModal({
          title: '修改',
          cancelColor: "#FF0606",
          placeholderText: '请输入内容',
          content: itemsId.name,
          editable: 'true',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              // // 更新二维数组里面的数据
              _ProductAttribute[0].map(item => {
                item.children.map(items => {
                  if (items.id == itemsId.id) {
                    items.name = res.content
                  }
                })
              })
              // 判断 ProductIndex.value 来从新赋值
              addGroupsConfirm()

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
      } else if (res.tapIndex == 1) {
        // 删除
        uni.showModal({
          title: '删除',
          content: '删除',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              // 删除二维数组里面的数据
              _ProductAttribute[0].map(item => {
                item.children.map((items, index) => {
                  if (items.id == itemsId.id) {
                    item.children.splice(index, 1)
                  }
                })
              })
              // 判断 ProductIndex.value 来从新赋值
              addGroupsConfirm()

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
      }
    },
    fail: function (res) {
      console.log(res.errMsg)
    }
  });
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

// 新增
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
          if(item.id == itemsId.id) {
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

const ProductSize = () => {
  Product.modal = true
}


</script>

<style lang="scss">
page{
  background-color: #EEEFF8;
  overflow: hidden;
}
.gui-list{
  background-color: #fff;
  margin-top: 10px;
}

// 点击颜色或者尺码弹出对应弹窗
.gui-modal{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  //z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gui-modal-content{
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.gui-modal-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  background: #1E88E5;
  color: white;
}
.gui-modal-title{
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.gui-modal-close{
  font-size: 28rpx;
}
.gui-modal-footer{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #eee;
}
.gui-modal-button{
  padding: 10px 20px;
  color: #007aff;
  font-size: 16px;
}
// 输入框模糊查询
.gui-input-group{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.gui-input-group-items{
  width: 100%;
}
.gui-input-group-body{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.gui-input-group-title{
  width: 100px;
  text-align: right;
  font-size: 14px;
  color: #333;
}
.gui-input-group-input{
  flex: 1;
  //margin-left: 10px;
}
.gui-input{
  //width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
}
.gui-input:focus{
  border: 1px solid #1E88E5;
}
.gui-input-group-button{
  width: 80px;
  height: 40px;
  margin-left: 10px;
  border: 1px solid #1E88E5;
  border-radius: 5px;
  font-size: 14px;
  color: #1E88E5;
  background-color: #fff;
}
.gui-input-group-button:hover{
  background-color: #1E88E5;
  color: #fff;
}



// 弹窗 淡入淡出效果
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.gui-modal-enter-active, .gui-modal-leave-active {
  transition: opacity 30s;
}
.gui-modal-enter, .gui-modal-leave-to {
  opacity: 0;
}



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
  //width: 80rpx;
  padding: 14rpx 10rpx;
  //border: 1px  #eee;
  // 点线橙色
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

 // gui-groups样式
  .gui-groups{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    .gui-groups-content{
      width: 50%;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      .gui-groups-title{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 1px solid #eee;
        background: #1E88E5;
        color: white;
      }
      .gui-groups-body{
        padding: 10px 20px;
      }
      .gui-groups-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 10px 20px;
        border-top: 1px solid #eee;
      }
      }
    }

.hzpb-list{
  max-height: 1000rpx;
  min-height: 600rpx;
  overflow: auto;
}

.good-item{
  position: relative;
  width: 100%;
  background: #fff;
  display: flex;
  //margin-bottom: 30rpx;
  border-bottom: 1px solid #eee;
  height: 88rpx;

  .good-info{
    display: flex;
    padding:20rpx;
    font-size: 28rpx;
    .info-left{
      width: 120rpx;
      height: 120rpx;
      margin-right: 16rpx;
    }
    .info-right{
      .price{
        padding: 10rpx 0;
        color: red;
        font-size: 32rpx;
      }
    }

  }

}

.del-btn{
  position: absolute;
  top:0;
  right:-140rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:20;
  width: 140rpx;
  height:100%;
  background: red;
  color:#fff;
}


</style>
