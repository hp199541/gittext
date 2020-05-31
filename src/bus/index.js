import Vue from 'vue'
import { addGA } from '@/utils/assist'
export default new Vue({
  data () {
    return {
      loading: { // loading dialog
        show: false,
        opacity: false
      },
      toast: {
        show: false,
        isMsg: false,
        text: ''
      },
      transify: {
        RULES:'RULES',
        COMMON_BACK: 'back',
        COMMON_CANCEL: 'cancel',
        COMMON_CONFIRM: 'confirm',
        COMMON_CONTINUE_PURCHASE: 'continue to buy',
        COMMON_HISTORY_DRAW: '',
        COMMON_HISTORY_PURCHASE: '',
        COMMON_HISTORY_REDEEM: '',
        COMMON_NO: 'no',
        COMMON_PURCHASE: 'purchase',
        COMMON_PURCHASED: 'purchased',
        COMMON_QUANTITY_MAX: 'max',
        COMMON_TIPS_ITEM: 'the rewards will be sent directly to your vault',
        COMMON_YES: 'Yes',
        POPUP_NO_REMIND: "Don't remind me again",
        POPUP_TITLE_REDEEM: 'Congratulation! You got',
        POPUP_TITLE_UNIQUE: 'The unique items you owe',
        UNIQUE_BUY_ALREADY_HAVE:
          'You already own this item, if you purchase it again, it will be converted to FF tokens.',
        UNIQUE_BUY_ALREADY_HAVE_PART:
          'You already owe some of the item(s) you selected. If you purchase again, you will receive FF tokens instead.',
        UNIQUE_REDEEM_ALREADY_HAVE:
          'You already own this item, if you receive it again, it will be converted to FF tokens.',
        TOAST_ERROR_CODE: 'unknown error, error code {code}',
        TOAST_EVENT_CLOSED_AWHILE: 'The event is closed temporary',
        TOAST_EVENT_END: 'Event ended',
        TOAST_EVENT_NOTOPEN: "event hasn't started",
        TOAST_GEM_NOT_ENOUGH: 'insufficient diamonds, please top up and come back again',
        TOAST_LOGIN_FAILED: 'login failed',
        TOAST_NETWORK_BUSY: 'Server busy, please try again later',
        TOAST_NETWORK_ERROR: 'Network connection error, please try again later',
        TOAST_OPERATE_BUSY: 'Too many requests, please try again later',
        TOAST_PAY_FAILED: 'purchase failed',
        TOAST_SERVER_BUSY: '',
        TOAST_SERVER_NOTWORK: 'service unavailable',
        TOAST_SERVER_TIMEOUT: 'service timeout',
        TOAST_WRONG_REGION: 'This event is not available for your region'
      }
    }
  },
  methods: {
    addGA (event, msg) { // google 统计
      addGA(event, msg)
    },
    /**
     * 错误处理
     * @param {String} errCode 错误码
     *
     */
    handleError (errCode) {
      // TODO 错误信息提示窗
      this.handleToast(true, errCode, true)
      addGA('msgError', errCode)
    },
    handleToast (bool, text, isMsg = false) { // toast
      this.toast.show = bool
      this.toast.text = this.transify[text] || this.transify['TOAST_NETWORK_ERROR']
      this.toast.isMsg = isMsg
    },
    handleLoading (bool, opacity, delay) { // loading
      if (bool === true) {
        this.loading.opacity = opacity
        this.loading.show = bool
      } else {
        setTimeout(() => {
          this.loading.show = bool
          this.loading.opacity = opacity
        }, delay)
      }
    },
  }
})
