<template>
  <div>
    <div class="broadcast-online" v-if="isBroadcastOnline">
      <span class="broadcast-online-text">{{ chatData.name }} 上線</span>
    </div>
    <div class="broadcast-offline" v-if="isBroadcastOffline">
      <span class="broadcast-offline-text">{{ chatData.name }} 離線</span>
    </div>
    <div class="message-other-wrapper" v-if="isMessageOther">
      <img class="avatar" :src="chatData.avatar" />
      <div class="message-other-message">
        <div class="message-other-text-wrapper">
          <span class="message-other-text">{{ chatData.message }}</span>
        </div>
        <span class="message-time">{{ chatData.time }}</span>
      </div>
    </div>
    <div class="message-self-wrapper" v-if="isMessageSelf">
      <div class="message-self">
        <div class="message-self-text-wrapper">
          <span class="message-self-text">{{ chatData.message }}</span>
        </div>
        <div class="message-self-time">
          <div class="message-time">{{ chatData.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
export default {
  name: 'ChatRecordRoom',
  mixins: [fromNowFilter],
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      messageType: this.chatData.messageType,
      isBroadcastOnline: false,
      isBroadcastOffline: false,
      isMessageOther: false,
      isMessageSelf: false,
    }
  },
  created() {
    this.handleData()
  },
  methods: {
    handleData() {
      switch (this.messageType) {
        case 'broadcast-online':
          this.isBroadcastOnline = true
          this.isBroadcastOffline = false
          this.isMessageOther = false
          this.isMessageSelf = false
          break
        case 'broadcast-offline':
          this.isBroadcastOnline = false
          this.isBroadcastOffline = true
          this.isMessageOther = false
          this.isMessageSelf = false
          break
        case 'message-other':
          this.isBroadcastOnline = false
          this.isBroadcastOffline = false
          this.isMessageOther = true
          this.isMessageSelf = false
          break
        case 'message-self':
          this.isBroadcastOnline = false
          this.isBroadcastOffline = false
          this.isMessageOther = false
          this.isMessageSelf = true
          break
      }
    },
  },
}
</script>

<style scoped>
.broadcast-online,
.broadcast-offline {
  height: 50px;
  text-align: center;
}

.broadcast-online-text,
.broadcast-offline-text {
  line-height: 50px;
  padding: 0 10px 0 10px;
  color: #657786;
  border-radius: 50px;
  background: #eee;
}

.avatar {
  margin-bottom: 25px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.message-other-wrapper {
  display: flex;
  align-items: flex-end;
}

.message-other-message {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.message-other-text-wrapper,
.message-self-wrapper {
  align-items: center;
  padding: 15px 20px 15px 20px;
}

.message-other-message,
.message-self {
  max-width: 300px;
}

.message-other-text-wrapper {
  background: #e6ecf0;
  border-radius: 30px 20px 20px 0;
}

.message-self-text-wrapper {
  padding: 15px;
  background: #ff6600;
  border-radius: 20px 20px 0 30px;
}

.message-self-text {
  max-width: 200px;
  color: #fff;
}

.message-time {
  color: #657786;
}

.message-self-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-self-time {
  display: flex;
  justify-content: flex-end;
}
</style>
