<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row style="margin-top:24px">
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="order_code"
                        v-model="form.order_code"
                        required
                        outlined
                        disabled
                        :dense="true"
                        :error-messages="error.order_code"
                    >
                        <template v-slot:label>
                            Order Code<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="supplier"
                        v-model="form.supplier"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.supplier"
                    >
                        <template v-slot:label>
                            Supplier<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col><v-col cols="12" md="6" class="-mt24">
                    <v-menu
                        ref="menu"
                        v-model="eta_date_model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-text-field
                                    name="eta_date"
                                    prepend-inner-icon="mdi-calendar"
                                    outlined
                                    :dense="true"
                                    clearable
                                    :error-messages="error.eta_date"
                                    @click:clear="form.eta_date = ''"
                                    v-model="form.eta_date"
                                    maxlength="10"
                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                                >
                                    <template v-slot:label>Estimated Arrival Date<span class="text-red">*</span></template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            v-model="form.eta_date"
                            @input="eta_date_model = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="warehouse"
                        v-model="form.warehouse"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.warehouse"
                    >
                        <template v-slot:label>
                            Warehouse<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="total"
                        v-model="form.total"
                        required
                        outlined
                        :dense="true"
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                        :error-messages="error.total"
                    >
                        <template v-slot:label>
                            Total<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <v-textarea
                        name="note"
                        v-model="form.note"
                        :counter="100"
                        maxlength="100"
                        outlined
                        label="Note"
                        dense
                        rows="3"
                    />
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row>
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                        >
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            depressed
                            color="#0087C2"
                            class="main-btn white--text"
                            @click="validateForm()"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>
    import axios from 'axios';
    export default {
        name: "UpdatePurchaseOrder",
        data() {
            return {
                form: {
                    supplier: "",
                    eta_date: "",
                    warehouse: "",
                    total: "",
                    note: ""
                },
                eta_date_model: false,
                error: {},
            }
        },
        created() {
            // The getPurchaseOrder method is called with the id parameter from the route to fetch the specific purchase order when the component is created.
            this.getPurchaseOrder(this.$route.params.id);
        },
        methods: {
            // This method fetches the specific purchase order based on the provided id.
            async getPurchaseOrder(id) {
                try {
                    // Make a GET request to fetch the data
                    const response = await axios.get('/data/purchaseorder.json');
                    
                    if (response.status === 200) {
                        let purchaseorder = response.data.find(purchaseorder => purchaseorder.id === id);
                        this.form = purchaseorder;
                    }
                } catch (error) {
                    // Handle any errors that occur during the request
                    console.error(error);
                }
            },
            // This method validates the form fields. If a field is empty, it adds an error message to the 'error' object for that field.
            // If there are no errors (i.e., all required fields are filled), it calls the 'createMethod' to proceed with the form submission.
            validateForm() {
                this.error = {};
                if (!this.form.supplier) {
                    this.$set(this.error, 'supplier', 'Supplier is required.');
                }
                if (!this.form.eta_date) {
                    this.$set(this.error, 'eta_date', 'Estimated arrival date is required.');
                }
                if (!this.form.warehouse) {
                    this.$set(this.error, 'warehouse', 'Warehouse is required.');
                }
                if (!this.form.total) {
                    this.$set(this.error, 'total', 'Total is required.');
                }
                if (Object.keys(this.error).length === 0) {
                    this.createMethod();
                }
            },
            async createMethod() {
                this.$router.push('/purchase-order'); // Delete this line if you want to use the below code
                try {
                    // Make a POST request to save the form data
                    const response = await axios.post('/api/purchase-order/create', this.form);
                    
                    // Handle the response as per your requirement
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push('/purchase-order');
                    }
                    
                    // Reset the form after successful submission
                    this.form = {
                        name: '',
                        phone_number: '',
                        archetype: '',
                        salesperson: '',
                        price_set: '',
                        area: '',
                        status: '',
                        address: ''
                    };
                } catch (error) {
                    // Handle any errors that occur during the request
                    console.error(error);
                }
            }
        },
    }
</script>
