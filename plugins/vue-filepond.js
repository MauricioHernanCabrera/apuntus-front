import Vue from 'vue';
import vueFilePond from 'vue-filepond';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
const FilePond = vueFilePond(FilePondPluginFileValidateType);

Vue.component('FilePond', FilePond);
