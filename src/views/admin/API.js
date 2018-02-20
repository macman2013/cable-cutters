import axios from 'axios';

  var API = {
    channelUrl: 'http://localhost:3001/api/channels',
    addonUrl: 'http://localhost:3001/api/addons',
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
        //sends the channel id and new name/category to our api
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
      },

    getAddons(successCallback) {
        //console.log("Getting Add-ons");
        axios.get(this.addonUrl)
          .then(res => {
            successCallback(res.data)
          });
    },

    submitNewAddOn: function handleSubmit(addon) {
        let addons = this.apiData;
        addon.id = Date.now();
        let newAddons = addons.concat([addon]);
        this.apiData = newAddons;
        axios.post(this.addonUrl, addon)
          .catch(err => {
            console.error(err);
            this.apiData = addons;
          });
      },

      updateAddOn: function handleUpdate(id, addon) {
        //sends the addon id and new parameters to our api
        axios.put(`${this.addonUrl}/${id}`, addon)
          .catch(err => {
            console.log(err);
          })
      },

      deleteAddOn: function handleDelete(id) {
        axios.delete(`${this.addonUrl}/${id}`)
          .then(res => {
            console.log('Add-ons deleted');
          })
          .catch(err => {
            console.error(err);
          });
      }
  };

  export default API