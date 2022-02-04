const db =wx.cloud.database()

const z = require('../../utils/util.js')
Page({
  data: {
    user_note:"",
    time:[],
    timeIndex: 0,
    timePick:""
  },
  onLoad: function (options) {
    let that=this
    
           let name =options.a
           db.collection('drama').where({name:name}).get({
             success(res){
               that.setData({
                 name:res.data,
                 time:res.data[0].game_time,
                 timePick:res.data[0].game_time[that.data.timeIndex]
               })
             }
           })
  },
  //时间选择
  pickerChange:function(e){
    let selectIndex = e.detail.value;
    this.setData({
      "timeIndex":selectIndex
    })
  },
  // back to last page
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  // data upload
  rg(){
    let user=wx.getStorageSync('user')
    console.log("user")
    if(user){
      this.add()
    }else{
      this.userinfo()
    }
  },
  userinfo(){
    
    wx.getUserProfile({
      desc: 'desc',
      success:(res)=>{
        console.log("获取信息成功",res)
        let user=res.userInfo
        wx.setStorageSync('user', user)
        wx.setStorageSync('user', user)
        this.add()
      },fail:res=>{
        console.log("获取信息失败",res)
      }
    })
  },
  add(e){
    let that = this
    const _ = db.command
    var time=z.formatTime(new Date())
    let user =wx.getStorageSync('user')
    if(that.data.timePick!=""){
      db.collection('user').where({
          user_nickName:_.eq(user.nickName),
      })
      .get({
        success: function(res) {
          let check = true
          console.log(res.data)
          for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].user_nickName==user.nickName&&res.data[i].name==that.data.name[0].name){
              check = false
            }
          }
          if(res.data.length==0||check){
            db.collection('user').add({
              data:{
                user_src:user.avatarUrl,
                user_nickName:user.nickName,
                user_rName:that.data.user_name,
                user_id:that.data.user_idcode,
                time:time,
                name:that.data.name[0].name,
                src:that.data.name[0].src,
                user_note:that.data.user_note,
                time_userPick:that.data.name[0].game_time[that.data.timeIndex]
              },success:function(res){
                wx.showToast({
                  title: '报名成功',
                })
              }
            })
          }else{
            wx.showModal({
              title: '请勿重复报名',
              showCancel: false,
            })
          }
        }
      })
      wx.navigateBack({
        delta: 1,
      })
    }else{
      wx.showModal({
        title: '该剧本暂未开放',
        showCancel: false,
      })
    }
  },
  name:function(e){
    this.setData({
      user_name:e.detail.value
    })
  },
  id:function(e){
    this.setData({
      user_idcode:e.detail.value
    })
  },
  note:function(e){
    this.setData({
      user_note:e.detail.value
    })
  },
})