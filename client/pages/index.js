import buildClient from '../api/build-client';

const LandingPage =  ({currentUser}) => {
    let content = currentUser ? 'You are signed in' : 'You are not signed in';
    return <h1>{content}</h1>

}
//this method will run in the server
//req will be made from browser only when a page is redirected from another.For other cases (refresh, direct url, etc) req made from server
LandingPage.getInitialProps = async (context) => {
   const { data } = await buildClient(context).get("/api/users/currentUser");
   return data;
}

export default LandingPage;
