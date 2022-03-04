<template>
  <div ref="mainContainer">
    <v-row no-gutters justify="space-between">
      <v-col cols="12" align-self="center">
        <slot name="listerTitle"></slot>

        <v-row dense justify="end" class="mt-3">
          <!-- <v-col cols="auto" align-self="center">
            <slot name="addNew"></slot>
          </v-col> -->

          <v-col
            cols="7"
            lg="4"
            md="4"
            v-if="data !== null && search"
            align-self="center"
          >
            <!--Search Box-->
            <v-text-field
              class="ml-auto"
              placeholder="Type to search..."
              v-model="searchText"
              hide-details
              flat
              solo
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            cols="5"
            lg="2"
            md="2"
            v-if="pagination && totalItems > 5"
            align-self="center"
          >
            <!--Items Per Page-->

            <v-autocomplete
              v-model="userPreference.pageSize"
              :items="itemOption"
              hide-details
              flat
              solo
              dense
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Easy Table Start -->
    <ve-table
      v-if="data !== null"
      ref="lister"
      :columns="refreshedColumns"
      :table-data="currentData"
      :cell-style-option="cellStyleOption"
      :row-style-option="rowStyleOption"
      :sort-option="sortOption"
      :expand-option="expandOption"
      :row-key-field-name="primaryKey"
      :border-around="false"
      :border-x="false"
      :border-y="false"
      :fixed-header="true"
    >
    </ve-table>
    <!-- Easy Table End -->

    <!-- Informative Start -->
    <div
      v-if="data !== null && totalItems === 0"
      class="text-center mt-3 bg-white p-4 rounded"
    >
      <b>noData</b>
    </div>
    <div
      v-else-if="data === null"
      class="text-center mt-3 bg-white p-4 rounded"
    >
      <b>loading</b>
    </div>
    <!-- Informative End -->

    <!-- Pagination Start -->

    <v-row no-gutters justify="space-between" class="mt-4">
      <v-col
        cols="12"
        lg="auto"
        md="auto"
        align-self="center"
        v-if="totalItems !== 0"
      >
        Total records: {{ totalItems }}
      </v-col>
      <v-col
        cols="12"
        lg="auto"
        md="auto"
        v-if="
          pagination && data !== null && totalItems > userPreference.pageSize
        "
      >
        <div class="pagination">
          <!-- <ve-pagination
          :total="totalItems"
          :page-size="userPreference.pageSize"
          :page-index="pageIndex"
          @on-page-number-change="pageNumberChange"
          @on-page-size-change="pageSizeChange"
        /> -->
          <v-pagination
            v-model="pageIndex"
            circle
            :length="Math.ceil(totalItems / userPreference.pageSize)"
            :total-visible="5"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>

    <!-- Pagination End -->
  </div>
</template>

<script>
import { VeTable } from "vue-easytable";
import "./custom.css";

export default {
  name: "easyTable",
  components: { VeTable },
  props: {
    // The name of the lister should be unique in whole application because cookie will be save by this name
    name: { type: String, required: true },

    // Primary key is very important as many calculations are made on this key
    // It defines the column name in the data which will be unique for all the records
    // If not define the Lister will show error
    primaryKey: { type: String, required: true },

    // Columns define the column of the table while data will populate the the lister
    columns: { type: Array, required: true },
    data: { required: true },

    // Following are the feature with their usual meaning
    pagination: { tye: Boolean, default: false },
    sort: { type: Boolean, default: false },
    multipleExpand: { type: Boolean, default: false }, // Allow the user to expand multiple row at same time
    search: { type: Boolean, default: false },
    columnSelection: { type: Boolean, default: false }, // Shows a form which will help to toggle the columns
    saveUserPreference: { type: Boolean, default: false }, // Turn on/off the ability to store the
  },
  data() {
    return {
      // Pagination Required feilds
      pageIndex: 1,
      totalItems: 0,

      // Items per page
      itemOption: [
        { value: 5, text: "5 per Page" },
        { value: 10, text: "10 per Page" },
        { value: 20, text: "20 per Page" },
        { value: 30, text: "30 per Page" },
      ],

      // This will be save in browser memory
      userPreference: {
        pageSize: 5,
        shownColumn: [],
      },

      // For the UX purpose for easy vue table
      rowStyleOption: {
        clickHighlight: false,
      },

      // Used during sorting the records
      sortingParameter: {},
      sortOption: {
        sortChange: (params) => {
          this.sortingParameter = params;
        },
      },

      // Provide a scoped slot for the row expansion
      // provide the function to
      // 1. Toggle a particular row (expand <> collapse)
      // 2. Collapse a particular row
      // 3. Collapse all row
      expandOption: {
        expandedRowKeys: [],
        render: ({ row, column, index }, h) => {
          return h("div", [
            this.$scopedSlots["rowDetails"](
              this.generateProps(row, column, index)
            ),
          ]);
        },
        afterExpandRowChange: ({ afterExpandedRowKeys }) => {
          this.expandOption.expandedRowKeys = afterExpandedRowKeys;
        },
      },

      // this will store the rowKey and purpose of the expansion
      // format { 'rowKey' : 'Purpose for which the row is expanded'}
      currentExpandPurpose: {},

      // For the searching and filter the data
      searchText: "",

      // For the row which are different form the other
      // currently supported : rowCanceled (Red Border) , rowMuted (Muted BG)
      rowVariant: {},

      // For inbuilt custom column
      // currently support : date
      columnVariant: {},
    };
  },
  computed: {
    // refresh Column and current data will convert :
    // (Columns,data from the props) => (Vue Easy table records to display)
    // Important for the lister render
    refreshedColumns() {
      const parameter = {
        title: "required",
        key: "required",
        align: "left",
        sortBy: this.sort > 0 ? "" : "optional",
        width: "optional",
      };

      let column = [...this.columns];
      column.splice(1, 0, {
        title: "",
        key: "vueEasyTableExpandColumn",
        type: "expand",
      });

      if (this.columnSelection)
        column = column.filter((el) => {
          if (
            el.type &&
            (el.type.toUpperCase() === "CUSTOM" ||
              el.type.toUpperCase() === "EXPAND")
          )
            return true;
          return this.userPreference.shownColumn.includes(el.key);
        });

      return column.map((el) => {
        Object.keys(parameter).forEach((key) => {
          if (!el[key]) {
            if (el["type"] === "expand") {
              // deals with custom column
            } else if (el["type"] === "custom") {
              // deals with custom column
              // provide the function to
              // 1. Toggle a particular row (expand <> collapse)
              // 2. Collapse a particular row
              // 3. Collapse all row
              el["renderBodyCell"] = ({ row, column, rowIndex }, h) => {
                return h("div", [
                  this.$scopedSlots[column.key](
                    this.generateProps(row, column, rowIndex)
                  ),
                ]);
              };
              if (el["sortValue"]) el["sortBy"] = "";
            } else {
              if (el["type"]) this.columnVariant[el["key"]] = el["type"];

              //deals with other column
              if (parameter[key] === "required")
                console.warn(`${key} is required property for lister`);
              else if (parameter[key] !== "optional") el[key] = parameter[key];
            }
          }
          el["field"] = el["key"];
        });

        return el;
      });
    },
    currentData() {
      const colToSearch = this.userPreference.shownColumn; //this.columns.map(el=>el.key);
      return this.doPagination(
        this.doSorting(
          JSON.parse(JSON.stringify(this.data)).filter((el) => {
            //Filtering on the basis of the text in search box
            let found = false;
            colToSearch.forEach((col) => {
              if (
                col &&
                el[col] &&
                el[col]
                  .toString()
                  .toLowerCase()
                  .includes(this.searchText.toString().toLowerCase())
              )
                found = true;
            });

            //Attach the row highlight function for rowCanceled and rowMuted
            if (el._rowVariant)
              this.rowVariant[el[this.primaryKey]] = el._rowVariant;

            return found;
          })
        )
      );
    },

    // cell style option use to manage the UX of the Lister
    cellStyleOption() {
      return {
        bodyCellClass: ({ row, column }) => {
          if (column.field === "vueEasyTableExpandColumn") {
            return "hideInnerContent";
          } else if (this.rowVariant[row[this.primaryKey]]) {
            return this.rowVariant[row[this.primaryKey]];
          }
        },
      };
    },

    // To get the list of slot needed ( Required for the card view)
    currentSlots() {
      return [...this.columns].filter((el) => {
        return el.type && el.type.toString().toUpperCase() === "CUSTOM";
      });
    },
  },
  methods: {
    // These will be trigger by the paginator during pagination
    // pageNumberChange(ind) {
    //   this.pageIndex = ind;
    // },
    // pageSizeChange(size) {
    //   this.userPreference.pageSize = size;
    // },

    // Do pagination and do sorting will be trigger while rendering the Lister
    doPagination(data) {
      let final = [...data];
      if (this.pagination === true) {
        final = [...data].slice(
          (this.pageIndex - 1) * this.userPreference.pageSize,
          this.pageIndex * this.userPreference.pageSize
        );
      }
      return final.map((el) => {
        Object.keys(this.columnVariant).forEach((key) => {
          el[key] = this.customizeColumn(this.columnVariant[key], el[key]);
        });
        return el;
      });
    },
    doSorting(data) {
      //1. get the column to be sort
      let column = "";
      let sortPatter = "asc";
      Object.keys(this.sortingParameter).forEach((key) => {
        if (this.sortingParameter[key].trim() !== "") {
          column = key;
          sortPatter = this.sortingParameter[key].trim();
        }
      });

      //console.log(data);

      //2. sort the data based on the sorting column
      let final = [...data].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        valA = valA === null ? "" : valA;
        valB = valB === null ? "" : valB;
        if (sortPatter === "asc") {
          if (valA < valB) return -1;
          else if (valA > valB) return 1;
          else return 0;
        } else {
          if (valA < valB) return 1;
          else if (valA > valB) return -1;
          else return 0;
        }
      });
      this.totalItems = final.length;

      return final;
    },

    // ROW TOGGLE FUNCTION
    /*
     * Functionality
     * 1. Allow to expand multiple row if such props is set
     *       a. If same row :
     *           i. But different purpose = remain open (done) (WORKING)
     *           ii. Same purpose = collapse that row (done) (WORKING)
     *       b. Other row:
     *           i. expand the new one without doing any changes in the previous one (done) (WORKING)
     *
     * 2. If not then :
     *       a. If same row :
     *           i. But different purpose = remain open (done) (WORKING)
     *           ii. Same purpose = collapse the row (done) (WORKING)
     *       b. Other row:
     *           i. collapse the previous and expand the new one (done) (WORKING)
     * */
    rowToggle(purpose, rowKey) {
      if (this.currentExpandPurpose[rowKey]) {
        if (this.currentExpandPurpose[rowKey] === purpose)
          this.rowCollapse(rowKey);
        else this.currentExpandPurpose[rowKey] = purpose;
      } else {
        if (this.multipleExpand !== true) this.collapseAll();
        this.currentExpandPurpose[rowKey] = purpose;
        this.expandOption.expandedRowKeys.push(rowKey);
      }
    },
    rowCollapse(rowKey) {
      if (this.currentExpandPurpose[rowKey]) {
        delete this.currentExpandPurpose[rowKey];
        this.expandOption.expandedRowKeys =
          this.expandOption.expandedRowKeys.filter((el) => el !== rowKey);
      }
    },
    collapseAll() {
      this.currentExpandPurpose = {};
      this.expandOption.expandedRowKeys = [];
    },

    //To remove the code duplication in the slot scope def
    generateProps(row, column, rowIndex) {
      return {
        row: row,
        column: column,
        index: rowIndex,
        toggle: (purpose = "expand", rowKey = row[this.primaryKey]) => {
          this.rowToggle(purpose, rowKey);
        },
        collapse: (rowKey = row[this.primaryKey]) => {
          this.rowCollapse(rowKey);
        },
        collapseAll: () => {
          this.collapseAll();
        },
      };
    },

    //decode the current key for the card view
    decodeKey(key, data) {
      return key ? key : data[this.primaryKey];
    },

    // Inbuilt customised column
    // Method = date => reformat value to date

    customizeColumn(method, value) {
      if (method === "date") {
        return new Date(value).toLocaleString("en-IN", {
          timeZone: "UTC",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }
    },
  },
  watch: {
    // Save the user preference in the browser memory
    userPreference: {
      deep: true,
      handler: function () {
        this.pageIndex = 1;
        // this.$cookies.set(`preference_${this.name}`, val);
      },
    },

    // On every search, changing the page index to 1
    searchText: function () {
      this.pageIndex = 1;
    },
  },
  created() {
    // populate the default preference
    this.userPreference.pageSize = 5;
    this.userPreference.shownColumn = [];
    this.columns.map((el) => {
      this.userPreference.shownColumn.push(el.key);
    });

    // If already have a preference
    if (this.saveUserPreference) {
      //search for saved preference in cookies
      const preference = this.$cookies.get(`preference_${this.name}`);
      if (preference) this.userPreference = preference;
    }
  },
};
</script>

<style scoped>
</style>

