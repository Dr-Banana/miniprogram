
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    index:"",
    idx:0,
    getList:{},
    people_count:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    const _ = db.command
           let name =options.a
           db.collection('drama').where({name:name}).get({
             success(res){
               console.log(res)
               that.setData({
                 name:res.data,
                 getList:res.data,
                 idx:res.data[0].juben_difficulty,
               })
             }
           })
           db.collection('user').where({
            name:_.eq(name)
           })
           .get({
            success: function(res) {
              that.setData({
                people_count: res.data.length
              })
            }
           })

  },
  onShareTimeline: function () {
    return {
      title: '发车在即！赶紧上车🚗',
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
 
    }
    return {
      title: '转发',
      path: '/pages/index/community/topic/topic?jsonStr=' + this.data.list,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
 
    }
    return {
      title: '转发',
      path: '/pages/index/community/topic/topic?jsonStr=' + this.data.list,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },

  //进入报名表
  taptest(){
    let jubenName = this.data.getList[0].name
    wx.navigateTo({
      url: '../register/register?a='+jubenName,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})