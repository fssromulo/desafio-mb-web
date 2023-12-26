<script>
import EmailTypePersonField from './EmailTypePersonField.vue';
import PersonDetail from './PersonDetail.vue';
import Password from './Password.vue';

export default {
    components: {
        EmailTypePersonField,
        PersonDetail,
        Password
    },
    props: {
        person: {
            type: Object,
            default: () => { }
        },
    },
}
</script>

<template>
    <div class="">
        <EmailTypePersonField :person="person" :showTypePerson="false"/>
        <PersonDetail :person="person" />
        <Password :person="person" :readOnly="true" />
    </div>
</template>