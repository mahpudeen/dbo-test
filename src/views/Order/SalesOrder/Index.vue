<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
             <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                name="search"
                                v-model="search"
                                prepend-inner-icon="mdi-magnify"
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                outlined
                                dense
                                filled
                            ></v-text-field>
                        </template>
                        <span>Search by customer</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        class="no-caps fs12"
                    >
                        Hide<v-icon right>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-else
                        class="no-caps fs12"
                    >
                        Show<v-icon right> mdi-chevron-down</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row :style="showFilter ?'margin-bottom:-24px':'display:none'">
                <v-col cols="12" md="3">
                    <v-select
                        v-model="statuses"
                        :items="status_items"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end"></v-col>
                <v-col class="d-flex justify-end h70">
                     <v-btn
                        depressed
                        color="#0087C2"
                        to="/sales-order/create"
                        class="no-caps mr20"
                    >
                        <span class="text-white">Create Sales Order</span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="table.fields"
                :items="table.items"
                :loading="loading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.item.order_code }}</td>
                        <td>{{ props.item.customer }}</td>
                        <td>{{ props.item.delivery_date }}</td>
                        <td>{{ props.item.area }}</td>
                        <td>{{ formatPrice(props.item.total) }}</td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    color="#C6EB93"
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-else-if="props.item.status == 2">
                                <v-chip
                                    color="#9DDCFF"
                                ><span class="pa-md-2">Finished</span></v-chip>
                            </div>
                            <div v-else-if="props.item.status == 3">
                                <v-chip
                                    color="#FF9D9D"
                                ><span class="pa-md-2"> Cancelled </span></v-chip>
                            </div>
                            <div v-else-if="props.item.status == 4">
                                <v-chip
                                    color="#E9EDEF"
                                ><span class="pa-md-2">Draft</span></v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="openModal(props.item, 'detail')">
                                        <v-list-item-title >Detail</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-app</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item :to="'/sales-order/update/'+props.item.id">
                                        <v-list-item-title>Update</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item @click="openModal(props.item, 'delete')">
                                        <v-list-item-title >Delete</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-app</v-icon></v-list-item-icon>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <v-dialog
            v-model="modal_detail"
            persistent
            scrollable
            max-width="951px"
        >
            <v-card style="border-radius: 15px;">
                <div class="d-flex justify-end pt-8 pr-8">
                    <v-btn
                        icon
                        @click="modal_detail = false"
                    >
                        <v-img src="./../../../assets/icon/close.png" max-height="24px" max-width="24px"></v-img>
                    </v-btn>
                </div>
                <v-card-title style="margin-top:-50px" class="d-flex justify-center">
                   <span class="fs20">Detail Sales Order</span>
                </v-card-title>
                <v-card-text>
                    <v-row class="mt-8">
                        <v-col cols="12" md="6" class="-mt24">
                            <DetailRow :name="'Order Code'" :value="item.order_code"/>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24">
                            <DetailRow :name="'Customer'" :value="item.customer"/>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24">
                            <DetailRow :name="'Delivery Date'" :value="item.delivery_date"/>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24">
                            <DetailRow :name="'Area'" :value="item.area"/>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24">
                            <DetailRow :name="'Total'" :value="formatPrice(item.total)"/>
                        </v-col>
                        <v-col cols="12" md="12" class="-mt24">
                            <DetailRow :name="'Note'" :value="item.note" :align="true"/>
                        </v-col>
                        <v-col cols="12" md="12" class="-mt24">
                            <DetailRow :name="'Address'" :value="item.address" :align="true"/>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="modal_delete"
            persistent
            max-width="470px"
        >
            <v-card>
                <v-card-title>
                    <span class="text-title-modal">Delete Sales Order</span>
                </v-card-title>
                <v-card-text>
                    <span class="fs16 mt-1">Are you sure want to delete this sales order?</span>
                </v-card-text>
                <v-card-actions class="pb-4">
                <v-spacer></v-spacer>
                    <v-btn
                        @click="modal_delete = false"
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                    >
                        <span class="text-black60">No</span>
                    </v-btn>
                    <v-btn
                        class="main-btn white--text"
                        depressed
                        color="#0087C2"
                        @click="deleteSO(item.id)"
                    >Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    import axios from 'axios'
    import DetailRow from '../../../components/DetailRow.vue'
    export default {
        name: "SalesOrder",
        components: {
            DetailRow
        },
        data() {
            return {
                showFilter : false,
                search: '',
                loading: false,
                statuses:999,
                status_items:[
                    {
                        text:'All Status',
                        value:999
                    },
                    {
                        text:'Active',
                        value:1
                    },
                    {
                        text:'Finished',
                        value:2
                    },
                    {
                        text:'Cancelled',
                        value:3
                    },
                    {
                        text:'Draft',
                        value:4
                    },
                ],
                table: {
                    fields: [
                        {
                            text: 'Order Code',
                            width: "10%",
                            class: 'grey--text text--darken-4',
                            sortable: false,
                        },
                        {
                            text: 'Customer',
                            width: "20%",
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                        {
                            text: 'Delivery Date',
                            width: "15%",
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                        {
                            text: 'Area',
                            width: "15%",
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                        {
                            text: 'Total',
                            width: "15%",
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                        {
                            text:'Status',
                            width: "10%",
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                        {
                            width: "5%",
                            class: 'grey--text text--darken-4',
                            sortable: false
                        },
                    ],
                    items: []
                },
                modal_detail: false,
                item :{
                    order_code: "",
                    customer: "",
                    delivery_date: "",
                    area: "",
                    total: "",
                    note: "",
                    id: "",
                    address: ""
                },
                modal_delete: false,
            }
        },
        mounted() {
            // The fetchJsonData method is called to fetch and prepare the data when the component is mounted.
            this.fetchJsonData()
        },
        methods: {
            // This method fetches JSON data from the server, filters it based on the search and status, and assigns it to the table items.
            async fetchJsonData() {
                try {
                    this.loading = true;
                    const response = await axios.get('/data/salesorder.json');
                    let filteredData = this.filterData(response.data, this.search, this.statuses);
                    this.table.items = filteredData
                    this.loading = false;
                } catch (error) {
                    console.error('Error fetching JSON data:', error);
                }
            },
            // This method filters the data based on the customer and status.
            filterData(data, customer, status) {
                if (status === 999) {
                    return data.filter(item => {
                        return item.customer.toLowerCase().includes(customer.toLowerCase());
                    });
                }
                return data.filter(item => {
                    return item.customer.toLowerCase().includes(customer.toLowerCase()) && item.status === status;
                });
            },
            // This method opens a modal. The type of modal (detail or delete) depends on the second argument.
            openModal(item, type){
                this.item = item
                if(type == 'detail'){
                    this.modal_detail = true
                }else{
                    this.modal_delete = true
                }
            },
            // This method formats the price value to a specific format.
            formatPrice(value) {
                let val = (value / 1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            // This method sends a delete request to the server for a specific sales order.
            async deleteSO(id){
                this.modal_delete = false
                try {
                    const response = await axios.delete('/data/salesorder.json', { params: { id: id } });
                    if (response.status === 200) {
                        this.fetchJsonData()
                    }
                } catch (error) {
                    console.error('Error delete data:', error);
                }
            }
        },
        watch: {
            // This watcher triggers the fetchJsonData method when the search data changes, with a delay of 1 second to prevent excessive requests.
            'search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchJsonData()
                    }, 1000);
                },
                deep: true
            },
            // This watcher triggers the fetchJsonData method immediately when the statuses data changes.
            'statuses': {
                handler: function (val) {
                    this.fetchJsonData()
                },
                deep: true
            },
        },
    }
</script>
