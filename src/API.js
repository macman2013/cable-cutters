var API = {
    changePath: function(pathname, state){
        hashHistory.push({pathname: (pathname), state: state}, pathname,{});
    }
};

export default API;