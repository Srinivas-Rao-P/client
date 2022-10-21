<template>
    <v-row no-gutters class="fill-height tile">
        <v-col cols="12" v-if="type == 'link'" class="tile-header-drag">
            <v-card height="100%" flat color="primary" elevation="4">
                <div class="link-header no-drag">
                    <div class="white--text font-weight:bold">
                        tileTitle
                    </div>
                    <div class="link-delete-icon">
                        <v-btn color="white" @click="deleteTile" icon x-small class="no-background-hover">
                            <v-icon small color="white">mdi-delete</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-col>

        <v-col cols="12" v-else>
            <v-card height="100%" flat :style="{border: '2px solid #195f73'}">
                <div class="tile-header tile-header-drag">
                    <div class="tile-title">
                        {{tileTitle}}
                    </div>
                    <div class="tile-delete-icon no-drag">
                        <v-btn @click="deleteTile" icon x-small class="no-background-hover">
                            <v-icon small>mdi-delete</v-icon>
                        </v-btn>
                    </div>

                </div>
                <v-row no-gutters style="height:80%">
                    <v-col cols="12" align-self="center" class="text-center">
                        <div class="tile-content">
                            <slot name="tileContent"></slot>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>

    </v-row>
</template>

<script>
export default {
    name:"tileIndex",
    props:{
        tileTitle: String,
        link: String,
        borderColor: {type: Boolean, default: false},
        type: {type: String, default: "link"}
    },
    methods:{
        deleteTile() {
            this.$emit("delete")
        },
        timeEnteries() {
            console.log("time enteries")
        },
    },
    // created(){
    //     getTimeClock()
    // }
}
</script>

<style scoped>
.tile .tile-header,
.tile .link-header {
    display: flex;
    padding: 4px 2px 4px 8px;
}

.tile .tile-header .tile-title {
    width: calc(100% - 20px);
    align-self: center;
}

.tile .tile-header .tile-delete-icon,
.tile .link-header .link-delete-icon {
    width: 20px;
    margin-left: auto;
}

.tile .tile-content {
    padding: 8px;
}
</style>