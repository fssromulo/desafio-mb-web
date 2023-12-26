<script>
export default {
    props: {
        person: {
            type: Object,
            default: () => { }
        },
        showTypePerson: {
            type: Boolean,
            default: true
        },
    },
}
</script>

<template>
    <div id="emailTypePersonContainer">
        <div class="fieldsContainer">
            <label for="pf">Endereço de e-mail:</label>
            <input type="email" v-model="person.email" required />
        </div>
        <div class="fieldsContainer alignRadioButton" v-show="showTypePerson">
            <input type="radio" id="pf" name="typePersonField" value="pf" v-model="person.typePerson" required>
            <label for="pf">Pessoa física</label> &nbsp;
            <input type="radio" id="pj" name="typePersonField" value="pj" v-model="person.typePerson" required>
            <label for="pj">Pessoa jurídica</label><br>
        </div>
    </div>
</template>