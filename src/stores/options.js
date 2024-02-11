import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const DEFAULT_MSG_WELCOME = "Мої вітання! Я на зв'язку!";
const DEFAULT_MSG_GOODBYE = 'Всього найкращого!';

export const useOptions = defineStore('options', () => {
  const spinner = ref(false);
  const sensor = ref(false);
  const waver = ref(false);

  const token = ref(localStorage.getItem('api-token') || null);
  const startup = ref(localStorage.getItem('app-startup') || true);
  const autostart = ref(localStorage.getItem('app-autostart') || true);
  const msgWelcome = ref(localStorage.getItem('msg-welcome') || DEFAULT_MSG_WELCOME);
  const msgWelcomeStatus = ref(localStorage.getItem('msg-welcome-status') || true);
  const msgGoodbye = ref(localStorage.getItem('msg-goodbye') || DEFAULT_MSG_GOODBYE);
  const msgGoodbyeStatus = ref(localStorage.getItem('msg-goodbye-status') || true);

  const isSpinner = computed(() => spinner.value);
  const isSensor = computed(() => sensor.value);
  const isWaver = computed(() => waver.value);

  const isToken = computed(() => token.value);

  const isAutostart = computed(() => autostart.value);
  const isMsgWelcomeStatus = computed(() => msgWelcomeStatus.value && msgWelcome.value.length);
  const isMsgGoodbyeStatus = computed(() => msgGoodbyeStatus.value && msgGoodbye.value.length);

  function getToken() {
    return token.value;
  }

  function setToken(value) {
    token.value = value;
    localStorage.setItem('api-token', value);
  }

  function setStartup(value) {
    startup.value = value;
    localStorage.setItem('app-startup', value);
  }

  function setAutostart(value) {
    autostart.value = value;
    localStorage.setItem('app-autostart', value);
  }

  function setMsgWelcome(value) {
    msgWelcome.value = value;
    localStorage.setItem('msg-welcome', value);

    if (!value.length) {
      setMsgWelcomeStatus(false);
    }
  }

  function setMsgWelcomeStatus(value) {
    msgWelcomeStatus.value = value;
    localStorage.setItem('msg-welcome-status', value);
  }

  function setMsgGoodbye(value) {
    msgGoodbye.value = value;
    localStorage.setItem('msg-goodbye', value);

    if (!value.length) {
      setMsgGoodbyeStatus(false);
    }
  }

  function setMsgGoodbyeStatus(value) {
    msgGoodbyeStatus.value = value;
    localStorage.setItem('msg-goodbye-status', value);
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

    setStartup,
    setAutostart,

    setMsgWelcome,
    setMsgWelcomeStatus,

    setMsgGoodbye,
    setMsgGoodbyeStatus,

    setAnimation
  };
});
