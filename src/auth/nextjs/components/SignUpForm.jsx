"use client";

import { Field, Fieldset, Label } from "@headlessui/react";
import Form from "next/form";
import { useForm } from "react-hook-form";
import TextInput from "../../../app/components/TextInput";
import Button from "../../../app/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegisterationSchema } from "../zodSchemas";
import ErrorMessage from "../../../app/components/ErrorMessage";

export default function SignUpForm () {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
        resolver: zodResolver(userRegisterationSchema)
    });

    async function submitHandler (formData) {
        const opts = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`, opts);

            !response.ok ? setError("root.serverError", {
                type: response.status.toString(),
                message: response.body
            }) : redirect("/");
        }catch (e) {
            throw e;
        }
    }
    
    return (
        <div>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Field className="form-group">
                    <Label htmlFor="email">Email</Label>
                    <TextInput id="email" {...register("email")} required />
                    <ErrorMessage>{errors?.email && errors?.email.message}</ErrorMessage>
                </Field>
                <Field className="form-group">
                    <Label htmlFor="username">Username</Label>
                    <TextInput id="username" {...register("username")} required />
                    <ErrorMessage>{errors?.username && errors?.username.message}</ErrorMessage>
                </Field>
                <Field className="form-group">
                    <Label htmlFor="password">Password</Label>
                    <TextInput id="password" type="password" {...register("password")} required />
                    <ErrorMessage>{errors?.password && errors?.password.message}</ErrorMessage>
                </Field>
                <Button type="submit" variant="primary" className="mt-4">Sign Up</Button>
            </Form>
        </div>
    )
}