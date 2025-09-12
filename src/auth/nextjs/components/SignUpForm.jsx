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
            await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`, opts);
        }catch (e) {
            throw e;
        }
    }
    
    return (
        <div>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <Fieldset className="mb-4">
                    <Field>
                        <Label>Email</Label>
                        <TextInput {...register("email")} />
                        <ErrorMessage>{errors?.email && errors?.email.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Username</Label>
                        <TextInput {...register("username")} />
                        <ErrorMessage>{errors?.username && errors?.username.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Password</Label>
                        <TextInput type="password" {...register("password")} />
                        <ErrorMessage>{errors?.username && errors?.username.message}</ErrorMessage>
                    </Field>
                </Fieldset>
                <Button type="submit" variant="primary">Sign Up</Button>
            </Form>
        </div>
    )
}