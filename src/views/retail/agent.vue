<template>
  <el-dialog width="30%" :visible.sync="showAgent" :close-on-click-modal="false" :show-close="false" :modal="isModal" :title="$t('common.addProxy')">
    <div>
      <el-form :model="agentForm" :rules="agentRules" ref="agentForm" size="middle">
        <!-- <el-form-item label-width="120px" prop="name" label="代理名称：">
          <el-input v-model="agentForm.name" size="medium" clearable></el-input>
        </el-form-item> -->
        <el-form-item label-width="120px" :label="$t('common.pattern') + ':'">
          <el-radio v-model="agentForm.mode" :label="true">{{$t('common.changePrice')}}</el-radio>
          <el-radio v-model="agentForm.mode" :label="false">{{$t('common.percentDiscount')}}</el-radio>
        </el-form-item>
        <el-form-item label-width="120px" v-if="agentForm.mode" prop="raisePrice" :label="$t('common.changePrice') + ':'">
          <el-input v-model="agentForm.raisePrice" size="medium" clearable type="Number" min="0">
            <template slot="append">€</template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="120px" v-else prop="raisePercent" :label="$t('common.percentDiscount') + ':'">
          <el-input v-model="agentForm.raisePercent" size="medium" clearable type="Number" min="0">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="120px" prop="minOrderAmount" :label="$t('common.minOrdersMoney') + ':'">
          <el-input v-model="agentForm.minOrderAmount" size="medium" clearable type="Number" min="0"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" prop="postageAmount" :label="$t('common.notMoneyPostage') + ':'" class="special">
          <el-input v-model="agentForm.postageAmount" size="medium" clearable type="Number" min="0"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top:10px; text-align: right;">
        <el-button size="mini" @click="cancleAgent">{{ $t('common.qx') }}</el-button>
        <el-button type="primary" size="mini" @click="agentSave();">{{ $t('common.queding') }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import Vue from "vue";
import {
  agentAdd,
  agentUpdate
} from "@/api/api";

export default {
  props: {
    isModal: {
      default: true
    },
    showAgent: {
      default: false
    },
    opType: {
      default: ''
    },
    agentInfo: {
      default: ''
    }
  },
  data() {
    return {
      agentForm: {
        merchantId: '',
        name: '',
        mode: true,
        raisePrice: '',
        raisePercent: '',
        minOrderAmount: '',
        postageAmount:''
      },
      agentRules: {
        name: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ],
        minOrderAmount: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ],
        postageAmount: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ],
        raisePrice: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ],
        raisePercent: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancleAgent() {
      this.$emit('cancleAgent');
    },
    agentSave() {
      this.$refs.agentForm.validate((valid)=>{
        if (valid) {
          let params = {
            merchantId: this.agentForm.merchantId,
            name: this.agentForm.name,
            minOrderAmount: this.agentForm.minOrderAmount,
            postageAmount: this.agentForm.postageAmount
          };
          if (this.agentForm.mode) {
            params['raisePrice'] = this.agentForm.raisePrice;
          } else {
            if (!(this.agentForm.raisePercent > 0 && this.agentForm.raisePercent < 500)) {
              this.$message({
                message: this.$('common.percentScopeHint'),
                type: 'error'
              });
              return
            }
            params['raisePercent'] = this.agentForm.raisePercent;
          }
          let requstObj = null;
          if (this.opType == 'add') {
            requstObj = agentAdd;
          } else if (this.opType == 'revise') {
            requstObj = agentAdd;
          }
          requstObj(params).then((res) => {
            if (res.code == 20000) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.$emit('successAgent');
              this.agentForm = {
                merchantId: '',
                name: '',
                mode: true,
                raisePrice: '',
                raisePercent: '',
                minOrderAmount: '',
                postageAmount:''
              };
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(() => {
          
          });
        }
      });
    },
  },
  computed: {
  
  },
  watch: {
    showAgent(){
      if (this.agentInfo.agent) {
        this.agentForm = {
          name: this.agentInfo.agent.name,
          mode: this.agentInfo.agent.raisePrice? true : false,
          raisePrice: this.agentInfo.agent.raisePrice,
          raisePercent: this.agentInfo.agent.raisePercent,
          minOrderAmount: this.agentInfo.agent.minOrderAmount,
          postageAmount:this.agentInfo.agent.postageAmount
        };
      } else {
        this.agentForm = {
          merchantId: '',
          name: '',
          mode: true,
          raisePrice: '',
          raisePercent: '',
          minOrderAmount: '',
          postageAmount:''
        };
      }
      this.agentForm.merchantId = this.agentInfo.id;
    }
  },
  created() {
  
  },
}
</script>

<style lang="scss" scoped>

</style>
