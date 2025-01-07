<template>
  <div>
    <NuxtLink to="/hotels" class="mr-auto">
      <CircleChevronLeft :size="40" fill="#24da8d" />
    </NuxtLink>

    <h1 class="text-3xl font-bold my-6 text-white">Checkout</h1>
    <div
      class="grid gap-4 lg:grid-cols-[2fr_1fr] grid-cols-1 w-full max-w-screen-lg"
    >
      <div>
        <div class="grid grid-cols-1 gap-4 w-full">
          <FullName v-model="form.name.value" :error="form.name.error" />
          <Email v-model="form.email.value" :error="form.email.error" />
          <Cpf v-model="form.cpf.value" :error="form.cpf.error" />
          <PhoneNumber v-model="form.phone.value" :error="form.phone.error" />
          <div class="flex w-full gap-4">
            <CreditCardNumber
              v-model="form.cardNumber.value"
              :error="form.cardNumber.error"
              class="w-full"
            />
            <CreditCardExpiryDate
              v-model="form.expiryDate.value"
              :error="form.expiryDate.error"
            />
            <CreditCardCvc v-model="form.cvc.value" :error="form.cvc.error" />
          </div>
          <CreditCardInstallment
            v-if="hotel?.price"
            v-model="form.installment.value"
            :installments="installments"
            :price="hotel.price"
            :error="form.installment.error"
          />
        </div>
      </div>
      <Card v-if="hotel" class="w-full bg-brand-card border-brand-border">
        <CardHeader>
          <NuxtImg
            :src="hotel.photo"
            alt="Imagem do hotel"
            class="w-full h-40 object-cover rounded mb-4"
          />
          <h2 class="text-xl font-bold text-white">{{ hotel.name }}</h2>
          <p class="text-white">{{ hotel.location }}</p>
          <p class="text-white">
            {{ hotel.rooms }} quartos &bull; {{ hotel.capacity }} hóspedes
          </p>
        </CardHeader>
        <CardContent>
          <ul class="mt-4 text-lg">
            <li class="flex justify-between items-center text-white">
              <p>Preço</p>
              <p>{{ formatCurrency(hotel.price) }}</p>
            </li>
            <li class="flex justify-between items-center text-white">
              <p>Taxas</p>
              <p>{{ selectedInstallment.tax }}%</p>
            </li>
            <li class="flex justify-between items-center text-white">
              <strong>Total</strong>
              <strong>
                {{ formatCurrency(total) }}
              </strong>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            class="w-full bg-brand-green hover:bg-brand-green-hover"
            @click="submitReservation"
          >
            Finalizar Reserva
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";
import { CircleChevronLeft } from "lucide-vue-next";

import Cpf from "@ng_consult/core/components/form/Cpf.vue";
import Email from "@ng_consult/core/components/form/Email.vue";
import FullName from "@ng_consult/core/components/form/FullName.vue";
import PhoneNumber from "@ng_consult/core/components/form/PhoneNumber.vue";
import CreditCardNumber from "@ng_consult/core/components/form/CreditCardNumber.vue";
import CreditCardCvc from "@ng_consult/core/components/form/CreditCardCvc.vue";
import CreditCardExpiryDate from "@ng_consult/core/components/form/CreditCardExpiryDate.vue";
import CreditCardInstallment from "@ng_consult/core/components/form/CreditCardInstallment.vue";

import formatCurrency from "@ng_consult/core/utils/format/formatCurrency";
import calculateInstallmentValue from "@ng_consult/core/utils/calc/calculateInstallmentValue";
import { useValidation } from "@ng_consult/core/composables/useValidation";
import { useForm } from "@ng_consult/core/composables/useForm";
import { useReservationStore } from "../../store/useReservationStore";

interface Hotel {
  id: number;
  name: string;
  price: number;
  photo: string;
  location: string;
  rooms: number;
  capacity: number;
}

const installments = [
  { installment: 1, tax: 0 },
  { installment: 2, tax: 8.5 },
  { installment: 3, tax: 10.5 },
  { installment: 4, tax: 12.5 },
];

const {
  requiredRule,
  emailRule,
  cpfRule,
  phoneRule,
  creditCardRule,
  expiryDateRule,
  cvcRule,
} = useValidation();

const { form, validateForm } = useForm([
  {
    name: "name",
    initialValue: "",
    rules: [requiredRule],
  },
  {
    name: "cpf",
    initialValue: "",
    rules: [requiredRule, cpfRule],
  },
  {
    name: "email",
    initialValue: "",
    rules: [requiredRule, emailRule],
  },
  {
    name: "phone",
    initialValue: "",
    rules: [requiredRule, phoneRule],
  },
  {
    name: "cardNumber",
    initialValue: "",
    rules: [requiredRule, creditCardRule],
  },
  {
    name: "expiryDate",
    initialValue: "",
    rules: [requiredRule, expiryDateRule],
  },
  {
    name: "cvc",
    initialValue: "",
    rules: [requiredRule, cvcRule],
  },
  {
    name: "installment",
    initialValue: "0",
    rules: [
      (value) =>
        isNaN(Number(value)) || Number(value) < 0 ? "Parcela inválida." : "",
    ],
  },
]);

const selectedInstallment = computed(() => {
  const installmentIndex = Number(form.installment.value);
  return installments[installmentIndex] ?? { tax: 0, installment: 1 };
});

const route = useRoute();
const { startMockUpdates } = useMockReservationUpdates();
const reservationStore = useReservationStore();

const hotel = ref<Hotel | null>(null);
const total = computed(() => {
  return (
    selectedInstallment.value.installment *
    calculateInstallmentValue(
      hotel.value!.price,
      selectedInstallment.value.tax,
      selectedInstallment.value.installment
    )
  );
});

onMounted(async () => {
  try {
    const response = await $fetch<Hotel>(`/api/hotels/${route.params.id}`);
    hotel.value = response;
  } catch (error) {
    console.error(error);
    navigateTo("/hotels");
  }
});

const submitReservation = async () => {
  if (!validateForm()) return;

  try {
    const reservationId = Date.now().toString();
    const reservation = {
      id: reservationId,
      hotelName: hotel.value!.name,
      date: new Date().toISOString(),
      status: "Reserva em andamento",
    };

    reservationStore.addReservation(reservation);

    startMockUpdates(reservationId, reservation.hotelName);

    await $fetch("/api/reservations", {
      method: "POST",
      body: {
        ...Object.fromEntries(
          Object.entries(form).map(([k, v]) => [k, v.value])
        ),
        hotelId: route.params.id,
        total: total.value.toFixed(2),
      },
    });

    toast.success("Reserva concluída com sucesso!");
    setTimeout(() => {
      navigateTo("/hotels");
    }, 1500);
  } catch (error) {
    console.error(error);
    toast.error("Erro ao finalizar reserva.");
  }
};
</script>
