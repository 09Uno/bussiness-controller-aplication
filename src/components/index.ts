'use client'
import 'bulma/css/bulma.css'
import '@/components/common/loader/loader.css'


//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";                                         
        



export {RegistrationOfProducts} from "./products/registration/index";
export {ListProduct} from './products/consultation/index';


export {RegistrationOfClients} from "./clients/registration/index";
export {ConsultClients} from "./clients/consultation/index"

export {Layout} from './layout/index';

export { Input } from './common/inputs/index';
export {TextArea} from './common/inputs/index';
export {Loader} from './common/loader';

export {FeedBackMessage} from './common/message/index';