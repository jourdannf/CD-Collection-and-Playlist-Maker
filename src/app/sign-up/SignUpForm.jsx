"use client";

import { Field, Fieldset, Label } from "@headlessui/react";
import Form from "next/form";
import { useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

export default function SignUpForm () {
    const {register} = useForm({
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    });
    
    return (
        <div>
            <Form>
                <Fieldset className="mb-4">
                    <Field>
                        <Label>Email</Label>
                        <TextInput {...register("email")} />
                    </Field>
                    <Field>
                        <Label>Username</Label>
                        <TextInput {...register("username")} />
                    </Field>
                    <Field>
                        <Label>Password</Label>
                        <TextInput type="password" {...register("password")} />
                    </Field>
                </Fieldset>
                <Button type="submit" variant="primary">Sign Up</Button>
            </Form>
        </div>
    )
}