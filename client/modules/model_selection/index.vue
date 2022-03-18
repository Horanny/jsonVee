<template >
  <!-- 这里写Html -->
  <div class="modelSelectWrapper">
    <h1 class="subTitle">
      Model Selection &nbsp;
      <el-radio-group v-model="radio">
        <el-radio :label="0">total</el-radio>
        <el-radio :label="1">auc</el-radio>
        <el-radio :label="2">ap</el-radio>
        <el-radio :label="3">hr</el-radio>
        <el-radio :label="4">recall</el-radio>
      </el-radio-group>
    &nbsp;
      <el-button size="mini" icon="el-icon-check" circle @click="find_model()"> </el-button>
    </h1>

    <div
      style="
        margin: 0px 5px 18px 18px;
        width: 601px;
        height: 954px;
        display: flex;
      "
    >
        <el-row :gutter="0" >
          <el-col :span="1">
            <div id="check"></div>
          </el-col>
          <el-col :span="23">
          <svg id="modelSelectSvg" style="width: 603; height: 954">
          </svg>
          </el-col>
        </el-row>
    </div>

  </div>
</template>
<script src="./script.js"></script>

<style type="text/css">
.subTitle {
  margin: 10px;
  font: 24px "HindSemiBold";
  color: #333533;
}
</style>
