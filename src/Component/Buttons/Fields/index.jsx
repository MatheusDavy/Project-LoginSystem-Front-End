import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup'

export default function FieldsCompoents(props){
    return(
        <Field name={props.type} className={props.classField} />
    )
}