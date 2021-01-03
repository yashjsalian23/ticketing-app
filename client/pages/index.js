import axios from 'axios';

const LandingPage =  ({currentUser}) => {
    console.log(currentUser);
    // axios.get('/api/users/currentUser');
    return <h1>Landing Page</h1>
    
}
//this method will run in the server
LandingPage.getInitialProps = async () => {
    if(typeof window === 'undefined'){ //check is req is made in server or browser
        const { data } = await axios.get( //format: http://SERVICENAME.NAMESPACE.cluster.local/*
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser',{
            headers:{
                Host:'ticketing.dev' //required to tell ingress about the domain
            }
        });
        return data;
    } else {//since this is in the browser no need to add domain
        const { data } = await axios.get('/api/users/currentUser');
        return data;
    }
    return {};
}

export default LandingPage;
