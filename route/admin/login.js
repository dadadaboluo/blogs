// 导入用户集合构造函数
const {User} = require('../../model/user') 
const bcrypt = require('bcrypt')
module.exports = async (req, res) => {
    
    // 接收请求参数
    const {email, password} = req.body;
    // 如果用户没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0)
        return res.status(400).render('admin/error', {msg: '邮件地址或者密码错误'});
        // 根据邮箱地址查询用户信息
        // 如果查询到了用户 user变量的值是对象类型，对象中存储的是用户信息
        // 如果没有查询都用户，user变量为空
        let user = await User.findOne({email})
        // 查询到了用户
        if (user) {
            // 将客户端传递过来的密码和用户信息中的密码进行比对
            if(password == user.password) {
                // 登录成功
                req.session.username = user.username;
                // res.send('登录成功')
                //重定向到用户列表页面
                req.app.locals.userInfo = user;
                res.redirect('/admin/user');
            } else {
            // 没有查询到用户
            res.status(400).render('admin/error', {msg: '邮箱地址或者密码错误'})
            }
        } else {
            // 没有查询到用户
            res.status(400).render('admin/error', {msg: '邮箱地址或者密码错误'})
        }
} 
