<template>
  <el-dialog
    title="Dettagli"
    :visible.sync="visible"
    width="920px"
    class="invoice-detail"
    top="20px"
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="invoice-container" id="print">
      <el-tooltip class="item no-print" effect="dark" content="Close" placement="right">
        <el-button type="text" size="small" class="invoice-container-close" @click="modalClose">
          <i class="el-icon-circle-close"></i>
        </el-button>
      </el-tooltip>
      <el-tooltip class="item no-print" effect="dark" content="Print" placement="right">
        <el-button type="text" size="small" class="invoice-container-printer" v-print="'#print'">
          <i class="el-icon-printer"></i>
        </el-button>
      </el-tooltip>
      <div class="invoice-detail-accent"></div>
      <div class="invoice-detail-body">
        <div class="invoice-detail-title content-block">
          <div class="invoice-logo">
            <div class="logo">
              <img v-if="inv.logo" :src="inv.logo" alt />
              <img v-else alt />
            </div>
            <hr class="divider" />
          </div>
        </div>
        <div class="invoice-detail-header content-block">
          <el-row>
            <el-col :span="11" class="invoice-address">
              <h3>Mittente:</h3>
              <h4>
                <span v-if="inv.seller.name && inv.seller.name!==''">{{ inv.seller.name }}</span>
                <span v-else>{{inv.seller.firstName}} &nbsp; {{inv.seller.lastName}}</span>
              </h4>
              <div class="preview-block">
                <span>P.IVA: {{inv.seller.vatNumber}}</span>
              </div>
              <div class="preview-block">{{inv.seller.address}}</div>
              <div class="preview-block">
                {{inv.seller.city}}
                {{inv.seller.zipcode}}
                {{inv.seller.province}} &nbsp;
              </div>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11" class="invoice-address">
              <h3>Destinatario:</h3>
              <h4>
                <span v-if="inv.buyer.name && inv.buyer.name!==''">{{ inv.buyer.name }}</span>
                <span v-else>{{inv.buyer.firstName}} &nbsp; {{inv.buyer.lastName}}</span>
              </h4>
              <div class="preview-block">
                <span v-if="inv.buyer.vatNumber">P.IVA: {{inv.buyer.vatNumber}}</span>
                <span v-else-if="inv.buyer.taxCode">P.IVA: {{inv.buyer.taxCode}}</span>
              </div>
              <div class="preview-block">{{inv.buyer.address}}</div>
              <div class="preview-block">
                {{inv.buyer.city}} &nbsp;
                {{inv.buyer.zipcode}} &nbsp;
                {{inv.buyer.province}}
              </div>
            </el-col>
          </el-row>
        </div>

        <hr class="divider" />
        <div class="invoice-detail-header content-block">
          <el-row>
            <el-col :span="11" class="invoice-address">
              <div v-if="inv.vatDebit">
                <div>Esigibilità IVA:</div>
                <div>{{inv.vatDebit | ivaChange(this.dataList)}}</div>
              </div>

              <div v-if="inv.withholds && inv.withholds.length > 0" style="marginTop:10px">
                <div>Ritenuta:</div>
                <div>{{inv.withholds[0].type | ritenuta_type}}</div>
                <div>Aliquota ritenuta:{{inv.withholds[0].percent}}% su {{inv.withholds[0].baseAmount}} % dell'imponibile</div>
                <div>{{inv.withholds[0].payCausal | ritenuta_payCausal}}</div>
              </div>

              <div v-if="inv.stamp && inv.stamp.amount" style="marginTop:10px">
                <div>DATI BOLLO</div>
                <div>Importo:{{inv.stamp.amount}}</div>
              </div>

              <div
                v-if="inv.descriptions && inv.descriptions.length>0"
                style="marginTop:10px"
              >
                <div>CAUSALE DOCUMENTO</div>
                <div>Descrizione causale:{{inv.descriptions[0].content}}</div>
              </div>

              <div v-if="inv.enableArt73" style="marginTop:10px">
                <div>ART. 73 DPR 633/72</div>
                <div>Documento emesso secondo modalità e termini stabiliti con DM ai sensi dell'art. 73 DPR 633/72</div>
              </div>

              <div v-if=" inv.payments && inv.payments.length>0">
                <div style="marginTop:10px">Pagamento</div>
                <div
                  v-if="inv.payments && inv.payments[0].type"
                >Condizione di pagamento:{{inv.payments[0].type | payment_Type}}</div>
                <div
                  v-if="inv.payments && inv.payments[0].method"
                >Metodo di pagamento:{{inv.payments[0].method | payment_Channel}}</div>
                <div
                  v-if="inv.payments && inv.payments[0].expiryDays"
                >Giorni di scadenza:{{inv.payments[0].expiryDays}}</div>
                <div
                  v-if="inv.payments && inv.payments[0].bankName"
                >Banca:{{inv.payments[0].bankName}}</div>
                <div
                  v-if="inv.payments && inv.payments[0].iban"
                >IBAN:{{inv.payments[0].iban}}</div>
                <div v-if="inv.payments && inv.payments[0].bic">BIC:{{inv.payments[0].bic}}</div>
                <div
                  v-if="inv.payments && inv.payments[0].payee"
                >Beneficiario:{{inv.payments[0].payee}}</div>
              </div>

              <div v-if="inv.primary && inv.primary.number" style="marginTop:10px">
                <div>FATTURA PRINCIPALE</div>
                <div v-if="inv.primary.number">Numero fattura principale:{{inv.primary.number}}</div>
                <div
                  v-if="inv.primary.date"
                >Data fattura principale:{{inv.primary.date | time_data}}</div>
              </div>

              <div v-if="inv.processes && inv.processes.length>0" style="marginTop:10px">
                <div>DATI SAL</div>
                <div>Riferimento fase:{{inv.processes[0].phase}}</div>
              </div>

              <div v-if="inv.vehicle && inv.vehicle.date" style="marginTop:10px">
                <div>DatiVeicoli</div>
                <div v-if="inv.vehicle.total">Totale percorso:{{inv.vehicle.total}}</div>
                <div v-if="inv.vehicle.date">Immatricolazione:{{inv.vehicle.date | time_data}}</div>
              </div>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11" class="invoice-address">
              <div v-if="inv.pensions && inv.pensions.length>0">
                <div class="cassaFont">cassa</div>
                <div
                  v-for="(item,index) in inv.pensions"
                  :key="index+ item.type"
                  style="marginTop:10px"
                >
                  <div>
                    <div>{{item.type | cassa_type}}</div>
                    <div>
                      Aliquota cassa:
                      {{item.rate}}% su {{item.percent}}% {{item.withholding | withholdingValue}} {{item.vatRate}}
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div v-if="annexeShow" class="allFont" style="marginTop:10px">Allegati</div>
              <div v-for="(item,index) in inv.annexe" :key="index+item.fileName">
                <div>
                  <div v-if="item.fileName">{{item.fileName}}</div>
                  <div v-if="item.details">{{item.details}}</div>
                </div>
              </div>-->

              <div style="marginTop:10px" v-if="inv.relateds && inv.relateds.length>0">
                <div class="allFont">Documenti correlati:</div>
                <div v-for="(item,index) in inv.relateds" :key="index+ item.date">
                  <div v-if="item.type">Tipo:{{item.type}}</div>
                  <div v-if="item.number">Numero documento:{{item.number}}</div>
                  <div v-if="item.item">ID singola voce:{{item.item}}</div>
                  <div v-if="item.contractCode">Codice commessa/ Convenzione:{{item.contractCode}}</div>
                  <div v-if="item.date">Data documento:{{item.date | time_data}}</div>
                  <div v-if="item.cupCode">Codice CUP:{{item.cupCode}}</div>
                  <div v-if="item.cigCode">Codice CIG:{{item.cigCode}}</div>
                </div>

                <!-- <div
                  v-for="(item,index) in inv.datiddtList"
                  :key="index+item.dataDDT"
                  style="marginTop:20px"
                >
                  <div>Tipo:Dati DDT</div>
                  <div v-if="item.numeroNo">Numero DDT:{{item.numeroNo}}</div>
                  <div v-if="item.dataDDT">Data DT:{{item.dataDDT | time_data}}</div>
                </div>-->
              </div>

              <div
                v-if="inv.discountSurcharges &&  inv.discountSurcharges.length>0"
                style="marginTop:10px"
              >
                <div class="datiStyle">SCONTO/MAGG.</div>
                <div v-for="(item,index) in inv.discountSurcharges" :key="index">
                  <div>{{index+1}}: &nbsp;{{item.type | ma_sc}} {{item.percent ? 'Percentuale' : 'Importo'}}:{{item.percent || item.amount}} {{item.percent? '%':'€'}}</div>
                </div>
              </div>

              <div style="marginTop:10px" v-if="inv.transport && inv.transport.carrier">
                <div
                  v-if="inv.transport.carrier.vatCountry"
                  class="datiStyle"
                >DATI ANAGRAFICI VETTORE</div>
                <div
                  v-if="inv.transport.carrier.vatCountry"
                >ID Paese:{{inv.transport.carrier.vatCountry}}</div>
                <div
                  v-if="inv.transport && inv.transport.carrier && inv.transport.carrier.vatNumber"
                >P.IVA:{{inv.transport.carrier.vatNumber}}</div>
                <div
                  v-if="inv.transport && inv.transport.carrier && inv.transport.carrier.taxCode"
                >Codice Fiscale:{{inv.transport.carrier.taxCode}}</div>
                <div
                  v-if="(inv.transport && inv.transport.carrier && inv.transport.carrier.name) || (inv.transport && inv.transport.carrier && inv.transport.carrier.firstName && inv.transport.carrier.lastName)"
                >{{inv.transport.carrier.name ? 'Denominazione:' :'Nome e Cognome:'}}</div>
                <div
                  v-if="inv.transport && inv.transport.carrier && inv.transport.carrier.name"
                >Destinatario:{{inv.transport.carrier.name}}</div>
                <div
                  v-if="inv.transport && inv.transport.carrier && inv.transport.carrier.firstName"
                >Nome:{{inv.transport.carrier.firstName}}</div>
                <div
                  v-if="inv.transport && inv.transport.carrier && inv.transport.carrier.lastName"
                >Cognome:{{inv.transport.carrier.lastName}}</div>

                <div v-if="inv.transport && inv.transport.carrier && inv.transport.carrier.eori">
                  Codice Eori:
                  {{inv.transport.carrier.eori}}
                </div>
                <div
                  v-if="inv.transport && inv.transport.carrier && inv.transport.carrier.driveLicence"
                >
                  Numero licenza guida Eori:
                  {{inv.transport.carrier.driveLicence}}
                </div>

                <div
                  v-if="inv.transport && inv.transport.medium && inv.transport.transportCausal"
                  class="datiStyle"
                >INFORMAZIONI TRASPORTO</div>
                <div v-if="inv.transport && inv.transport.medium">
                  Mezzo di trasporto:
                  {{inv.transport.medium}}
                </div>
                <div
                  v-if="inv.transport && inv.transport.transportCausal"
                >Causale trasporto:{{inv.transport.transportCausal}}</div>
                <div v-if="inv.transport && inv.transport.count">
                  Numero colli:
                  {{inv.transport.count}}
                </div>
                <div v-if="inv.transport && inv.transport.description">
                  Descrizione:
                  {{inv.transport.description}}
                </div>
                <div
                  v-if="inv.transport && inv.transport.unit"
                >Unità di misura peso:{{inv.transport.unit}}</div>
                <div v-if="inv.transport && inv.transport.grossWeight">
                  Peso lordo:
                  {{inv.transport.grossWeight}}
                </div>
                <div
                  v-if="inv.transport && inv.transport.netWeight"
                >Peso netto:{{inv.transport.netWeight}}</div>
                <div v-if="inv.transport && inv.transport.withdrawalAt">
                  Data e ora ritiro:
                  {{inv.transport.withdrawalAt | time_data}}
                </div>
                <div
                  v-if="inv.transport && inv.transport.startDate"
                >Data inizio trasporto:{{inv.transport.startDate | time_data}}</div>
                <div
                  v-if="inv.transport && inv.transport.deliveryAt"
                >Data e ora di consegna:{{inv.transport.deliveryAt | time_data}}</div>

                <div v-if="inv.transport.returnType" class="datiStyle">INFORMAZIONI RESA</div>
                <div
                  v-if="inv.transport && inv.transport.returnType"
                >Tipo resa:{{inv.transport.returnType}}</div>
                <div
                  v-if="inv.transport && inv.transport.returnAddress && inv.transport.returnAddress.zipcode"
                >CAP:{{inv.transport.returnAddress.zipcode}}</div>
                <div
                  v-if="inv.transport && inv.transport.returnAddress && inv.transport.returnAddress.province"
                >Provincia:{{inv.transport.returnAddress.province}}</div>
                <div
                  v-if="inv.transport && inv.transport.returnAddress && inv.transport.returnAddress.city"
                >Comune:{{inv.transport.returnAddress.city}}</div>
                <div
                  v-if="inv.transport && inv.transport.returnAddress && inv.transport.returnAddress.country"
                >Nazione:{{inv.transport.returnAddress.country == 'IT' ? 'Italia' : ''}}</div>
                <div
                  v-if="inv.transport && inv.transport.returnAddress && inv.transport.returnAddress.address"
                >Indirizzo:{{inv.transport.returnAddress.address}}</div>
                <div
                  v-if="inv.transport && inv.transport.returnAddress && inv.transport.returnAddress.houseNumber"
                >Numero Civico:{{inv.transport.returnAddress.houseNumber}}</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="invoice-detail-terms content-block">
          <el-row>
            <el-col :span="12" class="invoice-address">
              <div class="terms-item-view">
                <span>Numero fattura:</span>
                <span>{{ inv.number }}</span>
              </div>
              <div class="terms-item-view">
                <span>Data fattura:</span>
                <span>{{ inv.date }}</span>
              </div>
              <div class="terms-item-view">
                <span>Tipologia fattura:</span>
                <span>{{ inv.type | fuChange(typeList)}}</span>
              </div>
              <div class="terms-item-view">
                <span>Codice Destinatario:</span>
                <span v-if="inv.recipientCode != '0000000'">{{ inv.recipientCode }}</span>
                <span
                  v-if="((inv.recipientCode == '0000000') && inv.recipientEmail)"
                >{{ inv.recipientEmail }}</span>
                <span
                  v-if="((inv.recipientCode == '0000000') && !inv.recipientEmail)"
                >{{ inv.recipientCode }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="invoice-item-list content-block">
          <div>
            <el-table :data="inv.items" border style="width: 100%">
              <el-table-column prop="description" label="Descrizione" width="180"></el-table-column>
              <el-table-column prop="price" label="Prezzo un" width="180"></el-table-column>
              <el-table-column prop="count" label="Quantita"></el-table-column>
              <el-table-column prop="netAmount" label="Imponibile"></el-table-column>
              <el-table-column prop="count" label="SC/MG">
                <template slot-scope="scope">
                  <div v-for="(item,index) in scope.row.discountSurcharges" :key="index">
                    <span>{{item.type}}</span>
                    <span v-if="item.amount || item.amount == '0'">{{item.amount}} €</span>
                    <span v-if="item.percent || item.percent == '0'">{{item.percent}} %</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="taxAmount" label="IVA"></el-table-column>
              <el-table-column prop="totalAmount" label="Total"></el-table-column>
            </el-table>

            <!-- <div class="x-sss">
              <div style="width:40%;    line-height: 36px" class="www">Descrizione</div>
              <div style="width:15%" class="sss www">Prezzo un</div>
              <div style="width:10%" class="sss www">Quantita</div>
          
              <div style="width:15%" class="sss www">Imponibile</div>
              <div style="width:10%" class="sss www">IVA</div>
              <div style="width:10%" class="sss www">Total</div>
            </div>
            <div class="x-sss" v-for="(item,index) in inv.productList" :key="index">
              <div style="width:40%; line-height: 36px">{{item.description}}</div>
              <div style="width:15%" class="sss">{{item.price}}</div>
              <div style="width:10%" class="sss">{{item.count}}</div>
         
              <div style="width:15%" class="sss">{{item.netAmount}}</div>
              <div style="width:10%" class="sss">{{item.taxAmount}}</div>
              <div style="width:10%" class="sss">{{item.totalAmount}}</div>
            </div>-->
          </div>
        </div>
        <hr class="divider" style="background-color: rgb(51, 51, 51); margin-top: 0" />
        <div class="boxs">
          <div class="summary">
            <div class="summaryBox">
              <el-table :data="summaryList" style="width: 100%" empty-text=" ">
                <el-table-column prop="rate" label="IVA(%)" width="60"></el-table-column>
                <el-table-column prop="worth" label="Totale Imponibile" width="120"></el-table-column>
                <el-table-column prop="VAT" label="Totale Imposte" width="120"></el-table-column>
                <el-table-column prop="IVA" label="Totale IVA"></el-table-column>
              </el-table>
            </div>
          </div>

          <div class="invoice-totals-container content-block" style="width:48%;">
            <div class="invoice-totals-row">
              <div class="invoice-summary-label">Totale Imponibile</div>
              <div class="invoice-summary-value">
                <span class="currency">
                  <span class="currency-symbol">€</span>
                  <span class="currency-amount">{{netWorth}}</span>
                </span>
              </div>
            </div>

            <div class="invoice-totals-row" v-for="item in cassaOneMapping" :key="item.percent">
              <div
                class="invoice-summary-label"
              >Cassa (CASSAFORENSE) - {{item.withholding | withholdingFlag}}</div>
              <div class="invoice-summary-value">
                <span class="currency">
                  <span class="currency-symbol">€</span>
                  <span
                    class="currency-amount"
                  >{{item.rate/100*inv.netAmount*item.percent/100 | del}}</span>
                </span>
              </div>
            </div>

            <div class="invoice-totals-row">
              <div class="invoice-summary-label">Totale Imposte</div>
              <div class="invoice-summary-value">
                <span class="currency">
                  <span class="currency-symbol">€</span>
                  <span class="currency-amount">{{inv.taxAmount }}</span>
                </span>
              </div>
            </div>

            <div class="invoice-totals-row">
              <div class="invoice-summary-label">Totale documento</div>
              <div class="invoice-summary-value">
                <span class="currency">
                  <span class="currency-symbol">€</span>
                  <span class="currency-amount">{{netPay}}</span>
                </span>
              </div>
            </div>

            <div class="invoice-totals-row" v-for="item in scontoMapping" :key="item.type">
              <div class="invoice-summary-label">{{item.type == 'SC' ? "Sconto" : "Maggiorazione"}}</div>
              <div class="invoice-summary-value">
                <span class="currency">
                  <span class="currency-symbol">€</span>
                  <span class="currency-amount">{{item.num}}</span>
                </span>
              </div>
            </div>

            <div class="invoice-totals-row" v-if="discountMoney">
              <div class="invoice-summary-label">Importo ritenuta acconto</div>
              <div class="invoice-summary-value">
                <span class="currency">
                  <span class="currency-symbol">€</span>
                  <span class="currency-amount">{{discountMoney}}</span>
                </span>
              </div>
            </div>

            <div
              class="invoice-totals-row"
              v-for="(item, index) in cassaTwoMapping"
              :key="index+item.cassaType"
            >
              <div
                class="invoice-summary-label"
              >Cassa (CASSAFORENSE) - {{item.withholding | withholdingFlag}}</div>
              <div class="invoice-summary-value">
                <span class="currency">
                  <span class="currency-symbol">€</span>
                  <span
                    class="currency-amount"
                  >{{item.rate/100*inv.netAmount*item.percent/100 | del}}</span>
                </span>
              </div>
            </div>

            <div class="invoice-totals-row">
              <div class="invoice-summary-label">Arrotondamento</div>
              <div class="invoice-summary-value">
                <span class="currency" style="display:flex;justifyContent:flex-end;">
                  <span class="currency-symbol">€</span>
                  <span class="currency-amount">
                    <!-- <el-input placeholder class="zeroDel" v-model="rounding"></el-input> -->
                    <span class="zeroDel">{{rounding}}</span>
                  </span>
                </span>
              </div>
            </div>

            <div class="invoice-totals-row">
              <div class="invoice-summary-label">Totale fattura</div>
              <div class="invoice-summary-value">
                <span class="currency">
                  <span class="currency-symbol">€</span>
                  <span class="currency-amount">{{inv.totalAmount}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
const dataList = require("@/assets/data/dataList.js");
const moment = require("moment");
const REGION = require("@/assets/data/region.json");
const INVOICE_TYPE_LIST = require("@/assets/data/invoice-type.json");
const INVOICE_PAYMENT_TYPE_LIST = require("@/assets/data/invoice-payment-type.json");
const INVOICE_PAYMENT_TYPE_LIST2 = require("@/assets/data/invoice-payment-type2.json");
const INVOICE_PAYMENT_CHANNEL_LIST = require("@/assets/data/invoice-payment-channel.json");
  import {
    invoiceSendDetail,getVatList
  } from '@/api/api';

export default {
  name: "InvSentDetail",
  props: {
    id: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      netWorth: "",
      typeList: [],
      vatList: [],
      dataList: "",
      cassaShow: false,
      annexeShow: false,
      documentiShow: false,
      payment: false,

      inv: {
        seller: {
          address: "",
          city: "",
          country: "",
          email: "",
          fax: null,
          firstName: null,
          houseNumber: null,
          lastName: null,
          name: "",
          phone: "",
          province: "",
          taxCode: "",
          taxRegime: "",
          type: null,
          vatNumber: "",
          zipcode: ""
        },

        buyer: {
          type: "",
          name: "",
          vatNumber: "",
          taxCode: "",
          country: "",
          province: "",
          city: "",
          address: "",
          zipcode: "",
          firstName: "",
          lastName: ""
        },
        //1
        vatDebit: "", //增值税支付类型

        //2
        pensionListMin: [],
        pensions: [
          {
            type: "",
            rate: "",
            vatId: "",
            withholding: "",
            percent: "",
            baseAmount: "",
            vat: "",
            freeVatDecreeId: "",
            ritenuta: "",
            payAmount: "",
            cassaType: "",
            suCod: "",
            cassaCod: "",
            cassaZero: "",
            flagCassa: false,
            btnF: "Modifica",
            showF: false,
            CodF: false,
            zeroShow: false,
            changeNum: false,
            cassaBase: "",
            value: "Modifica base imponibile"
          },
          {
            type: "",
            percent: "",
            rate: "",
            vatId: "",
            withholding: "",
            baseAmount: "",
            vat: "",
            freeVatDecreeId: "",
            ritenuta: "",
            payAmount: "",
            cassaType: "",
            suCod: "",
            cassaCod: "",
            cassaZero: "",
            flagCassa: false,
            btnF: "Modifica",
            showF: false,
            CodF: false,
            zeroShow: false,
            changeNum: false,
            cassaBase: "",
            value: "Modifica base imponibile"
          },
          {
            type: "",
            vatId: "",
            rate: "",
            withholding: "",
            percent: "",
            baseAmount: "",
            cassaCod: "",
            vat: "",
            freeVatDecreeId: "",
            cassaZero: "",
            suCod: "",
            ritenuta: "",
            payAmount: "",
            cassaType: "",
            flagCassa: false,
            btnF: "Modifica",
            showF: false,
            CodF: false,
            zeroShow: false,
            changeNum: false,
            cassaBase: "",
            value: "Modifica base imponibile"
          }
        ],
        // 3
        withholds: [],
        // 4
        relateds: [],

        datiddtList: [],
        //5
        annexe: [],

        // 6
        stamp: {
          amount: ""
        },

        // 7
        descriptions: [],
        //8
        enableArt73: false,
        //9

        discountSurcharges: [],

        //10
        primary: {
          number: "",
          date: ""
        },
        // 11
        processes: [],
        private: {},

        //12

        //13
        vehicle: {
          date: "",
          total: ""
        },
        transportTrackingList: [],
        transportBox: {
          number: "",
          date: "",
          rows: ""
        },
        transport: {
          carrier: {
            vatNumber: "", //承运人税号
            vatCountry: "",
            taxCode: "",
            name: "",
            firstName: "",
            lastName: "",
            eori: "",
            title: "",
            driveLicence: ""
          },
          medium: "", //运输工具
          count: "", //数量
          description: "", //描述
          unit: "",
          grossWeight: "",
          netWeight: "",
          startDate: "",
          withdrawalAt: "",
          deliveryAt: "",
          returnType: "",
          transportCausal: "",
          returnAddress: {
            address: "",
            houseNumber: "",
            zipcode: "",
            country: "",
            province: "",
            city: ""
          }
        },
        payments: []
      },
      cassaTwoMapping: [],
      cassaOneMapping: [],
      region: [],
      netPay: 0.0,
      shipShow: false,
      scontoMapping: [],
      discountMoney: 0.0,
      rounding: 0.0,
      summaryList: [
        { rate: "22%", worth: 0, VAT: 0, IVA: 0 },
        { rate: "10%", worth: 0, VAT: 0, IVA: 0 },
        { rate: "4%", worth: 0, VAT: 0, IVA: 0 },
        { rate: "0%", worth: 0, VAT: 0, IVA: 0 }
      ]
    };
  },
  methods: {
    loadSentDetail() {
      let _this = this;
      let params = new URLSearchParams();
      params.append('id', this.id);
      invoiceSendDetail(params).then(resp => {
        if (resp.code === 20000) {
          _this.inv = resp.data;
          if (
            _this.inv &&
            _this.inv.items &&
            _this.inv.items.length > 0
          ) {
            for (var i = 0; i < _this.inv.items.length; i++) {
              _this.netWorth = (
                Number(_this.inv.items[i].netAmount) +
                Number(_this.netWorth)
              ).toFixed(2);
            }
          }
          _this.setZero();
        } else {
          this.$message.error(resp.msg);
        }
      });
    },
    dataChange() {
      // if (this.inv.items.length > 0) {
      //   for (var i = 0; i < this.inv.items.length; i++) {
      //     this.inv.items[i].vatRate = this.vatChange(
      //       this.inv.items[i].vatId
      //     );
      //     this.inv.items[i].vatNature = this.vatChangeNature(
      //       this.inv.items[i].vatId
      //     );
      //   }
      // }
      this.inv.netAmount = 0;
      this.inv.taxAmount = 0;
      this.inv.totalAmount = 0;
      if(this.inv.items){
        for (var i = 0; i < this.inv.items.length; i++) {
          const p = this.inv.items[i];
          this.inv.netAmount += Number(p.netAmount); // 产品总净值
          this.inv.taxAmount += Number(p.taxAmount); //产品总增值税
        }
      }
      // 产品总价
      // if (this.inv.pensions && this.inv.pensions.length > 0) {
      //   for (var i = 0; i < this.inv.pensions.length; i++) {
      //     this.thisproWorth +=
      //       (Number(this.inv.pensions[i].baseAmount) *
      //         this.inv.pensions[i].percent) /
      //       100;
      //   }
      // }
      // 产品总净值
      this.inv.netAmount = this.inv.netAmount.toFixed(2);
      if (isNaN(this.inv.netAmount)) {
        this.inv.netAmount = 0.0;
      }
      if (this.inv.pensions) {
        for (var i = 0; i < this.inv.pensions.length; i++) {
          this.inv.pensions[i].baseAmount = this.inv.netAmount;
        }
      }

      // 小结计算

      this.summaryList = [
        { rate: "22%", worth: 0, VAT: 0, IVA: 0 },
        { rate: "10%", worth: 0, VAT: 0, IVA: 0 },
        { rate: "4%", worth: 0, VAT: 0, IVA: 0 },
        { rate: "0%", worth: 0, VAT: 0, IVA: 0 }
      ];
      let a = 0;
      let b = 0;
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      let g = 0;
      let h = 0;

      if (this.inv.items && this.inv.items.length > 0) {
        for (var i = 0; i < this.inv.items.length; i++) {
          if (
            this.inv.items[i].vatRate == "22" ||
            this.inv.items[i].vatRate == "22.00"
          ) {
            a += Number(this.inv.items[i].netAmount);
            b +=
              (Number(this.inv.items[i].netAmount) *
                Number(this.inv.items[i].vatRate)) /
              100;
          }
          if (
            this.inv.items[i].vatRate == "10" ||
            this.inv.items[i].vatRate == "10.00"
          ) {
            c += Number(this.inv.items[i].netAmount);
            d +=
              (Number(this.inv.items[i].netAmount) *
                Number(this.inv.items[i].vatRate)) /
              100;
          }
          if (
            this.inv.items[i].vatRate == "4" ||
            this.inv.items[i].vatRate == "4.00"
          ) {
            e += Number(this.inv.items[i].netAmount);
            f +=
              (Number(this.inv.items[i].netAmount) *
                Number(this.inv.items[i].vatRate)) /
              100;
          }
          if (
            this.inv.items[i].vatRate == "0" ||
            this.inv.items[i].vatRate == "0.00"
          ) {
            g += Number(this.inv.items[i].netAmount);
            h +=
              (Number(this.inv.items[i].netAmount) *
                Number(this.inv.items[i].vatRate)) /
              100;
          }
        }
      }

      if (this.inv.pensions) {
        if (this.inv.pensions.length > 0) {
          for (var i = 0; i < this.inv.pensions.length; i++) {
            if (this.inv.pensions[i].type) {
              if (this.inv.pensions[i].vatRate == "22") {
                a += Number(this.inv.pensions[i].baseAmount);
                b +=
                  ((((Number(this.inv.pensions[i].baseAmount) *
                    Number(this.inv.pensions[i].percent)) /
                    100) *
                    Number(this.inv.pensions[i].rate)) /
                    100) *
                  0.22;
                this.inv.taxAmount +=
                  ((((Number(this.inv.pensions[i].baseAmount) *
                    Number(this.inv.pensions[i].percent)) /
                    100) *
                    Number(this.inv.pensions[i].rate)) /
                    100) *
                  0.22;
              }
              if (this.inv.pensions[i].vatRate == "10") {
                c += Number(this.inv.pensions[i].baseAmount);
                d +=
                  ((((Number(this.inv.pensions[i].baseAmount) *
                    Number(this.inv.pensions[i].percent)) /
                    100) *
                    Number(this.inv.pensions[i].rate)) /
                    100) *
                  0.1;
                this.inv.taxAmount +=
                  ((((Number(this.inv.pensions[i].baseAmount) *
                    Number(this.inv.pensions[i].percent)) /
                    100) *
                    Number(this.inv.pensions[i].rate)) /
                    100) *
                  0.1;
              }

              if (this.inv.pensions[i].vatRate == "4") {
                e += Number(this.inv.pensions[i].baseAmount);
                f +=
                  ((((Number(this.inv.pensions[i].baseAmount) *
                    Number(this.inv.pensions[i].percent)) /
                    100) *
                    Number(this.inv.pensions[i].rate)) /
                    100) *
                  0.04;
                this.inv.taxAmount +=
                  ((((Number(this.inv.pensions[i].baseAmount) *
                    Number(this.inv.pensions[i].percent)) /
                    100) *
                    Number(this.inv.pensions[i].rate)) /
                    100) *
                  0.04;
              }
              if (this.inv.pensions[i].vatRate == "0") {
                g += Number(this.inv.pensions[i].baseAmount);
                h +=
                  ((((Number(this.inv.pensions[i].baseAmount) *
                    Number(this.inv.pensions[i].percent)) /
                    100) *
                    Number(this.inv.pensions[i].rate)) /
                    100) *
                  0;
                this.inv.taxAmount +=
                  ((((Number(this.inv.pensions[i].baseAmount) *
                    Number(this.inv.pensions[i].percent)) /
                    100) *
                    Number(this.inv.pensions[i].rate)) /
                    100) *
                  0;
              }
            } else {
              break;
            }
          }
        }
      }
      this.summaryList[0].worth = a.toFixed(2);
      this.summaryList[0].VAT = b.toFixed(2);
      this.summaryList[0].IVA = (a + b).toFixed(2);

      this.summaryList[1].worth = c.toFixed(2);
      this.summaryList[1].VAT = d.toFixed(2);
      this.summaryList[1].IVA = (c + d).toFixed(2);

      this.summaryList[2].worth = e.toFixed(2);
      this.summaryList[2].VAT = f.toFixed(2);
      this.summaryList[2].IVA = (e + f).toFixed(2);

      this.summaryList[3].worth = g.toFixed(2);
      this.summaryList[3].VAT = h.toFixed(2);
      this.summaryList[3].IVA = (g + h).toFixed(2);
      this.inv.taxAmount = this.inv.taxAmount.toFixed(2);

      //养老金
      this.cassaOneMapping = [];
      this.cassaTwoMapping = [];

      if (this.inv.pensions) {
        for (var i = 0; i < this.inv.pensions.length; i++) {
          if (this.inv.pensions[i].withholding == true) {
            this.cassaOneMapping.push(this.inv.pensions[i]);
          } else if (this.inv.pensions[i].withholding == false) {
            if (this.inv.pensions[i].withholding === "") {
            } else {
              this.cassaTwoMapping.push(this.inv.pensions[i]);
            }
          }
        }
      }

      // 总文件

      let numMax = 0;

      if (this.cassaOneMapping.length > 0) {
        for (var i = 0; i < this.cassaOneMapping.length; i++) {
          numMax +=
            (((Number(this.cassaOneMapping[i].baseAmount) *
              Number(this.cassaOneMapping[i].percent)) /
              100) *
              Number(this.cassaOneMapping[i].rate)) /
            100;
        }
      }

      this.netPay = (
        numMax +
        Number(this.inv.netAmount) +
        Number(this.inv.taxAmount)
      ).toFixed(2);

      // sonto
      this.scontoMapping = [];
      let op = Number(this.netPay);

      if (this.inv) {
        if (this.inv.discountSurcharges) {
          if (this.inv.discountSurcharges.length > 0) {
            for (var i = 0; i < this.inv.discountSurcharges.length; i++) {
              if (this.inv.discountSurcharges[i].percent) {
                if (this.inv.discountSurcharges[i].type == "SC") {
                  this.scontoMapping.push({
                    type: this.inv.discountSurcharges[i].type,
                    num:
                      "-" +
                      (
                        (Number(op) *
                          Number(this.inv.discountSurcharges[i].percent)) /
                        100
                      ).toFixed(2)
                  });
                  op =
                    Number(op) *
                    (1 -
                      Number(this.inv.discountSurcharges[i].percent) / 100);
                } else if (this.inv.discountSurcharges[i].type == "MG") {
                  this.scontoMapping.push({
                    type: this.inv.discountSurcharges[i].type,
                    num: (
                      (Number(op) *
                        Number(this.inv.discountSurcharges[i].percent)) /
                      100
                    ).toFixed(2)
                  });
                  op =
                    Number(op) *
                    (Number(this.inv.discountSurcharges[i].percent) / 100 +
                      1);
                }
              } else if (this.inv.discountSurcharges[i].amount) {
                if (this.inv.discountSurcharges[i].type == "SC") {
                  this.scontoMapping.push({
                    type: this.inv.discountSurcharges[i].type,
                    num: "-" + this.inv.discountSurcharges[i].amount
                  });
                  op = op - Number(this.inv.discountSurcharges[i].amount);
                } else if (this.inv.discountSurcharges[i].type == "MG") {
                  this.scontoMapping.push({
                    type: this.inv.discountSurcharges[i].type,
                    num: Number(
                      this.inv.discountSurcharges[i].amount
                    ).toFixed(2)
                  });
                  op = op + Number(this.inv.discountSurcharges[i].amount);
                }
              }
            }
          }
        }
      }

      let delCassaMoney = 0;
      for (var i = 0; i < this.cassaTwoMapping.length; i++) {
        delCassaMoney +=
          (((Number(this.cassaTwoMapping[i].baseAmount) *
            Number(this.cassaTwoMapping[i].rate)) /
            100) *
            Number(this.cassaTwoMapping[i].percent)) /
          100;
      }

      let delSontoMonry = 0;

      if (this.scontoMapping.length > 0) {
        for (var j = 0; j < this.scontoMapping.length; j++) {
          delSontoMonry += Number(this.scontoMapping[j].num);
        }
      }

      //计算押金
      if (this.inv.withholds && this.inv.withholds.length > 0) {
        if (this.inv.withholds[0].type) {
          this.discountMoney = (
            (((Number(this.inv.netAmount) *
              Number(this.inv.withholds[0].percent)) /
              100) *
              Number(this.inv.withholds[0].rate)) /
            100
          ).toFixed(2);
        } else {
          this.discountMoney = 0;
        }
      }

      //净支付总文件- 养老金-押金-折扣-抹零
      this.inv.totalAmount = (
        Number(this.netPay) -
        Number(delCassaMoney) +
        Number(delSontoMonry) -
        Number(this.discountMoney) -
        Number(this.rounding)
      ).toFixed(2);
    },
    modalClose() {
      // 直接修改父组件的属性
      this.$emit("update:visible", false);
    },
    setZero() {
      var that = this;
      getVatList().then(res => {
        if (res.code === 20000) {
          that.vatList = res.data;

          that.dataChange();
        }
      });
    },
    vatChange(id) {
      for (var i = 0; i < this.vatList.length; i++) {
        if (id == this.vatList[i].id) {
          return this.vatList[i].rate;
          break;
        }
      }
    },
    vatChangeNature(id) {
      for (var i = 0; i < this.vatList.length; i++) {
        if (id == this.vatList[i].id) {
          return this.vatList[i].nature;
          break;
        }
      }
    }
  },

  mounted: function() {
    this.loadSentDetail();

    this.dataList = dataList;
    this.region = REGION[0].provinceList;
    this.typeList = INVOICE_TYPE_LIST;
  },
  filters: {
    ivaChange(val, data) {
      let datas = data.options;
      for (var i = 0; i < datas.length; i++) {
        if (val == datas[i].value) {
          return datas[i].label;
          break;
        }
      }
    },
    withholdingFlag(val) {
      if (val == true) {
        return "Rivalsa";
      } else if (val == false) {
        return "Trattenuta";
      }
    },
    withholdingValue(val) {
      let data = [
        { label: "Rivalsa", value: true },
        { label: "Trattenuta", value: false }
      ];
      for (var i = 0; i < data.length; i++) {
        if (val == data[i].value) {
          return data[i].label;
          break;
        }
      }
    },
    vatValue(val, data) {
      for (var i = 0; i < data.length; i++) {
        if (val == data[i].id) {
          return data[i].rate;
          break;
        }
      }
    },

    del: value => {
      return value.toFixed(2);
    },
    cassa_type: value => {
      for (var i = 0; i < dataList.cassaOneOption.length; i++) {
        if (value == dataList.cassaOneOption[i].value) {
          return dataList.cassaOneOption[i].label;
        }
      }
    },
    ritenuta_type: value => {
      for (var i = 0; i < dataList.ritenutaTipoOption.length; i++) {
        if (value == dataList.ritenutaTipoOption[i].value) {
          return dataList.ritenutaTipoOption[i].label;
          break;
        }
      }
    },
    ritenuta_payCausal: value => {
      for (var i = 0; i < dataList.ritenutaTwoOption.length; i++) {
        if (value == dataList.ritenutaTwoOption[i].value) {
          return dataList.ritenutaTwoOption[i].label;
        }
      }
    },
    time_data: value => {
      return moment(value).format("YYYY-MM-DD");
    },
    ma_sc: value => {
      if (value == "MG") {
        return "Maggiorazione";
      } else if (value == "SC") {
        return "Sconto";
      }
    },
    payment_Type: value => {
      for (var i = 0; i < INVOICE_PAYMENT_TYPE_LIST2.length; i++) {
        if (value == INVOICE_PAYMENT_TYPE_LIST2[i].type) {
          return INVOICE_PAYMENT_TYPE_LIST2[i].label;
        }
      }
    },
    payment_Channel: value => {
      for (var i = 0; i < INVOICE_PAYMENT_CHANNEL_LIST.length; i++) {
        if (value == INVOICE_PAYMENT_CHANNEL_LIST[i].type) {
          return INVOICE_PAYMENT_CHANNEL_LIST[i].label;
        }
      }
    },
    fuChange(val, data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].code == val) {
          return data[i].name;
          break;
        }
      }
    }
  },
  computed: {
    // payment_Type: function () {
    //   for (var i = 0; i < this.$t('payment').length; i++) {
    //     if (this.inv.payment.paymentType == this.$t('payment')[i].type) {
    //       return this.$t('payment')[i].label;
    //     }
    //   }
    // },
    invDebitVat: function() {
      if (this.inv.debitVat == "I") {
        return "IVA ad esigibilità immediata";
      } else if (this.inv.debitVat == "D") {
        return "IVA ad esegibilità differita";
      } else if (this.inv.debitVat == "S") {
        return "Scissione dei pagamenti";
      } else {
        return "";
      }
    },
    datiIdPaese: function() {
      for (var i = 0; i < this.region.length; i++) {
        if (
          this.inv.ship &&
          this.inv.ship.shipcomp &&
          this.inv.ship.shipcomp.sdi
        ) {
          if (this.inv.ship.shipcomp.sdi.idPaese == this.region[i].code) {
            return this.region[i].name;
          }
        }
      }
    }
  }
};
</script>
<style>
.invoice-container {
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.invoice-detail .el-dialog__header {
  display: none;
}

.invoice-detail .el-dialog__body {
  padding: 0;
}

.invoice-container-close,
.invoice-container-printer {
  position: fixed;
  top: 10px;
  left: 50%;
  margin-left: 462px !important;
  font-size: 32px;
  color: #ffffff;
}

.invoice-container-close:hover,
.invoice-container-close:focus {
  color: #000000;
}

.invoice-container-printer:hover,
.invoice-container-printer:focus {
  color: #000000;
}

.invoice-container-close {
  top: 10px;
}

.invoice-container-printer {
  top: 50px;
}

.invoice-detail-accent {
  height: 16px;
  background-color: rgb(51, 51, 51);
}

.invoice-detail-body {
  position: relative;
  min-height: 1000px;
  padding-top: 32px;
  padding-bottom: 32px;
}

.invoice-detail-body .content-block {
  padding-left: 35px;
  padding-right: 35px;
  /* width: 920px; */
}

.invoice-detail-body h2 {
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 30px;
  width: 100%;
  display: inline-block;
}

.invoice-detail-title {
}

.invoice-container .invoice-logo {
  position: relative;
  text-align: center;
  height: 80px;
  margin-bottom: 30px;
}

.invoice-container .invoice-logo .logo {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -90px;
  padding: 0 50px;
  background-color: #ffffff;
  z-index: 100;
}

.invoice-container .invoice-logo .logo img {
  vertical-align: middle;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.invoice-container .invoice-logo .divider {
  position: absolute;
  top: 40px;
  width: 100%;
  margin: 0;
  z-index: 99;
}

.invoice-address {
  padding-bottom: 30px;
  text-align: left;
}

.invoice-address h3 {
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 0.5rem;
}

.invoice-address h4 {
  font-weight: 700;
  margin: 0;
}

.invoice-address .preview-block {
  margin-top: 0.4em;
}

.divider {
  margin: 8px 35px;
}

.invoice-detail-body hr {
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  height: 0;
  overflow: hidden;
}

.terms-item-view {
  display: flex;
  padding: 0.1em 0;
}

.terms-item-view span:first-of-type {
  min-width: 35%;
}

.invoice-item-list .el-table th {
  background-color: rgb(51, 51, 51) !important;
  color: #ffffff;
}

.invoice-item-list .el-table tr {
  /*border-bottom: 1px solid rgb(51, 51, 51)*/
}

.invoice-item-list .invoice-detail-summary {
  width: 100%;
}

.invoice-item-list .el-table td,
.invoice-item-list .el-table th.is-leaf {
  /* border-bottom: none; */
}

.invoice-item-list .el-table td,
.el-table th {
  padding: 8px 0;
}

.invoice-totals-container {
  width: 100%;
  margin-top: 8px;
}

.invoice-totals-container .invoice-totals-row {
  margin-bottom: 5px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.invoice-totals-container .invoice-summary-label {
  margin-left: 0;
  text-align: right;
}

.invoice-totals-container .invoice-summary-value {
  width: 100px;
  text-align: right;
}

.currency .currency-amount {
  padding: 0 3px 0 2px;
}

.photo-drop {
  margin-bottom: 30px;
}

.photo-drop .photo-drop-preview {
  min-height: 150px;
}

.photo-drop .photo-drop-preview img {
  width: 194px;
}

.justify-content-between {
  justify-content: space-between !important;
}

.d-flex {
  display: flex !important;
}
.boxs {
  display: flex;
}
.summary {
  width: 52% !important;
}
.summaryBox {
  padding: 0px 35px;
}
.addBtnStyleOne {
  display: flex;
  padding: 0px 35px;
}
.senOne {
  flex: 1;
}

.cassaFont {
  text-align: center;
  font-size: 20px;
}
.allFont {
  text-align: center;
  font-size: 20px;
}
.datiStyle {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.x-sss {
  display: flex;
}
.sss {
  text-align: center;
  line-height: 36px;
}
.www {
  background: #000000;

  color: #ffffff;
}
</style>
