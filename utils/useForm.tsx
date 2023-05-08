import { useState } from 'react'

interface IForm<T> {
  initialValues: T
  onSubmit: (values: T) => Promise<void>
}

const useForm = <T extends Record<string, any>>({ initialValues, onSubmit }: IForm<T>) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>)
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prevValues) => ({ ...prevValues, [key]: value }))
    setTouched((prevTouched) => ({ ...prevTouched, [key]: true }))
  }

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }

    setIsSubmitting(true)

    try {
      await onSubmit(values)
      setErrors({} as Record<keyof T, string>)
      setTouched({} as Record<keyof T, boolean>)
    } catch (error) {
      setErrors(error as Record<keyof T, string>)
    }

    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
  }
}

export default useForm
