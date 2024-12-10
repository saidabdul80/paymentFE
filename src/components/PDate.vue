<template>
  <label :class="[` tw-block tw-capitalize tw-text-gray-700 tw-text-sm tw-font-semibold`]" v-if="label !== ''">
          {{ label }}
          <span v-if="isRequired" class="tw-text-red-600">*</span>
      </label>
  <div class="date-range-picker tw-relative " :class="'tw-h-['+height+'] '+ 'tw-w-['+width+']'">
    <InputText
      :class="width?'tw-w-['+width+']':''"
      class="tw-absolute tw-z-10 tw-left-0 tw-top-0"
      :pt="{ root: { class: [noborder?'tw-border-none tw-rounded-none tw-w-full':'', 'tw-h-['+height+']']} }"
      v-model="displayValue"
      @click="toggleDropdown"
      readonly
      :placeholder="placeholder"
    />
    <Select v-show="isDropdownVisible" ref="dpSelect" class="!tw-relative tw-invisible !tw-inline-flex tw-top-0 tw-left-0" :pt="{emptyMessage:{class:'tw-p-1'}}">
      <template #header>
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2">
          <DatePicker
            @click.stop="()=>{}"
            :pt="{panel:{class:' tw-border-none'}, dayCell:{style:'width:21px height:21px; font-size:16px; padding:0px'}}"
            label="Start Date"
            class="tw-w-full"
            :inline="true"
            dateFormat="yy-mm-dd"
            v-model="startDate"
            :placeholder="startPlaceholder"
            :maxDate="maxDate"
            @date-select="onStartDateChange"
            height="340px"
          />
          <DatePicker
           @click.stop="()=>{}"
            :pt="{panel:{class:' tw-border-none'},dayCell:{style:'width:21px height:21px; font-size:16px; padding:0px'}}"
            dateFormat="yy-mm-dd"
            :inline="true"
            height="340px"
            label="End Date"
            v-model="endDate"
            :placeholder="endPlaceholder"
            :minDate="startDate"
            :maxDate="maxDate"
            @date-select="onEndDateChange"
          />
        </div>
      </template>
      <template #empty>
        <div v-if="isInvalidRange" style="color: red;">
          End date must be after start date.
        </div>
        <h3 v-else class="tw-text-center tw-p-3">Select Date Range</h3>
      </template>
    </Select>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import { useGlobalsStore } from '@/stores/globals';


export default {
  name: 'DateRangePicker',
  components: {
    InputText,
    Select,
    DatePicker,
    Button,
  },
  props: {
    width:{
      default:'200px'
    },
    modelValue: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select Date Range',
    },
    startPlaceholder: {
      type: String,
      default: 'Start Date',
    },
    endPlaceholder: {
      type: String,
      default: 'End Date',
    },
    maxDate: {
      type: Date,
      default: null,
    },
    dateFormat: {
      type: String,
      default: 'yy-mm-dd',
    },
    noborder:{
      type:Boolean,
      default:false
    },
    label:{
      type:String,
      default:''
    },  
    isRequired:{
      type:Boolean,
      default:false
    },
    height:{
      default:'38px'
    }
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      isDropdownVisible: false,
      global: useGlobalsStore(),
      displayValue:null,
      months:{
        '01':'Jan',
        '02':'Feb',
        '03':'Mar',
        '04':'Apr',
        '05':'May',
        '06':'Jun',
        '07':'Jul',
        '08':'Aug',
        '09':'Sep',
        '10':'Oct',
        '11':'Nov',   
        '12':'Dec',
      }
    };
  },
  computed: {
   
    // displayValue() {
     
    // },
    isInvalidRange() {
      return this.startDate && this.endDate && new Date(this.startDate) > new Date(this.endDate);
    },
  },
  methods: {
    isDate(value) {
      // Regular expression to match YYYY-MM-DD format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      // Check if the value matches the date format
      if (!dateRegex.test(value)) {
        return false;
      }

      // Further validation to check if it's a real date
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    formatDate(date, o=false) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      if(o){
        return [year, month, day].join('-');
      }
      return day+' '+this.months[month]+' '+year.toString().slice(2,4);
      //return [year,this.months[month], day].join('-');
    },
    openD() {
      this.$refs.dpSelect.show();
    },
    toggleDropdown() {
      this.openD();
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    onStartDateChange(date) {
      this.displayValue= `${this.formatDate(this.startDate)} ⇢`
      if (this.endDate && new Date(date) > new Date(this.endDate)) {
        this.endDate = null;
      }
    },
    onEndDateChange(date) {
      let start = this.formatDate(this.startDate,true);
      let end = this.formatDate(this.endDate,true);
      //this.global.filters.date = [start, end];
      this.confirmSelection();

      this.$emit('update:modelValue', [start, end]);
      this.$emit('change', [start, end]);
      start = this.formatDate(this.startDate,false);
      end = this.formatDate(this.endDate,false);
      this.displayValue = `${start} ⇢ ${end}`;
    },
    confirmSelection() {
      if (this.$refs.dpSelect) {
        this.$refs.dpSelect.hide();
        this.isDropdownVisible = false;
      }
    },
  },
  created() {
    if (this.modelValue && this.modelValue.length > 1 &&  this.isDate(this.modelValue[0]) && this.isDate(this.modelValue[1]) ) {
      this.startDate = new Date(this.modelValue[0]) || null;
      this.endDate = new Date(this.modelValue[1]) || null;
      let start = this.formatDate(this.startDate);
      let end = this.formatDate(this.endDate);
      this.displayValue = `${start} ⇢ ${end}`;
    }else{
      // const today = new Date();
      // const monthlyStartDate = formatISO(startOfMonth(today), { representation: 'date' });
      // const monthlyEndDate = formatISO(endOfMonth(today), { representation: 'date' });
      // this.startDate = startOfMonth || null;
      // this.endDate = new Date() || null;
      // let start = this.formatDate(this.startDate);
      // let end = this.formatDate(this.endDate);
    //  this.displayValue = `${start} ⇢ ${end}`;
    }
  },
  watch: {
 
    modelValue: {
      deep: true,
      handler(newValue) {
        if (newValue && newValue.length > 1) {
          this.startDate = new Date(newValue[0]) || null;
          this.endDate = new Date(newValue[1]) || null;
          let start = this.formatDate(this.startDate);
          let end = this.formatDate(this.endDate);
          this.displayValue = `${start} ⇢ ${end}`;
        }
      },
    },
  },
};
</script>

<style scoped>
.date-range-picker {
  position: relative;
  /* width: 200px; Adjust as necessary */
}

.flex {
  display: flex;
}

.gap-4 {
  gap: 1rem;
}
td.p-datepicker-day-cell span {
  height: 21px !important;
  width: 23px !important;
  font-size: 16px !important;
}
</style>
