<template>
    <h2 class="tw-text-md tw-text-gray-800 tw-mb-3">{{ title }}</h2>
    <div v-if="isUrl || disabled" class="tw-flex  tw-border tw-rounded-md tw-items-center tw-py-0">
        <div class="tw-text-end tw-font-bold tw-text-green-900 hover:tw-text-green-700 ">
            <span class=" tw-px-3 tw-text-md">
                {{ title }}:
            </span>
            <v-btn @click="show = true" class="tw-bg-bg-900" variant="text">Preview</v-btn>
        </div>
        <div v-if="!disabled" class="tw-text-end tw-font-bold tw-text-green-900 hover:tw-text-green-700">
            <v-btn  @click="edit" variant="text">Edit</v-btn>
        </div>
    </div>
    <div v-else>
        <div @drop.prevent="handleFileDrop" @dragover.prevent
            :class="errorMessage ? 'tw-border-red-500' : 'tw-border-gray-300'"
            class="tw-rounded-lg tw-border tw-flex tw-justify-center tw-flex-col tw-items-center tw-border-dashed tw-p-6 tw-text-center hover:tw-bg-gray-100 tw-cursor-pointer">
            <input type="file" :accept="acceptedFormats" @change="handleFileUpload" class="tw-hidden" ref="fileInput" />
            <div @click="triggerFileInput" class="tw-flex tw-justify-center  tw-flex-col tw-items-center tw-w-full">
                <img src="@/assets/cloud.svg" alt="Upload Icon" />
                <p class="tw-text-sm" >Drag and drop or Click to upload</p>
                <!-- <p class="tw-text-xs">PDF, JPG or PNG file up to 20mb</p> -->
            </div>
            <p class="tw-text-gray-400 tw-text-sm">{{ fileHint }}</p>
            <p v-if="errorMessage" class="tw-text-red-500 tw-text-sm tw-mt-2">{{ errorMessage }}</p>
            <p v-if="selectedFileName" class="tw-text-gray-600 tw-mt-4">Selected file: {{ selectedFileName }}</p>
            <img v-if="filePreview" :src="filePreview" alt="File Preview" class="tw-mt-4 tw-max-h-48 tw-object-contain" />
        </div>
    </div>
    <p v-if="selectedFileName == '' " class="tw-text-gray-500 tw-text-xs tw-mt-2 tw-items-center tw-flex">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.1664 9.83937L8.99138 11.0144C8.34138 11.6644 8.34138 12.7227 8.99138 13.3727C9.64138 14.0227 10.6997 14.0227 11.3497 13.3727L13.1998 11.5227C14.4998 10.2227 14.4998 8.11439 13.1998 6.80605C11.8998 5.50605 9.79139 5.50605 8.48306 6.80605L6.46641 8.82271C5.34974 9.93937 5.34974 11.7477 6.46641 12.8644"
                stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M7.50032 18.3371H12.5003C16.667 18.3371 18.3337 16.6704 18.3337 12.5037V7.50374C18.3337 3.33708 16.667 1.67041 12.5003 1.67041H7.50032C3.33366 1.67041 1.66699 3.33708 1.66699 7.50374V12.5037C1.66699 16.6704 3.33366 18.3371 7.50032 18.3371Z"
                stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        </svg> No file added
    </p>

    <Dialog modal v-model:visible="show" :draggable="false" :pt="{
        root: { class: ' tw-border-0 tw-shadow-md z-index-[9101]', style: 'z-index:9101' }
        }"
        class=" tw-w-[90%] md:tw-w[80%] lg:tw-w-[900px]" :closable="true">
        <template #header>
            <b>
                {{ title }}
            </b>
            <div class="tw-text-end tw-font-bold tw-text-green-900 hover:tw-text-green-700">
                <v-btn class="tw-bg-bg-900" @click="zoom(-1)" variant="text" icon="ph ph-magnifying-glass-minus"></v-btn>
                <v-btn class="tw-bg-bg-900" @click="zoom(1)" variant="text" icon="ph ph-magnifying-glass-plus"></v-btn>
            </div>
        </template>

        <iframe v-if="intervalValue && checkFileType === 'pdf'" :style="iframeStyle" :src="intervalValue" class="tw-w-full" style="height: 70vh; border: none;"></iframe>
        <div v-else-if="intervalValue && checkFileType === 'image'" :style="iframeStyle" style="height: 70vh; transition: all 0.3s;">
            <img :src="intervalValue" style="width: 100%;">
        </div>
    </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';

export default {
    components: {
        Dialog,
    },
    props: {
        title: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: '',
        },
        acceptedFormats: {
            type: String,
            default: ".pdf, .jpg, .png",
        },
        maxFileSize: {
            type: Number,
            default: 10485760, // 10MB
        },
        buttonText: {
            type: String,
            default: "Browse file",
        },
        fileHint: {
            type: String,
            default: "PDF, JPG or PNG file up to 20mb",
        },
        errorMessages: {
            type: Object,
            default: () => ({}),
        },
        modelValue: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selectedFileName: '',
            filePreview: '',
            errorMessage: '',
            show: false,
            selected:false,
            intervalValue: this.modelValue,
            zoomSize: 1,
            width: 800,
            height: 600,
        };
    },
    watch:{
        modelValue:function(newVal){
            this.createFilePreview(newVal);
        }
    },
    created(){
      this.createFilePreview(this.modelValue);
    },
    methods: {
        edit() {
            this.old = this.intervalValue;
            this.intervalValue = '';
        },
        zoom(direction) {
            if (direction === -1) {
                this.zoomSize *= 1.08;
                this.width *= 1.08;
                this.height *= 1.08;
            } else {
                this.zoomSize *= 0.9;
                this.width *= 0.9;
                this.height *= 0.9;
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            this.uploadFile(file);
        },
        handleFileDrop(event) {
            const file = event.dataTransfer.files[0];
            this.uploadFile(file);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        uploadFile(file) {
            if (file && this.isValidFile(file)) {
                this.errorMessage = '';
                this.selectedFileName = file.name;
                this.createFilePreview(file);
                this.$emit('file-selected', file);
                this.$emit('update:modelValue', file);
            }
        },
        isValidFile(file) {
            if (file.size > this.maxFileSize) {
                this.errorMessage = 'File size exceeds the maximum limit.';
                return false;
            }
            if (!this.isValidFormat(file)) {
                this.errorMessage = 'Invalid file format.';
                return false;
            }
            return true;
        },
        isValidFormat(file) {
            const acceptedFormatsArray = this.acceptedFormats.split(',').map(format => format.trim());
            return acceptedFormatsArray.some(format => file.name.endsWith(format));
        },
        createFilePreview(file) {
            if (file?.type?.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.filePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.filePreview = '';
            }
        },
    },
    computed: {
        iframeStyle() {
            return {
                transform: `scale(${this.zoomSize})`,
                transformOrigin: 'top left',
                width: `${this.width}px`,
                height: `${this.height}px`,
            };
        },
        checkFileType() {
            if (this.intervalValue.match(/\.(jpeg|jpg|gif|png)$/)) {
                return 'image';
            }
            if (this.intervalValue.match(/\.(pdf)$/)) {
                return 'pdf';
            }
            return '';
        },
        isUrl() {
            return this.modelValue.length > 0;
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(newValue) {
                if (newValue !== this.intervalValue) {
                    this.intervalValue = newValue;
                }
            }
        }
    }
};
</script>

<style scoped>
.upload-btn {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #f9f9f9;
    transition: background-color 0.3s;
}

.upload-btn:hover {
    background-color: #f0f0f0;
}
</style>
