<template>
  <Card class="w-full max-w-[420px] bg-brand-card border-brand-border">
    <CardHeader>
      <CardTitle class="text-2xl text-center text-white">{{ name }}</CardTitle>
      <NuxtImg
        src="https://via.placeholder.com/300x200"
        class="w-full h-60 object-cover rounded"
      />
    </CardHeader>
    <CardContent>
      <ul class="flex flex-col gap-4 items-center justify-center text-lg">
        <li
          v-for="detail in detailsList"
          :key="detail.label"
          class="flex gap-2 text-white"
        >
          <component :is="detail.icon" class="text-brand-green" />
          {{ detail.value }}
        </li>

        <li
          v-for="amenity in amenitiesList"
          :key="amenity.key"
          class="flex gap-2 text-white"
        >
          <component :is="amenity.icon" class="text-brand-green" />
          {{ amenities.includes(amenity.key) ? amenity.label : "-" }}
        </li>
      </ul>
    </CardContent>
    <CardFooter class="flex flex-col">
      <Button class="w-full bg-brand-green" @click="goToReserve"
        >Reservar</Button
      >
    </CardFooter>
  </Card>
</template>
<script setup lang="ts">
import {
  AirVent,
  BedDouble,
  Beef,
  CircleParking,
  Dices,
  DollarSign,
  LetterText,
  MapPin,
  PersonStanding,
  Scan,
  Star,
  Toilet,
  Tv,
  Volleyball,
  WavesLadder,
  Wifi,
} from "lucide-vue-next";

const props = defineProps({
  isComparing: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  suite: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  amenities: {
    type: Array as () => string[],
    required: true,
  },
});

const detailsList = [
  { label: "Localização", value: props.location, icon: MapPin },
  { label: "Avaliação", value: props.rating, icon: Star },
  { label: "Descrição", value: props.description, icon: LetterText },
  { label: "Preço", value: `${props.price}/noite`, icon: DollarSign },
  { label: "Área", value: `${props.area}m²`, icon: Scan },
  {
    label: "Capacidade",
    value: `Capacidade para ${props.guests} hóspedes`,
    icon: PersonStanding,
  },
  {
    label: "Banheiros",
    value: `${props.bathrooms} banheiro${props.bathrooms > 1 ? "s" : ""}`,
    icon: Toilet,
  },
  {
    label: "Quartos",
    value: `${props.rooms} quarto${props.rooms > 1 ? "s" : ""}${
      props.suite > 0
        ? `, sendo ${props.suite} suíte${props.suite > 1 ? "s" : ""}`
        : ""
    }`,
    icon: BedDouble,
  },
];

const amenitiesList = [
  { key: "Estacionamento", label: "Estacionamento", icon: CircleParking },
  { key: "TV", label: "TV", icon: Tv },
  { key: "Wi-Fi", label: "Wi-Fi", icon: Wifi },
  { key: "Ar condicionado", label: "Ar condicionado", icon: AirVent },
  { key: "Piscina", label: "Piscina", icon: WavesLadder },
  { key: "Acesso à praia", label: "Acesso à praia", icon: Volleyball },
  { key: "Churrasqueira", label: "Churrasqueira", icon: Beef },
  { key: "Mesa de bilhar", label: "Mesa de bilhar", icon: Dices },
];

const goToReserve = () => {
  navigateTo(`/reserve/${props.id}`);
};
</script>
