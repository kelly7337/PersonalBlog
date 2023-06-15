<template>
  <div id="left_menu">

    <div class="info">
      <div class="info_name">Ermu Lu</div>
      <img src="../assets/head.jpg" alt="head">
      <div class="archive">
        <ul>
          <router-link to="/article">
            <li>
              <span class="archive_count">{{ articleNumber }}</span>
              <span class="archive_name">blog</span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>

    <nav>
      <ul>
        <router-link to="/article">
          <li class="nav">
            <span>homepage</span>
          </li>
        </router-link>
        <router-link to="/admin/signin">
          <li class="nav">
            <span>login</span>
          </li>
        </router-link>
        <router-link to="/admin/articleList">
          <li class="nav">
            <span>manage</span>
          </li>
        </router-link>
        <router-link to="/admin/articleEdit">
          <li class="nav">
            <span>write article</span>
          </li>
        </router-link>
      </ul>
    </nav>
    
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data() {
      return {
        articleNumber: ''
      }
    },
    mounted: function () {
      this.$http.get('/api/articleList').then(
        response => this.articleNumber = response.body.length,
        response => console.log(response)
      )
    }
  }
</script>

<style>
  #left_menu {
    float: left;
    width: 240px;
    margin-right: 20px;
  }

  @media (max-width: 767px) {
    #left_menu {
      display: none;
    }
  }

  #left_menu a:hover {
  }

  .menu_name {
    background: rgb(38, 42, 48);
    color: white;
    padding: 10px 0;
  }

  nav {
    background: white;
    padding: 20px 0;
  }

  .nav {
    padding: 8px 20px;
    text-align: left;
  }

  .info {
    margin-top: 10px;
    padding: 20px;
    background: white;
  }

  .info_name {
    font-weight: 600;
    padding: 5px;
  }

  .info img {
    width: 120px;
    height: 120px;
  }

  .archive {
    padding-top: 20px;
  }

  .archive .archive_count {
    display: block;
    font-weight: 600;
    font-size: 16px;
  }

  .archive .archive_name {
    display: block;
    font-size: 14px;
  }

  .communication {
    padding-top: 20px;
  }

  .communication_item {
    display: inline-block;
    width: 40%;
    font-size: 14px;
    font-weight: 600;
    padding: 5px;
  }
</style>