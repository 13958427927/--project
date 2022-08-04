
// 获取用户基本信息
const getUserInfo = () => {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        data: null,
        success: (res) => {
            // console.log(res)  
            const { message, status} = res 
            if(status !== 0) return layer.msg(message)
            renderAvatar(res.data)
        }
    });
}
const renderAvatar = data => {
    let name = data.nickname || data.username;
    //设置欢迎文本
    $("#welcome").html(`欢迎 ${name}`);
    if (data.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", data.user_pic)
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName);
    }
}
// 调用 getUserInfo 函数获取用户基本信息
getUserInfo();
// 退出登录
$("#btnLogout").click(() => {
    layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "提示" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        },
    );
});

