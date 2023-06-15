<template>
  <div id="content">
    <div class="article_wrap" v-for="item in articleList">
      <div @click="articleEdit(item._id)" class="article_title">{{ item.title }}</div>
      <div class="article_info">
        <span class="article_info_date">time：{{ item.date }}</span>
        <span class="article_info_label">tag：
        <span v-if="item.labels.length === 0">uncategorized</span>
        <el-tag v-else class="tag_margin" type="primary" v-for="tag in item.labels">{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_gist">{{ item.gist }}</div>
      <div>
        <div @click="articleEdit(item._id)" class="article_button edit">change</div>
        <div @click="deleteArticle(item._id)" class="article_button delete">delete</div>
      </div>
      <div class="article_underline"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data() {
      return {
        articleList: [],
      }
    },
    mounted: function () {
      this.$http.get('/api/articleList').then(
        response => this.articleList = response.body.reverse(),
        response => console.log(response)
      )
    },
    methods: {
      articleEdit: function (id) {
        this.$router.push('/admin/articleEdit/' + id)
      },
      deleteArticle: function (id) {
        let self = this
        this.$confirm('This will delete the article forever, continue?', 'hint', {
          confirmButtonText: 'yes',
          cancelButtonText: 'no',
          type: 'warning'
        }).then(() => {
          self.$http.post('/api/admin/deleteArticle', {
            _id: id
          }).then(
            response => {
              self.$message({
                type: 'success',
                message: 'delete success!'
              });
              self.fetchData()
            },
            response => {
              console.log(response)
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'cancle delete'
          });
        });
      },
      fetchData: function () {
        this.$http.get('/api/articleList').then(
          response => this.articleList = response.body.reverse(),
          response => console.log(response)
        )
      }
    }
  }
</script>

<style>
  .edit:hover {
    background: yellow;
    color: white;
    font-weight: 600;
  }

  .delete:hover {
    background: yellow;
    color: white;
    font-weight: 600;
  }
</style>