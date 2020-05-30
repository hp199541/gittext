const data = {
  "status": "success",
  "msg": "",
  "data": {
    "player": {
      "uid": 112312312,
      "gems": 9999,
      "refresh_count": 0,
      "free_refresh_count": 0,
      "can_refresh": true,
      "init": true
    },
    "common_config": {
      "start_time": 1589177409,
      "end_time": 1590387009,
      "region_lang": "US",
      "region": "US",
      "lang": "es",
      "rule": "<p>garena1111</p>",
      "refresh_cost": 10,
      "refresh_count": 10,
      "free_refresh_count": 3,
      "flip_1_cost": 50,
      "flip_2_cost": 80,
      "flip_3_cost": 100
    },
    "rewards": [{
        "item_id": 0,
        "item_name": "name name namename namename ",
        "item_num": 10,
        "item_img": "https://freefiremobile-a.akamaihd.net/common/web_event/common/images/item_1.png",
        "pool": 1,
        "status": 0
      },
      {
        "item_id": 1,
        "item_name": "name namename namename  namename namename ",
        "item_num": 10,
        "item_img": "https://freefiremobile-a.akamaihd.net/common/web_event/common/images/item_2.png",
        "pool": 2,
        "status": 0
      },
      {
        "item_id": 2,
        "item_name": "name",
        "item_num": 1,
        "item_img": "https://freefiremobile-a.akamaihd.net/common/web_event/common/images/item_3.png",
        "pool": 3,
        "status": 0
      }
    ],
    "transify": {
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
      COMMON_RULE: 'Rule',
      POPUP_NO_REMIND: "Don't remind me again",
      POPUP_TITLE_REDEEM: 'Congratulation! You got',
      POPUP_TITLE_UNIQUE: 'The unique items you owe',
      UNIQUE_BUY_ALREADY_HAVE: 'You already own this item, if you purchase it again, it will be converted to FF tokens.',
      UNIQUE_BUY_ALREADY_HAVE_PART: 'You already owe some of the item(s) you selected. If you purchase again, you will receive FF tokens instead.',
      UNIQUE_REDEEM_ALREADY_HAVE: 'You already own this item, if you receive it again, it will be converted to FF tokens.',
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
      TOAST_WRONG_REGION: 'This event is not available for your region',
      FLIP_TITLE: 'flip card',
      FLIP_CARD_POOL: 'card pool',
      FLIP_REFRESH: 'refresh',
      FLIP_SHUFFLE_HINT: 'shuffle firstly, flip cards and get items !',
      FLIP_SKIP_ANIMATION: 'skip the animation',
      FLIP_FREE: 'free',
      FLIP_GEM_NOT_ENOUGH: 'insufficient diamonds, please top up and come back again',
      FLIP_REFRESH_DONE: 'refresh done',
      FLIP_TOAST_1: 'refresh successfully',
      FLIP_REFRESH_DBCHECK: 'Are you sure to spend {cost} diamonds to refresh the prize pool?',
      FLIP_CONFIRM: 'confirm',
      FLIP_FLIP: 'flip',
      FLIP_GEM_CONFIRM: 'spend {gem num} gem to flip?',
      FLIP_HISTORY: 'history',
      FLIP_REFRESH_POOL: 'refresh pool',
      FLIP_CONGRATULATIONS: 'congratulations',
      FLIP_REFRESH_ALL_POOL: 'All products have been displayed',
      FLIP_COST: 'flip card need:'
    }
  }
}

module.exports = {
  url: '/api/info',
  type: 'get',
  response: config => {
    return data
  }
}
