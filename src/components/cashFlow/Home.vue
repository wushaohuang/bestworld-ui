<template>
  <div id="home" class="main-widget">
    <el-row class="report1">
      <el-col :span="4">
        <el-date-picker
            v-model="conditions.monthVersion"
            type="month"
            style="width: calc(100% - 15px)"
            :clearable="false"
            format="yyyy/MM"
            value-format="yyyy/MM/dd"
        ></el-date-picker>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="Last Month Residue" v-model="lastMonthResidue"
                  style="width: calc(100% - 15px); margin-right: 10px">
          <template v-slot:prepend>Last Month Residue</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="Payment Collection" v-model="paymentCollection"
                  style="width: calc(100% - 15px); margin-right: 10px">
          <template v-slot:prepend>Payment Collection</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="Staff Salary" v-model="staffSalary" style="width: calc(100% - 15px); margin-right: 10px">
          <template v-slot:prepend>Staff Salary</template>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" class="search" icon="el-icon-search"></el-button>
      </el-col>
    </el-row>
    <el-row class="report2" style="margin-bottom:  10px">
      <el-col :span="12" style="padding-right: 10px">
        <div style="width: 100%; border: 1px solid #e4e7ed;" :style="{height: pageHeight * 0.5 + 'px'}">
          <div style="height: calc(100% - 45px); margin-top: 10px">
            <el-form :model="report2DynamicValidateForm" style="align-items: start;" ref="report2DynamicValidateForm">
              <el-form-item
                  v-for="(domain, index) in report2DynamicValidateForm.domains"
                  style="margin-bottom: 10px"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'">
                <el-input :style="{width: pageWidth * 0.1 + 'px'}" style="border: none; !important;"
                          v-model="domain.name" placeholder="item"></el-input>
                <el-input :style="{width: pageWidth * 0.1 + 'px'}" style="border: none; margin-left: 10px !important;"
                          v-model="domain.value" placeholder="value"></el-input>
                <el-button style="margin-left: 10px !important;" @click="addDomain"> +</el-button>
                <el-button style="margin-left: 10px !important;" @click.prevent="removeDomain(domain)"> -</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="height: 10px; float: right; margin-right: 10px">
            <el-button type="primary" @click="submitForm('report2DynamicValidateForm')">提交</el-button>
            <el-button @click="resetForm('report2DynamicValidateForm')">重置</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12" style="padding-right: 10px">
        <div style="width: 100%; border: 1px solid #e4e7ed;" :style="{height: pageHeight * 0.5 + 'px'}">
          <div style="height: calc(100% - 45px); margin-top: 10px">
            <el-form :model="report1DynamicValidateForm" style="align-items: start;" ref="report1DynamicValidateForm">
              <el-form-item
                  v-for="(domain, index) in report1DynamicValidateForm.domains"
                  style="margin-bottom: 10px"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'">
                <el-select v-model="conditions.report1Type" style="margin-left: 10px !important;">
                  <el-option label="RAPID_SEA" value="RAPID_SEA"></el-option>
                  <el-option label="SLOW_SEA" value="SLOW_SEA"></el-option>
                  <el-option label="DRAGON_BOAT" value="DRAGON_BOAT"></el-option>
                </el-select>
                <el-input :style="{width: pageWidth * 0.1 + 'px'}" style="border: none; !important;"
                          v-model="domain.name" placeholder="item"></el-input>
                <el-input :style="{width: pageWidth * 0.1 + 'px'}" style="border: none; margin-left: 10px !important;"
                          v-model="domain.value" placeholder="value"></el-input>
                <el-button style="margin-left: 10px !important;" @click="addDomain"> +</el-button>
                <el-button style="margin-left: 10px !important;" @click.prevent="removeDomain(domain)"> -</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="height: 10px; float: right; margin-right: 10px">
            <el-button type="primary" @click="submitForm('report1DynamicValidateForm')">提交</el-button>
            <el-button @click="resetForm('report1DynamicValidateForm')">重置</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="report3" style="width: 100%; border: 1px solid #e4e7ed; height: 100px">
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" :value="value2" :title="title"></el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="like ? 521 : 520" title="Feedback">
              <template v-slot:suffix>
                <span @click="like = !like" class="like">
                  <i class="el-icon-star-on" style="color:red" v-show="!!like"></i>
                  <i class="el-icon-star-off" v-show="!like"></i>
                </span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="like ? 521 : 520" title="Feedback">
              <template v-slot:suffix>
                <span @click="like = !like" class="like">
                  <i class="el-icon-star-on" style="color:red" v-show="!!like"></i>
                  <i class="el-icon-star-off" v-show="!like"></i>
                </span>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" decimal-separator="." :value="value1" :title="title">
              <template v-slot:prefix>
                <i class="el-icon-s-flag" style="color: red"></i>
              </template>
              <template v-slot:suffix>
                <i class="el-icon-s-flag" style="color: blue"></i>
              </template>
            </el-statistic>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'HomeVue',
  props: {
    msg: String
  },
  mounted() {
    function $dateFormatter(date, fmt) {
      const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt
    }

    const now = new Date()
    this.conditions.monthVersion = $dateFormatter(now, 'yyyy/MM/dd')
    this.pageWidth = document.documentElement.clientWidth
    this.pageHeight = document.documentElement.clientHeight
  },
  data() {
    return {
      like: true,
      value1: 4154.564,
      value2: 2222,
      title: 'Cal Result',
      staffSalary: 0,
      paymentCollection: 0,
      lastMonthResidue: 0,
      pageHeight: '',
      pageWidth: '',
      conditions: {
        report1Type: '',
        monthVersion: '',
        calResult: 0
      },
      report1DynamicValidateForm: {
        domains: [{
          name: '',
          value: ''
        }],
        email: ''
      },
      report2DynamicValidateForm: {
        domains: [{
          name: '',
          value: ''
        }],
        email: ''
      }
    }
  },
  methods: {
    calculateCashFlow() {
      this.$axios.get('/calculate_cash_flow/report1').then(res => {
        this.conditions.calResult = res.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          console.log(this.report1DynamicValidateForm)
          console.log(this.report2DynamicValidateForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.report1DynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.report1DynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.report1DynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    }
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style lang="scss">
#home {

  .el-input__inner {
    height: 30px;
  }

  .el-input {
    font-size: 12px;
  }

  .el-input__icon {
    line-height: 30px;
  }

  .el-form-item__content {
    line-height: 30px;
  }

  .report1 {
    margin-bottom: 10px;
  }

  .el-button {
    padding: 6px 12px;
    font-size: 12px;
  }

  .search {
    padding: 8px 12px;
    font-size: 12px;
  }

  .report3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>
