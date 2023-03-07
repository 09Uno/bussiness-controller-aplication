import { type } from "os"





interface FeedBackMessageProps {
    messageType: string;
    message: string;
    field?: string;
}
export interface Alert {
    messageType: string;
    message: string;
    field?: string;
}


export const feedBackMessage: React.FC<FeedBackMessageProps> = ({

    messageType, message, field

}) => {
    return (

        <div className={`notification ${messageType}`}>
            <button className="delete"></button>
            {field && ` ${field} : ${message}`}

        </div >

    )

}