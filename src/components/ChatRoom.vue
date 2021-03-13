<template>
  <div>
    <div class="broadcast-online" v-if="isBroadcastOnline">
      <span class="broadcast-online-text">{{ chatData.name }} 上線</span>
    </div>
    <div class="broadcast-offline" v-if="isBroadcastOffline">
      <span class="broadcast-offline-text">{{ chatData.name }} 離線</span>
    </div>
    <div class="message-other" v-if="isMessageOther">
      <img class="avatar" :src="chatData.avatar" />
      <span>{{ chatData.message }}</span>
      <span>{{ chatData.time | fromNow }}</span>
    </div>
    <div class="message-self" v-if="isMessageSelf">
      <span>{{ chatData.message }}</span>
      <span>{{ chatData.time | fromNow }}</span>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'
export default {
  name: 'ChatRoom',
  mixins: [fromNowFilter],
  props: {
    chatData: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      messageType: this.chatData.MessageType,
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
  height: 40px;
  text-align: center;
}

.broadcast-online-text,
.broadcast-offline-text {
  width: auto;
  line-height: 50px;
  padding: 0 10px 0 10px;
  color: #657786;
  border-radius: 50px;
  background: #eee;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>