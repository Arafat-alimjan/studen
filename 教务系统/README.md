# 2023-3-2

## 功能实现情况

1. 绘制了数据库ER图，确定了基本交互逻辑。
2. 通过 `Flask`  框架配合 ` PyMySQL`  模块，实现了请求数据库判断用户是否在数据库内，并且返回响应数据。
3. 完成了 `login` 页面的交互逻辑。

## 登录数据库设计

| 列名     | 数据类型            | 说明                                 |
| -------- | ------------------- | ------------------------------------ |
| id       | int                 | 用户唯一标识符                       |
| username | char(11)            | 用户名                               |
| password | varchar(50)         | 用户密码                             |
| status   | enum('0', '1', '2') | 身份：0 = 管理员，1 = 教师，2 = 学生 |

## Python Flask 交互代码

```python
pythonCopy code@app.route('/xju_login', methods=['GET'])
def xju_login(): 
    username = request.args.get("username")
    password = request.args.get("password")
    
    # 建立连接
    db = pymysql.connect(
        host='101.43.64.72',
        user='xju',
        password='2yLmf54pm8ecHyjy',
        database='xju',
        port=3306,
        charset='utf8mb4'
    )

    # 查询数据库，判断用户名和密码是否匹配
    cursor = db.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM user_info WHERE username=%s AND password=%s"
    cursor.execute(sql, (username, password))
    result = cursor.fetchone()
    cursor.close()

    if result:
        # 如果查询到结果，表示用户名和密码正确，返回登录成功信息
        return json.dumps(result, ensure_ascii=False)
    else:
        # 否则，用户名和密码错误，返回登录失败信息
        return 'Login Failed'
```

## 小程序交互代码

```javascript
javascriptCopy codeonLogin: function() {
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
                wx.showToast({
                    title: '恭喜你，登陆成功！',
                    icon:'none'
                })
                wx.setStorageSync('userInfo', res.data)
                /* wx.navigateTo({
                    url: '/pages/home/home'
                }) */
            } else {
                wx.showToast({
                    title: '学号或密码错误！',
                    icon:'none'
                })
            }
        },
        fail: () => {
            wx.showToast({
                title: '网络错误，请检查您的网络连接',
                icon:'none'
            })
        }
    })
}
```# studen
