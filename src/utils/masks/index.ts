import { FormatUtils } from "@4us-dev/utils";

export const convertToBigDecimal = (value: any): number => {

    if (!value) {
        return 0;
    }

    var result = value.replace('.', '').replace(',', '.');
    return result

}

export const formaTotReal = (value: any) => {
    const v = ((value.replace(/\D/g, '') / 100).toFixed(2) + '').split('.');

    const m = v[0].split('').reverse().join('').match(/.{1,3}/g);

    if (m) {
        for (let i = 0; i < m.length; i++)
            m[i] = m[i].split('').reverse().join('') + '.';

        const r = m.reverse().join('');

        return r.substring(0, r.lastIndexOf('.')) + ',' + v[1];
    }
}

const formatToCpf = (value: string): string => {

    const cpfMasked = new FormatUtils().formatCPF(value)

    return cpfMasked 

}


const formatToDate = (value: string) : string | undefined => {


    if(!value){
        return "";
    }

    const dateMasked = new FormatUtils().formatOnlyIntegers(value)
    const size = value.length

    if(size <= 2){
        return dateMasked;
    }

    if(size <= 4){
        return dateMasked.substr(0, 2) + "/" + dateMasked.substr(2, 2);
    }

    if(size <= 6){
        return dateMasked.substr(0,2) + "/" + dateMasked.substr(2,2) + "/" + dateMasked.substr(4,2)
    }


}

const formatToPhone = (value: string) : string =>{

    const phoneMasked = new FormatUtils().formatPhone(value)
    return phoneMasked
}






export const maskType = (value: string| number, type: string ) =>{

    if(type === "cpf" && typeof value === "string"){
        return formatToCpf(value);
    }

    if(type === "money" ){
        return formaTotReal(value)
    }

    if(type === "date" && typeof value === "string"){
        
        return formatToDate(value)
    }
    
    if(type === "phone" && typeof value === "string"){
        return formatToPhone(value)
    }

}



