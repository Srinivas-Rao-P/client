<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12"> Manage user roles </v-col>
      <v-col cols="6" lg="4" md="4">
        <span>Users</span>
        <v-autocomplete
          :items="userList"
          item-text="firstname"
          item-value="id"
          placeholder="User"
          color="primary"
          hide-details="auto"
          dense
          flat
          outlined
          v-model="userId"
          autocomplete="nope"
          @change="getUserroles"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="6">
        <v-checkbox
          v-for="role in userRoles"
          :key="role.id"
          v-model="userInRole"
          :label="role.roleDescription"
          color="primary"
          :value="role.id"
          hide-details
          @change="setUserRole(role.id)"
        >
        </v-checkbox>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {
  getUsers,
  getUserroles,
  addUserrole,
  removeUserrole,
} from "@/services/manageuserroles/manageuserrolesService.js";
export default {
  name: "manageuserroles",
  data() {
    return {
      userList: [],
      userId: "",
      userRoles: [],
      userInRole: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      getUsers()
        .then((response) => {
          this.userList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserroles() {
      getUserroles(this.userId)
        .then((response) => {
          this.userRoles = response.data.userRoles;
          this.userInRole = [];
          if (response.data.userInRole.length) {
            response.data.userInRole.filter((role) => {
              this.userInRole.push(role.id);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setUserRole(roleId) {
      if (this.userInRole.includes(roleId)) {
        addUserrole(this.userId, { roleId: roleId })
          .then((response) => {
            this.$toast.success(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        removeUserrole(this.userId, { roleId: roleId })
          .then((response) => {
            this.$toast.success(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });

        console.log("remove role", this.userInRole);
      }
    },
  },
};
</script>

<style>
</style>