import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CryptoJs from 'crypto-js'

export const Payment = () => {

    const [ formData, setFormData] = useState({
        amount: '10',
        tax_amount: '0',
        total_amount: '10',
        transaction_uuid: uuidv4(),
        product_code: 'EPAYTEST',
        product_service_charge: '0',
        product_delivery_charge: '0',
        success_url: 'http://localhost:3000/dashboard/payment-success',
        failure_url: 'http://localhost:3000/dashboard/payment-failure',
        signed_field_names: 'total_amount,transaction_uuid,product_code',
        // signature: Math.random(),
        secret: '8gBm/:&EnhH.1/q',
    });

    const generateSignature = (
        total_amount,
        transaction_uuid,
        product_code,
        secret
    ) => {
        const hashString =`total_amount=${total_amount}, transaction_uuid=${transaction_uuid}, product_code=${product_code}`;
        const hash= CryptoJs.HmacSHA256(hashString, secret);
        const hashedSignature= CryptoJs.enc.Base64.stringify(hash);
        return hashedSignature;
    }

    // useEffect(() => {
    //     const { total_amount, transaction_uuid, product_code, secret } = formData;
    //     const hashedSignature = generateSignature(
    //         total_amount,
    //         transaction_uuid,
    //         product_code,
    //         secret
    //     );
    //     setFormData({...formData, signature: hashedSignature})
    // }, []);

    useEffect(() => {
        const { total_amount, transaction_uuid, product_code, secret } = formData;
        const hashedSignature = generateSignature(
            total_amount,
            transaction_uuid,
            product_code,
            secret
        );
        setFormData(prev => ({
            ...prev,
            signature: hashedSignature
        }));
    }, [formData.total_amount, formData.transaction_uuid, formData.product_code]);

    

	return (
        <main className="cmg-main" id="cmg-main">
            {/* <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                <input type="text" id="amount" name="amount"
                    value={formData.amount}
                    onChange={({target}) => setFormData({
                        ...formData,
                        amount: target.value,
                        total_amount: target.value,
                    })}
                required />
                <input type="text" id="tax_amount" name="tax_amount" value ={formData.tax_amount} required />
                <input type="text" id="total_amount" name="total_amount" value={formData.total_amount} required />
                <input type="text" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} required />
                <input type="text" id="product_code" name="product_code" value ={formData.product_code} required />
                <input type="text" id="product_service_charge" name="product_service_charge" value={formData.product_service_charge} required />
                <input type="text" id="product_delivery_charge" name="product_delivery_charge" value={formData.product_delivery_charge} required />
                <input type="text" id="success_url" name="success_url" value={formData.success_url} required />
                <input type="text" id="failure_url" name="failure_url" value={formData.failure_url} required />
                <input type="text" id="signed_field_names" name="signed_field_names" value={formData.signed_field_names} required />
                <input type="text" id="signature" name="signature" value={formData.signature} required />
                <input value="Submit" type="submit" />
            </form> */}
            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                <input value={ 113 } name="tAmt" type="hidden" />
                <input value={ 100 } name="amt" type="hidden" />
                <input value={ 13 } name="txAmt" type="hidden" />
                <input value="0" name="psc" type="hidden" />
                <input value="0" name="pdc" type="hidden" />
                <input value="EPAYTEST" name="scd" type="hidden" />
                <input value={ Math.floor( Math.random() * 100000 ) } name="pid" type="hidden" />
                <input value="http://localhost:3000" type="hidden" name="su" />
                <input value="http://localhost:3000" type="hidden" name="fu" />
                <input className="checkout-button" value="Checkout" type="submit" />
            </form>
        </main>
	);
};

export const PaymentSuccess = () =>  {
    
    return <main className="cmg-main" id="cmg-main">
        <h1>hello</h1>
    </main>
}

export const PaymentFailure = () =>  {
    
    return <main className="cmg-main" id="cmg-main">
        <h1>hello</h1>
    </main>
}