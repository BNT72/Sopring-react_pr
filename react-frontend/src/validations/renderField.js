import React from "react";

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={" m-2"}>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className={"form-control"}/>
            {touched && ((error && <span className={"text-danger"}>{label} {error}</span>) || (warning && <span className={"text-warning"}>{warning}</span>))}
        </div>
    </div>
)


export const renderFieldTextarea = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={"form-group m-2"}>
        <label>{label}</label>
        <div>
            <textarea  {...input} placeholder={label} type={type} className={"form-control"}/>
            {touched && ((error && <span className={"text-danger"}>{label} {error}</span>) || (warning && <span className={"text-warning"}>{warning}</span>))}
        </div>
    </div>
)
