<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister :columns="listerColumns" :data="tableData" name="name" primaryKey="id" ref="lister"
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
          <NameForm :personId="personId" :id="table.row.id" mode="edit" @done="getNameList(), table.toggle('edit')"
            @cancel="table.toggle('edit')" v-if="buttonClicked === 'edit'"></NameForm>

          <History v-if="buttonClicked === 'history'" :id="table.row.id" :pid="table.row.pid"
            :columns="historyColumns" />
        </template>
      </lister>
    </v-col>
    <v-col cols="12" id="nameForm" v-if="canAddName" class="mt-5">
      <v-btn v-if="!showAddForm" small color="primary" outlined depressed @click="showNameForm()">
        Add Name
      </v-btn>
      <v-card outlined v-else>
        <NameForm :personId="personId" mode="add" @done="getNameList(), (showAddForm = false)"
          @cancel="showAddForm = false">
        </NameForm>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import lister from "@/components/easyTable/Index.vue";
import { getNameList } from "@/services/mycontactinfo/nameService.js";
import NameForm from "@/components/mycontactinfo/Name/Form.vue";
import { deleteRecord } from "@/services/history/historyService.js";
import History from "@/components/history/Index.vue";

export default {
  name: "nameindex",
  data() {
    return {
      tableData: [],
      canAddName: true,
      showAddForm: false,
      buttonClicked: ""
    };
  },
  watch: {
    showDeletedRecords() {
      this.getNameList();
    }
  },
  components: {
    lister,
    NameForm,
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
        { title: "Title", key: "title" },
        { title: "First Name", key: "fname" },
        { title: "Middle Name", key: "mname" },
        { title: "Last Name", key: "lname" },
        { title: "Type", key: "type" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
    historyColumns() {
      return [
        { title: "Title", key: "title" },
        { title: "First Name", key: "fname" },
        { title: "Middle Name", key: "mname" },
        { title: "Last Name", key: "lname" }
      ];
    },
  },
  created() {
    this.getNameList();
  },
  methods: {
    showNameForm() {
      this.showAddForm = true;
      this.$vuetify.goTo("#nameForm");
    },
    getNameList() {
      getNameList(this.personId, this.showDeletedRecords)
        .then((response) => {
          this.tableData = response.data.list;
          this.canAddName = response.data.canAddName;
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
          this.getNameList();
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