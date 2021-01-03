import 'bootstrap/dist/css/bootstrap.css';  //required to add any global css in next
import buildClient from '../api/build-client';
import Header from '../components/Header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

//global getInitalProps
//context here is different from one in page (there are more info)
AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentUser');
    //global getInitalProps overrides page's one. So to execute page's one we have to extract the pageProps from the Component key
    let pageProps = {};
    //if check is because not all pages may have getInitalProps
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;
