"use client";

import { Field, Fieldset, Label } from "@headlessui/react";
import Form from "next/form";
import { useForm } from "react-hook-form";
import TextInput from "../../../app/components/TextInput";
import Button from "../../../app/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, userRegisterationSchema } from "../zodSchemas";
import ErrorMessage from "../../../app/components/ErrorMessage";
import { redirect } from "next/navigation";

export default function LoginForm () {
    const {register, handleSubmit, formState: {errors}, setError} = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(signInSchema)
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`, opts);

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
                <Fieldset className="mb-4">
                    <Field className="form-group">
                        <Label htmlFor="email">Email</Label>
                        <TextInput id="email" {...register("email")} required />
                        <ErrorMessage>{errors?.email && errors?.email.message}</ErrorMessage>
                    </Field>
                    <Field className="form-group">
                        <Label htmlFor="password">Password</Label>
                        <TextInput id="password" type="password" {...register("password")} required />
                        <ErrorMessage>{errors?.password && errors?.password.message}</ErrorMessage>
                        <ErrorMessage>{errors?.root?.type == 400 && errors?.root?.message}</ErrorMessage>
                    </Field>
                </Fieldset>
                <Button type="submit" variant="primary">Log In</Button>
            </Form>
        </div>
    )
}