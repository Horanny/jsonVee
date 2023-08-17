<<<<<<< HEAD
<template>
  <!-- 这里写Html -->
  <div class="wrapper" >
    <!-- title -->

    <el-row >
      <!-- the left side -->
      <el-col :span="6">
        <el-row>
          <div class="header" style="height: 60px; margin: 20px 0px 0px 18px">
            MetapathLens
             </div>
        </el-row>

        <div class="grid-content bg" style="width: 620px; height: 290px; margin: 18px 0px 0px 18px;">
          <h1 class="subTitle">Data Overview</h1>
            <dataOverviewCtn></dataOverviewCtn>
        </div>

        <div class="grid-content bg" style="width: 620px; height: 1010px; margin: 16px 0px 18px 18px;">
            <modelSelectionCtn></modelSelectionCtn>

        </div>
      </el-col>

      <!-- the right side -->
      <el-col :span="18">
        <div class="grid-content bg" style="width: 1880px; height: 460px; margin: 18px 18px 0px 16px;">
          <h1 class="subTitle">
            Node View
          </h1>
          <nodeViewCtn></nodeViewCtn>
          </div>
          <div class="grid-content bg" style="width: 1880px; height: 920px; margin: 16px 18px 18px 16px;">
          <h1 class="subTitle">Metapath View</h1>
            <metapathCtn></metapathCtn>
          </div>
          
      </el-col>

    </el-row>
  </div>
</template>
<script src="./script.js"></script>
<style type="text/css">

/* 画布大小 1920*1080 + 标题大小 1920 * 35 */
.wrapper {
  width: 2560px;
  height: 1440px;
  position: relative;
  margin: 0 !important;

}
/* 标题FMLens */
.header{
  margin: 10px;
  height: 35px;
  /* color: #333533; */
  /* font-size: 32px; */
  font: 50px "HindBold";
}
/* 小标题 */
.subTitle{
  margin: 10px;
  font: 24px "HindSemiBold";
  color: #333533;

}
/* text, element-table */
text, .el-table{
  font-family: "HindBold";
}
/* 背景 */
.bg {
  /* height: 1025px; */
  background: #ffffff;
}
.grid-content{
  border: 2px solid #dcd9d9;
  border-radius: 5px;
  min-height: 36px;
  height: inherit;
}
.el-scrollbar__wrap
{
  overflow-x: hidden;
}

@font-face {
  font-family: "HindBold";
  src: url("../../assets/font/hind-bold.ttf");
}

@font-face {
  font-family: "HindSemiBold";
  src: url("../../assets/font/hind-semibold.ttf");
}

@font-face {
  font-family: "HindMedium";
  src: url("../../assets/font/hind-medium.ttf");
}

=======
<template>
  <div class="wrapper">
    <div>
      <button @click="toDetail">
        跳转到详情页
      </button>
    </div>
    <h1>欢迎支持:</h1>
    <img
      src="../../assets/image/afb.jpg"
      alt="empty image"
    >
    <img
      src="../../assets/image/weixin.png"
      alt="empty image"
    >
    <button @click="addItem">
      添加数据
    </button>
    <div class="container">
      <virtual-list
        ref="virtualList"
        class="list-dynamic scroll-touch"
        :data-key="'id'"
        :data-sources="items"
        :estimate-size="80"
        :item-class="'list-item-dynamic'"
      >
        <template #="{source}">
          <div class="item-inner">
            <div class="head">
              <span># {{ source.index }}</span>
              <span>{{ source.name }}</span>
            </div>
            <div class="desc">
              {{ source.desc }}
            </div>
          </div>
        </template>
      </virtual-list>
    </div>
  </div>
</template>
<script src="./script.js"></script>

<style lang="less">
  .container {
    border: 1px solid #eee;
    padding: 20px;
    margin-top: 20px;
}
.list-dynamic {
  width: 100%;
  height: 500px;
  overflow-y: auto;

  .list-item-dynamic {
    display: flex;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid;
    border-color: lightgray;
    background: rgba(83, 132, 255, 0.06) none repeat scroll 0% 0%;
    border-bottom: 2px solid rgb(255, 255, 255);
  }
}
.item-inner {
  .head {
    font-weight: 500;
  }
  span:first-child {
    margin-right: 1em;
  }
  .desc {
    padding-top: .5em;
    text-align: justify;
  }
}
.list-horizontal {
  width: 100%;
  overflow-x: auto;
  display: flex; 

  .wrapper {
    display: flex;
    flex-direction: row;
  }

  .list-item-horizontal {
    border-right: 2px solid rgb(255, 255, 255);
    background: rgba(83, 132, 255, 0.06) none repeat scroll 0% 0%;
  }
}
.item-inner-horizontal {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2em 0;
  .index {
    width: 100%;
    text-align: center;
  }
  .size {
    text-align: right;
    color: darkgray;
    font-size: 16px;
  }
}
>>>>>>> af29a96d00ddc1e80042e66c55a820564a055747
</style>