<template>
  <v-container fluid fill-height class="d-block pa-0 ma-0 primary">
    <v-snackbar
      v-model="showSnackbar"
      :timeout="4000"
      class="success--text font-wight-bold"
      color="tertiary"
      top
    >
      {{ notification.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="notification.color"
          text
          v-bind="attrs"
          @click="showSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card v-if="dialogMode === 'delete'" class="tertiary">
        <v-card-title class="text-h5 info--text font-weight-bold">
          Are you sure you want to delete this info?
        </v-card-title>
        <v-card-text class="info--text text-subtitle-1 font-weight-bold">
          This action can"t be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info darken-3 info--text" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" @click="removeUser()"> Delete </v-btn>
        </v-card-actions>
      </v-card>
      <users-edit
        v-if="dialogMode === 'edit'"
        :user="userToUpdate"
        @usersEdit:cancel="hideDialog()"
        @usersEdit:update="
          showSnackbar = true;
          hideDialog();
        "
      />
    </v-dialog>

    <v-dialog
      v-model="showCreateDialog"
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <users-create
        @usersCreate:cancel="showCreateDialog = false"
        @usersCreate:create="
          showSnackbar = true;
          showCreateDialog = false;
        "
      />
    </v-dialog>

    <v-card flat class="primary info--text">
      <v-card-title>
        <v-row class="py-0 my-0">
          <v-col sm="2">
            <v-container
              fluid
              fill-height
              class="ma-0 pa-0 button-pointer justify-center tertiary"
              @click="showCreateDialog = true"
              >ADD
            </v-container>
          </v-col>
          <v-col>
            <v-text-field
              dark
              color="info"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        dark
        height="500"
        class="primary info--text font-weight-regular ma-0 pa-0"
        :items-per-page="9"
        :headers="computedTableHeaders"
        :items="this.getUsers"
        :search="search"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template #[`item.actions`]="{ item }" v-if="true">
          <v-menu class="primary red--text" transition="slide-x-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="info--text ma-0 pa-0" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list class="tertiary">
              <v-list-item
                class="pointer"
                @click="changeDialogMode(item, 'edit')"
              >
                <v-list-item-icon>
                  <v-icon class="info--text ma-0 pa-0">mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="info--text"
                    >Edit user.</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                class="pointer"
                @click="changeDialogMode(item, 'delete')"
              >
                <v-list-item-icon>
                  <v-icon class="info--text">mdi-delete</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="info--text"
                    >Delete user.</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template #no-data>
          <span class="info--text font-weight-black">
            Retreiving data.
          </span>
        </template>
        <template #no-results>
          <span class="info--text font-weight-black">
            No matching records found for {{ search }}.
          </span>
        </template>
      </v-data-table>
      <div>
        <v-pagination
          v-model="page"
          color="tertiary"
          :length="pageCount"
          :total-visible="7"
        ></v-pagination>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { mapState } from 'vuex';
import UsersCreate from '@/components/UsersCreate.vue';
import UsersEdit from '@/components/UsersEdit.vue';

const { mapGetters: mapUsersGetters, mapActions: mapUsersActions } =
  createNamespacedHelpers('users');

const { mapGetters: mapSessionsGetters } = createNamespacedHelpers('sessions');

export default {
  name: 'UsersTable',
  components: {
    UsersCreate,
    UsersEdit,
  },
  data() {
    return {
      mocked: {
        first_name: 'asd',
        last_name: 'asd',
        email: 'edad',
      },
      showSnackbar: false,
      page: 1,
      pageCount: 0,
      dialog: false,
      dialogMode: '',
      showCreateDialog: false,
      removeData: {},
      search: '',
      tableHeaders: [
        {
          text: 'Id',
          value: 'id',
          width: '10px',
          class: 'info--text text-lg-body-1 tertiary',
        },
        {
          text: 'First Name',
          value: 'first_name',
          width: '200',
          class: 'info--text text-lg-body-1 tertiary',
        },
        {
          text: 'Last Name',
          value: 'last_name',
          width: '200px',
          class: 'info--text text-lg-body-1 tertiary',
        },
        {
          text: 'Email',
          value: 'email',
          width: '100px',
          class: 'info--text text-lg-body-1 tertiary',
        },
      ],
      userToUpdate: [],
    };
  },
  computed: {
    ...mapState(['notification']),
    ...mapUsersGetters(['getUsers']),
    ...mapSessionsGetters(['getIsAuthenticated', 'getUserId']),
    computedTableHeaders() {
      if (this.getIsAuthenticated) {
        let loggedTableHeaders = this.tableHeaders;
        loggedTableHeaders.push({
          text: 'Actions',
          sortable: false,
          value: 'actions',
          width: '10px',
          align: 'center',
          class: 'info--text text-md-body-1 tertiary',
        });
        return loggedTableHeaders;
      }
      return this.tableHeaders;
    },
  },
  methods: {
    ...mapUsersActions(['createUser', 'deleteUser']),
    changeDialogMode(userData, dialogMode) {
      if (dialogMode === 'delete') this.removeData = userData;
      if (dialogMode === 'edit') this.userToUpdate = userData;
      this.dialogMode = dialogMode;
      this.dialog = true;
    },
    removeUser() {
      this.deleteUser(this.removeData);
      this.dialog = false;
      this.showSnackbar = true;
    },
    hideDialog() {
      this.dialogMode = '';
      this.dialog = false;
    },
    addNewUser(user) {
      const newUser = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      };
      this.createUser(newUser);
    },
  },
};
</script>

<style lang="scss" scoped>
.pointer:hover {
  background-color: #1da0f227;
  cursor: pointer;
}
.button-pointer:hover {
  background-color: #1da0f25d !important;
  cursor: pointer;
}
.table-pointer:hover {
  background-color: #1da0f227;
  cursor: pointer;
}
</style>

