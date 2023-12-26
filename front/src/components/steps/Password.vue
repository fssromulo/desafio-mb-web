<script>
export default {
    props: {
        person: {
            type: Object,
            default: () => { }
        },
    },
}
</script>

<template>
    <div class="passwordContainer">
        <div class="fieldsContainer">
            <label for="pf">Sua senha</label>
            <input type="password" id="password" name="password" v-model="person.password" required>
        </div>
    </div>
</template>