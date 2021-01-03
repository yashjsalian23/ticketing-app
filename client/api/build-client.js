import axios from 'axios';

export default ({ req }) => {
    if(typeof window === 'undefined'){ //chcck to identify in server or client
        return axios.create({//format: http://SERVICENAME.NAMESPACE.svc.cluster.local/*
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        return axios.create({
            baseURL: '/'
        });
    }
}