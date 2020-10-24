import React from "react"

const FormLabel = ({htmlFor, label}) => {

    return (
        <label className="heading secondary input-label" htmlFor={htmlFor}>{label}</label>
    )

}

export default FormLabel