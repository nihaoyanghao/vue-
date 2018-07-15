import Axios from 'axios'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      obj: {
        username: '',
        password: '',
      },
      rules2: {
        username: [
          { required: true,message: '输入的内容不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true,message: '输入的内容不能为空', trigger: 'blur' },
          { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          const url = 'http://localhost:8888/api/private/v1/login'
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
                this.$message({
                  message: '恭喜你，成功登录',
                  type: 'success'
                });
               setTimeout(() => {
                window.localStorage.setItem("userInfo", data.token)
                this.$router.push('/home')
               }, 3000)
              } else {
                this.$message.error('错了哦，请重新输入');
              }
            })
        } else {
          this.$message({
            message: '对不起，您输入的格式不正确',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
