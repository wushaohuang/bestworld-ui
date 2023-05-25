const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: '成功',
    data: null
}

Mock.mock('/captcha', 'get', () => {
    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage('120 * 40', '123456')
    }
    return Result
})

Mock.mock('/sys/userInfo', 'get', () => {
    Result.data = {
        id: "1",
        username: "test",
        avatar: "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg"
    }
    return Result
})

Mock.mock('/logout', 'post', () => {
    return Result
})


Mock.mock(RegExp('/sys/menu/*'), 'post', () => {
    return Result
})

// 获取用户菜单以及权限接口
Mock.mock('/sys/menu/nav', 'get', () => {

    let nav = [
        {
            name: 'SysManga',
            title: '系统管理',
            icon: 'el-icon-s-operation',
            component: '',
            path: '',
            children: [
                {
                    name: 'SysUser',
                    title: '用户管理',
                    icon: 'el-icon-s-custom',
                    path: '/sys/users',
                    component: 'sys/User',
                    children: []
                },
                {
                    name: 'SysRole',
                    title: '角色管理',
                    icon: 'el-icon-rank',
                    path: '/sys/roles',
                    component: 'sys/Role',
                    children: []
                },
                {
                    name: 'SysMenu',
                    title: '菜单管理',
                    icon: 'el-icon-menu',
                    path: '/sys/menus',
                    component: 'sys/Menu',
                    children: []
                }
            ]
        },
        {
            name: 'SysTools',
            title: '系统工具',
            icon: 'el-icon-s-tools',
            path: '',
            component: '',
            children: [
                {
                    name: 'SysDict',
                    title: '数字字典',
                    icon: 'el-icon-s-order',
                    path: '/sys/dicts',
                    component: '',
                    children: []
                },
            ]
        }
    ]

    let authoritys = ['sys:user:list', "sys:user:save", "sys:user:delete"]

    Result.data = {
        nav: nav,
        authoritys: authoritys
    }

    return Result
})
