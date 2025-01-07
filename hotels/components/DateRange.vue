<script setup lang="ts">
import type { DateRange } from "radix-vue";

import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";

const df = new DateFormatter("pt-BR", {
  dateStyle: "medium",
});

const todayDate = new Date();
const todayMonth = todayDate.getMonth() + 1;
const todayYear = todayDate.getFullYear();
const todayDay = todayDate.getDate();

const value = ref({
  start: new CalendarDate(todayYear, todayMonth, todayDay),
  end: new CalendarDate(todayYear, todayMonth, todayDay).add({ days: 20 }),
}) as Ref<DateRange>;

const emits = defineEmits<{
  (e: "update:modelValue", payload: typeof value): void;
}>();

watch(value, () => {
  emits("update:modelValue", value);
});
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full md:w-fit">
    <Label class="text-white">Check-in - Check-out</Label>
    <Popover>
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          :class="`
          justify-start text-left font-normal
          ${!value ? 'text-muted-foreground' : ''}
        `"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          <template v-if="value.start">
            <template v-if="value.end">
              {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(value.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(value.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else> Escolha uma data </template>
        </Button>
      </PopoverTrigger>
      <LazyPopoverContent class="w-auto p-0">
        <LazyRangeCalendar
          v-model="value"
          initial-focus
          :number-of-months="2"
          @update:start-value="(date: DateValue | undefined) => {
            if (date) {
              value.start = date;
            }
          }"
        />
      </LazyPopoverContent>
    </Popover>
  </div>
</template>
