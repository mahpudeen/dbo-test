<template>
<div class="second-color">
    <div v-if="align== true">
        <div class="row">
            <div class="col text-black60">{{name}} :</div>
        </div>
        <div class="row" style="margin-top:-16px">
            <div class="col text-black">{{value}}</div>
        </div>
        <v-divider class="my-3"/>
    </div>
    <div v-else>
        <div class="row">
            <div class="col-5 text-black60">{{name}} :</div>
            <div class="col d-flex justify-end text-black">{{value}}</div>
        </div>
        <v-divider class="my-3"/>
    </div>
</div>
</template>
<script>
export default {
    name : "DetailRow",
    props : {
        name : "",
        value : "",
        align : true
    }
}
</script>