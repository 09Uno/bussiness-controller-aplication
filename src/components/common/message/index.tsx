

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


export const FeedBackMessage: React.FC<FeedBackMessageProps> = ({

    messageType, message, field

}) => {
    return (


        <article className={`message ${messageType}`}>
            <div className="message-header">

                {field ?
                    <p>{field && `${field}: ${message}`}</p>
                    :
                    <p>{message}</p>
                }
                <button className="delete" aria-label="delete"></button>
            </div>
            <div className="message-body">



            </div>
        </article>



    )

}