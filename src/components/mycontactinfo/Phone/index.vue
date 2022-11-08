<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister :columns="listerColumns" :data="tableData" name="phone" primaryKey="id" ref="lister"
        :sort="true" :showTotalRecords="false">
        <template #action="table">
          <v-row dense justify="center">
            <v-col cols="12" lg="auto">              

              <v-btn v-if="showDeletedRecords" icon fab x-small depressed disabled color="primary">
                  <v-icon dense>mdi-pencil</v-icon>
                </v-btn>

                <v-btn v-else icon fab x-small depressed color="primary" @click="toggleExpandPannel(table, 'edit')">
                  <v-icon dense>mdi-pencil</v-icon>
                </v-btn>

              <v-btn v-if="showDeletedRecords || table.row.type.toLowerCase() == 'work'" icon fab x-small depressed disabled color="error">
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
          <PhoneForm :personId="personId" :id="table.row.id" mode="edit" @done="getPhoneList(), table.toggle('edit')"
            @cancel="table.toggle('edit')" v-if="buttonClicked === 'edit'"></PhoneForm>

          <History v-if="buttonClicked === 'history'" :id="table.row.id" :pid="table.row.pid"
            :columns="historyColumns" />
        </template>
      </lister>
    </v-col>
    <v-col cols="12" id="phoneContactForm" v-if="canAddPhone" class="mt-5">
      <v-btn v-if="!showAddForm" small color="primary" outlined depressed @click="showPhoneForm()">
        Add Phone
      </v-btn>
      <v-card outlined v-else>
        <PhoneForm :personId="personId" mode="add" @done="getPhoneList(), (showAddForm = false)"
          @cancel="showAddForm = false">
        </PhoneForm>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import lister from "@/components/easyTable/Index.vue";
import { getPhoneList } from "@/services/mycontactinfo/phoneService.js";
import PhoneForm from "@/components/mycontactinfo/Phone/Form.vue";
import { deleteRecord } from "@/services/history/historyService.js";
import History from "@/components/history/Index.vue";

export default {
  name: "phoneindex",
  data() {
    return {
      tableData: [],
      canAddPhone: true,
      showAddForm: false,
      buttonClicked: ""
    };
  },
  watch: {
    showDeletedRecords() {
      this.getPhoneList();
    }
  },
  components: {
    lister,
    PhoneForm,
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
  computed: {
    listerColumns() {
      return [
        { title: "Country code", key: "countrycode" },
        { title: "Phone", key: "phoneno" },
        { title: "Type", key: "type" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
    historyColumns() {
      return [
        { title: "Country code", key: "countrycode" },
        { title: "Phone", key: "phoneno" },
        { title: "Type", key: "type" },
      ];
    },
  },
  created() {
    this.getPhoneList();
  },
  methods: {
    showPhoneForm() {
      this.showAddForm = true;
      this.$vuetify.goTo("#phoneContactForm");
    },
    getPhoneList() {
      getPhoneList(this.personId, this.showDeletedRecords)
        .then((response) => {
          this.tableData = response.data.list;
          this.canAddPhone = response.data.canAddPhone;
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
          this.getPhoneList();
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