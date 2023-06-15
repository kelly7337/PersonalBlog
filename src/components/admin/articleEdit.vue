<template>
  <div>
    <div class="edit_wrap">
      <div class="return_button">
        <el-button icon="arrow-left" size="small" @click="goBack">return</el-button>
      </div>
      <div class="edit_head">title</div>
      <el-input v-model="title" placeholder="please input title"></el-input>
      <div class="tag_wrap">
        <span>tag: </span>
        <el-tag
            class="tag_margin"
            :key="tag"
            v-for="tag in labels"
            :closable="true"
            :close-trasition="true"
            @close="handleClose(tag)"
            type="primary"
        >{{ tag }}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
      <div class="edit_head">short description</div>
      <el-input
          type="textarea"
          :rows="5"
          placeholder="please input discription"
          v-model="gist">
      </el-input>
      <div class="edit_head">content</div>
      <el-input
          type="textarea"
          :rows="5"
          placeholder="please input content"
          v-model="content">
      </el-input>
      <div class="save_button">
        <el-button @click="saveArticle">save</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import marked from 'marked'
  import hightlight from 'highlight.js'
  import '../../assets/atom-one-light.css'
  marked.setOptions({
    hightlight: function (code) {
      return hightlight.hightlightAuto(code).value
    }
  })
  export default {
    name: 'articleEdit',
    data() {
      return {
        title: '',
        date: '',
        content: '',
        gist: '',
        labels: [],
        inputVisible: false,
        inputValue: '',
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        this.$http.get('/api/articleDetail/' + this.$route.params.id).then(
          response => {
            let article = response.body
            this.title = article.title
            this.date = article.date
            this.content = article.content
            this.gist = article.gist
            this.labels = article.labels
          },
          response => console.log(response)
        )
      }
    },
    methods: {
      compiledMarkdown: function () {
        return marked(this.content, {sanitize: true})
      },
      update: _.debounce(function (e) {
        this.content = e.target.value
      }, 300),
      getDate: function () {
        let mydate, y, m, d, hh, mm, ss;
        mydate = new Date()
        y = mydate.getFullYear()
        m = mydate.getMonth()
        d = mydate.getDate()
        hh = mydate.getHours()
        mm = mydate.getMinutes()
        ss = mydate.getSeconds()
        if (m < 10) m = '0' + m
        if (d < 10) d = '0' + d
        if (hh < 10) hh = '0' + hh
        if (mm < 10) mm = '0' + mm
        if (ss < 10) ss = '0' + ss
        this.date = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      },
      saveArticle: function () {
        let self = this
        if (this.title.length === 0) {
          this.$notify({
            title: 'remind',
            message: 'please input title',
            type: 'warning'
          })
          return
        }
        if (this.content.length === 0) {
          this.$notify({
            title: 'remind',
            message: 'please input content',
            type: 'warning'
          })
          return
        }
        if (this.gist.length === 0) {
          this.$notify({
            title: 'remind',
            message: 'please input discription',
            type: 'warning'
          })
          return
        }
        if (this.$route.params.id) {
          let obj = {
            _id: this.$route.params.id,
            title: this.title,
            date: this.date,
            content: this.content,
            gist: this.gist,
            labels: this.labels
          }
          this.$http.post('/api/admin/updateArticle', {
            articleInformation: obj
          }).then(
            response => {
              self.$message({
                message: 'update article success',
                type: 'success'
              })
              self.$router.push('/articleDetail/' + self.$route.params.id)
            },
            response => console.log(response)
          )
        } else {
          this.getDate()
          let obj = {
            title: this.title,
            date: this.date,
            content: this.content,
            gist: this.gist,
            labels: this.labels
          }
          this.$http.post('/api/admin/saveArticle', {
            articleInformation: obj
          }).then(
            response => {
              self.$message({
                message: 'publish article success',
                type: 'success'
              })
              self.refreshArticleList()
            },
            response => console.log(response)
          )
        }
      },
      refreshArticleList: function () {
        this.$router.push('/admin/articleList')
      },
      goBack: function () {
        this.$router.go(-1)
      },
      handleClose: function (tag) {
        this.labels.splice(this.labels.indexOf(tag), 1)
      },
      showInput: function () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm: function () {
        let inputValue = this.inputValue
        if (inputValue) this.labels.push(inputValue)
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>

<style>
  .edit_wrap {
    padding: 40px;
    font-size: 16px;
  }

  .return_button {
    text-align: left;
    margin-bottom: 40px;
  }

  .tag_wrap {
    text-align: left;
    padding: 20px 0;
  }

  .tag_wrap .input-new-tag {
    width: 80px;
    height: 28px;
  }

  .edit_wrap textarea {
    outline: none;
    font-size: 16px;
  }

  .edit_head {
    margin: 20px 0;
    text-align: left;
  }

  .markdown {
    text-align: left;
    border: 1px solid #bfcbd9;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    width: 100%;
    height: 800px;
    vertical-align: top;
    background: #f5f7f9;
    overflow: hidden;
  }

  .markdown textarea {
    border: none;
    resize: none;  
  }

  .markdown_input {
    float: left;
    display: inline-block;
    width: 49%;
    height: 98%;
    background-color: white;
    padding-left: 1%;
    padding-top: 1%;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .markdown_compiled {
    overflow: auto;
    float: right;
    display: inline-block;
    width: 49%;
    height: 100%;
    padding: 5px 0 5px 1%;
  }

  .save_button {
    padding: 40px 0;
  }
</style>