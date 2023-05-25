<template>
  <div id="home" class="main-widget">
    <el-row class="report1">
<!--      <el-col :span="4">-->
<!--        <el-date-picker-->
<!--            v-model="conditions.report1MonthVersion"-->
<!--            type="month"-->
<!--            style="width: calc(100% - 15px)"-->
<!--            :clearable="false"-->
<!--            format="yyyy/MM"-->
<!--            value-format="yyyy/MM/dd"-->
<!--        ></el-date-picker>-->
<!--      </el-col>-->
      <el-col :span="6">
        <el-input placeholder="Last Month Residue" v-model="conditions.report1LastMonthResidue" type="number"
                  style="width: calc(100% - 15px); margin-right: 10px">
          <template v-slot:prepend>Last Month Residue</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="Payment Collection" v-model="conditions.report1PaymentCollection1" type="number"
                  style="width: calc(100% - 15px); margin-right: 10px">
          <template v-slot:prepend>Payment Collection 1</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="Payment Collection" v-model="conditions.report1PaymentCollection3" type="number"
                  style="width: calc(100% - 15px); margin-right: 10px">
          <template v-slot:prepend>Payment Collection 3</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="Staff Salary" v-model="conditions.report1StaffSalary" type="number"
                  style="width: calc(100% - 15px); margin-right: 10px">
          <template v-slot:prepend>Staff Salary</template>
        </el-input>
      </el-col>
<!--      <el-col :span="1">-->
<!--        <el-button type="primary" class="search" icon="el-icon-search" @click="calReport1"></el-button>-->
<!--      </el-col>-->
    </el-row>
    <el-row class="report2" style="margin-bottom:  10px">
      <el-col :span="12" style="padding-right: 10px">
        <div style="width: 100%; border: 1px solid #e4e7ed;" :style="{height: pageHeight * 0.5 + 'px'}">
          <div style="height: calc(100% - 45px); margin-top: 10px; overflow-y: auto">
            <el-form :model="report2DynamicValidateForm" style="align-items: start;" ref="report2DynamicValidateForm">
              <el-form-item
                  v-for="(domain, index) in report2DynamicValidateForm.domains"
                  style="margin-bottom: 10px"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'">
                <el-select v-model="domain.type" style="border: none; !important;">
                  <el-option label="RAPID_SEA" value="RAPID_SEA"></el-option>
                  <el-option label="SLOW_SEA" value="SLOW_SEA"></el-option>
                  <el-option label="DRAGON_BOAT" value="DRAGON_BOAT"></el-option>
                </el-select>
                <el-input :style="{width: pageWidth * 0.1 + 'px'}"
                          style="border: none; !important; margin-left: 10px !important;"
                          v-model="domain.name" placeholder="item"></el-input>
                <el-input :style="{width: pageWidth * 0.1 + 'px'}" style="border: none; margin-left: 10px !important;"
                          v-model="domain.value" placeholder="value"></el-input>
                <el-button style="margin-left: 10px !important;" @click="report2AddDomain"> +</el-button>
                <el-button style="margin-left: 10px !important;" @click.prevent="report2RemoveDomain(domain)"> -
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="height: 10px; float: right; margin-right: 10px">
            <el-button type="primary" @click="report2SubmitForm('report2DynamicValidateForm')">计算</el-button>
            <el-button @click="report2ResetForm('report2DynamicValidateForm')">重置</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12" style="padding-right: 10px">
        <div style="width: 100%; border: 1px solid #e4e7ed;" :style="{height: pageHeight * 0.5 + 'px'}">
          <div style="height: calc(100% - 45px); margin-top: 10px; overflow-y: auto">
            <el-form :model="report3DynamicValidateForm" style="align-items: start;" ref="report3DynamicValidateForm">
              <el-form-item
                  v-for="(domain, index) in report3DynamicValidateForm.domains"
                  style="margin-bottom: 10px"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'">
                <el-select v-model="domain.type" style="border: none; !important;">
                  <el-option label="RAPID_SEA" value="RAPID_SEA"></el-option>
                  <el-option label="SLOW_SEA" value="SLOW_SEA"></el-option>
                  <el-option label="DRAGON_BOAT" value="DRAGON_BOAT"></el-option>
                </el-select>
                <el-input :style="{width: pageWidth * 0.1 + 'px'}"
                          style="border: none; !important; margin-left: 10px !important;"
                          v-model="domain.name" placeholder="item"></el-input>
                <el-input :style="{width: pageWidth * 0.1 + 'px'}" style="border: none; margin-left: 10px !important;"
                          v-model="domain.value" placeholder="value"></el-input>
                <el-button style="margin-left: 10px !important;" @click="report3AddDomain"> +</el-button>
                <el-button style="margin-left: 10px !important;" @click.prevent="report3RemoveDomain(domain)"> -
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div style="height: 10px; float: right; margin-right: 10px">
            <el-button type="primary" @click="report3SubmitForm('report3DynamicValidateForm')">计算</el-button>
            <el-button @click="report3ResetForm('report3DynamicValidateForm')">重置</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="report3" style="width: 100%; border: 1px solid #e4e7ed; height: 100px">
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" :value="conditions.report1Result"
                          title="Report1Result">
              <template v-slot:suffix>
                <i class="el-icon-star-on" style="color:red"></i>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="conditions.report2Result" title="Report2Result">
              <template v-slot:suffix>
                <i class="el-icon-star-on" style="color:red"></i>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="conditions.report3Result" title="Report3Result">
              <template v-slot:suffix>
                <i class="el-icon-star-on" style="color:red"></i>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic group-separator="," :precision="2" decimal-separator="." :value="_totalResult" :title="title">
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
    this.conditions.report1MonthVersion = $dateFormatter(now, 'yyyy/MM/dd')
    this.pageWidth = document.documentElement.clientWidth
    this.pageHeight = document.documentElement.clientHeight
  },
  data() {
    return {
      like: true,
      value1: 4154.564,
      title: 'Cal Result',
      pageHeight: '',
      pageWidth: '',
      conditions: {
        report1Result: 0,
        report2Result: 0,
        report3Result: 0,
        report1MonthVersion: '',
        report1StaffSalary: null,
        report1PaymentCollection1: null,
        report1PaymentCollection3: null,
        report1LastMonthResidue: null,
        report2Type: '',
        report3Type: '',
        calResult: 0
      },
      report2DynamicValidateForm: {
        domains: [{
          type: '',
          name: '',
          value: ''
        }]
      },
      report3DynamicValidateForm: {
        domains: [{
          type: '',
          name: '',
          value: ''
        }]
      }
    }
  },
  computed: {
    _totalResult() {
      return this.conditions.report1Result - this.conditions.report2Result - this.conditions.report3Result
    }
  },
  watch: {
    conditions: {
      deep: true,
      handler: function () {
        console.log(1)
        this.calReport1()
      }
    },
    report2DynamicValidateForm: {
      deep: true,
      handler: function () {
        console.log(1)
        this.calReport2()
      }
    },
    report3DynamicValidateForm: {
      deep: true,
      handler: function () {
        console.log(1)
        this.calReport3()
      }
    }
  },
  methods: {
    calReport1() {
      this.conditions.report1Result = parseFloat(this.conditions.report1LastMonthResidue === null || this.conditions.report1LastMonthResidue === '' ? 0 : this.conditions.report1LastMonthResidue)
          + parseFloat(this.conditions.report1PaymentCollection1 === null || this.conditions.report1PaymentCollection1 === '' ? 0 : this.conditions.report1PaymentCollection1)
          + parseFloat(this.conditions.report1PaymentCollection3 === null || this.conditions.report1PaymentCollection3 === '' ? 0 : this.conditions.report1PaymentCollection3)
          - parseFloat(this.conditions.report1StaffSalary === null || this.conditions.report1StaffSalary === '' ? 0 : this.conditions.report1StaffSalary)
    },
    calReport2() {
      this.conditions.report2Result = 0
      for (let i = 0; i < this.report2DynamicValidateForm.domains.length; i++) {
        if (this.report2DynamicValidateForm.domains[i].value) {
          this.conditions.report2Result += parseFloat(this.report2DynamicValidateForm.domains[i].value)
        }
      }
    },
    calReport3() {
      this.conditions.report3Result = 0
      for (let i = 0; i < this.report3DynamicValidateForm.domains.length; i++) {
        if (this.report3DynamicValidateForm.domains[i].value) {
          this.conditions.report3Result += parseFloat(this.report3DynamicValidateForm.domains[i].value)
        }
      }
    },
    // calculateCashFlow() {
    //   this.$axios.get('/calculate_cash_flow/report1').then(res => {
    //     this.conditions.calResult = res.data
    //   })
    // },
    report2SubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.calReport2();
          console.log(this.report2DynamicValidateForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    report3SubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.calReport3();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    report2ResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    report3ResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    report2RemoveDomain(item) {
      var index = this.report2DynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.report2DynamicValidateForm.domains.splice(index, 1)
      }
    },
    report3RemoveDomain(item) {
      var index = this.report3DynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.report3DynamicValidateForm.domains.splice(index, 1)
      }
    },
    report2AddDomain() {
      this.report2DynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    },
    report3AddDomain() {
      this.report3DynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    }
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
