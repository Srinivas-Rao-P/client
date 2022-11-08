<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <lister :columns="listerColumns" :data="tableData" name="bankdetails" primaryKey="id" ref="lister" :pagination="true"
          :sort="true" :search="true">
          <template #listerTitle>
            <v-row no-gutters>
              <v-col><b>Bank Details</b></v-col>
              <v-col class="text-right">
                <v-btn color="primary" small @click="showDeletedRecords = !showDeletedRecords">
                  {{showDeletedRecords ? "Hide Deleted" : "Show Deleted"}}
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <template #action="table">
            <v-row dense justify="center">
              <v-col cols="12" lg="auto">
                <!-- <v-btn
                  icon
                  fab
                  x-small
                  dark
                  depressed
                  color="primary"
                  @click="table.toggle('edit')"
                >
                  <v-icon dense dark>mdi-pencil</v-icon>
                </v-btn> -->

                <v-btn v-if="showDeletedRecords" icon fab x-small depressed disabled color="primary">
                  <v-icon dense>mdi-pencil</v-icon>
                </v-btn>

                <v-btn v-else icon fab x-small depressed color="primary" @click="toggleExpandPannel(table, 'edit')">
                  <v-icon dense>mdi-pencil</v-icon>
                </v-btn>

                <v-btn v-if="showDeletedRecords" icon fab x-small depressed disabled color="error">
                  <v-icon dense>mdi-delete</v-icon>
                </v-btn>

                <v-btn v-else icon fab x-small depressed color="error" @click="deleteRecord(table.row)">
                  <v-icon dense>mdi-delete</v-icon>
                </v-btn>

                <v-btn title="Show history" icon fab x-small depressed color="primary"
                  @click="toggleExpandPannel(table, 'history')">
                  <v-icon dense>mdi-clock-outline</v-icon>
                </v-btn>

              </v-col>
              <!-- <v-col cols="12" lg="auto">
              <v-btn
                icon
                fab
                small
                dark
                depressed
                color="error"
                title="reject"
                @click="deleteDialog = true"
              >
                <v-icon dense dark>mdi-close-circle-outline</v-icon>
              </v-btn> -->
              <!-- <v-dialog v-model="deleteDialog" max-width="290">
                <v-card>
                  <v-card-title class="text-h5">
                    Use Google's location service?
                  </v-card-title>
                  <v-card-text
                    >Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.</v-card-text
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="deleteDialog = false"
                    >
                      Disagree
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="deleteDialog = false"
                    >
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
              <!-- </v-col> -->
              <!-- <v-col cols="12" lg="auto">
              <v-btn
                icon
                fab
                small
                dark
                depressed
                color="primary"
                @click="table.toggle('history')"
              >
                <v-icon dense dark>mdi-clock-outline</v-icon>
              </v-btn>
            </v-col> -->
            </v-row>
          </template>

          <template #rowDetails="table">
            <bankForm v-if="buttonClicked === 'edit'" :personId="personId" :id="table.row.id" mode="edit"
              @done="getBankList(), table.toggle('edit')" @cancel="table.toggle('edit')"></bankForm>

            <History v-if="buttonClicked === 'history'" :id="table.row.id" :pid="table.row.pid"
              :columns="historyColumns" />
          </template>
        </lister>
      </v-col>
      <v-col cols="12" id="bankForm" v-if="canAddBank" class="mt-5">
        <v-btn v-if="!showAddForm" small class="" color="primary" outlined depressed @click="showBankForm">
          Add a bank
        </v-btn>
        <v-card outlined v-else>
          <bankForm :personId="personId" mode="add" @done="getBankList" @cancel="showAddForm = false"></bankForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
import bankForm from "@/components/bank/Bankform.vue";
import { getBankList } from "@/services/bank/bankService.js";
import { deleteRecord } from "@/services/history/historyService.js";
import History from "../../components/history/Index.vue";

export default {
  name: "bankdetails",
  data: () => {
    return {
      deleteDialog: false,
      tableData: [],
      canAddBank: true,
      showAddForm: false,
      buttonClicked: "",
      showDeletedRecords: false,
    };
  },
  props: {
    personId: {
      type: [Number, String],
      default: window.personId,
    },
  },
  watch: {
    showDeletedRecords() {
      this.getBankList();
    }
  },
  components: {
    lister,
    bankForm,
    History,
  },
  mounted() { },
  methods: {

    getBankList() {
      getBankList(this.personId, this.showDeletedRecords)
        .then((response) => {
          this.tableData = response.data.list;
          this.canAddBank = response.data.canAddBank;
          this.showAddForm = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showBankForm() {
      this.showAddForm = true;
      this.$vuetify.goTo("#bankForm");
    },
    deleteRecord(row) {
      deleteRecord(row.id, row.pid)
        .then((response) => {
          this.$toast.success(response.data.message)
          this.getBankList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleExpandPannel(table, buttonClicked) {
      this.buttonClicked = buttonClicked;
      table.toggle(buttonClicked)
    }
  },
  computed: {
    listerColumns() {
      return [
        { title: "Bank", key: "bankname" },
        { title: "Type", key: "type" },
        { title: "Account number", key: "accountnumber" },
        { title: "IFSC code", key: "ifsccode" },
        { title: "action", key: "action", type: "custom", fixed: "right" },
      ]
    },
    historyColumns() {
      return [
        { title: "Bank", key: "bankname" },
        { title: "Account number", key: "accountnumber" },
        { title: "IFSC code", key: "ifsccode" },
      ]
    },
  },
  created() {
    this.getBankList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>