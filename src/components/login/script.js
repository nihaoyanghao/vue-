import Axios from "axios"
export default {
  data() {
    return {
      obj: {
        username: "",
        password: "",
      }
    }
  },
  methods: {
    getLogin() {
      const url = "http://localhost:8888/api/private/v1/login"
      Axios.post(url, this.obj)
        .then(obj => {
          // console.log(obj)
          const {data, meta} = obj.data
          const {msg, status} = meta
          // 如果登录成功的话就 设置一个localStorage 
          // console.log(data)
          // console.log(meta)
          // console.log(msg)
          // console.log(status)
          if (status === 200) {
            window.localStorage.setItem("userInfo", data.token)
            this.$router.push('/home')
          } else {
            alert("输入的账号或者密码不正确")
          }
        })
    }
  }
}