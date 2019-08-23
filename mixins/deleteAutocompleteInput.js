import { randomString } from '@/helpers/random';

export default {
  mounted() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.autocomplete = randomString(30);
      input.name = randomString(30);
    });
  }
};
