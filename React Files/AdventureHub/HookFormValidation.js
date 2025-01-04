//use the command for installation of react-hook-form
//npm install react-hook-form
import { useForm } from "react-hook-form"

export default function HookFormValidation() {

    /*
    register is a function provided by the useForm hook. We can assign it to each input field so that the react-hook-form can track the changes for the input field value
    handleSubmit is the function we can call when the form is submitted
    errors is a nested property in the formState object which will contain the validation errors,
    */
    const { register, handleSubmit ,formState: {errors}} = useForm();
    const onSubmit = (data) => {console.log(data)}

    return (
        <div>
            <h1> Hook Form Validation </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label> Enter name </label>
                    <input type="text" name="name" {...register("name" ,{
                        required: true,
                        minLength: 2                    
                       
                    })} />
                    {
                        errors.name && errors.name.type==="required" && (
                            <p> Name is required </p>
                        )
                    }
                    {
                        errors.name && errors.name.type==="minLength" && (
                            <p> Name should have min 2 characters </p>
                        )
                    }
                </div>
                <div>
                    <label> Enter email </label>
                    <input type="text" name="email" {...register("email",{
                        required: true,
                        pattern: /^[A-Za-z0-9_.-]{5,10}@gmail.com$/
                    })} />
                    {
                        errors.email && errors.email.type==="required" && (
                            <p> Email is required </p>
                        )
                    }
                    {
                        errors.email && errors.email.type==="pattern" && (
                            <p> Email is invalid </p>
                        )
                    }
                </div>
                <div>
                    <label> Enter password </label>
                    <input type="password" name="password" {...register("password",{
                        required: true,
                        pattern: /^[A-Za-z0-9*%$_.-]{8,12}$/
                    })} />
                    {
                        errors.password && errors.password.type==="required" && (
                            <p> password is required </p>
                        )
                    }
                    {
                        errors.password && errors.password.type==="pattern" && (
                            <p> password is invalid </p>
                        )
                    }
                </div>
                <button>Submit</button>
            </form>

        </div>
    )
}