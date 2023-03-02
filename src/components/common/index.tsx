import { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange? : (value: string ) => void;
    label: string;
    classComponent?: string;
    
}


export const Input: React.FC<InputProps> = ( {onChange, classComponent, label, id, ...htmlInputProps} : InputProps) => {

    return (

        <div className={"field column" + classComponent} >

            <div className="control">
                <label className="label" htmlFor={id} >{label}</label>
                <input className="input"
                    id={id}
                    onChange={e => {
                        if(onChange) {
                            onChange(e.target.value);
                        }
                    }}
                    {...htmlInputProps}
                />
            </div>
        </div>


    );


}