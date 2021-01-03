import 'bootstrap/dist/css/bootstrap.css';  //required to add any global css in next
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps }) => {
    return (
        <div>
            <h1>Header</h1>
            <Component {...pageProps} />
        </div>
    ) 
}
//global getInitalProps
//context here is different from one in page (there are more info)
AppComponent.getInitalProps = async(appContext) =>{
    const { data } = await buildClient(appContext.ctx).get("/api/users/currentUser");

    //global getInitalProps overrides page's one. So to execute page's one we have to extract the pageProps from the Component key
    let pageProps = {};
    //if check is because not all pages may have getInitalProps
    if(appContext.Component.getInitalProps){
        pageProps = await appContext.Component.getInitalProps(appContext.ctx);
    }

    return {
        pageProps,
        ...data
    }

}



export default AppComponent;