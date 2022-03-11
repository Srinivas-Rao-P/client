<template>
  <v-row dense>
    <v-col cols="12">
      <lister
        :columns="columns"
        :data="tableData"
        name="bankdetails"
        primaryKey="id"
        ref="lister"
        :pagination="true"
        :sort="true"
        :search="true"
      >
        <template #listerTitle>
          <b>Bank Details</b>
        </template>

        <template #action="table">
          <v-row dense justify="center">
            <v-col cols="12" lg="auto">
              <v-btn
                icon
                fab
                x-small
                dark
                depressed
                color="primary"
                @click="table.toggle('edit')"
              >
                <v-icon dense dark>mdi-pencil</v-icon>
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
          <bankForm
            :personId="personId"
            :id="table.row.id"
            mode="edit"
            @done="getBankList(), table.toggle('edit')"
            @cancel="table.toggle('edit')"
          ></bankForm>
        </template>
      </lister>
    </v-col>
    <v-col cols="12" id="bankForm" v-if="canAddBank">
      <v-btn
        v-if="!showAddForm"
        small
        class=""
        color="primary"
        outlined
        depressed
        @click="showBankForm"
      >
        Add a bank
      </v-btn>
      <v-card outlined v-else>
        <bankForm
          :personId="personId"
          mode="add"
          @done="getBankList"
          @cancel="showAddForm = false"
        ></bankForm>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
import bankForm from "@/components/bank/Bankform.vue";
import { getBankList } from "@/services/bank/bankService.js";

export default {
  name: "bankdetails",
  data: () => {
    return {
      deleteDialog: false,
      columns: [
        { title: "Bank", key: "bankname" },
        { title: "Type", key: "type" },
        { title: "Account number", key: "accountnumber" },
        { title: "IFSC code", key: "ifsccode" },
        { title: "action", key: "action", type: "custom", fixed: "right" },
      ],
      tableData: [],
      canAddBank: true,
      showAddForm: false,
    };
  },
  props: {
    personId: {
      type: [Number, String],
      default: window.personId,
    },
  },
  components: {
    lister,
    bankForm,
  },
  mounted() {},
  methods: {
    deleteRecord(id) {
      // this.$bvModal.hide(`deleteModal${pid}`);

      console.log("record deleted", id);
      this.deleteDialog = false;
    },
    getBankList() {
      getBankList(this.personId)
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
  },
  computed: {},
  created() {
    this.getBankList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>