Page({
  data: {
    userCode: '',
    password: '',
    error: ''
  },

  bindInputUserCode: function(e) {
    this.setData({
      userCode: e.detail.value
    })
  },

  bindInputPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onLogin: function() {
    if (this.data.userCode.trim() === '' || this.data.password.trim() === '') {
        wx.showToast({
          title: '学号或密码不能为空',
          icon:'none'
        })
      return
    }

    wx.request({
      url: 'https://hizmat.uygur.asia/xju_login',
      method: 'GET',
      data: {
        username: this.data.userCode,
        password: this.data.password
      },
      success: res => {
        if (res.data != 'Login Failed') {
            wx.showToast({title: '恭喜你，登陆成功！', icon:'none'})
            wx.setStorageSync('userInfo', res.data)
          /* wx.navigateTo({
            url: '/pages/home/home'
          }) */
        } else {
          wx.showToast({title: '学号或密码错误！', icon:'none'})
        }
      },
      fail: () => {
        wx.showToast({title: '网络错误，请检查您的网络连接', icon:'none'})
      }
    })
  }
})
