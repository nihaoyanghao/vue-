export default {
  data() {
    return {

    }
  },
  methods: {
    back() {
      this.$confirm('确定要退出吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!',
        });
        setTimeout(() => {
          window.localStorage.removeItem('userInfo')
          this.$router.push('/login')
        },3000)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
               