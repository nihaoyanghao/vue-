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
          const res = obj.data
          // console.log(res)
          // 判断
          if (res.meta.status === 200) {
            window.localStorage.setItem("userInfo", res.data.token)
            this.$router.push('/home')
          }
        })
    }
  }
}