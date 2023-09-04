<template>
  <div class="chat-window">
    <div class="message-container" ref="messageContainer">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message }}
      </div>
    </div>
    <input v-model="inputMessage" @keyup.enter="sendMessage" class="input-box" placeholder="Type your message..."/>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      inputMessage: "",
      messages: [],
    };
  },
  mounted() {
    this.socket = io("http://localhost:8080/push/user/79"); // Replace with your Spring Boot backend URL
    this.socket.on("connect", (connect) => {
      this.messages.push(connect);
      this.scrollToBottom();
    });
  },
  methods: {
    sendMessage() {
      if (this.inputMessage.trim() !== "") {
        this.socket.emit("message", this.inputMessage);
        this.messages.push("You: " + this.inputMessage);
        this.inputMessage = "";
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
    }
    //      //监听本次连接回调函数
    //   socket.on('connect', function () {
    //     isConnected =true;
    //     console.log("连接成功");
    //     serverOutput('<span class="connect-msg"><font color="blue">'+getNowTime()+'&nbsp;</font>连接成功</span>');
    //     errorCount=0;
    //   });
    //   //监听消息
    //   socket.on('message', function (data) {
    //     output('<span class="connect-msg"><font color="blue">'+getNowTime()+'&nbsp;</font>' + data + ' </span>');
    //     console.log(data);
    //   });
    //
    //   //监听断开
    //   socket.on('disconnect', function () {
    //     isConnected =false;
    //     console.log("连接断开");
    //     serverOutput('<span class="disconnect-msg"><font color="blue">'+getNowTime()+'&nbsp;</font>' + '已下线! </span>');
    //   });
    //   //监听断开错误
    //   socket.on('connect_error', function(data){
    //     serverOutput('<span class="disconnect-msg"><font color="blue">'+getNowTime()+'&nbsp;</font>;' + '连接错误-'+data+' </span>');
    //     errorCount++;
    //     if(errorCount>=maxError){
    //       socket.disconnect();
    //     }
    //   });
    //   //监听连接超时
    //   socket.on('connect_timeout', function(data){
    //     serverOutput('<span class="disconnect-msg"><font color="blue">'+getNowTime()+'&nbsp;</font>' + '连接超时-'+data+' </span>');
    //     errorCount++;
    //     if(errorCount>=maxError){
    //       socket.disconnect();
    //     }
    //   });
    //   //监听错误
    //   socket.on('error', function(data){
    //     serverOutput('<span class="disconnect-msg"><font color="blue">'+getNowTime()+'&nbsp;</font>' + '系统错误-'+data+' </span>');
    //     errorCount++;
    //     if(errorCount>=maxError){
    //       socket.disconnect();
    //     }
    //   });
  }
};
</script>

<style>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 20px;
}

.message-container {
  flex: 1;
  overflow: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

.message {
  margin: 5px;
  padding: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.input-box {
  margin-top: 5px;
  padding: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
