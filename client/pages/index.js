import buildClient from '../api/build-client';

const LandingPage =  ({currentUser}) => {
    console.log(currentUser);
    // axios.get('/api/users/currentUser');
    return <h1>Landing Page</h1>

}
//this method will run in the server
//req will be made from browser only when a page is redirected from another.For other cases (refresh, direct url, etc) req made from server
LandingPage.getInitialProps = async (context) => {
   const { data } = await buildClient(context).get("/api/users/currentUser");
   return data;
}

export default LandingPage;
