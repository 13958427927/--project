const form = layui.form
const layer = layui.layer;
form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    nickname: (val) => {
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        }
    },
    email: [
        /@/
        , '邮箱输入错误'
    ]
});
// 初始化用户信息
const initUserInfo = () => {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        data: null,
        success: (res) => {
            const { status, message, data } = res;
            if (status !== 0) return layer.msg(message);
            form.val('formUserInfo',data)
        },
    });
};
initUserInfo();
// 重置表单数据
$("#btnReset").click((e) => {
    e.preventDefault();
    initUserInfo()
});
// 更新用户数据
$(".layui-form").submit (function (e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/userinfo",
        data: form.val('formUserInfo'),
        success: (res) => {
            if (res.status !== 0) return layer.msg("更新用户信息失败！");
            console.log(layer.msg("更新用户信息成功！"));
            // 调用父页面渲染函数
            window.parent.getUserInfo();
        },
    });
});
