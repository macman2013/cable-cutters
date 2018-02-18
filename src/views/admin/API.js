import axios from 'axios';

  var API = {
    channelUrl: 'http://localhost:3001/api/channels',
    apiData: [],
  
    getChannels(successCallback) {
        //console.log("Getting Channels");
        axios.get(this.channelUrl)
          .then(res => {
            successCallback(res.data)
          });
    },

    submitNewChannel: function handleSubmit(channel) {
        let channels = this.apiData;
        channel.id = Date.now();
        let newChannels = channels.concat([channel]);
        this.apiData = newChannels;
        axios.post(this.channelUrl, channel)
          .catch(err => {
            console.error(err);
            this.apiData = channels;
          });
      },

      updateChannel: function handleUpdate(id, channel) {
        //sends the channel id and new author/text to our api
        axios.put(`${this.channelUrl}/${id}`, channel)
          .catch(err => {
            console.log(err);
          })
      },

      deleteChannel: function handleDelete(id) {
        axios.delete(`${this.channelUrl}/${id}`)
          .then(res => {
            console.log('Channel deleted');
          })
          .catch(err => {
            console.error(err);
          });
      }
  };

  export default API