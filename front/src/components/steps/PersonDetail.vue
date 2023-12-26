<script>
import { computed } from 'vue';
export default {
    props: {
        person: {
            type: Object,
            default: () => { }
        },
    },
    setup(props) {
        const labelBasedOnPersonType = computed(() => {
            const { typePerson } = props.person;
            const labelForNaturalPerson = {
                "name": 'Nome',
                "cpfCnpj": 'CPF',
                "dateField": 'Data de nascimento',
            }

            const labelForEntityPerson = {
                "name": 'Razão social',
                "cpfCnpj": 'CNPJ',
                "dateField": 'Data de abertura',
            }

            return typePerson === 'pf' ? labelForNaturalPerson : labelForEntityPerson;
        });

        return {
            labelBasedOnPersonType
        }
    }
}
</script>

<template>
    <div class="personDetailContainer">
        <div class="fieldsContainer">
            <label for="name">{{ labelBasedOnPersonType.name }}</label>
            <input type="text" id="name" v-model="person.name" required>
        </div>
        <div class="fieldsContainer">
            <label for="cpf">{{ labelBasedOnPersonType.cpfCnpj }}</label>
            <input type="text" id="cpf" name="cpf" v-model="person.cpfCnpj" required>
        </div>
        <div class="fieldsContainer">
            <label for="birthday">{{ labelBasedOnPersonType.dateField }}</label>
            <input type="date" id="birthday" name="birthday" v-model="person.birthday" required>
        </div>
        <div class="fieldsContainer">
            <label for="phone">Telefone</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="person.phone" required>
        </div>
    </div>
</template>