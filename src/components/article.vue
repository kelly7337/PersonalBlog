<template>
  <div id="content">
    <div class="article_wrap" v-for="item in articleList">
      <div class="article_title" @click="articleDetail( item._id )">{{ item.title }}</div>
      <div class="article_info">
        <span class="article_info_date">publish on：{{ item.date }}</span>
        <span class="article_info_label">tag：
        <span v-if="item.labels.length === 0">uncategorized</span>
        <el-tag v-else class="tag_margin" type="primary" v-for="tag in item.labels">{{ tag }}</el-tag>
        </span>
      </div>
      <div class="article_gist">{{ item.gist }}</div>
      <div @click="articleDetail( item._id )" class="article_button article_all">read more</div>
      <div class="article_underline"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data() {
      return {
        articleList: []
      }
    },
    mounted: function () {
      this.$http.get('/api/articleList').then(
        response => this.articleList = response.body.reverse(),
        response => console.log(response)
      )
    },
    methods: {
      articleDetail: function (id) {
        this.$router.push('/articleDetail/' + id)
      }
    }
  }
</script>

<style>

  .article_wrap {
    padding: 40px;
  }

  .article_title {
    display: inline-block;
    font-size: 34px;
    font-weight: 600;
    border-bottom: 1px solid white;
    cursor: pointer;
  }

  .article_title:hover {
    border-bottom: 1px solid white;
  }

  .article_info {
    font-size: 14px;
    padding-top: 8px;
  }

  .tag_margin {
    margin: 3px;
  }

  .article_gist {
    text-align: left;
    padding-top: 40px;
    padding-bottom: 40px;
    font-size: 16px;
  }

  .article_button {
    display: inline-block;
    padding: 3px 12px;
    border: 1px solid #222;
    font-size: 14px;
    cursor: pointer;
  }

  .article_all:hover {
    color: white;
    background: yellow;
    font-weight: 600;
  }

  .article_underline {
    height: 1px;
    width: 40px;
    margin: 80px auto 0;
  }
</style>