<template>
  <div id="sign_wrap">
    <h1>management</h1>
    <el-input v-model="name" placeholder="please input username"></el-input>
    <el-input v-model="password" placeholder="please input password" type="password"></el-input>
    <el-button @click="signup">register</el-button>
    <el-button @click="signin">login</el-button>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      return {
        name: '',
        password: '',
        hasName: false, 
      }
    },
    mounted: function () {

    },
    methods: {
      signup: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('username cannot be empty or less than 6 characters')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('password cannot be empty or less than 6 characters')
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (response.body.name === _this.name) {
              _this.$message.error('username is exist')
              _this.name = '';
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }

              _this.$http.post('/api/admin/signup', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: 'register success',
                    type: 'success'
                  })
                },
                response => console.log('register fail' + response)
              )
            }
          },
          response => console.log(response)
        )
      },
      signin: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('username cannot be empty or less than 6 characters')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('password cannot be empty or less than 6 characters')
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (_this.password !== response.body.password) {
              _this.$message.error('username or password wrong')
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }
              _this.$http.post('/api/admin/signin', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: 'login success',
                    type: 'success'
                  })
                  delete _this.password;
                  _this.$router.go(-1)
                },
                response => console.log('login fail'+response)
              )
            }
          },
          response => {
            _this.$message.error('username does not exist')
            return
          }
        )
      }
    }
  }
</script>

<style>
  #sign_wrap {
    width: 300px;
    margin: 200px auto;
  }

  #sign_wrap h1 {
    color: #383a42;
    padding: 10px;
  }

  #sign_wrap div {
    padding-bottom: 20px;
  }


</style>