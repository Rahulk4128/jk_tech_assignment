import { InputComponentProps } from '@/helpers/types'
import { Field, Input } from '@chakra-ui/react'
import React from 'react'

function InputComponent({ errorMsg, required, type, name, register, placeholder, label, ...rest }: InputComponentProps) {
    return (
        <Field.Root required={required} mt={rest.mt||4} invalid={errorMsg ? true : false}>
            {label ? <Field.Label>{label}
                {required ? <Field.RequiredIndicator /> : <></>}
            </Field.Label> : <></>}
            <Input
                type={type||"text"}
                placeholder={placeholder}
                {...rest}
                {...register(name)}
            />
            {errorMsg ? <Field.ErrorText>{errorMsg}</Field.ErrorText> : <></>}
        </Field.Root>
    )
}

export default InputComponent