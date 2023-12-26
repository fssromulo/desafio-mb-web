<template>
  <div class="mainContainer">
    <div class="formContainer">

      <!-- indicador de etapa -->
      <div class="stepsIndicators">Etapa <span style="color:orange">{{ currentIdStep }}</span> de {{ stepsList.length }}
      </div>

      <!-- titulo da Etapa -->
      <div class="stepsTitle">
        <h2> {{ stepTitle }} </h2>
      </div>

      <!-- campos do formulário -->
      <div class="stepsFieldsForm">
        <component :is="currentStep(currentIdStep).component" :person="person"></component>
      </div>
      <!-- Botões de ação -->
      <div class="stepsButtons">
        <button :disabled="isLoading" class="btn btnPrevious" v-if="currentIdStep > 1" type="button"
          @click="previousStep">Voltar</button> &nbsp;
        <button :disabled="isLoading" class="btn btnNext" type="button" @click="nextStep">
          {{ nexButtonTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import EmailTypePersonField from './components/steps/EmailTypePersonField.vue';
import Password from './components/steps/Password.vue';
import PersonDetail from './components/steps/PersonDetail.vue';
import ReviewInformations from './components/steps/ReviewInformations.vue';

export default {
  components: {
    EmailTypePersonField,
    PersonDetail,
    Password,
    ReviewInformations,
  },
  setup() {
    const stepsList = [
      {
        id: 1,
        component: EmailTypePersonField,
      },
      {
        id: 2,
        component: PersonDetail,
      },
      {
        id: 3,
        component: Password,
      },
      {
        id: 4,
        component: ReviewInformations,

      }
    ];
    const currentIdStep = ref(1);

    const isLoading = ref(false);

    const person = ref({
      email: null,
      typePerson: null,
      cpfCnpj: null,
      phone: null,
      birthday: null,
      password: null,
      name: null
    });

    const requiredFieldsBySteps = [
      {
        step: 1,
        fields: ['email', 'typePerson']
      },
      {
        step: 2,
        fields: ['name', 'cpfCnpj', 'birthday', 'phone']
      },
      {
        step: 3,
        fields: ['password']
      }
    ]

    function isFormValid() {
      const idCurrentStep = currentIdStep.value;
      const currentlyPersonState = person.value;
      if (![1, 2, 3].includes(idCurrentStep)) {
        return true;
      }
      const requiredFieldInCurrentStep = requiredFieldsBySteps.filter((item) => item.step === idCurrentStep);
      const { fields } = requiredFieldInCurrentStep[0] ?? [];
      return fields.every(element => (currentlyPersonState[element] && !!currentlyPersonState[element].length));
    }

    async function registrationPerson() {
      isLoading.value = true;
      const response = await fetch('http://localhost:3001/registration', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(person.value),
      });
      isLoading.value = false;

      const responseData = await response.json();
      if (response.status === 200) {
        alert('Cadastro realizado!');
        location.reload();
      }

      if (response.status === 400) {
        alert(responseData.message);
      }
    }

    async function nextStep() {
      if (!isFormValid()) {
        alert("Preencha os campos do formulário corretamente!");
        return;
      }

      if (currentIdStep.value === 4) {
        await registrationPerson();
        return;
      }

      let maxStep = stepsList.length;
      let newValue = currentIdStep.value + 1;
      if (newValue >= maxStep) {
        newValue = maxStep;
      }
      currentIdStep.value = newValue;
    }

    function previousStep() {
      let minStep = 1;
      let newValue = currentIdStep.value - 1;
      if (newValue < minStep) {
        newValue = minStep;
      }
      currentIdStep.value = newValue;
    }

    const currentStep = (id) => {
      const step = stepsList.filter(step => step.id === id);
      return step[0];
    };

    const nexButtonTitle = computed(() => {
      return currentIdStep.value < 4 ? 'Continuar' : 'Cadastrar';
    });

    const stepTitle = computed(() => {
      const titlesList = {
        1: 'Seja bem vindo(a)',
        2: 'Pessoa Física',
        3: 'Senha de acesso',
        4: 'Revise suas informações',
      };

      let title = titlesList[currentIdStep.value];
      const isEntityPerson = currentIdStep.value === 2 && person.value.typePerson === 'pj';
      if (isEntityPerson) {
        title = 'Pessoa Jurídica';
      }
      return title;
    });

    return {
      stepsList,
      currentStep,
      currentIdStep,
      nextStep,
      previousStep,
      person,
      stepTitle,
      nexButtonTitle,
      isLoading
    }
  }
}
</script>

