<template>
    <v-row no-gutters>
        <v-col cols="12">
            <lister :columns="listerColumns" :data="tableData" name="leave" primaryKey="id" ref="lister" :sort="true"
                :showTotalRecords="false">
                <template #category="{row}">
                    {{row.category == "G" ? "General" : "Special"}}
                </template>
                <template #days="{row}">
                    {{row.days > 0 ? row.days : "-"}}
                </template>
                <template #action="table">
                    <v-row dense justify="center">
                        <v-col cols="12" lg="auto">
                            <v-btn icon fab x-small depressed color="primary"
                                @click="toggleExpandPannel(table, 'edit')">
                                <v-icon dense>mdi-pencil</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </template>
                <template #rowDetails="table">
                    <leaveTypeForm :id="table.row.id" mode="edit" @done="getLeaveTypeList(), table.toggle('edit')"
                        @cancel="table.toggle('edit')" v-if="buttonClicked === 'edit'"></leaveTypeForm>
                </template>
            </lister>
        </v-col>
        <v-col cols="12" id="leaveTypeForm" class="mt-5">
            <v-btn v-if="!showAddForm" small color="primary" outlined depressed @click="showLeaveTypeForm()">
                Add Leave Type
            </v-btn>
            <v-card outlined v-else>
                <leaveTypeForm mode="add" @done="getLeaveTypeList(), (showAddForm = false)"
                    @cancel="showAddForm = false">
                </leaveTypeForm>
            </v-card>
        </v-col>
    </v-row>
</template>
  
<script>
import lister from "@/components/easyTable/Index.vue";
import { getLeaveTypeList } from "@/services/leave/leaveService.js";
import leaveTypeForm from "@/components/leave/LeaveTypeForm.vue";
export default {
    name: "leavemanagement",
    data() {
        return {
            tableData: [],
            canAddLeave: true,
            showAddForm: false,
            buttonClicked: ""
        }
    },
    components: {
        lister,
        leaveTypeForm
    },
    computed: {
        listerColumns() {
            return [
                { title: "Type", key: "type" },
                { title: "Description", key: "description" },
                { title: "Category", key: "category", type: "custom" },
                { title: "Days", key: "days", type: "custom" },
                { title: "Actions", key: "action", type: "custom", fixed: "right" },
            ];
        },
    },
    methods: {
        showLeaveTypeForm() {
            this.showAddForm = true;
            this.$vuetify.goTo("#leaveTypeForm");
        },
        toggleExpandPannel(table, buttonClicked) {
            this.buttonClicked = buttonClicked;
            table.toggle(buttonClicked)
        },
        getLeaveTypeList() {
            getLeaveTypeList(this.personId, this.showDeletedRecords)
                .then((response) => {
                    this.tableData = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    created() {
        this.getLeaveTypeList();
    },
}
</script>
  
<style>

</style>