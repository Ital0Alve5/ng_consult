<script setup lang="ts">
import formatCurrency from "@ng_consult/core/utils/format/formatCurrency";
import calculateInstallmentValue from "@ng_consult/core/utils/calc/calculateInstallmentValue";

defineProps({
  price: {
    type: Number,
    required: true,
  },
  installments: {
    type: Array as () => { installment: number; tax: number }[],
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
});
const emits = defineEmits<{
  (e: "update:modelValue", payload: number): void;
}>();
</script>

<template>
  <div>
    <Label class="text-white">Parcelas</Label>
    <Select
      @update:model-value="
        (value: string) => emits('update:modelValue', Number.parseInt(value))
      "
    >
      <SelectTrigger>
        <SelectValue
          :placeholder="`1x de ${formatCurrency(price)}.Total: ${formatCurrency(
            price
          )}`"
        />
      </SelectTrigger>
      <LazySelectContent>
        <LazySelectGroup>
          <LazySelectItem
            v-for="(installment, index) in installments"
            :key="installment.installment"
            :value="String(index)"
          >
            {{ installment.installment }}x de
            {{
              formatCurrency(
                calculateInstallmentValue(
                  price,
                  installment.tax,
                  installment.installment
                )
              )
            }}. Total:
            {{
              formatCurrency(
                installment.installment *
                  calculateInstallmentValue(
                    price,
                    installment.tax,
                    installment.installment
                  )
              )
            }}
          </LazySelectItem>
        </LazySelectGroup>
      </LazySelectContent>
    </Select>

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>
