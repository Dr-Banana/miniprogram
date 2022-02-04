// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    
   
  },
  // 事件处理函数
 
  onLoad() {
    let that=this
    db.collection('drama').get({
      success(res){
        that.setData({
          arr:res.data,
          name:res.data[0].name,
          price:res.data[0].price,
          describe:res.data[0].describe,
          pic:res.data[0].src,
          time:res.data[0].time
        })
      }
    })
  },
  onShareTimeline: function () {
    return {
      title: '快来看看Puzzleolgy有什么活动吧',
    }
  },
  onShareAppMessage: function( options ){
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容
    var shareObj = {
      title: '报名主页',
      path: '/pages/share/share',    // 默认是当前页面，必须是以‘/'开头的完整路径
      success: function(res){
        // 转发成功之后的回调
        if(res.errMsg == 'shareAppMessage:ok'){
        }
      },
      fail: function(){
        // 转发失败之后的回调
        if(res.errMsg == 'shareAppMessage:fail cancel'){
          // 用户取消转发
        }else if(res.errMsg == 'shareAppMessage:fail'){
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
    }
  },
  a(e){
   let  index =  e.detail.current
   this.setData({
     pic:this.data.arr[index].src,
     name:this.data.arr[index].name,
     price:this.data.arr[index].price,
     time:this.data.arr[index].time,
     describe:this.data.arr[index].describe,
   })
  },
  select(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../goods/goods?a='+index,
    })
  },
})
