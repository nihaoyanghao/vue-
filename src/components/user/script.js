import axios from "axios"
export default {
  data() {
    return {
      dataList: [],
      pagenum: 1,
      pagesize: 3,
      query: '',
      total: 0,
      aaa: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 添加用户的信息
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      dialog: false,
      dialog: false,
      // 编辑用户的信息
      form2: {
        username: '',
        email: '',
        mobile: ''
      },
    }
  },
  methods: {
    getdata() {
      this.$axios
        .get('/users', {
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        .then(obj => {
          // console.log(obj)
          const { data, meta } = obj.data
          // console.log(data)
          this.total = data.total
          // console.log(meta)
          this.dataList = data.users
        })
    },// 页容量
    handleSizeChange(pagesize) {
      this.pagesize = pagesize
      this.getdata()
    },// 当前页码
    handleCurrentChange(curentpage) {
      this.pagenum = curentpage
      this.getdata()
    },// 添加
    add() {
      this.$axios.post('/users',
        this.form).then(res => {
          this.getdata()
          this.dialogFormVisible = false;
        })
    },// 删除
    handleDelete(index, all) {
      // console.log(a) // 得到的下标
      // console.log(b)  // 每一列的行里面的所有信息
      const id = all.id
      // console.log(id)
      this.$axios.delete('/users/' + id)
        .then(obj => {
          console.log(obj)
          if (obj.data.meta.status === 200) {
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
            });
          }
          this.getdata() // 刷新页面
        })
    },// 修改时 先渲染页面
    handleEdit(data) {
      console.log(data) // 当前行的信息
      this.dialog = true // 点击编辑弹出对话框
      this.form2.username = data.username
      this.form2.email = data.email
      this.form2.mobile = data.mobile
    },// 真正的修改页面
    edit() {
      this.dialog = false
    }
  },
  created() {
    this.getdata()
  }
}