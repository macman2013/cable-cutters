import {Router, Route, browserHistory, hashHistory} from 'react-router-3';

var API = {
    changePath: function(pathname, state){
        hashHistory.push({pathname: (pathname), state: state}, pathname,{});
    }
};

export default API;