<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="6"> <div>Navbar</div></v-col>
          <v-col cols="6">
            <div class="text-right">
              <v-btn
                @click="viewResume"
                color="primary"
                depressed
                outlined
                dense
                small
                >View Resume</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels
          class="mb-6"
          multiple
          v-model="panel"
          focusable
          accordion
          light
        >
          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header expand-icon="mdi-minus">
              <b color="primary">Personal</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-4">
              <v-tabs vertical>
                <v-tab
                  style="justify-content: flex-start; border-right: 1px solid"
                >
                  <v-icon left> mdi-account </v-icon>
                  Address
                </v-tab>
                <v-tab
                  style="justify-content: flex-start; border-right: 1px solid"
                >
                  <v-icon left> mdi-lock </v-icon>
                  Contact Information
                </v-tab>
                <v-tab
                  style="justify-content: flex-start; border-right: 1px solid"
                >
                  <v-icon left> mdi-phone </v-icon>
                  Emergency Contact
                </v-tab>
                <v-tab
                  style="justify-content: flex-start; border-right: 1px solid"
                >
                  <v-icon left> mdi-plus </v-icon>
                  Private Information
                </v-tab>
                <v-tab
                  style="justify-content: flex-start; border-right: 1px solid"
                >
                  <v-icon left> mdi-minus </v-icon>
                  Work Identification
                </v-tab>

                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>

                      <p>
                        Nam ipsum risus, rutrum vitae, vestibulum eu, molestie
                        vel, lacus. Aenean tellus metus, bibendum sed, posuere
                        ac, mattis non, nunc. Aliquam lobortis. Aliquam
                        lobortis. Suspendisse non nisl sit amet velit hendrerit
                        rutrum.
                      </p>

                      <p class="mb-0">
                        Phasellus dolor. Fusce neque. Fusce fermentum odio nec
                        arcu. Pellentesque libero tortor, tincidunt et,
                        tincidunt eget, semper nec, quam. Phasellus blandit leo
                        ut odio.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Morbi nec metus. Suspendisse faucibus, nunc et
                        pellentesque egestas, lacus ante convallis tellus, vitae
                        iaculis lacus elit id tortor. Sed mollis, eros et
                        ultrices tempus, mauris ipsum aliquam libero, non
                        adipiscing dolor urna a orci. Curabitur ligula sapien,
                        tincidunt non, euismod vitae, posuere imperdiet, leo.
                        Nunc sed turpis.
                      </p>

                      <p class="mb-0">
                        Donec venenatis vulputate lorem. Aenean viverra rhoncus
                        pede. In dui magna, posuere eget, vestibulum et, tempor
                        auctor, justo. Fusce commodo aliquam arcu. Suspendisse
                        enim turpis, dictum sed, iaculis a, condimentum nec,
                        nisi.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>

                      <p>
                        Nam ipsum risus, rutrum vitae, vestibulum eu, molestie
                        vel, lacus. Aenean tellus metus, bibendum sed, posuere
                        ac, mattis non, nunc. Aliquam lobortis. Aliquam
                        lobortis. Suspendisse non nisl sit amet velit hendrerit
                        rutrum.
                      </p>

                      <p class="mb-0">
                        Phasellus dolor. Fusce neque. Fusce fermentum odio nec
                        arcu. Pellentesque libero tortor, tincidunt et,
                        tincidunt eget, semper nec, quam. Phasellus blandit leo
                        ut odio.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Morbi nec metus. Suspendisse faucibus, nunc et
                        pellentesque egestas, lacus ante convallis tellus, vitae
                        iaculis lacus elit id tortor. Sed mollis, eros et
                        ultrices tempus, mauris ipsum aliquam libero, non
                        adipiscing dolor urna a orci. Curabitur ligula sapien,
                        tincidunt non, euismod vitae, posuere imperdiet, leo.
                        Nunc sed turpis.
                      </p>

                      <p class="mb-0">
                        Donec venenatis vulputate lorem. Aenean viverra rhoncus
                        pede. In dui magna, posuere eget, vestibulum et, tempor
                        auctor, justo. Fusce commodo aliquam arcu. Suspendisse
                        enim turpis, dictum sed, iaculis a, condimentum nec,
                        nisi.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Fusce a quam. Phasellus nec sem in justo pellentesque
                        facilisis. Nam eget dui. Proin viverra, ligula sit amet
                        ultrices semper, ligula arcu tristique sapien, a
                        accumsan nisi mauris ac eros. In dui magna, posuere
                        eget, vestibulum et, tempor auctor, justo.
                      </p>
                      <p>
                        Fusce a quam. Phasellus nec sem in justo pellentesque
                        facilisis. Nam eget dui. Proin viverra, ligula sit amet
                        ultrices semper, ligula arcu tristique sapien, a
                        accumsan nisi mauris ac eros. In dui magna, posuere
                        eget, vestibulum et, tempor auctor, justo.
                      </p>
                      <p>
                        Fusce a quam. Phasellus nec sem in justo pellentesque
                        facilisis. Nam eget dui. Proin viverra, ligula sit amet
                        ultrices semper, ligula arcu tristique sapien, a
                        accumsan nisi mauris ac eros. In dui magna, posuere
                        eget, vestibulum et, tempor auctor, justo.
                      </p>
                      <p>
                        Fusce a quam. Phasellus nec sem in justo pellentesque
                        facilisis. Nam eget dui. Proin viverra, ligula sit amet
                        ultrices semper, ligula arcu tristique sapien, a
                        accumsan nisi mauris ac eros. In dui magna, posuere
                        eget, vestibulum et, tempor auctor, justo.
                      </p>
                      <p>
                        Fusce a quam. Phasellus nec sem in justo pellentesque
                        facilisis. Nam eget dui. Proin viverra, ligula sit amet
                        ultrices semper, ligula arcu tristique sapien, a
                        accumsan nisi mauris ac eros. In dui magna, posuere
                        eget, vestibulum et, tempor auctor, justo.
                      </p>

                      <p class="mb-0">
                        Cras sagittis. Phasellus nec sem in justo pellentesque
                        facilisis. Proin sapien ipsum, porta a, auctor quis,
                        euismod ut, mi. Donec quam felis, ultricies nec,
                        pellentesque eu, pretium quis, sem. Nam at tortor in
                        tellus interdum sagittis.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header expand-icon="mdi-minus">
              Employment
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-4">
              <v-tabs
                align-with-title
                background-color="honeydew"
                color="primary"
                show-arrows
                grow
                center-active 
                centered
                
              >
                <v-tab> Compensation </v-tab>
                <v-tab> Organization </v-tab>
                <v-tab> Position </v-tab>
                <v-tab> Status </v-tab>
                <v-tab> Work Eligibility </v-tab>

                <v-tab-item class="mt-4">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item class="mt-4">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item class="mt-4">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item class="mt-4">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item class="mt-4">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header expand-icon="mdi-minus">
              Payroll
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-4">
              <ul>
                <li>Compensation</li>
                <li>Organization</li>
                <li>Position</li>
                <li>Status</li>
                <li>Work Eligibility</li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "navbar",
  props: {
    personId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      // panel: (this.panel = [...Array(3).keys()].map((k, i) => i)),
      panel: [],
    };
  },
  methods: {
    viewResume() {
      window.open(
        "https://resumegenius.com/wp-content/uploads/Clean-Blank-Resume-Template-Gold.png"
      );
    },
  },
};
</script>

<style>
</style>