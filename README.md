# 低代码问卷收集

具体细节：

## 用户细节

使用jwt
json web token，是一个常用的用户认证方式，服务端返回一个令牌，以后的每请求都会带着这个token，login 的时候向服务端发送用户名和密码，服务端验证通过后返回一个token，以后每次请求都带着这个token，前端的每次都要带着这个token。

## api 设计

### 注册

- method `post`
- path `api/user/register`
- request body `{username, password, nickname}`
- response body `{errno:0}`

### 登录

- method `post`
- path `api/user/login`
- request body `{username, password}`
  -response body `{errno:0, token}` jwt使用token
