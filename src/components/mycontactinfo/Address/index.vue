<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister :columns="listerColumns" :data="tableData" name="address" primaryKey="id" ref="lister" :sort="true"
        :showTotalRecords="false">
        <template #action="table">
          <v-row dense justify="center">
            <v-col cols="12" lg="auto">

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
          </v-row>
        </template>
        <template #rowDetails="table">
          <AddressForm :personId="personId" :id="table.row.id" mode="edit"
            @done="getAddressList(), table.toggle('edit')" @cancel="table.toggle('edit')"
            v-if="buttonClicked === 'edit'"></AddressForm>

          <History v-if="buttonClicked === 'history'" :id="table.row.id" :pid="table.row.pid"
            :columns="historyColumns" />
        </template>
      </lister>
    </v-col>
    <v-col cols="12" id="AddressForm" v-if="canAddAddress" class="mt-5">
      <v-btn v-if="!showAddForm" small color="primary" outlined depressed @click="showAddressForm()">
        Add Address
      </v-btn>
      <v-card outlined v-else>
        <AddressForm :personId="personId" mode="add" @done="getAddressList(), (showAddForm = false)"
          @cancel="showAddForm = false">
        </AddressForm>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import lister from "@/components/easyTable/Index.vue";
import { getAddressList } from "@/services/mycontactinfo/addressService.js";
import AddressForm from "@/components/mycontactinfo/Address/Form.vue";
import { deleteRecord } from "@/services/history/historyService.js";
import History from "@/components/history/Index.vue";
import { utilities } from "@/mixin/utilities";

export default {
  name: "Addressindex",
  data() {
    return {
      tableData: [],
      canAddAddress: true,
      showAddForm: false,
      buttonClicked: ""
    };
  },
  watch: {
    showDeletedRecords() {
      this.getAddressList();
    }
  },
  components: {
    lister,
    AddressForm,
    History
  },
  props: {
    personId: {
      default: window.personId,
    },
    showDeletedRecords: {
      default: false,
    },
  },
  mixins: [utilities],
  computed: {
    listerColumns() {
      return [
        { title: "Address", key: "address" },
        { title: "Country", key: "countrycode" },
        { title: "State", key: "statecode" },
        { title: "City", key: "city" },
        { title: "Zipcode", key: "zipcode" },
        { title: "Type", key: "type" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
    historyColumns() {
      return [
        { title: "Address", key: "address" },
        { title: "Country", key: "countrycode" },
        { title: "State", key: "statecode" },
        { title: "City", key: "city" },
        { title: "Zipcode", key: "zipcode" },
      ];
    },
  },
  created() {
    this.getAddressList();
  },
  methods: {
    showAddressForm() {
      this.showAddForm = true;
      this.$vuetify.goTo("#AddressForm");
    },
    getAddressList() {
      getAddressList(this.personId, this.showDeletedRecords)
        .then((response) => {
          this.tableData = response.data.list;
          this.canAddAddress = response.data.canAddAddress;
          this.showAddForm = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteRecord(row) {
      deleteRecord(row.id, row.pid)
        .then((response) => {
          this.$toast.success(response.data.message)
          this.getAddressList();
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
};
</script>

<style>

</style>