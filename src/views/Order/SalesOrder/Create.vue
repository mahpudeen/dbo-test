<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row style="margin-top:24px">
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="customer"
                        v-model="form.customer"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.customer"
                    >
                        <template v-slot:label>
                            Customer<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col><v-col cols="12" md="6" class="-mt24">
                    <v-menu
                        ref="menu"
                        v-model="delivery_date_model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-text-field
                                    name="delivery_date"
                                    prepend-inner-icon="mdi-calendar"
                                    outlined
                                    :dense="true"
                                    clearable
                                    :error-messages="error.delivery_date"
                                    @click:clear="form.delivery_date = ''"
                                    v-model="form.delivery_date"
                                    maxlength="10"
                                    onkeypress="return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 45"
                                >
                                    <template v-slot:label>Delivery date<span class="text-red">*</span></template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            v-model="form.delivery_date"
                            @input="delivery_date_model = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="area"
                        v-model="form.area"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.area"
                    >
                        <template v-slot:label>
                            Area<span class="text-red">*</span>
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
                <v-col cols="12" class="-mt24">
                    <v-textarea
                        name="address"
                        v-model="form.address"
                        :counter="100"
                        maxlength="100"
                        outlined
                        required
                        label="Address"
                        dense
                        rows="3"
                        :error-messages="error.address"
                    >
                        <template v-slot:label>
                            Address<span class="text-red">*</span>
                        </template>
                    </v-textarea>
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
                            Create
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
        name: "CreateSalesOrder",
        data() {
            return {
                form: {
                    customer: "",
                    delivery_date: "",
                    area: "",
                    total: "",
                    note: "",
                    address: ""
                },
                delivery_date_model: false,
                error: {},
            }
        },
        methods: {
            // This method validates the form fields. If a field is empty, it adds an error message to the 'error' object for that field.
            // If there are no errors (i.e., all required fields are filled), it calls the 'createMethod' to proceed with the form submission.
            validateForm() {
                this.error = {};
                if (!this.form.customer) {
                    this.error.customer = "Customer is required";
                }
                if (!this.form.delivery_date) {
                    this.error.delivery_date = "Delivery date is required";
                }
                if (!this.form.area) {
                    this.error.area = "Area is required";
                }
                if (!this.form.total) {
                    this.error.total = "Total is required";
                }
                if (!this.form.address) {
                    this.error.address = "Address is required";
                }
                if (Object.keys(this.error).length === 0) {
                    this.createMethod();
                }
            },
            async createMethod() {
                this.$router.push('/sales-order'); // Delete this line if you want to use the below code
                try {
                    // Make a POST request to save the form data
                    const response = await axios.post('/api/sales-order/create', this.form);
                    
                    // Handle the response as per your requirement
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push('/sales-order');
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
