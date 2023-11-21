<template>
    <section>
        <v-navigation-drawer enable-resize-watcher :permanent="modeDesktop" v-model="drawer" app color="#2B3739" width="220" height="100%" :dark="true">
            <div class="pt-2"/>
            <v-list class="fs13">
                <v-list-item>
                    <img src="./../assets/img/DBO_Logo_White.png" width="90%" height="90%" class="pl-md-3">
                </v-list-item>
                <div class="pt-3"/>
                <div v-for="(item, idx) in navbar_menu" :key="idx">
                    <div v-if="!item.child">
                        <v-list-item color="#FFFFFF" :to="item.url">
                            <v-list-item-icon class="p-icon-nav" style="margin-right:14px">
                                <v-icon>{{item.icon}}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title class="fs13">{{item.title}}</v-list-item-title>
                        </v-list-item>
                    </div>
                    <div v-else>
                        <v-list-group :value="activeRoute(item.child)" color="#FFFFFF">
                            <template v-slot:activator>
                                <v-list-item-icon class="p-icon-nav" style="margin-right:14px">
                                    <v-icon>{{item.icon}}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title class="fs13">{{item.title}}</v-list-item-title>
                            </template>
                            <div>
                                <div v-for="(child, idx) in item.child" :key="idx">
                                    <v-list-item :to="child.url" >
                                        <v-list-item-content class="p-icon-nav" style="margin-right:14px">{{child.title}}</v-list-item-content>
                                    </v-list-item>
                                    <div class="hr-navbar-new"/>
                                </div>
                            </div>
                        </v-list-group>
                    </div>
                </div>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="white" flat class="fs14" dense>
            <v-btn icon v-if="!modeDesktop" @click.stop="drawer = !drawer">
                <img src="./../assets/icon/menu.png">
            </v-btn>
            <v-toolbar-title class="nav-title"> {{routeName}}</v-toolbar-title>
            <div class="flex-grow-1 men" ></div>
            <v-btn
                v-if="modeDesktop"
                class="no-caps fs14 mr-2"
                text
                name="logout-btn"
                color="#768F9C"
                @click="signoutButtonPressed"
                outlined
            >
                <v-icon left>
                    mdi-power
                </v-icon>
               <span class="fs13">Logout</span>
                    
            </v-btn>

            <v-card-actions v-else @click.stop="drawerRight = !drawerRight">
                <v-list-item style="margin-right:-28px">
                    <v-menu offset-y >
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <img src="./../assets/icon/polygon.png">
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item  @click="signoutButtonPressed">
                            <v-list-item-content>
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    </v-menu>
                </v-list-item>
            </v-card-actions>
        </v-app-bar>
    </section>
</template>
<script>
    export default {
        data: () => ({
            drawer: null,
            drawerRight: null,
            dark_mode:false,
            modeDesktop : null,
            navbar_menu: [
                {
                    child: null,
                    url: "/home",
                    icon: "mdi-home",
                    title: "Home"
                },
                {
                    child: null,
                    url: "/customer",
                    icon: "mdi-account-circle",
                    title: "Customer"
                },
                {
                    child: [
                        {
                            url: "/sales-order",
                            title: "Sales Order"
                        },
                        {
                            url: "/purchase-order",
                            title: "Purchase Order"
                        }
                    ],
                    icon: "mdi-cart",
                    title: "Order"
                }
            ]
        }),
        methods: {
            // The activeRoute method checks if the current route path includes the URL of any child routes.
            // If it does, it returns true, indicating that the route is active.
            activeRoute(child) {
                let value = false
                child.forEach(e => {
                    if (this.$route.path.includes(e.url)) {
                        value = true
                    }
                });
                return value
            },
            // The signoutButtonPressed method dispatches the 'logout' action and redirects the user to the login page.
            signoutButtonPressed() {
                this.$store.dispatch('logout');
                this.$router.push({ name: "login" });
            }
        },
        mounted(){
            // If the screen width is greater than 960, it sets modeDesktop to true, otherwise it sets it to false.
            window.onresize = () => {
                if (window.screen.width > 960) {
                    this.modeDesktop = true
                } else {
                    this.modeDesktop = false
                }
            }
        },
        created () {
            // If the screen width is greater than 960, it sets modeDesktop to true, otherwise it sets it to false.
            if (window.screen.width > 960) {
                this.modeDesktop = true
            } else {
                this.modeDesktop = false
            }
        },
        computed: {
            // The routeName computed property returns the title metadata of the current route.
            routeName() {
                return this.$route.meta.title;
            }
        }
    };
</script>
<style scoped>
.v-list .v-list-item--active {
    color: #FFFFFF;
    background-image: url("./../assets/img/bg_navbar_new.png");
    background-position: left;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
}
.p-icon-nav {
    margin-right:14px
}
</style>
