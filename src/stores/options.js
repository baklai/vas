import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import useLocalStorage from '@/service/LocalStorage';

const DEFAULT_MSG_WELCOME = "Мої вітання! Я на зв'язку!";
const DEFAULT_MSG_GOODBYE = 'Всього найкращого!';

export const useOptions = defineStore('options', () => {
  const spinner = ref(false);
  const sensor = ref(false);
  const waver = ref(false);

  const token = ref(useLocalStorage('api-token', ''));
  const startup = ref(useLocalStorage('app-startup', true));
  const autostart = ref(useLocalStorage('app-autostart', true));
  const msgWelcome = ref(useLocalStorage('msg-welcome', DEFAULT_MSG_WELCOME));
  const msgWelcomeStatus = ref(useLocalStorage('msg-welcome-status', true));
  const msgGoodbye = ref(useLocalStorage('msg-goodbye', DEFAULT_MSG_GOODBYE));
  const msgGoodbyeStatus = ref(useLocalStorage('msg-goodbye-status', true));

  const isSpinner = computed(() => spinner.value);
  const isSensor = computed(() => sensor.value);
  const isWaver = computed(() => waver.value);

  const isToken = computed(() => token.value);

  const isAutostart = computed(() => {
    return autostart.value;
  });

  const isMsgWelcomeStatus = computed(() => msgWelcomeStatus.value && msgWelcome.value.length);

  const isMsgGoodbyeStatus = computed(() => msgGoodbyeStatus.value && msgGoodbye.value.length);

  function getToken() {
    return token.value;
  }

  function setToken(value) {
    token.value = value;
  }

  function setMsgWelcome(value) {
    msgWelcome.value = value;

    if (!value.length) {
      msgWelcomeStatus.value = false;
    }
  }

  function setMsgGoodbye(value) {
    msgGoodbye.value = value;

    if (!value.length) {
      msgGoodbyeStatus.value = false;
    }
  }

  function setAnimation(value = 'off') {
    switch (value) {
      case 'spinner':
        waver.value = false;
        sensor.value = false;

        spinner.value = true;
        break;
      case 'sensor':
        waver.value = false;
        spinner.value = false;

        sensor.value = true;
        break;
      case 'waver':
        sensor.value = false;
        spinner.value = false;

        waver.value = true;
        break;
      default:
        waver.value = false;
        sensor.value = false;
        spinner.value = false;
        break;
    }
  }

  return {
    startup,
    autostart,
    msgWelcome,
    msgWelcomeStatus,
    msgGoodbye,
    msgGoodbyeStatus,

    isWaver,
    isSensor,
    isSpinner,

    isToken,
    isAutostart,
    isMsgWelcomeStatus,
    isMsgGoodbyeStatus,

    getToken,
    setToken,

    setMsgWelcome,
    setMsgGoodbye,

    setAnimation
  };
});
