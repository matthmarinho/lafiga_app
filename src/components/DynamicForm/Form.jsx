import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Field from './Field'

const Form = ({ formData, values, setValues, row }) => {
    const [currentData, setCurrentData] = useState(formData)

    const fieldChanged = (fieldId, value) => {
        setValues(currentValues => {
            currentValues[fieldId] = value
            return currentValues
        })

        setCurrentData([...currentData])
    }

    useEffect(() => {
        const upcomingData = formData
        setCurrentData(upcomingData)
        setValues(() => {
            return upcomingData.reduce((obj, field) => {
                obj[field.id] = row ? row[field.id] : ""
                return obj
            }, {})
        })
    }, [row])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, maxWidth: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            {currentData.map(field => {
                if (values[field.id]) {
                    return (
                        <Box key={`box_${field.id}`} item sx={{ maxWidth: '100%' }}>
                            <Field
                                key={`field_${field.id}`}
                                field={field}
                                fieldChanged={fieldChanged}
                                values={values}
                                row={row}
                            />
                        </Box>
                    )
                }
            }
            )}
        </Box>
    )
}

export default Form