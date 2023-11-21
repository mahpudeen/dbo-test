<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row style="margin-top:24px">
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="code"
                        v-model="form.code"
                        required
                        outlined
                        disabled
                        :dense="true"
                        :error-messages="error.code"
                    >
                        <template v-slot:label>
                            Code<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="name"
                        v-model="form.name"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.name"
                    >
                        <template v-slot:label>
                            Name<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="phone_number"
                        v-model="form.phone_number"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.phone_number"
                    >
                        <template v-slot:label>
                            Phone Number<span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="archetype"
                        v-model="form.archetype"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.archetype"
                    >
                        <template v-slot:label>
                            Archetype <span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="salesperson"
                        v-model="form.salesperson"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.salesperson"
                    >
                        <template v-slot:label>
                            Salesperson <span class="text-red">*</span>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <v-text-field
                        name="price_set"
                        v-model="form.price_set"
                        required
                        outlined
                        :dense="true"
                        :error-messages="error.price_set"
                    >
                        <template v-slot:label>
                            Price Set<span class="text-red">*</span>
                        </template>
                    </v-text-field>
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
                <v-col cols="12" class="-mt24">
                    <v-textarea
                        name="address"
                        v-model="form.address"
                        :counter="100"
                        maxlength="100"
                        outlined
                        label="Address"
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
        name: "UpdateCustomer",
        data() {
            return {
                form: {
                    name:'',
                    phone_number:'',
                    archetype:'',
                    salesperson:'',
                    price_set:'',
                    area:'',
                    status:'',
                    address:''
                },
                error: {},
            }
        },
        created() {
            // The getCustomer method is called with the id parameter from the route to fetch the specific customer when the component is created.
            this.getCustomer(this.$route.params.id);
        },
        methods: {
            // This method fetches the specific customer based on the provided id.
            async getCustomer(id) {
                try {
                    // Make a GET request to fetch the data
                    const response = await axios.get('/data/customer.json');
                    
                    if (response.status === 200) {
                        let customer = response.data.find(customer => customer.id === id);
                        let form = customer;
                        form.archetype = customer.archetype.name;
                        form.salesperson = customer.salesperson.name;
                        form.price_set = customer.price_set.name;
                        form.area = customer.area.name;
                        this.form = form;
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
                if (!this.form.name) {
                    this.$set(this.error, 'name', 'Name is required.');
                }
                if (!this.form.phone_number) {
                    this.$set(this.error, 'phone_number', 'Phone Number is required.');
                }
                if (!this.form.archetype) {
                    this.$set(this.error, 'archetype', 'Archetype is required.');
                }
                if (!this.form.salesperson) {
                    this.$set(this.error, 'salesperson', 'Salesperson is required.');
                }
                if (!this.form.price_set) {
                    this.$set(this.error, 'price_set', 'Price Set is required.');
                }
                if (!this.form.area) {
                    this.$set(this.error, 'area', 'Area is required.');
                }
                if (Object.keys(this.error).length === 0) {
                    this.updateMethod(this.form.id);
                }
            },
            async updateMethod(id) {
                this.$router.push('/customer'); // Delete this line if you want to use the below code
                try {
                    // Make a POST request to save the form data
                    const response = await axios.put('/api/customer/update/'+id, this.form);
                    
                    // Handle the response as per your requirement
                    console.log(response.data);
                    if (response.status === 200) {
                        this.$router.push('/customer');
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
