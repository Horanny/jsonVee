<template >
  <!-- 这里写Html -->
  <div class="MetapathWrapper">
    <svg id="metapath_overviewSvg" style="width: 1880; height: 200"></svg>
    <div style="margin: 0px; width: 1880px; height: 660px; display: flex">
      <el-scrollbar style="height: 100%">
        <!-- <svg id="metapathSvg" style="width: 1880; height: 434"></svg> -->
        <svg id="metapathSvg" :style= "metapathStyle"></svg>

      </el-scrollbar>
    </div>
  </div>
</template>
<script src="./script.js"></script>

<style type="text/css">
.MetapathWrapper .el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
  /* overflow-y: hidden; */
}

</style>
