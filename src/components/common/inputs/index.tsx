import { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange?: (value: any) => void;
    label: string;
    classComponent?: string;
   
    error?: string;

}

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    onChange?: (value: any) => void;
    label: string;
    classComponent?: string;

}



export const Input: React.FC<InputProps> = ({ onChange, classComponent, label, id, error, ...htmlInputProps }: InputProps) => {


    return (

        <div className={`field column ${classComponent}`} >

            <div className="control">
                <label className="label" htmlFor={id} >{label}</label>
                <input className="input"
                    id={id}
                    onChange={e => {

                        if (onChange) {
                            onChange(e.target.value);
                        }
                    }}
                    {...htmlInputProps}
                />
                {error && <p className="help is-danger">{error}</p>}

            </div>
        </div>


    );

}

export const TextArea: React.FC<TextAreaProps> = ({ onChange, classComponent, label, id, ...htmlInputProps }: TextAreaProps) => {

    return (

        <div className={`field column ${classComponent}`} >

            <div className="control">
                <label className="label" htmlFor={id} >{label}</label>
                <textarea className="textarea"
                    id={id}
                    onChange={e => {
                        if (onChange) {
                            onChange(e.target.value);
                        }
                    }}
                    {...htmlInputProps}
                />
            </div>
        </div>
    );
}

