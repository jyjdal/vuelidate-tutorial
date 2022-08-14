<template>
  <v-app>
    <v-main class="d-flex align-center">
      <v-form>
        <v-text-field
          v-model="formData.name"
          placeholder="Name"
          variant="solo"
          class="v-col-4 offset-4"
          :error-messages="nameErrors"
        ></v-text-field>
        <v-text-field
          v-model="formData.email"
          placeholder="Email"
          variant="solo"
          class="v-col-4 offset-4"
          :error-messages="emailErrors"
        ></v-text-field>
        <v-text-field
          v-model="formData.password.password"
          placeholder="Password"
          variant="solo"
          type="password"
          class="v-col-4 offset-4"
          :error-messages="passwordPasswordErrors"
        ></v-text-field>
        <v-text-field
          v-model="formData.password.confirmation"
          placeholder="Confirmation"
          variant="solo"
          type="password"
          class="v-col-4 offset-4"
          :error-messages="passwordConfirmationErrors"
        ></v-text-field>
        <v-text-field
          v-model="formData.identity"
          placeholder="Identity"
          variant="solo"
          class="v-col-4 offset-4"
          :error-messages="identityErrors"
        ></v-text-field>
      </v-form>
      <v-btn
        class="v-col-4 offset-4"
        @click="submitForm"
        :disabled="submitButtonDisabled"
        >Submit
      </v-btn>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import {
  email,
  maxLength,
  required,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const formData = reactive({
  name: "",
  email: "",
  password: {
    password: "",
    confirmation: "",
  },
  identity: "",
});

// 定义身份证号的正则表达式
const identityRegex =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

// 定义校验器
const identity = (value: string) => {
  return identityRegex.test(value);
};

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("姓名是必填项！", required),
      maxLength: helpers.withMessage("长度不能超过10！", maxLength(10)),
    },
    email: { required, email },
    password: {
      password: { required },
      confirmation: {
        required,
        sameAsPassword: sameAs(formData.password.password),
      },
    },
    identity: {
      required,
      identity: helpers.withMessage("身份证不是合法的格式！", identity),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitButtonDisabled = computed(() => {
  v$.value.$validate();
  return v$.value.$error;
});

const identityErrors = computed<Array<string>>(() => {
  let errors: Array<string> = [];
  v$.value.identity.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const nameErrors = computed<Array<string>>(() => {
  let errors: Array<string> = [];
  v$.value.name.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const emailErrors = computed<Array<string>>(() => {
  let errors: Array<string> = [];
  v$.value.email.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const passwordPasswordErrors = computed<Array<string>>(() => {
  let errors: Array<string> = [];
  v$.value.password.password.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const passwordConfirmationErrors = computed<Array<string>>(() => {
  let errors: Array<string> = [];
  v$.value.password.confirmation.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

function submitForm() {
  v$.value.$validate();
  if (!v$.value.$error) {
    alert("Form submitted!");
  }
}
</script>
